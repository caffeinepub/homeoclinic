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
} from "../hooks/useQueries";
import { formatDate, generateId, todayISO } from "../utils/helpers";

const EMPTY_APPT = {
  patientSearch: "",
  patientName: "",
  date: todayISO(),
  time: "",
  reason: "New",
  status: "Scheduled",
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

  async function handleAdd() {
    if (!form.patientName || !form.date) {
      toast.error("Patient name and date are required");
      return;
    }
    const appt: Appointment = {
      id: generateId(),
      patientName: form.patientName,
      date: form.date,
      time: form.time,
      reason: form.reason,
      status: form.status,
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
        className="flex items-center gap-3 px-4 py-3 rounded-xl border group"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{
            background: "oklch(var(--teal) / 0.10)",
            color: "oklch(var(--teal))",
          }}
        >
          {appt.patientName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="text-sm font-medium truncate"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {appt.patientName}
          </div>
          <div
            className="text-xs"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            {formatDate(appt.date)}
            {appt.time && ` · ${appt.time}`}
            {appt.reason && ` · ${appt.reason}`}
          </div>
        </div>
        <Badge
          variant="outline"
          className="text-xs hidden sm:inline-flex"
          style={{
            borderColor:
              appt.reason === "Follow-up"
                ? "oklch(0.45 0.15 150 / 0.4)"
                : "oklch(var(--teal) / 0.4)",
            color:
              appt.reason === "Follow-up"
                ? "oklch(0.45 0.15 150)"
                : "oklch(var(--teal))",
          }}
        >
          {appt.reason}
        </Badge>
        <button
          type="button"
          data-ocid={`appointments.delete_button.${i + 1}`}
          onClick={() => setDeleteId(appt.id)}
          className="w-7 h-7 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          style={{
            color: "oklch(var(--destructive))",
            background: "oklch(var(--destructive) / 0.08)",
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
              style={{ color: "oklch(var(--teal))" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(var(--teal))" }}
            >
              Schedule
            </span>
          </div>
          <h1
            className="text-2xl font-display font-bold tracking-tight"
            style={{ color: "oklch(var(--foreground))" }}
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
                background: "oklch(var(--teal))",
                color: "oklch(0.99 0 0)",
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
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            <DialogHeader>
              <DialogTitle
                className="font-display"
                style={{ color: "oklch(var(--foreground))" }}
              >
                New Appointment
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              {/* Patient search */}
              <div className="space-y-2">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Patient Name *
                </Label>
                <div className="relative">
                  <Search
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  />
                  <Input
                    data-ocid="appointments.add.search.search_input"
                    placeholder="Search patient by name…"
                    value={form.patientSearch}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        patientSearch: e.target.value,
                        patientName: e.target.value,
                      }))
                    }
                    className="pl-8"
                    style={{
                      background: "oklch(var(--muted))",
                      borderColor: "oklch(var(--border))",
                      color: "oklch(var(--foreground))",
                    }}
                  />
                </div>
                {form.patientSearch && filteredPatients.length > 0 && (
                  <div
                    className="rounded-lg border max-h-36 overflow-y-auto"
                    style={{
                      background: "oklch(var(--popover))",
                      borderColor: "oklch(var(--border))",
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
                            patientName: p.name,
                            patientSearch: p.name,
                          }))
                        }
                        className="w-full text-left px-3 py-2 text-sm transition-colors"
                        style={{
                          color: "oklch(var(--foreground))",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "oklch(var(--muted))";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "transparent";
                        }}
                      >
                        {p.name} — {p.age?.toString()} yrs
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
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
                  value={form.time}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, time: e.target.value }))
                  }
                  data-ocid="appointments.add.time.input"
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
                  Visit Type / Reason
                </Label>
                <Select
                  value={form.reason}
                  onValueChange={(v) => setForm((p) => ({ ...p, reason: v }))}
                >
                  <SelectTrigger
                    data-ocid="appointments.add.type.select"
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
                      background: "oklch(var(--popover))",
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
                data-ocid="appointments.add.cancel_button"
                onClick={() => setAddOpen(false)}
                style={{
                  borderColor: "oklch(var(--border))",
                  color: "oklch(var(--muted-foreground))",
                }}
              >
                Cancel
              </Button>
              <Button
                data-ocid="appointments.add.submit_button"
                onClick={handleAdd}
                disabled={addAppt.isPending}
                style={{
                  background: "oklch(var(--teal))",
                  color: "oklch(0.99 0 0)",
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
          style={{ background: "oklch(var(--muted))" }}
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
              className="flex items-center gap-3 mb-4 p-3 rounded-xl border"
              style={{
                background: "oklch(var(--card))",
                borderColor: "oklch(var(--border))",
              }}
            >
              <button
                type="button"
                data-ocid="appointments.date.pagination_prev"
                onClick={prevDay}
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{
                  background: "oklch(var(--muted))",
                  color: "oklch(var(--muted-foreground))",
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
                  background: "oklch(var(--muted))",
                  borderColor: "oklch(var(--border))",
                  color: "oklch(var(--foreground))",
                }}
              />
              <button
                type="button"
                data-ocid="appointments.date.pagination_next"
                onClick={nextDay}
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{
                  background: "oklch(var(--muted))",
                  color: "oklch(var(--muted-foreground))",
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div
              className="mb-2 text-xs"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              {formatDate(selectedDate)} — {dateAppts?.length ?? 0}{" "}
              appointment(s)
            </div>

            {loadingDate ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-xl" />
                ))}
              </div>
            ) : !dateAppts?.length ? (
              <div
                data-ocid="appointments.date.empty_state"
                className="py-14 text-center rounded-xl border"
                style={{
                  background: "oklch(var(--card))",
                  borderColor: "oklch(var(--border))",
                }}
              >
                <CalendarDays
                  className="w-10 h-10 mx-auto mb-2 opacity-20"
                  style={{ color: "oklch(var(--teal))" }}
                />
                <p
                  className="text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
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
                  <Skeleton key={i} className="h-14 rounded-xl" />
                ))}
              </div>
            ) : !allAppts?.length ? (
              <div
                data-ocid="appointments.all.empty_state"
                className="py-14 text-center rounded-xl border"
                style={{
                  background: "oklch(var(--card))",
                  borderColor: "oklch(var(--border))",
                }}
              >
                <CalendarDays
                  className="w-10 h-10 mx-auto mb-2 opacity-20"
                  style={{ color: "oklch(var(--teal))" }}
                />
                <p
                  className="text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
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
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "oklch(var(--foreground))" }}>
              Delete Appointment?
            </AlertDialogTitle>
            <AlertDialogDescription
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="appointments.delete.cancel_button"
              style={{
                background: "oklch(var(--muted))",
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--foreground))",
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="appointments.delete.confirm_button"
              onClick={() => deleteId && handleDelete(deleteId)}
              style={{
                background: "oklch(var(--destructive))",
                color: "oklch(0.99 0 0)",
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
