"use client";
import Link from "next/link";

const mentors = [
  {
    name: "Мадина С.",
    university: "ТТУ им. М. Осими (Архитектура)",
    tags: ["IELTS 7.0", "Дизайн", "Гранты"],
    achievement: "Поступила в 3 вуза Европы",
    rating: 4.9,
  },
  {
    name: "Алишер Р.",
    university: "МГУ (Программирование)",
    tags: ["TOEFL 100", "IT", "Олимпиады"],
    achievement: "Прошёл в Nazarbayev University",
    rating: 4.8,
  },
  {
    name: "Фарангиз М.",
    university: "МГУ им. Баумана (Инженерия)",
    tags: ["IELTS 7.5", "Математика", "Стипендии"],
    achievement: "Получила президентский грант",
    rating: 5.0,
  },
  {
    name: "Бахром Н.",
    university: "СПбГУ (Экономика)",
    tags: ["IELTS 6.5", "Экономика", "Гранты"],
    achievement: "Стипендиат программы Erasmus+",
    rating: 4.7,
  },
];

export default function MentorsPage() {
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
            <h1 className="text-xl font-bold text-white">Каталог менторов</h1>
            <p className="text-xs mt-0.5" style={{ color: "#8b9bb4" }}>Найдите опытного ментора</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#162032] rounded-full px-3 py-1.5 text-sm text-white">
          <span>🌐</span>
          <span className="font-semibold">RU</span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {mentors.map((m, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ background: "#162032" }}>
            <div className="flex items-start justify-between mb-1">
              <p className="font-bold text-white">{m.name}</p>
              <span className="flex items-center gap-1 text-sm font-bold" style={{ color: "#f59e0b" }}>
                ⭐ {m.rating}
              </span>
            </div>
            <p className="text-xs mb-3" style={{ color: "#8b9bb4" }}>{m.university}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {m.tags.map((tag, j) => (
                <span key={j} className="text-xs rounded-full px-3 py-1 border"
                  style={{ borderColor: "#2a3a50", color: "#8b9bb4", background: "#1a2840" }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm" style={{ color: "#8b9bb4" }}>📍 {m.achievement}</span>
            </div>
            <button className="w-full py-2.5 rounded-xl font-semibold text-white"
              style={{ background: "linear-gradient(to right, #22c55e, #f59e0b)" }}>
              Смотреть профиль
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}