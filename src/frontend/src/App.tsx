import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppLayout } from "./components/AppLayout";
import { LoginPage } from "./components/LoginPage";
import {
  AccessControlProvider,
  useAccessControl,
} from "./context/AccessControlContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Appointments } from "./pages/Appointments";
import { CaseSheet } from "./pages/CaseSheet";
import { Dashboard } from "./pages/Dashboard";
import { DeniedPage } from "./pages/DeniedPage";
import { ForceChangePasswordPage } from "./pages/ForceChangePasswordPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { Memos } from "./pages/Memos";
import { PatientDetail } from "./pages/PatientDetail";
import { Patients } from "./pages/Patients";
import { PendingApprovalPage } from "./pages/PendingApprovalPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { Remedies } from "./pages/Remedies";
import { RemedyCompare } from "./pages/RemedyCompare";
import { RequestAccessPage } from "./pages/RequestAccessPage";
import { Settings } from "./pages/Settings";

type AppPage = "login" | "register" | "forgot";

function Spinner({ label }: { label: string }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(var(--background))" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-5 h-5 border-2 rounded-full animate-spin"
          style={{
            borderColor: "oklch(var(--teal) / 0.3)",
            borderTopColor: "oklch(var(--teal))",
          }}
        />
        <span
          className="text-sm"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function RootLayout() {
  const { identity, isInitializing } = useInternetIdentity();
  const { accessState, passwordSession } = useAccessControl();
  const [adminEnteredApp, setAdminEnteredApp] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>("login");

  // Listen for navigation events from LoginPage
  useEffect(() => {
    function handleNavigate(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "register") setCurrentPage("register");
      else if (detail === "forgot") setCurrentPage("forgot");
      else setCurrentPage("login");
    }
    window.addEventListener("homeo_navigate", handleNavigate);
    return () => window.removeEventListener("homeo_navigate", handleNavigate);
  }, []);

  // Reset page nav when we have a valid session
  // Bug #1 fix: also reset adminEnteredApp when accessState leaves "admin"
  // so the next admin login always shows the dashboard first
  useEffect(() => {
    if (accessState === "approved" || accessState === "admin") {
      setCurrentPage("login");
    }
    if (accessState !== "admin") {
      setAdminEnteredApp(false);
    }
  }, [accessState]);

  if (isInitializing) {
    return <Spinner label="Initializing…" />;
  }

  // — Pre-login pages (always available regardless of session) —
  if (currentPage === "register") {
    return <RegistrationPage onGoToLogin={() => setCurrentPage("login")} />;
  }
  if (currentPage === "forgot") {
    return <ForgotPasswordPage onGoToLogin={() => setCurrentPage("login")} />;
  }

  // — No session at all —
  if (!identity && !passwordSession) {
    return <LoginPage />;
  }

  // — Admin session —
  if (accessState === "admin") {
    if (!adminEnteredApp) {
      return <AdminDashboard onEnterApp={() => setAdminEnteredApp(true)} />;
    }
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  }

  // — Loading —
  if (accessState === "loading") {
    return <Spinner label="Checking access…" />;
  }

  // — Password session needs II —
  if (accessState === "need_ii" || (passwordSession && !identity)) {
    return <LoginPage forceStep2 />;
  }

  // — Must change password —
  if (accessState === "must_change_password") {
    return <ForceChangePasswordPage />;
  }

  // — Pending —
  if (accessState === "pending") {
    return <PendingApprovalPage />;
  }

  // — Denied —
  if (accessState === "denied") {
    return <DeniedPage />;
  }

  // — II user with no profile —
  if (accessState === "unknown" && identity && !passwordSession) {
    return <RequestAccessPage />;
  }

  // — Unknown without session — show login
  if (accessState === "unknown") {
    return <LoginPage />;
  }

  // — Approved —
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

// Route tree
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});
const patientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patients",
  component: Patients,
});
const patientDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patients/$id",
  component: PatientDetail,
});
const caseSheetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cases/$id",
  component: CaseSheet,
});
const remediesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/remedies",
  component: Remedies,
});
const remedyCompareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/remedy-compare",
  component: RemedyCompare,
});
const appointmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/appointments",
  component: Appointments,
});
const memosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/memos",
  component: Memos,
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: Settings,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  patientsRoute,
  patientDetailRoute,
  caseSheetRoute,
  remediesRoute,
  remedyCompareRoute,
  appointmentsRoute,
  memosRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <AccessControlProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AccessControlProvider>
    </ThemeProvider>
  );
}
