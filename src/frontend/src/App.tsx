import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AppLayout } from "./components/AppLayout";
import { LoginPage } from "./components/LoginPage";
import { ThemeProvider } from "./context/ThemeContext";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { Appointments } from "./pages/Appointments";
import { CaseSheet } from "./pages/CaseSheet";
import { Dashboard } from "./pages/Dashboard";
import { Memos } from "./pages/Memos";
import { PatientDetail } from "./pages/PatientDetail";
import { Patients } from "./pages/Patients";
import { Remedies } from "./pages/Remedies";
import { Settings } from "./pages/Settings";

// Root layout with auth guard — ThemeProvider wraps everything
function RootLayout() {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
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
            Initializing…
          </span>
        </div>
      </div>
    );
  }

  if (!identity) {
    return <LoginPage />;
  }

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
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
