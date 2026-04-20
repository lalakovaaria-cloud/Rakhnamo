"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation, type TranslationKey } from "@/lib/i18n";

type Step =
  | { key: string; type: "text"; questionKey: TranslationKey; placeholderKey: TranslationKey }
  | { key: string; type: "choice"; questionKey: TranslationKey; options: { value: string; labelKey: TranslationKey }[] };

const STEPS: Step[] = [
  {
    key: "field",
    type: "text",
    questionKey: "onboarding.q1.question",
    placeholderKey: "onboarding.q1.placeholder",
  },
  {
    key: "gender",
    type: "choice",
    questionKey: "onboarding.q2.question",
    options: [
      { value: "female", labelKey: "onboarding.q2.opt1" },
      { value: "male",   labelKey: "onboarding.q2.opt2" },
    ],
  },
  {
    key: "country",
    type: "choice",
    questionKey: "onboarding.q3.question",
    options: [
      { value: "Tajikistan", labelKey: "onboarding.q3.opt1" },
      { value: "Russia",     labelKey: "onboarding.q3.opt2" },
      { value: "China",      labelKey: "onboarding.q3.opt3" },
      { value: "Europe",     labelKey: "onboarding.q3.opt4" },
      { value: "Any",        labelKey: "onboarding.q3.opt5" },
    ],
  },
  {
    key: "fullScholarship",
    type: "choice",
    questionKey: "onboarding.q4.question",
    options: [
      { value: "yes", labelKey: "onboarding.q4.opt1" },
      { value: "no",  labelKey: "onboarding.q4.opt2" },
    ],
  },
  {
    key: "gpa",
    type: "choice",
    questionKey: "onboarding.q5.question",
    options: [
      { value: "5.0",     labelKey: "onboarding.q5.opt1" },
      { value: "4.0-4.9", labelKey: "onboarding.q5.opt2" },
      { value: "3.0-3.9", labelKey: "onboarding.q5.opt3" },
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const current = STEPS[step];
  const progressPct = (step / STEPS.length) * 100;

  function handleChoice(value: string) {
    const updated = { ...answers, [current.key]: value };
    setAnswers(updated);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      submit(updated);
    }
  }

  function handleText() {
    if (!textInput.trim()) return;
    const updated = { ...answers, [current.key]: textInput.trim() };
    setAnswers(updated);
    setTextInput("");
    setStep(step + 1);
  }

  async function submit(finalAnswers: Record<string, string>) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/match-scholarship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers, lang }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      sessionStorage.setItem("recommendation", JSON.stringify(data));
      router.push("/recommendation");
    } catch {
      setError(t("onboarding.error"));
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--bg-main)" }}>
        <div className="w-14 h-14 rounded-full border-4 animate-spin mb-6"
          style={{ borderColor: "var(--green)", borderTopColor: "transparent" }} />
        <p className="font-bold text-lg t-primary">{t("onboarding.loading.title")}</p>
        <p className="text-sm mt-2 t-muted">{t("onboarding.loading.subtitle")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-5 pt-10 pb-8" style={{ background: "var(--bg-main)" }}>
      {/* Logo + home */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-widest" style={{ color: "var(--green)" }}>RAKHNAMO</h1>
        <button
          onClick={() => router.push("/home")}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "var(--bg-card2)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-2 t-muted">
          <span>{t("onboarding.step", { current: String(step + 1), total: String(STEPS.length) })}</span>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} style={{ color: "var(--green)" }}>
              {t("onboarding.back")}
            </button>
          )}
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-card2)" }}>
          <div className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%`, background: "var(--green)" }} />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold mb-8 leading-snug t-primary">{t(current.questionKey)}</h2>

      {current.type === "text" && (
        <div className="space-y-3">
          <input
            autoFocus
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleText()}
            placeholder={t(current.placeholderKey)}
            className="w-full px-4 py-3.5 rounded-xl outline-none text-sm t-primary"
            style={{ background: "var(--bg-card)", border: "1px solid var(--input-border)" }}
          />
          <button
            onClick={handleText}
            disabled={!textInput.trim()}
            className="w-full py-3.5 rounded-xl font-bold text-white disabled:opacity-40"
            style={{ background: "var(--green)" }}>
            {t("onboarding.next")}
          </button>
        </div>
      )}

      {current.type === "choice" && (
        <div className="space-y-3">
          {current.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleChoice(opt.value)}
              className="w-full px-4 py-4 rounded-xl text-left font-medium text-sm t-primary"
              style={{ background: "var(--bg-card)", border: "1px solid var(--input-border)" }}>
              {t(opt.labelKey)}
            </button>
          ))}
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </div>
  );
}
