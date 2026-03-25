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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Brain,
  CheckCircle,
  ClipboardList,
  Columns2,
  FileText,
  FlaskConical,
  Info,
  Loader2,
  Pill,
  Plus,
  Save,
  Stethoscope,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { CaseSheet as BackendCaseSheet } from "../backend.d";
import { useAccessControl } from "../context/AccessControlContext";
import type { RemedyData } from "../data/remedyDatabase";
import { SEED_REMEDIES } from "../data/remedySeeds";
import {
  useCase,
  useCasesByPatient,
  useCreateFollowUp,
  useCreatePrescription,
  useFollowUpsByCaseSheet,
  usePatient,
  usePrescriptionsByCaseSheet,
  useUpdateCase,
  useUpdateFollowUp,
  useUpdatePrescription,
} from "../hooks/useQueries";
import type { RemedySuggestion } from "../utils/caseAnalysis";
import { analyseCase } from "../utils/caseAnalysis";
import { formatDate, generateId, todayISO } from "../utils/helpers";
import type { InvestigationSuggestion } from "../utils/investigationSuggestions";
import { suggestInvestigations } from "../utils/investigationSuggestions";
import { RemedyComparePanel } from "./RemedyCompare";

// ─── Remedy lookup utility ────────────────────────────────────────────────────

function findRemedy(name: string): RemedyData | null {
  if (!name.trim()) return null;
  const q = name.trim().toLowerCase();
  return (
    SEED_REMEDIES.find(
      (r) => r.name.toLowerCase() === q || r.abbreviation.toLowerCase() === q,
    ) ??
    SEED_REMEDIES.find(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.abbreviation.toLowerCase().includes(q),
    ) ??
    null
  );
}

function getRemedySuggestions(query: string): RemedyData[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  return SEED_REMEDIES.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.abbreviation.toLowerCase().includes(q),
  ).slice(0, 5);
}

// ─── Remedy Popup (compact reference card) ───────────────────────────────────

const RELATION_LABELS_RX: {
  key: keyof RemedyData["relationships"];
  label: string;
  color: string;
}[] = [
  { key: "complementary", label: "Complementary", color: "0.45 0.15 150" },
  { key: "followsWell", label: "Follows Well", color: "0.45 0.14 193" },
  { key: "followedBy", label: "Followed By", color: "0.45 0.15 260" },
  { key: "antidotes", label: "Antidotes", color: "0.55 0.22 25" },
  { key: "inimical", label: "Inimical", color: "0.50 0.18 45" },
];

function getMiasmColorRx(miasm: string): string {
  const m = miasm.toLowerCase();
  if (m.includes("psoric")) return "0.45 0.14 193";
  if (m.includes("sycot")) return "0.45 0.15 150";
  if (m.includes("syphil")) return "0.55 0.22 25";
  if (m.includes("tuberc")) return "0.50 0.18 45";
  return "0.45 0.15 260";
}

