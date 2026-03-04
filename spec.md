# HomeoClinic

## Current State
Full homeopathic clinical management app with patient management, case sheets (HMCC format), prescriptions with remedy suggestion popups, follow-ups, appointments, memos, remedy reference (43 polychrest remedies), and a light theme UI.

The backend uses an authorization system where new users must be registered via `_initializeAccessControlWithSecret` before they can access any functions. The `getUserRole` function currently traps with "User is not registered" for any unknown principal, which blocks new users from registering patients if initialization has not completed or if there is any timing issue.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Fix the access control so that any authenticated (non-anonymous) principal that is not yet registered is automatically registered as a `#user` role on their first call, instead of trapping. This eliminates the "User is not registered" error that prevents new patient registration.

### Remove
- Nothing

## Implementation Plan
1. Regenerate backend with updated `getUserRole` logic: if principal is not found in userRoles map, auto-register them as `#user` and return `#user` instead of calling `Runtime.trap`.
2. All other backend logic (patients, case sheets, prescriptions, follow-ups, appointments, memos, remedy reference) remains unchanged.
3. No frontend changes needed.
