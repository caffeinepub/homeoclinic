# HomeoClinic

## Current State
- Full homeopathic clinic management system with HMCC case sheets, 78+ remedies, prescription integration, investigation suggestions, remedy comparison tool
- Doctor profile stored in localStorage (fields: name, qualification, regNo, phone, clinicName, clinicAddress)
- Login page shows stale "58+ polychrests" text (should be 78+)
- No PDF export feature exists anywhere in the app
- CaseSheet.tsx (~3600 lines) contains full case sheet UI with all HMCC sections, prescriptions, follow-ups
- PatientDetail.tsx (~836 lines) shows patient profile and their case list
- Settings.tsx stores/reads doctor profile from localStorage key `doctorProfile_${principal}`

## Requested Changes (Diff)

### Add
- PDF export button on the CaseSheet page (top area near existing action buttons)
- PDF export button on the PatientDetail page (near patient info header)
- A print-ready view that includes:
  - Header: Doctor name, qualification, registration number, clinic name, clinic address (from localStorage doctorProfile)
  - Patient info: name, age, sex, address, contact
  - Full HMCC case sheet all sections
  - Prescription table (remedy, potency, dosage, frequency, duration)
  - Follow-up history table
- Use browser print API (window.print()) with a dedicated print CSS stylesheet or inline print styles
- No external PDF library needed -- use `@media print` CSS to show only the printable content

### Modify
- LoginPage.tsx (at `src/frontend/src/components/LoginPage.tsx` line 591): change "58+ polychrests" to "78+ polychrests"

### Remove
- Nothing

## Implementation Plan
1. Fix the stale text in LoginPage.tsx: "58+ polychrests" → "78+ polychrests"
2. Create a `PrintCaseSheet` component (or inline print function) that assembles the full printable document from case sheet data, patient info, prescriptions, follow-ups, and doctor profile
3. Add print-specific CSS (either via `@media print` in index.css or a dedicated stylesheet) that hides all sidebar/navigation/buttons and shows only the print content
4. Add "Export PDF" / "Print" button in CaseSheet.tsx (near Save/Analyse buttons at the top)
5. Add "Export PDF" / "Print" button in PatientDetail.tsx (near patient header)
6. The print button triggers window.print() after injecting/showing the printable content in a hidden print-only div
