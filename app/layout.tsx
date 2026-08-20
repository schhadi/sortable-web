import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/config";

// Broadsheet sets everything — headings, body and interface chrome — in one
// serif. The system is explicit that the serif IS the chrome.
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: `${BRAND} — an early concept`,
  description:
    "Every document you own, searchable by a half-remembered sentence. A concept note — nothing has been built yet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={serif.variable}>
      <body>{children}</body>
    </html>
  );
}
