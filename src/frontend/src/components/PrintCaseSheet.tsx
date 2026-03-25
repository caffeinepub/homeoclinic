import type React from "react";

export interface DoctorProfile {
  name?: string;
  qualification?: string;
  regNo?: string;
  phone?: string;
  clinicName?: string;
  clinicAddress?: string;
}

export interface PrintPatient {
  name: string;
  age?: string | bigint;
  sex?: string;
  address?: string;
  contact?: string;
  occupation?: string;
}

export interface PrintComplaintRow {
  complaint: string;
  duration: string;
  onset: string;
  location: string;
  character: string;
  aggravation: string;
  amelioration: string;
  concomitants: string;
}

export interface PrintPersonalHistory {
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

export interface PrintExamination {
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

export interface PrintPrescriptionRow {
  date: string;
  remedy: string;
  potency: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface PrintFollowUpRow {
  visitNo: number;
  date: string;
  feedback: string;
  symptoms: string;
  changes: string;
  observations: string;
  prescriptionGiven: string;
}

export interface PrintCaseData {
  chiefComplaint?: PrintComplaintRow[];
  hpi?: string;
  pastHistory?: string;
  familyHistory?: string;
  personalHistory?: PrintPersonalHistory;
  mentalGenerals?: string;
  physicalGenerals?: string;
  examination?: PrintExamination;
  investigations?: string;
  miasmaticAnalysis?: string;
  totality?: string;
  repertorialFindings?: string;
}

interface PrintCaseSheetProps {
  patient: PrintPatient;
  caseData: PrintCaseData;
  prescriptions: PrintPrescriptionRow[];
  followUps: PrintFollowUpRow[];
  doctorProfile: DoctorProfile;
}

function hasContent(val: string | undefined | null): boolean {
  return !!val && val.trim().length > 0;
}

export function PrintCaseSheet({
  patient,
  caseData,
  prescriptions,
  followUps,
  doctorProfile,
}: PrintCaseSheetProps) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const hasComplaints = caseData.chiefComplaint?.some((r) =>
    hasContent(r.complaint),
  );
  const hasExam =
    caseData.examination &&
    Object.values(caseData.examination).some((v) => hasContent(v));
  const hasPersonal =
    caseData.personalHistory &&
    Object.values(caseData.personalHistory).some((v) => hasContent(v));

