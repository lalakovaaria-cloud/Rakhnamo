"use client";
import { useState } from "react";
import Link from "next/link";

const initialDocs = [
  { id: 1, title: "Паспорт", desc: "Копия всех страниц паспорта", checked: true },
  { id: 2, title: "Аттестат/Диплом", desc: "Документ об образовании с нотариальным переводом", checked: true },
  { id: 3, title: "Транскрипт оценок", desc: "Выписка с оценками за все годы обучения", checked: false },
  { id: 4, title: "Сертификат IELTS/TOEFL", desc: "Подтверждение знания английского языка", checked: false },
  { id: 5, title: "Мотивационное письмо", desc: "Объяснение причин выбора университета", checked: false },
  { id: 6, title: "Рекомендательные письма", desc: "От учителей или работодателей (2-3 штуки)", checked: false },
  { id: 7, title: "Медицинская справка", desc: "Справка о состоянии здоровья", checked: false },
  { id: 8, title: "Фотографии", desc: "4 фото 3x4 на белом фоне", checked: false },
  { id: 9, title: "Финансовые документы", desc: "Подтверждение финансовой состоятельности", checked: false },
  { id: 10, title: "Заявление на поступление", desc: "Официальная форма заявки университета", checked: false },
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState(initialDocs);

  const toggle = (id: number) => {
    setDocs(docs.map((d) => d.id === id ? { ...d, checked: !d.checked } : d));
  };

  const checked = docs.filter((d) => d.checked).length;
  const progress = (checked / docs.length) * 100;

  return (
    <div className="min-h-screen px-4 py-6" style={{ background: "#0b1220" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/home">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: "#162032" }}>
              ←
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Документы</h1>
            <p className="text-xs mt-0.5" style={{ color: "#8b9bb4" }}>Чек-лист необходимых документов</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#162032] rounded-full px-3 py-1.5 text-sm text-white">
          <span>🌐</span>
          <span className="font-semibold">RU</span>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-2xl p-4 mb-4" style={{ background: "#162032" }}>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-white">Прогресс</span>
          <span className="text-white font-bold">{checked} из {docs.length}</span>
        </div>
        <div className="w-full h-2 rounded-full" style={{ background: "#0b1220" }}>
          <div className="h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: "linear-gradient(to right, #22c55e, #14b8a6)" }} />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        {docs.map((doc) => (
          <button key={doc.id} onClick={() => toggle(doc.id)}
            className="w-full rounded-2xl p-4 flex items-start gap-3 text-left"
            style={{ background: "#162032" }}>
            <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
              style={{
                borderColor: doc.checked ? "#22c55e" : "#2a3a50",
                background: doc.checked ? "#22c55e" : "transparent",
              }}>
              {doc.checked && <span className="text-xs text-white font-bold">✓</span>}
            </div>
            <div>
              <p className={`font-semibold text-sm ${doc.checked ? "line-through" : ""}`}
                style={{ color: doc.checked ? "#8b9bb4" : "#ffffff" }}>
                {doc.title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#8b9bb4" }}>{doc.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}