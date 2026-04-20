# Quickstart: Multilingual Support (i18n)

**Branch**: `006-add-i18n` | **Date**: 2026-04-20

## Validate the implementation

```bash
cd application

# 1. Start dev server
npm run dev

# 2. Open http://localhost:3000 in a mobile-width browser window (375px)

# 3. Language switcher visible in layout — tap РУ / EN / ТҶ
#    → All page text switches immediately

# 4. Refresh the page
#    → Selected language is restored from localStorage

# 5. Navigate through all routes and verify no untranslated strings:
#    / → /home → /roadmap → /scholarships → /documents → /deadlines → /mentors → /mentor-panel

# 6. Open DevTools → Application → Local Storage
#    → Key: rakhnamo_lang, Value: ru | en | tg

# 7. Production build check
npm run build
#    → Build succeeds with no TypeScript errors (all TranslationKey usages are type-safe)
```

## Adding a new string

1. Add the key to `TranslationKey` union in `lib/i18n/index.ts`
2. Add Russian string to `lib/i18n/ru.ts`
3. Add English string to `lib/i18n/en.ts`
4. Add Tajik string to `lib/i18n/tg.ts`
5. Use `const { t } = useTranslation()` and call `t('your.new.key')` in the component
