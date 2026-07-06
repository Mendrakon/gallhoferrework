import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Schriftfamilie laut docs/superpowers/research/gallhofer-tokens.md
const body = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gallhofer Haustechnik",
    template: "%s – Gallhofer Haustechnik",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT" className={body.variable}>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-text">
        {children}
      </body>
    </html>
  );
}
