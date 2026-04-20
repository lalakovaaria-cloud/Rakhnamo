"use client";
import { useTranslation } from "@/lib/i18n";

const TG_LINK = "https://t.me/rakhnamo_tj";

export function PlanCards() {
  const { t } = useTranslation();

  const PLANS = [
    {
      name: "Starter",
      price: "50с",
      color: "var(--green)",
      features: [
        t("plan.starter.f1"),
        t("plan.starter.f2"),
        t("plan.starter.f3"),
        t("plan.starter.f4"),
      ],
    },
    {
      name: "Pro",
      price: "300с",
      color: "#f59e0b",
      badge: t("home.plan.recommended"),
      features: [
        t("plan.pro.f1"),
        t("plan.pro.f2"),
        t("plan.pro.f3"),
        t("plan.pro.f4"),
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {PLANS.map((plan) => (
        <div key={plan.name} className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--input-border)" }}>
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ background: plan.color }}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{plan.name}</span>
              {plan.badge && (
                <span className="text-xs bg-white/25 text-white px-2 py-0.5 rounded-full font-semibold">
                  {plan.badge}
                </span>
              )}
            </div>
            <span className="font-bold text-white text-lg">{plan.price}</span>
          </div>
          <div className="px-4 py-3" style={{ background: "var(--bg-card2)" }}>
            {plan.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: plan.color }}>✓</span>
                <p className="text-xs t-muted">{f}</p>
              </div>
            ))}
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer">
              <button className="w-full py-2.5 rounded-xl font-bold text-white text-sm mt-2"
                style={{ background: plan.color }}>
                {t("plan.choose.telegram", { name: plan.name })}
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
