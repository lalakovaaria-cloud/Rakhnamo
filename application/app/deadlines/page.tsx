"use client";
import Link from "next/link";

const deadlines = [
  {
    icon: "📄",
    iconColor: "#dc2626",
    title: "Подача документов в МГУ",
    desc: "Последний день для отправки всех необходимых документов",
    date: "15 Марта 2026",
    daysLeft: 1,
  },
  {
    icon: "📝",
    iconColor: "#d97706",
    title: "Тест IELTS",
    desc: "Регистрация на экзамен IELTS в British Council",
    date: "25 Марта 2026",
    daysLeft: 11,
  },
  {
    icon: "🎓",
    iconColor: "#d97706",
    title: "Собеседование NU",
    desc: "Онлайн интервью с приёмной комиссией Nazarbayev University",
    date: "1 Апреля 2026",
    daysLeft: 18,
  },
  {
    icon: "💰",
    iconColor: "#22c55e",
    title: "Заявка на стипендию",
    desc: "Подача документов на президентскую стипендию",
    date: "10 Апреля 2026",
    daysLeft: 27,
  },
];

function getDaysColor(days: number) {
  if (days <= 7) return "#dc2626";
  if (days <= 21) return "#d97706";
  return "#22c55e";
}

export default function DeadlinesPage() {
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
            <h1 className="text-xl font-bold text-white">Мӯҳлатҳо</h1>
            <p className="text-xs mt-0.5" style={{ color: "#8b9bb4" }}>Важные даты и сроки</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#162032] rounded-full px-3 py-1.5 text-sm text-white">
          <span>🌐</span>
          <span className="font-semibold">RU</span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {deadlines.map((d, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ background: "#162032" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{d.icon}</span>
              <p className="font-bold text-white text-sm flex-1">{d.title}</p>
              {d.daysLeft <= 7 && (
                <span className="text-xs ml-1" style={{ color: "#dc2626" }}>⚠</span>
              )}
            </div>
            <p className="text-xs mb-3" style={{ color: "#8b9bb4" }}>{d.desc}</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-sm">{d.date}</span>
              <span className="text-xs font-bold rounded-full px-3 py-1"
                style={{ background: getDaysColor(d.daysLeft), color: "white" }}>
                {d.daysLeft} {d.daysLeft === 1 ? "день" : d.daysLeft < 5 ? "дня" : "дней"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}