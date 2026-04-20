"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SCHOLARSHIPS } from "@/lib/scholarships";
import { localizeScholarship } from "@/lib/types";
import { getUser, upsertUser, isApplied, applyToScholarship, withdrawApplication } from "@/lib/storage";
import { AppHeader } from "@/app/components/AppHeader";
import { NameModal } from "@/app/components/NameModal";
import { PlanCards } from "@/app/components/PlanCards";
import { useTranslation } from "@/lib/i18n";

export default function ScholarshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { lang, t } = useTranslation();
  const rawScholarship = SCHOLARSHIPS.find((s) => s.id === Number(id));
  const scholarship = rawScholarship ? localizeScholarship(rawScholarship, lang) : null;
  const [applied, setApplied] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  useEffect(() => {
    if (scholarship) setApplied(isApplied(scholarship.id));
  }, [scholarship]);

  function handleApply() {
    if (!scholarship) return;
    const user = getUser();
    if (!user) { setShowNameModal(true); return; }
    applyToScholarship(scholarship.id, scholarship.title, scholarship.institution, user.id);
    router.push(`/applications/${scholarship.id}`);
  }

  function handleNameSave(name: string) {
    if (!scholarship) return;
    const user = upsertUser({ name, city: "" });
    setShowNameModal(false);
    applyToScholarship(scholarship.id, scholarship.title, scholarship.institution, user.id);
    router.push(`/applications/${scholarship.id}`);
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-main)" }}>
        <p className="t-muted">{t("scholarship.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)" }}>
      {showNameModal && <NameModal onSave={handleNameSave} />}
      <AppHeader />

      {/* Back + title */}
      <div className="px-5 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--bg-card2)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold t-primary">{t("scholarship.pageTitle")}</h1>
          <p className="text-xs t-muted">{scholarship.institution}</p>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-4 pb-10">
        {/* Title card */}
        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "var(--green-dim)", color: "var(--green)" }}>
              {scholarship.category}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "var(--bg-card2)", color: "var(--text-muted)" }}>
              {scholarship.type}
            </span>
          </div>
          <h2 className="font-bold text-lg leading-snug mb-2 t-primary">{scholarship.title}</h2>
          <p className="text-sm t-muted">{scholarship.desc}</p>
        </div>

        {/* Deadline */}
        <div className="rounded-2xl p-5 flex items-center justify-between" style={{ background: "var(--bg-card)" }}>
          <div>
            <p className="text-xs t-muted mb-1">{t("scholarship.deadline")}</p>
            <p className="font-bold text-lg t-primary">{scholarship.daysLeft} {t("scholarship.days")}</p>
            <p className="text-xs t-muted">{scholarship.hoursLeft}ч {scholarship.minutesLeft}м</p>
          </div>
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "var(--green-dim)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>

        {/* Documents */}
        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)" }}>
          <p className="font-semibold text-sm mb-3 t-primary">{t("scholarship.docs")}</p>
          <div className="space-y-2">
            {scholarship.documents.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{ background: "var(--bg-card2)" }}>
                <span className="text-xs flex-shrink-0" style={{ color: "var(--green)" }}>📄</span>
                <p className="text-sm t-primary">{doc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Required files */}
        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)" }}>
          <p className="font-semibold text-sm mb-3 t-primary">{t("scholarship.files")}</p>
          <div className="space-y-2">
            {scholarship.requiredFiles.map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{ background: "var(--bg-card2)" }}>
                <span>{f.icon}</span>
                <p className="text-sm t-primary">{f.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Apply button */}
        {!applied ? (
          <button
            onClick={handleApply}
            className="w-full py-4 rounded-2xl font-bold text-white text-base"
            style={{ background: "var(--green)" }}>
            {t("scholarship.apply")}
          </button>
        ) : (
          <div className="space-y-2">
            <div className="w-full py-4 rounded-2xl font-bold text-center text-base"
              style={{ background: "var(--green-dim)", color: "var(--green)" }}>
              {t("scholarship.applied")}
            </div>
            <button
              onClick={() => { withdrawApplication(scholarship.id); setApplied(false); }}
              className="w-full py-3 rounded-2xl font-semibold text-sm"
              style={{ background: "var(--bg-card2)", color: "var(--text-muted)" }}>
              {t("scholarship.withdraw")}
            </button>
          </div>
        )}

        {/* Plans */}
        <div>
          <p className="font-bold text-base mb-1 t-primary">{t("scholarship.helpTitle")}</p>
          <p className="text-xs mb-4 t-muted">{t("scholarship.helpSubtitle")}</p>
          <PlanCards />
        </div>
      </div>
    </div>
  );
}
