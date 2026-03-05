import { Copy, Stethoscope, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function DeniedPage() {
  const { identity, clear } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? "";

  function handleCopyPrincipal() {
    if (principal) {
      navigator.clipboard.writeText(principal).then(() => {
        toast.success("Principal ID copied to clipboard");
      });
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
            <p
              className="text-sm max-w-xs"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Your access request was not approved. Please contact the admin to
              request access.
            </p>
          </div>

          {/* Contact note */}
          <div
            className="rounded-lg p-4 mb-5"
            style={{
              background: "oklch(var(--destructive) / 0.05)",
              border: "1px solid oklch(var(--destructive) / 0.2)",
            }}
          >
            <p
              className="text-sm text-center"
              style={{ color: "oklch(var(--destructive))" }}
            >
              Please share your Principal ID below with the admin and ask them
              to approve your access.
            </p>
          </div>

          {/* Principal ID */}
          <div
            className="pt-4 border-t"
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
              data-ocid="denied.copy_principal.button"
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
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={clear}
              className="text-xs underline"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Sign out and try a different account
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
