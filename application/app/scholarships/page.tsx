"use client";
import Link from "next/link";

const scholarships = [
  {
    icon: "🎓",
    iconBg: "#7c3aed",
    title: 'Стипендия «Духти Точик»',
    subtitle: "Для девушек в инженерии",
    tags: ["Таджикистан", "Девушки", "Инженерия"],
  },
  {
    icon: "🎓",
    iconBg: "#dc2626",
    title: "Грант Правительства Китая",
    subtitle: "Полное покрытие обучения",
    tags: ["Китай", "Полная стипендия", "Все специальности"],
  },
  {
    icon: "🎓",
    iconBg: "#d97706",
    title: 'Президентская стипендия «Дурахшанда»',
    subtitle: "Президентская стипендия",
    tags: ["Таджикистан", "Высокие баллы"],
  },
  {
    icon: "🎓",
    iconBg: "#0891b2",
    title: "Erasmus+ Programme",
    subtitle: "Обмен в европейских вузах",
    tags: ["Европа", "Обмен", "Все специальности"],
  },
];

export default function ScholarshipsPage() {
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
            <h1 className="text-xl font-bold text-white">Стипендии и гранты</h1>
            <p className="text-xs mt-0.5" style={{ color: "#8b9bb4" }}>Финансовая поддержка для студентов</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#162032] rounded-full px-3 py-1.5 text-sm text-white">
          <span>🌐</span>
          <span className="font-semibold">RU</span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {scholarships.map((s, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ background: "#162032" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: s.iconBg }}>
                {s.icon}
              </div>
              <div>
                <p className="font-bold text-white text-sm">{s.title}</p>
                <p className="text-xs" style={{ color: "#8b9bb4" }}>{s.subtitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {s.tags.map((tag, j) => (
                <span key={j} className="text-xs rounded-full px-3 py-1 border"
                  style={{ borderColor: "#2a3a50", color: "#8b9bb4", background: "#1a2840" }}>
                  {tag}
                </span>
              ))}
            </div>
            <button className="w-full py-2.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(to right, #22c55e, #f59e0b)" }}>
              Подробнее ↗
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}