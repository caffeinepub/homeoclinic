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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Appointment } from "../backend.d";
import {
  useAddAppointment,
  useAllAppointments,
  useAllPatients,
  useAppointmentsByDate,
  useDeleteAppointment,
  useUpdateAppointment,
} from "../hooks/useQueries";
import { formatDate, generateId, todayISO } from "../utils/helpers";

const EMPTY_APPT = {
  patientSearch: "",
  patientId: "",
  date: todayISO(),
  visitType: "New",
  notes: "",
};

export function Appointments() {
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_APPT });

  const { data: dateAppts, isLoading: loadingDate } =
    useAppointmentsByDate(selectedDate);
  const { data: allAppts, isLoading: loadingAll } = useAllAppointments();
  const { data: patients } = useAllPatients();
  const addAppt = useAddAppointment();
  const deleteAppt = useDeleteAppointment();

  const filteredPatients =
    patients?.filter(
      (p) =>
        !form.patientSearch ||
        p.name.toLowerCase().includes(form.patientSearch.toLowerCase()),
    ) ?? [];

  function prevDay() {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split("T")[0]);
  }

  function nextDay() {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split("T")[0]);
  }

  function getPatientName(patientId: string): string {
    return (
      patients?.find((p) => p.id === patientId)?.name ??
      `${patientId.slice(0, 10)}…`
    );
  }

  async function handleAdd() {
    if (!form.patientId || !form.date) {
      toast.error("Patient and date are required");
      return;
    }
    const appt: Appointment = {
      id: generateId(),
      patientId: form.patientId,
      date: form.date,
      visitType: form.visitType,
      notes: form.notes,
    };
    try {
      await addAppt.mutateAsync(appt);
      toast.success("Appointment added");
      setAddOpen(false);
      setForm({ ...EMPTY_APPT });
    } catch {
      toast.error("Failed to add appointment");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteAppt.mutateAsync(id);
      toast.success("Appointment deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete appointment");
    }
  }

  function ApptCard({ appt, i }: { appt: Appointment; i: number }) {
    return (
      <div
        data-ocid={`appointments.appointment.item.${i + 1}`}
        className="flex items-center gap-3 px-4 py-3 rounded-lg border group"
        style={{
          background: "oklch(0.20 0.010 240)",
          borderColor: "oklch(0.28 0.012 240)",
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{
            background: "oklch(0.72 0.14 193 / 0.15)",
            color: "oklch(0.72 0.14 193)",
          }}
        >
          {getPatientName(appt.patientId).charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="text-sm font-medium truncate"
            style={{ color: "oklch(0.88 0.008 240)" }}
          >
            {getPatientName(appt.patientId)}
          </div>
          <div className="text-xs" style={{ color: "oklch(0.50 0.008 240)" }}>
            {formatDate(appt.date)} · {appt.visitType}
            {appt.notes && ` · ${appt.notes}`}
          </div>
        </div>
        <Badge
          variant="outline"
          className="text-xs hidden sm:inline-flex"
          style={{
            borderColor:
              appt.visitType === "Follow-up"
                ? "oklch(0.78 0.12 160 / 0.4)"
                : "oklch(0.72 0.14 193 / 0.4)",
            color:
              appt.visitType === "Follow-up"
                ? "oklch(0.78 0.12 160)"
                : "oklch(0.72 0.14 193)",
          }}
        >
          {appt.visitType}
        </Badge>
        <button
          type="button"
          data-ocid={`appointments.delete_button.${i + 1}`}
          onClick={() => setDeleteId(appt.id)}
          className="w-7 h-7 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          style={{
            color: "oklch(0.62 0.20 25)",
            background: "oklch(0.62 0.20 25 / 0.1)",
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.14 193)" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.14 193)" }}
            >
              Schedule
            </span>
          </div>
          <h1
            className="text-2xl font-display font-bold tracking-tight"
            style={{ color: "oklch(0.93 0.008 240)" }}
          >
            Appointments
          </h1>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="appointments.add.open_modal_button"
              className="gap-2 h-9"
              style={{
                background: "oklch(0.72 0.14 193)",
                color: "oklch(0.13 0.012 240)",
              }}
            >
              <CalendarPlus className="w-4 h-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent
            data-ocid="appointments.add.dialog"
            className="max-w-md"
            style={{
              background: "oklch(0.18 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <DialogHeader>
              <DialogTitle
                className="font-display"
                style={{ color: "oklch(0.93 0.008 240)" }}
              >
                New Appointment
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              {/* Patient search */}
              <div className="space-y-2">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(0.60 0.010 240)" }}
                >
                  Patient *
                </Label>
                <div className="relative">
                  <Search
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                    style={{ color: "oklch(0.50 0.008 240)" }}
                  />
                  <Input
                    data-ocid="appointments.add.search.search_input"
                    placeholder="Search patient by name…"
                    value={form.patientSearch}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        patientSearch: e.target.value,
                        patientId: "",
                      }))
                    }
                    className="pl-8"
                    style={{
                      background: "oklch(0.22 0.012 240)",
                      borderColor: "oklch(0.30 0.012 240)",
                      color: "oklch(0.93 0.008 240)",
                    }}
                  />
                </div>
                {form.patientSearch &&
                  !form.patientId &&
                  filteredPatients.length > 0 && (
                    <div
                      className="rounded-md border max-h-36 overflow-y-auto"
                      style={{
                        background: "oklch(0.22 0.012 240)",
                        borderColor: "oklch(0.30 0.012 240)",
                      }}
                    >
                      {filteredPatients.slice(0, 5).map((p) => (
                        <button
                          type="button"
                          key={p.id}
                          data-ocid="appointments.add.patient.button"
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              patientId: p.id,
                              patientSearch: p.name,
                            }))
                          }
                          className="w-full text-left px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                          style={{ color: "oklch(0.88 0.008 240)" }}
                        >
                          {p.name} — {p.age?.toString()} yrs
                        </button>
                      ))}
                    </div>
                  )}
                {form.patientId && (
                  <div
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: "oklch(0.72 0.14 193 / 0.1)",
                      color: "oklch(0.72 0.14 193)",
                    }}
                  >
                    ✓ {form.patientSearch} selected
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(0.60 0.010 240)" }}
                >
                  Date *
                </Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  data-ocid="appointments.add.date.input"
                  style={{
                    background: "oklch(0.22 0.012 240)",
                    borderColor: "oklch(0.30 0.012 240)",
                    color: "oklch(0.93 0.008 240)",
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(0.60 0.010 240)" }}
                >
                  Visit Type
                </Label>
                <Select
                  value={form.visitType}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, visitType: v }))
                  }
                >
                  <SelectTrigger
                    data-ocid="appointments.add.type.select"
                    style={{
                      background: "oklch(0.22 0.012 240)",
                      borderColor: "oklch(0.30 0.012 240)",
                      color: "oklch(0.93 0.008 240)",
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.22 0.012 240)",
                      borderColor: "oklch(0.30 0.012 240)",
                    }}
                  >
                    <SelectItem value="New">New Patient</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(0.60 0.010 240)" }}
                >
                  Notes
                </Label>
                <Input
                  value={form.notes}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, notes: e.target.value }))
                  }
                  data-ocid="appointments.add.notes.input"
                  placeholder="Optional notes…"
                  style={{
                    background: "oklch(0.22 0.012 240)",
                    borderColor: "oklch(0.30 0.012 240)",
                    color: "oklch(0.93 0.008 240)",
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                data-ocid="appointments.add.cancel_button"
                onClick={() => setAddOpen(false)}
                style={{
                  borderColor: "oklch(0.30 0.012 240)",
                  color: "oklch(0.70 0.010 240)",
                }}
              >
                Cancel
              </Button>
              <Button
                data-ocid="appointments.add.submit_button"
                onClick={handleAdd}
                disabled={addAppt.isPending}
                style={{
                  background: "oklch(0.72 0.14 193)",
                  color: "oklch(0.13 0.012 240)",
                }}
              >
                {addAppt.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  "Add Appointment"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <Tabs defaultValue="today">
        <TabsList
          className="mb-5"
          style={{ background: "oklch(0.20 0.010 240)" }}
        >
          <TabsTrigger value="today" data-ocid="appointments.today.tab">
            By Date
          </TabsTrigger>
          <TabsTrigger value="all" data-ocid="appointments.all.tab">
            All Appointments
          </TabsTrigger>
        </TabsList>

        {/* By date */}
        <TabsContent value="today">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Date navigation */}
            <div
              className="flex items-center gap-3 mb-4 p-3 rounded-lg border"
              style={{
                background: "oklch(0.20 0.010 240)",
                borderColor: "oklch(0.28 0.012 240)",
              }}
            >
              <button
                type="button"
                data-ocid="appointments.date.pagination_prev"
                onClick={prevDay}
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{
                  background: "oklch(0.26 0.012 240)",
                  color: "oklch(0.70 0.010 240)",
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                data-ocid="appointments.date.input"
                className="flex-1 text-center"
                style={{
                  background: "oklch(0.22 0.012 240)",
                  borderColor: "oklch(0.30 0.012 240)",
                  color: "oklch(0.93 0.008 240)",
                }}
              />
              <button
                type="button"
                data-ocid="appointments.date.pagination_next"
                onClick={nextDay}
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{
                  background: "oklch(0.26 0.012 240)",
                  color: "oklch(0.70 0.010 240)",
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div
              className="mb-2 text-xs"
              style={{ color: "oklch(0.55 0.010 240)" }}
            >
              {formatDate(selectedDate)} — {dateAppts?.length ?? 0}{" "}
              appointment(s)
            </div>

            {loadingDate ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : !dateAppts?.length ? (
              <div
                data-ocid="appointments.date.empty_state"
                className="py-14 text-center rounded-lg border"
                style={{
                  background: "oklch(0.20 0.010 240)",
                  borderColor: "oklch(0.28 0.012 240)",
                }}
              >
                <CalendarDays
                  className="w-10 h-10 mx-auto mb-2 opacity-20"
                  style={{ color: "oklch(0.72 0.14 193)" }}
                />
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.55 0.010 240)" }}
                >
                  No appointments on this date
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {dateAppts.map((appt, i) => (
                  <ApptCard key={appt.id} appt={appt} i={i} />
                ))}
              </div>
            )}
          </motion.div>
        </TabsContent>

        {/* All */}
        <TabsContent value="all">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {loadingAll ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : !allAppts?.length ? (
              <div
                data-ocid="appointments.all.empty_state"
                className="py-14 text-center rounded-lg border"
                style={{
                  background: "oklch(0.20 0.010 240)",
                  borderColor: "oklch(0.28 0.012 240)",
                }}
              >
                <CalendarDays
                  className="w-10 h-10 mx-auto mb-2 opacity-20"
                  style={{ color: "oklch(0.72 0.14 193)" }}
                />
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.55 0.010 240)" }}
                >
                  No appointments yet
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {[...allAppts]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((appt, i) => (
                    <ApptCard key={appt.id} appt={appt} i={i} />
                  ))}
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent
          data-ocid="appointments.delete.dialog"
          style={{
            background: "oklch(0.18 0.010 240)",
            borderColor: "oklch(0.28 0.012 240)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "oklch(0.93 0.008 240)" }}>
              Delete Appointment?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: "oklch(0.55 0.010 240)" }}>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="appointments.delete.cancel_button"
              style={{
                background: "oklch(0.24 0.012 240)",
                borderColor: "oklch(0.32 0.012 240)",
                color: "oklch(0.80 0.010 240)",
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="appointments.delete.confirm_button"
              onClick={() => deleteId && handleDelete(deleteId)}
              style={{
                background: "oklch(0.62 0.20 25)",
                color: "oklch(0.97 0 0)",
              }}
            >
              {deleteAppt.isPending ? (
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
