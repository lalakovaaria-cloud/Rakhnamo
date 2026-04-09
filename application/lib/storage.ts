// ============================================================
// Storage service — localStorage adapter.
// Each function signature intentionally mirrors the future
// Go/Supabase REST API so replacing localStorage with fetch()
// calls requires minimal refactoring.
// ============================================================

import type { User, Application, UserProfile } from "./types";

const PROFILE_KEY = "rakhnamo_profile";

function uuid(): string {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ── Profile ──────────────────────────────────────────────────

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as UserProfile; } catch { return null; }
}

function saveProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

// ── User ─────────────────────────────────────────────────────

export function getUser(): User | null {
  return getProfile()?.user ?? null;
}

/** Creates or updates the user. Returns the saved user. */
export function upsertUser(data: Pick<User, "name" | "city">): User {
  const existing = getProfile();
  const user: User = {
    id: existing?.user.id ?? uuid(),
    name: data.name,
    city: data.city ?? "",
    createdAt: existing?.user.createdAt ?? new Date().toISOString(),
  };
  saveProfile({
    user,
    applications: existing?.applications ?? [],
    savedIds: existing?.savedIds ?? [],
  });
  return user;
}

// ── Saved / bookmarked scholarships ──────────────────────────

export function getSavedIds(): number[] {
  return getProfile()?.savedIds ?? [];
}

export function toggleSaved(scholarshipId: number): number[] {
  const profile = getProfile() ?? {
    user: { id: uuid(), name: "", city: "", createdAt: new Date().toISOString() },
    applications: [],
    savedIds: [],
  };
  const saved = profile.savedIds.includes(scholarshipId)
    ? profile.savedIds.filter((id) => id !== scholarshipId)
    : [...profile.savedIds, scholarshipId];
  saveProfile({ ...profile, savedIds: saved });
  return saved;
}

// ── Applications ─────────────────────────────────────────────

export function getApplications(): Application[] {
  return getProfile()?.applications ?? [];
}

export function getApplication(scholarshipId: number): Application | null {
  return getApplications().find((a) => a.scholarshipId === scholarshipId) ?? null;
}

export function isApplied(scholarshipId: number): boolean {
  return !!getApplication(scholarshipId);
}

/**
 * Creates a new application for the given scholarship.
 * No-op if an application already exists.
 */
export function applyToScholarship(
  scholarshipId: number,
  scholarshipTitle: string,
  institution: string,
  userId: string
): Application {
  const existing = getApplication(scholarshipId);
  if (existing) return existing;

  const app: Application = {
    id: uuid(),
    userId,
    scholarshipId,
    scholarshipTitle,
    institution,
    appliedAt: new Date().toISOString(),
    stageIndex: 0,
    checkedDocs: [],
    uploadedFiles: [],
  };

  const profile = getProfile()!;
  saveProfile({ ...profile, applications: [...profile.applications, app] });
  return app;
}

/** Removes an application (withdraw). */
export function withdrawApplication(scholarshipId: number): void {
  const profile = getProfile();
  if (!profile) return;
  saveProfile({
    ...profile,
    applications: profile.applications.filter((a) => a.scholarshipId !== scholarshipId),
  });
}

/** Advances the application to the next stage. */
export function advanceStage(scholarshipId: number): Application | null {
  return updateApplication(scholarshipId, (app) => ({
    ...app,
    stageIndex: Math.min(app.stageIndex + 1, 3),
  }));
}

/** Toggles a document as checked/unchecked in the checklist. */
export function toggleDocument(scholarshipId: number, docName: string): Application | null {
  return updateApplication(scholarshipId, (app) => {
    const checked = app.checkedDocs.includes(docName)
      ? app.checkedDocs.filter((d) => d !== docName)
      : [...app.checkedDocs, docName];
    return { ...app, checkedDocs: checked };
  });
}

/** Marks/unmarks a required file as uploaded. */
export function toggleUploadedFile(scholarshipId: number, fileName: string): Application | null {
  return updateApplication(scholarshipId, (app) => {
    const uploaded = app.uploadedFiles.includes(fileName)
      ? app.uploadedFiles.filter((f) => f !== fileName)
      : [...app.uploadedFiles, fileName];
    return { ...app, uploadedFiles: uploaded };
  });
}

// ── Internal helper ───────────────────────────────────────────

function updateApplication(
  scholarshipId: number,
  updater: (app: Application) => Application
): Application | null {
  const profile = getProfile();
  if (!profile) return null;
  const idx = profile.applications.findIndex((a) => a.scholarshipId === scholarshipId);
  if (idx === -1) return null;
  const updated = updater(profile.applications[idx]);
  const applications = [...profile.applications];
  applications[idx] = updated;
  saveProfile({ ...profile, applications });
  return updated;
}
