"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Scholarship, LocalizedScholarship } from "@/lib/types";
import { localizeScholarship } from "@/lib/types";
import { getUser, upsertUser, isApplied, applyToScholarship } from "@/lib/storage";
import { NameModal } from "@/app/components/NameModal";
import { PlanCards } from "@/app/components/PlanCards";
import { useTranslation } from "@/lib/i18n";

interface RecommendationData {
  scholarship: Scholarship;
  reason: string;
}

export default function RecommendationPage() {
  const router = useRouter();
  const { lang, t } = useTranslation();
  const [data, setData] = useState<RecommendationData | null>(null);
  const [applied, setApplied] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("recommendation");
    if (!raw) { router.replace("/onboarding"); return; }
    const parsed = JSON.parse(raw);
    setData(parsed);
    setApplied(isApplied(parsed.scholarship.id));
  }, [router]);

  if (!data) return null;

  const { reason } = data;
  const scholarship: LocalizedScholarship = localizeScholarship(data.scholarship, lang);

  function handleApply() {
    const user = getUser();
    if (!user) { setShowNameModal(true); return; }
    applyToScholarship(scholarship.id, scholarship.title, scholarship.institution, user.id);
    router.push(`/applications/${scholarship.id}`);
  }

  function handleNameSave(name: string) {
    const user = upsertUser({ name, city: "" });
    setShowNameModal(false);
    applyToScholarship(scholarship.id, scholarship.title, scholarship.institution, user.id);
    router.push(`/applications/${scholarship.id}`);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)" }}>
      {showNameModal && <NameModal onSave={handleNameSave} />}

      {/* Header */}
      <div className="px-5 pt-8 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.push("/home")}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--bg-card2)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold t-primary">{t("rec.title")}</h1>
          <p className="text-xs t-muted">{t("rec.subtitle")}</p>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-5 pb-10">

        {/* Matched scholarship */}
        <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "var(--green-dim)", color: "var(--green)" }}>
              {scholarship.category}
            </span>
          </div>
          <h2 className="font-bold text-base mb-1 leading-snug t-primary">{scholarship.title}</h2>
          <p className="text-sm mb-4 t-muted">{scholarship.desc}</p>

          <div className="rounded-xl px-4 py-3 mb-4" style={{ background: "var(--bg-card2)", border: "1px solid var(--input-border)" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--green)" }}>{t("rec.why")}</p>
            <p className="text-sm t-muted">{reason}</p>
          </div>

          {!applied ? (
            <button onClick={handleApply}
              className="w-full py-3 rounded-xl font-bold text-white text-sm"
              style={{ background: "var(--green)" }}>
              {t("rec.apply")}
            </button>
          ) : (
            <div className="w-full py-3 rounded-xl font-bold text-center text-sm"
              style={{ background: "var(--green-dim)", color: "var(--green)" }}>
              {t("rec.applied")}
            </div>
          )}
        </div>

        {/* Plans header */}
        <div>
          <h2 className="text-lg font-bold mb-1 t-primary">{t("rec.plans.title")}</h2>
          <p className="text-sm t-muted">{t("rec.plans.subtitle")}</p>
        </div>

        {/* FREE plan */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--input-border)" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ background: "var(--bg-card2)" }}>
            <p className="font-bold t-primary text-lg">Free</p>
            <p className="text-2xl font-bold" style={{ color: "var(--green)" }}>0с</p>
          </div>
          <div className="px-5 py-4" style={{ background: "var(--bg-card)" }}>
            <div className="space-y-2 mb-4">
              {([t("rec.free.f1"), t("rec.free.f2"), t("rec.free.f3")] as const).map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-sm mt-0.5 flex-shrink-0" style={{ color: "var(--green)" }}>✓</span>
                  <p className="text-sm t-muted">{f}</p>
                </div>
              ))}
            </div>

            <div className="mt-2 space-y-4">
              {/* Deadline */}
              <div className="rounded-xl px-4 py-3" style={{ background: "var(--bg-card2)" }}>
                <p className="text-xs font-semibold mb-1 t-muted">{t("rec.deadline.label")}</p>
                <p className="font-bold" style={{ color: "var(--green)" }}>
                  {t("rec.deadline.days", { n: String(scholarship.daysLeft) })}
                </p>
                <p className="text-xs mt-0.5 t-muted">{scholarship.hoursLeft}ч {scholarship.minutesLeft}м</p>
              </div>

              {/* Documents */}
              <div>
                <p className="text-xs font-semibold mb-2 t-muted">{t("rec.docs.label")}</p>
                <div className="space-y-2">
                  {scholarship.documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                      style={{ background: "var(--bg-card2)" }}>
                      <span className="text-xs" style={{ color: "var(--green)" }}>📄</span>
                      <p className="text-sm t-primary">{doc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required files */}
              <div>
                <p className="text-xs font-semibold mb-2 t-muted">{t("rec.files.label")}</p>
                <div className="space-y-2">
                  {scholarship.requiredFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                      style={{ background: "var(--bg-card2)" }}>
                      <span>{f.icon}</span>
                      <p className="text-sm t-primary">{f.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Starter + Pro plans */}
        <PlanCards />

        {/* Skip */}
        <button
          onClick={() => router.push("/home")}
          className="w-full py-3 text-sm t-muted">
          {t("rec.skip")}
        </button>
      </div>
    </div>
  );
}
