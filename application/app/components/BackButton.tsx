"use client";
import { useRouter } from "next/navigation";

interface Props {
  href?: string;
}

export function BackButton({ href }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={() => href ? router.push(href) : router.back()}
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: "var(--bg-card2)" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}
