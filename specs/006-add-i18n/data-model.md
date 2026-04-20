# Data Model: Multilingual Support (i18n)

**Branch**: `006-add-i18n` | **Date**: 2026-04-20

## Entities

### LanguageCode

The set of supported language identifiers.

```typescript
type LanguageCode = 'ru' | 'en' | 'tg';
```

**Constraints**:
- Exactly 3 valid values
- `'ru'` is the default and source-of-truth language

---

### TranslationCatalog

A flat key→string map for all user-facing strings in one language.

```typescript
type TranslationKey =
  // Navigation / common
  | 'nav.home' | 'nav.roadmap' | 'nav.scholarships'
  | 'nav.documents' | 'nav.deadlines' | 'nav.mentors'
  // Role selection page
  | 'role.title' | 'role.applicant' | 'role.mentor'
  // Home page
  | 'home.greeting' | 'home.roadmap' | 'home.scholarships'
  | 'home.documents' | 'home.deadlines' | 'home.mentors'
  // Roadmap page
  | 'roadmap.title' | 'roadmap.step' | 'roadmap.completed'
  // Scholarships page
  | 'scholarships.title' | 'scholarships.amount' | 'scholarships.deadline'
  // Documents page
  | 'documents.title' | 'documents.required' | 'documents.optional'
  // Deadlines page
  | 'deadlines.title' | 'deadlines.remaining'
  // Mentors page
  | 'mentors.title' | 'mentors.contact' | 'mentors.specialty'
  // Mentor panel
  | 'mentorPanel.title' | 'mentorPanel.students' | 'mentorPanel.sessions'
  // Language switcher
  | 'lang.ru' | 'lang.en' | 'lang.tg';

type TranslationCatalog = Record<TranslationKey, string>;
```

**Constraints**:
- All keys defined in `ru.ts` (source of truth)
- `en.ts` and `tg.ts` may be partial — missing keys fall back to Russian
- No nested objects — flat structure for simplicity

---

### LanguageContext

The React context value shared across the app.

```typescript
interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (code: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}
```

**Fields**:
- `lang` — currently active language code
- `setLang` — updates active language and persists to localStorage
- `t` — translation lookup function; falls back to Russian, then to the key itself

---

### LanguagePreference (Persistent)

Stored in browser localStorage.

| Field | Type | Value |
|-------|------|-------|
| Key | string | `"rakhnamo_lang"` |
| Value | LanguageCode | `"ru"` \| `"en"` \| `"tg"` |
| Default | — | `"ru"` |

**Validation**: On read, if the stored value is not a valid `LanguageCode`, reset to `"ru"`.
