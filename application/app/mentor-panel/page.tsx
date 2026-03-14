"use client";
import Link from "next/link";

const achievements = [
  { icon: "🥇", label: "Первая консультация" },
  { icon: "⭐", label: "10+ отзывов" },
  { icon: "🏆", label: "Золотой сертификат", locked: true },
];

export default function MentorPanelPage() {
  const rating = 4.9;
  const ratingPercent = (rating / 5) * 100;
  const progress = 7;
  const total = 10;
  const progressPercent = (progress / total) * 100;

  return (
    <div className="min-h-screen px-4 py-6" style={{ background: "#0b1220" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: "#162032" }}>
              ←
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Панель ментора</h1>
            <p className="text-xs mt-0.5" style={{ color: "#8b9bb4" }}>Ваша статистика и достижения</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#162032] rounded-full px-3 py-1.5 text-sm text-white">
          <span>🌐</span>
          <span className="font-semibold">RU</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className="rounded-2xl p-4" style={{ background: "#162032" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">👥</span>
            <p className="font-bold text-white">Статус</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: "#8b9bb4" }}>
              Вы помогли <span className="text-white font-bold">12</span> абитуриентам в этом месяце
            </p>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 ml-3"
              style={{ background: "linear-gradient(135deg, #22c55e, #f59e0b)" }}>
              12
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="rounded-2xl p-4" style={{ background: "#162032" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">☆</span>
            <p className="font-bold text-white">Ваш рейтинг</p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">⭐</span>
            <span className="text-3xl font-bold text-white">{rating}</span>
            <span className="text-lg" style={{ color: "#8b9bb4" }}>/ 5.0</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: "#0b1220" }}>
            <div className="h-2 rounded-full" style={{ width: `${ratingPercent}%`, background: "#f59e0b" }} />
          </div>
        </div>

        {/* Goal */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #22c55e, #f59e0b)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎯</span>
            <p className="font-bold text-white">Цель</p>
          </div>
          <p className="text-sm text-white/90 mb-4">
            Ответьте ещё на 3 вопроса, чтобы получить «Золотой сертификат волонтёра» для твоего резюме
          </p>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-white/80">Прогресс</span>
            <span className="text-sm font-bold text-white">{progress} / {total}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/30">
            <div className="h-2 rounded-full bg-white transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Achievements */}
        <div className="rounded-2xl p-4" style={{ background: "#162032" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🏅</span>
            <p className="font-bold text-white">Ваши достижения</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((a, i) => (
              <div key={i} className="rounded-xl p-3 flex flex-col items-center gap-1 text-center"
                style={{ background: "#1a2840", opacity: a.locked ? 0.5 : 1 }}>
                <span className="text-2xl">{a.icon}</span>
                <p className="text-xs" style={{ color: "#8b9bb4" }}>{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}