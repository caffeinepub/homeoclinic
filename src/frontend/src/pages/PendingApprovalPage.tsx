import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
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
import { useActorDirect } from "../hooks/useActorDirect";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function AdminModal({ onClose }: { onClose: () => void }) {
  const [passphrase, setPassphrase] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, identity } = useInternetIdentity();

  async function handleAdminLogin() {
    if (!passphrase.trim()) {
      toast.error("Please enter the admin passphrase");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    if (passphrase === ADMIN_PASSPHRASE) {
      setAdminSession(true);
      toast.success("Admin access granted");
      onClose();
      if (!identity) login();
    } else {
      toast.error("Incorrect passphrase");
    }
    setLoading(false);
  }

  return (
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
          onClose();
          setPassphrase("");
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
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
              onClose();
              setPassphrase("");
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
            type={showPass ? "text" : "password"}
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Enter admin passphrase"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdminLogin();
            }}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            {showPass ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        <Button
          data-ocid="admin_login.submit.button"
          onClick={handleAdminLogin}
          disabled={loading}
          className="w-full h-10 text-sm font-semibold"
          style={{
            background: "oklch(0.55 0.14 280)",
            color: "oklch(0.99 0 0)",
          }}
        >
          {loading ? (
            "Verifying..."
          ) : (
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Unlock Admin Access
            </span>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}

export function PendingApprovalPage() {
  const { allRequests, refreshStatus, passwordSession, logout } =
    useAccessControl();
  const { identity, clear: clearII } = useInternetIdentity();
  const { actor } = useActorDirect();
  const principal = identity?.getPrincipal().toString() ?? "";
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const isPasswordUser = !!passwordSession;
  const account = passwordSession?.account;
  const myIIRequest = allRequests.find((r) => r.principal === principal);

  async function handleRefresh() {
    setIsRefreshing(true);
    if (isPasswordUser && account && actor) {
      try {
        const accounts = await actor.getAllDoctorAccounts();
        const found = accounts.find((a) => a.username === account.username);
        if (found && found.role !== "pending") {
          toast.success("Status updated! Refreshing...");
        } else {
          toast.info("Still pending approval");
        }
      } catch {
        toast.error("Could not check status. Please try again.");
      }
    } else {
      refreshStatus();
    }
    setTimeout(() => setIsRefreshing(false), 1500);
  }

  function handleSignOut() {
    if (isPasswordUser) {
      logout();
    } else {
      clearII();
    }
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

        <div
          className="rounded-2xl border p-6"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
            boxShadow: "var(--card-shadow)",
          }}
        >
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
            {(account || myIIRequest) && (
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "oklch(var(--teal))" }}
              >
                {account?.name || myIIRequest?.name}
              </p>
            )}
            <p
              className="text-sm max-w-xs"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Your access request has been submitted. The admin will review it
              shortly.
            </p>
          </div>

          {/* Details */}
          {isPasswordUser && account ? (
            <div
              className="rounded-lg p-4 mb-5 space-y-2"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                border: "1px solid oklch(var(--border))",
              }}
            >
              {[
                { label: "Username", value: account.username },
                { label: "Name", value: account.name },
                { label: "Qualification", value: account.qualification || "—" },
                { label: "Gmail", value: account.gmail },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-xs">
                  <span style={{ color: "oklch(var(--muted-foreground))" }}>
                    {label}
                  </span>
                  <span
                    className="font-medium"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          ) : myIIRequest ? (
            <div
              className="rounded-lg p-4 mb-5 space-y-2"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                border: "1px solid oklch(var(--border))",
              }}
            >
              {[
                { label: "Name", value: myIIRequest.name },
                {
                  label: "Qualification",
                  value: myIIRequest.qualification || "—",
                },
                {
                  label: "Submitted",
                  value: new Date(myIIRequest.submittedAt).toLocaleDateString(),
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-xs">
                  <span style={{ color: "oklch(var(--muted-foreground))" }}>
                    {label}
                  </span>
                  <span
                    className="font-medium"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

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

          {/* Sign out + admin */}
          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleSignOut}
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

      <AnimatePresence>
        {showAdminModal && (
          <AdminModal onClose={() => setShowAdminModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
