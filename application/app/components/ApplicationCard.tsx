"use client";
import Link from "next/link";
import { APPLICATION_STAGES } from "@/lib/types";
import { localizeScholarship } from "@/lib/types";
import type { Application } from "@/lib/types";
import { SCHOLARSHIPS } from "@/lib/scholarships";
import { useTranslation } from "@/lib/i18n";

interface Props {
  app: Application;
}

export function ApplicationCard({ app }: Props) {
  const { lang, t } = useTranslation();
  const raw = SCHOLARSHIPS.find((s) => s.id === app.scholarshipId);
  if (!raw) return null;
  const scholarship = localizeScholarship(raw, lang);

  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--bg-card)" }}>
      <span className="text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block"
        style={{ background: "var(--green-dim)", color: "var(--green)" }}>
        {scholarship.category}
      </span>
      <p className="font-bold text-sm leading-snug mb-1 t-primary">{app.scholarshipTitle}</p>
      <p className="text-xs mb-3 t-muted">{app.institution}</p>

      {/* Stage progress */}
      <div className="flex items-start gap-1 mb-2">
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

      {/* Current stage badge */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3"
        style={{ background: "var(--green-dim)" }}>
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--green)" }} />
        <p className="text-xs font-semibold" style={{ color: "var(--green)" }}>
          {APPLICATION_STAGES[app.stageIndex]}
        </p>
      </div>

      <Link href={`/applications/${app.scholarshipId}`}>
        <button className="w-full py-2.5 rounded-xl font-semibold text-sm border t-primary"
          style={{ borderColor: "var(--input-border)", background: "transparent" }}>
          {t("app.card.open")}
        </button>
      </Link>
    </div>
  );
}
