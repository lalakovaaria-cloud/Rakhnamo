"use client";
import { useState } from "react";
import Link from "next/link";

const scholarships = [
  { id: 1, title: "Полная стипендия Оксфордского университета", desc: "Подайте заявку на полную стипендию Оксфордского университета. Покрывает обучение, проживание и расходы на жизнь." },
  { id: 2, title: 'Стипендия «Духти Точик»', desc: "Для девушек в инженерии. Полное покрытие обучения и проживания в ведущих вузах Таджикистана." },
  { id: 3, title: "Грант Правительства Китая", desc: "Полное покрытие обучения в ведущих университетах Китая. Открыто для всех специальностей." },
  { id: 4, title: 'Президентская стипендия «Дурахшанда»', desc: "Президентская стипендия для студентов с высокими баллами. Включает ежемесячные выплаты." },
  { id: 5, title: "Программа Erasmus+", desc: "Обмен в европейских вузах с полным финансированием. Доступно для всех специальностей." },
];

export default function ScholarshipsPage() {
  const [saved, setSaved] = useState<number[]>([]);
  const toggleSave = (id: number) => setSaved((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)" }}>
      <div className="px-5 pt-8 pb-2 flex items-center gap-3">
        <Link href="/home">
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--bg-card2)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </Link>
        <h1 className="text-xl font-bold t-primary">Стипендии</h1>
      </div>

      <div className="flex-1 px-5 pt-4 space-y-4 pb-24">
        {scholarships.map((s) => (
          <div key={s.id} className="rounded-2xl p-5" style={{ background: "var(--bg-card)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "var(--green-dim)", color: "var(--green)" }}>
                Стипендия
              </span>
              <button onClick={() => toggleSave(s.id)}>
                <svg width="20" height="20" viewBox="0 0 24 24"
                  fill={saved.includes(s.id) ? "var(--green)" : "none"}
                  stroke={saved.includes(s.id) ? "var(--green)" : "var(--text-muted)"} strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            </div>
            <h2 className="font-bold text-base mb-2 leading-snug t-primary">{s.title}</h2>
            <p className="text-sm mb-4 t-muted">{s.desc}</p>
            <button className="w-full py-3 rounded-xl font-semibold border text-sm t-primary"
              style={{ borderColor: "var(--btn-border)", background: "transparent" }}>
              Подробнее
            </button>
          </div>
        ))}
      </div>

      <div className="fixed left-0 right-0 flex justify-center px-5" style={{ bottom: "20px" }}>
        <div className="w-full max-w-sm px-6 py-3 flex items-center justify-around rounded-2xl"
          style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid var(--nav-border)" }}>
          <Link href="/home"><button className="flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button></Link>
          <Link href="/deadlines"><button className="flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button></Link>
          <Link href="/documents"><button className="flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button></Link>
        </div>
      </div>
    </div>
  );
}
