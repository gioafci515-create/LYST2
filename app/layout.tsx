import type { Metadata } from "next";
import {
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
  Noto_Sans_Georgian,
} from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "variable",
  display: "swap",
});

// accent serif: used once or twice per page max, italic, mixed into a
// headline alongside the sans (e.g. the LYST wordmark in the hero)
const serifAccent = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif-accent",
  weight: "400",
  style: ["italic", "normal"],
  display: "swap",
});

// Inter Tight / JetBrains Mono have no Georgian glyphs; Noto Sans Georgian
// covers the fallback — the site's own copy is in Georgian.
const georgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-georgian",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LYST — ერთი ბმული მთელი ღონისძიებისთვის",
  description:
    "შექმენი ციფრული მოსაწვევი, მართე სტუმრების დასწრება და LYST-ის გუნდთან ერთად აქციე ღონისძიება ცოცხალ გამოცდილებად.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ka"
      className={`${interTight.variable} ${mono.variable} ${serifAccent.variable} ${georgian.variable}`}
    >
      <body>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
