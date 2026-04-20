# Contract: LanguageSwitcher

**File**: `application/components/LanguageSwitcher.tsx`

## Component

```typescript
function LanguageSwitcher(): JSX.Element
```

**Props**: none — reads and writes language via `useTranslation()`.

## Visual Behavior

- Renders 3 buttons: `РУ` / `EN` / `ТҶ`
- Active language button is visually highlighted (accent color)
- Inactive buttons are muted (`#8b9bb4` text)
- All buttons have minimum 44px tap target height
- Total width fits within `max-w-sm` without overflow
- No horizontal scroll introduced

## Interaction

- Tapping a button calls `setLang(code)` immediately
- UI updates synchronously (no loading state needed)
- The selected language persists to localStorage via `setLang`

## Placement

Rendered inside `application/app/layout.tsx`, visible on every page.
