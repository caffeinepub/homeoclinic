# HomeoClinic

## Current State
Full homeopathic clinical management app with patient registry, HMCC-format case sheets, prescriptions, follow-ups, appointments, memos, and remedy reference (43+ polychrest remedies). Access control uses an authorization mixin where `getUserRole` traps with "User is not registered" when an unrecognized principal calls any backend function -- blocking all new logins from doing anything.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- `access-control.mo`: Change `getUserRole` so that when a principal is not found in the userRoles map, instead of calling `Runtime.trap("User is not registered")`, it auto-registers the caller as `#user` and returns `#user`. This means any authenticated (non-anonymous) principal gets immediate access without needing to call `_initializeAccessControlWithSecret` first.

### Remove
- Nothing

## Implementation Plan
1. Regenerate the Motoko backend with the same data model and all the same functions, but with the access control logic changed so unregistered authenticated users are automatically granted `#user` role on first access (no trapping). The `hasPermission` check should only block anonymous (unauthenticated) callers.
