import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import cameraShot from "@/public/images/features/camera-shot.png";
import gallery1 from "@/public/images/features/gallery-1.png";
import gallery2 from "@/public/images/features/gallery-2.png";
import gallery3 from "@/public/images/features/gallery-3.png";
import guestHero from "@/public/images/features/guest-hero.png";
import styles from "./page.module.css";

const SLUGS = ["event-camera", "guest-management"] as const;
type Slug = (typeof SLUGS)[number];

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SLUGS.includes(slug as Slug)) return {};
  const t = await getTranslations({ locale, namespace: "featureDetail" });
  if (slug === "event-camera") {
    return {
      title: `Event Camera — ${t("breadcrumbFeatures")} — LYST`,
      description: t("eventCamera.metaDescription"),
    };
  }
  return {
    title: `${t("guestManagement.title")} — ${t("breadcrumbFeatures")} — LYST`,
    description: t("guestManagement.metaDescription"),
  };
}

function Breadcrumbs({
  current,
  featuresLabel,
}: {
  current: string;
  featuresLabel: string;
}) {
  return (
    <nav className={styles.breadcrumbs} aria-label="breadcrumb">
      <Link href="/features">{featuresLabel}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}

async function EventCamera() {
  const t = await getTranslations("featureDetail");
  const guestSteps = t.raw("eventCamera.guestSteps") as string[];
  const hostSteps = t.raw("eventCamera.hostSteps") as string[];

  return (
    <>
      <Breadcrumbs current="Event Camera" featuresLabel={t("breadcrumbFeatures")} />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{t("eventCamera.eyebrow")}</p>
          <h1 className={styles.heroTitle}>Event Camera</h1>
          <p className={styles.heroSubtitle}>{t("eventCamera.heroSubtitle")}</p>
          <p className={styles.heroText}>{t("eventCamera.heroText")}</p>
        </div>

        <div className={styles.stage}>
          <div className={styles.phoneShell} role="img" aria-label={t("eventCamera.phoneAriaLabel")}>
            <div className={styles.phoneScreen}>
              <div className={styles.shot}>
                <Image src={cameraShot} alt="" sizes="240px" />
                <span className={styles.shotChip}>{t("eventCamera.shotChip")}</span>
              </div>
              <div className={styles.shutter}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/features/shutter.svg" alt="" width={56} height={56} />
                <span>{t("eventCamera.shutterLabel")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className={styles.dual}>
        <div className={styles.dualCol}>
          <p className={styles.dualLabel}>{t("eventCamera.guestLabel")}</p>
          <h2 className={styles.dualTitle}>{t("eventCamera.guestTitle")}</h2>
          <ol className={styles.steps}>
            {guestSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className={styles.dualCol}>
          <p className={styles.dualLabel}>{t("eventCamera.hostLabel")}</p>
          <h2 className={styles.dualTitle}>{t("eventCamera.hostTitle")}</h2>
          <ol className={styles.steps}>
            {hostSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <Divider />

      <section className={styles.result}>
        <div className={styles.resultHead}>
          <p className={styles.dualLabel}>{t("eventCamera.afterLabel")}</p>
          <h2 className={styles.resultTitle}>{t("eventCamera.afterTitle")}</h2>
        </div>
        <div className={styles.gallery}>
          {[gallery1, gallery2, gallery3].map((img, i) => (
            <div key={i} className={styles.galleryItem}>
              <Image src={img} alt="" sizes="(max-width: 640px) 100vw, 405px" />
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title={t("eventCamera.ctaTitle")}
        lead={t("eventCamera.ctaLead")}
        mobileTitle={t("eventCamera.ctaMobileTitle")}
        mobileLead={t("eventCamera.ctaMobileLead")}
      />
    </>
  );
}

async function GuestManagement() {
  const t = await getTranslations("featureDetail");
  const outcomes = t.raw("guestManagement.outcomes") as { value: string; label: string }[];

  return (
    <>
      <Breadcrumbs current={t("guestManagement.title")} featuresLabel={t("breadcrumbFeatures")} />

      <section className={`${styles.hero} ${styles.heroSubtle}`}>
        <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>{t("guestManagement.title")}</h1>
          <p className={styles.heroText}>{t("guestManagement.heroText")}</p>
        </div>
        <div className={styles.heroImage}>
          <Image src={guestHero} alt="" priority sizes="(max-width: 1100px) 100vw, 560px" />
        </div>
      </section>

      <section className={styles.perspective}>
        <div className={styles.perspectiveHead}>
          <h2 className={styles.perspectiveTitle}>{t("guestManagement.perspectiveTitle")}</h2>
          <p className={styles.perspectiveLead}>{t("guestManagement.perspectiveLead")}</p>
        </div>
        <div className={styles.perspectiveCards}>
          <article className={styles.perspectiveCard}>
            <h3>{t("guestManagement.hostCardTitle")}</h3>
            <p>{t("guestManagement.hostCardText")}</p>
          </article>
          <article className={styles.perspectiveCard}>
            <h3>{t("guestManagement.guestCardTitle")}</h3>
            <p>{t("guestManagement.guestCardText")}</p>
          </article>
        </div>
      </section>

      <section className={styles.outcomes}>
        <h2 className={styles.outcomesTitle}>{t("guestManagement.outcomesTitle")}</h2>
        <ul className={styles.outcomesList}>
          {outcomes.map((item) => (
            <li key={item.label} className={styles.outcome}>
              <span className={styles.outcomeValue}>{item.value}</span>
              <span className={styles.outcomeLabel}>{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title={t("guestManagement.ctaTitle")} lead={t("guestManagement.ctaLead")} />
    </>
  );
}

export default async function FeatureDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!SLUGS.includes(slug as Slug)) notFound();

  return (
    <>
      <Header />
      <main>{slug === "event-camera" ? <EventCamera /> : <GuestManagement />}</main>
      <SiteFooter />
    </>
  );
}
