import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ClipboardList,
  FileText,
  Loader2,
  Pill,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { CaseSheet as BackendCaseSheet } from "../backend.d";
import { useCase, usePatient, useUpdateCase } from "../hooks/useQueries";
import { formatDate, todayISO } from "../utils/helpers";

// ─── Local row types (NOT from backend) ──────────────────────────────────────

interface PrescriptionRow {
  date: string;
  remedy: string;
  potency: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface FollowUpRow {
  visitNo: number;
  date: string;
  feedback: string;
  symptoms: string;
  changes: string;
  observations: string;
  prescriptionGiven: string;
}

// ─── Types for serialized table sections ─────────────────────────────────────

interface ComplaintRow {
  _rowId: string;
  complaint: string;
  duration: string;
  onset: string;
  location: string;
  character: string;
  aggravation: string;
  amelioration: string;
  concomitants: string;
}

interface PersonalHistoryData {
  diet: string;
  appetite: string;
  thirst: string;
  stool: string;
  urine: string;
  sleepDuration: string;
  sleepPosition: string;
  dreams: string;
  perspLocation: string;
  perspTime: string;
  perspOdour: string;
  thermals: string;
  desires: string;
  aversions: string;
  habits: string;
  addictions: string;
}

interface ExaminationData {
  pulseRate: string;
  pulseCharacter: string;
  bloodPressure: string;
  temperature: string;
  weight: string;
  height: string;
  respiratoryRate: string;
  generalExam: string;
  cvs: string;
  rs: string;
  abdomen: string;
  cns: string;
  localExam: string;
}

// ─── Default values ───────────────────────────────────────────────────────────

let _rowCounter = 0;
const defaultComplaintRow = (): ComplaintRow => ({
  _rowId: `row-${Date.now()}-${_rowCounter++}`,
  complaint: "",
  duration: "",
  onset: "",
  location: "",
  character: "",
  aggravation: "",
  amelioration: "",
  concomitants: "",
});

const defaultPersonalHistory = (): PersonalHistoryData => ({
  diet: "",
  appetite: "",
  thirst: "",
  stool: "",
  urine: "",
  sleepDuration: "",
  sleepPosition: "",
  dreams: "",
  perspLocation: "",
  perspTime: "",
  perspOdour: "",
  thermals: "",
  desires: "",
  aversions: "",
  habits: "",
  addictions: "",
});

const defaultExamination = (): ExaminationData => ({
  pulseRate: "",
  pulseCharacter: "",
  bloodPressure: "",
  temperature: "",
  weight: "",
  height: "",
  respiratoryRate: "",
  generalExam: "",
  cvs: "",
  rs: "",
  abdomen: "",
  cns: "",
  localExam: "",
});

const EMPTY_RX_ROW: PrescriptionRow = {
  date: todayISO(),
  remedy: "",
  potency: "",
  dosage: "",
  frequency: "",
  duration: "",
  instructions: "",
};

// ─── JSON parse helpers ───────────────────────────────────────────────────────

function parseComplaintRows(raw: string): ComplaintRow[] {
  if (!raw) return [defaultComplaintRow()];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return (parsed as ComplaintRow[]).map((r) => ({
        ...r,
        _rowId: r._rowId ?? `row-${Date.now()}-${_rowCounter++}`,
      }));
    }
  } catch {
    /* old plain text — return as first row complaint */
    return [{ ...defaultComplaintRow(), complaint: raw }];
  }
  return [defaultComplaintRow()];
}

function parsePersonalHistory(raw: string): PersonalHistoryData {
  if (!raw) return defaultPersonalHistory();
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return {
        ...defaultPersonalHistory(),
        ...(parsed as Partial<PersonalHistoryData>),
      };
    }
  } catch {
    return { ...defaultPersonalHistory(), habits: raw };
  }
  return defaultPersonalHistory();
}

function parseExamination(raw: string): ExaminationData {
  if (!raw) return defaultExamination();
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return {
        ...defaultExamination(),
        ...(parsed as Partial<ExaminationData>),
      };
    }
  } catch {
    return { ...defaultExamination(), generalExam: raw };
  }
  return defaultExamination();
}

function parsePrescriptionRows(raw: string): PrescriptionRow[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as PrescriptionRow[];
  } catch {
    /* ignore */
  }
  return [];
}

function parseFollowUpRows(raw: string): FollowUpRow[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as FollowUpRow[];
  } catch {
    /* ignore */
  }
  return [];
}

// ─── Shared section styles ─────────────────────────────────────────────────

const ACCORDION_ITEM_STYLE = {
  background: "oklch(1.0 0 0)",
  borderColor: "oklch(0.88 0.010 240)",
};

