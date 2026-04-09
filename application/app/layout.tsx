import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

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
        <ThemeProvider>
          <div className="min-h-screen flex justify-center" style={{ background: "var(--bg-main)" }}>
            <div className="w-full max-w-sm">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
