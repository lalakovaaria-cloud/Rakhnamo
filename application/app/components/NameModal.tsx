"use client";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

interface Props {
  onSave: (name: string) => void;
}

export function NameModal({ onSave }: Props) {
  const { t } = useTranslation();
  const [val, setVal] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-sm rounded-t-3xl p-6" style={{ background: "var(--bg-card)" }}>
        <h2 className="font-bold text-lg mb-1 t-primary">{t("modal.name.title")}</h2>
        <p className="text-sm mb-4 t-muted">{t("modal.name.subtitle")}</p>
        <input
          autoFocus
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && val.trim() && onSave(val.trim())}
          placeholder={t("modal.name.placeholder")}
          className="w-full px-4 py-3 rounded-xl outline-none text-sm mb-4 t-primary"
          style={{ background: "var(--bg-card2)", border: "1px solid var(--input-border)" }}
        />
        <button
          onClick={() => val.trim() && onSave(val.trim())}
          className="w-full py-3 rounded-xl font-bold"
          style={{
            background: val.trim() ? "var(--green)" : "var(--bg-card2)",
            color: val.trim() ? "#fff" : "var(--text-muted)",
          }}>
          {t("modal.name.button")}
        </button>
      </div>
    </div>
  );
}
