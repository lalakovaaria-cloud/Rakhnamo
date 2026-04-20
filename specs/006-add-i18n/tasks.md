# Tasks: Multilingual Support (i18n)

**Input**: Design documents from `/specs/006-add-i18n/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not requested — no test tasks generated (Constitution Principle V).

**Organization**: Tasks grouped by user story for independent implementation and testing.

---

## Phase 1: Setup

**Purpose**: Create the i18n module structure.

- [x] T001 Create directory `application/lib/i18n/`
- [x] T002 Create directory `application/components/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core i18n infrastructure that all user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 [P] Create `application/lib/i18n/ru.ts` — Russian translation catalog (source of truth) with all `TranslationKey` strings for all 8 routes
- [x] T004 [P] Create `application/lib/i18n/en.ts` — English translation catalog matching all keys from `ru.ts`
- [x] T005 [P] Create `application/lib/i18n/tg.ts` — Tajik translation catalog matching all keys from `ru.ts`
- [x] T006 Create `application/lib/i18n/index.ts` — define `LanguageCode` type, `TranslationKey` union, `LanguageContext`, `LanguageProvider` component (reads/writes `localStorage` key `rakhnamo_lang`, defaults to `'ru'`), and `useTranslation` hook (depends on T003–T005)

**Checkpoint**: Foundation ready — `useTranslation` importable and functional.

---

## Phase 3: User Story 1 — Language Switcher on Every Page (Priority: P1) 🎯 MVP

**Goal**: User can switch language from any page and UI updates immediately.

**Independent Test**: Open any page, tap РУ / EN / ТҶ, verify all visible text changes without page reload.

- [x] T007 [US1] Create `application/components/LanguageSwitcher.tsx` — render three buttons (РУ / EN / ТҶ), active language highlighted with accent color, inactive muted (`#8b9bb4`), min 44px tap height, fits `max-w-sm` (depends on T006)
- [x] T008 [US1] Update `application/app/layout.tsx` — wrap children with `<LanguageProvider>` from `lib/i18n/index.ts`, add `<LanguageSwitcher />` visible on every page (depends on T006, T007)
- [x] T009 [P] [US1] Update `application/app/page.tsx` (role selection) — replace hardcoded strings with `t('role.*')` keys via `useTranslation` (depends on T006)
- [x] T010 [P] [US1] Update `application/app/home/page.tsx` — replace hardcoded strings with `t('home.*')` keys (depends on T006)
- [x] T011 [P] [US1] Update `application/app/roadmap/page.tsx` — replace hardcoded strings with `t('roadmap.*')` keys (depends on T006)
- [x] T012 [P] [US1] Update `application/app/scholarships/page.tsx` — replace hardcoded strings with `t('scholarships.*')` keys (depends on T006)
- [x] T013 [P] [US1] Update `application/app/documents/page.tsx` — replace hardcoded strings with `t('documents.*')` keys (depends on T006)
- [x] T014 [P] [US1] Update `application/app/deadlines/page.tsx` — replace hardcoded strings with `t('deadlines.*')` keys (depends on T006)
- [x] T015 [P] [US1] Update `application/app/mentors/page.tsx` — replace hardcoded strings with `t('mentors.*')` keys (depends on T006)
- [x] T016 [P] [US1] Update `application/app/mentor-panel/page.tsx` — replace hardcoded strings with `t('mentorPanel.*')` keys (depends on T006)

**Checkpoint**: All 8 routes switch language instantly via the switcher — US1 independently testable.

---

## Phase 4: User Story 2 — Language Persistence (Priority: P2)

**Goal**: Selected language is restored when the app is reopened.

**Independent Test**: Select Tajik, close and reopen the browser — verify app opens in Tajik.

- [x] T017 [US2] Verify `LanguageProvider` in `application/lib/i18n/index.ts` — confirm `useEffect` reads `localStorage.getItem('rakhnamo_lang')` on mount and validates against `LanguageCode` type; invalid/missing values reset to `'ru'`; `setLang` writes to `localStorage` on every call (depends on T006)
- [x] T018 [US2] Verify `LanguageSwitcher.tsx` — confirm active button reflects restored language on initial render, not just after user interaction (depends on T007, T017)

**Checkpoint**: Language survives page refresh and new tab — US2 independently testable.

---

## Phase 5: User Story 3 — Full Translation Coverage (Priority: P3)

**Goal**: Every string on all 8 routes is translated; no raw keys or Russian fallbacks visible in EN/TG.

**Independent Test**: Navigate all 8 routes with English selected — zero untranslated strings visible.

- [x] T019 [US3] Audit `application/lib/i18n/ru.ts` — confirm all user-facing strings from all 8 page files are captured as keys; add any missing keys
- [x] T020 [P] [US3] Complete `application/lib/i18n/en.ts` — ensure every key from `ru.ts` has an English string; no gaps
- [x] T021 [P] [US3] Complete `application/lib/i18n/tg.ts` — ensure every key from `ru.ts` has a Tajik string; no gaps
- [x] T022 [US3] Walk all 8 routes manually in English and Tajik; fix any untranslated strings found (depends on T019–T021)

**Checkpoint**: All 3 languages fully covered on all 8 routes — US3 independently testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T023 Run `npm run lint` in `application/` — fix any ESLint errors introduced by i18n changes
- [x] T024 Run `npm run build` in `application/` — confirm static export succeeds with no TypeScript errors
- [x] T025 Manual smoke test per `specs/006-add-i18n/quickstart.md` — verify all 6 steps pass at `max-w-sm` viewport

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — **blocks all user stories**
- **US1 (Phase 3)**: Depends on Phase 2 — T009–T016 can run in parallel after T006, T007, T008
- **US2 (Phase 4)**: Depends on Phase 2 — T017 is a verification of T006; can run after US1 or in parallel
- **US3 (Phase 5)**: Depends on Phase 3 (all pages must use `t()` before coverage can be audited)
- **Polish (Phase 6)**: Depends on all user story phases

### Parallel Opportunities

```bash
# Phase 2 — catalogs can be written in parallel:
T003 ru.ts   T004 en.ts   T005 tg.ts   (all independent)

# Phase 3 — page updates can run in parallel after T006, T007, T008:
T009 page.tsx   T010 home   T011 roadmap   T012 scholarships
T013 documents  T014 deadlines  T015 mentors  T016 mentor-panel

# Phase 5:
T020 en.ts   T021 tg.ts   (independent)
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Phase 1: Setup
2. Phase 2: Foundational (T003–T006)
3. Phase 3: US1 (T007–T016)
4. **STOP & VALIDATE**: Switch language on every page, verify instant update
5. Ship — users can switch language even before persistence is wired

### Incremental Delivery

1. Phase 1 + 2 → i18n module ready
2. Phase 3 → language switcher on all pages (**MVP**)
3. Phase 4 → language persists across sessions
4. Phase 5 → full translation coverage
5. Phase 6 → lint + build + smoke test ✅

---

## Notes

- `[P]` = parallelizable (different files, no shared dependencies)
- `[USN]` = maps task to user story N for traceability
- No test tasks — Constitution Principle V: no test suite
- Mentor names and proper nouns are **not** translated (see Assumptions in spec.md)
- Total tasks: **25** across 6 phases
