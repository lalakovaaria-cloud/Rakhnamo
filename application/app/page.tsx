"use client";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10" style={{ background: "#0b1220" }}>
      {/* Language badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#162032] rounded-full px-3 py-1.5 text-sm text-white">
        <span>🌐</span>
        <span className="font-semibold">RU</span>
      </div>

      {/* Logo */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-1">Rakhnamo</h1>
        <div className="w-12 h-0.5 mx-auto" style={{ background: "linear-gradient(to right, #22c55e, #14b8a6)" }} />
      </div>

      {/* Welcome text */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-3">Добро пожаловать в<br />Rakhnamo!</h2>
        <p className="text-sm" style={{ color: "#8b9bb4" }}>Выберите, как вы хотите использовать<br />приложение:</p>
      </div>

      {/* Role cards */}
      <div className="w-full space-y-4">
        <Link href="/home">
          <div className="w-full rounded-2xl p-5 flex items-center gap-4 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #22c55e, #14b8a6)" }}>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl flex-shrink-0">
              👤
            </div>
            <div>
              <p className="font-bold text-white text-base">Я Абитуриент</p>
              <p className="text-sm text-white/80 mt-0.5">Ищу помощь в поступлении и выборе профессии</p>
            </div>
          </div>
        </Link>

        <Link href="/mentor-panel">
          <div className="w-full rounded-2xl p-5 flex items-center gap-4 cursor-pointer mt-4"
            style={{ background: "linear-gradient(135deg, #f59e0b, #ea580c)" }}>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl flex-shrink-0">
              🎓
            </div>
            <div>
              <p className="font-bold text-white text-base">Я Ментор</p>
              <p className="text-sm text-white/80 mt-0.5">Я студент и хочу помогать абитуриентам</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}