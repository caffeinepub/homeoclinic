import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Edit2,
  FileText,
  Loader2,
  Plus,
  Printer,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Appointment, CaseSheet, Patient } from "../backend.d";
import {
  useAddAppointment,
  useCasesByPatient,
  useCreateCase,
  usePatient,
  useUpdatePatient,
} from "../hooks/useQueries";
import {
  currentYear,
  formatDate,
  generateId,
  todayISO,
} from "../utils/helpers";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-xs"
        style={{ color: "oklch(var(--muted-foreground))" }}
      >
        {label}
      </span>
      <span className="text-sm" style={{ color: "oklch(var(--foreground))" }}>
        {value || "—"}
      </span>
    </div>
  );
}

export function PatientDetail() {
  const { id } = useParams({ from: "/patients/$id" });
  const navigate = useNavigate();
  const { data: patient, isLoading: loadingPt } = usePatient(id);
  const { data: cases, isLoading: loadingCases } = useCasesByPatient(id);
  const updatePatient = useUpdatePatient();
  const addAppointment = useAddAppointment();
  const createCase = useCreateCase();

  const [editOpen, setEditOpen] = useState(false);
  const [apptOpen, setApptOpen] = useState(false);
  const [editForm, setEditForm] = useState<
    Partial<Omit<Patient, "age"> & { age: string }>
  >({});
  const [apptForm, setApptForm] = useState({
    date: todayISO(),
    time: "",
    reason: "New",
  });

  function openEdit() {
    if (!patient) return;
    setEditForm({
      id: patient.id,
      name: patient.name,
      sex: patient.sex,
      occupation: patient.occupation,
      address: patient.address,
      contact: patient.contact,
      registrationYear: patient.registrationYear,
      age: patient.age?.toString() ?? "",
    });
    setEditOpen(true);
  }

  async function handleSaveEdit() {
    if (!patient || !editForm.name) return;
    try {
      await updatePatient.mutateAsync({
        id: patient.id,
        patient: {
          ...patient,
          name: editForm.name ?? patient.name,
          age: BigInt(String(editForm.age ?? patient.age?.toString() ?? "0")),
          sex: editForm.sex ?? patient.sex,
          occupation: editForm.occupation ?? patient.occupation,
          address: editForm.address ?? patient.address,
          contact: editForm.contact ?? patient.contact,
        },
      });
      toast.success("Patient updated");
      setEditOpen(false);
    } catch {
      toast.error("Failed to update patient");
    }
  }

  async function handleAddAppointment() {
    if (!patient) return;
    try {
      const appt: Appointment = {
        id: generateId(),
        patientName: patient.name,
        date: apptForm.date,
        time: apptForm.time,
        reason: apptForm.reason,
        status: "Scheduled",
      };
      await addAppointment.mutateAsync(appt);
      toast.success("Appointment added");
      setApptOpen(false);
      setApptForm({ date: todayISO(), time: "", reason: "New" });
    } catch {
      toast.error("Failed to add appointment");
    }
  }

  async function handleNewCase() {
    if (!patient) return;
    const yr = BigInt(currentYear());
    const newCase: CaseSheet = {
      id: generateId(),
      patientId: patient.id,
      year: yr,
      chiefComplaint: "",
      hpi: "",
      pastHistory: "",
      familyHistory: "",
      personalHistory: "",
      mentalGenerals: "",
      physicalGenerals: "",
      examinationFindings: "",
      investigations: "",
      miasmaticAnalysis: "",
      totality: "",
      repertorialFindings: "",
      createdAt: BigInt(Date.now()),
      updatedAt: BigInt(Date.now()),
    };
    try {
      await createCase.mutateAsync(newCase);
      toast.success("New case sheet created");
      void navigate({ to: `/cases/${newCase.id}` });
    } catch {
      toast.error("Failed to create case sheet");
    }
  }

  // Group cases by year
  const casesByYear =
    cases?.reduce(
      (acc, c) => {
        const yr = c.year?.toString() ?? "Unknown";
        if (!acc[yr]) acc[yr] = [];
        acc[yr].push(c);
        return acc;
      },
      {} as Record<string, CaseSheet[]>,
    ) ?? {};

  const sortedYears = Object.keys(casesByYear).sort(
    (a, b) => Number(b) - Number(a),
  );

  if (loadingPt) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-6 text-center">
        <p style={{ color: "oklch(var(--muted-foreground))" }}>
          Patient not found
        </p>
        <Link to="/patients">
          <Button className="mt-4" variant="outline">
            Back to Patients
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link
          to="/patients"
          data-ocid="patient_detail.back.link"
          className="flex items-center gap-1.5 text-xs mb-4 hover:underline"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Patients
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{
                background: "oklch(0.45 0.14 193 / 0.12)",
                color: "oklch(0.35 0.14 193)",
                border: "1px solid oklch(0.45 0.14 193 / 0.25)",
              }}
            >
              {patient.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1
                className="text-2xl font-display font-bold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                {patient.name}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {patient.age?.toString()} yrs · {patient.sex}
                </span>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: "oklch(0.45 0.14 193 / 0.35)",
                    color: "oklch(0.38 0.14 193)",
                  }}
                >
                  {patient.registrationYear?.toString()}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              data-ocid="patient_detail.print.primary_button"
              onClick={() => window.print()}
              className="gap-1.5 h-8 text-xs no-print"
              style={{
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              <Printer className="w-3 h-3" /> Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              data-ocid="patient_detail.edit.button"
              onClick={openEdit}
              className="gap-1.5 h-8 text-xs"
              style={{
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              <Edit2 className="w-3 h-3" /> Edit
            </Button>
            <Button
              size="sm"
              data-ocid="patient_detail.new_case.button"
              onClick={handleNewCase}
              disabled={createCase.isPending}
              className="gap-1.5 h-8 text-xs"
              style={{
                background: "oklch(var(--teal))",
                color: "oklch(0.99 0 0)",
              }}
            >
              {createCase.isPending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Plus className="w-3 h-3" />
              )}
              New Case Sheet
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Bio-data card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-lg border p-5 mb-5"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4" style={{ color: "oklch(var(--teal))" }} />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(var(--teal))" }}
          >
            Bio-Data
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InfoRow label="Name" value={patient.name} />
          <InfoRow label="Age" value={`${patient.age?.toString()} years`} />
          <InfoRow label="Sex" value={patient.sex} />
          <InfoRow label="Occupation" value={patient.occupation} />
          <InfoRow label="Contact" value={patient.contact} />
          <InfoRow
            label="Reg. Year"
            value={patient.registrationYear?.toString() ?? ""}
          />
          <div className="col-span-2 sm:col-span-1">
            <InfoRow label="Address" value={patient.address} />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <Tabs defaultValue="cases">
          <TabsList
            className="mb-4"
            style={{
              background: "oklch(var(--muted))",
              borderColor: "oklch(var(--border))",
            }}
          >
            <TabsTrigger
              value="cases"
              data-ocid="patient_detail.cases.tab"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Case Sheets ({cases?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              data-ocid="patient_detail.appointments.tab"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Appointments
            </TabsTrigger>
          </TabsList>

          {/* Cases tab */}
          <TabsContent value="cases">
            {loadingCases ? (
              <div className="space-y-2">
                <Skeleton className="h-14 w-full rounded-lg" />
                <Skeleton className="h-14 w-full rounded-lg" />
              </div>
            ) : !cases?.length ? (
              <div
                data-ocid="patient_detail.cases.empty_state"
                className="py-12 text-center rounded-lg border"
                style={{
                  background: "oklch(var(--card))",
                  borderColor: "oklch(var(--border))",
                }}
              >
                <FileText
                  className="w-8 h-8 mx-auto mb-2 opacity-20"
                  style={{ color: "oklch(var(--teal))" }}
                />
                <p
                  className="text-sm mb-3"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  No case sheets yet
                </p>
                <Button
                  size="sm"
                  onClick={handleNewCase}
                  style={{
                    background: "oklch(var(--teal))",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  Create First Case Sheet
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedYears.map((yr) => (
                  <div key={yr}>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: "oklch(var(--teal))" }}
                      >
                        {yr}
                      </span>
                      <div
                        className="flex-1 h-px"
                        style={{ background: "oklch(0.90 0.008 240)" }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      {casesByYear[yr].map((c, i) => (
                        <Link key={c.id} to="/cases/$id" params={{ id: c.id }}>
                          <div
                            data-ocid={`patient_detail.case.item.${i + 1}`}
                            className="flex items-center justify-between px-4 py-3 rounded-lg border transition-colors hover:border-teal/30"
                            style={{
                              background: "oklch(var(--card))",
                              borderColor: "oklch(var(--border))",
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <FileText
                                className="w-4 h-4"
                                style={{ color: "oklch(var(--teal))" }}
                              />
                              <div>
                                <div
                                  className="text-sm font-medium"
                                  style={{ color: "oklch(var(--foreground))" }}
                                >
                                  {c.chiefComplaint
                                    ? c.chiefComplaint.slice(0, 60) +
                                      (c.chiefComplaint.length > 60 ? "…" : "")
                                    : "Case Sheet (untitled)"}
                                </div>
                                <div
                                  className="text-xs mt-0.5"
                                  style={{
                                    color: "oklch(var(--muted-foreground))",
                                  }}
                                >
                                  {formatDate(
                                    new Date(Number(c.createdAt))
                                      .toISOString()
                                      .split("T")[0],
                                  )}
                                </div>
                              </div>
                            </div>
                            <ChevronRight
                              className="w-4 h-4"
                              style={{
                                color: "oklch(var(--muted-foreground))",
                              }}
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Appointments tab */}
          <TabsContent value="appointments">
            <div className="flex justify-end mb-3">
              <Button
                size="sm"
                data-ocid="patient_detail.add_appointment.button"
                onClick={() => setApptOpen(true)}
                style={{
                  background: "oklch(var(--teal))",
                  color: "oklch(0.99 0 0)",
                }}
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Add Appointment
              </Button>
            </div>
            <div
              data-ocid="patient_detail.appointments.empty_state"
              className="py-10 text-center rounded-lg border"
              style={{
                background: "oklch(var(--card))",
                borderColor: "oklch(var(--border))",
              }}
            >
              <Calendar
                className="w-8 h-8 mx-auto mb-2 opacity-20"
                style={{ color: "oklch(var(--teal))" }}
              />
              <p
                className="text-sm"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Appointments are listed in the Appointments module
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Edit modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent
          data-ocid="patient_detail.edit.dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="font-display"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Edit Patient
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Full Name
                </Label>
                <Input
                  data-ocid="patient_detail.edit.name.input"
                  value={editForm.name ?? ""}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, name: e.target.value }))
                  }
                  style={{
                    background: "oklch(var(--muted))",
                    borderColor: "oklch(var(--border))",
                    color: "oklch(var(--foreground))",
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Age
                </Label>
                <Input
                  data-ocid="patient_detail.edit.age.input"
                  type="number"
                  value={editForm.age?.toString() ?? ""}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, age: e.target.value }))
                  }
                  style={{
                    background: "oklch(var(--muted))",
                    borderColor: "oklch(var(--border))",
                    color: "oklch(var(--foreground))",
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Sex
                </Label>
                <Select
                  value={editForm.sex ?? ""}
                  onValueChange={(v) => setEditForm((p) => ({ ...p, sex: v }))}
                >
                  <SelectTrigger
                    data-ocid="patient_detail.edit.sex.select"
                    style={{
                      background: "oklch(var(--muted))",
                      borderColor: "oklch(var(--border))",
                      color: "oklch(var(--foreground))",
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(var(--card))",
                      borderColor: "oklch(var(--border))",
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
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Occupation
                </Label>
                <Input
                  data-ocid="patient_detail.edit.occupation.input"
                  value={editForm.occupation ?? ""}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, occupation: e.target.value }))
                  }
                  style={{
                    background: "oklch(var(--muted))",
                    borderColor: "oklch(var(--border))",
                    color: "oklch(var(--foreground))",
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Contact
                </Label>
                <Input
                  data-ocid="patient_detail.edit.contact.input"
                  value={editForm.contact ?? ""}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, contact: e.target.value }))
                  }
                  style={{
                    background: "oklch(var(--muted))",
                    borderColor: "oklch(var(--border))",
                    color: "oklch(var(--foreground))",
                  }}
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Address
                </Label>
                <Input
                  data-ocid="patient_detail.edit.address.input"
                  value={editForm.address ?? ""}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, address: e.target.value }))
                  }
                  style={{
                    background: "oklch(var(--muted))",
                    borderColor: "oklch(var(--border))",
                    color: "oklch(var(--foreground))",
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="patient_detail.edit.cancel_button"
              onClick={() => setEditOpen(false)}
              style={{
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="patient_detail.edit.save_button"
              onClick={handleSaveEdit}
              disabled={updatePatient.isPending}
              style={{
                background: "oklch(var(--teal))",
                color: "oklch(0.99 0 0)",
              }}
            >
              {updatePatient.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add appointment modal */}
      <Dialog open={apptOpen} onOpenChange={setApptOpen}>
        <DialogContent
          data-ocid="patient_detail.appointment.dialog"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="font-display"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Add Appointment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label
                className="text-xs"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Date
              </Label>
              <Input
                type="date"
                value={apptForm.date}
                onChange={(e) =>
                  setApptForm((p) => ({ ...p, date: e.target.value }))
                }
                data-ocid="patient_detail.appointment.date.input"
                style={{
                  background: "oklch(var(--muted))",
                  borderColor: "oklch(var(--border))",
                  color: "oklch(var(--foreground))",
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                className="text-xs"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Time
              </Label>
              <Input
                type="time"
                value={apptForm.time}
                onChange={(e) =>
                  setApptForm((p) => ({ ...p, time: e.target.value }))
                }
                data-ocid="patient_detail.appointment.time.input"
                style={{
                  background: "oklch(var(--muted))",
                  borderColor: "oklch(var(--border))",
                  color: "oklch(var(--foreground))",
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                className="text-xs"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Visit Type
              </Label>
              <Select
                value={apptForm.reason}
                onValueChange={(v) => setApptForm((p) => ({ ...p, reason: v }))}
              >
                <SelectTrigger
                  data-ocid="patient_detail.appointment.type.select"
                  style={{
                    background: "oklch(var(--muted))",
                    borderColor: "oklch(var(--border))",
                    color: "oklch(var(--foreground))",
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(var(--card))",
                    borderColor: "oklch(var(--border))",
                  }}
                >
                  <SelectItem value="New">New Patient</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="patient_detail.appointment.cancel_button"
              onClick={() => setApptOpen(false)}
              style={{
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="patient_detail.appointment.submit_button"
              onClick={handleAddAppointment}
              disabled={addAppointment.isPending}
              style={{
                background: "oklch(var(--teal))",
                color: "oklch(0.99 0 0)",
              }}
            >
              {addAppointment.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Add Appointment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
