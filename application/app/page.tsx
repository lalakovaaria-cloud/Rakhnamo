"use client";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10" style={{ background: "var(--bg-main)" }}>
      <div className="mb-16 text-center">
        <h1 className="text-3xl font-bold tracking-widest" style={{ color: "var(--green)" }}>RAKHNAMO</h1>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-3 t-primary">Добро пожаловать!</h2>
        <p className="text-sm t-muted">Ваш путеводитель по образованию и стипендиям</p>
      </div>
      <div className="w-full">
        <Link href="/home">
          <button className="w-full py-4 rounded-2xl font-bold text-white text-base"
            style={{ background: "var(--green)" }}>
            Начать
          </button>
        </Link>
      </div>
    </div>
  );
}
