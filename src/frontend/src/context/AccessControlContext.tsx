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
  const { identity } = useInternetIdentity();
  const { actor } = useActorDirect();
  const principal = identity?.getPrincipal().toString() ?? null;

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
    if (!actor || !principal || principal === "anonymous") {
      if (!principal) setOwnStatus("loading");
      return;
    }

    // Avoid re-fetching if principal hasn't changed (unless forced refresh)
    if (lastPrincipalRef.current === principal && refreshTick === 0) return;
    lastPrincipalRef.current = principal;

    let cancelled = false;
    async function fetchStatus() {
      try {
        // Use getCallerUserRole to check if user has been assigned a role by admin
        const role = await actor!.getCallerUserRole();
        if (cancelled) return;

        // Map backend role to access status
        // UserRole.user = approved, UserRole.admin = admin, UserRole.guest = check profile for pending/denied
        if (role === "admin") {
          setOwnStatus("approved");
          setOwnRole("doctor");
          return;
        }

        if (role === "user") {
          // Approved by admin - check their stored role preference in profile
          const profile = await actor!.getCallerUserProfile();
          if (cancelled) return;
          if (profile && profile.role === "viewer") {
            setOwnRole("viewer");
          } else {
            setOwnRole("doctor");
          }
          setOwnStatus("approved");
          return;
        }

        // role === "guest" - check profile for pending/denied status
        const profile = await actor!.getCallerUserProfile();
        if (cancelled) return;

        if (!profile) {
          // Never submitted a request
          setOwnStatus("unknown");
          setOwnRole(null);
          return;
        }

        if (profile.role === "pending") {
          setOwnStatus("pending");
          setOwnRole(null);
        } else if (profile.role === "denied") {
          setOwnStatus("denied");
          setOwnRole(null);
        } else {
          // Has some profile but unknown status - treat as pending
          setOwnStatus("pending");
          setOwnRole(null);
        }
      } catch {
        if (cancelled) return;
        // If any error, treat as unknown (needs to submit request)
        setOwnStatus("unknown");
        setOwnRole(null);
      }
    }

    void fetchStatus();
    return () => {
      cancelled = true;
    };
  }, [actor, principal, refreshTick]);

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
    if (!principal) return "loading";
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
      // Wait for actor to be ready (up to 10 seconds)
      let currentActor = actor;
      if (!currentActor) {
        for (let i = 0; i < 20; i++) {
          await new Promise((res) => setTimeout(res, 500));
          // Re-read actor from queryClient isn't possible here, so throw to trigger retry in UI
          if (!actor) continue;
          currentActor = actor;
          break;
        }
      }
      if (!currentActor)
        throw new Error("Backend not ready. Please try again.");
      const spec = encodeRequestSpec({
        name,
        qualification,
        reason,
        submittedAt: Date.now(),
      });
      // Save to backend canister - marks this user as pending
      await currentActor.saveCallerUserProfile({
        name,
        role: "pending",
        specialization: spec,
      });
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
    [actor, principal],
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
