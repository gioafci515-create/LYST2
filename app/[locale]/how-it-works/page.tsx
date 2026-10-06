import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CtaBand from "@/components/CtaBand";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import preview3 from "@/public/images/invitations/golden.png";
import preview2 from "@/public/images/invitations/minimal.png";
import preview1 from "@/public/images/invitations/moonlight.png";
import preview4 from "@/public/images/features/preview-voice.png";
import memory1 from "@/public/images/how-it-works/memory-1.png";
import memory2 from "@/public/images/how-it-works/memory-2.png";
import memory3 from "@/public/images/how-it-works/memory-3.png";
import CopyLink from "./CopyLink";
import styles from "./page.module.css";

const MOBILE_IMAGES = [preview1, preview2, preview3, preview4];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howItWorks" });
  return { title: `${t("eyebrowDesktop")} — LYST`, description: t("heroLeadDesktop") };
}

function Copy({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.copy}>
      <p className={styles.num}>{n}</p>
      <h2 className={styles.stepTitle}>{title}</h2>
      <p className={styles.stepText}>{children}</p>
    </div>
  );
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("howItWorks");

  const mobileSteps = t.raw("mobileSteps") as { n: string; title: string; text: string }[];

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
            <span className="d-only">{t("heroTitleDesktop")}</span>
            <span className="m-only">{t("heroTitleMobile")}</span>
          </h1>
          <p className={styles.heroLead}>
            <span className="d-only">{t("heroLeadDesktop")}</span>
            <span className="m-only">{t("heroLeadMobile")}</span>
          </p>
        </section>

        <Divider className={styles.heroDivider} />

        {/* desktop journey */}
        <section className={styles.journey}>
          <div className={styles.step}>
            <Copy n="01" title={t("step1Title")}>
              {t("step1Text")}
            </Copy>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("card1Title")}</p>
              <div className={styles.fields}>
                <p className={styles.field}>{t("card1FieldName")}</p>
                <p className={styles.field}>{t("card1FieldLocation")}</p>
              </div>
            </div>
          </div>

          <div className={`${styles.step} ${styles.reverse}`}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("card2Title")}</p>
              <div className={styles.linkBox}>
                <span className={styles.linkText}>lyst.ge/autumn-dinner</span>
                <CopyLink value="lyst.ge/autumn-dinner" className={styles.copyBtn} />
              </div>
            </div>
            <Copy n="02" title={t("step2Title")}>
              {t("step2Text")}
            </Copy>
          </div>

          <div className={styles.step}>
            <Copy n="03" title={t("step3Title")}>
              {t("step3Text")}
            </Copy>
            <div className={`${styles.card} ${styles.cardCenter}`}>
              <p className={styles.cardTitle}>{t("card3Title")}</p>
              <span className={styles.record} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/how-it-works/icon-mic.svg" alt="" width={24} height={24} />
              </span>
              <p className={styles.recordHint}>{t("card3Hint")}</p>
            </div>
          </div>

          <div className={`${styles.step} ${styles.reverse}`}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("card4Title")}</p>
              <div className={styles.memories}>
                {[memory1, memory2, memory3].map((img, i) => (
                  <div key={i} className={styles.memory}>
                    <Image src={img} alt="" sizes="(max-width: 1100px) 33vw, 180px" />
                  </div>
                ))}
              </div>
            </div>
            <Copy n="04" title={t("step4Title")}>
              {t("step4Text")}
            </Copy>
          </div>
        </section>

        {/* mobile steps */}
        <section className={styles.mobileSteps}>
          {mobileSteps.map((step, i) => (
            <article key={step.n} className={styles.mobileStep}>
              <div className={styles.mobileHead}>
                <span className={styles.mobileNum}>{step.n}</span>
                <h2 className={styles.mobileTitle}>{step.title}</h2>
              </div>
              <p className={styles.mobileText}>{step.text}</p>
              <div className={styles.mobileImage}>
                <Image src={MOBILE_IMAGES[i]} alt="" sizes="(max-width: 640px) 100vw, 1px" />
              </div>
            </article>
          ))}
        </section>

        <CtaBand
          title={t("ctaTitle")}
          lead={t("ctaLead")}
          mobileTitle={t("ctaMobileTitle")}
          mobileLead={t("ctaMobileLead")}
        />
      </main>
      <SiteFooter />
    </>
  );
}
