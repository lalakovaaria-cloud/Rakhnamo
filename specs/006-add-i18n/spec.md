# Feature Specification: Multilingual Support (i18n)

**Feature Branch**: `006-add-i18n`
**Created**: 2026-04-20
**Status**: Draft
**Input**: User description: "Добавь перевод на русский английский и таджикский"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Switch App Language (Priority: P1)

A user opens the app and wants to read all content in their preferred language.
They tap a language selector and the entire app UI switches to Russian, English, or Tajik instantly — no page reload required.

**Why this priority**: Core requirement. Without language switching, i18n delivers no value.

**Independent Test**: Open any page, switch language, verify all visible text changes to the selected language.

**Acceptance Scenarios**:

1. **Given** the app is open on any page, **When** the user selects English, **Then** all UI text switches to English immediately.
2. **Given** the user selected Tajik previously, **When** the app is reopened, **Then** the app still shows Tajik.
3. **Given** the user is on the roadmap page, **When** they switch from Russian to English, **Then** roadmap step titles and descriptions appear in English.

---

### User Story 2 — Language Persists Across Sessions (Priority: P2)

The user's chosen language is remembered so they don't need to re-select it on every visit.

**Why this priority**: Without persistence, users must switch language on every visit — poor UX.

**Independent Test**: Select a language, close and reopen the app — verify the selected language is restored.

**Acceptance Scenarios**:

1. **Given** a user selects Tajik, **When** they close and reopen the app, **Then** the app opens in Tajik.
2. **Given** no language has been selected before, **When** the app opens, **Then** it defaults to Russian.

---

### User Story 3 — All Content Translated (Priority: P3)

Every user-facing string across all pages (home, roadmap, scholarships, documents, deadlines, mentors) is available in all three languages.

**Why this priority**: Completeness. P1 and P2 deliver a working switcher; P3 ensures full coverage.

**Independent Test**: Navigate through all 8 routes, verify no untranslated (fallback) strings appear in each language.

**Acceptance Scenarios**:

1. **Given** English is selected, **When** the user visits every page, **Then** no Russian or Tajik text is visible.
2. **Given** a translation key is missing for a language, **Then** the Russian fallback is shown (not a raw key).

---

### Edge Cases

- What happens when the device locale is Tajik but the user has not explicitly selected a language yet? → Default to Russian.
- How does the system handle a missing translation key? → Fall back to Russian string; never show a raw key.
- What if JavaScript is disabled? → N/A — app requires JS (`"use client"`).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST support three languages: Russian (ru), English (en), Tajik (tg).
- **FR-002**: A language selector MUST be accessible from every page.
- **FR-003**: Switching language MUST update all visible text without a full page reload.
- **FR-004**: The selected language MUST be persisted across browser sessions.
- **FR-005**: When no language is stored, the app MUST default to Russian.
- **FR-006**: All user-facing strings on all 8 routes MUST be translated into all three languages.
- **FR-007**: If a translation key is missing for a non-Russian language, the Russian string MUST be used as fallback.
- **FR-008**: The language selector MUST be touch-friendly (minimum 44px tap target) and fit within the `max-w-sm` layout.

### Key Entities

- **Translation Catalog**: A static object mapping language codes (`ru`, `en`, `tg`) to key→string dictionaries, hardcoded in the codebase.
- **Language Preference**: The user's selected language code, persisted in browser storage.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can switch between all three languages in under 2 taps from any page.
- **SC-002**: Language selection persists and is restored correctly on 100% of subsequent visits.
- **SC-003**: All 8 routes render without untranslated strings in any of the three languages.
- **SC-004**: The language selector adds no visible layout shift or overflow in the `max-w-sm` column.

## Assumptions

- All translation content is hardcoded as static objects (no external translation service or CMS).
- The language selector is a simple 3-button or dropdown component — no third-party i18n library required.
- There is no automatic language detection from the browser locale; the default is always Russian.
- Mentor names and other proper nouns are not translated — only UI strings and content descriptions.
- No right-to-left (RTL) layout support is needed for Tajik (Tajik uses Cyrillic script in this context).
