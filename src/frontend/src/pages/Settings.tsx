import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Moon,
  Pencil,
  Settings as SettingsIcon,
  Shield,
  Stethoscope,
  Sun,
  Trash2,
  User,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ADMIN_PASSPHRASE,
  type UserRole,
  setAdminSession,
  useAccessControl,
} from "../context/AccessControlContext";
import { useTheme } from "../context/ThemeContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface DoctorProfile {
  name: string;
  qualification: string;
  regNo: string;
  phone: string;
  clinicName: string;
  clinicAddress: string;
}

const EMPTY_PROFILE: DoctorProfile = {
  name: "",
  qualification: "",
  regNo: "",
  phone: "",
  clinicName: "",
  clinicAddress: "",
};

const ADMIN_SESSION_KEY = "homeo_admin_unlocked";

export function Settings() {
  const { identity } = useInternetIdentity();
  const { theme, setTheme, isDark } = useTheme();
  const { allRequests, approveRequest, denyRequest, changeRole, revokeAccess } =
    useAccessControl();

  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal = principal
    ? `${principal.slice(0, 12)}...${principal.slice(-8)}`
    : "Not connected";

  const storageKey = principal ? `doctorProfile_${principal}` : null;

  const [doctorProfile, setDoctorProfile] =
    useState<DoctorProfile>(EMPTY_PROFILE);
  const [editProfile, setEditProfile] = useState<DoctorProfile>(EMPTY_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  // ─── Access Control State ───────────────────────────────────
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passphraseInput, setPassphraseInput] = useState("");
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [passphraseError, setPassphraseError] = useState(false);
  const [newPrincipal, setNewPrincipal] = useState("");
  const [newPrincipalRole, setNewPrincipalRole] = useState<UserRole>("doctor");

  // Per-pending-row approval role state
  const [pendingApprovalRoles, setPendingApprovalRoles] = useState<
    Record<string, UserRole>
  >({});
  const [pendingApprovalExpanded, setPendingApprovalExpanded] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const unlocked = sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
    setIsAdminUnlocked(unlocked);
  }, []);

  // Load saved profile
  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as DoctorProfile;
        setDoctorProfile(parsed);
      }
    } catch {
      // ignore parse errors
    }
  }, [storageKey]);

  const handleEdit = () => {
    setEditProfile({ ...doctorProfile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(editProfile));
      setDoctorProfile({ ...editProfile });
      setIsEditing(false);
      toast.success("Profile saved");
    } catch {
      // ignore storage errors
    }
  };

  // ─── Admin Unlock ──────────────────────────────────────────
  function handleUnlock() {
    if (passphraseInput === ADMIN_PASSPHRASE) {
      setAdminSession(true);
      setIsAdminUnlocked(true);
      setPassphraseError(false);
      setPassphraseInput("");
      toast.success("Admin panel unlocked");
    } else {
      setPassphraseError(true);
      toast.error("Incorrect passphrase");
    }
  }

  function handleLock() {
    setAdminSession(false);
    setIsAdminUnlocked(false);
    toast.success("Admin panel locked");
  }

  // ─── Access Control Actions ────────────────────────────────
  async function handleApprovePending(p: string) {
    const role = pendingApprovalRoles[p] ?? "doctor";
    try {
      await approveRequest(p, role);
      toast.success(`User approved as ${role}`);
      setPendingApprovalExpanded((prev) => ({ ...prev, [p]: false }));
    } catch {
      toast.error("Failed to approve. Please try again.");
    }
  }

  async function handleDenyPending(p: string) {
    try {
      await denyRequest(p);
      toast.success("Request denied");
    } catch {
      toast.error("Failed to deny. Please try again.");
    }
  }

  async function handleChangeRole(p: string, role: UserRole) {
    try {
      await changeRole(p, role);
      toast.success(`Role changed to ${role}`);
    } catch {
      toast.error("Failed to change role.");
    }
  }

  async function handleRevoke(p: string) {
    try {
      await revokeAccess(p);
      toast.success("Access revoked");
    } catch {
      toast.error("Failed to revoke access.");
    }
  }

  async function handleAddManual() {
    const p = newPrincipal.trim();
    if (!p) return;
    const exists = allRequests.find(
      (r) => r.principal === p && r.status === "approved",
    );
    if (exists) {
      toast.error("Already in approved list");
      return;
    }
    try {
      await approveRequest(p, newPrincipalRole);
      setNewPrincipal("");
      toast.success(`User added as ${newPrincipalRole}`);
    } catch {
      toast.error("Failed to add user. Check the Principal ID and try again.");
    }
  }

  function copyPrincipal() {
    if (principal) {
      navigator.clipboard.writeText(principal).then(() => {
        toast.success("Principal ID copied to clipboard");
      });
    }
  }

  const pendingRequests = allRequests.filter((r) => r.status === "pending");
  const approvedUsers = allRequests.filter((r) => r.status === "approved");

  const profileFields: {
    label: string;
    key: keyof DoctorProfile;
    placeholder: string;
  }[] = [
    { label: "Full Name", key: "name", placeholder: "Dr. Your Name" },
    {
      label: "Qualification",
      key: "qualification",
      placeholder: "BHMS, MD (Hom)",
    },
    {
      label: "Registration No.",
      key: "regNo",
      placeholder: "e.g. KAR/HOM/12345",
    },
    { label: "Phone Number", key: "phone", placeholder: "+91 98765 43210" },
    {
      label: "Clinic Name",
      key: "clinicName",
      placeholder: "Your Clinic Name",
    },
  ];

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
            <div className="flex-1 min-w-0">
              <div
                className="text-sm font-semibold mb-0.5"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Physician Account
              </div>
              <div
                className="text-xs font-mono leading-relaxed truncate"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                {shortPrincipal}
              </div>
            </div>
            <button
              type="button"
              data-ocid="settings.copy_principal.button"
              onClick={copyPrincipal}
              className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: "oklch(var(--muted))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              Copy ID
            </button>
          </div>
        </div>
      </motion.div>

      {/* Doctor Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-xl border mb-4"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div
          className="px-5 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "oklch(var(--teal) / 0.12)" }}
            >
              <Stethoscope
                className="w-3.5 h-3.5"
                style={{ color: "oklch(var(--teal))" }}
              />
            </div>
            <h2
              className="text-sm font-semibold font-display"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Doctor Profile
            </h2>
          </div>
          {!isEditing && (
            <button
              type="button"
              data-ocid="settings.doctor_profile.edit_button"
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: "oklch(var(--muted))",
                color: "oklch(var(--foreground))",
              }}
            >
              <Pencil className="w-3 h-3" /> Edit
            </button>
          )}
        </div>
        <div className="p-5">
          {!isEditing ? (
            <div className="space-y-3.5">
              {profileFields.map(({ label, key }) => (
                <div key={key} className="flex items-start gap-3">
                  <span
                    className="text-xs font-semibold w-32 flex-shrink-0 pt-0.5"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: doctorProfile[key]
                        ? "oklch(var(--foreground))"
                        : "oklch(var(--muted-foreground))",
                      fontStyle: doctorProfile[key] ? "normal" : "italic",
                    }}
                  >
                    {doctorProfile[key] || "Not set"}
                  </span>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <span
                  className="text-xs font-semibold w-32 flex-shrink-0 pt-0.5"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Clinic Address
                </span>
                <span
                  className="text-sm whitespace-pre-wrap"
                  style={{
                    color: doctorProfile.clinicAddress
                      ? "oklch(var(--foreground))"
                      : "oklch(var(--muted-foreground))",
                    fontStyle: doctorProfile.clinicAddress
                      ? "normal"
                      : "italic",
                  }}
                >
                  {doctorProfile.clinicAddress || "Not set"}
                </span>
              </div>
              {!Object.values(doctorProfile).some(Boolean) && (
                <p
                  className="text-xs mt-2 pt-2 border-t"
                  style={{
                    color: "oklch(var(--muted-foreground))",
                    borderColor: "oklch(var(--border))",
                  }}
                >
                  Click <strong>Edit</strong> to add your clinic details.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {profileFields.map(({ label, key, placeholder }) => (
                <div key={key} className="space-y-1.5">
                  <Label
                    htmlFor={`doctor-${key}`}
                    className="text-xs font-semibold"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    {label}
                  </Label>
                  <Input
                    id={`doctor-${key}`}
                    data-ocid={`settings.doctor_profile.${key.replace(/([A-Z])/g, "_$1").toLowerCase()}.input`}
                    value={editProfile[key]}
                    onChange={(e) =>
                      setEditProfile((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    placeholder={placeholder}
                    className="text-sm"
                  />
                </div>
              ))}
              <div className="space-y-1.5">
                <Label
                  htmlFor="doctor-clinicAddress"
                  className="text-xs font-semibold"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Clinic Address
                </Label>
                <Textarea
                  id="doctor-clinicAddress"
                  data-ocid="settings.doctor_profile.clinic_address.textarea"
                  value={editProfile.clinicAddress}
                  onChange={(e) =>
                    setEditProfile((prev) => ({
                      ...prev,
                      clinicAddress: e.target.value,
                    }))
                  }
                  placeholder="Street, City, State, PIN"
                  rows={3}
                  className="text-sm resize-none"
                />
              </div>
              <Separator style={{ background: "oklch(var(--border))" }} />
              <div className="flex items-center gap-3 pt-1">
                <Button
                  data-ocid="settings.doctor_profile.save_button"
                  size="sm"
                  onClick={handleSave}
                  className="flex-1 text-sm"
                  style={{
                    background: "oklch(var(--teal))",
                    color: "oklch(var(--primary-foreground))",
                  }}
                >
                  Save Profile
                </Button>
                <Button
                  data-ocid="settings.doctor_profile.cancel_button"
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  className="gap-1.5 text-sm"
                >
                  <X className="w-3.5 h-3.5" /> Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ─── Access Control Card ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.09 }}
        className="rounded-xl border mb-4"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div
          className="px-5 py-4 border-b flex items-center gap-2"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "oklch(0.55 0.14 260 / 0.12)" }}
          >
            <Shield
              className="w-3.5 h-3.5"
              style={{ color: "oklch(0.55 0.14 260)" }}
            />
          </div>
          <h2
            className="text-sm font-semibold font-display"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Admin Access Control
          </h2>
          {isAdminUnlocked && (
            <button
              type="button"
              data-ocid="settings.admin.lock.button"
              onClick={handleLock}
              className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{
                background: "oklch(var(--muted))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              <Lock className="w-3 h-3" /> Lock
            </button>
          )}
        </div>

        <div className="p-5 space-y-5">
          {!isAdminUnlocked ? (
            /* Passphrase Lock Screen */
            <div className="space-y-4">
              <div
                className="flex items-start gap-3 p-4 rounded-lg"
                style={{
                  background: "oklch(0.55 0.14 260 / 0.06)",
                  border: "1px solid oklch(0.55 0.14 260 / 0.15)",
                }}
              >
                <Lock
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.55 0.14 260)" }}
                />
                <div>
                  <p
                    className="text-sm font-medium mb-0.5"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    Admin Access Required
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Enter the admin passphrase to manage who can access
                    HomeoClinic.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  className="text-xs font-semibold"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Admin Passphrase
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      data-ocid="settings.admin.passphrase.input"
                      type={showPassphrase ? "text" : "password"}
                      value={passphraseInput}
                      onChange={(e) => {
                        setPassphraseInput(e.target.value);
                        setPassphraseError(false);
                      }}
                      placeholder="Enter passphrase..."
                      className="pr-9 text-sm"
                      style={{
                        borderColor: passphraseError
                          ? "oklch(var(--destructive))"
                          : undefined,
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleUnlock();
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassphrase((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {showPassphrase ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <Button
                    data-ocid="settings.admin.unlock.button"
                    size="sm"
                    onClick={handleUnlock}
                    style={{
                      background: "oklch(0.55 0.14 260)",
                      color: "oklch(0.99 0 0)",
                    }}
                  >
                    Unlock
                  </Button>
                </div>
                {passphraseError && (
                  <p
                    className="text-xs"
                    style={{ color: "oklch(var(--destructive))" }}
                  >
                    Incorrect passphrase. Please try again.
                  </p>
                )}
              </div>

              {/* Current user's Principal ID for sharing */}
              <Separator style={{ background: "oklch(var(--border))" }} />
              <div>
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
                    {principal || "Not connected"}
                  </p>
                </div>
                <Button
                  data-ocid="settings.access.copy.button"
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={copyPrincipal}
                >
                  Copy Principal ID
                </Button>
                <p
                  className="text-xs mt-2"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Share this ID with the admin to request access.
                </p>
              </div>
            </div>
          ) : (
            /* Admin Panel (unlocked) */
            <>
              {/* ── Pending Requests ── */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "oklch(0.55 0.14 30)" }}
                >
                  Pending Access Requests{" "}
                  {pendingRequests.length > 0 && `(${pendingRequests.length})`}
                </p>
                {pendingRequests.length === 0 ? (
                  <p
                    className="text-xs italic"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    No pending requests.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {pendingRequests.map((req, i) => (
                      <div
                        key={req.principal}
                        data-ocid={`settings.access.pending.item.${i + 1}`}
                        className="rounded-lg border overflow-hidden"
                        style={{
                          background: "oklch(0.55 0.14 30 / 0.04)",
                          borderColor: "oklch(0.55 0.14 30 / 0.18)",
                        }}
                      >
                        {/* Request info */}
                        <div className="p-3 space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <UserX
                                className="w-4 h-4 flex-shrink-0"
                                style={{ color: "oklch(0.55 0.14 30)" }}
                              />
                              <div>
                                <p
                                  className="text-sm font-semibold"
                                  style={{ color: "oklch(var(--foreground))" }}
                                >
                                  {req.name}
                                </p>
                                <p
                                  className="text-xs"
                                  style={{
                                    color: "oklch(var(--muted-foreground))",
                                  }}
                                >
                                  {req.qualification}
                                </p>
                              </div>
                            </div>
                          </div>
                          {req.reason && (
                            <p
                              className="text-xs italic pl-6"
                              style={{
                                color: "oklch(var(--muted-foreground))",
                              }}
                            >
                              &ldquo;{req.reason}&rdquo;
                            </p>
                          )}
                          <p
                            className="text-xs font-mono pl-6 truncate"
                            style={{ color: "oklch(var(--muted-foreground))" }}
                          >
                            {req.principal.slice(0, 20)}…
                          </p>
                        </div>

                        {/* Approval controls */}
                        <div
                          className="px-3 pb-3 pt-2 border-t"
                          style={{ borderColor: "oklch(0.55 0.14 30 / 0.12)" }}
                        >
                          {pendingApprovalExpanded[req.principal] ? (
                            <div className="space-y-2">
                              <p
                                className="text-xs font-semibold"
                                style={{
                                  color: "oklch(var(--muted-foreground))",
                                }}
                              >
                                Assign Role:
                              </p>
                              <RadioGroup
                                value={
                                  pendingApprovalRoles[req.principal] ??
                                  "doctor"
                                }
                                onValueChange={(v) =>
                                  setPendingApprovalRoles((prev) => ({
                                    ...prev,
                                    [req.principal]: v as UserRole,
                                  }))
                                }
                                className="flex gap-4"
                              >
                                <div className="flex items-center gap-1.5">
                                  <RadioGroupItem
                                    value="doctor"
                                    id={`role-doctor-${i}`}
                                  />
                                  <Label
                                    htmlFor={`role-doctor-${i}`}
                                    className="text-xs cursor-pointer"
                                    style={{
                                      color: "oklch(var(--foreground))",
                                    }}
                                  >
                                    Doctor
                                  </Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <RadioGroupItem
                                    value="viewer"
                                    id={`role-viewer-${i}`}
                                  />
                                  <Label
                                    htmlFor={`role-viewer-${i}`}
                                    className="text-xs cursor-pointer"
                                    style={{
                                      color: "oklch(var(--foreground))",
                                    }}
                                  >
                                    Viewer
                                  </Label>
                                </div>
                              </RadioGroup>
                              <div className="flex gap-2 mt-1">
                                <button
                                  type="button"
                                  data-ocid={`settings.access.approve.button.${i + 1}`}
                                  onClick={() =>
                                    handleApprovePending(req.principal)
                                  }
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium"
                                  style={{
                                    background: "oklch(var(--teal) / 0.12)",
                                    color: "oklch(var(--teal))",
                                  }}
                                >
                                  <CheckCircle2 className="w-3 h-3" /> Confirm
                                  Approve
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPendingApprovalExpanded((prev) => ({
                                      ...prev,
                                      [req.principal]: false,
                                    }))
                                  }
                                  className="px-3 py-1.5 rounded-md text-xs font-medium"
                                  style={{
                                    background: "oklch(var(--muted))",
                                    color: "oklch(var(--muted-foreground))",
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                data-ocid={`settings.access.approve.button.${i + 1}`}
                                onClick={() =>
                                  setPendingApprovalExpanded((prev) => ({
                                    ...prev,
                                    [req.principal]: true,
                                  }))
                                }
                                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium"
                                style={{
                                  background: "oklch(var(--teal) / 0.12)",
                                  color: "oklch(var(--teal))",
                                }}
                              >
                                <CheckCircle2 className="w-3 h-3" /> Approve
                              </button>
                              <button
                                type="button"
                                data-ocid={`settings.access.deny.button.${i + 1}`}
                                onClick={() => handleDenyPending(req.principal)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium"
                                style={{
                                  background:
                                    "oklch(var(--destructive) / 0.10)",
                                  color: "oklch(var(--destructive))",
                                }}
                              >
                                <X className="w-3 h-3" /> Deny
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator style={{ background: "oklch(var(--border))" }} />

              {/* ── Approved Users ── */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Approved Users{" "}
                  {approvedUsers.length > 0 && `(${approvedUsers.length})`}
                </p>
                {approvedUsers.length === 0 ? (
                  <p
                    className="text-xs italic"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    No approved users yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {approvedUsers.map((req, i) => (
                      <div
                        key={req.principal}
                        data-ocid={`settings.access.allowed.item.${i + 1}`}
                        className="flex items-start gap-2 p-3 rounded-lg border"
                        style={{
                          background: "oklch(var(--teal) / 0.04)",
                          borderColor: "oklch(var(--teal) / 0.15)",
                        }}
                      >
                        <UserCheck
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: "oklch(var(--teal))" }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="text-sm font-medium"
                              style={{ color: "oklch(var(--foreground))" }}
                            >
                              {req.name}
                            </span>
                            {req.qualification && (
                              <span
                                className="text-xs"
                                style={{
                                  color: "oklch(var(--muted-foreground))",
                                }}
                              >
                                {req.qualification}
                              </span>
                            )}
                            {req.principal === principal && (
                              <span
                                className="text-xs"
                                style={{ color: "oklch(var(--teal))" }}
                              >
                                (you)
                              </span>
                            )}
                          </div>
                          <p
                            className="text-xs font-mono mt-0.5 truncate"
                            style={{ color: "oklch(var(--muted-foreground))" }}
                          >
                            {req.principal.slice(0, 20)}…
                          </p>
                          {/* Role badge + change */}
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={
                                req.role === "doctor"
                                  ? {
                                      borderColor: "oklch(0.45 0.14 193 / 0.4)",
                                      color: "oklch(0.45 0.14 193)",
                                      background: "oklch(0.45 0.14 193 / 0.07)",
                                    }
                                  : {
                                      borderColor:
                                        "oklch(var(--muted-foreground) / 0.4)",
                                      color: "oklch(var(--muted-foreground))",
                                      background: "oklch(var(--muted))",
                                    }
                              }
                            >
                              {req.role === "doctor" ? "Doctor" : "Viewer"}
                            </Badge>
                            <select
                              data-ocid={`settings.access.role_select.${i + 1}`}
                              value={req.role ?? "doctor"}
                              onChange={(e) =>
                                handleChangeRole(
                                  req.principal,
                                  e.target.value as UserRole,
                                )
                              }
                              className="text-xs rounded px-1.5 py-0.5 border"
                              style={{
                                background: "oklch(var(--muted))",
                                borderColor: "oklch(var(--border))",
                                color: "oklch(var(--foreground))",
                              }}
                            >
                              <option value="doctor">Doctor</option>
                              <option value="viewer">Viewer</option>
                            </select>
                          </div>
                        </div>
                        <button
                          type="button"
                          data-ocid={`settings.access.revoke.button.${i + 1}`}
                          onClick={() => handleRevoke(req.principal)}
                          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "oklch(var(--destructive) / 0.08)",
                            color: "oklch(var(--destructive))",
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator style={{ background: "oklch(var(--border))" }} />

              {/* ── Add User Manually ── */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Add User by Principal ID
                </p>
                <div className="space-y-3">
                  <Input
                    data-ocid="settings.access.manual_add.input"
                    value={newPrincipal}
                    onChange={(e) => setNewPrincipal(e.target.value)}
                    placeholder="Paste principal ID here..."
                    className="text-xs font-mono"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddManual();
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <RadioGroup
                      value={newPrincipalRole}
                      onValueChange={(v) => setNewPrincipalRole(v as UserRole)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-1.5">
                        <RadioGroupItem value="doctor" id="new-role-doctor" />
                        <Label
                          htmlFor="new-role-doctor"
                          className="text-xs cursor-pointer"
                          style={{ color: "oklch(var(--foreground))" }}
                        >
                          Doctor
                        </Label>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <RadioGroupItem value="viewer" id="new-role-viewer" />
                        <Label
                          htmlFor="new-role-viewer"
                          className="text-xs cursor-pointer"
                          style={{ color: "oklch(var(--foreground))" }}
                        >
                          Viewer
                        </Label>
                      </div>
                    </RadioGroup>
                    <Button
                      data-ocid="settings.access.manual_add.button"
                      size="sm"
                      onClick={handleAddManual}
                      style={{
                        background: "oklch(0.55 0.14 260)",
                        color: "oklch(0.99 0 0)",
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Ask other doctors to go to Settings and copy their Principal
                    ID, then paste it here to grant access.
                  </p>
                </div>
              </div>
            </>
          )}
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

          <div>
            <p
              className="text-xs font-medium mb-3"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Choose theme
            </p>
            <div className="grid grid-cols-2 gap-3">
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
            {[
              ["Application", "HomeoClinic"],
              ["Case Format", "Sarada Krishna HMCC"],
              ["Materia Medica", "Boericke & Synoptic Key"],
              ["Platform", "Internet Computer"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span style={{ color: "oklch(var(--muted-foreground))" }}>
                  {label}
                </span>
                <span style={{ color: "oklch(var(--foreground))" }}>
                  {value}
                </span>
              </div>
            ))}
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
