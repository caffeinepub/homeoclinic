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
import type { DoctorAccount } from "../backend.d";
import { createActorWithConfig } from "../config";
import { useActorDirect } from "../hooks/useActorDirect";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "doctor" | "viewer";
export type AdminRole = "admin";
export type AccessRole = AdminRole | UserRole;

export type AccessStatus =
  | "unknown"
  | "need_ii"
  | "pending"
  | "must_change_password"
  | "approved"
  | "denied"
  | "admin"
  | "loading";

export interface AccessRequest {
  principal: string;
  name: string;
  qualification: string;
  reason: string;
  gmail: string;
  phone: string;
  status: "pending" | "approved" | "denied";
  role: UserRole | null;
  submittedAt: number;
}

export interface StoredSession {
  type: "password";
  username: string;
  account: DoctorAccount;
}

interface AccessControlContextValue {
  accessState: AccessStatus;
  currentRole: AccessRole | null;
  allRequests: AccessRequest[];
  isAdmin: boolean;
  isViewer: boolean;
  isDoctor: boolean;
  isReadOnly: boolean;
  passwordSession: StoredSession | null;
  currentAccount: DoctorAccount | null;
  savePasswordSession: (account: DoctorAccount) => void;
  clearPasswordSession: () => void;
  updateAccount: (account: DoctorAccount) => void;
  logout: () => void;
  exitAdmin: () => void;
  submitRequest: (
    name: string,
    qualification: string,
    reason: string,
    gmail: string,
    phone: string,
  ) => Promise<void>;
  approveRequest: (principal: string, role: UserRole) => Promise<void>;
  denyRequest: (principal: string) => Promise<void>;
  changeRole: (principal: string, role: UserRole) => Promise<void>;
  revokeAccess: (principal: string) => Promise<void>;
  refreshStatus: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const ADMIN_PASSPHRASE = "Krishna@132";
const ADMIN_SESSION_KEY = "homeo_admin_unlocked";
const SESSION_KEY = "homeo_session";
const REQUESTS_CACHE_KEY = "homeo_requests_cache_v3";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isAdminUnlockedInStorage(): boolean {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAdminSession(unlocked: boolean) {
  try {
    if (unlocked) {
      localStorage.setItem(ADMIN_SESSION_KEY, "1");
    } else {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
    window.dispatchEvent(new Event("homeo_admin_changed"));
  } catch {
    // ignore
  }
}

function loadSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as StoredSession;
  } catch {
    // ignore
  }
  return null;
}

function saveSession(session: StoredSession) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // ignore
  }
}

function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

function loadRequestsCache(): AccessRequest[] {
  try {
    const raw = localStorage.getItem(REQUESTS_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AccessRequest[];
      if (Array.isArray(parsed)) {
        return parsed.map((r) => ({
          ...r,
          gmail: r.gmail ?? "",
          phone: r.phone ?? "",
        }));
      }
    }
  } catch {
    // ignore
  }
  return [];
}

function saveRequestsCache(requests: AccessRequest[]): void {
  try {
    localStorage.setItem(REQUESTS_CACHE_KEY, JSON.stringify(requests));
  } catch {
    // ignore
  }
}

