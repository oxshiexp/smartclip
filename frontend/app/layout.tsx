import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { ToastProvider } from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Smart Clipper",
  description: "Professional clip automation dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ToastProvider>
          <AppShell>{children}</AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}
