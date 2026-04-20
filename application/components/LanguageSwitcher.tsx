"use client";
import { useTranslation, type LanguageCode } from "@/lib/i18n";

const LANGS: LanguageCode[] = ["ru", "en", "tg"];

export function LanguageSwitcher() {
  const { lang, setLang, t } = useTranslation();
  return (
    <div className="flex gap-1">
      {LANGS.map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className="px-3 font-bold text-xs rounded-full"
          style={{
            minHeight: 44,
            color: lang === code ? "#fff" : "#8b9bb4",
            background: lang === code ? "var(--green)" : "transparent",
          }}>
          {t(`lang.${code}` as Parameters<typeof t>[0])}
        </button>
      ))}
    </div>
  );
}
