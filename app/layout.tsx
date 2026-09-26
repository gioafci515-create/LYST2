import type { Metadata } from "next";
import { Inter, Noto_Sans_Georgian, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Inter/Outfit have no Georgian glyphs; Noto Sans Georgian covers the fallback.
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
      className={`${inter.variable} ${outfit.variable} ${georgian.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
