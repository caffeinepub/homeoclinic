# HomeoClinic

## Current State

Full homeopathic clinic management app with:
- Patient registration, year-wise filtering, search
- Full case sheet (14 sections), prescriptions, follow-ups
- Remedy reference with Boericke/Synoptic Key data and relationship charts
- Appointments log, memo pad, dashboard

**Bug**: `registerPatient`, `updatePatient`, and `deletePatient` backend functions require `#admin` permission. This means a logged-in user cannot register patients because they are assigned `#user` role, not `#admin`. The result is an "Unauthorized" error when trying to register a patient.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- `registerPatient`: change permission check from `#admin` to `#user` so any logged-in user can register patients
- `updatePatient`: change permission check from `#admin` to `#user`
- `deletePatient`: change permission check from `#admin` to `#user`
- Keep `addRemedy`, `updateRemedy`, `deleteRemedy` as admin-only (reference data management)

### Remove
- Nothing

## Implementation Plan

1. Regenerate backend Motoko with corrected permission levels:
   - Patient CRUD (register, update, delete): `#user` permission
   - Remedy CRUD (add, update, delete): `#admin` permission (unchanged)
   - All other operations unchanged
2. No frontend changes needed -- the frontend code is already correct
