import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Rakhnamo",
  description: "Ваш путеводитель по образованию",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen flex justify-center" style={{ background: "#0b1220" }}>
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
