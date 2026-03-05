# HomeoClinic

## Current State
- Full-stack homeopathic clinical management app with patient registry, case sheets, remedy reference, appointments, memos, and dashboard.
- UI is hardcoded to a light theme (white backgrounds, oklch blues/greens) with a dark sidebar in `AppLayout.tsx`.
- No theme toggle exists anywhere in the app.
- Layout uses inline oklch style overrides throughout all pages (Dashboard, Patients, AppLayout, etc.) rather than CSS variables or a theme context.
- Sidebar is fixed dark (oklch(0.13 0.008 240)) regardless of any preference.
- No Settings/Profile page exists.

## Requested Changes (Diff)

### Add
- `ThemeContext` (React context + provider) that stores `theme: "light" | "dark"` in localStorage so it persists across sessions.
- A `Settings` page accessible from the sidebar (new nav item with a Settings/gear icon).
- Light/dark theme toggle on the Settings page using a Switch or Toggle control.
- Dark theme CSS variable set: dark navy/grey backgrounds, light text, appropriate borders and card surfaces.
- Light theme CSS variable set: clean clinical whites, blues, greens (matches current look).
- Apply theme class (`dark` or `light`) to the root `<html>` or `<body>` element so all Tailwind dark: variants work.

### Modify
- `AppLayout.tsx`: wrap app in `ThemeProvider`; sidebar and layout backgrounds should respond to theme via CSS variables or Tailwind dark: classes instead of hardcoded oklch values.
- `index.css` (or equivalent): define `--background`, `--foreground`, `--card`, `--border`, `--muted`, `--accent` etc. for both light and dark themes using oklch color values.
- All page components (Dashboard, Patients, Remedies, Appointments, Memos, CaseSheet, PatientDetail): replace hardcoded oklch inline style colors with CSS variable references or Tailwind semantic classes so they automatically respond to theme switching.
- `App.tsx`: add route for `/settings` pointing to the new Settings page.
- Sidebar nav: add a Settings nav item linking to `/settings`.
- Overall layout: improve spacing, card padding, section headers, and visual hierarchy across all pages for a more polished professional feel.

### Remove
- No features removed.

## Implementation Plan
1. Add `ThemeContext` with localStorage persistence and a `useTheme` hook.
2. Define CSS variables for light and dark themes in `index.css` using oklch values.
3. Update `AppLayout.tsx` to use `ThemeProvider` and apply `dark` class to root; update sidebar to use CSS variable colors.
4. Create `Settings.tsx` page with a theme toggle (Switch), profile info display, and clean layout.
5. Add `/settings` route in `App.tsx` and Settings nav item in sidebar.
6. Refactor all page components to use CSS variable-based colors (`bg-background`, `text-foreground`, `border-border`, `bg-card`, etc.) instead of hardcoded inline oklch values.
7. Improve overall layout: better card borders, consistent padding, cleaner section headers, improved visual hierarchy on all pages.
8. Validate with typecheck, lint, and build.
