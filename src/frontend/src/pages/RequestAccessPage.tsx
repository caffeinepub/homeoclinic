import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Copy, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAccessControl } from "../context/AccessControlContext";
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
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!reason.trim()) {
      toast.error("Please enter your reason for access");
      return;
    }
    if (!principal) {
      toast.error("Not logged in. Please refresh and try again.");
      return;
    }
    setIsSubmitting(true);
    let attempts = 0;
    const maxAttempts = 5;
    while (attempts < maxAttempts) {
      try {
        await submitRequest(name, qualification, reason);
        setSubmitted(true);
        setIsSubmitting(false);
        return;
      } catch (_err) {
        attempts++;
        if (attempts < maxAttempts) {
          // Wait a moment for the actor to be ready, then retry
          await new Promise((res) => setTimeout(res, 1500));
        } else {
          toast.error(
            "Failed to submit request. Please check your connection and try again.",
          );
          setIsSubmitting(false);
        }
      }
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
                {principal || "Loading…"}
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

          {/* Sign out */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={clear}
              className="text-xs underline"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Sign out
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
    </div>
  );
}
