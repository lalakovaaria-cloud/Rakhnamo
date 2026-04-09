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

export interface Scholarship {
  id: number;
  type: "Стипендия" | "Дедлайн";
  title: string;
  desc: string;
  institution: string;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  documents: string[];
  requiredFiles: RequiredFile[];
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
