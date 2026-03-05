import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Moon, Settings as SettingsIcon, Sun, User } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function Settings() {
  const { identity } = useInternetIdentity();
  const { theme, setTheme, isDark } = useTheme();

  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 12)}...${principal.slice(-8)}`
    : "Not connected";

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon
            className="w-4 h-4"
            style={{ color: "oklch(var(--teal))" }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(var(--teal))" }}
          >
            Configuration
          </span>
        </div>
        <h1
          className="text-2xl font-display font-bold tracking-tight"
          style={{ color: "oklch(var(--foreground))" }}
        >
          Settings
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          Manage your account preferences and display settings.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-xl border mb-4"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          <h2
            className="text-sm font-semibold font-display"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Profile
          </h2>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "oklch(var(--teal) / 0.12)",
                border: "2px solid oklch(var(--teal) / 0.25)",
              }}
            >
              <User
                className="w-6 h-6"
                style={{ color: "oklch(var(--teal))" }}
              />
            </div>
            <div>
              <div
                className="text-sm font-semibold mb-0.5"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Physician Account
              </div>
              <div
                className="text-xs font-mono leading-relaxed"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {shortPrincipal}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Appearance Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border mb-4"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          <h2
            className="text-sm font-semibold font-display"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Appearance
          </h2>
        </div>
        <div className="p-5 space-y-5">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(var(--muted))" }}
              >
                {isDark ? (
                  <Moon
                    className="w-4 h-4"
                    style={{ color: "oklch(var(--teal))" }}
                  />
                ) : (
                  <Sun
                    className="w-4 h-4"
                    style={{ color: "oklch(0.55 0.14 80)" }}
                  />
                )}
              </div>
              <div>
                <Label
                  htmlFor="theme-toggle"
                  className="text-sm font-medium cursor-pointer"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {isDark ? "Dark Theme" : "Light Theme"}
                </Label>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {isDark
                    ? "Easier on the eyes during long clinic sessions"
                    : "Clean clinical appearance for bright environments"}
                </p>
              </div>
            </div>
            <Switch
              id="theme-toggle"
              data-ocid="settings.theme.toggle"
              checked={isDark}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>

          <Separator style={{ background: "oklch(var(--border))" }} />

          {/* Theme preview tiles */}
          <div>
            <p
              className="text-xs font-medium mb-3"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Choose theme
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Light theme tile */}
              <button
                type="button"
                data-ocid="settings.light_theme.button"
                onClick={() => setTheme("light")}
                className="relative rounded-lg overflow-hidden border-2 transition-all"
                style={{
                  borderColor:
                    theme === "light"
                      ? "oklch(var(--teal))"
                      : "oklch(var(--border))",
                  boxShadow:
                    theme === "light"
                      ? "0 0 0 3px oklch(var(--teal) / 0.15)"
                      : "none",
                }}
              >
                <div
                  className="p-3"
                  style={{ background: "oklch(0.97 0.004 240)" }}
                >
                  <div className="flex gap-1.5 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "oklch(0.45 0.14 193)" }}
                    />
                    <div
                      className="h-2 rounded flex-1"
                      style={{ background: "oklch(0.88 0.010 240)" }}
                    />
                  </div>
                  <div
                    className="rounded-md p-2 mb-1.5"
                    style={{
                      background: "oklch(1.0 0 0)",
                      border: "1px solid oklch(0.88 0.010 240)",
                    }}
                  >
                    <div
                      className="h-1.5 rounded mb-1"
                      style={{
                        background: "oklch(0.88 0.010 240)",
                        width: "80%",
                      }}
                    />
                    <div
                      className="h-1.5 rounded"
                      style={{
                        background: "oklch(0.92 0.006 240)",
                        width: "60%",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="px-3 py-1.5 flex items-center justify-between"
                  style={{ background: "oklch(0.95 0.006 240)" }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.25 0.010 240)" }}
                  >
                    Light
                  </span>
                  {theme === "light" && (
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                      style={{ background: "oklch(0.45 0.14 193)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </button>

              {/* Dark theme tile */}
              <button
                type="button"
                data-ocid="settings.dark_theme.button"
                onClick={() => setTheme("dark")}
                className="relative rounded-lg overflow-hidden border-2 transition-all"
                style={{
                  borderColor:
                    theme === "dark"
                      ? "oklch(0.62 0.14 193)"
                      : "oklch(0.26 0.012 240)",
                  boxShadow:
                    theme === "dark"
                      ? "0 0 0 3px oklch(0.62 0.14 193 / 0.2)"
                      : "none",
                }}
              >
                <div
                  className="p-3"
                  style={{ background: "oklch(0.14 0.010 240)" }}
                >
                  <div className="flex gap-1.5 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "oklch(0.62 0.14 193)" }}
                    />
                    <div
                      className="h-2 rounded flex-1"
                      style={{ background: "oklch(0.22 0.010 240)" }}
                    />
                  </div>
                  <div
                    className="rounded-md p-2 mb-1.5"
                    style={{
                      background: "oklch(0.18 0.010 240)",
                      border: "1px solid oklch(0.26 0.012 240)",
                    }}
                  >
                    <div
                      className="h-1.5 rounded mb-1"
                      style={{
                        background: "oklch(0.30 0.010 240)",
                        width: "80%",
                      }}
                    />
                    <div
                      className="h-1.5 rounded"
                      style={{
                        background: "oklch(0.24 0.010 240)",
                        width: "60%",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="px-3 py-1.5 flex items-center justify-between"
                  style={{ background: "oklch(0.20 0.010 240)" }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: "oklch(0.75 0.008 240)" }}
                  >
                    Dark
                  </span>
                  {theme === "dark" && (
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                      style={{ background: "oklch(0.62 0.14 193)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* About Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl border"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          <h2
            className="text-sm font-semibold font-display"
            style={{ color: "oklch(var(--foreground))" }}
          >
            About HomeoClinic
          </h2>
        </div>
        <div className="p-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span style={{ color: "oklch(var(--muted-foreground))" }}>
                Application
              </span>
              <span style={{ color: "oklch(var(--foreground))" }}>
                HomeoClinic
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "oklch(var(--muted-foreground))" }}>
                Case Format
              </span>
              <span style={{ color: "oklch(var(--foreground))" }}>
                Sarada Krishna HMCC
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "oklch(var(--muted-foreground))" }}>
                Materia Medica
              </span>
              <span style={{ color: "oklch(var(--foreground))" }}>
                Boericke & Synoptic Key
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "oklch(var(--muted-foreground))" }}>
                Platform
              </span>
              <span style={{ color: "oklch(var(--foreground))" }}>
                Internet Computer
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div
        className="mt-8 text-center text-xs"
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
    </div>
  );
}