const SECTION_NUM_STYLE = {
  background: "oklch(0.45 0.14 193 / 0.12)",
  color: "oklch(0.38 0.14 193)",
};

function SectionNum({ n }: { n: number | string }) {
  return (
    <span
      className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold shrink-0"
      style={SECTION_NUM_STYLE}
    >
      {n}
    </span>
  );
}

// ─── Textarea section ────────────────────────────────────────────────────────

function SectionTextarea({
  label,
  field,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  field: string;
  value: string;
  onChange: (field: string, val: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-2">
      <Label
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "oklch(0.45 0.14 193)" }}
      >
        {label}
      </Label>
      <Textarea
        data-ocid={`case.${field}.textarea`}
        rows={rows}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        className="resize-y text-sm"
        style={{
          background: "oklch(0.97 0.004 240)",
          borderColor: "oklch(0.88 0.010 240)",
          color: "oklch(0.18 0.010 240)",
        }}
      />
    </div>
  );
}

// ─── Chief Complaint Table ────────────────────────────────────────────────────

function ChiefComplaintTable({
  rows,
  onChange,
}: {
  rows: ComplaintRow[];
  onChange: (rows: ComplaintRow[]) => void;
}) {
  function updateCell(rowIdx: number, key: keyof ComplaintRow, val: string) {
    onChange(rows.map((r, i) => (i === rowIdx ? { ...r, [key]: val } : r)));
  }

  function addRow() {
    onChange([...rows, defaultComplaintRow()]);
  }

  function removeRow(i: number) {
    if (rows.length === 1) {
      onChange([defaultComplaintRow()]);
      return;
    }
    onChange(rows.filter((_, idx) => idx !== i));
  }

  const cols: { key: keyof ComplaintRow; label: string; width?: string }[] = [
    { key: "complaint", label: "Complaint", width: "160px" },
    { key: "duration", label: "Duration", width: "80px" },
    { key: "onset", label: "Onset", width: "90px" },
    { key: "location", label: "Location", width: "100px" },
    { key: "character", label: "Character", width: "100px" },
    { key: "aggravation", label: "Aggravation", width: "110px" },
    { key: "amelioration", label: "Amelioration", width: "110px" },
    { key: "concomitants", label: "Concomitants", width: "110px" },
  ];

  return (
    <div className="space-y-2">
      <div className="clinical-form-wrapper">
        <div className="clinical-section-header">
          Chief Complaint — Sarada Krishna HMCC Format
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="clinical-form-table">
            <thead>
              <tr>
                <th style={{ width: "32px" }}>#</th>
                {cols.map((c) => (
                  <th key={c.key} style={{ width: c.width }}>
                    {c.label}
                  </th>
                ))}
                <th style={{ width: "40px" }}>Del</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row._rowId} data-ocid={`case.complaint.row.${ri + 1}`}>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      color: "#1e3a5f",
                    }}
                  >
                    {ri + 1}
                  </td>
                  {cols.map((c) => (
                    <td key={c.key}>
                      <textarea
                        rows={2}
                        value={row[c.key]}
                        onChange={(e) => updateCell(ri, c.key, e.target.value)}
                        data-ocid={`case.complaint.${c.key}.${ri + 1}`}
                        placeholder={c.label}
                        style={{ minHeight: "44px" }}
                      />
                    </td>
                  ))}
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      data-ocid={`case.complaint.delete_button.${ri + 1}`}
                      onClick={() => removeRow(ri)}
                      style={{ color: "#c0392b", padding: "2px 4px" }}
                      title="Remove row"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        data-ocid="case.complaint.add_row.button"
        onClick={addRow}
        className="gap-1.5 text-xs"
        style={{
          borderColor: "oklch(0.45 0.14 193 / 0.4)",
          color: "oklch(0.45 0.14 193)",
        }}
      >
        <Plus size={12} /> Add Complaint Row
      </Button>
    </div>
  );
}

// ─── Personal History Table ───────────────────────────────────────────────────

