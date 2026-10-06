import type { Metadata } from "next";
import {
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
  Noto_Sans_Georgian,
} from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ScrollToTop from "@/components/ScrollToTop";
import { routing } from "@/i18n/routing";
import "../globals.css";

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
// covers the fallback.
const georgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-georgian",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_URL = "https://lyst.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        ka: "/",
        en: "/en",
        ru: "/ru",
        "x-default": "/",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // enables static rendering for this locale
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${interTight.variable} ${mono.variable} ${serifAccent.variable} ${georgian.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          {children}
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
