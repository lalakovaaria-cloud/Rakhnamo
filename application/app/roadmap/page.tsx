"use client";
import { BackButton } from "@/app/components/BackButton";
import { BottomNav } from "@/app/components/BottomNav";
import { useTranslation, type TranslationKey } from "@/lib/i18n";

const STEPS = [1, 2, 3, 4, 5, 6, 7] as const;
const DONE = [true, true, true, false, false, false, false];

export default function RoadmapPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)" }}>
      <div className="px-5 pt-8 pb-2 flex items-center gap-3">
        <BackButton href="/home" />
        <h1 className="text-xl font-bold t-primary">{t("roadmap.title")}</h1>
      </div>

      <div className="px-5 pt-6 pb-24 relative">
        <div className="absolute left-[2.75rem] top-6 bottom-10 w-0.5" style={{ background: "var(--green-dim)" }} />
        <div className="space-y-4">
          {STEPS.map((n, i) => {
            const done = DONE[i];
            return (
              <div key={n} className="relative flex items-start gap-4">
                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
                  style={{ borderColor: "var(--green)", background: done ? "var(--green)" : "var(--bg-main)" }}>
                  {done && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <div className="flex-1 rounded-2xl p-4" style={{ background: "var(--bg-card)" }}>
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-bold t-primary">{t(`roadmap.step${n}.title` as TranslationKey)}</p>
                    <span className="text-xs rounded-full px-2 py-0.5 ml-2 flex-shrink-0 font-semibold"
                      style={{ background: "var(--green-dim)", color: "var(--green)" }}>
                      {t(`roadmap.step${n}.month` as TranslationKey)}
                    </span>
                  </div>
                  <p className="text-sm t-muted">{t(`roadmap.step${n}.desc` as TranslationKey)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
