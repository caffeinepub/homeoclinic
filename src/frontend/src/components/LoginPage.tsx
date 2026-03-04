import { Button } from "@/components/ui/button";
import { Activity, LogIn, Shield, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(0.13 0.012 240)" }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.72 0.14 193) 1px, transparent 1px), linear-gradient(to right, oklch(0.72 0.14 193) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.14 193), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full opacity-8"
        style={{
          background:
            "radial-gradient(circle, oklch(0.60 0.18 260), transparent 70%)",
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
            background: "oklch(0.18 0.010 240)",
            borderColor: "oklch(0.30 0.012 240)",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.5), 0 0 40px oklch(0.72 0.14 193 / 0.08)",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.14 193 / 0.15)",
                border: "1px solid oklch(0.72 0.14 193 / 0.3)",
              }}
            >
              <Stethoscope
                className="w-8 h-8"
                style={{ color: "oklch(0.72 0.14 193)" }}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1
              className="text-3xl font-display font-bold tracking-tight mb-2"
              style={{ color: "oklch(0.93 0.008 240)" }}
            >
              HomeoClinic
            </h1>
            <p className="text-sm" style={{ color: "oklch(0.58 0.010 240)" }}>
              Clinical Management System
            </p>
            <div
              className="mt-1 h-px w-16 mx-auto rounded"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.72 0.14 193), transparent)",
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
                style={{ color: "oklch(0.70 0.010 240)" }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.72 0.14 193 / 0.12)" }}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: "oklch(0.72 0.14 193)" }}
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
              background: "oklch(0.72 0.14 193)",
              color: "oklch(0.13 0.012 240)",
            }}
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <span
                  className="w-4 h-4 border-2 rounded-full border-t-transparent animate-spin"
                  style={{
                    borderColor: "oklch(0.13 0.012 240 / 0.3)",
                    borderTopColor: "transparent",
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
            style={{ color: "oklch(0.45 0.008 240)" }}
          >
            Secure authentication via Internet Identity
          </p>
        </div>
      </motion.div>
    </div>
  );
}
