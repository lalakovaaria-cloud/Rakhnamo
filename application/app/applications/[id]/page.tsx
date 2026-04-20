"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/app/components/AppHeader";
import { SCHOLARSHIPS } from "@/lib/scholarships";
import { APPLICATION_STAGES, localizeScholarship } from "@/lib/types";
import type { Application } from "@/lib/types";
import {
  getApplication, advanceStage,
  toggleDocument, toggleUploadedFile, withdrawApplication,
} from "@/lib/storage";
import { useTranslation } from "@/lib/i18n";

export default function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { lang, t } = useTranslation();
  const scholarshipId = Number(id);
  const rawScholarship = SCHOLARSHIPS.find((s) => s.id === scholarshipId);
  const scholarship = rawScholarship ? localizeScholarship(rawScholarship, lang) : null;
  const [app, setApp] = useState<Application | null>(null);
  const [tab, setTab] = useState<"stages" | "docs" | "files">("stages");

  useEffect(() => {
    setApp(getApplication(scholarshipId));
  }, [scholarshipId]);

  function refresh() { setApp(getApplication(scholarshipId)); }

  if (!scholarship || !app) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-main)" }}>
        <p className="t-muted">{t("app.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)" }}>
      <AppHeader />

      {/* Back + title */}
      <div className="px-5 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.push("/home")}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--bg-card2)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold t-primary">{t("app.myApp")}</h1>
          <p className="text-xs t-muted">{scholarship.institution}</p>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-4 pb-10">

        {/* Scholarship title */}
        <div className="rounded-2xl p-4" style={{ background: "var(--bg-card)" }}>
          <span className="text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block"
            style={{ background: "var(--green-dim)", color: "var(--green)" }}>
            {scholarship.category}
          </span>
          <p className="font-bold t-primary leading-snug">{scholarship.title}</p>
        </div>

        {/* Stage progress bar */}
        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)" }}>
          <p className="font-semibold text-sm mb-4 t-primary">{t("app.progress")}</p>
          <div className="flex items-start gap-1 mb-4">
            {APPLICATION_STAGES.map((stage, i) => (
              <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full h-1.5 rounded-full"
                  style={{ background: i <= app.stageIndex ? "var(--green)" : "var(--bg-card2)" }} />
                <span className="text-center leading-tight"
                  style={{ color: i <= app.stageIndex ? "var(--green)" : "var(--text-muted)", fontSize: "9px" }}>
                  {stage}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3"
            style={{ background: "var(--green-dim)" }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--green)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--green)" }}>
              {APPLICATION_STAGES[app.stageIndex]}
            </p>
          </div>
          {app.stageIndex < APPLICATION_STAGES.length - 1 && (
            <button
              onClick={() => { advanceStage(scholarshipId); refresh(); }}
              className="w-full py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "var(--bg-card2)", color: "var(--text-muted)" }}>
              {t("app.nextStage")}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {(["stages", "docs", "files"] as const).map((tabKey) => (
            <button key={tabKey} onClick={() => setTab(tabKey)}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
              style={{
                background: tab === tabKey ? "var(--green)" : "var(--bg-card2)",
                color: tab === tabKey ? "#fff" : "var(--text-muted)",
              }}>
              {tabKey === "stages" ? t("app.tab.stages") : tabKey === "docs" ? t("app.tab.docs") : t("app.tab.files")}
            </button>
          ))}
        </div>

        {/* Stages tab */}
        {tab === "stages" && (
          <div className="space-y-3">
            {APPLICATION_STAGES.map((stage, i) => {
              const done = i <= app.stageIndex;
              const current = i === app.stageIndex;
              return (
                <div key={stage} className="flex items-center gap-4 rounded-2xl px-4 py-3"
                  style={{ background: "var(--bg-card)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm border-2"
                    style={{
                      borderColor: done ? "var(--green)" : "var(--bg-card2)",
                      background: done ? "var(--green)" : "var(--bg-main)",
                      color: done ? "#fff" : "var(--text-muted)",
                    }}>
                    {done ? "✓" : i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: done ? "var(--text-primary)" : "var(--text-muted)" }}>
                      {stage}
                    </p>
                    {current && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--green)" }}>{t("app.currentStage")}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Docs tab */}
        {tab === "docs" && (
          <div className="space-y-2">
            {scholarship.documents.map((doc) => {
              const checked = app.checkedDocs.includes(doc);
              return (
                <button key={doc}
                  onClick={() => { toggleDocument(scholarshipId, doc); refresh(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left"
                  style={{ background: "var(--bg-card)" }}>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: checked ? "var(--green)" : "var(--text-muted)" }}>
                    {checked && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--green)" }} />}
                  </div>
                  <span className="text-sm t-primary">{doc}</span>
                </button>
              );
            })}
            <p className="text-xs text-center pt-1 t-muted">
              {t("app.docs.count", { done: String(app.checkedDocs.length), total: String(scholarship.documents.length) })}
            </p>
          </div>
        )}

        {/* Files tab */}
        {tab === "files" && (
          <div className="space-y-2">
            {scholarship.requiredFiles.map((file) => {
              const uploaded = app.uploadedFiles.includes(file.name);
              return (
                <button key={file.name}
                  onClick={() => { toggleUploadedFile(scholarshipId, file.name); refresh(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "var(--bg-card)" }}>
                  <span className="text-xl">{file.icon}</span>
                  <span className="text-sm t-primary flex-1 text-left">{file.name}</span>
                  {uploaded
                    ? <span className="text-xs font-semibold" style={{ color: "var(--green)" }}>{t("app.file.uploaded")}</span>
                    : <span className="text-xs t-muted">{t("app.file.upload")}</span>}
                </button>
              );
            })}
            <p className="text-xs text-center pt-1 t-muted">
              {t("app.files.count", { done: String(app.uploadedFiles.length), total: String(scholarship.requiredFiles.length) })}
            </p>
          </div>
        )}

        {/* Withdraw */}
        <button
          onClick={() => { withdrawApplication(scholarshipId); router.push("/home"); }}
          className="w-full py-3 rounded-2xl text-sm font-semibold"
          style={{ background: "var(--bg-card2)", color: "var(--text-muted)" }}>
          {t("app.withdraw")}
        </button>
      </div>
    </div>
  );
}
