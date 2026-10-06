import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import logo from "@/public/images/lyst-logo.png";
import LoginForm from "./LoginForm";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "login" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("login");

  return (
    <>
      <Header />
      <main className={styles.split}>
        <section className={styles.panel}>
          <div className={styles.head}>
            <Image src={logo} alt="LYST" width={140} height={50} className={styles.logo} />
            <div className={styles.headText}>
              <h1 className={styles.title}>{t("title")}</h1>
              <p className={styles.subtitle}>
                <span className="d-only">{t("subtitleDesktop")}</span>
                <span className="m-only">{t("subtitleMobile")}</span>
              </p>
            </div>
          </div>
          <LoginForm />
        </section>
        <aside className={styles.visual} aria-hidden="true">
          <div className="glow-dark" />
          <p className={styles.visualWordmark}>LYST</p>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
