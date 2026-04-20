# Research: Multilingual Support (i18n)

**Branch**: `006-add-i18n` | **Date**: 2026-04-20

## Decision 1: i18n Approach — React Context + Static Objects

**Decision**: Implement i18n with a custom React Context provider and hardcoded TypeScript translation objects. No external library.

**Rationale**: The app has ~100 strings across 8 pages. A dedicated i18n library (next-intl, react-i18next) adds bundle weight and configuration complexity that is not justified. A typed TypeScript approach gives full autocomplete on translation keys and compile-time safety for missing keys.

**Alternatives considered**:
- `next-intl` — excellent library but requires extra configuration for static export and adds ~20 KB to bundle. Overkill for this scale.
- `react-i18next` — powerful but heavyweight; designed for apps with hundreds of namespaces.
- Simple object lookup without context — would require prop-drilling through every page component.

---

## Decision 2: Persistence — localStorage

**Decision**: Store the selected language code (`'ru' | 'en' | 'tg'`) in `localStorage` under the key `rakhnamo_lang`.

**Rationale**: The app is a static site with no backend session. `localStorage` is the standard browser persistence mechanism for user preferences; it survives page refreshes and tab closes.

**Alternatives considered**:
- Cookie — works but adds boilerplate for reading/writing without a library.
- URL query param (`?lang=en`) — visible and shareable, but requires routing changes and doesn't persist automatically.
- `sessionStorage` — doesn't survive tab close; not suitable for language preference.

---

## Decision 3: Tajik Script — Cyrillic (no RTL needed)

**Decision**: Tajik UI uses Cyrillic script. No RTL layout changes required.

**Rationale**: Tajikistan officially uses Cyrillic Tajik. The Inter font already loads the `cyrillic` subset (see `layout.tsx`). No additional font loading or layout direction changes needed.

**Alternatives considered**:
- Persian/Arabic script Tajik — not the target; official Tajikistan standard is Cyrillic.

---

## Decision 4: Default Language — Russian

**Decision**: When no language is stored in localStorage, default to Russian (`'ru'`).

**Rationale**: The app targets Tajikistan applicants; Russian is the shared language and the existing UI language.

---

## Decision 5: Missing Translation Fallback — Russian

**Decision**: If a key is missing in `en.ts` or `tg.ts`, fall back to the Russian string from `ru.ts`.

**Rationale**: Russian is the source of truth catalog. This prevents raw key strings from ever appearing in the UI during incremental translation rollout.

**Implementation note**: The `useTranslation` hook returns `ru[key] ?? key` as the final fallback, ensuring graceful degradation even if a key is somehow absent from the Russian catalog too.
