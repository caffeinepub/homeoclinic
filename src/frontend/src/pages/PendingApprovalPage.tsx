import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAccessControl } from "../context/AccessControlContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function PendingApprovalPage() {
  const { allRequests, refreshStatus } = useAccessControl();
  const { identity, clear } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? "";
  const [isRefreshing, setIsRefreshing] = useState(false);

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
