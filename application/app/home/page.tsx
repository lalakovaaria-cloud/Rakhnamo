"use client";
import Link from "next/link";

const tiles = [
  {
    href: "/roadmap",
    icon: "🗺️",
    title: "Дорожная карта",
    subtitle: "Roadmap",
    gradient: "linear-gradient(135deg, #22c55e, #14b8a6)",
  },
  {
    href: "/scholarships",
    icon: "🎓",
    title: "Стипендии",
    subtitle: "Scholarships",
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
  },
  {
    href: "/documents",
    icon: "📄",
    title: "Документы",
    subtitle: "Documents",
    gradient: "linear-gradient(135deg, #22c55e, #14b8a6)",
  },
  {
    href: "/deadlines",
    icon: "📅",
    title: "Мӯҳлатҳо",
    subtitle: "Deadlines",
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen px-4 py-6" style={{ background: "#0b1220" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Rakhnamo</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8b9bb4" }}>Ваш путеводитель по образованию</p>
        </div>
        <div className="flex items-center gap-1 bg-[#162032] rounded-full px-3 py-1.5 text-sm text-white">
          <span>🌐</span>
          <span className="font-semibold">RU</span>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6" style={{ background: "#162032" }}>
        <span className="text-lg">🔍</span>
        <span style={{ color: "#8b9bb4" }}>Поиск...</span>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href}>
            <div className="rounded-2xl p-4 h-32 flex flex-col justify-between cursor-pointer"
              style={{ background: tile.gradient }}>
              <span className="text-3xl">{tile.icon}</span>
              <div>
                <p className="font-bold text-white text-base leading-tight">{tile.title}</p>
                <p className="text-xs text-white/70">{tile.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mentor catalog - wide */}
      <Link href="/mentors">
        <div className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
          style={{ background: "linear-gradient(135deg, #22c55e, #14b8a6)" }}>
          <span className="text-3xl">👥</span>
          <div>
            <p className="font-bold text-white text-base">Каталог менторов</p>
            <p className="text-sm text-white/80">Найдите опытного ментора</p>
          </div>
        </div>
      </Link>
    </div>
  );
}