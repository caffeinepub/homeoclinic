import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, KeyRound, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAccessControl } from "../context/AccessControlContext";
import { useActorDirect } from "../hooks/useActorDirect";
import { hashPassword } from "../utils/auth";

export function ForceChangePasswordPage() {
  const { currentAccount, updateAccount, logout } = useAccessControl();
  const { actor } = useActorDirect();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentAccount) {
      toast.error("No active session");
      return;
    }
    if (!currentPassword) {
      toast.error("Enter your current (temporary) password");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!actor) {
      toast.error("Not connected to backend. Please wait.");
      return;
    }

    setIsSubmitting(true);
    try {
      const oldHash = await hashPassword(currentPassword);
      const newHash = await hashPassword(newPassword);
      const result = await actor.changeOwnPassword(
        currentAccount.username,
        oldHash,
        newHash,
      );
      if (result !== "ok") {
        toast.error(result || "Failed to change password");
        return;
      }
      // Update the stored account to clear mustChangePassword
      updateAccount({ ...currentAccount, mustChangePassword: false });
      toast.success("Password changed successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Error: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
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
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="rounded-2xl border p-8"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
            boxShadow: "0 8px 32px oklch(0.15 0.010 240 / 0.08)",
          }}
        >
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "oklch(0.55 0.14 80 / 0.10)",
                border: "1px solid oklch(0.55 0.14 80 / 0.3)",
              }}
            >
              <KeyRound
                className="w-7 h-7"
                style={{ color: "oklch(0.55 0.14 80)" }}
              />
            </div>
          </div>

          <div className="text-center mb-2">
            <div className="flex justify-center mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "oklch(var(--teal) / 0.12)",
                  border: "1px solid oklch(var(--teal) / 0.3)",
                }}
              >
                <Stethoscope
                  className="w-4 h-4"
                  style={{ color: "oklch(var(--teal))" }}
                />
              </div>
            </div>
            <h1
              className="text-2xl font-display font-bold mb-2"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Set New Password
            </h1>
            <p
              className="text-sm"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Your password was reset by the admin. Please set a new password to
              continue.
            </p>
          </div>

          {currentAccount && (
            <div
              className="rounded-lg px-4 py-2 mb-5 text-center"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                border: "1px solid oklch(var(--border))",
              }}
            >
              <p
                className="text-xs"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Logged in as{" "}
                <span
                  className="font-semibold"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {currentAccount.username}
                </span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current-pw" className="text-xs font-medium">
                Current (Temporary) Password
              </Label>
              <div className="relative">
                <Input
                  id="current-pw"
                  data-ocid="force_change_password.current.input"
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter the temporary password"
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {showCurrent ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-pw" className="text-xs font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-pw"
                  data-ocid="force_change_password.new.input"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {showNew ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm-pw" className="text-xs font-medium">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-pw"
                  data-ocid="force_change_password.confirm.input"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              data-ocid="force_change_password.submit.button"
              type="submit"
              disabled={isSubmitting || !actor}
              className="w-full h-11 text-sm font-semibold"
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
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  Set New Password
                </span>
              )}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={logout}
              className="text-xs underline"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Sign out
            </button>
          </div>
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
    </div>
  );
}
