"use client";
import Link from "next/link";

const steps = [
  { title: "Выбор направления", desc: "Определите свою специальность и университет", month: "Сентябрь", done: true },
  { title: "Подготовка документов", desc: "Соберите все необходимые документы и справки", month: "Октябрь", done: true },
  { title: "Языковые тесты", desc: "Сдайте IELTS, TOEFL или другие требуемые экзамены", month: "Ноябрь", done: true },
  { title: "Подача заявки", desc: "Заполните анкеты и отправьте документы в университеты", month: "Декабрь", done: false },
  { title: "Собеседование", desc: "Пройдите интервью с приёмной комиссией", month: "Январь", done: false },
  { title: "Получение визы", desc: "Оформите студенческую визу после зачисления", month: "Февраль", done: false },
  { title: "Подготовка к отъезду", desc: "Забронируйте жильё, билеты и подготовьте вещи", month: "Март", done: false },
];

export default function RoadmapPage() {
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
        <h1 className="text-xl font-bold t-primary">Дорожная карта</h1>
      </div>

      <div className="px-5 pt-6 pb-24 relative">
        <div className="absolute left-[2.75rem] top-6 bottom-10 w-0.5" style={{ background: "var(--green-dim)" }} />
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="relative flex items-start gap-4">
              <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
                style={{
                  borderColor: "var(--green)",
                  background: step.done ? "var(--green)" : "var(--bg-main)",
                }}>
                {step.done && <span className="text-white text-xs font-bold">✓</span>}
              </div>
              <div className="flex-1 rounded-2xl p-4" style={{ background: "var(--bg-card)" }}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-bold t-primary">{step.title}</p>
                  <span className="text-xs rounded-full px-2 py-0.5 ml-2 flex-shrink-0 font-semibold"
                    style={{ background: "var(--green-dim)", color: "var(--green)" }}>
                    {step.month}
                  </span>
                </div>
                <p className="text-sm t-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
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
