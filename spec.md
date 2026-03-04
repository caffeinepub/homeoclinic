# HomeoClinic

## Current State
Full-stack homeopathic clinical management app with patient registration, HMCC-format case sheets, prescriptions with remedy suggestion popups, follow-ups, 43+ polychrest remedy reference, appointments, memo pad, and dashboard.

Critical bug: The authorization component uses `Runtime.trap("User is not registered")` for any new login, blocking all users from doing anything.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Remove the authorization component entirely. Replace all permission checks with a simple anonymous-user check: only block `caller.isAnonymous()`. Any authenticated principal (non-anonymous) can do everything.

### Remove
- All `AccessControl.hasPermission(...)` guards replaced with simple `if (caller.isAnonymous()) { Runtime.trap("Must be logged in") }` checks.
- No more `include MixinAuthorization` or `AccessControl` imports.

## Implementation Plan
1. Regenerate backend WITHOUT the authorization component. Every endpoint just checks `caller.isAnonymous()` and traps if true. All authenticated callers get full access.
2. Keep all existing data models and endpoints identical (Patient, CaseSheet, Prescription, FollowUp, Appointment, Memo).
3. No frontend changes needed.
