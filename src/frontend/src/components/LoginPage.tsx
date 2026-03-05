import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  Eye,
  EyeOff,
  LogIn,
  Shield,
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
} from "../context/AccessControlContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  async function handleAdminLogin() {
    if (!passphrase.trim()) {
      toast.error("Please enter the admin passphrase");
      return;
    }
    setAdminLoading(true);
    // Small delay for UX feel
    await new Promise((r) => setTimeout(r, 400));
    if (passphrase === ADMIN_PASSPHRASE) {
      setAdminSession(true);
      toast.success("Admin access granted");
      setShowAdminModal(false);
      // Trigger login to get identity
      login();
    } else {
      toast.error("Incorrect passphrase");
    }
    setAdminLoading(false);
  }

  function handleModalClose() {
    setShowAdminModal(false);
    setPassphrase("");
    setShowPass(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(var(--background))" }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.45 0.14 193) 1px, transparent 1px), linear-gradient(to right, oklch(0.45 0.14 193) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Soft ambient orbs */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.45 0.14 193), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.45 0.15 260), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="rounded-2xl border p-8"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
            boxShadow:
              "0 8px 32px oklch(0.15 0.010 240 / 0.08), 0 2px 8px oklch(0.15 0.010 240 / 0.04)",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "oklch(var(--teal) / 0.10)",
                border: "1px solid oklch(0.45 0.14 193 / 0.25)",
              }}
            >
              <Stethoscope
                className="w-8 h-8"
                style={{ color: "oklch(var(--teal))" }}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1
              className="text-3xl font-display font-bold tracking-tight mb-2"
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
            <div
              className="mt-1 h-px w-16 mx-auto rounded"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.45 0.14 193), transparent)",
              }}
            />
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {[
              {
                icon: Activity,
                text: "Full homeopathic case sheet management",
              },
              { icon: Shield, text: "Year-wise patient record organization" },
              {
                icon: Stethoscope,
                text: "Remedy reference with Boericke & Synoptic Key",
              },
            ].map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 text-sm"
                style={{ color: "oklch(var(--foreground))" }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(var(--teal) / 0.08)" }}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: "oklch(var(--teal))" }}
                  />
                </div>
                {text}
              </motion.div>
            ))}
          </div>

          {/* Doctor login button */}
          <Button
            data-ocid="auth.primary_button"
            onClick={login}
            disabled={isLoggingIn || isInitializing}
            className="w-full h-11 text-sm font-semibold mb-3"
            style={{
              background: "oklch(var(--teal))",
              color: "oklch(0.99 0 0)",
            }}
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <span
                  className="w-4 h-4 border-2 rounded-full animate-spin"
                  style={{
                    borderColor: "oklch(0.99 0 0 / 0.3)",
                    borderTopColor: "oklch(0.99 0 0)",
                  }}
                />
                Connecting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Doctor Login
              </span>
            )}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex-1 h-px"
              style={{ background: "oklch(var(--border))" }}
            />
            <span
              className="text-xs"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "oklch(var(--border))" }}
            />
          </div>

          {/* Admin login button */}
          <Button
            data-ocid="auth.admin_login.button"
            onClick={() => setShowAdminModal(true)}
            disabled={isLoggingIn || isInitializing}
            variant="outline"
            className="w-full h-11 text-sm font-semibold"
            style={{
              borderColor: "oklch(0.55 0.14 280 / 0.4)",
              color: "oklch(0.55 0.14 280)",
              background: "oklch(0.55 0.14 280 / 0.05)",
            }}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Admin Login
            </span>
          </Button>

          <p
            className="text-center text-xs mt-4"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Secure authentication via Internet Identity
          </p>
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
              if (e.target === e.currentTarget) handleModalClose();
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
              {/* Header */}
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
                  onClick={handleModalClose}
                  className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p
                className="text-sm mb-5"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Enter the admin passphrase to access HomeoClinic with full admin
                privileges.
              </p>

              {/* Passphrase input */}
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
