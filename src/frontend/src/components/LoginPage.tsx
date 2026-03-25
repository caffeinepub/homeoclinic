import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Activity,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  LogIn,
  Shield,
  ShieldCheck,
  Stethoscope,
  UserPlus,
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
import { getAnonymousActor, hashPassword } from "../utils/auth";

type LoginMode = "password" | "register_link";

function AdminModal({
  onClose,
}: {
  onClose: () => void;
}) {
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
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center"
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
  );
}

interface LoginPageProps {
  forceStep2?: boolean;
}

export function LoginPage({ forceStep2 = false }: LoginPageProps) {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();
  const { savePasswordSession } = useAccessControl();

  const [mode] = useState<LoginMode>("password");
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Password login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingInPw, setIsLoggingInPw] = useState(false);

  // Step 2: need II after password validated
  const [step2, setStep2] = useState(forceStep2);
  const [validatedUsername, setValidatedUsername] = useState("");

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter your username and password");
      return;
    }
    setIsLoggingInPw(true);
    try {
      const hash = await hashPassword(password);
      const actor = await getAnonymousActor();
      const account = await actor.loginWithPassword(username.trim(), hash);
      if (!account) {
        toast.error("Invalid username or password");
        return;
      }
      // Save password session
      savePasswordSession(account);
      setValidatedUsername(account.username);
      // Move to Step 2: connect Internet Identity
      setStep2(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Login failed: ${msg}`);
    } finally {
      setIsLoggingInPw(false);
    }
  }

  const pageContent =
    mode === "password" ? (
      <div>
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "oklch(var(--teal) / 0.10)",
              border: "1px solid oklch(0.45 0.14 193 / 0.25)",
            }}
          >
            <Stethoscope
              className="w-7 h-7"
              style={{ color: "oklch(var(--teal))" }}
            />
          </div>
        </div>
        <div className="text-center mb-6">
          <h1
            className="text-3xl font-display font-bold tracking-tight mb-1"
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
            className="mt-2 h-px w-16 mx-auto rounded"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.45 0.14 193), transparent)",
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {step2 ? (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 2: Connect II */}
              <div
                className="rounded-xl p-4 mb-5"
                style={{
                  background: "oklch(var(--teal) / 0.06)",
                  border: "1px solid oklch(var(--teal) / 0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "oklch(var(--teal))",
                      color: "oklch(0.99 0 0)",
                    }}
                  >
                    2
                  </div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    Connect Internet Identity
                  </p>
                </div>
                <p
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {validatedUsername
                    ? `Logged in as ${validatedUsername}. `
                    : ""}
                  Connect your Internet Identity to secure backend access.
                </p>
              </div>
              <Button
                data-ocid="auth.connect_ii.button"
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
                    <Fingerprint className="w-4 h-4" />
                    Connect Internet Identity
                  </span>
                )}
              </Button>
              <button
                type="button"
                onClick={() => setStep2(false)}
                className="w-full text-xs underline text-center"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                ← Back to login
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1 indicator */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "oklch(var(--teal))",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  1
                </div>
                <p
                  className="text-xs font-medium"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Sign in with your credentials
                </p>
              </div>

              <form onSubmit={handlePasswordLogin} className="space-y-4 mb-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-username"
                    className="text-xs font-medium"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    Username
                  </Label>
                  <Input
                    id="login-username"
                    data-ocid="auth.username.input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    autoFocus
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-password"
                    className="text-xs font-medium"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      data-ocid="auth.password.input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs"
                    style={{ color: "oklch(var(--teal))" }}
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("homeo_navigate", { detail: "forgot" }),
                      );
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <Button
                  data-ocid="auth.password_login.button"
                  type="submit"
                  disabled={isLoggingInPw}
                  className="w-full h-11 text-sm font-semibold"
                  style={{
                    background: "oklch(var(--teal))",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {isLoggingInPw ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{
                          borderColor: "oklch(0.99 0 0 / 0.3)",
                          borderTopColor: "oklch(0.99 0 0)",
                        }}
                      />
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </span>
                  )}
                </Button>
              </form>

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

              {/* Internet Identity alternative */}
              <Button
                data-ocid="auth.ii_login.button"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                variant="outline"
                className="w-full h-10 text-sm font-medium mb-3"
                style={{
                  borderColor: "oklch(var(--teal) / 0.4)",
                  color: "oklch(var(--teal))",
                  background: "oklch(var(--teal) / 0.04)",
                }}
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{
                        borderColor: "oklch(var(--teal) / 0.3)",
                        borderTopColor: "oklch(var(--teal))",
                      }}
                    />
                    Connecting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4" />
                    Login with Internet Identity
                  </span>
                )}
              </Button>

              {/* Register link */}
              <div className="text-center mb-4">
                <span
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  New doctor?{" "}
                </span>
                <button
                  type="button"
                  data-ocid="auth.register.link"
                  className="text-xs font-semibold underline"
                  style={{ color: "oklch(var(--teal))" }}
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("homeo_navigate", { detail: "register" }),
                    );
                  }}
                >
                  Register here
                </button>
              </div>

              {/* Admin */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex-1 h-px"
                  style={{ background: "oklch(var(--border))" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  admin
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "oklch(var(--border))" }}
                />
              </div>
              <Button
                data-ocid="auth.admin_login.button"
                onClick={() => setShowAdminModal(true)}
                variant="outline"
                className="w-full h-10 text-sm font-semibold"
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature hints (only on step 1) */}
        {!step2 && (
          <div className="mt-6 space-y-2">
            {[
              { icon: Activity, text: "Full HMCC case sheet management" },
              { icon: Shield, text: "Year-wise patient record organization" },
              {
                icon: Stethoscope,
                text: "Remedy reference with 58+ polychrests",
              },
              { icon: UserPlus, text: "Role-based access control" },
              {
                icon: KeyRound,
                text: "Cross-device login with username & password",
              },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 text-xs"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                <div
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(var(--teal) / 0.08)" }}
                >
                  <Icon
                    className="w-3 h-3"
                    style={{ color: "oklch(var(--teal))" }}
                  />
                </div>
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
    ) : null;

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(var(--background))" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.45 0.14 193) 1px, transparent 1px), linear-gradient(to right, oklch(0.45 0.14 193) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
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
          {pageContent}
        </div>

        <p
          className="text-center text-xs mt-4"
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
        </p>
      </motion.div>

      <AnimatePresence>
        {showAdminModal && (
          <AdminModal onClose={() => setShowAdminModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
