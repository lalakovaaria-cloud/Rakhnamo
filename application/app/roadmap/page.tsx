"use client";
import Link from "next/link";

const steps = [
  {
    title: "Выбор направления",
    desc: "Определите свою специальность и университет",
    month: "Сентябрь",
    monthColor: "#f59e0b",
    done: true,
  },
  {
    title: "Подготовка документов",
    desc: "Соберите все необходимые документы и справки",
    month: "Октябрь",
    monthColor: "#f59e0b",
    done: true,
  },
  {
    title: "Языковые тесты",
    desc: "Сдайте IELTS, TOEFL или другие требуемые экзамены",
    month: "Ноябрь",
    monthColor: "#f59e0b",
    done: true,
  },
  {
    title: "Подача заявки",
    desc: "Заполните анкеты и отправьте документы в университеты",
    month: "Декабрь",
    monthColor: "#f59e0b",
    done: false,
  },
  {
    title: "Собеседование",
    desc: "Пройдите интервью с приёмной комиссией",
    month: "Январь",
    monthColor: "#f59e0b",
    done: false,
  },
  {
    title: "Получение визы",
    desc: "Оформите студенческую визу после зачисления",
    month: "Февраль",
    monthColor: "#f59e0b",
    done: false,
  },
  {
    title: "Подготовка к отъезду",
    desc: "Забронируйте жильё, билеты и подготовьте вещи",
    month: "Март",
    monthColor: "#f59e0b",
    done: false,
  },
];

export default function RoadmapPage() {
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
            <h1 className="text-xl font-bold text-white">Дорожная карта</h1>
            <p className="text-xs mt-0.5" style={{ color: "#8b9bb4" }}>Пошаговый план поступления</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#162032] rounded-full px-3 py-1.5 text-sm text-white">
          <span>🌐</span>
          <span className="font-semibold">RU</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5" style={{ background: "#22c55e33" }} />

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="relative flex items-start gap-4">
              {/* Circle */}
              <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
                style={{
                  borderColor: "#22c55e",
                  background: step.done ? "#22c55e" : "#0b1220",
                }}>
                {step.done ? "✓" : ""}
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl p-4" style={{ background: step.done ? "#162032" : "#162032" }}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-bold text-white">{step.title}</p>
                  <span className="text-xs rounded-full px-2 py-0.5 ml-2 flex-shrink-0"
                    style={{ background: step.monthColor, color: "#0b1220", fontWeight: 600 }}>
                    {step.month}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#8b9bb4" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}