function PersonalHistoryTable({
  data,
  onChange,
}: {
  data: PersonalHistoryData;
  onChange: (data: PersonalHistoryData) => void;
}) {
  function update(key: keyof PersonalHistoryData, val: string) {
    onChange({ ...data, [key]: val });
  }

  const rows: { key: keyof PersonalHistoryData; label: string }[] = [
    { key: "diet", label: "Diet (Veg / Non-Veg)" },
    { key: "appetite", label: "Appetite" },
    { key: "thirst", label: "Thirst" },
    { key: "stool", label: "Stool" },
    { key: "urine", label: "Urine" },
    { key: "sleepDuration", label: "Sleep — Duration" },
    { key: "sleepPosition", label: "Sleep — Position" },
    { key: "dreams", label: "Dreams" },
    { key: "perspLocation", label: "Perspiration — Location" },
    { key: "perspTime", label: "Perspiration — Time" },
    { key: "perspOdour", label: "Perspiration — Odour" },
    { key: "thermals", label: "Thermals (Hot / Chilly / Ambithermal)" },
    { key: "desires", label: "Desires" },
    { key: "aversions", label: "Aversions" },
    { key: "habits", label: "Habits (Tobacco / Alcohol)" },
    { key: "addictions", label: "Addictions" },
  ];

  return (
    <div className="clinical-form-wrapper">
      <div className="clinical-section-header">
        Personal History — Sarada Krishna HMCC Format
      </div>
      <table className="clinical-form-table">
        <thead>
          <tr>
            <th style={{ width: "32%" }}>Parameter</th>
            <th>Findings</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.key} data-ocid={`case.personal.row.${i + 1}`}>
              <td className="label-cell">{r.label}</td>
              <td>
                <input
                  type="text"
                  value={data[r.key]}
                  onChange={(e) => update(r.key, e.target.value)}
                  data-ocid={`case.personal.${r.key}.input`}
                  placeholder={`Enter ${r.label.toLowerCase()}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Examination Table ────────────────────────────────────────────────────────

function ExaminationTable({
  data,
  onChange,
}: {
  data: ExaminationData;
  onChange: (data: ExaminationData) => void;
}) {
  function update(key: keyof ExaminationData, val: string) {
    onChange({ ...data, [key]: val });
  }

  const rows: { key: keyof ExaminationData; label: string }[] = [
    { key: "pulseRate", label: "Pulse — Rate (per min)" },
    { key: "pulseCharacter", label: "Pulse — Character" },
    { key: "bloodPressure", label: "Blood Pressure (mmHg)" },
    { key: "temperature", label: "Temperature (°F / °C)" },
    { key: "weight", label: "Weight (kg)" },
    { key: "height", label: "Height (cm / ft)" },
    { key: "respiratoryRate", label: "Respiratory Rate (per min)" },
    { key: "generalExam", label: "General Examination" },
    { key: "cvs", label: "Systemic — CVS" },
    { key: "rs", label: "Systemic — RS (Respiratory)" },
    { key: "abdomen", label: "Systemic — Abdomen" },
    { key: "cns", label: "Systemic — CNS" },
    { key: "localExam", label: "Local Examination" },
  ];

  return (
    <div className="clinical-form-wrapper">
      <div className="clinical-section-header">
        Examination Findings — Sarada Krishna HMCC Format
      </div>
      <table className="clinical-form-table">
        <thead>
          <tr>
            <th style={{ width: "35%" }}>Parameter</th>
            <th>Finding</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.key} data-ocid={`case.exam.row.${i + 1}`}>
              <td className="label-cell">{r.label}</td>
              <td>
                <input
                  type="text"
                  value={data[r.key]}
                  onChange={(e) => update(r.key, e.target.value)}
                  data-ocid={`case.exam.${r.key}.input`}
                  placeholder={`Enter ${r.label.toLowerCase()}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Prescription Table (inline) ──────────────────────────────────────────────

function PrescriptionTable({
  prescriptions,
  onUpdate,
}: {
  prescriptions: PrescriptionRow[];
  onUpdate: (list: PrescriptionRow[]) => void;
}) {
  const [newRow, setNewRow] = useState<PrescriptionRow>({ ...EMPTY_RX_ROW });

  function updateNew(key: keyof PrescriptionRow, val: string) {
    setNewRow((p) => ({ ...p, [key]: val }));
  }

  function commitNew() {
    if (!newRow.remedy.trim()) {
      toast.error("Remedy name is required");
      return;
    }
    onUpdate([...prescriptions, { ...newRow }]);
    setNewRow({ ...EMPTY_RX_ROW });
    toast.success("Prescription added");
  }

  function deleteRow(i: number) {
    onUpdate(prescriptions.filter((_, idx) => idx !== i));
  }

  const cols = [
    "Date",
    "Remedy",
    "Potency",
    "Dosage",
    "Frequency",
    "Duration",
    "Instructions",
  ];

  return (
    <div className="clinical-form-wrapper">
      <div className="clinical-section-header">Prescription Record</div>
      <div style={{ overflowX: "auto" }}>
        <table className="clinical-form-table">
          <thead>
            <tr>
              <th style={{ width: "30px" }}>#</th>
              {cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
              <th style={{ width: "40px" }}>Del</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length === 0 ? (
              <tr data-ocid="case.prescriptions.empty_state">
                <td
                  colSpan={cols.length + 2}
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    color: "#6b7280",
                    fontStyle: "italic",
                  }}
                >
                  No prescriptions yet — fill in the row below and click Add
                </td>
              </tr>
            ) : (
              prescriptions.map((rx, i) => (
                <tr
                  key={`${rx.date}-${rx.remedy}-${i}`}
                  data-ocid={`case.prescription.item.${i + 1}`}
                >
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      color: "#1e3a5f",
                    }}
                  >
                    {i + 1}
                  </td>
                  <td>{rx.date ? formatDate(rx.date) : ""}</td>
                  <td style={{ fontWeight: 600, color: "#1e3a5f" }}>
                    {rx.remedy}
                  </td>
                  <td>
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: "#1e3a5f",
                        color: "#1e3a5f",
                        fontSize: "0.72rem",
                      }}
                    >
                      {rx.potency}
                    </Badge>
                  </td>
                  <td>{rx.dosage}</td>
                  <td>{rx.frequency}</td>
                  <td>{rx.duration}</td>
                  <td style={{ maxWidth: "140px", wordBreak: "break-word" }}>
                    {rx.instructions}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      data-ocid={`case.prescription.delete_button.${i + 1}`}
                      onClick={() => deleteRow(i)}
                      style={{ color: "#c0392b", padding: "2px 4px" }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))
            )}
            {/* New row */}
            <tr style={{ background: "#f0f5fb" }}>
              <td
                style={{
                  textAlign: "center",
                  color: "#9ca3af",
                  fontSize: "0.72rem",
                }}
              >
                +
              </td>
              <td>
                <input
                  type="date"
                  value={newRow.date}
                  onChange={(e) => updateNew("date", e.target.value)}
                  data-ocid="case.prescription.new.date.input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newRow.remedy}
                  onChange={(e) => updateNew("remedy", e.target.value)}
                  placeholder="Remedy *"
                  data-ocid="case.prescription.new.remedy.input"
                  style={{ fontWeight: 600 }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newRow.potency}
                  onChange={(e) => updateNew("potency", e.target.value)}
                  placeholder="e.g. 30C"
                  data-ocid="case.prescription.new.potency.input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newRow.dosage}
                  onChange={(e) => updateNew("dosage", e.target.value)}
                  placeholder="4 pills"
                  data-ocid="case.prescription.new.dosage.input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newRow.frequency}
                  onChange={(e) => updateNew("frequency", e.target.value)}
                  placeholder="TDS / OD"
                  data-ocid="case.prescription.new.frequency.input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newRow.duration}
                  onChange={(e) => updateNew("duration", e.target.value)}
                  placeholder="7 days"
                  data-ocid="case.prescription.new.duration.input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newRow.instructions}
                  onChange={(e) => updateNew("instructions", e.target.value)}
                  placeholder="Instructions"
                  data-ocid="case.prescription.new.instructions.input"
                />
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  type="button"
                  data-ocid="case.prescription.add_row.button"
                  onClick={commitNew}
                  title="Add prescription"
                  style={{
                    background: "#1e3a5f",
                    color: "#fff",
                    borderRadius: "3px",
                    padding: "3px 7px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Follow-up Table (inline) ─────────────────────────────────────────────────

function FollowUpTable({
  followUps,
  onUpdate,
}: {
  followUps: FollowUpRow[];
  onUpdate: (list: FollowUpRow[]) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [newFu, setNewFu] = useState<Omit<FollowUpRow, "visitNo">>({
    date: todayISO(),
    feedback: "",
    symptoms: "",
    changes: "",
    observations: "",
    prescriptionGiven: "",
  });

  function updateFu(key: string, val: string) {
    setNewFu((p) => ({ ...p, [key]: val }));
  }

  function commitFu() {
    if (!newFu.date) {
      toast.error("Date is required");
      return;
    }
    const visit: FollowUpRow = {
      ...newFu,
      visitNo: followUps.length + 1,
    };
    onUpdate([...followUps, visit]);
    setNewFu({
      date: todayISO(),
      feedback: "",
      symptoms: "",
      changes: "",
      observations: "",
      prescriptionGiven: "",
    });
    setShowForm(false);
    toast.success("Follow-up added");
  }

  function deleteFu(i: number) {
    const updated = followUps
      .filter((_, idx) => idx !== i)
      .map((fu, idx) => ({ ...fu, visitNo: idx + 1 }));
    onUpdate(updated);
  }

  return (
    <div className="space-y-3">
      <div className="clinical-form-wrapper">
        <div className="clinical-section-header">Follow-up Record</div>
        <div style={{ overflowX: "auto" }}>
          <table className="clinical-form-table">
            <thead>
              <tr>
                <th style={{ width: "52px" }}>Visit No.</th>
                <th style={{ width: "88px" }}>Date</th>
                <th style={{ width: "130px" }}>Patient Feedback</th>
                <th style={{ width: "130px" }}>Current Symptoms</th>
                <th style={{ width: "120px" }}>Changes in Generals</th>
                <th style={{ width: "130px" }}>Physician Observations</th>
                <th style={{ width: "130px" }}>
                  Prescription (Remedy / Potency)
                </th>
                <th style={{ width: "40px" }}>Del</th>
              </tr>
            </thead>
            <tbody>
              {followUps.length === 0 ? (
                <tr data-ocid="case.followups.empty_state">
                  <td
                    colSpan={8}
                    style={{
                      textAlign: "center",
                      padding: "16px",
                      color: "#6b7280",
                      fontStyle: "italic",
                    }}
                  >
                    No follow-ups yet — use the Add Follow-up button below
                  </td>
                </tr>
              ) : (
                followUps.map((fu, i) => (
                  <tr
                    key={`${fu.date}-${fu.visitNo}-${i}`}
                    data-ocid={`case.followup.item.${i + 1}`}
                  >
                    <td
                      style={{
                        textAlign: "center",
                        fontWeight: 700,
                        color: "#1e3a5f",
                      }}
                    >
                      {fu.visitNo}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {formatDate(fu.date)}
                    </td>
                    <td style={{ maxWidth: "130px", wordBreak: "break-word" }}>
                      {fu.feedback}
                    </td>
                    <td style={{ maxWidth: "130px", wordBreak: "break-word" }}>
                      {fu.symptoms}
                    </td>
                    <td style={{ maxWidth: "120px", wordBreak: "break-word" }}>
                      {fu.changes}
                    </td>
                    <td style={{ maxWidth: "130px", wordBreak: "break-word" }}>
                      {fu.observations}
                    </td>
                    <td>
                      {fu.prescriptionGiven ? (
                        <span style={{ color: "#1e3a5f", fontWeight: 600 }}>
                          {fu.prescriptionGiven}
                        </span>
                      ) : (
                        <span style={{ color: "#9ca3af", fontStyle: "italic" }}>
                          —
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        data-ocid={`case.followup.delete_button.${i + 1}`}
                        onClick={() => deleteFu(i)}
                        style={{ color: "#c0392b", padding: "2px 4px" }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline Add Follow-up Form */}
      {!showForm ? (
        <Button
          size="sm"
          type="button"
          data-ocid="case.add_followup.button"
          variant="outline"
          onClick={() => setShowForm(true)}
          className="gap-1.5 text-xs"
          style={{
            borderColor: "oklch(0.72 0.14 193 / 0.4)",
            color: "oklch(0.72 0.14 193)",
          }}
        >
          <Plus size={12} /> Add Follow-up Visit
        </Button>
      ) : (
        <div
          className="rounded-lg border p-4 space-y-3"
          data-ocid="case.followup.form.panel"
          style={{
            background: "oklch(0.97 0.004 240)",
            borderColor: "oklch(0.88 0.010 240)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.45 0.14 193)" }}
          >
            New Follow-up — Visit {followUps.length + 1}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                className="text-xs"
                style={{ color: "oklch(0.40 0.010 240)" }}
              >
                Date *
              </Label>
              <Input
                type="date"
                value={newFu.date}
                onChange={(e) => updateFu("date", e.target.value)}
                data-ocid="case.followup.date.input"
                style={{
                  background: "oklch(1.0 0 0)",
                  borderColor: "oklch(0.88 0.010 240)",
                  color: "oklch(0.15 0.010 240)",
                }}
              />
            </div>
          </div>

          {[
            {
              key: "feedback",
              label: "Patient Feedback",
              ph: "How the patient feels, improvement/deterioration...",
            },
            {
              key: "symptoms",
              label: "Current Symptoms",
              ph: "Symptoms at this visit...",
            },
            {
              key: "changes",
              label: "Changes in Generals",
              ph: "Changes in appetite, sleep, energy, thermals...",
            },
            {
              key: "observations",
              label: "Physician Observations",
              ph: "Clinical analysis, remedy response...",
            },
            {
              key: "prescriptionGiven",
              label: "Prescription Given",
              ph: "e.g. Sulphur 30C TDS × 7 days",
            },
          ].map(({ key, label, ph }) => (
            <div key={key} className="space-y-1.5">
              <Label
                className="text-xs"
                style={{ color: "oklch(0.40 0.010 240)" }}
              >
                {label}
              </Label>
              <Textarea
                rows={2}
                value={(newFu as Record<string, string>)[key] ?? ""}
                onChange={(e) => updateFu(key, e.target.value)}
                data-ocid={`case.followup.${key}.textarea`}
                placeholder={ph}
                className="text-sm"
                style={{
                  background: "oklch(1.0 0 0)",
                  borderColor: "oklch(0.88 0.010 240)",
                  color: "oklch(0.18 0.010 240)",
                }}
              />
            </div>
          ))}

          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              type="button"
              data-ocid="case.followup.submit_button"
              onClick={commitFu}
              style={{
                background: "oklch(0.45 0.14 193)",
                color: "oklch(0.99 0 0)",
              }}
            >
              <Plus size={13} className="mr-1" /> Add Follow-up
            </Button>
            <Button
              size="sm"
              type="button"
              variant="outline"
              data-ocid="case.followup.cancel_button"
              onClick={() => {
                setShowForm(false);
                setNewFu({
                  date: todayISO(),
                  feedback: "",
                  symptoms: "",
                  changes: "",
                  observations: "",
                  prescriptionGiven: "",
                });
              }}
              style={{
                borderColor: "oklch(0.88 0.010 240)",
                color: "oklch(0.40 0.010 240)",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main CaseSheet Component ─────────────────────────────────────────────────

export function CaseSheet() {
  const { id } = useParams({ from: "/cases/$id" });
  const { data: caseData, isLoading } = useCase(id);
  const { data: patient } = usePatient(caseData?.patientId ?? "");
  const updateCase = useUpdateCase();

  // Simple text fields (hpi, pastHistory, familyHistory, mentalGenerals, physicalGenerals, investigations, miasmaticAnalysis, totality, repertorialFindings)
  const [hpi, setHpi] = useState("");
  const [pastHistory, setPastHistory] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [mentalGenerals, setMentalGenerals] = useState("");
  const [physicalGenerals, setPhysicalGenerals] = useState("");
  const [investigations, setInvestigations] = useState("");
  const [miasmaticAnalysis, setMiasmaticAnalysis] = useState("");
  const [totality, setTotality] = useState("");
  const [repertorialFindings, setRepertorialFindings] = useState("");

  // Table-based sections (parsed from JSON strings)
  const [complaintRows, setComplaintRows] = useState<ComplaintRow[]>([
    defaultComplaintRow(),
  ]);
  const [personalHistory, setPersonalHistory] = useState<PersonalHistoryData>(
    defaultPersonalHistory(),
  );
  const [examination, setExamination] = useState<ExaminationData>(
    defaultExamination(),
  );
  const [prescriptionRows, setPrescriptionRows] = useState<PrescriptionRow[]>(
    [],
  );
  const [followUpRows, setFollowUpRows] = useState<FollowUpRow[]>([]);

  useEffect(() => {
    if (caseData) {
      setHpi(caseData.hpi ?? "");
      setPastHistory(caseData.pastHistory ?? "");
      setFamilyHistory(caseData.familyHistory ?? "");
      setMentalGenerals(caseData.mentalGenerals ?? "");
      setPhysicalGenerals(caseData.physicalGenerals ?? "");
      setInvestigations(caseData.investigations ?? "");
      setMiasmaticAnalysis(caseData.miasmaticAnalysis ?? "");
      setTotality(caseData.totality ?? "");
      setRepertorialFindings(caseData.repertorialFindings ?? "");
      setComplaintRows(parseComplaintRows(caseData.chiefComplaint));
      setPersonalHistory(parsePersonalHistory(caseData.personalHistory));
      setExamination(parseExamination(caseData.examinationFindings));
      // Prescriptions and follow-ups are stored in separate backend records
      // but for the case sheet display we keep them in local state seeded from
      // the chiefComplaint field isn't used here — they come from separate calls
      // For now we reset them; saving will serialize them back
      setPrescriptionRows(parsePrescriptionRows(""));
      setFollowUpRows(parseFollowUpRows(""));
    }
  }, [caseData]);

  async function handleSave() {
    if (!caseData) return;
    try {
      const payload: BackendCaseSheet = {
        ...caseData,
        hpi,
        pastHistory,
        familyHistory,
        mentalGenerals,
        physicalGenerals,
        investigations,
        miasmaticAnalysis,
        totality,
        repertorialFindings,
        chiefComplaint: JSON.stringify(complaintRows),
        personalHistory: JSON.stringify(personalHistory),
        examinationFindings: JSON.stringify(examination),
        updatedAt: BigInt(Date.now()),
      };
      await updateCase.mutateAsync({ id: caseData.id, caseData: payload });
      toast.success("Case sheet saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save case sheet. Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-64 w-full rounded-lg mb-3" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="p-6 text-center">
        <p style={{ color: "oklch(0.55 0.010 240)" }}>Case not found</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        {patient && (
          <Link
            to="/patients/$id"
            params={{ id: patient.id }}
            data-ocid="case.back.link"
            className="flex items-center gap-1.5 text-xs mb-4 hover:underline"
            style={{ color: "oklch(0.55 0.010 240)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to {patient.name}
          </Link>
        )}

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <ClipboardList
                className="w-4 h-4"
                style={{ color: "oklch(0.45 0.14 193)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "oklch(0.45 0.14 193)" }}
              >
                Case Sheet
              </span>
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: "oklch(0.45 0.14 193 / 0.4)",
                  color: "oklch(0.38 0.14 193)",
                }}
              >
                {caseData.year?.toString()}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: "oklch(0.45 0.14 193 / 0.3)",
                  color: "oklch(0.42 0.10 193)",
                }}
              >
                Sarada Krishna HMCC Format
              </Badge>
            </div>
            <h1
              className="text-xl font-display font-bold"
              style={{ color: "oklch(0.15 0.010 240)" }}
            >
              {patient ? patient.name : "Case Sheet"}
            </h1>
            {patient && (
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.55 0.010 240)" }}
              >
                Age: {patient.age?.toString()} · {patient.sex} ·{" "}
                {patient.occupation}
              </p>
            )}
          </div>
          <Button
            data-ocid="case.save.primary_button"
            onClick={handleSave}
            disabled={updateCase.isPending}
            className="gap-1.5 h-9"
            style={{
              background: "oklch(0.45 0.14 193)",
              color: "oklch(0.99 0 0)",
            }}
          >
            {updateCase.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {updateCase.isPending ? "Saving..." : "Save Case Sheet"}
          </Button>
        </div>
      </motion.div>

      {/* Case sections */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Accordion
          type="multiple"
          defaultValue={[
            "chief",
            "history",
            "pastHistory",
            "familyHistory",
            "personalHistory",
            "mentalGenerals",
            "physicalGenerals",
            "examination",
            "investigations",
            "miasmatic",
            "totality",
            "repertory",
            "prescriptions",
            "followups",
          ]}
          className="space-y-2"
        >
          {/* 1. Chief Complaint — TABLE */}
          <AccordionItem
            value="chief"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={1} />
                Chief Complaint
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ChiefComplaintTable
                rows={complaintRows}
                onChange={setComplaintRows}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 2. History of Present Illness */}
          <AccordionItem
            value="history"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={2} />
                History of Present Illness
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="History of Present Illness"
                field="hpi"
                value={hpi}
                onChange={(_, val) => setHpi(val)}
                rows={5}
                placeholder={`Mode of onset (acute/gradual/sudden):
Duration:
Progress (increasing/decreasing/stationary):
Any precipitating factors or causation:
Previous treatment taken:
Response to treatment:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 3. Past History */}
          <AccordionItem
            value="pastHistory"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={3} />
                Past History
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Past History"
                field="pastHistory"
                value={pastHistory}
                onChange={(_, val) => setPastHistory(val)}
                rows={5}
                placeholder={`Previous diseases (childhood/adult):
Surgeries / Accidents / Injuries:
Major illnesses:
Medications taken (allopathic/homoeopathic):
Vaccination history:
Suppressed diseases (skin eruptions, discharges):`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 4. Family History */}
          <AccordionItem
            value="familyHistory"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={4} />
                Family History
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Family History"
                field="familyHistory"
                value={familyHistory}
                onChange={(_, val) => setFamilyHistory(val)}
                rows={5}
                placeholder={`Father:
Mother:
Siblings:
Spouse / Children:
Hereditary diseases (Tuberculosis, Diabetes, Cancer, Asthma, Hypertension):
Miasmatic predispositions in family:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 5. Personal History — TABLE */}
          <AccordionItem
            value="personalHistory"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={5} />
                Personal History
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <PersonalHistoryTable
                data={personalHistory}
                onChange={setPersonalHistory}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 6. Mental Generals */}
          <AccordionItem
            value="mentalGenerals"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={6} />
                Mental Generals
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Mental Generals"
                field="mentalGenerals"
                value={mentalGenerals}
                onChange={(_, val) => setMentalGenerals(val)}
                rows={7}
                placeholder={`Temperament (sanguine/choleric/melancholic/phlegmatic):
Emotional state (anxiety, grief, anger, fears/phobias):
Ailments from (grief, anger, fright, disappointment):
Memory & Concentration:
Will (strong/weak, obstinacy, yielding):
Intellectual activity (active/dull/slow):
Relationship with others (social/reserved/irritable):
Sleep — position, disturbing factors, talking in sleep:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 7. Physical Generals */}
          <AccordionItem
            value="physicalGenerals"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={7} />
                Physical Generals
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Physical Generals"
                field="physicalGenerals"
                value={physicalGenerals}
                onChange={(_, val) => setPhysicalGenerals(val)}
                rows={5}
                placeholder={`Build (lean/stout/medium):
Complexion:
Constitution (Hahnemann's — Carbonitrogenous/Phosphoric/Sulphuric/Fluoric):
General aggravations/ameliorations:
Side affinity (right/left/cross):
Periodicity:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 8. Examination — TABLE */}
          <AccordionItem
            value="examination"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={8} />
                Examination Findings
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ExaminationTable data={examination} onChange={setExamination} />
            </AccordionContent>
          </AccordionItem>

          {/* 9. Investigations */}
          <AccordionItem
            value="investigations"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={9} />
                Investigations
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Investigations"
                field="investigations"
                value={investigations}
                onChange={(_, val) => setInvestigations(val)}
                rows={4}
                placeholder={`CBC / Blood routine:
Urine analysis:
X-Ray / Ultrasound / MRI / CT Scan:
Other special investigations:
Date of investigation:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 10. Miasmatic Analysis */}
          <AccordionItem
            value="miasmatic"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={10} />
                Miasmatic Analysis
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Miasmatic Analysis"
                field="miasmaticAnalysis"
                value={miasmaticAnalysis}
                onChange={(_, val) => setMiasmaticAnalysis(val)}
                rows={6}
                placeholder={`Psora (symptoms of deficiency, hypo-function, under-action):
Sycosis (symptoms of excess, hyper-function, over-production):
Syphilis (symptoms of destruction, disfigurement, dissolution):
Active miasm in this case:
Background miasm:
Intercurrent nosode considered:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 11. Totality of Symptoms */}
          <AccordionItem
            value="totality"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={11} />
                Totality of Symptoms
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Totality of Symptoms"
                field="totality"
                value={totality}
                onChange={(_, val) => setTotality(val)}
                rows={7}
                placeholder={`Characteristic (PQRS) symptoms:
1.
2.
3.
Generals (mind, thermals, desires, aversions, sleep, perspiration):
Particulars (location, sensation, modalities, concomitants):
Mentals:
Keynote symptoms:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 12. Repertorial Findings */}
          <AccordionItem
            value="repertory"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={12} />
                Repertorial Findings
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Repertorial Findings"
                field="repertorialFindings"
                value={repertorialFindings}
                onChange={(_, val) => setRepertorialFindings(val)}
                rows={7}
                placeholder={`Repertory used (Kent / Boger / Murphy / Synthesis):
Rubrics selected:
  1.
  2.
  3.
Top remedies from repertory analysis:
Final remedy selection rationale (Boericke / Synoptic Key / Materia Medica correlation):
Simillimum:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 13. Prescriptions — TABLE */}
          <AccordionItem
            value="prescriptions"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={13} />
                Prescriptions ({prescriptionRows.length})
                <Pill
                  className="w-3.5 h-3.5 ml-1"
                  style={{ color: "oklch(0.45 0.14 193)" }}
                />
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <PrescriptionTable
                prescriptions={prescriptionRows}
                onUpdate={setPrescriptionRows}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 14. Follow-ups — TABLE */}
          <AccordionItem
            value="followups"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.18 0.010 240)" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={14} />
                Follow-ups ({followUpRows.length})
                <FileText
                  className="w-3.5 h-3.5 ml-1"
                  style={{ color: "oklch(0.45 0.14 193)" }}
                />
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <FollowUpTable
                followUps={followUpRows}
                onUpdate={setFollowUpRows}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Bottom Save Button */}
      <div className="mt-6 flex justify-end">
        <Button
          data-ocid="case.save_bottom.primary_button"
          onClick={handleSave}
          disabled={updateCase.isPending}
          className="gap-1.5"
          style={{
            background: "oklch(0.45 0.14 193)",
            color: "oklch(0.99 0 0)",
          }}
        >
          {updateCase.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {updateCase.isPending ? "Saving..." : "Save Case Sheet"}
        </Button>
      </div>
    </div>
  );
}
