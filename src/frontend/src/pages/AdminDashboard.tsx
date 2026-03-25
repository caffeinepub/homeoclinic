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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  KeyRound,
  Loader2,
  LogIn,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  UserMinus,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { DoctorAccount } from "../backend.d";
import type { UserRole } from "../context/AccessControlContext";
import { useAccessControl } from "../context/AccessControlContext";
import { useActorDirect } from "../hooks/useActorDirect";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { hashPassword } from "../utils/auth";

interface AdminDashboardProps {
  onEnterApp: () => void;
}

// ─── Internet Identity Users Tab ───────────────────────────────────────────

function IIUsersTab() {
  const { allRequests, approveRequest, denyRequest, revokeAccess } =
    useAccessControl();
  const { identity } = useInternetIdentity();
  const adminPrincipal = identity?.getPrincipal().toString() ?? "";
  const [selectedRoles, setSelectedRoles] = useState<Record<string, UserRole>>(
    {},
  );
  const [expandedReasons, setExpandedReasons] = useState<
    Record<string, boolean>
  >({});
  const [pendingActions, setPendingActions] = useState<Record<string, boolean>>(
    {},
  );
  const [manualPrincipal, setManualPrincipal] = useState("");
  const [manualRole, setManualRole] = useState<UserRole>("doctor");
  const [addingUser, setAddingUser] = useState(false);

  const pendingRequests = allRequests.filter((r) => r.status === "pending");
  const approvedUsers = allRequests.filter(
    (r) => r.status === "approved" && r.principal !== adminPrincipal,
  );
  async function handleApprove(principal: string) {
    const role = selectedRoles[principal] ?? "doctor";
    setPendingActions((p) => ({ ...p, [principal]: true }));
    try {
      await approveRequest(principal, role);
      toast.success("Approved access");
    } catch (e) {
      toast.error(
        `Failed to approve: ${e instanceof Error ? e.message : String(e)}`,
      );
    } finally {
      setPendingActions((p) => ({ ...p, [principal]: false }));
    }
  }

  async function handleDeny(principal: string) {
    setPendingActions((p) => ({ ...p, [`deny_${principal}`]: true }));
    try {
      await denyRequest(principal);
      toast.success("Request denied");
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setPendingActions((p) => ({ ...p, [`deny_${principal}`]: false }));
    }
  }

  async function handleRevoke(principal: string) {
    setPendingActions((p) => ({ ...p, [`revoke_${principal}`]: true }));
    try {
      await revokeAccess(principal);
      toast.success("Access revoked");
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setPendingActions((p) => ({ ...p, [`revoke_${principal}`]: false }));
    }
  }

  async function handleManualAdd() {
    if (!manualPrincipal.trim()) {
      toast.error("Enter a principal ID");
      return;
    }
    setAddingUser(true);
    try {
      await approveRequest(manualPrincipal.trim(), manualRole);
      setManualPrincipal("");
      toast.success("User added");
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setAddingUser(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Pending */}
      {pendingRequests.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Pending Requests
            </h3>
            <Badge
              style={{
                background: "oklch(0.55 0.14 80 / 0.15)",
                color: "oklch(0.55 0.14 80)",
              }}
            >
              {pendingRequests.length}
            </Badge>
          </div>
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            {pendingRequests.map((req, idx) => (
              <div
                key={req.principal}
                data-ocid={`admin_dashboard.ii.pending.item.${idx + 1}`}
                className={`p-4 ${idx < pendingRequests.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "oklch(var(--border))" }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {req.name || "Unknown"}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {req.qualification}
                    </p>
                    {req.gmail && (
                      <p
                        className="text-xs"
                        style={{ color: "oklch(var(--teal))" }}
                      >
                        📧 {req.gmail}
                      </p>
                    )}
                    <p
                      className="text-[10px] font-mono truncate"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {req.principal.slice(0, 28)}…
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedReasons((p) => ({
                        ...p,
                        [req.principal]: !p[req.principal],
                      }))
                    }
                    className="text-xs flex items-center gap-1 flex-shrink-0"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Reason{" "}
                    {expandedReasons[req.principal] ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </div>
                {expandedReasons[req.principal] && (
                  <div
                    className="rounded-lg p-3 mb-3 text-xs"
                    style={{
                      background: "oklch(var(--muted) / 0.5)",
                      color: "oklch(var(--foreground))",
                    }}
                  >
                    {req.reason || "No reason provided"}
                  </div>
                )}
                <div className="flex items-center gap-2">
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
                      data-ocid={`admin_dashboard.ii.role.select.${idx + 1}`}
                      className="h-8 w-32 text-xs"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    disabled={!!pendingActions[req.principal]}
                    onClick={() => handleApprove(req.principal)}
                    data-ocid={`admin_dashboard.ii.approve.button.${idx + 1}`}
                    className="h-8 text-xs"
                    style={{
                      background: "oklch(var(--teal))",
                      color: "oklch(0.99 0 0)",
                    }}
                  >
                    {pendingActions[req.principal] ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Approve
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!!pendingActions[`deny_${req.principal}`]}
                    onClick={() => handleDeny(req.principal)}
                    data-ocid={`admin_dashboard.ii.deny.button.${idx + 1}`}
                    className="h-8 text-xs"
                    style={{
                      borderColor: "oklch(var(--destructive) / 0.4)",
                      color: "oklch(var(--destructive))",
                    }}
                  >
                    {pendingActions[`deny_${req.principal}`] ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Deny
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Approved */}
      {approvedUsers.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Approved Users
            </h3>
            <Badge
              style={{
                background: "oklch(var(--teal) / 0.15)",
                color: "oklch(var(--teal))",
              }}
            >
              {approvedUsers.length}
            </Badge>
          </div>
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            {approvedUsers.map((req, idx) => (
              <div
                key={req.principal}
                data-ocid={`admin_dashboard.ii.approved.item.${idx + 1}`}
                className={`flex items-center justify-between px-4 py-3 ${idx < approvedUsers.length - 1 ? "border-b" : ""}`}
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
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    {req.principal.slice(0, 24)}…
                  </p>
                  {req.gmail && (
                    <p
                      className="text-xs"
                      style={{ color: "oklch(var(--teal))" }}
                    >
                      📧 {req.gmail}
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!!pendingActions[`revoke_${req.principal}`]}
                  onClick={() => handleRevoke(req.principal)}
                  data-ocid={`admin_dashboard.ii.revoke.button.${idx + 1}`}
                  className="h-7 px-2 text-xs"
                  style={{
                    borderColor: "oklch(var(--destructive) / 0.4)",
                    color: "oklch(var(--destructive))",
                  }}
                >
                  <UserMinus className="w-3 h-3 mr-1" />
                  Revoke
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {pendingRequests.length === 0 && approvedUsers.length === 0 && (
        <div
          className="text-center py-10"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No Internet Identity users yet</p>
        </div>
      )}

      {/* Manual add */}
      <section>
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: "oklch(var(--foreground))" }}
        >
          Add User Manually
        </h3>
        <div
          className="rounded-xl border p-4 space-y-3"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <div className="space-y-1">
            <Label className="text-xs">Principal ID</Label>
            <Input
              data-ocid="admin_dashboard.manual.principal.input"
              value={manualPrincipal}
              onChange={(e) => setManualPrincipal(e.target.value)}
              placeholder="Enter principal ID"
              className="text-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={manualRole}
              onValueChange={(v) => setManualRole(v as UserRole)}
            >
              <SelectTrigger
                data-ocid="admin_dashboard.manual.role.select"
                className="h-8 text-xs w-32"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={handleManualAdd}
              disabled={addingUser}
              data-ocid="admin_dashboard.manual.add.button"
              style={{
                background: "oklch(var(--teal))",
                color: "oklch(0.99 0 0)",
              }}
            >
              {addingUser ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-3 h-3 mr-1" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Password Accounts Tab ────────────────────────────────────────────────────

function PasswordAccountsTab() {
  const { actor } = useActorDirect();
  const [accounts, setAccounts] = useState<DoctorAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [pendingActions, setPendingActions] = useState<Record<string, boolean>>(
    {},
  );
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>(
    {},
  );
  const [resetPasswordFor, setResetPasswordFor] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState("");
  const [showTempPass, setShowTempPass] = useState(false);
  const [resetting, setResetting] = useState(false);

  async function fetchAccounts() {
    if (!actor) return;
    setLoading(true);
    try {
      const all = await actor.getAllDoctorAccounts();
      setAccounts(all);
    } catch (e) {
      toast.error(
        `Failed to load accounts: ${e instanceof Error ? e.message : String(e)}`,
      );
    } finally {
      setLoading(false);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchAccounts is stable
  useEffect(() => {
    if (actor) void fetchAccounts();
  }, [actor]);

  async function handleApprove(username: string) {
    if (!actor) return;
    const role = selectedRoles[username] ?? "approved_doctor";
    setPendingActions((p) => ({ ...p, [username]: true }));
    try {
      await actor.updateDoctorAccountRole(username, role);
      await fetchAccounts();
      toast.success(`Approved ${username}`);
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setPendingActions((p) => ({ ...p, [username]: false }));
    }
  }

  async function handleDeny(username: string) {
    if (!actor) return;
    setPendingActions((p) => ({ ...p, [`deny_${username}`]: true }));
    try {
      await actor.updateDoctorAccountRole(username, "denied");
      await fetchAccounts();
      toast.success(`Denied ${username}`);
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setPendingActions((p) => ({ ...p, [`deny_${username}`]: false }));
    }
  }

  async function handleRevoke(username: string) {
    if (!actor) return;
    setPendingActions((p) => ({ ...p, [`revoke_${username}`]: true }));
    try {
      await actor.updateDoctorAccountRole(username, "denied");
      await fetchAccounts();
      toast.success(`Revoked ${username}`);
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setPendingActions((p) => ({ ...p, [`revoke_${username}`]: false }));
    }
  }

  async function handleResetPassword() {
    if (!actor || !resetPasswordFor || !tempPassword.trim()) {
      toast.error("Enter a temporary password");
      return;
    }
    setResetting(true);
    try {
      const hash = await hashPassword(tempPassword);
      const result = await actor.resetDoctorPassword(resetPasswordFor, hash);
      if (result !== "ok") {
        toast.error(result);
        return;
      }
      toast.success(
        `Password reset for ${resetPasswordFor}. Doctor must change it on next login.`,
      );
      setResetPasswordFor(null);
      setTempPassword("");
    } catch (e) {
      toast.error(`Failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setResetting(false);
    }
  }

  const pending = accounts.filter((a) => a.role === "pending");
  const approved = accounts.filter(
    (a) => a.role === "approved_doctor" || a.role === "approved_viewer",
  );
  const denied = accounts.filter((a) => a.role === "denied");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2
          className="w-6 h-6 animate-spin"
          style={{ color: "oklch(var(--teal))" }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p
          className="text-xs"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          {accounts.length} account{accounts.length !== 1 ? "s" : ""} total
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={fetchAccounts}
          className="h-7 text-xs gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          Refresh
        </Button>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Pending Approval
            </h3>
            <Badge
              style={{
                background: "oklch(0.55 0.14 80 / 0.15)",
                color: "oklch(0.55 0.14 80)",
              }}
            >
              {pending.length}
            </Badge>
          </div>
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            {pending.map((acc, idx) => (
              <div
                key={acc.username}
                data-ocid={`admin_dashboard.pw.pending.item.${idx + 1}`}
                className={`p-4 ${idx < pending.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "oklch(var(--border))" }}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {acc.name || acc.username}
                    </p>
                    <Badge
                      className="text-[10px]"
                      style={{
                        background: "oklch(var(--muted))",
                        color: "oklch(var(--muted-foreground))",
                      }}
                    >
                      @{acc.username}
                    </Badge>
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    {acc.qualification}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(var(--teal))" }}
                  >
                    📧 {acc.gmail}
                  </p>
                  {acc.phone && (
                    <p
                      className="text-xs"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      📞 {acc.phone}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedRoles[acc.username] ?? "approved_doctor"}
                    onValueChange={(v) =>
                      setSelectedRoles((p) => ({ ...p, [acc.username]: v }))
                    }
                  >
                    <SelectTrigger
                      data-ocid={`admin_dashboard.pw.role.select.${idx + 1}`}
                      className="h-8 w-36 text-xs"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved_doctor">Doctor</SelectItem>
                      <SelectItem value="approved_viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    disabled={!!pendingActions[acc.username]}
                    onClick={() => handleApprove(acc.username)}
                    data-ocid={`admin_dashboard.pw.approve.button.${idx + 1}`}
                    className="h-8 text-xs"
                    style={{
                      background: "oklch(var(--teal))",
                      color: "oklch(0.99 0 0)",
                    }}
                  >
                    {pendingActions[acc.username] ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Approve
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!!pendingActions[`deny_${acc.username}`]}
                    onClick={() => handleDeny(acc.username)}
                    data-ocid={`admin_dashboard.pw.deny.button.${idx + 1}`}
                    className="h-8 text-xs"
                    style={{
                      borderColor: "oklch(var(--destructive) / 0.4)",
                      color: "oklch(var(--destructive))",
                    }}
                  >
                    {pendingActions[`deny_${acc.username}`] ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Deny
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Approved */}
      {approved.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Approved Doctors
            </h3>
            <Badge
              style={{
                background: "oklch(var(--teal) / 0.15)",
                color: "oklch(var(--teal))",
              }}
            >
              {approved.length}
            </Badge>
          </div>
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            {approved.map((acc, idx) => (
              <div
                key={acc.username}
                data-ocid={`admin_dashboard.pw.approved.item.${idx + 1}`}
                className={`p-4 ${idx < approved.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "oklch(var(--border))" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "oklch(var(--foreground))" }}
                      >
                        {acc.name}
                      </p>
                      <Badge
                        className="text-[10px]"
                        style={{
                          background: "oklch(var(--muted))",
                          color: "oklch(var(--muted-foreground))",
                        }}
                      >
                        @{acc.username}
                      </Badge>
                      <Badge
                        className="text-[10px]"
                        style={{
                          background: "oklch(var(--teal) / 0.1)",
                          color: "oklch(var(--teal))",
                        }}
                      >
                        {acc.role === "approved_viewer" ? "Viewer" : "Doctor"}
                      </Badge>
                    </div>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {acc.qualification}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(var(--teal))" }}
                    >
                      📧 {acc.gmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setResetPasswordFor(acc.username);
                        setTempPassword("");
                      }}
                      data-ocid={`admin_dashboard.pw.reset_password.button.${idx + 1}`}
                      className="h-7 px-2 text-xs"
                      style={{
                        borderColor: "oklch(0.55 0.14 80 / 0.4)",
                        color: "oklch(0.55 0.14 80)",
                      }}
                    >
                      <KeyRound className="w-3 h-3 mr-1" />
                      Reset Pwd
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!!pendingActions[`revoke_${acc.username}`]}
                      onClick={() => handleRevoke(acc.username)}
                      data-ocid={`admin_dashboard.pw.revoke.button.${idx + 1}`}
                      className="h-7 px-2 text-xs"
                      style={{
                        borderColor: "oklch(var(--destructive) / 0.4)",
                        color: "oklch(var(--destructive))",
                      }}
                    >
                      <UserMinus className="w-3 h-3 mr-1" />
                      Revoke
                    </Button>
                  </div>
                </div>
                {/* Reset password inline */}
                {resetPasswordFor === acc.username && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 pt-3 border-t"
                    style={{ borderColor: "oklch(var(--border))" }}
                  >
                    <p
                      className="text-xs mb-2 font-medium"
                      style={{ color: "oklch(0.55 0.14 80)" }}
                    >
                      Set temporary password for @{acc.username}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Input
                          data-ocid={`admin_dashboard.pw.temp_password.input.${idx + 1}`}
                          type={showTempPass ? "text" : "password"}
                          value={tempPassword}
                          onChange={(e) => setTempPassword(e.target.value)}
                          placeholder="Enter temporary password"
                          className="h-8 text-xs pr-8"
                        />
                        <button
                          type="button"
                          onClick={() => setShowTempPass((v) => !v)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          {showTempPass ? (
                            <span className="text-[10px]">hide</span>
                          ) : (
                            <span className="text-[10px]">show</span>
                          )}
                        </button>
                      </div>
                      <Button
                        size="sm"
                        disabled={resetting}
                        onClick={handleResetPassword}
                        data-ocid={`admin_dashboard.pw.temp_password.submit.${idx + 1}`}
                        className="h-8 text-xs"
                        style={{
                          background: "oklch(0.55 0.14 80)",
                          color: "oklch(0.99 0 0)",
                        }}
                      >
                        {resetting ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          "Set"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setResetPasswordFor(null);
                          setTempPassword("");
                        }}
                        className="h-8 text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Denied */}
      {denied.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h3
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Denied
            </h3>
            <Badge
              style={{
                background: "oklch(var(--destructive) / 0.1)",
                color: "oklch(var(--destructive))",
              }}
            >
              {denied.length}
            </Badge>
          </div>
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            {denied.map((acc, idx) => (
              <div
                key={acc.username}
                data-ocid={`admin_dashboard.pw.denied.item.${idx + 1}`}
                className={`flex items-center justify-between px-4 py-3 ${idx < denied.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "oklch(var(--border))" }}
              >
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {acc.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    @{acc.username} &bull; {acc.gmail}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleApprove(acc.username)}
                  data-ocid={`admin_dashboard.pw.re_approve.button.${idx + 1}`}
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
        </section>
      )}

      {accounts.length === 0 && (
        <div
          className="text-center py-10"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No registered accounts yet</p>
        </div>
      )}
    </div>
  );
}

// ─── Admin Dashboard ─────────────────────────────────────────────────────────────────

export function AdminDashboard({ onEnterApp }: AdminDashboardProps) {
  const { exitAdmin } = useAccessControl();
  const { allRequests } = useAccessControl();
  const { actor } = useActorDirect();
  const [pwPendingCount, setPwPendingCount] = useState(0);

  useEffect(() => {
    if (!actor) return;
    actor
      .getAllDoctorAccounts()
      .then((all) => {
        setPwPendingCount(all.filter((a) => a.role === "pending").length);
      })
      .catch(() => {});
  }, [actor]);

  const iiPendingCount = allRequests.filter(
    (r) => r.status === "pending",
  ).length;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--background))" }}
    >
      {/* Header */}
      <header
        className="border-b px-6 py-4"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.55 0.14 280 / 0.15)" }}
            >
              <ShieldCheck
                className="w-5 h-5"
                style={{ color: "oklch(0.55 0.14 280)" }}
              />
            </div>
            <div>
              <h1
                className="text-base font-display font-bold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Admin Dashboard
              </h1>
              <p
                className="text-xs"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                HomeoClinic — User Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              data-ocid="admin_dashboard.enter_app.button"
              onClick={onEnterApp}
              className="h-9 text-sm gap-2"
              style={{
                background: "oklch(var(--teal))",
                color: "oklch(0.99 0 0)",
              }}
            >
              <Stethoscope className="w-4 h-4" />
              Enter HomeoClinic
            </Button>
            <Button
              data-ocid="admin_dashboard.exit_admin.button"
              onClick={exitAdmin}
              variant="outline"
              size="sm"
              className="h-9 text-xs"
              style={{
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              <LogIn className="w-3.5 h-3.5 mr-1" />
              Exit Admin
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="w-full mb-6 h-10">
            <TabsTrigger
              value="password"
              data-ocid="admin_dashboard.pw_tab"
              className="flex-1 text-xs gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Username/Password Accounts
              {pwPendingCount > 0 && (
                <span
                  className="ml-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{
                    background: "oklch(0.55 0.14 80)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {pwPendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="ii"
              data-ocid="admin_dashboard.ii_tab"
              className="flex-1 text-xs gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Internet Identity Users
              {iiPendingCount > 0 && (
                <span
                  className="ml-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{
                    background: "oklch(0.55 0.14 80)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  {iiPendingCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <PasswordAccountsTab />
          </TabsContent>
          <TabsContent value="ii">
            <IIUsersTab />
          </TabsContent>
        </Tabs>

        <div
          className="text-center text-xs mt-8"
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
