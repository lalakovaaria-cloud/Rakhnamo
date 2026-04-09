"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { APPLICATION_STAGES } from "@/lib/types";
import type { User, Application } from "@/lib/types";
import { getUser, getApplications, withdrawApplication } from "@/lib/storage";
import { SCHOLARSHIPS } from "@/lib/scholarships";

export default function ProfilePage() {
  const [user, setUser]               = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [expanded, setExpanded]       = useState<string | null>(null);

  useEffect(() => {
    setUser(getUser());
    setApplications(getApplications());
  }, []);

  const handleWithdraw = (scholarshipId: number) => {
    withdrawApplication(scholarshipId);
    setApplications(getApplications());
  };

  const getScholarship = (id: number) => SCHOLARSHIPS.find((s) => s.id === id);

  return (
    <div className="min-h-screen flex flex-col pb-32" style={{ background: "var(--bg-main)" }}>

      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-xl font-bold mb-1 t-primary">Профиль</h1>
        {user ? (
          <div className="flex items-center gap-3 mt-4 p-4 rounded-2xl" style={{ background: "var(--bg-card)" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ background: "var(--green-dim)", color: "var(--green)" }}>
              {user.name[0]?.toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-bold text-base t-primary">{user.name}</p>
              {user.city && <p className="text-sm mt-0.5 t-muted">{user.city}</p>}
              <p className="text-xs mt-1 t-muted">
                {applications.length} активн{applications.length === 1 ? "ая заявка" : applications.length < 5 ? "ые заявки" : "ых заявок"}
              </p>
            </div>
            <Link href="/home">
              <button className="px-3 py-1.5 rounded-xl text-xs font-semibold t-muted"
                style={{ background: "var(--bg-card2)" }}>
                Изменить
              </button>
            </Link>
          </div>
        ) : (
          <div className="p-4 rounded-2xl text-center" style={{ background: "var(--bg-card)" }}>
            <p className="text-sm t-muted">Профиль не создан</p>
            <Link href="/home">
              <button className="mt-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "var(--green)" }}>
                Создать профиль
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Applications */}
      <div className="px-5">
        <h2 className="font-bold text-base mb-3 t-primary">Мои заявки</h2>

        {applications.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ background: "var(--bg-card)" }}>
            <p className="text-sm mb-3 t-muted">Вы ещё не подавали заявки</p>
            <Link href="/home">
              <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "var(--green)" }}>
                Найти стипендии
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => {
              const scholarship = getScholarship(app.scholarshipId);
              if (!scholarship) return null;
              const isOpen = expanded === app.id;
              const docsTotal = scholarship.documents.length;
              const docsDone = app.checkedDocs.length;
              const filesTotal = scholarship.requiredFiles.length;
              const filesDone = app.uploadedFiles.length;
              const overallPct = Math.round(
                ((docsDone + filesDone + app.stageIndex) / (docsTotal + filesTotal + 3)) * 100
              );

              return (
                <div key={app.id} className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)" }}>
                  <button className="w-full px-4 pt-4 pb-3 text-left"
                    onClick={() => setExpanded(isOpen ? null : app.id)}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-bold text-sm leading-snug t-primary">{app.scholarshipTitle}</p>
                        <p className="text-xs mt-0.5 t-muted">{app.institution}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
                        style={{ background: "var(--green-dim)", color: "var(--green)" }}>
                        {overallPct}%
                      </span>
                    </div>
                    <div className="mt-3 flex gap-1">
                      {APPLICATION_STAGES.map((_, i) => (
                        <div key={i} className="flex-1 h-1 rounded-full"
                          style={{ background: i <= app.stageIndex ? "var(--green)" : "var(--bg-card2)" }} />
                      ))}
                    </div>
                    <p className="text-xs mt-1.5" style={{ color: "var(--green)" }}>
                      {APPLICATION_STAGES[app.stageIndex]}
                    </p>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 border-t" style={{ borderColor: "var(--border)" }}>
                      <div className="mt-3 space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="t-muted">Документы</span>
                            <span style={{ color: "var(--green)" }}>{docsDone} / {docsTotal}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-card2)" }}>
                            <div className="h-1.5 rounded-full transition-all"
                              style={{ width: `${docsTotal ? (docsDone / docsTotal) * 100 : 0}%`, background: "var(--green)" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="t-muted">Файлы загружены</span>
                            <span style={{ color: "var(--green)" }}>{filesDone} / {filesTotal}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-card2)" }}>
                            <div className="h-1.5 rounded-full transition-all"
                              style={{ width: `${filesTotal ? (filesDone / filesTotal) * 100 : 0}%`, background: "var(--green)" }} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-1">
                        {scholarship.documents.map((doc) => (
                          <div key={doc} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                            style={{ background: "var(--bg-inner)" }}>
                            <div className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0"
                              style={{ borderColor: app.checkedDocs.includes(doc) ? "var(--green)" : "var(--unchecked)" }}>
                              {app.checkedDocs.includes(doc) &&
                                <div className="w-2 h-2 rounded-full" style={{ background: "var(--green)" }} />}
                            </div>
                            <span className="text-xs t-primary">{doc}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 space-y-1">
                        {scholarship.requiredFiles.map((file) => (
                          <div key={file.name} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                            style={{ background: "var(--bg-inner)" }}>
                            <span className="text-sm">{file.icon}</span>
                            <span className="text-xs t-primary flex-1">{file.name}</span>
                            {app.uploadedFiles.includes(file.name)
                              ? <span className="text-xs font-semibold" style={{ color: "var(--green)" }}>✓</span>
                              : <span className="text-xs t-muted">—</span>}
                          </div>
                        ))}
                      </div>

                      <button onClick={() => handleWithdraw(app.scholarshipId)}
                        className="mt-3 w-full py-2 rounded-xl text-xs font-semibold t-muted"
                        style={{ background: "var(--bg-card2)" }}>
                        Отозвать заявку
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button></Link>
        </div>
      </div>
    </div>
  );
}
