import { Principal } from "@icp-sdk/core/principal";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";
import { useActorDirect } from "../hooks/useActorDirect";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "doctor" | "viewer";
export type AdminRole = "admin";
export type AccessRole = AdminRole | UserRole;

export type AccessStatus =
  | "unknown"
  | "pending"
  | "approved"
  | "denied"
  | "admin"
  | "loading";

export interface AccessRequest {
  principal: string;
  name: string;
  qualification: string;
  reason: string;
  status: "pending" | "approved" | "denied";
  role: UserRole | null;
  submittedAt: number;
}

interface AccessControlContextValue {
  accessState: AccessStatus;
  currentRole: AccessRole | null;
  allRequests: AccessRequest[];
  isAdmin: boolean;
  isViewer: boolean;
  isDoctor: boolean;
  isReadOnly: boolean;
  submitRequest: (
    name: string,
    qualification: string,
    reason: string,
  ) => Promise<void>;
  approveRequest: (principal: string, role: UserRole) => Promise<void>;
  denyRequest: (principal: string) => Promise<void>;
  changeRole: (principal: string, role: UserRole) => Promise<void>;
  revokeAccess: (principal: string) => Promise<void>;
  refreshStatus: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ADMIN_SESSION_KEY = "homeo_admin_unlocked";
const ADMIN_PASSPHRASE = "Krishna@132";
// Local cache of all requests for admin panel (stored only on admin's device)
const REQUESTS_CACHE_KEY = "homeo_requests_cache_v3";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isAdminUnlockedInSession(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

// Encode access request into profile specialization field
function encodeRequestSpec(req: {
  name: string;
  qualification: string;
  reason: string;
  submittedAt: number;
}): string {
  return JSON.stringify(req);
}

// Load/save the admin's local cache of requests
function loadRequestsCache(): AccessRequest[] {
  try {
    const raw = localStorage.getItem(REQUESTS_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AccessRequest[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* ignore */
  }
  return [];
}

function saveRequestsCache(requests: AccessRequest[]): void {
  try {
    localStorage.setItem(REQUESTS_CACHE_KEY, JSON.stringify(requests));
  } catch {
    /* ignore */
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AccessControlContext = createContext<AccessControlContextValue>({
  accessState: "loading",
  currentRole: null,
  allRequests: [],
  isAdmin: false,
  isViewer: false,
  isDoctor: false,
  isReadOnly: false,
  submitRequest: async () => {},
  approveRequest: async () => {},
  denyRequest: async () => {},
  changeRole: async () => {},
  revokeAccess: async () => {},
  refreshStatus: () => {},
});

export function AccessControlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { identity, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActorDirect();
  const isAnonymous = !identity || identity.getPrincipal().isAnonymous();
  const principal = isAnonymous
    ? null
    : (identity?.getPrincipal().toString() ?? null);

  // Always-fresh ref to the actor so callbacks don't capture stale closures
  const actorRef = useRef<backendInterface | null>(null);
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);

  // Always-fresh ref to the identity for creating actors on demand
  const identityRef = useRef(identity);
  useEffect(() => {
    identityRef.current = identity;
  }, [identity]);

  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(() =>
    isAdminUnlockedInSession(),
  );
  // The current user's own access status from the canister
  const [ownStatus, setOwnStatus] = useState<
    "loading" | "unknown" | "pending" | "approved" | "denied"
  >("loading");
  const [ownRole, setOwnRole] = useState<UserRole | null>(null);
  // Admin's local cache of all requests
  const [allRequests, setAllRequests] = useState<AccessRequest[]>(() =>
    loadRequestsCache(),
  );
  const [refreshTick, setRefreshTick] = useState(0);
  const lastPrincipalRef = useRef<string | null>(null);

  // Refresh status from backend whenever actor/principal changes
  useEffect(() => {
    // Still initializing Internet Identity — wait
    if (isInitializing) {
      setOwnStatus("loading");
      return;
    }

    // Not logged in at all — not "loading", just not authenticated
    if (!principal) {
      setOwnStatus("unknown");
      return;
    }

    // Actor still being created — show loading but with a hard timeout
    if (!actor) {
      if (!actorFetching) {
        // Actor fetch finished but returned nothing — treat as error
        setOwnStatus("unknown");
        return;
      }
      // Actor is fetching — wait up to 10s
      const timeout = setTimeout(() => {
        setOwnStatus("unknown");
      }, 10000);
      return () => clearTimeout(timeout);
    }

    // Re-fetch whenever actor, principal, or refreshTick changes
    lastPrincipalRef.current = `${principal}:${refreshTick}`;

    let cancelled = false;
    async function fetchStatus() {
      try {
        // Step 1: check canister role
        let canisterRole: string | null = null;
        try {
          canisterRole = await actor!.getCallerUserRole();
        } catch {
          // getCallerUserRole traps if this principal was never initialized
          // (i.e. _initializeAccessControlWithSecret was never called for them yet)
          canisterRole = null;
        }
        if (cancelled) return;

        // Admin in canister → full admin access, no profile check needed
        if (canisterRole === "admin") {
          setOwnStatus("approved");
          setOwnRole("doctor");
          return;
        }

        // Step 2: always check the profile as the primary source of truth for
        // the approval workflow. The canister auto-assigns #user to all new
        // principals, so canisterRole === "user" alone does NOT mean approved.
        const profile = await actor!.getCallerUserProfile();
        if (cancelled) return;

        // If canister role is explicitly "guest", user was denied by admin
        if (canisterRole === "guest") {
          setOwnStatus("denied");
          setOwnRole(null);
          return;
        }

        if (!profile) {
          // No profile at all — never submitted a request
          setOwnStatus("unknown");
          setOwnRole(null);
          return;
        }

        if (profile.role === "pending") {
          // Profile says pending. Check local cache (set by admin on their device)
          // to see if admin approved this user. This gives instant feedback when
          // admin and user share the same device/browser. For cross-device scenarios,
          // the user stays pending until admin manually adds them by principal ID.
          const cached = loadRequestsCache();
          const cachedEntry = cached.find((r) => r.principal === principal);
          if (cachedEntry && cachedEntry.status === "approved") {
            // Admin approved from this device — grant access
            setOwnStatus("approved");
            setOwnRole(cachedEntry.role ?? "doctor");
          } else {
            setOwnStatus("pending");
            setOwnRole(null);
          }
        } else if (profile.role === "denied") {
          setOwnStatus("denied");
          setOwnRole(null);
        } else if (
          profile.role === "approved" ||
          profile.role === "doctor" ||
          profile.role === "viewer"
        ) {
          // Profile explicitly marked as approved/doctor/viewer by admin flow
          setOwnStatus("approved");
          setOwnRole(profile.role === "viewer" ? "viewer" : "doctor");
        } else {
          // Unknown profile role — treat as needing to submit request
          setOwnStatus("unknown");
          setOwnRole(null);
        }
      } catch {
        if (cancelled) return;
        setOwnStatus("unknown");
        setOwnRole(null);
      }
    }

    void fetchStatus();
    return () => {
      cancelled = true;
    };
  }, [actor, principal, refreshTick, isInitializing, actorFetching]);

  // Poll for status updates when pending (every 10 seconds)
  useEffect(() => {
    if (ownStatus !== "pending") return;
    const interval = setInterval(() => {
      setRefreshTick((t) => t + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [ownStatus]);

  // Listen for admin session changes
  useEffect(() => {
    function checkAdminSession() {
      setAdminUnlocked(isAdminUnlockedInSession());
    }
    window.addEventListener("focus", checkAdminSession);
    window.addEventListener("homeo_admin_changed", checkAdminSession);
    return () => {
      window.removeEventListener("focus", checkAdminSession);
      window.removeEventListener("homeo_admin_changed", checkAdminSession);
    };
  }, []);

  // Derived access state
  const accessState: AccessStatus = (() => {
    if (adminUnlocked) return "admin";
    // Still initializing auth — show loading
    if (isInitializing) return "loading";
    // Not logged in — App.tsx will show login page (no access state needed)
    if (!principal) return "unknown";
    // Logged in but waiting for canister response
    if (ownStatus === "loading") return "loading";
    return ownStatus;
  })();

  const currentRole: AccessRole | null = (() => {
    if (accessState === "admin") return "admin";
    if (accessState === "approved") return ownRole;
    return null;
  })();

  const isAdmin = accessState === "admin";
  const isViewer = currentRole === "viewer";
  const isDoctor = currentRole === "doctor";
  const isReadOnly = isViewer;

  // ─── Actions ────────────────────────────────────────────────────────────────

  const submitRequest = useCallback(
    async (name: string, qualification: string, reason: string) => {
      if (!principal) throw new Error("Not logged in");

      // Get a live actor — prefer the cached one, otherwise create a fresh one
      let currentActor = actorRef.current;
      if (!currentActor) {
        const currentIdentity = identityRef.current;
        if (!currentIdentity || currentIdentity.getPrincipal().isAnonymous()) {
          throw new Error("Not logged in. Please refresh and try again.");
        }
        try {
          currentActor = await createActorWithConfig({
            agentOptions: { identity: currentIdentity },
          });
        } catch (actorErr) {
          const msg =
            actorErr instanceof Error ? actorErr.message : String(actorErr);
          throw new Error(`Could not connect to backend: ${msg}`);
        }
      }

      const spec = encodeRequestSpec({
        name,
        qualification,
        reason,
        submittedAt: Date.now(),
      });
      // Save to backend canister - marks this user as pending
      // specialization is optional Text in Motoko; the generated backend.ts
      // wrapper handles the Candid Opt encoding automatically
      try {
        await currentActor.saveCallerUserProfile({
          name,
          role: "pending",
          specialization: spec,
        });
      } catch (saveErr) {
        const msg =
          saveErr instanceof Error ? saveErr.message : String(saveErr);
        throw new Error(`Failed to submit: ${msg}`);
      }
      // Also cache locally for admin view
      const cached = loadRequestsCache();
      const existing = cached.findIndex((r) => r.principal === principal);
      const req: AccessRequest = {
        principal,
        name,
        qualification,
        reason,
        status: "pending",
        role: null,
        submittedAt: Date.now(),
      };
      if (existing >= 0) {
        cached[existing] = req;
      } else {
        cached.push(req);
      }
      saveRequestsCache(cached);
      setAllRequests([...cached]);
      setOwnStatus("pending");
    },
    [principal],
  );

  const approveRequest = useCallback(
    async (targetPrincipal: string, role: UserRole) => {
      if (!actor) return;
      try {
        // Use backend to assign user role - this persists across all devices
        const p = Principal.fromText(targetPrincipal);
        await actor.assignCallerUserRole(p, "user" as never);
        // Save role preference in a backend profile call - but we can only save caller's own profile
        // So we store the role preference in the local cache, and the approval is the canister role
      } catch (e) {
        console.error("Failed to assign role:", e);
        throw e;
      }
      // Update local cache
      const cached = loadRequestsCache();
      const idx = cached.findIndex((r) => r.principal === targetPrincipal);
      if (idx >= 0) {
        cached[idx] = { ...cached[idx], status: "approved", role };
      } else {
        cached.push({
          principal: targetPrincipal,
          name: `${targetPrincipal.slice(0, 12)}…`,
          qualification: "",
          reason: "Manually approved",
          status: "approved",
          role,
          submittedAt: Date.now(),
        });
      }
      saveRequestsCache(cached);
      setAllRequests([...cached]);
    },
    [actor],
  );

  const denyRequest = useCallback(
    async (targetPrincipal: string) => {
      if (!actor) return;
      try {
        // Assign guest role = effectively denied (can't access anything)
        const p = Principal.fromText(targetPrincipal);
        await actor.assignCallerUserRole(p, "guest" as never);
      } catch (e) {
        console.error("Failed to deny:", e);
      }
      const cached = loadRequestsCache();
      const idx = cached.findIndex((r) => r.principal === targetPrincipal);
      if (idx >= 0) {
        cached[idx] = { ...cached[idx], status: "denied", role: null };
        saveRequestsCache(cached);
        setAllRequests([...cached]);
      }
    },
    [actor],
  );

  const changeRole = useCallback(
    async (targetPrincipal: string, role: UserRole) => {
      const cached = loadRequestsCache();
      const idx = cached.findIndex((r) => r.principal === targetPrincipal);
      if (idx >= 0) {
        cached[idx] = { ...cached[idx], role };
        saveRequestsCache(cached);
        setAllRequests([...cached]);
      }
    },
    [],
  );

  const revokeAccess = useCallback(
    async (targetPrincipal: string) => {
      if (!actor) return;
      try {
        const p = Principal.fromText(targetPrincipal);
        await actor.assignCallerUserRole(p, "guest" as never);
      } catch (e) {
        console.error("Failed to revoke:", e);
      }
      const cached = loadRequestsCache();
      const idx = cached.findIndex((r) => r.principal === targetPrincipal);
      if (idx >= 0) {
        cached[idx] = { ...cached[idx], status: "denied", role: null };
        saveRequestsCache(cached);
        setAllRequests([...cached]);
      }
    },
    [actor],
  );

  const refreshStatus = useCallback(() => {
    setRefreshTick((t) => t + 1);
  }, []);

  // Load pending requests from cache for admin panel view
  // Also sync from backend when admin is unlocked by looking up profiles
  useEffect(() => {
    if (!adminUnlocked || !actor) return;
    // Just use the local cache - admin manages from their device
    setAllRequests(loadRequestsCache());
  }, [adminUnlocked, actor]);

  return (
    <AccessControlContext.Provider
      value={{
        accessState,
        currentRole,
        allRequests,
        isAdmin,
        isViewer,
        isDoctor,
        isReadOnly,
        submitRequest,
        approveRequest,
        denyRequest,
        changeRole,
        revokeAccess,
        refreshStatus,
      }}
    >
      {children}
    </AccessControlContext.Provider>
  );
}

export function useAccessControl() {
  return useContext(AccessControlContext);
}

// Helper: programmatically unlock/lock admin from Settings
export function setAdminSession(unlocked: boolean) {
  try {
    if (unlocked) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
    window.dispatchEvent(new Event("homeo_admin_changed"));
  } catch {
    // ignore
  }
}

export { ADMIN_PASSPHRASE };
