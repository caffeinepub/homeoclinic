import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import {
  CalendarDays,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Menu,
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
  { href: "/appointments", icon: CalendarDays, label: "Appointments" },
  { href: "/memos", icon: StickyNote, label: "Memos" },
];

function NavLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) {
  const router = useRouter();
  const location = router.state.location;
  const isActive =
    location.pathname === href ||
    (href !== "/" && location.pathname.startsWith(href));

  return (
    <Link
      to={href}
      data-ocid={`nav.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative"
      style={{
        color: isActive ? "oklch(0.72 0.14 193)" : "oklch(0.60 0.010 240)",
        background: isActive ? "oklch(0.72 0.14 193 / 0.12)" : "transparent",
      }}
    >
      {isActive && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
          style={{ background: "oklch(0.72 0.14 193)" }}
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
      style={{ background: "oklch(0.13 0.008 240)" }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: "oklch(0.20 0.010 240)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: "oklch(0.72 0.14 193 / 0.15)",
            border: "1px solid oklch(0.72 0.14 193 / 0.3)",
          }}
        >
          <Stethoscope
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.14 193)" }}
          />
        </div>
        <div>
          <div
            className="text-sm font-display font-bold tracking-tight"
            style={{ color: "oklch(0.93 0.008 240)" }}
          >
            HomeoClinic
          </div>
          <div className="text-xs" style={{ color: "oklch(0.45 0.008 240)" }}>
            Clinical System
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto p-1 rounded"
            style={{ color: "oklch(0.50 0.008 240)" }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} onClick={onClose} />
        ))}
      </nav>

      {/* User + logout */}
      <div
        className="px-3 py-4 border-t"
        style={{ borderColor: "oklch(0.20 0.010 240)" }}
      >
        {shortPrincipal && (
          <div
            className="flex items-center gap-2 px-3 py-2 mb-2 rounded-lg"
            style={{ background: "oklch(0.18 0.010 240)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: "oklch(0.72 0.14 193 / 0.2)",
                color: "oklch(0.72 0.14 193)",
              }}
            >
              Dr
            </div>
            <span
              className="text-xs font-mono truncate"
              style={{ color: "oklch(0.50 0.008 240)" }}
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
          style={{ color: "oklch(0.55 0.010 240)" }}
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
      style={{ background: "oklch(0.97 0.004 240)" }}
    >
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 flex-shrink-0 border-r"
        style={{ borderColor: "oklch(0.22 0.010 240)" }}
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
              initial={{ x: -224 }}
              animate={{ x: 0 }}
              exit={{ x: -224 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-56 lg:hidden border-r"
              style={{ borderColor: "oklch(0.22 0.010 240)" }}
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
            borderColor: "oklch(0.88 0.010 240)",
            background: "oklch(0.97 0.004 240)",
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
              style={{ color: "oklch(0.45 0.14 193)" }}
            />
            <span
              className="text-sm font-display font-semibold"
              style={{ color: "oklch(0.15 0.010 240)" }}
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
