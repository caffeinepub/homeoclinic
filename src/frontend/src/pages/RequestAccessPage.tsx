import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
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

export function RequestAccessPage() {
  const { submitRequest } = useAccessControl();
  const { identity, clear } = useInternetIdentity();
  const { actor, isFetching: actorLoading } = useActorDirect();
  const principal = identity?.getPrincipal().toString() ?? "";
  const backendReady = !!actor;

  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  function handleCopyPrincipal() {
    if (principal) {
      navigator.clipboard.writeText(principal).then(() => {
        toast.success("Principal ID copied to clipboard");
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!qualification.trim()) {
      toast.error("Please enter your qualification");
      return;
    }
    if (!gmail.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(gmail.trim())) {
      toast.error("Please enter a valid Gmail address");
      return;
    }
    if (!reason.trim()) {
      toast.error("Please enter your reason for access");
      return;
    }
    if (!principal) {
      toast.error("Not logged in. Please refresh and try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitRequest(name, qualification, reason, gmail, phone);
      setSubmitted(true);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      toast.error(`Failed to submit request: ${errMsg}`);
    } finally {
      setIsSubmitting(false);
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

        {/* Card */}
        <div
          className="rounded-2xl border p-6"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {!submitted ? (
            <>
              <div className="mb-6">
                <h2
                  className="text-lg font-display font-semibold mb-1"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  Request Access
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Your account is not yet approved. Please fill in your details
                  and submit a request. The admin will review and grant access.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="req-name"
                    className="text-xs font-semibold"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="req-name"
                    data-ocid="request_access.name.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Your Name"
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="req-qual"
                    className="text-xs font-semibold"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Qualification *
                  </Label>
                  <Input
                    id="req-qual"
                    data-ocid="request_access.qualification.input"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g. BHMS, MD (Hom)"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="req-gmail"
                    className="text-xs font-semibold"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Gmail Address *
                  </Label>
                  <Input
                    id="req-gmail"
                    data-ocid="request_access.gmail.input"
                    type="email"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    required
                  />
                  <p
                    className="text-[10px]"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Used by admin to contact you if needed (e.g. account reset)
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="req-phone"
                    className="text-xs font-semibold"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="req-phone"
                    data-ocid="request_access.phone.input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="req-reason"
                    className="text-xs font-semibold"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Reason for Access *
                  </Label>
                  <Textarea
                    id="req-reason"
                    data-ocid="request_access.reason.textarea"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly explain why you need access to HomeoClinic..."
                    rows={3}
                    required
                    className="resize-none"
                  />
                </div>

                {!backendReady && !actorLoading && (
                  <p
                    className="text-xs text-center"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Connecting to server... Please wait before submitting.
                  </p>
                )}
                {actorLoading && (
                  <p
                    className="text-xs text-center"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Connecting to server...
                  </p>
                )}
                <Button
                  data-ocid="request_access.submit.button"
                  type="submit"
                  disabled={isSubmitting || actorLoading}
                  className="w-full mt-2"
                  style={{
                    background: "oklch(var(--teal))",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : actorLoading
                      ? "Connecting..."
                      : "Submit Request"}
                </Button>
              </form>
            </>
          ) : (
            /* Submitted confirmation */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(var(--teal) / 0.12)" }}
              >
                <CheckCircle2
                  className="w-6 h-6"
                  style={{ color: "oklch(var(--teal))" }}
                />
              </div>
              <h3
                className="text-base font-display font-semibold mb-2"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Request Submitted
              </h3>
              <p
                className="text-sm"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Your request has been submitted. Please wait for admin approval.
                You will have access once the admin approves your request.
              </p>
            </motion.div>
          )}

          {/* Principal ID box */}
          <div
            className="mt-6 pt-5 border-t"
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
                {principal || "Loading\u2026"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-ocid="request_access.copy_principal.button"
                onClick={handleCopyPrincipal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: "oklch(var(--muted))",
                  color: "oklch(var(--muted-foreground))",
                }}
              >
                <Copy className="w-3 h-3" /> Copy ID
              </button>
              <p
                className="text-xs flex-1"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Share this with the admin if needed.
              </p>
            </div>
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
              data-ocid="request_access.admin_login.button"
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
          &copy; {new Date().getFullYear()}. Built with love using{" "}
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
