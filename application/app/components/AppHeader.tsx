"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/app/theme-provider";
import { getUser, clearProfile } from "@/lib/storage";
import type { User } from "@/lib/types";
import { useTranslation } from "@/lib/i18n";

export function AppHeader() {
  const router = useRouter();
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    clearProfile();
    router.push("/");
  };

  return (
    <div className="px-5 pt-8 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-widest" style={{ color: "var(--green)" }}>RAKHNAMO</h1>
        <ThemeToggle />
      </div>
      {user && (
        <div className="flex items-center justify-between mt-3 px-1">
          <div>
            <p className="font-semibold text-sm t-primary">{t("header.greeting", { name: user.name })}</p>
            {user.city && <p className="text-xs mt-0.5 t-muted">{user.city}</p>}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: "var(--green-dim)", color: "var(--green)" }}>
              {user.name[0]?.toUpperCase()}
            </div>
            <button
              onClick={() => router.push("/onboarding")}
              className="flex items-center gap-1.5 px-3 h-9 rounded-full font-bold text-xs text-white"
              style={{ background: "var(--green)" }}
              title="AI">
              <span style={{ fontSize: 13 }}>✦✦✦</span>
              AI
            </button>
            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "var(--bg-card2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
