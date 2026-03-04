import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import type { Case, FollowUp, Prescription } from "../backend.d";
import { useCase, usePatient, useUpdateCase } from "../hooks/useQueries";
import {
  currentYear,
  formatDate,
  generateId,
  todayISO,
} from "../utils/helpers";

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
        style={{ color: "oklch(0.72 0.14 193)" }}
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
          background: "oklch(0.18 0.010 240)",
          borderColor: "oklch(0.28 0.012 240)",
          color: "oklch(0.90 0.008 240)",
        }}
      />
    </div>
  );
}

const EMPTY_RX: Prescription = {
  remedy: "",
  potency: "",
  dosage: "",
  frequency: "",
  duration: "",
  date: todayISO(),
  instructions: "",
};

const EMPTY_FOLLOWUP: FollowUp = {
  visitNumber: BigInt(1),
  date: todayISO(),
  feedback: "",
  symptoms: "",
  changes: "",
  observations: "",
  prescription: undefined,
};

export function CaseSheet() {
  const { id } = useParams({ from: "/cases/$id" });
  const { data: caseData, isLoading } = useCase(id);
  const { data: patient } = usePatient(caseData?.patientId ?? "");
  const updateCase = useUpdateCase();

  const [form, setForm] = useState<Partial<Case>>({});
  const [rxOpen, setRxOpen] = useState(false);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [newRx, setNewRx] = useState<Prescription>({ ...EMPTY_RX });
  const [newFollowUp, setNewFollowUp] = useState<FollowUp>({
    ...EMPTY_FOLLOWUP,
  });
  const [editFollowUpRx, setEditFollowUpRx] = useState(false);

  useEffect(() => {
    if (caseData) setForm({ ...caseData });
  }, [caseData]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!caseData) return;
    try {
      await updateCase.mutateAsync({
        id: caseData.id,
        caseData: {
          ...caseData,
          ...form,
          prescriptions: form.prescriptions ?? caseData.prescriptions ?? [],
          followUps: form.followUps ?? caseData.followUps ?? [],
        },
      });
      toast.success("Case sheet saved");
    } catch {
      toast.error("Failed to save case sheet");
    }
  }

  function addPrescription() {
    if (!newRx.remedy) {
      toast.error("Remedy name is required");
      return;
    }
    setForm((prev) => ({
      ...prev,
      prescriptions: [...(prev.prescriptions ?? []), { ...newRx }],
    }));
    setNewRx({ ...EMPTY_RX });
    setRxOpen(false);
    toast.success("Prescription added");
  }

  function removePrescription(i: number) {
    setForm((prev) => ({
      ...prev,
      prescriptions: (prev.prescriptions ?? []).filter((_, idx) => idx !== i),
    }));
  }

  function addFollowUp() {
    if (!newFollowUp.date) {
      toast.error("Date is required");
      return;
    }
    const visitNum = BigInt((form.followUps?.length ?? 0) + 1);
    const fu: FollowUp = {
      ...newFollowUp,
      visitNumber: visitNum,
      prescription: editFollowUpRx ? { ...newRx } : undefined,
    };
    setForm((prev) => ({
      ...prev,
      followUps: [...(prev.followUps ?? []), fu],
    }));
    setNewFollowUp({ ...EMPTY_FOLLOWUP });
    setNewRx({ ...EMPTY_RX });
    setEditFollowUpRx(false);
    setFollowUpOpen(false);
    toast.success("Follow-up added");
  }

  function removeFollowUp(i: number) {
    setForm((prev) => ({
      ...prev,
      followUps: (prev.followUps ?? []).filter((_, idx) => idx !== i),
    }));
  }

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
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

  const rxList = form.prescriptions ?? [];
  const followUps = form.followUps ?? [];

  return (
    <div className="p-6 max-w-4xl mx-auto pb-20">
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

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <ClipboardList
                className="w-4 h-4"
                style={{ color: "oklch(0.72 0.14 193)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "oklch(0.72 0.14 193)" }}
              >
                Case Sheet
              </span>
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: "oklch(0.72 0.14 193 / 0.4)",
                  color: "oklch(0.72 0.14 193)",
                }}
              >
                {caseData.year?.toString()}
              </Badge>
            </div>
            <h1
              className="text-xl font-display font-bold"
              style={{ color: "oklch(0.93 0.008 240)" }}
            >
              {patient ? patient.name : "Case Sheet"}
            </h1>
          </div>
          <Button
            data-ocid="case.save.primary_button"
            onClick={handleSave}
            disabled={updateCase.isPending}
            className="gap-1.5 h-9"
            style={{
              background: "oklch(0.72 0.14 193)",
              color: "oklch(0.13 0.012 240)",
            }}
          >
            {updateCase.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            Save Case
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
          defaultValue={["chief", "history", "prescriptions", "followups"]}
          className="space-y-2"
        >
          {/* 1. Chief Complaint */}
          <AccordionItem
            value="chief"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  1
                </span>
                Chief Complaint
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Chief Complaint"
                field="chiefComplaint"
                value={form.chiefComplaint ?? ""}
                onChange={updateField}
                rows={5}
                placeholder="Complaint, Duration, Onset, Location, Character, Aggravation, Amelioration, Concomitants..."
              />
            </AccordionContent>
          </AccordionItem>

          {/* 2. History of Present Illness */}
          <AccordionItem
            value="history"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  2
                </span>
                History of Present Illness
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="HPI"
                field="history"
                value={form.history ?? ""}
                onChange={updateField}
                placeholder="Detailed history of the present illness..."
              />
            </AccordionContent>
          </AccordionItem>

          {/* 3. Past History */}
          <AccordionItem
            value="pastHistory"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  3
                </span>
                Past History
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Past History"
                field="pastHistory"
                value={form.pastHistory ?? ""}
                onChange={updateField}
                placeholder="Past diseases, surgeries, accidents, major illnesses, medications taken..."
              />
            </AccordionContent>
          </AccordionItem>

          {/* 4. Family History */}
          <AccordionItem
            value="familyHistory"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  4
                </span>
                Family History
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Family History"
                field="familyHistory"
                value={form.familyHistory ?? ""}
                onChange={updateField}
                rows={5}
                placeholder="Father, Mother, Siblings — any hereditary diseases, miasmatic predispositions..."
              />
            </AccordionContent>
          </AccordionItem>

          {/* 5. Personal History */}
          <AccordionItem
            value="personalHistory"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  5
                </span>
                Personal History
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Personal History"
                field="personalHistory"
                value={form.personalHistory ?? ""}
                onChange={updateField}
                rows={8}
                placeholder={`Diet: Veg/Non-Veg
Appetite:
Thirst:
Stool:
Urine:
Sleep: (duration, position, dreams)
Dreams:
Perspiration: (location, time, odour)
Thermals: (Hot/Chilly/Ambithermal)
Desires:
Aversions:
Habits: (tobacco, alcohol, addictions)`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 6. Mental Generals */}
          <AccordionItem
            value="mentalGenerals"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  6
                </span>
                Mental Generals
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Mental Generals"
                field="mentalGenerals"
                value={form.mentalGenerals ?? ""}
                onChange={updateField}
                rows={6}
                placeholder={`Temperament:
Emotions:
Fears/Phobias:
Grief/Ailments from:
Memory:
Concentration:
Intellectual activity:
Relationship with others:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 7. Physical Generals */}
          <AccordionItem
            value="physicalGenerals"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  7
                </span>
                Physical Generals
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Physical Generals"
                field="physicalGenerals"
                value={form.physicalGenerals ?? ""}
                onChange={updateField}
                rows={4}
                placeholder="Built, Weight, Height, Complexion, Constitution, General aggravations/ameliorations..."
              />
            </AccordionContent>
          </AccordionItem>

          {/* 8. Examination */}
          <AccordionItem
            value="examination"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  8
                </span>
                Examination Findings
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Examination"
                field="examination"
                value={form.examination ?? ""}
                onChange={updateField}
                rows={6}
                placeholder={`Pulse: BP: Temp: Weight:
General Examination:
Systemic Examination:
Local Examination:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 9. Investigations */}
          <AccordionItem
            value="investigations"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  9
                </span>
                Investigations
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Investigations"
                field="investigations"
                value={form.investigations ?? ""}
                onChange={updateField}
                rows={4}
                placeholder="Lab reports, X-rays, Ultrasound, other investigations..."
              />
            </AccordionContent>
          </AccordionItem>

          {/* 10. Miasmatic Analysis */}
          <AccordionItem
            value="miasmatic"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  10
                </span>
                Miasmatic Analysis
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Miasmatic Analysis"
                field="miasmaticAnalysis"
                value={form.miasmaticAnalysis ?? ""}
                onChange={updateField}
                rows={5}
                placeholder={`Psora: (symptoms of deficiency, hypo-function)
Sycosis: (symptoms of excess, hyper-function)
Syphilis: (symptoms of destruction, disfigurement)
Active miasm:
Background miasm:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 11. Totality of Symptoms */}
          <AccordionItem
            value="totality"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  11
                </span>
                Totality of Symptoms
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Totality"
                field="totality"
                value={form.totality ?? ""}
                onChange={updateField}
                rows={6}
                placeholder={`Characteristic symptoms (PQRS):
1.
2.
3.
Generals:
Particulars:
Mentals:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 12. Repertorial Findings */}
          <AccordionItem
            value="repertory"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  12
                </span>
                Repertorial Findings
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SectionTextarea
                label="Repertorial Findings"
                field="repertoiralFindings"
                value={form.repertoiralFindings ?? ""}
                onChange={updateField}
                rows={6}
                placeholder={`Repertory used:
Rubrics selected:
1.
2.
3.
Top remedies from repertory:
Final selection rationale:`}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 13. Prescriptions */}
          <AccordionItem
            value="prescriptions"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  13
                </span>
                Prescriptions ({rxList.length})
                <Pill
                  className="w-3.5 h-3.5 ml-1"
                  style={{ color: "oklch(0.72 0.14 193)" }}
                />
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {rxList.length === 0 ? (
                  <div
                    data-ocid="case.prescriptions.empty_state"
                    className="py-6 text-center rounded-md"
                    style={{ background: "oklch(0.18 0.010 240)" }}
                  >
                    <Pill
                      className="w-6 h-6 mx-auto mb-1 opacity-30"
                      style={{ color: "oklch(0.72 0.14 193)" }}
                    />
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.50 0.008 240)" }}
                    >
                      No prescriptions yet
                    </p>
                  </div>
                ) : (
                  rxList.map((rx, i) => (
                    <div
                      key={rx.date + rx.remedy}
                      data-ocid={`case.prescription.item.${i + 1}`}
                      className="p-3 rounded-md border"
                      style={{
                        background: "oklch(0.18 0.010 240)",
                        borderColor: "oklch(0.28 0.012 240)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "oklch(0.88 0.008 240)" }}
                          >
                            {rx.remedy}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: "oklch(0.72 0.14 193 / 0.4)",
                              color: "oklch(0.72 0.14 193)",
                            }}
                          >
                            {rx.potency}
                          </Badge>
                        </div>
                        <button
                          type="button"
                          data-ocid={`case.prescription.delete_button.${i + 1}`}
                          onClick={() => removePrescription(i)}
                          className="p-1 rounded"
                          style={{ color: "oklch(0.62 0.20 25)" }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div
                        className="grid grid-cols-3 gap-2 text-xs"
                        style={{ color: "oklch(0.60 0.010 240)" }}
                      >
                        <span>
                          <span style={{ color: "oklch(0.50 0.008 240)" }}>
                            Dose:
                          </span>{" "}
                          {rx.dosage}
                        </span>
                        <span>
                          <span style={{ color: "oklch(0.50 0.008 240)" }}>
                            Freq:
                          </span>{" "}
                          {rx.frequency}
                        </span>
                        <span>
                          <span style={{ color: "oklch(0.50 0.008 240)" }}>
                            Duration:
                          </span>{" "}
                          {rx.duration}
                        </span>
                      </div>
                      {rx.instructions && (
                        <p
                          className="text-xs mt-1.5 italic"
                          style={{ color: "oklch(0.55 0.010 240)" }}
                        >
                          {rx.instructions}
                        </p>
                      )}
                      {rx.date && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "oklch(0.45 0.008 240)" }}
                        >
                          {formatDate(rx.date)}
                        </p>
                      )}
                    </div>
                  ))
                )}
                <Button
                  size="sm"
                  data-ocid="case.add_prescription.button"
                  onClick={() => setRxOpen(true)}
                  variant="outline"
                  className="gap-1.5 text-xs"
                  style={{
                    borderColor: "oklch(0.72 0.14 193 / 0.4)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  <Plus className="w-3 h-3" /> Add Prescription
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 14. Follow-ups */}
          <AccordionItem
            value="followups"
            className="rounded-lg border overflow-hidden"
            style={{
              background: "oklch(0.20 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <AccordionTrigger
              className="px-4 py-3 hover:no-underline font-semibold text-sm"
              style={{ color: "oklch(0.88 0.008 240)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{
                    background: "oklch(0.72 0.14 193 / 0.15)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  14
                </span>
                Follow-ups ({followUps.length})
                <FileText
                  className="w-3.5 h-3.5 ml-1"
                  style={{ color: "oklch(0.72 0.14 193)" }}
                />
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {followUps.length === 0 ? (
                  <div
                    data-ocid="case.followups.empty_state"
                    className="py-6 text-center rounded-md"
                    style={{ background: "oklch(0.18 0.010 240)" }}
                  >
                    <FileText
                      className="w-6 h-6 mx-auto mb-1 opacity-30"
                      style={{ color: "oklch(0.72 0.14 193)" }}
                    />
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.50 0.008 240)" }}
                    >
                      No follow-ups yet
                    </p>
                  </div>
                ) : (
                  followUps.map((fu, i) => (
                    <div
                      key={fu.date + String(fu.visitNumber)}
                      data-ocid={`case.followup.item.${i + 1}`}
                      className="p-3 rounded-md border"
                      style={{
                        background: "oklch(0.18 0.010 240)",
                        borderColor: "oklch(0.28 0.012 240)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded"
                            style={{
                              background: "oklch(0.72 0.14 193 / 0.15)",
                              color: "oklch(0.72 0.14 193)",
                            }}
                          >
                            Visit {fu.visitNumber?.toString()}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "oklch(0.55 0.010 240)" }}
                          >
                            {formatDate(fu.date)}
                          </span>
                        </div>
                        <button
                          type="button"
                          data-ocid={`case.followup.delete_button.${i + 1}`}
                          onClick={() => removeFollowUp(i)}
                          className="p-1 rounded"
                          style={{ color: "oklch(0.62 0.20 25)" }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {fu.feedback && (
                          <div>
                            <span style={{ color: "oklch(0.50 0.008 240)" }}>
                              Patient feedback:{" "}
                            </span>
                            <span style={{ color: "oklch(0.78 0.008 240)" }}>
                              {fu.feedback}
                            </span>
                          </div>
                        )}
                        {fu.symptoms && (
                          <div>
                            <span style={{ color: "oklch(0.50 0.008 240)" }}>
                              Current symptoms:{" "}
                            </span>
                            <span style={{ color: "oklch(0.78 0.008 240)" }}>
                              {fu.symptoms}
                            </span>
                          </div>
                        )}
                        {fu.changes && (
                          <div>
                            <span style={{ color: "oklch(0.50 0.008 240)" }}>
                              Changes:{" "}
                            </span>
                            <span style={{ color: "oklch(0.78 0.008 240)" }}>
                              {fu.changes}
                            </span>
                          </div>
                        )}
                        {fu.observations && (
                          <div>
                            <span style={{ color: "oklch(0.50 0.008 240)" }}>
                              Observations:{" "}
                            </span>
                            <span style={{ color: "oklch(0.78 0.008 240)" }}>
                              {fu.observations}
                            </span>
                          </div>
                        )}
                      </div>
                      {fu.prescription?.remedy && (
                        <div
                          className="mt-2 pt-2 border-t"
                          style={{ borderColor: "oklch(0.26 0.012 240)" }}
                        >
                          <span
                            className="text-xs font-medium"
                            style={{ color: "oklch(0.72 0.14 193)" }}
                          >
                            Rx: {fu.prescription.remedy}{" "}
                            {fu.prescription.potency}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <Button
                  size="sm"
                  data-ocid="case.add_followup.button"
                  onClick={() => setFollowUpOpen(true)}
                  variant="outline"
                  className="gap-1.5 text-xs"
                  style={{
                    borderColor: "oklch(0.72 0.14 193 / 0.4)",
                    color: "oklch(0.72 0.14 193)",
                  }}
                >
                  <Plus className="w-3 h-3" /> Add Follow-up
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Prescription Modal */}
      <Dialog open={rxOpen} onOpenChange={setRxOpen}>
        <DialogContent
          data-ocid="case.prescription.dialog"
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
              Add Prescription
            </DialogTitle>
          </DialogHeader>
          <PrescriptionForm rx={newRx} setRx={setNewRx} />
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="case.prescription.cancel_button"
              onClick={() => setRxOpen(false)}
              style={{
                borderColor: "oklch(0.30 0.012 240)",
                color: "oklch(0.70 0.010 240)",
              }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="case.prescription.submit_button"
              onClick={addPrescription}
              style={{
                background: "oklch(0.72 0.14 193)",
                color: "oklch(0.13 0.012 240)",
              }}
            >
              Add Prescription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Follow-up Modal */}
      <Dialog open={followUpOpen} onOpenChange={setFollowUpOpen}>
        <DialogContent
          data-ocid="case.followup.dialog"
          className="max-w-lg max-h-[85vh] overflow-y-auto"
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
              Add Follow-up Visit
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(0.60 0.010 240)" }}
                >
                  Date
                </Label>
                <Input
                  type="date"
                  value={newFollowUp.date}
                  onChange={(e) =>
                    setNewFollowUp((p) => ({ ...p, date: e.target.value }))
                  }
                  data-ocid="case.followup.date.input"
                  style={{
                    background: "oklch(0.22 0.012 240)",
                    borderColor: "oklch(0.30 0.012 240)",
                    color: "oklch(0.93 0.008 240)",
                  }}
                />
              </div>
            </div>
            {[
              {
                field: "feedback",
                label: "Patient Feedback",
                placeholder: "How the patient feels, complaints...",
              },
              {
                field: "symptoms",
                label: "Current Symptoms",
                placeholder: "Symptoms present at this visit...",
              },
              {
                field: "changes",
                label: "Changes in Generals",
                placeholder: "Changes in appetite, sleep, energy...",
              },
              {
                field: "observations",
                label: "Physician Observations",
                placeholder: "Clinical observations, analysis...",
              },
            ].map(({ field, label, placeholder }) => (
              <div key={field} className="space-y-1.5">
                <Label
                  className="text-xs"
                  style={{ color: "oklch(0.60 0.010 240)" }}
                >
                  {label}
                </Label>
                <Textarea
                  rows={2}
                  value={
                    (newFollowUp as unknown as Record<string, string>)[field]
                  }
                  onChange={(e) =>
                    setNewFollowUp((p) => ({ ...p, [field]: e.target.value }))
                  }
                  data-ocid={`case.followup.${field}.textarea`}
                  placeholder={placeholder}
                  className="text-sm"
                  style={{
                    background: "oklch(0.22 0.012 240)",
                    borderColor: "oklch(0.30 0.012 240)",
                    color: "oklch(0.93 0.008 240)",
                  }}
                />
              </div>
            ))}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editFollowUpRx}
                  onChange={(e) => setEditFollowUpRx(e.target.checked)}
                  data-ocid="case.followup.add_rx.checkbox"
                  className="rounded"
                />
                <span
                  className="text-sm"
                  style={{ color: "oklch(0.72 0.14 193)" }}
                >
                  Add prescription for this visit
                </span>
              </label>
              {editFollowUpRx && (
                <div
                  className="mt-3 p-3 rounded-md"
                  style={{ background: "oklch(0.22 0.012 240)" }}
                >
                  <PrescriptionForm rx={newRx} setRx={setNewRx} />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="case.followup.cancel_button"
              onClick={() => setFollowUpOpen(false)}
              style={{
                borderColor: "oklch(0.30 0.012 240)",
                color: "oklch(0.70 0.010 240)",
              }}
            >
              Cancel
            </Button>
            <Button
              data-ocid="case.followup.submit_button"
              onClick={addFollowUp}
              style={{
                background: "oklch(0.72 0.14 193)",
                color: "oklch(0.13 0.012 240)",
              }}
            >
              Add Follow-up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PrescriptionForm({
  rx,
  setRx,
}: {
  rx: Prescription;
  setRx: React.Dispatch<React.SetStateAction<Prescription>>;
}) {
  function update(field: keyof Prescription, value: string) {
    setRx((p) => ({ ...p, [field]: value }));
  }
  return (
    <div className="grid grid-cols-2 gap-3 py-1">
      <div className="col-span-2 space-y-1.5">
        <Label className="text-xs" style={{ color: "oklch(0.60 0.010 240)" }}>
          Remedy *
        </Label>
        <Input
          value={rx.remedy}
          onChange={(e) => update("remedy", e.target.value)}
          data-ocid="case.prescription.remedy.input"
          placeholder="e.g., Sulphur, Pulsatilla, Nux Vomica"
          style={{
            background: "oklch(0.22 0.012 240)",
            borderColor: "oklch(0.30 0.012 240)",
            color: "oklch(0.93 0.008 240)",
          }}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: "oklch(0.60 0.010 240)" }}>
          Potency
        </Label>
        <Input
          value={rx.potency}
          onChange={(e) => update("potency", e.target.value)}
          data-ocid="case.prescription.potency.input"
          placeholder="e.g., 30C, 200C, 1M"
          style={{
            background: "oklch(0.22 0.012 240)",
            borderColor: "oklch(0.30 0.012 240)",
            color: "oklch(0.93 0.008 240)",
          }}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: "oklch(0.60 0.010 240)" }}>
          Dosage
        </Label>
        <Input
          value={rx.dosage}
          onChange={(e) => update("dosage", e.target.value)}
          data-ocid="case.prescription.dosage.input"
          placeholder="e.g., 4 pills"
          style={{
            background: "oklch(0.22 0.012 240)",
            borderColor: "oklch(0.30 0.012 240)",
            color: "oklch(0.93 0.008 240)",
          }}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: "oklch(0.60 0.010 240)" }}>
          Frequency
        </Label>
        <Input
          value={rx.frequency}
          onChange={(e) => update("frequency", e.target.value)}
          data-ocid="case.prescription.frequency.input"
          placeholder="e.g., Once daily, TDS"
          style={{
            background: "oklch(0.22 0.012 240)",
            borderColor: "oklch(0.30 0.012 240)",
            color: "oklch(0.93 0.008 240)",
          }}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: "oklch(0.60 0.010 240)" }}>
          Duration
        </Label>
        <Input
          value={rx.duration}
          onChange={(e) => update("duration", e.target.value)}
          data-ocid="case.prescription.duration.input"
          placeholder="e.g., 7 days, 1 month"
          style={{
            background: "oklch(0.22 0.012 240)",
            borderColor: "oklch(0.30 0.012 240)",
            color: "oklch(0.93 0.008 240)",
          }}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: "oklch(0.60 0.010 240)" }}>
          Date
        </Label>
        <Input
          type="date"
          value={rx.date}
          onChange={(e) => update("date", e.target.value)}
          data-ocid="case.prescription.date.input"
          style={{
            background: "oklch(0.22 0.012 240)",
            borderColor: "oklch(0.30 0.012 240)",
            color: "oklch(0.93 0.008 240)",
          }}
        />
      </div>
      <div className="col-span-2 space-y-1.5">
        <Label className="text-xs" style={{ color: "oklch(0.60 0.010 240)" }}>
          Instructions
        </Label>
        <Textarea
          rows={2}
          value={rx.instructions}
          onChange={(e) => update("instructions", e.target.value)}
          data-ocid="case.prescription.instructions.textarea"
          placeholder="Special instructions for the patient..."
          className="text-sm"
          style={{
            background: "oklch(0.22 0.012 240)",
            borderColor: "oklch(0.30 0.012 240)",
            color: "oklch(0.93 0.008 240)",
          }}
        />
      </div>
    </div>
  );
}
