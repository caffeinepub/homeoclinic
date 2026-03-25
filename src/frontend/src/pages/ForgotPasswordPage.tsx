import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, ShieldCheck, Stethoscope } from "lucide-react";
import { motion } from "motion/react";

interface ForgotPasswordPageProps {
  onGoToLogin: () => void;
}

export function ForgotPasswordPage({ onGoToLogin }: ForgotPasswordPageProps) {
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
              className="text-2xl font-display font-bold mb-2"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Forgot Password?
            </h1>
            <p
              className="text-sm"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              No worries — the admin can reset it for you
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-4 mb-6">
            {[
              {
                step: "1",
                icon: Mail,
                title: "Contact the Admin",
                desc: "Send a message to the clinic admin with your registered Gmail address.",
              },
              {
                step: "2",
                icon: ShieldCheck,
                title: "Admin Verifies & Resets",
                desc: "Admin will find your account by Gmail and reset your password to a temporary one.",
              },
              {
                step: "3",
                icon: ShieldCheck,
                title: "Set a New Password",
                desc: "Log in with the temporary password. You will be prompted to set a new password immediately.",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="flex gap-3 p-3 rounded-xl"
                style={{
                  background: "oklch(var(--muted) / 0.5)",
                  border: "1px solid oklch(var(--border))",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{
                    background: "oklch(var(--teal))",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {step}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon
                      className="w-3.5 h-3.5"
                      style={{ color: "oklch(var(--teal))" }}
                    />
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {title}
                    </p>
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-4 mb-6"
            style={{
              background: "oklch(0.55 0.14 80 / 0.08)",
              border: "1px solid oklch(0.55 0.14 80 / 0.25)",
            }}
          >
            <p
              className="text-sm text-center font-medium"
              style={{ color: "oklch(0.55 0.14 80)" }}
            >
              📧 Always register with a Gmail address you check regularly
            </p>
          </div>

          <Button
            data-ocid="forgot_password.back.button"
            onClick={onGoToLogin}
            variant="outline"
            className="w-full h-11 text-sm font-medium"
            style={{
              borderColor: "oklch(var(--border))",
              color: "oklch(var(--foreground))",
            }}
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </span>
          </Button>
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
