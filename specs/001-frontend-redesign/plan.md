# Implementation Plan: Frontend Redesign

**Branch**: `001-frontend-redesign` | **Date**: 2026-04-09 | **Spec**: [spec.md](./spec.md)

## Summary

The new design is already ~80% implemented in `application/app/home/page.tsx` (RAKHNAMO header, filter chips, cards, bottom nav). The one missing piece is a **detail modal** that slides up when the user taps "Learn More" — showing a deadline countdown, document checklist, and required files list with a green "APPLY NOW" button.

## Technical Context

**Language/Version**: TypeScript (React 19 / Next.js 16)  
**Primary Dependencies**: Tailwind 4, inline `style` props (no component library)  
**Storage**: N/A — all data hardcoded as static arrays in page files  
**Testing**: None (no tests exist in this project)  
**Target Platform**: Static site, mobile-first (max-w-sm, 375px)  
**Project Type**: Next.js App Router static export → GitHub Pages  
**Performance Goals**: Instant modal open (no network), 60fps animation  
**Constraints**: No backend, no external API, static export compatible  
**Scale/Scope**: ~5 hardcoded items per page, single-user mobile app

## Constitution Check

No constitution defined for this project — gate skipped.

## Project Structure

### Documentation (this feature)

```text
specs/001-frontend-redesign/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
└── checklists/
    └── requirements.md
```

### Source Code (files to modify)

```text
application/app/home/page.tsx        ← PRIMARY: add modal state + data + modal UI
application/app/scholarships/page.tsx ← add bottom nav + align card style
application/app/deadlines/page.tsx   ← add bottom nav + align card style
```

No new files are needed — the modal lives inline in `home/page.tsx`, consistent with the existing pattern of no separate components.

## Phase 0: Research

See [research.md](./research.md)

## Phase 1: Design

See [data-model.md](./data-model.md)
