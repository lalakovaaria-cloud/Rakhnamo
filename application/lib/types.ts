// ============================================================
// Core domain types — shared between frontend (localStorage)
// and future Go + Supabase backend.
// Keep this file in sync with backend/models.go
// ============================================================

export interface User {
  id: string;           // uuid (localStorage: generated once)
  name: string;
  city?: string;
  createdAt: string;    // ISO 8601
}

export interface RequiredFile {
  icon: string;
  name: string;
}

type I18nString = { ru: string; en: string; tg: string };
type I18nStrings = { ru: string[]; en: string[]; tg: string[] };

export type CategoryKey = "foreign" | "local";

export interface Scholarship {
  id: number;
  type: I18nString;
  categoryKey: CategoryKey;
  category: I18nString;
  title: string;
  desc: I18nString;
  institution: I18nString;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  documents: I18nStrings;
  requiredFiles: RequiredFile[];
}

export type LanguageCode = "ru" | "en" | "tg";

export interface LocalizedScholarship {
  id: number;
  type: string;
  categoryKey: CategoryKey;
  category: string;
  title: string;
  desc: string;
  institution: string;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  documents: string[];
  requiredFiles: RequiredFile[];
}

export function localizeScholarship(s: Scholarship, lang: LanguageCode): LocalizedScholarship {
  return {
    ...s,
    type: s.type[lang] ?? s.type.ru,
    category: s.category[lang] ?? s.category.ru,
    desc: s.desc[lang] ?? s.desc.ru,
    institution: s.institution[lang] ?? s.institution.ru,
    documents: s.documents[lang] ?? s.documents.ru,
  };
}

// Application stages in order
export const APPLICATION_STAGES = [
  "Подготовка",
  "Документы отправлены",
  "На рассмотрении",
  "Решение получено",
] as const;

export type ApplicationStage = typeof APPLICATION_STAGES[number];

export interface Application {
  id: string;              // uuid
  userId: string;
  scholarshipId: number;
  scholarshipTitle: string;
  institution: string;
  appliedAt: string;       // ISO 8601
  stageIndex: number;      // 0–3, index into APPLICATION_STAGES
  checkedDocs: string[];   // document names marked as ready
  uploadedFiles: string[]; // required file names marked as uploaded
}

export interface UserProfile {
  user: User;
  applications: Application[];
  savedIds: number[];
}
