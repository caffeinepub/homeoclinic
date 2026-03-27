import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import {
  CalendarDays,
  Columns2,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Menu,
  Microscope,
  Settings,
  Stethoscope,
  StickyNote,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const NAV_ITEMS = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/patients", icon: Users, label: "Patients" },
  { href: "/remedies", icon: FlaskConical, label: "Remedy Reference" },
  { href: "/remedy-compare", icon: Columns2, label: "Compare Remedies" },
  { href: "/diagnosis-finder", icon: Microscope, label: "Diagnosis Finder" },
  { href: "/appointments", icon: CalendarDays, label: "Appointments" },
  { href: "/memos", icon: StickyNote, label: "Memos" },
];

function NavLink({
  href,
  icon: Icon,
  label,
  onClick,
  ocid,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  ocid?: string;
}) {
  const router = useRouter();
  const location = router.state.location;
  const isActive =
    location.pathname === href ||
    (href !== "/" && location.pathname.startsWith(href));

  return (
    <Link
      to={href}
      data-ocid={ocid ?? `nav.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative"
      style={{
        color: isActive
          ? "oklch(var(--sidebar-primary))"
          : "oklch(var(--sidebar-foreground) / 0.65)",
        background: isActive
          ? "oklch(var(--sidebar-primary) / 0.12)"
          : "transparent",
      }}
    >
      {isActive && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
          style={{ background: "oklch(var(--sidebar-primary))" }}
        />
      )}
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const { clear, identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-4)}`
    : "";

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "oklch(var(--sidebar))" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: "oklch(var(--sidebar-border))" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: "oklch(var(--sidebar-primary) / 0.15)",
            border: "1px solid oklch(var(--sidebar-primary) / 0.3)",
          }}
        >
          <Stethoscope
            className="w-4 h-4"
            style={{ color: "oklch(var(--sidebar-primary))" }}
          />
        </div>
        <div>
          <div
            className="text-sm font-display font-bold tracking-tight"
            style={{ color: "oklch(var(--sidebar-foreground))" }}
          >
            HomeoClinic
          </div>
          <div
            className="text-xs"
            style={{ color: "oklch(var(--sidebar-foreground) / 0.45)" }}
          >
            Clinical System
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto p-1 rounded"
            style={{ color: "oklch(var(--sidebar-foreground) / 0.5)" }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} onClick={onClose} />
        ))}
      </nav>

      {/* Settings + User + logout */}
      <div
        className="px-3 py-4 border-t space-y-0.5"
        style={{ borderColor: "oklch(var(--sidebar-border))" }}
      >
        <NavLink
          href="/settings"
          icon={Settings}
          label="Settings"
          onClick={onClose}
          ocid="nav.settings.link"
        />
        {shortPrincipal && (
          <div
            className="flex items-center gap-2 px-3 py-2 mt-1 rounded-lg"
            style={{ background: "oklch(var(--sidebar-accent))" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{
                background: "oklch(var(--sidebar-primary) / 0.2)",
                color: "oklch(var(--sidebar-primary))",
              }}
            >
              Dr
            </div>
            <span
              className="text-xs font-mono truncate"
              style={{ color: "oklch(var(--sidebar-foreground) / 0.5)" }}
            >
              {shortPrincipal}
            </span>
          </div>
        )}
        <button
          type="button"
          data-ocid="nav.logout.button"
          onClick={() => {
            clear();
          }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
          style={{ color: "oklch(var(--sidebar-foreground) / 0.55)" }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "oklch(var(--background))" }}
    >
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-58 flex-shrink-0 border-r"
        style={{
          width: "14.5rem",
          borderColor: "oklch(var(--sidebar-border))",
        }}
      >
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -232 }}
              animate={{ x: 0 }}
              exit={{ x: -232 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden border-r"
              style={{
                width: "14.5rem",
                borderColor: "oklch(var(--sidebar-border))",
              }}
            >
              <Sidebar onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header
          className="lg:hidden flex items-center gap-3 px-4 h-14 border-b flex-shrink-0"
          style={{
            borderColor: "oklch(var(--border))",
            background: "oklch(var(--card))",
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            className="w-8 h-8"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Stethoscope
              className="w-4 h-4"
              style={{ color: "oklch(var(--teal))" }}
            />
            <span
              className="text-sm font-display font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              HomeoClinic
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