  return (
    <div
      className="print-only"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: "#111",
        background: "#fff",
        padding: "24px 32px",
        maxWidth: "800px",
        margin: "0 auto",
        fontSize: "13px",
        lineHeight: 1.5,
      }}
    >
      {/* Clinic Header */}
      <div
        style={{
          textAlign: "center",
          borderBottom: "2px solid #333",
          paddingBottom: "12px",
          marginBottom: "12px",
        }}
      >
        {doctorProfile.clinicName && (
          <div
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              letterSpacing: "0.04em",
              marginBottom: "4px",
            }}
          >
            {doctorProfile.clinicName}
          </div>
        )}
        {doctorProfile.name && (
          <div style={{ fontSize: "15px", fontWeight: "600" }}>
            Dr. {doctorProfile.name}
            {doctorProfile.qualification
              ? `, ${doctorProfile.qualification}`
              : ""}
          </div>
        )}
        {doctorProfile.regNo && (
          <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>
            Reg. No: {doctorProfile.regNo}
          </div>
        )}
        {doctorProfile.clinicAddress && (
          <div style={{ fontSize: "12px", color: "#555" }}>
            {doctorProfile.clinicAddress}
          </div>
        )}
        {doctorProfile.phone && (
          <div style={{ fontSize: "12px", color: "#555" }}>
            Phone: {doctorProfile.phone}
          </div>
        )}
        {!doctorProfile.clinicName && !doctorProfile.name && (
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            HomeoClinic
          </div>
        )}
      </div>

      {/* Patient Info */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "10px",
        }}
      >
        <tbody>
          <tr>
            <td style={{ paddingRight: "16px", paddingBottom: "2px" }}>
              <strong>Patient:</strong> {patient.name}
            </td>
            <td
              style={{
                paddingRight: "16px",
                paddingBottom: "2px",
                whiteSpace: "nowrap",
              }}
            >
              <strong>Age/Sex:</strong> {patient.age?.toString() ?? "—"} /{" "}
              {patient.sex ?? "—"}
            </td>
            <td style={{ paddingBottom: "2px", whiteSpace: "nowrap" }}>
              <strong>Date:</strong> {today}
            </td>
          </tr>
          {(patient.occupation || patient.contact) && (
            <tr>
              {patient.occupation && (
                <td colSpan={2}>
                  <strong>Occupation:</strong> {patient.occupation}
                </td>
              )}
              {patient.contact && (
                <td>
                  <strong>Contact:</strong> {patient.contact}
                </td>
              )}
            </tr>
          )}
          {patient.address && (
            <tr>
              <td colSpan={3}>
                <strong>Address:</strong> {patient.address}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ borderTop: "1px solid #bbb", marginBottom: "10px" }} />

      {hasComplaints && (
        <Section title="Chief Complaint">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11.5px",
            }}
          >
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                {[
                  "Complaint",
                  "Duration",
                  "Onset",
                  "Location",
                  "Character",
                  "Aggravation",
                  "Amelioration",
                  "Concomitants",
                ].map((h) => (
                  <Th key={h}>{h}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {caseData
                .chiefComplaint!.filter((r) => hasContent(r.complaint))
                .map((r, i) => (
                  <tr
                    key={`complaint-${i}-${r.complaint}`}
                    style={{ borderBottom: "1px solid #e5e5e5" }}
                  >
                    <Td>{r.complaint}</Td>
                    <Td>{r.duration}</Td>
                    <Td>{r.onset}</Td>
                    <Td>{r.location}</Td>
                    <Td>{r.character}</Td>
                    <Td>{r.aggravation}</Td>
                    <Td>{r.amelioration}</Td>
                    <Td>{r.concomitants}</Td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Section>
      )}

      {hasContent(caseData.hpi) && (
        <Section title="History of Present Illness">
          <TextBlock>{caseData.hpi!}</TextBlock>
        </Section>
      )}
      {hasContent(caseData.pastHistory) && (
        <Section title="Past History">
          <TextBlock>{caseData.pastHistory!}</TextBlock>
        </Section>
      )}
      {hasContent(caseData.familyHistory) && (
        <Section title="Family History">
          <TextBlock>{caseData.familyHistory!}</TextBlock>
        </Section>
      )}

      {hasPersonal && (
        <Section title="Personal History">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11.5px",
            }}
          >
            <tbody>
              {(
                [
                  ["Diet", caseData.personalHistory!.diet],
                  ["Appetite", caseData.personalHistory!.appetite],
                  ["Thirst", caseData.personalHistory!.thirst],
                  ["Stool", caseData.personalHistory!.stool],
                  ["Urine", caseData.personalHistory!.urine],
                  ["Sleep Duration", caseData.personalHistory!.sleepDuration],
                  ["Sleep Position", caseData.personalHistory!.sleepPosition],
                  ["Dreams", caseData.personalHistory!.dreams],
                  ["Perspiration", caseData.personalHistory!.perspLocation],
                  ["Thermals", caseData.personalHistory!.thermals],
                  ["Desires", caseData.personalHistory!.desires],
                  ["Aversions", caseData.personalHistory!.aversions],
                  ["Habits", caseData.personalHistory!.habits],
                ] as [string, string][]
              )
                .filter(([, v]) => hasContent(v))
                .map(([label, val]) => (
                  <tr key={label} style={{ borderBottom: "1px solid #ebebeb" }}>
                    <td
                      style={{
                        padding: "3px 8px",
                        fontWeight: "600",
                        width: "140px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </td>
                    <td style={{ padding: "3px 8px" }}>{val}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Section>
      )}

      {hasContent(caseData.mentalGenerals) && (
        <Section title="Mental Generals">
          <TextBlock>{caseData.mentalGenerals!}</TextBlock>
        </Section>
      )}
      {hasContent(caseData.physicalGenerals) && (
        <Section title="Physical Generals">
          <TextBlock>{caseData.physicalGenerals!}</TextBlock>
        </Section>
      )}

      {hasExam && (
        <Section title="Examination Findings">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11.5px",
            }}
          >
            <tbody>
              {(
                [
                  ["Pulse Rate", caseData.examination!.pulseRate],
                  ["Blood Pressure", caseData.examination!.bloodPressure],
                  ["Temperature", caseData.examination!.temperature],
                  ["Weight", caseData.examination!.weight],
                  ["Height", caseData.examination!.height],
                  ["General Exam", caseData.examination!.generalExam],
                  ["CVS", caseData.examination!.cvs],
                  ["RS", caseData.examination!.rs],
                  ["Abdomen", caseData.examination!.abdomen],
                  ["CNS", caseData.examination!.cns],
                  ["Local Exam", caseData.examination!.localExam],
                ] as [string, string][]
              )
                .filter(([, v]) => hasContent(v))
                .map(([label, val]) => (
                  <tr key={label} style={{ borderBottom: "1px solid #ebebeb" }}>
                    <td
                      style={{
                        padding: "3px 8px",
                        fontWeight: "600",
                        width: "140px",
                      }}
                    >
                      {label}
                    </td>
                    <td style={{ padding: "3px 8px" }}>{val}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Section>
      )}

      {hasContent(caseData.investigations) && (
        <Section title="Investigations">
          <TextBlock>{caseData.investigations!}</TextBlock>
        </Section>
      )}
      {hasContent(caseData.miasmaticAnalysis) && (
        <Section title="Miasmatic Analysis">
          <TextBlock>{caseData.miasmaticAnalysis!}</TextBlock>
        </Section>
      )}
      {hasContent(caseData.totality) && (
        <Section title="Totality of Symptoms">
          <TextBlock>{caseData.totality!}</TextBlock>
        </Section>
      )}
      {hasContent(caseData.repertorialFindings) && (
        <Section title="Repertorial Findings">
          <TextBlock>{caseData.repertorialFindings!}</TextBlock>
        </Section>
      )}

      {prescriptions.length > 0 && (
        <Section title="Prescription">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11.5px",
            }}
          >
            <thead>
              <tr style={{ background: "#f0f8f4" }}>
                {[
                  "Date",
                  "Remedy",
                  "Potency",
                  "Dosage",
                  "Frequency",
                  "Duration",
                  "Instructions",
                ].map((h) => (
                  <Th key={h}>{h}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prescriptions
                .filter((r) => hasContent(r.remedy))
                .map((r) => (
                  <tr
                    key={`${r.remedy}-${r.date}`}
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                  >
                    <Td>{r.date}</Td>
                    <Td>
                      <strong>{r.remedy}</strong>
                    </Td>
                    <Td>{r.potency}</Td>
                    <Td>{r.dosage}</Td>
                    <Td>{r.frequency}</Td>
                    <Td>{r.duration}</Td>
                    <Td>{r.instructions}</Td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Section>
      )}

      {followUps.length > 0 && (
        <Section title="Follow-Up History">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11.5px",
            }}
          >
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                {[
                  "Visit",
                  "Date",
                  "Feedback / Symptoms",
                  "Changes",
                  "Observations",
                  "Prescription",
                ].map((h) => (
                  <Th key={h}>{h}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {followUps.map((f) => (
                <tr
                  key={`fu-${f.visitNo}-${f.date}`}
                  style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  <Td>{String(f.visitNo)}</Td>
                  <Td>{f.date}</Td>
                  <Td>
                    {[f.feedback, f.symptoms].filter(Boolean).join(" — ")}
                  </Td>
                  <Td>{f.changes}</Td>
                  <Td>{f.observations}</Td>
                  <Td>{f.prescriptionGiven}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      <div
        style={{
          marginTop: "32px",
          borderTop: "1px solid #ccc",
          paddingTop: "10px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
          color: "#888",
        }}
      >
        <span>HomeoClinic — Sarada Krishna HMCC Format</span>
        <span>Printed: {today}</span>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          fontWeight: "700",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "#1a5c42",
          borderLeft: "3px solid #2a7a5e",
          paddingLeft: "8px",
          marginBottom: "5px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        padding: "4px 8px",
        textAlign: "left",
        borderBottom: "1px solid #ccc",
        fontWeight: "600",
        whiteSpace: "nowrap",
        fontSize: "11px",
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td style={{ padding: "3px 8px", verticalAlign: "top" }}>
      {children || "—"}
    </td>
  );
}

function TextBlock({ children }: { children: string }) {
  return (
    <div
      style={{
        fontSize: "13px",
        whiteSpace: "pre-wrap",
        lineHeight: 1.5,
        padding: "2px 0",
      }}
    >
      {children}
    </div>
  );
}
