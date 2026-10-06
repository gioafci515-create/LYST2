import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import InvitationCatalog from "./InvitationCatalog";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "invitations" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return { title: `${tNav("invitations")} — LYST`, description: t("heroLead") };
}

export default async function InvitationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("invitations");

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="glow-light" aria-hidden="true" />
          <h1 className={styles.title}>
            <span className="d-only">{t("heroTitle")}</span>
            <span className="m-only">{t("heroTitleMobile")}</span>
          </h1>
          <p className={styles.lead}>
            <span className="d-only">{t("heroLead")}</span>
            <span className="m-only">{t("heroLeadMobile")}</span>
          </p>
        </section>
        <InvitationCatalog />
      </main>
      <SiteFooter />
    </>
  );
}
