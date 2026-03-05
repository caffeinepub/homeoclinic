import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CalendarPlus,
  ClipboardList,
  Clock,
  FileText,
  Stethoscope,
  StickyNote,
  UserPlus,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import {
  useAllMemos,
  useAllPatients,
  useAppointmentsByDate,
} from "../hooks/useQueries";
import {
  currentYear,
  formatDate,
  getGreeting,
  todayISO,
} from "../utils/helpers";

function StatCard({
  icon: Icon,
  label,
  value,
  loading,
  colorClass,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  loading: boolean;
  colorClass: string;
}) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: "oklch(var(--card))",
        borderColor: "oklch(var(--border))",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center ${colorClass}`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        {loading ? (
          <Skeleton className="h-7 w-12 mb-1" />
        ) : (
          <div
            className="text-2xl font-display font-bold tracking-tight"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {value}
          </div>
        )}
        <div
          className="text-xs mt-0.5"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const today = todayISO();
  const year = currentYear();
  const { data: patients, isLoading: loadingPt } = useAllPatients();
  const { data: todayAppts, isLoading: loadingAppt } =
    useAppointmentsByDate(today);
  const { data: memos, isLoading: loadingMemos } = useAllMemos();

  const thisYearPatients =
    patients?.filter((p) => Number(p.registrationYear) === year).length ?? 0;

  const greeting = getGreeting();

  const stats = [
    {
      icon: Users,
      label: "Total Patients",
      value: patients?.length ?? 0,
      loading: loadingPt,
      colorClass: "bg-[oklch(var(--teal)/0.10)] text-[oklch(var(--teal))]",
    },
    {
      icon: CalendarDays,
      label: "Today's Appointments",
      value: todayAppts?.length ?? 0,
      loading: loadingAppt,
      colorClass: "bg-[oklch(0.45_0.15_150/0.10)] text-[oklch(0.45_0.15_150)]",
    },
    {
      icon: FileText,
      label: `Cases in ${year}`,
      value: thisYearPatients,
      loading: loadingPt,
      colorClass: "bg-[oklch(0.50_0.14_90/0.10)] text-[oklch(0.50_0.14_90)]",
    },
    {
      icon: StickyNote,
      label: "Memos",
      value: memos?.length ?? 0,
      loading: loadingMemos,
      colorClass: "bg-[oklch(0.45_0.15_260/0.10)] text-[oklch(0.45_0.15_260)]",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-1">
          <Stethoscope
            className="w-4 h-4"
            style={{ color: "oklch(var(--teal))" }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(var(--teal))" }}
          >
            HomeoClinic
          </span>
        </div>
        <h1
          className="text-2xl font-display font-bold tracking-tight"
          style={{ color: "oklch(var(--foreground))" }}
        >
          {greeting}, Doctor
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
      >
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Today's appointments */}
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
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: "oklch(var(--border))" }}
          >
            <div className="flex items-center gap-2">
              <CalendarDays
                className="w-4 h-4"
                style={{ color: "oklch(var(--teal))" }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Today's Appointments
              </span>
            </div>
            <Link to="/appointments">
              <span className="text-xs" style={{ color: "oklch(var(--teal))" }}>
                View all →
              </span>
            </Link>
          </div>
          <div className="p-4">
            {loadingAppt ? (
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : !todayAppts?.length ? (
              <div
                data-ocid="dashboard.appointments.empty_state"
                className="py-8 text-center"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                <CalendarDays className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No appointments today</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todayAppts.map((appt, i) => (
                  <div
                    key={appt.id}
                    data-ocid={`dashboard.appointment.item.${i + 1}`}
                    className="flex items-center justify-between p-2.5 rounded-lg"
                    style={{ background: "oklch(var(--muted))" }}
                  >
                    <div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: "oklch(var(--foreground))" }}
                      >
                        {appt.patientName}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "oklch(var(--muted-foreground))" }}
                      >
                        {appt.reason}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: "oklch(var(--teal) / 0.4)",
                        color: "oklch(var(--teal))",
                      }}
                    >
                      {appt.reason}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick actions + Memos */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: "oklch(var(--border))" }}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Quick Actions
              </span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              <Link to="/patients" data-ocid="dashboard.new_patient.button">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "oklch(var(--teal) / 0.08)",
                    color: "oklch(var(--teal))",
                    border: "1px solid oklch(var(--teal) / 0.2)",
                  }}
                >
                  <UserPlus className="w-4 h-4" />
                  New Patient
                </button>
              </Link>
              <Link
                to="/appointments"
                data-ocid="dashboard.new_appointment.button"
              >
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "oklch(0.45 0.15 150 / 0.08)",
                    color: "oklch(0.45 0.15 150)",
                    border: "1px solid oklch(0.45 0.15 150 / 0.2)",
                  }}
                >
                  <CalendarPlus className="w-4 h-4" />
                  Add Appointment
                </button>
              </Link>
              <Link to="/patients" data-ocid="dashboard.case_sheets.button">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "oklch(0.50 0.14 90 / 0.08)",
                    color: "oklch(0.50 0.14 90)",
                    border: "1px solid oklch(0.50 0.14 90 / 0.2)",
                  }}
                >
                  <ClipboardList className="w-4 h-4" />
                  Case Sheets
                </button>
              </Link>
              <Link to="/remedies" data-ocid="dashboard.remedies.button">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "oklch(0.45 0.15 260 / 0.08)",
                    color: "oklch(0.45 0.15 260)",
                    border: "1px solid oklch(0.45 0.15 260 / 0.2)",
                  }}
                >
                  <Stethoscope className="w-4 h-4" />
                  Remedy Ref
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Recent memos */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "oklch(var(--border))" }}
            >
              <div className="flex items-center gap-2">
                <StickyNote
                  className="w-4 h-4"
                  style={{ color: "oklch(var(--teal))" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  Recent Memos
                </span>
              </div>
              <Link to="/memos">
                <span
                  className="text-xs"
                  style={{ color: "oklch(var(--teal))" }}
                >
                  View all →
                </span>
              </Link>
            </div>
            <div className="p-4">
              {loadingMemos ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : !memos?.length ? (
                <div
                  data-ocid="dashboard.memos.empty_state"
                  className="py-6 text-center"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  <StickyNote className="w-6 h-6 mx-auto mb-1 opacity-30" />
                  <p className="text-xs">No memos yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {memos.slice(0, 3).map((memo, i) => (
                    <div
                      key={memo.id}
                      data-ocid={`dashboard.memo.item.${i + 1}`}
                      className="p-2.5 rounded-lg"
                      style={{ background: "oklch(var(--muted))" }}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Clock
                          className="w-3 h-3"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          {new Date(Number(memo.createdAt)).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </span>
                      </div>
                      <p
                        className="text-xs line-clamp-2"
                        style={{ color: "oklch(var(--foreground))" }}
                      >
                        {memo.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

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
