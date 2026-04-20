"use client";
import Link from "next/link";
import type { LocalizedScholarship } from "@/lib/types";
import { useTranslation, type TranslationKey } from "@/lib/i18n";

interface Props {
  scholarship: LocalizedScholarship;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  daysLeft?: boolean;
}

function daysColor(n: number) {
  if (n <= 7)  return "#ef4444";
  if (n <= 30) return "#f59e0b";
  return "var(--green)";
}

export function ScholarshipCard({ scholarship: s, isSaved, onToggleSave, daysLeft }: Props) {
  const { t } = useTranslation();

  function daysLabel(n: number): string {
    if (n === 1) return t("card.days.one" as TranslationKey);
    if (n < 5)   return t("card.days.few" as TranslationKey);
    return t("card.days.many" as TranslationKey);
  }

  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: "var(--green-dim)", color: "var(--green)" }}>
          {s.category}
        </span>
        <button onClick={() => onToggleSave(s.id)}>
          <svg width="20" height="20" viewBox="0 0 24 24"
            fill={isSaved ? "var(--green)" : "none"}
            stroke={isSaved ? "var(--green)" : "var(--text-muted)"} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      <h2 className="font-bold text-base mb-1 leading-snug t-primary">{s.title}</h2>
      <p className="text-xs mb-3 t-muted">{s.institution}</p>

      {daysLeft && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm t-muted">
            {new Date(Date.now() + s.daysLeft * 86400000).toLocaleDateString("ru-RU", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </span>
          <span className="text-xs font-bold rounded-full px-3 py-1 text-white"
            style={{ background: daysColor(s.daysLeft) }}>
            {s.daysLeft} {daysLabel(s.daysLeft)}
          </span>
        </div>
      )}

      <Link href={`/scholarships/${s.id}`}>
        <button className="w-full py-3 rounded-xl font-semibold border text-sm t-primary"
          style={{ borderColor: "var(--btn-border)", background: "transparent" }}>
          {t("card.details")}
        </button>
      </Link>
    </div>
  );
}
