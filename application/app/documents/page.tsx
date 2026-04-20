"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { User, Application } from "@/lib/types";
import { getUser, getApplications } from "@/lib/storage";
import { ApplicationCard } from "@/app/components/ApplicationCard";
import { BottomNav } from "@/app/components/BottomNav";
import { AppHeader } from "@/app/components/AppHeader";
import { useTranslation } from "@/lib/i18n";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [user, setUser]               = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    setUser(getUser());
    setApplications(getApplications());
  }, []);

  return (
    <div className="min-h-screen flex flex-col pb-32" style={{ background: "var(--bg-main)" }}>

      <AppHeader />

      {/* Profile card */}
      <div className="px-5 pb-4">
        {user ? (
          <div className="flex items-center gap-3 mt-4 p-4 rounded-2xl" style={{ background: "var(--bg-card)" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ background: "var(--green-dim)", color: "var(--green)" }}>
              {user.name[0]?.toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-bold text-base t-primary">{user.name}</p>
              {user.city && <p className="text-sm mt-0.5 t-muted">{user.city}</p>}
              <p className="text-xs mt-1 t-muted">{applications.length} {t("profile.myApplications").toLowerCase()}</p>
            </div>
            <Link href="/home">
              <button className="px-3 py-1.5 rounded-xl text-xs font-semibold t-muted"
                style={{ background: "var(--bg-card2)" }}>
                {t("profile.edit")}
              </button>
            </Link>
          </div>
        ) : (
          <div className="p-4 rounded-2xl text-center" style={{ background: "var(--bg-card)" }}>
            <p className="text-sm t-muted">{t("profile.noProfile")}</p>
            <Link href="/home">
              <button className="mt-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "var(--green)" }}>
                {t("profile.createProfile")}
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Applications */}
      <div className="px-5">
        <h2 className="font-bold text-base mb-3 t-primary">{t("profile.myApplications")}</h2>

        {applications.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ background: "var(--bg-card)" }}>
            <p className="text-sm mb-3 t-muted">{t("profile.noApplications")}</p>
            <Link href="/onboarding">
              <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "var(--green)" }}>
                {t("profile.findScholarships")}
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