function RemedyPopup({
  remedy,
  onClose,
}: {
  remedy: RemedyData;
  onClose: () => void;
}) {
  const color = getMiasmColorRx(remedy.miasmaticClassification);

  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <motion.div
        data-ocid="prescription.remedy_detail.modal"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl border flex flex-col"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "0 20px 60px oklch(0.15 0.010 240 / 0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-start justify-between px-5 py-4 border-b z-10"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-display font-bold text-lg"
                style={{ color: "oklch(var(--foreground))" }}
              >
                {remedy.name}
              </span>
              <span
                className="text-sm font-mono font-semibold"
                style={{ color: `oklch(${color})` }}
              >
                {remedy.abbreviation}
              </span>
            </div>
            <div className="mt-1">
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: `oklch(${color} / 0.35)`,
                  color: `oklch(${color})`,
                }}
              >
                {remedy.miasmaticClassification}
              </Badge>
            </div>
            <p
              className="text-xs mt-2 italic"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Prescription Reference — Boericke &amp; Synoptic Key
            </p>
          </div>
          <button
            type="button"
            data-ocid="prescription.remedy_detail.close_button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ml-3 mt-0.5 hover:opacity-80 transition-opacity"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--muted-foreground))",
            }}
            aria-label="Close remedy details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1">
          <Tabs defaultValue="keynotes">
            <TabsList
              className="mb-4 flex-wrap h-auto gap-1"
              style={{ background: "oklch(0.94 0.007 240)" }}
            >
              {[
                { value: "keynotes", label: "Keynotes" },
                { value: "materia", label: "Materia Medica" },
                { value: "synoptic", label: "Synoptic Key" },
                { value: "rubrics", label: "Rubrics" },
                { value: "relations", label: "Relationships" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-xs"
                  data-ocid={`prescription.remedy_detail.${tab.value}.tab`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="keynotes">
              <div className="space-y-3">
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: `oklch(${color} / 0.05)`,
                    border: `1px solid oklch(${color} / 0.18)`,
                  }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: `oklch(${color})` }}
                  >
                    Keynotes &amp; Characteristics
                  </div>
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {remedy.keynotes}
                  </p>
                </div>
                {remedy.clinicalIndications && (
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: "oklch(var(--muted))",
                      border: "1px solid oklch(var(--border))",
                    }}
                  >
                    <div
                      className="text-xs font-semibold uppercase tracking-widest mb-1.5"
                      style={{ color: "oklch(var(--teal))" }}
                    >
                      Clinical Indications
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {remedy.clinicalIndications}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="materia">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "oklch(var(--muted))",
                  border: "1px solid oklch(var(--border))",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(var(--teal))" }}
                >
                  Materia Medica Summary (Boericke)
                </div>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {remedy.materiaMedicaSummary}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="synoptic">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "oklch(var(--muted))",
                  border: "1px solid oklch(var(--border))",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.45 0.15 150)" }}
                >
                  Synoptic Key Highlights (Bhanja)
                </div>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {remedy.synopticKeyHighlights}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="rubrics">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "oklch(var(--muted))",
                  border: "1px solid oklch(var(--border))",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.50 0.14 90)" }}
                >
                  Key Repertory Rubrics
                </div>
                <div className="space-y-1.5">
                  {remedy.rubrics.split(";").map((r) => (
                    <div
                      key={r.trim() || r}
                      className="text-xs px-2 py-1.5 rounded font-mono"
                      style={{
                        background: "oklch(0.91 0.008 240)",
                        color: "oklch(0.28 0.010 240)",
                      }}
                    >
                      {r.trim()}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="relations">
              <div className="space-y-2.5">
                {RELATION_LABELS_RX.map(
                  ({ key, label, color: relColor }) =>
                    remedy.relationships[key] && (
                      <div
                        key={key}
                        className="p-3 rounded-lg"
                        style={{
                          background: `oklch(${relColor} / 0.05)`,
                          border: `1px solid oklch(${relColor} / 0.18)`,
                        }}
                      >
                        <div
                          className="text-xs font-semibold uppercase tracking-widest mb-2"
                          style={{ color: `oklch(${relColor})` }}
                        >
                          {label}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {remedy.relationships[key].split(",").map((r) => (
                            <span
                              key={r.trim()}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                background: `oklch(${relColor} / 0.08)`,
                                color: `oklch(${relColor})`,
                                border: `1px solid oklch(${relColor} / 0.25)`,
                              }}
                            >
                              {r.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    ),
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

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
  background: "oklch(var(--card))",
  borderColor: "oklch(var(--border))",
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
        style={{ color: "oklch(var(--teal))" }}
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
          background: "oklch(var(--muted))",
          borderColor: "oklch(var(--border))",
          color: "oklch(var(--foreground))",
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
          color: "oklch(var(--teal))",
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

// ─── Previous Prescriptions (read-only cross-case view) ──────────────────────

interface FlatPrescription extends PrescriptionRow {
  caseSheetId: string;
  caseYear: string;
}

function PreviousPrescriptionsSection({
  currentCaseSheetId,
  allCaseSheets,
}: {
  patientId: string;
  currentCaseSheetId: string;
  allCaseSheets: BackendCaseSheet[];
}) {
  // Fetch prescriptions for each case sheet via individual queries
  // We'll use a helper inner component per case sheet so hooks are stable
  const [allPrescriptions, setAllPrescriptions] = useState<FlatPrescription[]>(
    [],
  );
  const [popupRemedy, setPopupRemedy] = useState<RemedyData | null>(null);

  return (
    <div className="space-y-3">
      {allCaseSheets.map((cs) => (
        <CaseSheetPrescriptionsLoader
          key={cs.id}
          caseSheet={cs}
          currentCaseSheetId={currentCaseSheetId}
          onLoaded={(rows) => {
            setAllPrescriptions((prev) => {
              // Replace existing entries for this case sheet
              const filtered = prev.filter((p) => p.caseSheetId !== cs.id);
              return [...filtered, ...rows];
            });
          }}
        />
      ))}
      <PreviousPrescriptionsTable
        prescriptions={allPrescriptions}
        onShowRemedy={setPopupRemedy}
      />
      <AnimatePresence>
        {popupRemedy && (
          <RemedyPopup
            remedy={popupRemedy}
            onClose={() => setPopupRemedy(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CaseSheetPrescriptionsLoader({
  caseSheet,
  onLoaded,
}: {
  caseSheet: BackendCaseSheet;
  currentCaseSheetId: string;
  onLoaded: (rows: FlatPrescription[]) => void;
}) {
  const { data: prescriptions } = usePrescriptionsByCaseSheet(caseSheet.id);
  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  useEffect(() => {
    if (!prescriptions) return;
    const flat: FlatPrescription[] = prescriptions.flatMap((p) => {
      const rows = parsePrescriptionRows(p.rows);
      return rows.map((r) => ({
        ...r,
        caseSheetId: caseSheet.id,
        caseYear: caseSheet.year?.toString() ?? "",
      }));
    });
    onLoadedRef.current(flat);
  }, [prescriptions, caseSheet.id, caseSheet.year]);

  return null;
}

function PreviousPrescriptionsTable({
  prescriptions,
  onShowRemedy,
}: {
  prescriptions: FlatPrescription[];
  onShowRemedy: (r: RemedyData) => void;
}) {
  if (prescriptions.length === 0) {
    return (
      <div
        data-ocid="case.prev_prescriptions.empty_state"
        className="rounded-lg border px-4 py-6 text-center text-sm italic"
        style={{
          borderColor: "oklch(var(--border))",
          color: "oklch(var(--muted-foreground))",
          background: "oklch(0.98 0.003 240)",
        }}
      >
        No previous prescriptions recorded for this patient yet.
      </div>
    );
  }

  // Sort by date descending
  const sorted = [...prescriptions].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });

  const cols = [
    "Date",
    "Year",
    "Remedy",
    "Potency",
    "Dosage",
    "Frequency",
    "Duration",
    "Instructions",
  ];

  return (
    <div className="clinical-form-wrapper">
      <div
        className="clinical-section-header"
        style={{
          background: "oklch(0.45 0.14 150 / 0.08)",
          color: "oklch(0.30 0.12 150)",
          borderBottom: "1px solid oklch(0.45 0.14 150 / 0.18)",
        }}
      >
        Previous Prescriptions — Complete History
      </div>
      <div style={{ overflowX: "auto" }}>
        <table
          className="clinical-form-table"
          data-ocid="case.prev_prescriptions.table"
        >
          <thead>
            <tr>
              <th style={{ width: "30px" }}>#</th>
              {cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((rx, i) => {
              const savedRemedy = findRemedy(rx.remedy);
              return (
                <tr
                  key={`prev-${rx.caseSheetId}-${rx.date}-${rx.remedy}-${i}`}
                  data-ocid={`case.prev_prescription.item.${i + 1}`}
                  style={{
                    background:
                      i % 2 === 0
                        ? "oklch(0.99 0.002 240)"
                        : "oklch(0.97 0.004 240)",
                  }}
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
                  <td style={{ whiteSpace: "nowrap" }}>
                    {rx.date ? formatDate(rx.date) : "—"}
                  </td>
                  <td>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-semibold"
                      style={{
                        background: "oklch(0.45 0.14 150 / 0.10)",
                        color: "oklch(0.30 0.12 150)",
                        border: "1px solid oklch(0.45 0.14 150 / 0.25)",
                      }}
                    >
                      {rx.caseYear}
                    </span>
                  </td>
                  <td
                    style={{
                      fontWeight: 700,
                      color: "#1e3a5f",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {savedRemedy ? (
                      <button
                        type="button"
                        data-ocid={`case.prev_prescription.remedy_info.button.${i + 1}`}
                        onClick={() => onShowRemedy(savedRemedy)}
                        title={`View details for ${rx.remedy}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "oklch(0.38 0.14 193)",
                          fontWeight: 700,
                          textDecoration: "underline",
                          textDecorationStyle: "dotted",
                          textUnderlineOffset: "3px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          fontSize: "inherit",
                        }}
                      >
                        {rx.remedy}
                        <Info
                          size={11}
                          style={{
                            color: "oklch(0.55 0.12 193)",
                            flexShrink: 0,
                          }}
                        />
                      </button>
                    ) : (
                      rx.remedy || "—"
                    )}
                  </td>
                  <td>
                    {rx.potency ? (
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
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{rx.dosage || "—"}</td>
                  <td>{rx.frequency || "—"}</td>
                  <td>{rx.duration || "—"}</td>
                  <td style={{ maxWidth: "140px", wordBreak: "break-word" }}>
                    {rx.instructions || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Case Analysis Panel ──────────────────────────────────────────────────────

const MIASM_COLORS_ANALYSIS: Record<string, string> = {
  psori: "0.38 0.14 193",
  sycot: "0.38 0.14 150",
  syphil: "0.50 0.20 25",
  tuberc: "0.45 0.16 45",
};

function getMiasmColorAnalysis(miasm: string): string {
  const m = miasm.toLowerCase();
  for (const [kw, color] of Object.entries(MIASM_COLORS_ANALYSIS)) {
    if (m.includes(kw)) return color;
  }
  return "0.45 0.15 260";
}

function CaseAnalysisPanel({
  isOpen,
  isLoading,
  results,
  onClose,
  onPrescribe,
  onViewDetails,
}: {
  isOpen: boolean;
  isLoading: boolean;
  results: RemedySuggestion[];
  onClose: () => void;
  onPrescribe: (remedyName: string) => void;
  onViewDetails: (remedy: RemedyData) => void;
}) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.35)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Panel */}
      <motion.div
        data-ocid="case.analysis.panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 32 }}
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-sm"
        style={{
          background: "oklch(var(--card))",
          borderLeft: "1px solid oklch(var(--border))",
          boxShadow: "-8px 0 40px oklch(0.10 0.008 240 / 0.16)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel Header */}
        <div
          className="flex items-start justify-between px-4 py-4 border-b shrink-0"
          style={{
            background: "oklch(0.45 0.15 280 / 0.06)",
            borderColor: "oklch(0.45 0.15 280 / 0.20)",
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.45 0.15 280 / 0.12)" }}
              >
                <Brain
                  className="w-4 h-4"
                  style={{ color: "oklch(0.45 0.15 280)" }}
                />
              </div>
              <h2
                className="font-display font-bold text-base"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Case Analysis
              </h2>
            </div>
            <p
              className="text-xs leading-relaxed mt-1"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Top remedy suggestions based on recorded symptoms
            </p>
          </div>
          <button
            type="button"
            data-ocid="case.analysis.close_button"
            onClick={onClose}
            aria-label="Close analysis panel"
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ml-3 hover:opacity-75 transition-opacity"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--muted-foreground))",
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Loading State */}
          {isLoading && (
            <div
              data-ocid="case.analysis.loading_state"
              className="flex flex-col items-center justify-center py-12 gap-3"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.45 0.15 280 / 0.10)" }}
              >
                <Stethoscope
                  className="w-6 h-6 animate-pulse"
                  style={{ color: "oklch(0.45 0.15 280)" }}
                />
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Analysing case…
              </p>
              <p
                className="text-xs text-center max-w-[180px]"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Correlating symptoms with Materia Medica &amp; Synoptic Key
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && results.length === 0 && (
            <div
              data-ocid="case.analysis.empty_state"
              className="flex flex-col items-center justify-center py-10 gap-3 text-center px-2"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "oklch(var(--muted))" }}
              >
                <Brain
                  className="w-5 h-5"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                />
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(var(--foreground))" }}
              >
                No strong matches found
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Fill in more symptom sections (Chief Complaint, Mental &amp;
                Physical Generals, Miasmatic Analysis) for better results.
              </p>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "oklch(0.45 0.15 280)" }}
              >
                {results.length} Remedies Suggested
              </p>
              {results.map((suggestion, idx) => {
                const color = getMiasmColorAnalysis(
                  suggestion.remedy.miasmaticClassification,
                );
                return (
                  <motion.div
                    key={suggestion.remedy.name}
                    data-ocid={`case.analysis.suggestion.item.${idx + 1}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="rounded-xl border p-3.5 space-y-2.5"
                    style={{
                      background:
                        idx === 0
                          ? "oklch(0.45 0.15 280 / 0.04)"
                          : "oklch(var(--card))",
                      borderColor:
                        idx === 0
                          ? "oklch(0.45 0.15 280 / 0.25)"
                          : "oklch(var(--border))",
                    }}
                  >
                    {/* Remedy Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {idx === 0 && (
                            <CheckCircle
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color: "oklch(0.45 0.15 280)" }}
                            />
                          )}
                          <span
                            className="font-display font-bold text-sm"
                            style={{ color: "oklch(var(--foreground))" }}
                          >
                            {suggestion.remedy.name}
                          </span>
                          <span
                            className="text-xs font-mono font-semibold"
                            style={{ color: `oklch(${color})` }}
                          >
                            {suggestion.remedy.abbreviation}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <Badge
                            variant="outline"
                            className="text-xs py-0 h-5"
                            style={{
                              borderColor: `oklch(${color} / 0.35)`,
                              color: `oklch(${color})`,
                              fontSize: "0.65rem",
                            }}
                          >
                            {
                              suggestion.remedy.miasmaticClassification.split(
                                /[\s,+]/,
                              )[0]
                            }
                          </Badge>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "oklch(0.45 0.15 280)" }}
                          >
                            {suggestion.score} matching factors
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Matched Reasons */}
                    <div className="space-y-1">
                      {suggestion.reasons.slice(0, 5).map((reason) => (
                        <div
                          key={reason}
                          className="flex items-start gap-1.5 text-xs"
                          style={{ color: "oklch(var(--foreground))" }}
                        >
                          <span
                            className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                            style={{ background: `oklch(${color})` }}
                          />
                          <span className="leading-relaxed">{reason}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1.5 pt-0.5">
                      <Button
                        type="button"
                        size="sm"
                        data-ocid={`case.analysis.prescribe.button.${idx + 1}`}
                        onClick={() => onPrescribe(suggestion.remedy.name)}
                        className="flex-1 h-7 text-xs font-semibold gap-1"
                        style={{
                          background: "oklch(0.45 0.15 280)",
                          color: "oklch(0.99 0 0)",
                          border: "none",
                        }}
                      >
                        <Pill className="w-3 h-3" />
                        Prescribe
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        data-ocid={`case.analysis.view_detail.button.${idx + 1}`}
                        onClick={() => onViewDetails(suggestion.remedy)}
                        className="flex-1 h-7 text-xs gap-1"
                        style={{
                          borderColor: `oklch(${color} / 0.35)`,
                          color: `oklch(${color})`,
                        }}
                      >
                        <Info className="w-3 h-3" />
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 border-t shrink-0"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          <p
            className="text-xs italic text-center"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Based on Boericke, Synoptic Key &amp; Kent's Repertory
          </p>
        </div>
      </motion.div>
    </>
  );
}

// ─── Investigation Suggestions Panel ────────────────────────────────────────

const CATEGORY_COLORS: Record<
  InvestigationSuggestion["category"],
  { bg: string; text: string; border: string; label: string }
> = {
  Haematology: {
    bg: "0.45 0.14 25",
    text: "0.45 0.14 25",
    border: "0.45 0.14 25",
    label: "Haematology",
  },
  Biochemistry: {
    bg: "0.45 0.15 260",
    text: "0.45 0.15 260",
    border: "0.45 0.15 260",
    label: "Biochemistry",
  },
  Imaging: {
    bg: "0.45 0.14 150",
    text: "0.45 0.14 150",
    border: "0.45 0.14 150",
    label: "Imaging",
  },
  "Urine/Stool": {
    bg: "0.45 0.16 90",
    text: "0.45 0.16 90",
    border: "0.45 0.16 90",
    label: "Urine / Stool",
  },
  Cardiology: {
    bg: "0.50 0.20 25",
    text: "0.50 0.20 25",
    border: "0.50 0.20 25",
    label: "Cardiology",
  },
  Specialty: {
    bg: "0.45 0.15 280",
    text: "0.45 0.15 280",
    border: "0.45 0.15 280",
    label: "Specialty",
  },
};

const URGENCY_CONFIG: Record<
  InvestigationSuggestion["urgency"],
  { label: string; color: string; bg: string; border: string }
> = {
  urgent: {
    label: "Urgent",
    color: "0.55 0.22 25",
    bg: "0.55 0.22 25",
    border: "0.55 0.22 25",
  },
  routine: {
    label: "Routine",
    color: "0.45 0.15 260",
    bg: "0.45 0.15 260",
    border: "0.45 0.15 260",
  },
  if_needed: {
    label: "If Needed",
    color: "0.48 0.010 240",
    bg: "0.48 0.010 240",
    border: "0.48 0.010 240",
  },
};

function InvestigationsPanel({
  isOpen,
  isLoading,
  results,
  onClose,
}: {
  isOpen: boolean;
  isLoading: boolean;
  results: InvestigationSuggestion[];
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Group results by category
  const grouped = results.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<
      InvestigationSuggestion["category"],
      InvestigationSuggestion[]
    >,
  );

  const categoryOrder: InvestigationSuggestion["category"][] = [
    "Haematology",
    "Biochemistry",
    "Urine/Stool",
    "Cardiology",
    "Imaging",
    "Specialty",
  ];
  const orderedCategories = categoryOrder.filter((cat) => grouped[cat]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.35)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Panel */}
      <motion.div
        data-ocid="case.investigations.panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 32 }}
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-sm"
        style={{
          background: "oklch(var(--card))",
          borderLeft: "1px solid oklch(var(--border))",
          boxShadow: "-8px 0 40px oklch(0.10 0.008 240 / 0.16)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel Header */}
        <div
          className="flex items-start justify-between px-4 py-4 border-b shrink-0"
          style={{
            background: "oklch(0.45 0.14 150 / 0.06)",
            borderColor: "oklch(0.45 0.14 150 / 0.20)",
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.45 0.14 150 / 0.12)" }}
              >
                <FlaskConical
                  className="w-4 h-4"
                  style={{ color: "oklch(0.45 0.14 150)" }}
                />
              </div>
              <h2
                className="font-display font-bold text-base"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Investigation Suggestions
              </h2>
            </div>
            <p
              className="text-xs leading-relaxed mt-1"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Based on Harrison&apos;s &amp; Davidson&apos;s
            </p>
          </div>
          <button
            type="button"
            data-ocid="case.investigations.close_button"
            onClick={onClose}
            aria-label="Close investigations panel"
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ml-3 hover:opacity-75 transition-opacity"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--muted-foreground))",
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Loading State */}
          {isLoading && (
            <div
              data-ocid="case.investigations.loading_state"
              className="flex flex-col items-center justify-center py-12 gap-3"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.45 0.14 150 / 0.10)" }}
              >
                <FlaskConical
                  className="w-6 h-6 animate-pulse"
                  style={{ color: "oklch(0.45 0.14 150)" }}
                />
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Analysing symptoms…
              </p>
              <p
                className="text-xs text-center max-w-[180px]"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Correlating with Harrison&apos;s &amp; Davidson&apos;s
              </p>
            </div>
          )}

          {/* Empty / Not Indicated State */}
          {!isLoading && results.length === 0 && (
            <div
              data-ocid="case.investigations.empty_state"
              className="flex flex-col items-center justify-center py-10 gap-3 text-center px-2"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "oklch(var(--muted))" }}
              >
                <FlaskConical
                  className="w-5 h-5"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                />
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(var(--foreground))" }}
              >
                No investigations clinically indicated
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Symptoms recorded do not warrant specific investigations at this
                time. Fill in Chief Complaint, Physical Generals, and
                Examination Findings for more targeted suggestions.
              </p>
            </div>
          )}

          {/* Results grouped by category */}
          {!isLoading &&
            results.length > 0 &&
            orderedCategories.map((category) => {
              const catConfig = CATEGORY_COLORS[category];
              const categoryItems = grouped[category];
              return (
                <div key={category} className="space-y-2">
                  {/* Category Header */}
                  <div
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
                    style={{
                      background: `oklch(${catConfig.bg} / 0.08)`,
                      border: `1px solid oklch(${catConfig.border} / 0.20)`,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: `oklch(${catConfig.bg})` }}
                    />
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: `oklch(${catConfig.text})` }}
                    >
                      {catConfig.label}
                    </span>
                    <span
                      className="text-xs ml-auto font-semibold"
                      style={{ color: `oklch(${catConfig.text} / 0.70)` }}
                    >
                      {categoryItems.length}
                    </span>
                  </div>

                  {/* Investigation cards */}
                  {categoryItems.map((item, idx) => {
                    const urgConf = URGENCY_CONFIG[item.urgency];
                    return (
                      <motion.div
                        key={item.name}
                        data-ocid={`case.investigations.item.${idx + 1}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="rounded-xl border p-3 space-y-2"
                        style={{
                          background: "oklch(var(--card))",
                          borderColor: "oklch(var(--border))",
                        }}
                      >
                        {/* Name + Urgency Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className="font-semibold text-sm leading-snug flex-1"
                            style={{ color: "oklch(var(--foreground))" }}
                          >
                            {item.name}
                          </p>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full shrink-0 font-semibold"
                            style={{
                              background: `oklch(${urgConf.bg} / 0.10)`,
                              color: `oklch(${urgConf.color})`,
                              border: `1px solid oklch(${urgConf.border} / 0.25)`,
                            }}
                          >
                            {urgConf.label}
                          </span>
                        </div>

                        {/* Reasoning */}
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "oklch(var(--foreground) / 0.85)" }}
                        >
                          {item.reasoning}
                        </p>

                        {/* Reference */}
                        <p
                          className="text-xs italic leading-snug"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          📚 {item.reference}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 border-t shrink-0"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          <p
            className="text-xs italic text-center"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Based on Harrison&apos;s Principles of Internal Medicine (20th Ed.)
            &amp; Davidson&apos;s Principles and Practice of Medicine (23rd Ed.)
          </p>
        </div>
      </motion.div>
    </>
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
  const [popupRemedy, setPopupRemedy] = useState<RemedyData | null>(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const remedyInputRef = useRef<HTMLInputElement>(null);

  const suggestions = getRemedySuggestions(newRow.remedy);
  const matchedRemedy = findRemedy(newRow.remedy);

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
    setShowAutocomplete(false);
    toast.success("Prescription added");
  }

  function deleteRow(i: number) {
    onUpdate(prescriptions.filter((_, idx) => idx !== i));
  }

  function selectSuggestion(remedy: RemedyData) {
    setNewRow((p) => ({ ...p, remedy: remedy.name }));
    setShowAutocomplete(false);
    remedyInputRef.current?.focus();
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
    <>
      <div className="clinical-form-wrapper">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div className="clinical-section-header" style={{ margin: 0 }}>
            Prescription Record
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1.5"
            data-ocid="case.compare_remedies.open_modal_button"
            onClick={() => setCompareOpen(true)}
            style={{
              borderColor: "oklch(var(--teal) / 0.4)",
              color: "oklch(var(--teal))",
            }}
          >
            <Columns2 className="w-3.5 h-3.5" />
            Compare Remedies
          </Button>
        </div>
        <Sheet open={compareOpen} onOpenChange={setCompareOpen}>
          <SheetContent
            side="right"
            className="w-full sm:max-w-3xl overflow-y-auto"
            data-ocid="case.compare_remedies.sheet"
          >
            <SheetHeader>
              <SheetTitle>Remedy Comparison</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <RemedyComparePanel
                onSelectRemedy={(name) => {
                  updateNew("remedy", name);
                  setCompareOpen(false);
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
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
                prescriptions.map((rx, i) => {
                  const savedRemedy = findRemedy(rx.remedy);
                  return (
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
                      <td
                        style={{
                          fontWeight: 600,
                          color: "#1e3a5f",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {savedRemedy ? (
                          <button
                            type="button"
                            data-ocid={`case.prescription.remedy_info.button.${i + 1}`}
                            onClick={() => setPopupRemedy(savedRemedy)}
                            title={`View details for ${rx.remedy}`}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              color: "oklch(0.38 0.14 193)",
                              fontWeight: 700,
                              textDecoration: "underline",
                              textDecorationStyle: "dotted",
                              textUnderlineOffset: "3px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                              fontSize: "inherit",
                            }}
                          >
                            {rx.remedy}
                            <Info
                              size={11}
                              style={{
                                color: "oklch(0.55 0.12 193)",
                                flexShrink: 0,
                              }}
                            />
                          </button>
                        ) : (
                          rx.remedy
                        )}
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
                      <td
                        style={{ maxWidth: "140px", wordBreak: "break-word" }}
                      >
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
                  );
                })
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
                <td style={{ position: "relative", minWidth: "160px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <input
                      ref={remedyInputRef}
                      type="text"
                      value={newRow.remedy}
                      onChange={(e) => {
                        updateNew("remedy", e.target.value);
                        setShowAutocomplete(true);
                      }}
                      onFocus={() => setShowAutocomplete(true)}
                      onBlur={() =>
                        setTimeout(() => setShowAutocomplete(false), 180)
                      }
                      placeholder="Remedy *"
                      data-ocid="case.prescription.new.remedy.input"
                      style={{ fontWeight: 600, flex: 1, minWidth: 0 }}
                      autoComplete="off"
                    />
                    {matchedRemedy && (
                      <button
                        type="button"
                        data-ocid="prescription.remedy.info.button"
                        title={`View details: ${matchedRemedy.name}`}
                        onClick={() => setPopupRemedy(matchedRemedy)}
                        style={{
                          flexShrink: 0,
                          background: "oklch(0.45 0.14 193 / 0.10)",
                          border: "1px solid oklch(0.45 0.14 193 / 0.30)",
                          borderRadius: "4px",
                          padding: "3px 5px",
                          cursor: "pointer",
                          color: "oklch(0.38 0.14 193)",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Info size={13} />
                      </button>
                    )}
                  </div>
                  {/* Autocomplete dropdown */}
                  {showAutocomplete && suggestions.length > 0 && (
                    <div
                      ref={autocompleteRef}
                      data-ocid="prescription.remedy.autocomplete.popover"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        background: "oklch(var(--card))",
                        border: "1px solid oklch(0.85 0.010 240)",
                        borderRadius: "8px",
                        boxShadow: "0 6px 24px oklch(0.15 0.010 240 / 0.12)",
                        overflow: "hidden",
                        marginTop: "2px",
                      }}
                    >
                      {suggestions.map((remedy, i) => (
                        <button
                          key={remedy.abbreviation}
                          type="button"
                          data-ocid={`prescription.remedy.suggestion.${i + 1}`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            selectSuggestion(remedy);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            width: "100%",
                            padding: "8px 12px",
                            textAlign: "left",
                            background: "none",
                            border: "none",
                            borderBottom:
                              i < suggestions.length - 1
                                ? "1px solid oklch(0.93 0.006 240)"
                                : "none",
                            cursor: "pointer",
                            fontSize: "0.82rem",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "oklch(0.96 0.008 240)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.background = "none";
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              color: "oklch(var(--foreground))",
                              flex: 1,
                            }}
                          >
                            {remedy.name}
                          </span>
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontSize: "0.75rem",
                              color: "oklch(0.55 0.012 240)",
                            }}
                          >
                            {remedy.abbreviation}
                          </span>
                          <span
                            style={{
                              fontSize: "0.70rem",
                              padding: "1px 6px",
                              borderRadius: "99px",
                              background: "oklch(0.45 0.14 193 / 0.10)",
                              color: "oklch(0.38 0.14 193)",
                              border: "1px solid oklch(0.45 0.14 193 / 0.25)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {remedy.miasmaticClassification.split(/[\s,+]/)[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
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

      {/* Remedy Detail Popup */}
      <AnimatePresence>
        {popupRemedy && (
          <RemedyPopup
            remedy={popupRemedy}
            onClose={() => setPopupRemedy(null)}
          />
        )}
      </AnimatePresence>
    </>
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
            background: "oklch(var(--muted))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "oklch(var(--teal))" }}
          >
            New Follow-up — Visit {followUps.length + 1}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                className="text-xs"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Date *
              </Label>
              <Input
                type="date"
                value={newFu.date}
                onChange={(e) => updateFu("date", e.target.value)}
                data-ocid="case.followup.date.input"
                style={{
                  background: "oklch(var(--card))",
                  borderColor: "oklch(var(--border))",
                  color: "oklch(var(--foreground))",
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
                style={{ color: "oklch(var(--muted-foreground))" }}
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
                  background: "oklch(var(--card))",
                  borderColor: "oklch(var(--border))",
                  color: "oklch(var(--foreground))",
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
                background: "oklch(var(--teal))",
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
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
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
  const { isReadOnly } = useAccessControl();
  const { data: caseData, isLoading } = useCase(id);
  const { data: patient } = usePatient(caseData?.patientId ?? "");
  const { data: allCaseSheets = [] } = useCasesByPatient(
    caseData?.patientId ?? "",
  );
  const updateCase = useUpdateCase();
  const createPrescription = useCreatePrescription();
  const updatePrescription = useUpdatePrescription();
  const createFollowUp = useCreateFollowUp();
  const updateFollowUp = useUpdateFollowUp();

  // Load existing prescriptions and follow-ups for this case sheet
  const { data: savedPrescriptions } = usePrescriptionsByCaseSheet(id);
  const { data: savedFollowUps } = useFollowUpsByCaseSheet(id);

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

  // ── Case Analysis state ──────────────────────────────────────────────────
  const [analysisPanelOpen, setAnalysisPanelOpen] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<RemedySuggestion[]>(
    [],
  );
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisPopupRemedy, setAnalysisPopupRemedy] =
    useState<RemedyData | null>(null);

  // ── Investigation Suggestions state ──────────────────────────────────────
  const [investigationPanelOpen, setInvestigationPanelOpen] = useState(false);
  const [investigationResults, setInvestigationResults] = useState<
    InvestigationSuggestion[]
  >([]);
  const [investigationLoading, setInvestigationLoading] = useState(false);

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
    }
  }, [caseData]);

  // Load prescriptions from backend when they become available
  useEffect(() => {
    if (savedPrescriptions !== undefined) {
      if (savedPrescriptions.length > 0) {
        // Merge all rows from all prescription records for this case sheet
        const allRows: PrescriptionRow[] = savedPrescriptions.flatMap((p) =>
          parsePrescriptionRows(p.rows),
        );
        setPrescriptionRows(allRows);
      } else {
        setPrescriptionRows([]);
      }
    }
  }, [savedPrescriptions]);

  // Load follow-ups from backend when they become available
  useEffect(() => {
    if (savedFollowUps !== undefined) {
      if (savedFollowUps.length > 0) {
        const allRows: FollowUpRow[] = savedFollowUps.flatMap((f) =>
          parseFollowUpRows(f.rows),
        );
        setFollowUpRows(allRows);
      } else {
        setFollowUpRows([]);
      }
    }
  }, [savedFollowUps]);

  function handleAnalyseCase() {
    const input = {
      chiefComplaint: JSON.stringify(complaintRows),
      hpi,
      pastHistory,
      familyHistory,
      mentalGenerals,
      physicalGenerals,
      personalHistory: JSON.stringify(personalHistory),
      miasmaticAnalysis,
      totality,
      repertorialFindings,
    };
    setAnalysisResults([]);
    setAnalysisLoading(true);
    setAnalysisPanelOpen(true);
    // Short UX delay for "analysing" feel
    setTimeout(() => {
      const results = analyseCase(input, SEED_REMEDIES);
      setAnalysisResults(results);
      setAnalysisLoading(false);
    }, 600);
  }

  function handleSuggestInvestigations() {
    const input = {
      chiefComplaint: JSON.stringify(complaintRows),
      hpi,
      pastHistory,
      familyHistory,
      mentalGenerals,
      physicalGenerals,
      personalHistory: JSON.stringify(personalHistory),
      investigations,
      miasmaticAnalysis,
      totality,
      repertorialFindings,
    };
    setInvestigationResults([]);
    setInvestigationLoading(true);
    setInvestigationPanelOpen(true);
    setTimeout(() => {
      const results = suggestInvestigations(input);
      setInvestigationResults(results);
      setInvestigationLoading(false);
    }, 500);
  }

  function handlePrescribeFromAnalysis(remedyName: string) {
    const newRx: PrescriptionRow = {
      date: todayISO(),
      remedy: remedyName,
      potency: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    };
    setPrescriptionRows((prev) => [...prev, newRx]);
    setAnalysisPanelOpen(false);
    toast.success(`${remedyName} added to prescription`);
  }

  async function handleSave() {
    if (!caseData) return;
    try {
      // 1. Save the main case sheet fields
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

      // 2. Save prescriptions to backend
      const rxJson = JSON.stringify(prescriptionRows);
      if (savedPrescriptions && savedPrescriptions.length > 0) {
        // Update the first prescription record (all rows stored in one record)
        await updatePrescription.mutateAsync({
          id: savedPrescriptions[0].id,
          prescription: {
            id: savedPrescriptions[0].id,
            caseSheetId: caseData.id,
            rows: rxJson,
          },
        });
        // Delete any extra prescription records (shouldn't normally exist)
        // We only keep the first one going forward
      } else {
        // Create a new prescription record
        await createPrescription.mutateAsync({
          id: generateId(),
          caseSheetId: caseData.id,
          rows: rxJson,
        });
      }

      // 3. Save follow-ups to backend
      const fuJson = JSON.stringify(followUpRows);
      if (savedFollowUps && savedFollowUps.length > 0) {
        await updateFollowUp.mutateAsync({
          id: savedFollowUps[0].id,
          followUp: {
            id: savedFollowUps[0].id,
            caseSheetId: caseData.id,
            rows: fuJson,
          },
        });
      } else {
        await createFollowUp.mutateAsync({
          id: generateId(),
          caseSheetId: caseData.id,
          rows: fuJson,
        });
      }

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
        <p style={{ color: "oklch(var(--muted-foreground))" }}>
          Case not found
        </p>
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
            style={{ color: "oklch(var(--muted-foreground))" }}
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
                style={{ color: "oklch(var(--teal))" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "oklch(var(--teal))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
            >
              {patient ? patient.name : "Case Sheet"}
            </h1>
            {patient && (
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Age: {patient.age?.toString()} · {patient.sex} ·{" "}
                {patient.occupation}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              data-ocid="case.analyse.primary_button"
              onClick={handleAnalyseCase}
              className="gap-1.5 h-9"
              style={{
                background: "oklch(0.45 0.15 280)",
                color: "oklch(0.99 0 0)",
                border: "none",
              }}
            >
              <Brain className="w-3.5 h-3.5" />
              Analyse Case
            </Button>
            {!isReadOnly && (
              <>
                <Button
                  type="button"
                  data-ocid="case.investigations.open_modal_button"
                  onClick={handleSuggestInvestigations}
                  className="gap-1.5 h-9"
                  style={{
                    background: "oklch(0.40 0.14 175)",
                    color: "oklch(0.99 0 0)",
                    border: "none",
                  }}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  Suggest Investigations
                </Button>
                <Button
                  data-ocid="case.save.primary_button"
                  onClick={handleSave}
                  disabled={updateCase.isPending}
                  className="gap-1.5 h-9"
                  style={{
                    background: "oklch(var(--teal))",
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
              </>
            )}
          </div>
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
            "prevPrescriptions",
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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
              style={{ color: "oklch(var(--foreground))" }}
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

          {/* 13. Previous Prescriptions — READ-ONLY HISTORY TABLE */}
          <AccordionItem
            value="prevPrescriptions"
            className="rounded-lg border overflow-hidden"
            style={{
              ...ACCORDION_ITEM_STYLE,
              borderColor: "oklch(0.45 0.14 150 / 0.35)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(var(--foreground))" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={13} />
                Previous Prescriptions (All Visits)
                <ClipboardList
                  className="w-3.5 h-3.5 ml-1"
                  style={{ color: "oklch(0.45 0.14 150)" }}
                />
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {caseData && (
                <PreviousPrescriptionsSection
                  patientId={caseData.patientId}
                  currentCaseSheetId={caseData.id}
                  allCaseSheets={allCaseSheets}
                />
              )}
            </AccordionContent>
          </AccordionItem>

          {/* 14. Current Prescriptions — TABLE */}
          <AccordionItem
            value="prescriptions"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(var(--foreground))" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={14} />
                Current Prescription ({prescriptionRows.length})
                <Pill
                  className="w-3.5 h-3.5 ml-1"
                  style={{ color: "oklch(var(--teal))" }}
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

          {/* 15. Follow-ups — TABLE */}
          <AccordionItem
            value="followups"
            className="rounded-lg border overflow-hidden"
            style={ACCORDION_ITEM_STYLE}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(var(--foreground))" }}
            >
              <span className="flex items-center gap-2">
                <SectionNum n={15} />
                Follow-ups ({followUpRows.length})
                <FileText
                  className="w-3.5 h-3.5 ml-1"
                  style={{ color: "oklch(var(--teal))" }}
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
      <div className="mt-6 flex justify-end gap-2 flex-wrap">
        <Button
          type="button"
          data-ocid="case.analyse_bottom.primary_button"
          onClick={handleAnalyseCase}
          className="gap-1.5"
          style={{
            background: "oklch(0.45 0.15 280)",
            color: "oklch(0.99 0 0)",
            border: "none",
          }}
        >
          <Brain className="w-4 h-4" />
          Analyse Case
        </Button>
        {!isReadOnly && (
          <>
            <Button
              type="button"
              data-ocid="case.investigations_bottom.open_modal_button"
              onClick={handleSuggestInvestigations}
              className="gap-1.5"
              style={{
                background: "oklch(0.40 0.14 175)",
                color: "oklch(0.99 0 0)",
                border: "none",
              }}
            >
              <FlaskConical className="w-4 h-4" />
              Suggest Investigations
            </Button>
            <Button
              data-ocid="case.save_bottom.primary_button"
              onClick={handleSave}
              disabled={updateCase.isPending}
              className="gap-1.5"
              style={{
                background: "oklch(var(--teal))",
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
          </>
        )}
      </div>

      {/* Case Analysis Panel */}
      <AnimatePresence>
        {analysisPanelOpen && (
          <CaseAnalysisPanel
            isOpen={analysisPanelOpen}
            isLoading={analysisLoading}
            results={analysisResults}
            onClose={() => setAnalysisPanelOpen(false)}
            onPrescribe={handlePrescribeFromAnalysis}
            onViewDetails={(remedy) => {
              setAnalysisPopupRemedy(remedy);
            }}
          />
        )}
      </AnimatePresence>

      {/* Investigations Panel */}
      <AnimatePresence>
        {investigationPanelOpen && (
          <InvestigationsPanel
            isOpen={investigationPanelOpen}
            isLoading={investigationLoading}
            results={investigationResults}
            onClose={() => setInvestigationPanelOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Remedy detail popup triggered from analysis panel */}
      <AnimatePresence>
        {analysisPopupRemedy && (
          <RemedyPopup
            remedy={analysisPopupRemedy}
            onClose={() => setAnalysisPopupRemedy(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
