import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Fingerprint,
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

interface RegistrationPageProps {
  onGoToLogin: () => void;
}

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
              className="text-base font-display font-semibold"
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

export function RegistrationPage({ onGoToLogin }: RegistrationPageProps) {
  const { savePasswordSession } = useAccessControl();
  const { login, isLoggingIn } = useInternetIdentity();

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step2, setStep2] = useState(false);

  // Form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validation errors
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [gmailError, setGmailError] = useState("");

  async function checkUsername() {
    if (!username.trim()) return;
    try {
      const actor = await getAnonymousActor();
      const exists = await actor.usernameExists(username.trim());
      if (exists) setUsernameError("Username already taken");
      else setUsernameError("");
    } catch {
      // ignore check errors
    }
  }

  function validate(): boolean {
    let valid = true;
    if (!username.trim()) {
      setUsernameError("Username is required");
      valid = false;
    } else if (username.trim().length < 3) {
      setUsernameError("Minimum 3 characters");
      valid = false;
    } else setUsernameError("");

    if (password.length < 8) {
      setPasswordError("Minimum 8 characters");
      valid = false;
    } else setPasswordError("");

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      valid = false;
    } else setConfirmError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!gmail.trim() || !emailRegex.test(gmail.trim())) {
      setGmailError("Valid Gmail is required");
      valid = false;
    } else setGmailError("");

    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const hash = await hashPassword(password);
      const actor = await getAnonymousActor();
      const result = await actor.registerWithPassword(
        username.trim(),
        hash,
        name.trim(),
        qualification.trim(),
        gmail.trim(),
        phone.trim(),
      );
      if (result !== "ok") {
        toast.error(result || "Registration failed");
        return;
      }
      // Auto-login to get the account
      const account = await actor.loginWithPassword(username.trim(), hash);
      if (account) {
        savePasswordSession(account);
      }
      toast.success("Registration submitted! Awaiting admin approval.");
      setStep2(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Registration failed: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-8"
      style={{ background: "oklch(var(--background))" }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.45 0.14 193) 1px, transparent 1px), linear-gradient(to right, oklch(0.45 0.14 193) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        <div
          className="rounded-2xl border p-8"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
            boxShadow: "0 8px 32px oklch(0.15 0.010 240 / 0.08)",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-5">
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

          <AnimatePresence mode="wait">
            {step2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <h1
                    className="text-2xl font-display font-bold mb-2"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    Registration Submitted
                  </h1>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Your request is awaiting admin approval.
                  </p>
                </div>
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
                    Connect Internet Identity to secure your backend access.
                    This is required to use the app.
                  </p>
                </div>
                <Button
                  data-ocid="register.connect_ii.button"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="w-full h-11 text-sm font-semibold mb-3"
                  style={{
                    background: "oklch(var(--teal))",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {isLoggingIn ? (
                    "Connecting..."
                  ) : (
                    <span className="flex items-center gap-2">
                      <Fingerprint className="w-4 h-4" />
                      Connect Internet Identity
                    </span>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={onGoToLogin}
                  className="w-full text-xs text-center underline"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Go to login
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <h1
                    className="text-2xl font-display font-bold mb-1"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    Create Account
                  </h1>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Register as a new doctor
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="reg-username" className="text-xs">
                        Username *
                      </Label>
                      <Input
                        id="reg-username"
                        data-ocid="register.username.input"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setUsernameError("");
                        }}
                        onBlur={checkUsername}
                        placeholder="e.g. drjohn"
                        autoComplete="username"
                      />
                      {usernameError && (
                        <p
                          className="text-xs"
                          style={{ color: "oklch(var(--destructive))" }}
                          data-ocid="register.username.error"
                        >
                          {usernameError}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="reg-name" className="text-xs">
                        Full Name *
                      </Label>
                      <Input
                        id="reg-name"
                        data-ocid="register.name.input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. Full Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="reg-qualification" className="text-xs">
                      Qualification *
                    </Label>
                    <Input
                      id="reg-qualification"
                      data-ocid="register.qualification.input"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      placeholder="e.g. BHMS, MD (Hom)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="reg-password" className="text-xs">
                        Password *
                      </Label>
                      <div className="relative">
                        <Input
                          id="reg-password"
                          data-ocid="register.password.input"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                          }}
                          placeholder="Min. 8 characters"
                          autoComplete="new-password"
                          className="pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          {showPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      {passwordError && (
                        <p
                          className="text-xs"
                          style={{ color: "oklch(var(--destructive))" }}
                          data-ocid="register.password.error"
                        >
                          {passwordError}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="reg-confirm" className="text-xs">
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Input
                          id="reg-confirm"
                          data-ocid="register.confirm_password.input"
                          type={showConfirm ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setConfirmError("");
                          }}
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          className="pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          {showConfirm ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      {confirmError && (
                        <p
                          className="text-xs"
                          style={{ color: "oklch(var(--destructive))" }}
                          data-ocid="register.confirm_password.error"
                        >
                          {confirmError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="reg-gmail" className="text-xs">
                        Gmail *
                      </Label>
                      <Input
                        id="reg-gmail"
                        data-ocid="register.gmail.input"
                        type="email"
                        value={gmail}
                        onChange={(e) => {
                          setGmail(e.target.value);
                          setGmailError("");
                        }}
                        placeholder="doctor@gmail.com"
                        autoComplete="email"
                      />
                      {gmailError && (
                        <p
                          className="text-xs"
                          style={{ color: "oklch(var(--destructive))" }}
                          data-ocid="register.gmail.error"
                        >
                          {gmailError}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="reg-phone" className="text-xs">
                        Phone (optional)
                      </Label>
                      <Input
                        id="reg-phone"
                        data-ocid="register.phone.input"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <Button
                    data-ocid="register.submit.button"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 text-sm font-semibold mt-2"
                    style={{
                      background: "oklch(var(--teal))",
                      color: "oklch(0.99 0 0)",
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 border-2 rounded-full animate-spin"
                          style={{
                            borderColor: "oklch(0.99 0 0 / 0.3)",
                            borderTopColor: "oklch(0.99 0 0)",
                          }}
                        />
                        Registering...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Register as Doctor
                      </span>
                    )}
                  </Button>
                </form>

                <div className="flex items-center gap-3 my-4">
                  <div
                    className="flex-1 h-px"
                    style={{ background: "oklch(var(--border))" }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    already have an account?
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "oklch(var(--border))" }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onGoToLogin}
                    data-ocid="register.go_to_login.button"
                    className="text-xs font-medium underline"
                    style={{ color: "oklch(var(--teal))" }}
                  >
                    ← Back to Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(true)}
                    data-ocid="register.admin_login.button"
                    className="flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: "oklch(0.55 0.14 280)" }}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin Login
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
