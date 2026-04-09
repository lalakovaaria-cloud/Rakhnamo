# Research: Frontend Redesign

**Branch**: `001-frontend-redesign` | **Date**: 2026-04-09

## Finding 1: Current vs Target Design Gap

**Decision**: Only `home/page.tsx` needs major changes. The other pages need minor alignment.

**Rationale**: Comparing the UI screenshots to the existing code:

| Element | Screenshot | Current `home/page.tsx` | Gap |
|---------|-----------|------------------------|-----|
| RAKHNAMO green header | ✅ | ✅ present | None |
| Filter chips (All/…) | ✅ | ✅ present | None |
| Cards with badge + star + Learn More | ✅ | ✅ present | None |
| Bottom nav bar | ✅ | ✅ present | None |
| "Learn More" opens modal | ✅ | ❌ navigates to route | **Missing** |
| Deadline countdown in modal | ✅ | ❌ | **Missing** |
| Document checklist in modal | ✅ | ❌ | **Missing** |
| Required files list in modal | ✅ | ❌ | **Missing** |
| APPLY NOW button | ✅ | ❌ | **Missing** |

`scholarships/page.tsx` and `deadlines/page.tsx` are missing the bottom nav bar and have slightly different card styling — minor alignment needed.

**Alternatives considered**: Creating a new route `/scholarships/[id]` — rejected because the design clearly shows a modal overlay, not a page navigation.

---

## Finding 2: Modal Implementation Pattern

**Decision**: Inline modal in `home/page.tsx` using `useState` for selected item + fixed overlay div.

**Rationale**:
- All existing pages use `"use client"` with `useState` — no new patterns needed.
- No component folder exists; all UI is inline. Keeping modal inline matches conventions.
- A fixed overlay (`position: fixed, inset: 0`) with a slide-up inner panel matches the screenshot (modal covers the screen, shows institution name at top, × button, scrollable content).
- Static export compatible — no server-side state needed.

**Alternatives considered**: Separate `DetailModal.tsx` component — rejected to avoid introducing a new pattern not present elsewhere in the codebase.

---

## Finding 3: Data Model Extension

**Decision**: Extend the hardcoded `items` array in `home/page.tsx` to include `deadline`, `daysLeft`, `hoursLeft`, `documents` (string[]), and `requiredFiles` ({icon, name}[]).

**Rationale**:
- Deadlines page already has `daysLeft` on each item — same pattern applies here.
- Document checklist and required files are shown per scholarship in the screenshots.
- No backend means all data is hardcoded — consistent with existing approach.

---

## Finding 4: Modal Visual Spec (from screenshots)

| Element | Design detail |
|---------|--------------|
| Modal backdrop | `rgba(0,0,0,0.7)` overlay |
| Modal panel | `#111827` background, rounded top corners (`rounded-t-3xl`), full width |
| Institution name | white text, top-left |
| Close button | `#1a2235` circular button, top-right, × symbol |
| Countdown number | `~text-6xl font-bold`, color `#22c55e` |
| "Days Remaining" | white, medium weight |
| Hours/minutes | `#8b9bb4`, smaller |
| "Application Deadline" label | `#8b9bb4`, above the number |
| Document checklist items | circular outline checkbox + text, `#1a2235` background row |
| Required files cards | `#1a2235` rounded card, emoji icon left, filename text |
| APPLY NOW button | full-width, `#22c55e` background, rounded-xl, white text, bold |
