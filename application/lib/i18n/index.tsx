"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import ru, { type TranslationKey } from "./ru";
import en from "./en";
import tg from "./tg";

export type { TranslationKey };
export type LanguageCode = "ru" | "en" | "tg";

const STORAGE_KEY = "rakhnamo_lang";
const VALID_CODES: LanguageCode[] = ["ru", "en", "tg"];
const CATALOGS: Record<LanguageCode, Partial<Record<TranslationKey, string>>> = { ru, en, tg };

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (code: LanguageCode) => void;
  t: (key: TranslationKey, vars?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("ru");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (VALID_CODES as string[]).includes(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored as LanguageCode);
    }
  }, []);

  const setLang = (code: LanguageCode) => {
    setLangState(code);
    localStorage.setItem(STORAGE_KEY, code);
  };

  const t = (key: TranslationKey, vars?: Record<string, string>): string => {
    const str = CATALOGS[lang][key] ?? CATALOGS.ru[key] ?? key;
    if (!vars) return str;
    return Object.entries(vars).reduce(
      (acc, [k, v]) => acc.replace(`{${k}}`, v),
      str
    );
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used inside LanguageProvider");
  return ctx;
}
