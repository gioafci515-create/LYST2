import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CtaBand from "@/components/CtaBand";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: `${t("eyebrowDesktop")} — LYST`, description: t("heroLead") };
}

function Check({ strong }: { strong?: boolean }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/pricing/${strong ? "check-14-strong" : "check-14"}.svg`}
        alt=""
        width={14}
        height={14}
        className="d-only"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/pricing/m-check-16.svg"
        alt=""
        width={16}
        height={16}
        className="m-only"
      />
    </>
  );
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");

  const selfFeatures = t.raw("selfFeatures") as { text: string; mobile: boolean }[];
  const premiumFeatures = t.raw("premiumFeatures") as { text: string; mobile: boolean }[];
  const comparisonRows = t.raw("comparisonRows") as string[][];
  const faqDesktop = t.raw("faqDesktop") as { q: string; a: string }[];
  const faqMobile = t.raw("faqMobile") as { q: string; a: string }[];

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="glow-light" aria-hidden="true" />
          <p className={styles.eyebrow}>
            <span className="d-only">{t("eyebrowDesktop")}</span>
            <span className="m-only">{t("eyebrowMobile")}</span>
          </p>
          <h1 className={styles.heroTitle}>
            <span className="d-only">{t("heroTitle")}</span>
            <span className="m-only">{t("heroTitleMobile")}</span>
          </h1>
          <p className={styles.heroLead}>{t("heroLead")}</p>
        </section>

        <section className={styles.plans}>
          <article className={styles.plan}>
            <header className={styles.planHead}>
              <h2 className={styles.planTitle}>{t("selfTitle")}</h2>
              <p className={styles.planDesc}>
                <span className="d-only">{t("selfDescDesktop")}</span>
                <span className="m-only">{t("selfDescMobile")}</span>
              </p>
            </header>
            <p className={styles.price}>{t("selfPrice")}</p>
            <Divider className={styles.planRule} />
            <ul className={styles.features}>
              {selfFeatures.map((item) => (
                <li
                  key={item.text}
                  className={`${styles.feature}${item.mobile ? "" : ` ${styles.featureDesktopOnly}`}`}
                >
                  <Check />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <Link href="/create" className={styles.planButton}>
              {t("selfCta")}
            </Link>
          </article>

          <article className={`${styles.plan} ${styles.planPremium}`}>
            <span className={styles.planBadge}>
              <span className="d-only">{t("premiumBadgeDesktop")}</span>
              <span className="m-only">{t("premiumBadgeMobile")}</span>
            </span>
            <header className={styles.planHead}>
              <h2 className={styles.planTitle}>{t("premiumTitle")}</h2>
              <p className={styles.planDesc}>{t("premiumDesc")}</p>
            </header>
            <p className={styles.price}>{t("premiumPrice")}</p>
            <Divider className={styles.planRule} />
            <ul className={styles.features}>
              {premiumFeatures.map((item) => (
                <li
                  key={item.text}
                  className={`${styles.feature} ${styles.featureStrong}${item.mobile ? "" : ` ${styles.featureDesktopOnly}`}`}
                >
                  <Check strong />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <Link href="/booking" className={styles.planButton}>
              {t("premiumCta")}
            </Link>
          </article>
        </section>

        <section className={styles.comparison}>
          <h2 className={styles.sectionTitle}>{t("comparisonTitle")}</h2>
          <div className={styles.table} role="table" aria-label={t("comparisonLabel")}>
            <div className={`${styles.row} ${styles.rowHead}`} role="row">
              <span role="columnheader">{t("comparisonPathHeader")}</span>
              <span role="columnheader" className={styles.cell}>
                {t("selfTitle")}
              </span>
              <span role="columnheader" className={styles.cell}>
                {t("premiumTitle")}
              </span>
            </div>
            {comparisonRows.map(([label, a, b]) => (
              <div key={label} className={styles.row} role="row">
                <span role="rowheader">{label}</span>
                <span role="cell" className={styles.cell}>
                  {a}
                </span>
                <span role="cell" className={styles.cell}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* desktop FAQ */}
        <section className={styles.faq}>
          <h2 className={styles.sectionTitle}>{t("faqTitle")}</h2>
          <div className={styles.faqList}>
            {faqDesktop.map((item, i) => (
              <details key={item.q} className={styles.faqItem} open={i === 0}>
                <summary className={styles.faqSummary}>
                  <span>{item.q}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/pricing/chevron-down-16.svg" alt="" width={16} height={16} className={styles.faqChevron} />
                </summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* mobile FAQ */}
        <section className={styles.mobileFaq}>
          <h2 className={styles.mobileFaqTitle}>{t("faqTitle")}</h2>
          <div className={styles.mobileFaqList}>
            <p className={styles.mobileFaqNote}>{t("faqMobileNote")}</p>
            {faqMobile.map((item, i) => (
              <details key={item.q} className={styles.mobileFaqItem} open={i === 0}>
                <summary className={styles.mobileFaqSummary}>
                  <span>{item.q}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/pricing/m-chevron-down-20.svg" alt="" width={20} height={20} className={styles.faqChevron} />
                </summary>
                <p className={styles.mobileFaqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className={styles.mobileCta}>
          <CtaBand title={t("ctaTitle")} lead={t("ctaLead")} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
