"use client";
import { useState } from "react";
import { SCHOLARSHIPS } from "@/lib/scholarships";
import { BackButton } from "@/app/components/BackButton";
import { BottomNav } from "@/app/components/BottomNav";
import { ScholarshipCard } from "@/app/components/ScholarshipCard";
import { useTranslation } from "@/lib/i18n";
import { localizeScholarship } from "@/lib/types";

export default function ScholarshipsPage() {
  const { t, lang } = useTranslation();
  const [saved, setSaved] = useState<number[]>([]);
  const toggle = (id: number) => setSaved((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)" }}>
      <div className="px-5 pt-8 pb-2 flex items-center gap-3">
        <BackButton href="/home" />
        <h1 className="text-xl font-bold t-primary">{t("scholarships.title")}</h1>
      </div>

      <div className="flex-1 px-5 pt-4 space-y-4 pb-24">
        {SCHOLARSHIPS.map((s) => (
          <ScholarshipCard key={s.id} scholarship={localizeScholarship(s, lang)} isSaved={saved.includes(s.id)} onToggleSave={toggle} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
