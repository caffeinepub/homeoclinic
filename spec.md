# HomeoClinic

## Current State
- Farrington's Comparative Materia Medica is live in: Remedy Reference (dedicated tab per remedy card), Remedy Comparison Tool (amber section per remedy column)
- Diagnosis Finder has 14 categories with Harrison's/Davidson's/Alagappan's clinical summaries and remedy match cards
- Farrington's data is NOT yet shown in the Diagnosis Finder remedy match cards
- Drug/remedy information is displayed as plain paragraph text across all sections (Remedy Reference tabs, Comparison Tool columns, Diagnosis Finder remedy cards)

## Requested Changes (Diff)

### Add
- Farrington's Comparative Materia Medica section to each remedy match card in the Diagnosis Finder page (DiagnosisFinder.tsx)
- Bullet/numbered list rendering for ALL drug information sections across:
  - Remedy Reference (Remedies.tsx): keynotes, mind symptoms, physical symptoms, modalities, clinical uses, rubrics, relationships, and Farrington's tab content
  - Remedy Comparison Tool (RemedyCompare.tsx): all remedy data sections in each column
  - Diagnosis Finder (DiagnosisFinder.tsx): remedy match card symptom lists, and the new Farrington's section

### Modify
- DiagnosisFinder.tsx: Add Farrington's section (amber-styled, labeled) to each matched remedy card, pulling from the remedy's farrington data in remedyDatabase.ts
- Remedies.tsx: Convert all plain text remedy data fields to bullet/numbered lists using <ul>/<li> or <ol>/<li> tags
- RemedyCompare.tsx: Convert all plain text remedy data fields to bullet/numbered lists
- DiagnosisFinder.tsx: Convert remedy match symptom lists to bullet/numbered format

### Remove
- Nothing removed

## Implementation Plan
1. In DiagnosisFinder.tsx: for each matched remedy card, look up the remedy in remedyDatabase by name and render its farrington data (comparative notes, keynotes, clinical indications) in an amber-highlighted collapsible section labeled "Farrington's CM"
2. Create a shared helper component or utility function `renderAsList(text: string)` that splits text by common delimiters (newlines, semicolons, numbered patterns) and renders as <ol> or <ul> <li> items
3. Apply this list renderer to all remedy data fields in:
   - Remedies.tsx: all tabs (Boericke summary, keynotes, mind, physical, modalities, clinical, rubrics, relationships, farrington)
   - RemedyCompare.tsx: all section rows in the comparison columns
   - DiagnosisFinder.tsx: remedy match symptom text and new Farrington section
4. Validate and build
