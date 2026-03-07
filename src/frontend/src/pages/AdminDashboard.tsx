import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  LogIn,
  ShieldCheck,
  Stethoscope,
  UserMinus,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { UserRole } from "../context/AccessControlContext";
import { useAccessControl } from "../context/AccessControlContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface AdminDashboardProps {
  onEnterApp: () => void;
}

export function AdminDashboard({ onEnterApp }: AdminDashboardProps) {
  const { allRequests, approveRequest, denyRequest, revokeAccess } =
    useAccessControl();
  const { identity } = useInternetIdentity();
  const adminPrincipal = identity?.getPrincipal().toString() ?? "";

  // Role selectors per pending request
  const [selectedRoles, setSelectedRoles] = useState<Record<string, UserRole>>(
    {},
  );
  // Expanded reason panels
  const [expandedReasons, setExpandedReasons] = useState<
    Record<string, boolean>
  >({});
  // Pending action trackers
  const [pendingActions, setPendingActions] = useState<Record<string, boolean>>(
    {},
  );

  // Manual add user
  const [manualPrincipal, setManualPrincipal] = useState("");
  const [manualRole, setManualRole] = useState<UserRole>("doctor");
  const [addingUser, setAddingUser] = useState(false);

  const pendingRequests = allRequests.filter((r) => r.status === "pending");
  const approvedUsers = allRequests.filter((r) => r.status === "approved");
  const deniedUsers = allRequests.filter((r) => r.status === "denied");

  async function handleApprove(principal: string) {
    const role = selectedRoles[principal] ?? "doctor";
    setPendingActions((p) => ({ ...p, [principal]: true }));
    try {
      await approveRequest(principal, role);
      toast.success(`Approved access for ${principal.slice(0, 16)}…`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(`Failed to approve: ${msg}`);
    } finally {
      setPendingActions((p) => ({ ...p, [principal]: false }));
    }
  }

  async function handleDeny(principal: string) {
    setPendingActions((p) => ({ ...p, [`deny_${principal}`]: true }));
    try {
      await denyRequest(principal);
      toast.success(`Denied request from ${principal.slice(0, 16)}…`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(`Failed to deny: ${msg}`);
    } finally {
      setPendingActions((p) => ({ ...p, [`deny_${principal}`]: false }));
    }
  }

  async function handleRevoke(principal: string) {
    setPendingActions((p) => ({ ...p, [`revoke_${principal}`]: true }));
    try {
      await revokeAccess(principal);
      toast.success(`Revoked access for ${principal.slice(0, 16)}…`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(`Failed to revoke: ${msg}`);
    } finally {
      setPendingActions((p) => ({ ...p, [`revoke_${principal}`]: false }));
    }
  }

  async function handleAddUser() {
    if (!manualPrincipal.trim()) {
      toast.error("Please enter a principal ID");
      return;
    }
    // Validate principal format roughly
    if (manualPrincipal.trim().length < 10) {
      toast.error("Invalid principal ID format");
      return;
    }
    setAddingUser(true);
    try {
      await approveRequest(manualPrincipal.trim(), manualRole);
      toast.success(
        `User ${manualPrincipal.slice(0, 16)}… added as ${manualRole}`,
      );
      setManualPrincipal("");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(`Failed to add user: ${msg}`);
    } finally {
      setAddingUser(false);
    }
  }

  function toggleReason(principal: string) {
    setExpandedReasons((p) => ({ ...p, [principal]: !p[principal] }));
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--background))" }}
    >
      {/* Background subtle grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.45 0.14 193) 1px, transparent 1px), linear-gradient(to right, oklch(0.45 0.14 193) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top header bar */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "0 1px 6px oklch(0.15 0.01 240 / 0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(var(--teal) / 0.12)" }}
            >
              <Stethoscope
                className="w-4 h-4"
                style={{ color: "oklch(var(--teal))" }}
              />
            </div>
            <div>
              <h1
                className="text-sm font-display font-bold leading-none"
                style={{ color: "oklch(var(--foreground))" }}
              >
                HomeoClinic
              </h1>
              <p
                className="text-[10px] font-medium mt-0.5"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Admin Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{
                background: "oklch(0.55 0.14 280 / 0.08)",
                color: "oklch(0.55 0.14 280)",
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </div>
            <Button
              data-ocid="admin_dashboard.enter_app.button"
              onClick={onEnterApp}
              className="h-8 px-3 text-xs font-semibold gap-1.5"
              style={{
                background: "oklch(var(--teal))",
                color: "oklch(0.99 0 0)",
              }}
            >
              <LogIn className="w-3.5 h-3.5" />
              Enter HomeoClinic
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl border p-6"
          style={{
            background:
              "linear-gradient(135deg, oklch(var(--card)), oklch(0.55 0.14 280 / 0.04))",
            borderColor: "oklch(0.55 0.14 280 / 0.2)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.55 0.14 280 / 0.12)" }}
                >
                  <ShieldCheck
                    className="w-5 h-5"
                    style={{ color: "oklch(0.55 0.14 280)" }}
                  />
                </div>
                <h2
                  className="text-lg font-display font-bold"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  Welcome, Admin
                </h2>
              </div>
              <p
                className="text-sm"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Manage access requests, approve or deny users, and control who
                can use HomeoClinic.
              </p>
              {adminPrincipal && (
                <p
                  className="text-xs font-mono mt-2"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Principal: {adminPrincipal.slice(0, 20)}…
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div
                className="text-center px-4 py-3 rounded-xl"
                style={{
                  background: "oklch(0.55 0.14 80 / 0.08)",
                  border: "1px solid oklch(0.55 0.14 80 / 0.2)",
                }}
              >
                <p
                  className="text-xl font-bold font-display"
                  style={{ color: "oklch(0.55 0.14 80)" }}
                >
                  {pendingRequests.length}
                </p>
                <p
                  className="text-[10px] font-medium"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Pending
                </p>
              </div>
              <div
                className="text-center px-4 py-3 rounded-xl"
                style={{
                  background: "oklch(var(--teal) / 0.08)",
                  border: "1px solid oklch(var(--teal) / 0.2)",
                }}
              >
                <p
                  className="text-xl font-bold font-display"
                  style={{ color: "oklch(var(--teal))" }}
                >
                  {approvedUsers.length}
                </p>
                <p
                  className="text-[10px] font-medium"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Approved
                </p>
              </div>
              <div
                className="text-center px-4 py-3 rounded-xl"
                style={{
                  background: "oklch(0.55 0.22 25 / 0.06)",
                  border: "1px solid oklch(0.55 0.22 25 / 0.15)",
                }}
              >
                <p
                  className="text-xl font-bold font-display"
                  style={{ color: "oklch(0.55 0.22 25)" }}
                >
                  {deniedUsers.length}
                </p>
                <p
                  className="text-[10px] font-medium"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Denied
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Pending Requests ─────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.55 0.14 80 / 0.10)" }}
            >
              <Users
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.55 0.14 80)" }}
              />
            </div>
            <h3
              className="text-base font-display font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Pending Requests
            </h3>
            {pendingRequests.length > 0 && (
              <Badge
                className="text-[10px] px-2 py-0.5 font-semibold"
                style={{
                  background: "oklch(0.55 0.14 80 / 0.12)",
                  color: "oklch(0.55 0.14 80)",
                  border: "1px solid oklch(0.55 0.14 80 / 0.25)",
                }}
              >
                {pendingRequests.length}
              </Badge>
            )}
          </div>

          {pendingRequests.length === 0 ? (
            <div
              data-ocid="admin_dashboard.pending.empty_state"
              className="rounded-xl border py-8 text-center"
              style={{
                background: "oklch(var(--card))",
                borderColor: "oklch(var(--border))",
              }}
            >
              <CheckCircle2
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "oklch(var(--teal) / 0.5)" }}
              />
              <p
                className="text-sm"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                No pending requests
              </p>
            </div>
          ) : (
            <div data-ocid="admin_dashboard.pending.list" className="space-y-3">
              {pendingRequests.map((req, idx) => (
                <motion.div
                  key={req.principal}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  data-ocid={`admin_dashboard.pending.item.${idx + 1}`}
                  className="rounded-xl border p-4"
                  style={{
                    background: "oklch(var(--card))",
                    borderColor: "oklch(0.55 0.14 80 / 0.18)",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Request info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-display font-semibold text-sm"
                          style={{ color: "oklch(var(--foreground))" }}
                        >
                          {req.name || "Unknown"}
                        </span>
                        {req.qualification && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{
                              background: "oklch(var(--muted))",
                              color: "oklch(var(--muted-foreground))",
                            }}
                          >
                            {req.qualification}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-xs font-mono truncate mb-2"
                        style={{ color: "oklch(var(--muted-foreground))" }}
                      >
                        {req.principal}
                      </p>
                      {req.reason && (
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleReason(req.principal)}
                            className="flex items-center gap-1 text-xs font-medium"
                            style={{ color: "oklch(var(--teal))" }}
                          >
                            {expandedReasons[req.principal] ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                            {expandedReasons[req.principal]
                              ? "Hide reason"
                              : "Show reason"}
                          </button>
                          {expandedReasons[req.principal] && (
                            <p
                              className="mt-1 text-xs leading-relaxed"
                              style={{
                                color: "oklch(var(--muted-foreground))",
                              }}
                            >
                              {req.reason}
                            </p>
                          )}
                        </div>
                      )}
                      <p
                        className="text-[10px] mt-1"
                        style={{ color: "oklch(var(--muted-foreground))" }}
                      >
                        Submitted:{" "}
                        {new Date(req.submittedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Select
                        value={selectedRoles[req.principal] ?? "doctor"}
                        onValueChange={(v) =>
                          setSelectedRoles((p) => ({
                            ...p,
                            [req.principal]: v as UserRole,
                          }))
                        }
                      >
                        <SelectTrigger
                          className="h-8 w-28 text-xs"
                          data-ocid={`admin_dashboard.pending.select.${idx + 1}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        data-ocid={`admin_dashboard.pending.approve.button.${idx + 1}`}
                        size="sm"
                        disabled={!!pendingActions[req.principal]}
                        onClick={() => handleApprove(req.principal)}
                        className="h-8 px-3 text-xs font-semibold gap-1"
                        style={{
                          background: "oklch(var(--teal))",
                          color: "oklch(0.99 0 0)",
                        }}
                      >
                        {pendingActions[req.principal] ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                        Approve
                      </Button>

                      <Button
                        data-ocid={`admin_dashboard.pending.deny.button.${idx + 1}`}
                        size="sm"
                        variant="outline"
                        disabled={!!pendingActions[`deny_${req.principal}`]}
                        onClick={() => handleDeny(req.principal)}
                        className="h-8 px-3 text-xs font-semibold gap-1"
                        style={{
                          borderColor: "oklch(0.55 0.22 25 / 0.4)",
                          color: "oklch(0.55 0.22 25)",
                        }}
                      >
                        {pendingActions[`deny_${req.principal}`] ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        Deny
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* ── Approved Users ───────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(var(--teal) / 0.10)" }}
            >
              <CheckCircle2
                className="w-3.5 h-3.5"
                style={{ color: "oklch(var(--teal))" }}
              />
            </div>
            <h3
              className="text-base font-display font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Approved Users
            </h3>
            {approvedUsers.length > 0 && (
              <Badge
                className="text-[10px] px-2 py-0.5 font-semibold"
                style={{
                  background: "oklch(var(--teal) / 0.10)",
                  color: "oklch(var(--teal))",
                  border: "1px solid oklch(var(--teal) / 0.25)",
                }}
              >
                {approvedUsers.length}
              </Badge>
            )}
          </div>

          {approvedUsers.length === 0 ? (
            <div
              data-ocid="admin_dashboard.approved.empty_state"
              className="rounded-xl border py-8 text-center"
              style={{
                background: "oklch(var(--card))",
                borderColor: "oklch(var(--border))",
              }}
            >
              <Users
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "oklch(var(--muted-foreground) / 0.5)" }}
              />
              <p
                className="text-sm"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                No approved users yet
              </p>
            </div>
          ) : (
            <div
              data-ocid="admin_dashboard.approved.list"
              className="rounded-xl border overflow-hidden"
              style={{
                background: "oklch(var(--card))",
                borderColor: "oklch(var(--border))",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {approvedUsers.map((req, idx) => (
                <div
                  key={req.principal}
                  data-ocid={`admin_dashboard.approved.item.${idx + 1}`}
                  className={`flex items-center justify-between px-4 py-3 ${
                    idx < approvedUsers.length - 1 ? "border-b" : ""
                  }`}
                  style={{
                    borderColor: "oklch(var(--border))",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{
                        background: "oklch(var(--teal) / 0.12)",
                        color: "oklch(var(--teal))",
                      }}
                    >
                      {(req.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-medium truncate"
                        style={{ color: "oklch(var(--foreground))" }}
                      >
                        {req.name || "Unknown"}
                      </p>
                      <p
                        className="text-[10px] font-mono truncate"
                        style={{ color: "oklch(var(--muted-foreground))" }}
                      >
                        {req.principal.slice(0, 24)}…
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={
                        req.role === "viewer"
                          ? {
                              background: "oklch(0.45 0.15 260 / 0.10)",
                              color: "oklch(0.45 0.15 260)",
                            }
                          : {
                              background: "oklch(var(--teal) / 0.10)",
                              color: "oklch(var(--teal))",
                            }
                      }
                    >
                      {req.role === "viewer" ? "Viewer" : "Doctor"}
                    </span>

                    <Button
                      data-ocid={`admin_dashboard.approved.revoke.button.${idx + 1}`}
                      size="sm"
                      variant="ghost"
                      disabled={!!pendingActions[`revoke_${req.principal}`]}
                      onClick={() => handleRevoke(req.principal)}
                      className="h-7 px-2 text-xs gap-1"
                      style={{ color: "oklch(0.55 0.22 25)" }}
                    >
                      {pendingActions[`revoke_${req.principal}`] ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <UserMinus className="w-3 h-3" />
                      )}
                      Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* ── Add User Manually ────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.55 0.14 280 / 0.10)" }}
            >
              <UserPlus
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.55 0.14 280)" }}
              />
            </div>
            <h3
              className="text-base font-display font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Add User Manually
            </h3>
          </div>

          <div
            className="rounded-xl border p-5"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <p
              className="text-xs mb-4"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Grant access directly using a user's Principal ID (useful when
              they haven't submitted a request yet).
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 space-y-1.5">
                <Label
                  htmlFor="manual-principal"
                  className="text-xs font-semibold"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Principal ID
                </Label>
                <Input
                  id="manual-principal"
                  data-ocid="admin_dashboard.add_user.input"
                  value={manualPrincipal}
                  onChange={(e) => setManualPrincipal(e.target.value)}
                  placeholder="e.g. aaaaa-bbbbb-ccccc-ddddd-eee"
                  className="font-mono text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-xs font-semibold"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Role
                </Label>
                <Select
                  value={manualRole}
                  onValueChange={(v) => setManualRole(v as UserRole)}
                >
                  <SelectTrigger className="h-9 w-32 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  data-ocid="admin_dashboard.add_user.button"
                  onClick={handleAddUser}
                  disabled={addingUser || !manualPrincipal.trim()}
                  className="h-9 px-4 text-xs font-semibold gap-1.5"
                  style={{
                    background: "oklch(0.55 0.14 280)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {addingUser ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <UserPlus className="w-3.5 h-3.5" />
                  )}
                  Add User
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Denied Users (collapsible reference) ────────────── */}
        {deniedUsers.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.55 0.22 25 / 0.08)" }}
              >
                <XCircle
                  className="w-3.5 h-3.5"
                  style={{ color: "oklch(0.55 0.22 25)" }}
                />
              </div>
              <h3
                className="text-base font-display font-semibold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Denied
              </h3>
              <Badge
                className="text-[10px] px-2 py-0.5 font-semibold"
                style={{
                  background: "oklch(0.55 0.22 25 / 0.08)",
                  color: "oklch(0.55 0.22 25)",
                  border: "1px solid oklch(0.55 0.22 25 / 0.2)",
                }}
              >
                {deniedUsers.length}
              </Badge>
            </div>

            <div
              className="rounded-xl border overflow-hidden"
              style={{
                background: "oklch(var(--card))",
                borderColor: "oklch(var(--border))",
              }}
            >
              {deniedUsers.map((req, idx) => (
                <div
                  key={req.principal}
                  data-ocid={`admin_dashboard.denied.item.${idx + 1}`}
                  className={`flex items-center justify-between px-4 py-3 ${
                    idx < deniedUsers.length - 1 ? "border-b" : ""
                  }`}
                  style={{ borderColor: "oklch(var(--border))" }}
                >
                  <div className="min-w-0">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {req.name || "Unknown"}
                    </p>
                    <p
                      className="text-[10px] font-mono truncate"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {req.principal.slice(0, 28)}…
                    </p>
                  </div>
                  {/* Re-approve option */}
                  <Button
                    data-ocid={`admin_dashboard.denied.approve.button.${idx + 1}`}
                    size="sm"
                    variant="outline"
                    disabled={!!pendingActions[req.principal]}
                    onClick={() => {
                      setSelectedRoles((p) => ({
                        ...p,
                        [req.principal]: "doctor",
                      }));
                      handleApprove(req.principal);
                    }}
                    className="h-7 px-2 text-xs"
                    style={{
                      borderColor: "oklch(var(--teal) / 0.4)",
                      color: "oklch(var(--teal))",
                    }}
                  >
                    Re-approve
                  </Button>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <div
          className="text-center text-xs pb-4"
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
      </main>
    </div>
  );
}
