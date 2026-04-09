"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MentorPanelPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/home"); }, [router]);
  return null;
}
