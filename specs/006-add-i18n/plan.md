# Implementation Plan: Multilingual Support (i18n)

**Branch**: `006-add-i18n` | **Date**: 2026-04-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-add-i18n/spec.md`

## Summary

Add three-language support (Russian, English, Tajik) to Rakhnamo via a React Context provider and static translation catalogs. No external i18n library — all strings hardcoded as typed TypeScript objects. A `LanguageSwitcher` component added to the shared layout persists the selected language in localStorage.

## Technical Context

**Language/Version**: TypeScript 5 / React 19 / Next.js 16
**Primary Dependencies**: React Context API (built-in) — no new packages
**Storage**: `localStorage` (browser key `rakhnamo_lang`)
**Testing**: N/A — no test suite (Constitution Principle V)
**Target Platform**: Web browser, mobile-first (`max-w-sm`)
**Project Type**: Static web app (Next.js static export)
**Performance Goals**: Language switch renders in under 100ms (synchronous state update)
**Constraints**: No external i18n library; static export compatible; must fit `max-w-sm` layout
**Scale/Scope**: 3 languages × 8 routes × ~100 string keys

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First | ✅ PASS | LanguageSwitcher designed for `max-w-sm`; 44px tap targets |
| II. Static Export | ✅ PASS | localStorage and React Context are client-side only; no SSR needed |
| III. Hardcoded Content | ✅ PASS | Translation catalogs are static TypeScript objects in `lib/i18n/` |
| IV. Russian/Tajik UI | ✅ PASS | Russian and Tajik remain; English added as third option |
| V. No Test Suite | ✅ PASS | No test infrastructure introduced |
| VI. Simplicity | ✅ PASS | React Context + static objects; no i18next, next-intl, or similar library |

**Gate result: ALL PASS — proceed to Phase 0.**

## Project Structure

### Documentation (this feature)

```text
specs/006-add-i18n/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── language-context.md
│   └── language-switcher.md
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code

```text
application/
├── app/
│   ├── layout.tsx                  # Wrap with LanguageProvider; add LanguageSwitcher
│   ├── home/page.tsx               # Use useTranslation hook
│   ├── roadmap/page.tsx
│   ├── scholarships/page.tsx
│   ├── documents/page.tsx
│   ├── deadlines/page.tsx
│   ├── mentors/page.tsx
│   ├── mentor-panel/page.tsx
│   └── page.tsx                    # Role selection page
├── lib/
│   └── i18n/
│       ├── index.ts                # LanguageProvider, useLanguage, useTranslation
│       ├── ru.ts                   # Russian catalog (source of truth)
│       ├── en.ts                   # English catalog
│       └── tg.ts                   # Tajik catalog
└── components/
    └── LanguageSwitcher.tsx        # 3-button selector (РУ / EN / ТЦ)
```

**Structure Decision**: Single app, no backend. Translations live in `lib/i18n/`. All pages import `useTranslation`. Provider added at root layout.

## Complexity Tracking

*No constitution violations — section not applicable.*
