"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SCHOLARSHIPS } from "@/lib/scholarships";
import { APPLICATION_STAGES } from "@/lib/types";
import type { LocalizedScholarship, User, Application } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";
import { localizeScholarship } from "@/lib/types";
import {
  getUser, upsertUser,
  getSavedIds, toggleSaved,
  getApplications, getApplication, isApplied,
  applyToScholarship, withdrawApplication,
  advanceStage, toggleDocument, toggleUploadedFile,
} from "@/lib/storage";
import { ApplicationCard } from "@/app/components/ApplicationCard";
import { BottomNav } from "@/app/components/BottomNav";
import { NameModal } from "@/app/components/NameModal";
import { AppHeader } from "@/app/components/AppHeader";

const FILTER_KEYS = [
  { value: "all",     labelKey: "home.filter.all"     as const },
  { value: "foreign", labelKey: "home.filter.foreign"  as const },
  { value: "local",   labelKey: "home.filter.local"    as const },
];

// ── Main page ─────────────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch]             = useState("");
  const [savedIds, setSavedIds]         = useState<number[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [user, setUser]                 = useState<User | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [selected, setSelected]         = useState<LocalizedScholarship | null>(null);
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
    .filter((s) => activeFilter === "all" || s.categoryKey === activeFilter)
    .filter((s) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const loc = localizeScholarship(s, lang);
      return s.title.toLowerCase().includes(q) || loc.institution.toLowerCase().includes(q);
    })
    .map((s) => localizeScholarship(s, lang));

  const handleSaveName = (name: string) => {
    upsertUser({ name });
    router.push("/onboarding");
  };

  const handleToggleSave = (id: number) => setSavedIds(toggleSaved(id));

  const openModal = (s: LocalizedScholarship) => {
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

      <AppHeader />

      {/* My applications */}
      {applications.length > 0 && (
        <div className="px-5 pb-3 space-y-3">
          <p className="font-semibold text-sm t-primary">{t("home.myApplications")}</p>
          {applications.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
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
            placeholder={t("home.search.placeholder")}
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
        {FILTER_KEYS.map((f) => (
          <button key={f.value} onClick={() => setActiveFilter(f.value)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: activeFilter === f.value ? "var(--green)" : "var(--bg-card2)",
              color: activeFilter === f.value ? "#fff" : "var(--text-muted)",
            }}>
            {t(f.labelKey)}
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
                {t("home.card.details")}
              </button>
            </div>
          );
        })}
      </div>

      <BottomNav />

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
              <span className="text-sm mb-2 t-muted">{t("home.card.deadline")}</span>
              <span className="font-bold" style={{ color: "var(--green)", fontSize: "4rem", lineHeight: 1 }}>{selected.daysLeft}</span>
              <span className="font-semibold text-lg mt-1 t-primary">{t("home.card.daysLeft")}</span>
              <span className="text-sm mt-1 t-muted">{selected.hoursLeft}ч {selected.minutesLeft}м</span>
            </div>

            <div className="px-5 pb-4">
              {!applied ? (
                <button onClick={handleApply}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm"
                  style={{ background: "var(--green)" }}>
                  {t("home.apply")}
                </button>
              ) : (
                <div className="flex gap-2">
                  <div className="flex-1 py-3 rounded-xl text-center text-sm font-semibold"
                    style={{ background: "var(--green-dim)", color: "var(--green)" }}>
                    {t("home.applied")}
                  </div>
                  <button onClick={handleWithdraw}
                    className="px-4 py-3 rounded-xl text-sm font-semibold"
                    style={{ background: "var(--bg-card2)", color: "var(--text-muted)" }}>
                    {t("home.withdraw")}
                  </button>
                </div>
              )}
            </div>

            {applied && activeApp && (
              <div className="px-5 pb-4">
                <h3 className="font-bold text-base mb-3 t-primary">{t("home.stages.title")}</h3>
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
                    {t("home.stages.next")}
                  </button>
                )}
              </div>
            )}

            <div className="flex gap-1 px-5 pb-3">
              {(["docs", "files", "stages"] as const).map((tabKey) => (
                <button key={tabKey} onClick={() => setTab(tabKey)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: tab === tabKey ? "var(--green)" : "var(--bg-card2)",
                    color: tab === tabKey ? "#fff" : "var(--text-muted)",
                  }}>
                  {tabKey === "docs" ? t("home.tab.docs") : tabKey === "files" ? t("home.tab.files") : t("home.tab.stages")}
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
                {!applied && <p className="text-xs text-center mt-3 t-muted">{t("home.docs.applyFirst")}</p>}
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
                          ? <span className="text-xs font-semibold" style={{ color: "var(--green)" }}>{t("home.file.uploaded")}</span>
                          : <span className="text-xs t-muted">{t("home.file.upload")}</span>}
                      </button>
                    );
                  })}
                </div>
                {!applied && <p className="text-xs text-center mt-3 t-muted">{t("home.files.applyFirst")}</p>}
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
                          <p className="text-xs mt-0.5" style={{ color: "var(--green)" }}>{t("home.stages.current")}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
                {!applied && <p className="text-xs text-center t-muted">{t("home.stages.applyFirst")}</p>}
              </div>
            )}

            {/* Subscription plans */}
            <div className="px-5 pt-2 pb-6">
              <div className="h-px mb-5" style={{ background: "var(--bg-card2)" }} />
              <p className="font-bold text-base mb-1 t-primary">{t("home.help.title")}</p>
              <p className="text-xs mb-4 t-muted">{t("home.help.subtitle")}</p>
              <div className="space-y-3">
                {[
                  {
                    name: "Starter", price: "50с", color: "var(--green)",
                    features: [t("plan.starter.f1"), t("plan.starter.f2"), t("plan.starter.f3")],
                  },
                  {
                    name: "Pro", price: "300с", color: "#f59e0b", badge: t("home.plan.recommended"),
                    features: [t("plan.pro.f1"), t("plan.pro.f2"), t("plan.pro.f3")],
                  },
                ].map((plan) => (
                  <div key={plan.name} className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--input-border)" }}>
                    <div className="px-4 py-3 flex items-center justify-between" style={{ background: plan.color }}>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{plan.name}</span>
                        {plan.badge && (
                          <span className="text-xs bg-white/25 text-white px-2 py-0.5 rounded-full font-semibold">{plan.badge}</span>
                        )}
                      </div>
                      <span className="font-bold text-white text-lg">{plan.price}</span>
                    </div>
                    <div className="px-4 py-3" style={{ background: "var(--bg-card2)" }}>
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 mb-1.5">
                          <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: plan.color }}>✓</span>
                          <p className="text-xs t-muted">{f}</p>
                        </div>
                      ))}
                      <button className="w-full py-2.5 rounded-xl font-bold text-white text-sm mt-2"
                        style={{ background: plan.color }}>
                        {t("home.plan.choose")} {plan.name} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
