# HomeoClinic

## Current State
Full homeopathic clinical management app with patient registration, HMCC-format case sheets (14 sections), prescription table, follow-up table, 43+ remedy reference, remedy popup, and per-login data isolation.

## Requested Changes (Diff)

### Add
- A new read-only "Previous Prescriptions (All Visits)" accordion section (section 13) in the CaseSheet page that aggregates all prescriptions given to the patient across all their case sheets, displayed in a chronological table with columns: #, Date, Year, Remedy, Potency, Dosage, Frequency, Duration, Instructions.
- Hooks `usePrescriptionsByCaseSheet`, `useCreatePrescription`, `useUpdatePrescription`, `useDeletePrescription` in `useQueries.ts`.
- `PreviousPrescriptionsSection` and `PreviousPrescriptionsTable` components in CaseSheet.tsx.
- `CaseSheetPrescriptionsLoader` render-less helper component to load prescriptions per case sheet without violating hooks rules.

### Modify
- Old section 13 (Prescriptions) is renumbered to 14 (Current Prescription).
- Old section 14 (Follow-ups) is renumbered to 15 (Follow-ups).
- Main `CaseSheet` component now also fetches `useCasesByPatient` to supply all case sheets to the previous prescriptions panel.

### Remove
- Nothing removed.

## Implementation Plan
1. Add prescription hooks to `useQueries.ts`.
2. Add `PreviousPrescriptionsSection`, `CaseSheetPrescriptionsLoader`, `PreviousPrescriptionsTable` components to `CaseSheet.tsx`.
3. Update accordion sections: insert new section 13 (prev prescriptions), renumber 13→14 (current Rx), 14→15 (follow-ups).
4. Fetch `useCasesByPatient` in main `CaseSheet` component, pass to new section.
5. Build and deploy.
