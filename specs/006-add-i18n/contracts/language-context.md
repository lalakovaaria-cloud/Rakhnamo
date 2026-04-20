# Contract: LanguageContext

**File**: `application/lib/i18n/index.ts`

## Exports

### `LanguageProvider`

React context provider. Wraps the app at root layout level.

```typescript
function LanguageProvider({ children }: { children: React.ReactNode }): JSX.Element
```

**Behavior**:
- Reads `localStorage.getItem('rakhnamo_lang')` on mount
- Validates stored value is a valid `LanguageCode`; falls back to `'ru'`
- Provides `lang`, `setLang`, `t` via context

---

### `useTranslation`

Hook for consuming translations in any page or component.

```typescript
function useTranslation(): {
  t: (key: TranslationKey) => string;
  lang: LanguageCode;
  setLang: (code: LanguageCode) => void;
}
```

**Behavior**:
- Must be called inside `LanguageProvider`
- `t(key)` lookup order: active language catalog → Russian catalog → key string
- `setLang(code)` updates state and writes to `localStorage`

**Error**: Throws if called outside `LanguageProvider`.
