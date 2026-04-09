"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SCHOLARSHIPS } from "@/lib/scholarships";
import { APPLICATION_STAGES } from "@/lib/types";
import type { Scholarship, User, Application } from "@/lib/types";
import {
  getUser, upsertUser,
  getSavedIds, toggleSaved,
  getApplications, getApplication, isApplied,
  applyToScholarship, withdrawApplication,
  advanceStage, toggleDocument, toggleUploadedFile,
} from "@/lib/storage";
import { ThemeToggle } from "@/app/theme-provider";

const filters = ["Все", "Стипендия", "Дедлайн"];

// ── Name setup modal ─────────────────────────────────────────
function NameModal({ onSave }: { onSave: (name: string) => void }) {
  const [val, setVal] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-sm rounded-t-3xl p-6" style={{ background: "var(--bg-card)" }}>
        <h2 className="font-bold text-lg mb-1 t-primary">Как вас зовут?</h2>
        <p className="text-sm mb-4 t-muted">Введите имя чтобы сохранить прогресс</p>
        <input
          autoFocus
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && val.trim() && onSave(val.trim())}
          placeholder="Ваше имя"
          className="w-full px-4 py-3 rounded-xl outline-none text-sm mb-4 t-primary"
          style={{ background: "var(--bg-card2)", border: "1px solid var(--input-border)" }}
        />
        <button
          onClick={() => val.trim() && onSave(val.trim())}
          className="w-full py-3 rounded-xl font-bold"
          style={{
            background: val.trim() ? "var(--green)" : "var(--bg-card2)",
            color: val.trim() ? "#fff" : "var(--text-muted)",
          }}>
          Начать
        </button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [search, setSearch]             = useState("");
  const [savedIds, setSavedIds]         = useState<number[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [user, setUser]                 = useState<User | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [selected, setSelected]         = useState<Scholarship | null>(null);
  const [activeApp, setActiveApp]       = useState<Application | null>(null);
  const [tab, setTab]                   = useState<"docs" | "files" | "stages">("docs");

  useEffect(() => {
    const u = getUser();
    setUser(u);
    if (!u) setShowNameModal(true);
    setSavedIds(getSavedIds());
    setApplications(getApplications());
  }, []);

  useEffect(() => {
    if (selected) setActiveApp(getApplication(selected.id));
  }, [applications, selected]);

  const filtered = SCHOLARSHIPS
    .filter((s) => activeFilter === "Все" || s.type === activeFilter)
    .filter((s) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return s.title.toLowerCase().includes(q) || s.institution.toLowerCase().includes(q);
    });

  const handleSaveName = (name: string) => {
    const u = upsertUser({ name });
    setUser(u);
    setShowNameModal(false);
  };

  const handleToggleSave = (id: number) => setSavedIds(toggleSaved(id));

  const openModal = (s: Scholarship) => {
    setSelected(s);
    setActiveApp(getApplication(s.id));
    setTab("docs");
  };

  const handleApply = () => {
    if (!selected || !user) return;
    applyToScholarship(selected.id, selected.title, selected.institution, user.id);
    setApplications(getApplications());
  };

  const handleWithdraw = () => {
    if (!selected) return;
    withdrawApplication(selected.id);
    setApplications(getApplications());
  };

  const handleToggleDoc = (docName: string) => {
    if (!selected) return;
    toggleDocument(selected.id, docName);
    setApplications(getApplications());
  };

  const handleToggleFile = (fileName: string) => {
    if (!selected) return;
    toggleUploadedFile(selected.id, fileName);
    setApplications(getApplications());
  };

  const handleAdvanceStage = () => {
    if (!selected) return;
    advanceStage(selected.id);
    setApplications(getApplications());
  };

  const applied = selected ? isApplied(selected.id) : false;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)" }}>

      {showNameModal && <NameModal onSave={handleSaveName} />}

      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-widest" style={{ color: "var(--green)" }}>RAKHNAMO</h1>
          <ThemeToggle />
        </div>
        {user && (
          <div className="flex items-center justify-between mt-3 px-1">
            <div>
              <p className="font-semibold text-sm t-primary">Привет, {user.name} 👋</p>
              {user.city && <p className="text-xs mt-0.5 t-muted">{user.city}</p>}
            </div>
            <button
              onClick={() => setShowNameModal(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: "var(--green-dim)", color: "var(--green)" }}>
              {user.name[0]?.toUpperCase()}
            </button>
          </div>
        )}
      </div>

      {/* My applications bar */}
      {applications.length > 0 && (
        <div className="px-5 pb-3">
          <div className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: "var(--bg-card)" }}>
            <div>
              <p className="font-semibold text-sm t-primary">Мои заявки</p>
              <p className="text-xs mt-0.5 t-muted">
                {applications.length} активн{applications.length === 1 ? "ая" : "ых"}
              </p>
            </div>
            <div className="flex -space-x-2">
              {applications.slice(0, 3).map((a) => (
                <div key={a.id} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2"
                  style={{ background: "var(--green-dim)", color: "var(--green)", borderColor: "var(--bg-card)" }}>
                  {a.institution[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl" style={{ background: "var(--bg-card)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" className="flex-shrink-0">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск стипендий..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--text-primary)" }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ color: "var(--text-muted)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-5 pb-4">
        {filters.map((f) => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: activeFilter === f ? "var(--green)" : "var(--bg-card2)",
              color: activeFilter === f ? "#fff" : "var(--text-muted)",
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex-1 px-5 space-y-4 pb-32">
        {filtered.map((item) => {
          const appExists = isApplied(item.id);
          return (
            <div key={item.id} className="rounded-2xl p-5" style={{ background: "var(--bg-card)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "var(--green-dim)", color: "var(--green)" }}>
                  {item.type}
                </span>
                <button onClick={() => handleToggleSave(item.id)}>
                  <svg width="20" height="20" viewBox="0 0 24 24"
                    fill={savedIds.includes(item.id) ? "var(--green)" : "none"}
                    stroke={savedIds.includes(item.id) ? "var(--green)" : "var(--text-muted)"} strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              </div>
              <h2 className="font-bold text-base mb-2 leading-snug t-primary">{item.title}</h2>
              <p className="text-sm mb-3 t-muted">{item.desc}</p>
              {appExists && (
                <div className="mb-3 px-3 py-1.5 rounded-lg flex items-center gap-2" style={{ background: "var(--green-dim2)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--green)" }}>
                    {APPLICATION_STAGES[getApplication(item.id)!.stageIndex]}
                  </span>
                </div>
              )}
              <button onClick={() => openModal(item)}
                className="w-full py-3 rounded-xl font-semibold border text-sm t-primary"
                style={{ borderColor: "var(--btn-border)", background: "transparent" }}>
                Подробнее
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Nav */}
      <div className="fixed left-0 right-0 flex justify-center px-5" style={{ bottom: "20px" }}>
        <div className="w-full max-w-sm px-6 py-3 flex items-center justify-around rounded-2xl"
          style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid var(--nav-border)" }}>
          <Link href="/home"><button className="flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
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

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setSelected(null)}>
          <div className="w-full max-w-sm rounded-t-3xl overflow-y-auto"
            style={{ background: "var(--bg-card)", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <span className="font-semibold text-base t-primary">{selected.institution}</span>
              <button onClick={() => setSelected(null)}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "var(--bg-card2)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center py-6 px-5">
              <span className="text-sm mb-2 t-muted">Срок подачи заявки</span>
              <span className="font-bold" style={{ color: "var(--green)", fontSize: "4rem", lineHeight: 1 }}>{selected.daysLeft}</span>
              <span className="font-semibold text-lg mt-1 t-primary">Дней осталось</span>
              <span className="text-sm mt-1 t-muted">{selected.hoursLeft}ч {selected.minutesLeft}м</span>
            </div>

            <div className="px-5 pb-4">
              {!applied ? (
                <button onClick={handleApply}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm"
                  style={{ background: "var(--green)" }}>
                  ПОДАТЬ ЗАЯВКУ
                </button>
              ) : (
                <div className="flex gap-2">
                  <div className="flex-1 py-3 rounded-xl text-center text-sm font-semibold"
                    style={{ background: "var(--green-dim)", color: "var(--green)" }}>
                    ✓ Заявка подана
                  </div>
                  <button onClick={handleWithdraw}
                    className="px-4 py-3 rounded-xl text-sm font-semibold"
                    style={{ background: "var(--bg-card2)", color: "var(--text-muted)" }}>
                    Отозвать
                  </button>
                </div>
              )}
            </div>

            {applied && activeApp && (
              <div className="px-5 pb-4">
                <h3 className="font-bold text-base mb-3 t-primary">Этапы подачи</h3>
                <div className="flex items-center gap-1 mb-3">
                  {APPLICATION_STAGES.map((stage, i) => (
                    <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full h-1.5 rounded-full"
                        style={{ background: i <= activeApp.stageIndex ? "var(--green)" : "var(--bg-card2)" }} />
                      <span className="text-center leading-tight" style={{ color: i <= activeApp.stageIndex ? "var(--green)" : "var(--text-muted)", fontSize: "9px" }}>
                        {stage}
                      </span>
                    </div>
                  ))}
                </div>
                {activeApp.stageIndex < 3 && (
                  <button onClick={handleAdvanceStage}
                    className="w-full py-2 rounded-xl text-sm font-semibold"
                    style={{ background: "var(--bg-card2)", color: "var(--text-muted)" }}>
                    Перейти к следующему этапу →
                  </button>
                )}
              </div>
            )}

            <div className="flex gap-1 px-5 pb-3">
              {(["docs", "files", "stages"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: tab === t ? "var(--green)" : "var(--bg-card2)",
                    color: tab === t ? "#fff" : "var(--text-muted)",
                  }}>
                  {t === "docs" ? "Документы" : t === "files" ? "Файлы" : "Прогресс"}
                </button>
              ))}
            </div>

            {tab === "docs" && (
              <div className="px-5 pb-4">
                <div className="space-y-2">
                  {selected.documents.map((doc) => {
                    const checked = activeApp?.checkedDocs.includes(doc) ?? false;
                    return (
                      <button key={doc} onClick={() => applied && handleToggleDoc(doc)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left"
                        style={{ background: "var(--bg-card2)", opacity: applied ? 1 : 0.6 }}>
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: checked ? "var(--green)" : "var(--text-muted)" }}>
                          {checked && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--green)" }} />}
                        </div>
                        <span className="text-sm t-primary">{doc}</span>
                      </button>
                    );
                  })}
                </div>
                {!applied && <p className="text-xs text-center mt-3 t-muted">Подайте заявку чтобы отмечать документы</p>}
              </div>
            )}

            {tab === "files" && (
              <div className="px-5 pb-4">
                <div className="space-y-2">
                  {selected.requiredFiles.map((file) => {
                    const uploaded = activeApp?.uploadedFiles.includes(file.name) ?? false;
                    return (
                      <button key={file.name} onClick={() => applied && handleToggleFile(file.name)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl"
                        style={{ background: "var(--bg-card2)", opacity: applied ? 1 : 0.6 }}>
                        <span className="text-xl">{file.icon}</span>
                        <span className="text-sm t-primary flex-1 text-left">{file.name}</span>
                        {uploaded
                          ? <span className="text-xs font-semibold" style={{ color: "var(--green)" }}>✓ Загружен</span>
                          : <span className="text-xs t-muted">Загрузить</span>}
                      </button>
                    );
                  })}
                </div>
                {!applied && <p className="text-xs text-center mt-3 t-muted">Подайте заявку чтобы отмечать файлы</p>}
              </div>
            )}

            {tab === "stages" && (
              <div className="px-5 pb-6">
                {APPLICATION_STAGES.map((stage, i) => {
                  const done = activeApp ? i <= activeApp.stageIndex : false;
                  return (
                    <div key={stage} className="flex items-start gap-3 mb-4">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold border-2"
                        style={{
                          borderColor: done ? "var(--green)" : "var(--bg-card2)",
                          background: done ? "var(--green)" : "var(--bg-main)",
                          color: done ? "#fff" : "var(--text-muted)",
                        }}>
                        {done ? "✓" : i + 1}
                      </div>
                      <div className="flex-1 py-0.5">
                        <p className="text-sm font-semibold" style={{ color: done ? "var(--text-primary)" : "var(--text-muted)" }}>{stage}</p>
                        {activeApp && i === activeApp.stageIndex && i > 0 && (
                          <p className="text-xs mt-0.5" style={{ color: "var(--green)" }}>Текущий этап</p>
                        )}
                      </div>
                    </div>
                  );
                })}
                {!applied && <p className="text-xs text-center t-muted">Подайте заявку чтобы отслеживать этапы</p>}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
