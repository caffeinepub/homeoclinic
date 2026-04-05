# HomeoClinic

## Current State
The Remedy Reference page (Remedies.tsx) displays 78+ remedies from `remedySeeds.ts`. Each remedy has tabs for: Keynotes, Materia Medica (Boericke), Synoptic Key (Bhanja), Rubrics, and Relationships. The `RemedyData` interface in `remedyDatabase.ts` defines the data structure. There is no Farrington's Comparative Materia Medica data anywhere in the codebase.

## Requested Changes (Diff)

### Add
- `farrington` field to the `RemedyData` interface: a string containing Farrington's comparative and differentiating notes for that remedy
- Farrington's data for all 78+ seed remedies in `remedySeeds.ts` -- comparative/differentiating points, characteristic keynotes, and clinical indications from Farrington's Lectures on Comparative Materia Medica
- A new "Farrington" tab in the `RemedyDetail` component, displayed after the existing tabs, with a distinct amber/gold color scheme to differentiate it from Boericke/Bhanja data
- The tab label should clearly say "Farrington" and the section header inside should say "Farrington's Comparative MM"

### Modify
- `RemedyData` interface in `remedyDatabase.ts`: add optional `farrington?: string` field
- `RemedyDetail` component in `Remedies.tsx`: add a "Farrington" tab after existing tabs
- `EMPTY_REMEDY` constant in `Remedies.tsx`: add `farrington: ""` field
- Add remedy form in `Remedies.tsx`: add a Farrington textarea field
- All 78+ remedies in `remedySeeds.ts`: add `farrington` data

### Remove
Nothing removed.

## Implementation Plan
1. Update `RemedyData` interface in `remedyDatabase.ts` to add `farrington?: string`
2. Add Farrington data to all remedies in `remedySeeds.ts` (key polychrests with comparative notes from Farrington's Lectures)
3. Update `Remedies.tsx`:
   - Add Farrington tab in `RemedyDetail` with amber/gold color scheme (distinguishable from other tabs)
   - Add farrington field to `EMPTY_REMEDY`
   - Add farrington textarea in the Add Remedy form
4. No backend changes needed -- remedies are frontend-only
