# HomeoClinic

## Current State
Full homeopathic clinical management app with:
- Patient registration, case sheets, prescriptions, follow-ups
- Remedy reference (60+ remedies with Boericke/Synoptic Key data)
- Appointments, memos, doctor settings
- Light/dark theme
- Analyse Case feature with remedy suggestions
- Previous prescriptions table on case sheet

The recurring bug: `access-control.mo` calls `Runtime.trap("User is not registered")` in `getUserRole` when a new principal hasn't been initialized yet. This blocks all operations for new logins.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Fix `getUserRole` in access-control to auto-register new authenticated principals as `#user` instead of trapping -- any non-anonymous principal that isn't in the roles map should be silently added as `#user` and returned

### Remove
- Nothing

## Implementation Plan
1. Regenerate backend with the same data model and API surface as current `main.mo`, but with the access-control fix: in the `getUserRole` function (or equivalent), when a non-anonymous principal is not found in `userRoles`, auto-add them as `#user` and return `#user` instead of trapping.
2. All existing endpoints (patients, case sheets, prescriptions, follow-ups, appointments, memos, user profiles) must be preserved exactly.
3. Keep `requireAuthenticated` logic: only reject anonymous callers.
