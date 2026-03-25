import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Stethoscope,
  X,
  XCircle,
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
        if (e.target === e.currentTarget) onClose();
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
        }}
        data-ocid="admin_login.modal"
      >
        <div className="flex items-center justify-between mb-4">
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
              className="text-base font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Admin Access
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="admin_login.close_button"
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="relative mb-4">
          <Input
            data-ocid="admin_login.passphrase.input"
            type={showPass ? "text" : "password"}
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Admin passphrase"
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
          className="w-full h-10"
          style={{
            background: "oklch(0.55 0.14 280)",
            color: "oklch(0.99 0 0)",
          }}
        >
          {loading ? "Verifying..." : "Unlock Admin"}
        </Button>
      </motion.div>
    </motion.div>
  );
}

export function DeniedPage() {
  const { passwordSession, logout } = useAccessControl();
  const { identity, clear: clearII } = useInternetIdentity();
  const [showAdminModal, setShowAdminModal] = useState(false);

  const isPasswordUser = !!passwordSession;
  const account = passwordSession?.account;
  const principal = identity?.getPrincipal().toString() ?? "";

  function handleSignOut() {
    if (isPasswordUser) logout();
    else clearII();
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
                background: "oklch(var(--destructive) / 0.10)",
                border: "2px solid oklch(var(--destructive) / 0.25)",
              }}
            >
              <XCircle
                className="w-8 h-8"
                style={{ color: "oklch(var(--destructive))" }}
              />
            </div>
            <h2
              className="text-xl font-display font-bold mb-2"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Access Denied
            </h2>
            {account && (
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "oklch(var(--teal))" }}
              >
                {account.name}
              </p>
            )}
            <p
              className="text-sm max-w-xs"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Your access request was not approved. Please contact the admin to
              request access.
            </p>
          </div>

          <div
            className="rounded-lg p-4 mb-5"
            style={{
              background: "oklch(var(--destructive) / 0.05)",
              border: "1px solid oklch(var(--destructive) / 0.2)",
            }}
          >
            {isPasswordUser && account ? (
              <p
                className="text-sm text-center"
                style={{ color: "oklch(var(--destructive))" }}
              >
                Contact admin with your Gmail: <strong>{account.gmail}</strong>
              </p>
            ) : (
              <p
                className="text-sm text-center"
                style={{ color: "oklch(var(--destructive))" }}
              >
                Share your Principal ID below with the admin.
              </p>
            )}
          </div>

          {!isPasswordUser && principal && (
            <div
              className="pt-4 border-t mb-4"
              style={{ borderColor: "oklch(var(--border))" }}
            >
              <p
                className="text-xs font-semibold mb-2"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Your Principal ID
              </p>
              <div
                className="p-3 rounded-lg border"
                style={{
                  background: "oklch(var(--muted) / 0.5)",
                  borderColor: "oklch(var(--border))",
                }}
              >
                <p
                  className="text-xs font-mono break-all"
                  style={{ color: "oklch(var(--teal))" }}
                >
                  {principal}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
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
              onClick={() => setShowAdminModal(true)}
              data-ocid="denied.admin_login.button"
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