function encodeRequestSpec(req: {
  name: string;
  qualification: string;
  reason: string;
  gmail: string;
  phone: string;
  submittedAt: number;
}): string {
  return JSON.stringify(req);
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
  passwordSession: null,
  currentAccount: null,
  savePasswordSession: () => {},
  clearPasswordSession: () => {},
  updateAccount: () => {},
  logout: () => {},
  exitAdmin: () => {},
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
  const { identity, isInitializing, clear: clearII } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActorDirect();
  const queryClient = useQueryClient();

  const isAnonymous = !identity || identity.getPrincipal().isAnonymous();
  const principal = isAnonymous
    ? null
    : (identity?.getPrincipal().toString() ?? null);

  const actorRef = useRef<backendInterface | null>(null);
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);

  const identityRef = useRef(identity);
  useEffect(() => {
    identityRef.current = identity;
  }, [identity]);

  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(() =>
    isAdminUnlockedInStorage(),
  );

  // Password session state
  const [passwordSession, setPasswordSessionState] =
    useState<StoredSession | null>(() => loadSession());

  // II-based status (for II-only users)
  const [iiStatus, setIiStatus] = useState<
    "loading" | "unknown" | "pending" | "approved" | "denied"
  >("loading");
  const [iiRole, setIiRole] = useState<UserRole | null>(null);

  const [allRequests, setAllRequests] = useState<AccessRequest[]>(() =>
    loadRequestsCache(),
  );
  const [refreshTick, setRefreshTick] = useState(0);

  // ─── Password session helpers ────────────────────────────────────────────────

  const savePasswordSession = useCallback((account: DoctorAccount) => {
    const session: StoredSession = {
      type: "password",
      username: account.username,
      account,
    };
    saveSession(session);
    setPasswordSessionState(session);
  }, []);

  const clearPasswordSession = useCallback(() => {
    clearSession();
    setPasswordSessionState(null);
  }, []);

  const updateAccount = useCallback((account: DoctorAccount) => {
    setPasswordSessionState((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, account };
      saveSession(updated);
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setPasswordSessionState(null);
    setAdminSession(false);
    clearII();
    queryClient.clear();
  }, [clearII, queryClient]);

  const exitAdmin = useCallback(() => {
    setAdminSession(false);
  }, []);

  // ─── II status check ─────────────────────────────────────────────────────────

  // biome-ignore lint/correctness/useExhaustiveDependencies: passwordSession is in deps, internal loadRequestsCache is stable
  useEffect(() => {
    // If password session exists, skip II profile check entirely
    if (passwordSession) {
      setIiStatus("unknown");
      return;
    }

    if (isInitializing) {
      setIiStatus("loading");
      return;
    }

    if (!principal) {
      setIiStatus("unknown");
      return;
    }

    if (!actor) {
      if (!actorFetching) {
        setIiStatus("unknown");
        return;
      }
      const timeout = setTimeout(() => {
        setIiStatus("unknown");
      }, 10000);
      return () => clearTimeout(timeout);
    }

    let cancelled = false;
    async function fetchStatus() {
      try {
        let canisterRole: string | null = null;
        try {
          canisterRole = await actor!.getCallerUserRole();
        } catch {
          canisterRole = null;
        }
        if (cancelled) return;

        if (canisterRole === "admin") {
          setIiStatus("approved");
          setIiRole("doctor");
          return;
        }

        // Bug #3 fix: canister role "user" means admin has approved this II user
        // This works cross-device since the canister is the source of truth
        if (canisterRole === "user") {
          setIiStatus("approved");
          setIiRole("doctor");
          return;
        }

        const profile = await actor!.getCallerUserProfile();
        if (cancelled) return;

        if (canisterRole === "guest") {
          setIiStatus("denied");
          setIiRole(null);
          return;
        }

        if (!profile) {
          setIiStatus("unknown");
          setIiRole(null);
          return;
        }

        if (profile.role === "pending") {
          const cached = loadRequestsCache();
          const cachedEntry = cached.find((r) => r.principal === principal);
          if (cachedEntry && cachedEntry.status === "approved") {
            setIiStatus("approved");
            setIiRole(cachedEntry.role ?? "doctor");
          } else {
            setIiStatus("pending");
            setIiRole(null);
          }
        } else if (profile.role === "denied") {
          setIiStatus("denied");
          setIiRole(null);
        } else if (
          profile.role === "approved" ||
          profile.role === "doctor" ||
          profile.role === "viewer"
        ) {
          setIiStatus("approved");
          setIiRole(profile.role === "viewer" ? "viewer" : "doctor");
        } else {
          setIiStatus("unknown");
          setIiRole(null);
        }
      } catch {
        if (cancelled) return;
        setIiStatus("unknown");
        setIiRole(null);
      }
    }
    void fetchStatus();
    return () => {
      cancelled = true;
    };
  }, [
    actor,
    principal,
    refreshTick,
    isInitializing,
    actorFetching,
    passwordSession,
  ]);

  // Poll for status when II user is pending
  useEffect(() => {
    if (iiStatus !== "pending" || passwordSession) return;
    const interval = setInterval(() => {
      setRefreshTick((t) => t + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [iiStatus, passwordSession]);

  // Poll for password session role refresh when pending
  useEffect(() => {
    if (
      !passwordSession ||
      passwordSession.account.role !== "pending" ||
      !actor
    )
      return;
    const interval = setInterval(async () => {
      try {
        const accounts = await actor!.getAllDoctorAccounts();
        const found = accounts.find(
          (a) => a.username === passwordSession.username,
        );
        if (found && found.role !== "pending") {
          updateAccount(found);
        }
      } catch {
        // ignore
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [passwordSession, actor, updateAccount]);

  // Listen for admin session changes
  useEffect(() => {
    function checkAdminSession() {
      setAdminUnlocked(isAdminUnlockedInStorage());
    }
    window.addEventListener("focus", checkAdminSession);
    window.addEventListener("homeo_admin_changed", checkAdminSession);
    return () => {
      window.removeEventListener("focus", checkAdminSession);
      window.removeEventListener("homeo_admin_changed", checkAdminSession);
    };
  }, []);

  // ─── Derived access state ────────────────────────────────────────────────────

  const accessState: AccessStatus = (() => {
    if (adminUnlocked) return "admin";

    // Password session flow
    if (passwordSession) {
      // Need II for backend calls
      if (isInitializing) return "loading";
      if (!identity || isAnonymous) return "need_ii";

      const role = passwordSession.account.role;
      if (passwordSession.account.mustChangePassword)
        return "must_change_password";
      if (role === "approved_doctor" || role === "approved_viewer")
        return "approved";
      if (role === "pending") return "pending";
      if (role === "denied") return "denied";
      return "pending"; // Default to pending for unknown roles
    }

    // II-only flow
    if (isInitializing) return "loading";
    if (!principal) return "unknown";
    if (iiStatus === "loading") return "loading";
    return iiStatus;
  })();

  const currentRole: AccessRole | null = (() => {
    if (accessState === "admin") return "admin";
    if (accessState === "approved") {
      if (passwordSession) {
        return passwordSession.account.role === "approved_viewer"
          ? "viewer"
          : "doctor";
      }
      return iiRole;
    }
    return null;
  })();

  const isAdmin = accessState === "admin";
  const isViewer = currentRole === "viewer";
  const isDoctor = currentRole === "doctor";
  const isReadOnly = isViewer;

  // ─── II actions (for II-only users) ──────────────────────────────────────────

  const submitRequest = useCallback(
    async (
      name: string,
      qualification: string,
      reason: string,
      gmail: string,
      phone: string,
    ) => {
      if (!principal) throw new Error("Not logged in");
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
        gmail,
        phone,
        submittedAt: Date.now(),
      });
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
      const cached = loadRequestsCache();
      const existing = cached.findIndex((r) => r.principal === principal);
      const req: AccessRequest = {
        principal,
        name,
        qualification,
        reason,
        gmail,
        phone,
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
      setIiStatus("pending");
    },
    [principal],
  );

  const approveRequest = useCallback(
    async (targetPrincipal: string, role: UserRole) => {
      if (!actor) return;
      try {
        const p = Principal.fromText(targetPrincipal);
        await actor.assignCallerUserRole(p, "user" as never);
      } catch (e) {
        console.error("Failed to assign role:", e);
        throw e;
      }
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
          gmail: "",
          phone: "",
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

  useEffect(() => {
    if (!adminUnlocked || !actor) return;
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
        passwordSession,
        currentAccount: passwordSession?.account ?? null,
        savePasswordSession,
        clearPasswordSession,
        updateAccount,
        logout,
        exitAdmin,
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
