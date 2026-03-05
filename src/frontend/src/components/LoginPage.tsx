import { Button } from "@/components/ui/button";
import { Activity, LogIn, Shield, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

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

          <Button
            data-ocid="auth.primary_button"
            onClick={login}
            disabled={isLoggingIn || isInitializing}
            className="w-full h-11 text-sm font-semibold"
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
                Sign In to HomeoClinic
              </span>
            )}
          </Button>

          <p
            className="text-center text-xs mt-4"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Secure authentication via Internet Identity
          </p>
        </div>
      </motion.div>
    </div>
  );
}
