import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  ADMIN_PASSPHRASE,
  setAdminSession,
  useAccessControl,
} from "../context/AccessControlContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function PendingApprovalPage() {
  const { allRequests, refreshStatus } = useAccessControl();
  const { identity, clear } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? "";
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Admin unlock modal
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassphrase, setAdminPassphrase] = useState("");
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  async function handleAdminLogin() {
    if (!adminPassphrase.trim()) {
      toast.error("Please enter the admin passphrase");
      return;
    }
    setAdminLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    if (adminPassphrase === ADMIN_PASSPHRASE) {
      setAdminSession(true);
      toast.success("Admin access granted");
      setShowAdminModal(false);
    } else {
      toast.error("Incorrect passphrase");
    }
    setAdminLoading(false);
  }

  const myRequest = allRequests.find((r) => r.principal === principal);

  function handleCopyPrincipal() {
    if (principal) {
      navigator.clipboard.writeText(principal).then(() => {
        toast.success("Principal ID copied to clipboard");
      });
    }
  }

  function handleRefresh() {
    setIsRefreshing(true);
    refreshStatus();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "oklch(var(--background))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Branding */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "oklch(var(--teal) / 0.12)",
              border: "2px solid oklch(var(--teal) / 0.3)",
            }}
          >
            <Stethoscope
              className="w-7 h-7"
              style={{ color: "oklch(var(--teal))" }}
            />
          </div>
          <h1
            className="text-2xl font-display font-bold tracking-tight mb-1"
            style={{ color: "oklch(var(--foreground))" }}
          >
            HomeoClinic
          </h1>
          <p
            className="text-sm"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Clinical Management System
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border p-6"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {/* Hourglass icon */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "oklch(0.55 0.14 80 / 0.10)",
                border: "2px solid oklch(0.55 0.14 80 / 0.25)",
              }}
            >
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "oklch(0.55 0.14 80)" }}
                role="img"
                aria-label="Pending approval hourglass"
              >
                <path d="M5 22h14" />
                <path d="M5 2h14" />
                <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
              </svg>
            </div>
            <h2
              className="text-xl font-display font-bold mb-2"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Request Pending Approval
            </h2>
            {myRequest && (
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "oklch(var(--teal))" }}
              >
                {myRequest.name}
              </p>
            )}
            <p
              className="text-sm max-w-xs"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Your access request has been submitted. The admin will review it
              shortly and grant you access.
            </p>
          </div>

          {/* Submitted details */}
          {myRequest && (
            <div
              className="rounded-lg p-4 mb-5 space-y-2"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                border: "1px solid oklch(var(--border))",
              }}
            >
              <div className="flex justify-between text-xs">
                <span style={{ color: "oklch(var(--muted-foreground))" }}>
                  Name
                </span>
                <span
                  className="font-medium"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {myRequest.name}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: "oklch(var(--muted-foreground))" }}>
                  Qualification
                </span>
                <span
                  className="font-medium"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {myRequest.qualification || "—"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: "oklch(var(--muted-foreground))" }}>
                  Submitted
                </span>
                <span
                  className="font-medium"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {new Date(myRequest.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

          <Button
            data-ocid="pending_approval.refresh.button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full gap-2 mb-4"
            style={{
              background: "oklch(var(--teal))",
              color: "oklch(0.99 0 0)",
            }}
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Checking..." : "Check Status"}
          </Button>

          {/* Principal ID */}
          <div
            className="pt-5 border-t"
            style={{ borderColor: "oklch(var(--border))" }}
          >
            <p
              className="text-xs font-semibold mb-2"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Your Principal ID
            </p>
            <div
              className="p-3 rounded-lg border mb-2"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                borderColor: "oklch(var(--border))",
              }}
            >
              <p
                className="text-xs font-mono break-all"
                style={{ color: "oklch(var(--teal))" }}
              >
                {principal || "Loading…"}
              </p>
            </div>
            <button
              type="button"
              data-ocid="pending_approval.copy_principal.button"
              onClick={handleCopyPrincipal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: "oklch(var(--muted))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              <Copy className="w-3 h-3" /> Copy Principal ID
            </button>
          </div>

          {/* Sign out + admin unlock */}
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={clear}
              className="text-xs underline"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Sign out
            </button>
            <button
              type="button"
              data-ocid="pending_approval.admin_login.button"
              onClick={() => setShowAdminModal(true)}
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color: "oklch(0.55 0.14 280)" }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Login
            </button>
          </div>
        </div>

        <div
          className="mt-6 text-center text-xs"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(var(--teal))" }}
          >
            caffeine.ai
          </a>
        </div>
      </motion.div>

      {/* Admin passphrase modal */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "oklch(0.08 0.01 240 / 0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowAdminModal(false);
                setAdminPassphrase("");
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-sm rounded-2xl border p-6"
              style={{
                background: "oklch(var(--card))",
                borderColor: "oklch(var(--border))",
                boxShadow: "0 16px 48px oklch(0.08 0.01 240 / 0.2)",
              }}
              data-ocid="admin_login.modal"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "oklch(0.55 0.14 280 / 0.12)" }}
                  >
                    <ShieldCheck
                      className="w-4 h-4"
                      style={{ color: "oklch(0.55 0.14 280)" }}
                    />
                  </div>
                  <h2
                    className="text-base font-display font-semibold"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    Admin Access
                  </h2>
                </div>
                <button
                  type="button"
                  data-ocid="admin_login.close_button"
                  onClick={() => {
                    setShowAdminModal(false);
                    setAdminPassphrase("");
                  }}
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p
                className="text-sm mb-4"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Enter the admin passphrase to unlock admin access.
              </p>
              <div className="relative mb-4">
                <Input
                  data-ocid="admin_login.passphrase.input"
                  type={showAdminPass ? "text" : "password"}
                  value={adminPassphrase}
                  onChange={(e) => setAdminPassphrase(e.target.value)}
                  placeholder="Enter admin passphrase"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdminLogin();
                  }}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {showAdminPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <Button
                data-ocid="admin_login.submit.button"
                onClick={handleAdminLogin}
                disabled={adminLoading}
                className="w-full h-10 text-sm font-semibold"
                style={{
                  background: "oklch(0.55 0.14 280)",
                  color: "oklch(0.99 0 0)",
                }}
              >
                {adminLoading ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{
                        borderColor: "oklch(0.99 0 0 / 0.3)",
                        borderTopColor: "oklch(0.99 0 0)",
                      }}
                    />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Unlock Admin Access
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
