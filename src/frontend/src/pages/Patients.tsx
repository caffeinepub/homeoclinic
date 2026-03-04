import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Loader2,
  Search,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type React from "react";
import { toast } from "sonner";
import type { Patient } from "../backend.d";
import {
  useAllPatients,
  useDeletePatient,
  useRegisterPatient,
} from "../hooks/useQueries";
import { currentYear, generateId, getYears } from "../utils/helpers";

// Local form state type (age as string for input, no non-existent fields)
interface PatientFormState {
  name: string;
  age: string;
  sex: string;
  occupation: string;
  address: string;
  contact: string;
}

const EMPTY_PATIENT_FORM: PatientFormState = {
  name: "",
  age: "",
  sex: "",
  occupation: "",
  address: "",
  contact: "",
};

export function Patients() {
  const { data: patients, isLoading } = useAllPatients();
  const registerMutation = useRegisterPatient();
  const deleteMutation = useDeletePatient();

  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<number | "all">("all");
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<PatientFormState>({ ...EMPTY_PATIENT_FORM });

  const years = getYears();
  const yr = currentYear();

  const filtered =
    patients?.filter((p) => {
      const matchSearch =
        !search || p.name.toLowerCase().includes(search.toLowerCase());
      const matchYear =
        yearFilter === "all" || Number(p.registrationYear) === yearFilter;
      return matchSearch && matchYear;
    }) ?? [];

  function handleFormChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleRegister() {
    if (!form.name.trim() || !form.sex || !form.age) {
      toast.error("Name, age, and sex are required");
      return;
    }
    const patient: Patient = {
      id: generateId(),
      name: form.name.trim(),
      age: BigInt(form.age),
      sex: form.sex,
      occupation: form.occupation,
      address: form.address,
      contact: form.contact,
      registrationYear: BigInt(yr),
    };
    try {
      await registerMutation.mutateAsync(patient);
      toast.success("Patient registered successfully");
      setNewPatientOpen(false);
      setForm({ ...EMPTY_PATIENT_FORM });
    } catch {
      toast.error("Failed to register patient");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Patient deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete patient");
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users
              className="w-4 h-4"
              style={{ color: "oklch(0.45 0.14 193)" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.45 0.14 193)" }}
            >
              Patient Registry
            </span>
          </div>
          <h1
            className="text-2xl font-display font-bold tracking-tight"
            style={{ color: "oklch(0.15 0.010 240)" }}
          >
            Patients
          </h1>
        </div>

        <Dialog open={newPatientOpen} onOpenChange={setNewPatientOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="patients.open_modal_button"
              className="gap-2 h-9"
              style={{
                background: "oklch(0.45 0.14 193)",
                color: "oklch(0.99 0 0)",
              }}
            >
              <UserPlus className="w-4 h-4" />
              New Patient
            </Button>
          </DialogTrigger>
          <DialogContent
            data-ocid="patients.dialog"
            className="max-w-lg max-h-[90vh] overflow-y-auto"
            style={{
              background: "oklch(1.0 0 0)",
              borderColor: "oklch(0.88 0.010 240)",
            }}
          >
            <DialogHeader>
              <DialogTitle
                className="font-display"
                style={{ color: "oklch(0.15 0.010 240)" }}
              >
                Register New Patient
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.40 0.010 240)" }}
                  >
                    Full Name *
                  </Label>
                  <Input
                    data-ocid="patients.name.input"
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="Patient's full name"
                    style={{
                      background: "oklch(0.96 0.006 240)",
                      borderColor: "oklch(0.88 0.010 240)",
                      color: "oklch(0.15 0.010 240)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.40 0.010 240)" }}
                  >
                    Age *
                  </Label>
                  <Input
                    data-ocid="patients.age.input"
                    type="number"
                    value={form.age}
                    onChange={(e) => handleFormChange("age", e.target.value)}
                    placeholder="Age in years"
                    style={{
                      background: "oklch(0.96 0.006 240)",
                      borderColor: "oklch(0.88 0.010 240)",
                      color: "oklch(0.15 0.010 240)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.40 0.010 240)" }}
                  >
                    Sex *
                  </Label>
                  <Select
                    value={form.sex}
                    onValueChange={(v) => handleFormChange("sex", v)}
                  >
                    <SelectTrigger
                      data-ocid="patients.sex.select"
                      style={{
                        background: "oklch(0.96 0.006 240)",
                        borderColor: "oklch(0.88 0.010 240)",
                        color: "oklch(0.15 0.010 240)",
                      }}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "oklch(1.0 0 0)",
                        borderColor: "oklch(0.88 0.010 240)",
                      }}
                    >
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.40 0.010 240)" }}
                  >
                    Occupation
                  </Label>
                  <Input
                    data-ocid="patients.occupation.input"
                    value={form.occupation}
                    onChange={(e) =>
                      handleFormChange("occupation", e.target.value)
                    }
                    placeholder="Occupation"
                    style={{
                      background: "oklch(0.96 0.006 240)",
                      borderColor: "oklch(0.88 0.010 240)",
                      color: "oklch(0.15 0.010 240)",
                    }}
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.40 0.010 240)" }}
                  >
                    Address
                  </Label>
                  <Input
                    data-ocid="patients.address.input"
                    value={form.address}
                    onChange={(e) =>
                      handleFormChange("address", e.target.value)
                    }
                    placeholder="Full address"
                    style={{
                      background: "oklch(0.96 0.006 240)",
                      borderColor: "oklch(0.88 0.010 240)",
                      color: "oklch(0.15 0.010 240)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.40 0.010 240)" }}
                  >
                    Contact
                  </Label>
                  <Input
                    data-ocid="patients.contact.input"
                    value={form.contact}
                    onChange={(e) =>
                      handleFormChange("contact", e.target.value)
                    }
                    placeholder="Phone number"
                    style={{
                      background: "oklch(0.96 0.006 240)",
                      borderColor: "oklch(0.88 0.010 240)",
                      color: "oklch(0.15 0.010 240)",
                    }}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                data-ocid="patients.cancel_button"
                onClick={() => setNewPatientOpen(false)}
                style={{
                  borderColor: "oklch(0.88 0.010 240)",
                  color: "oklch(0.40 0.010 240)",
                }}
              >
                Cancel
              </Button>
              <Button
                data-ocid="patients.submit_button"
                onClick={handleRegister}
                disabled={registerMutation.isPending}
                style={{
                  background: "oklch(0.45 0.14 193)",
                  color: "oklch(0.99 0 0)",
                }}
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />{" "}
                    Saving…
                  </>
                ) : (
                  "Register Patient"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search + Year Filter */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 mb-4"
      >
        <div className="relative flex-1">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
            style={{ color: "oklch(0.55 0.010 240)" }}
          />
          <Input
            data-ocid="patients.search_input"
            placeholder="Search patients by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
            style={{
              background: "oklch(1.0 0 0)",
              borderColor: "oklch(0.88 0.010 240)",
              color: "oklch(0.15 0.010 240)",
            }}
          />
        </div>
      </motion.div>

      {/* Year filter tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
        className="flex flex-wrap gap-1.5 mb-5"
      >
        <button
          type="button"
          data-ocid="patients.year_filter.tab"
          onClick={() => setYearFilter("all")}
          className="px-3 py-1 rounded-md text-xs font-medium transition-all"
          style={{
            background:
              yearFilter === "all"
                ? "oklch(0.45 0.14 193)"
                : "oklch(0.93 0.008 240)",
            color:
              yearFilter === "all"
                ? "oklch(0.99 0 0)"
                : "oklch(0.45 0.010 240)",
          }}
        >
          All Years
        </button>
        {years.slice(0, 7).map((y) => (
          <button
            type="button"
            key={y}
            data-ocid={`patients.year_${y}.tab`}
            onClick={() => setYearFilter(y)}
            className="px-3 py-1 rounded-md text-xs font-medium transition-all"
            style={{
              background:
                yearFilter === y
                  ? "oklch(0.45 0.14 193)"
                  : "oklch(0.93 0.008 240)",
              color:
                yearFilter === y ? "oklch(0.99 0 0)" : "oklch(0.45 0.010 240)",
            }}
          >
            {y}
          </button>
        ))}
      </motion.div>

      {/* Patient list */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-lg border overflow-hidden"
        style={{
          borderColor: "oklch(0.88 0.010 240)",
          boxShadow: "0 1px 4px oklch(0.15 0.010 240 / 0.05)",
        }}
      >
        {isLoading ? (
          <div
            className="divide-y divide-border"
            style={
              {
                "--divide-color": "oklch(0.90 0.008 240)",
              } as React.CSSProperties
            }
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-4 flex items-center gap-3"
                style={{ background: "oklch(1.0 0 0)" }}
              >
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            ))}
          </div>
        ) : !filtered.length ? (
          <div
            data-ocid="patients.empty_state"
            className="py-16 text-center"
            style={{ background: "oklch(1.0 0 0)" }}
          >
            <Users
              className="w-10 h-10 mx-auto mb-3 opacity-20"
              style={{ color: "oklch(0.45 0.14 193)" }}
            />
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "oklch(0.40 0.010 240)" }}
            >
              {search ? "No patients found" : "No patients registered"}
            </p>
            <p className="text-xs" style={{ color: "oklch(0.60 0.010 240)" }}>
              {search
                ? "Try a different search term"
                : "Register your first patient to get started"}
            </p>
          </div>
        ) : (
          <div
            className="divide-y"
            style={{ borderColor: "oklch(0.90 0.008 240)" }}
          >
            {filtered.map((patient, i) => (
              <div
                key={patient.id}
                data-ocid={`patients.patient.item.${i + 1}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors group hover:bg-[oklch(0.97_0.004_240)]"
                style={{ background: "oklch(1.0 0 0)" }}
              >
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                  style={{
                    background: `oklch(${patient.sex === "Female" ? "0.45 0.14 310" : "0.45 0.14 193"} / 0.12)`,
                    color: `oklch(${patient.sex === "Female" ? "0.40 0.14 310" : "0.40 0.14 193"})`,
                  }}
                >
                  {patient.name.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-medium truncate"
                      style={{ color: "oklch(0.18 0.010 240)" }}
                    >
                      {patient.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs hidden sm:inline-flex"
                      style={{
                        borderColor: "oklch(0.86 0.010 240)",
                        color: "oklch(0.50 0.010 240)",
                      }}
                    >
                      {patient.registrationYear?.toString()}
                    </Badge>
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.010 240)" }}
                  >
                    {patient.age?.toString()} yrs · {patient.sex} ·{" "}
                    {patient.occupation || "—"}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/patients/$id"
                    params={{ id: patient.id }}
                    data-ocid={`patients.view.button.${i + 1}`}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-all"
                      style={{
                        color: "oklch(0.45 0.14 193)",
                        background: "oklch(0.45 0.14 193 / 0.08)",
                      }}
                    >
                      View <ChevronRight className="w-3 h-3" />
                    </button>
                  </Link>
                  <button
                    type="button"
                    data-ocid={`patients.delete_button.${i + 1}`}
                    onClick={() => setDeleteId(patient.id)}
                    className="w-7 h-7 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      color: "oklch(0.55 0.22 25)",
                      background: "oklch(0.55 0.22 25 / 0.08)",
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent
          data-ocid="patients.delete.dialog"
          style={{
            background: "oklch(1.0 0 0)",
            borderColor: "oklch(0.88 0.010 240)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "oklch(0.15 0.010 240)" }}>
              Delete Patient?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: "oklch(0.50 0.012 240)" }}>
              This will permanently delete the patient and all associated
              records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="patients.delete.cancel_button"
              style={{
                background: "oklch(0.94 0.008 240)",
                borderColor: "oklch(0.88 0.010 240)",
                color: "oklch(0.30 0.010 240)",
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="patients.delete.confirm_button"
              onClick={() => deleteId && handleDelete(deleteId)}
              style={{
                background: "oklch(0.55 0.22 25)",
                color: "oklch(0.99 0 0)",
              }}
            >
              {deleteMutation.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
