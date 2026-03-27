# HomeoClinic

## Current State
The app has a sidebar with pages: Dashboard, Patients, Remedy Reference, Compare Remedies, Appointments, Memos, Settings. The remedy database has 78+ remedies each with keynotes, materiaMedicaSummary, synopticKeyHighlights, clinicalIndications, rubrics, and relationships. Investigation suggestions use a pre-built Harrison's-based data pattern.

## Requested Changes (Diff)

### Add
- New sidebar page: **Diagnosis Finder** (route `/diagnosis-finder`)
- New file: `src/frontend/src/pages/DiagnosisFinder.tsx`
- New file: `src/frontend/src/utils/diagnosisData.ts` — pre-built Harrison's clinical data for 40+ common diagnoses
- Sidebar nav entry with a `Microscope` icon
- Route in App.tsx

### Modify
- `AppLayout.tsx` — add Diagnosis Finder to NAV_ITEMS
- `App.tsx` — add route for `/diagnosis-finder`

### Remove
- Nothing

## Implementation Plan
1. Create `diagnosisData.ts` with:
   - 40+ common diagnoses (covering medicine, respiratory, GI, musculoskeletal, skin, neuro, gynaecology)
   - Each entry: `name`, `harrisons` (classic symptoms/signs from Harrison's), `keywords[]` (for matching remedy database)
2. Create `DiagnosisFinder.tsx` page:
   - Search box with autocomplete/suggestions for diagnosis names
   - On search: scan remedy database for remedies whose `clinicalIndications`, `keynotes`, `materiaMedicaSummary`, or `synopticKeyHighlights` contain relevant keywords
   - Score/rank results by number of matching fields
   - Two-panel layout:
     - Left: Harrison's clinical summary for the diagnosis (symptoms, signs, key features)
     - Right: Matched remedies list with highlighted matching text, relevance score, and a "Compare" button to send to the Compare Remedies page
   - Each remedy card shows name, miasmatic classification, matched symptom snippets
   - "Send to Compare" button on each remedy card
3. Add route and nav entry
