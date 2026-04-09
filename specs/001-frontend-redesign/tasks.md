# Tasks: Frontend Redesign

**Input**: Design documents from `/specs/001-frontend-redesign/`
**Prerequisites**: plan.md ✓, spec.md ✓, data-model.md ✓, research.md ✓

## Implementation Strategy

MVP = Phase 3 (US2 modal) — the card list (US1) and bottom nav (US3) are already implemented in `home/page.tsx`. The foundational phase extends the data model so the modal has content to display.

## Dependencies

```
Phase 2 (data) → Phase 3 (modal) → Phase 4 (nav alignment on other pages)
```

---

## Phase 1: Setup

*No new dependencies or files needed — modal lives inline, consistent with existing patterns.*

- [x] T001 Confirm `application/app/home/page.tsx` compiles without errors before making changes (`cd application && npm run build`)

---

## Phase 2: Foundational — Extend Data Model

- [x] T002 Extend the `items` array in `application/app/home/page.tsx` — add `institution`, `daysLeft`, `hoursLeft`, `documents: string[]`, and `requiredFiles: {icon: string, name: string}[]` fields to all 5 items, using realistic hardcoded values matching the UI screenshots
- [x] T003 Add `useState<typeof items[0] | null>` modal state — `const [selected, setSelected] = useState(null)` — in `application/app/home/page.tsx`

---

## Phase 3: User Story 2 — Scholarship Detail Modal (P1 priority for implementation)

**Story goal**: Tapping "Learn More" opens a full-screen modal with countdown, checklist, required files, and APPLY NOW button.

**Independent test**: Tap "Learn More" on any card → modal opens → shows daysLeft countdown in green → shows document checklist → shows required files → APPLY NOW visible → × closes modal.

- [x] T004 [US2] Replace `<Link href={item.href}>` wrapper around the "Learn More" button with `onClick={() => setSelected(item)}` in `application/app/home/page.tsx`
- [x] T005 [US2] Add modal backdrop — fixed full-screen overlay `<div>` rendered when `selected !== null`, with `onClick={() => setSelected(null)}` to close on backdrop tap, in `application/app/home/page.tsx`
- [x] T006 [US2] Add modal panel inside the backdrop — `#111827` background, `rounded-t-3xl`, fixed bottom-0, full-width, max-w-sm centered, with `stopPropagation` so clicks inside don't close the modal, in `application/app/home/page.tsx`
- [x] T007 [US2] Add modal header row — institution name (white, left) + circular × close button (`#1a2235` bg, white ×, top-right), in the modal panel in `application/app/home/page.tsx`
- [x] T008 [US2] Add countdown block — "Application Deadline" label (`#8b9bb4`), large `daysLeft` number (green `#22c55e`, `text-6xl font-bold`), "Days Remaining" (white), `hoursLeft` formatted as hours/minutes (`#8b9bb4`, small), centered, in the modal panel in `application/app/home/page.tsx`
- [x] T009 [US2] Add Document Checklist section — "Document Checklist" heading (white, bold), then map `selected.documents` into rows: circular outline checkbox + text on `#1a2235` rounded background, in the modal panel in `application/app/home/page.tsx`
- [x] T010 [US2] Add Required Files section — "Required Files" heading (white, bold), then map `selected.requiredFiles` into dark `#1a2235` rounded cards: emoji icon left + filename text, in the modal panel in `application/app/home/page.tsx`
- [x] T011 [US2] Add APPLY NOW button — full-width, `#22c55e` background, `rounded-xl`, white bold text, `py-4`, at the bottom of the modal panel, in `application/app/home/page.tsx`

---

## Phase 4: User Story 3 — Bottom Nav on Other Pages (P2 priority for implementation)

**Story goal**: Bottom nav bar visible on scholarships and deadlines pages.

**Independent test**: Navigate to `/scholarships` and `/deadlines` — bottom nav bar with 4 icons is visible at the bottom.

- [x] T012 [P] [US3] Copy the bottom nav bar block from `application/app/home/page.tsx` into `application/app/scholarships/page.tsx` — add `import Link from "next/link"` if missing, highlight the scholarships icon as active (`stroke="#22c55e"`)
- [x] T013 [P] [US3] Copy the bottom nav bar block from `application/app/home/page.tsx` into `application/app/deadlines/page.tsx` — highlight the deadlines icon as active (`stroke="#22c55e"`)
- [x] T014 [P] [US3] Ensure `pb-24` on the card list container in `application/app/scholarships/page.tsx` so last card clears the nav bar
- [x] T015 [P] [US3] Ensure `pb-24` on the card list container in `application/app/deadlines/page.tsx` so last card clears the nav bar

---

## Phase 5: Polish

- [x] T016 Verify build succeeds with no TypeScript errors (`cd application && npm run build`)
- [x] T017 Verify modal closes correctly on both backdrop tap and × button tap
- [x] T018 Verify bottom nav active icon highlights correctly on each page

---

## Parallel Execution

T012, T013, T014, T015 — marked [P], can run simultaneously (different files).  
T002 must complete before T004–T011 (modal needs data).  
T003 must complete before T004 (modal state needed for onClick).
