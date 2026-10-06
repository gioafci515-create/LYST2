import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CtaBand from "@/components/CtaBand";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import mGallery1 from "@/public/images/about/m-gallery-1.png";
import mGallery2 from "@/public/images/about/m-gallery-2.png";
import mGallery3 from "@/public/images/about/m-gallery-3.png";
import photo1 from "@/public/images/about/photo-1.png";
import photo2 from "@/public/images/about/photo-2.png";
import photo3 from "@/public/images/about/photo-3.png";
import story1 from "@/public/images/about/story-1.png";
import story2 from "@/public/images/about/story-2.png";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: `${t("eyebrowDesktop")} — LYST`,
    description: t("heroTitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const changes = t.raw("changes") as { from: string; to: string; text: string }[];
  const principles = t.raw("principles") as { n: string; title: string; text: string }[];

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
          <p className={styles.quote}>{t("quote")}</p>
        </section>

        {/* desktop story ------------------------------------------- */}
        <div className={styles.desktopOnly}>
          <section className={styles.story}>
            <div className={styles.storyText}>
              <p className={styles.label}>{t("missionLabel")}</p>
              <h2 className={styles.storyTitle}>{t("missionTitle")}</h2>
              <p className={styles.storyBody}>{t("missionBody")}</p>
            </div>
            <div className={styles.storyImage}>
              <Image src={story1} alt="" sizes="(max-width: 1100px) 100vw, 560px" />
            </div>
          </section>

          <section className={`${styles.story} ${styles.storySubtle} ${styles.storyStack}`}>
            <div className={styles.storyHead}>
              <p className={styles.label}>{t("transformLabel")}</p>
              <h2 className={styles.storyTitle}>{t("transformTitle")}</h2>
            </div>
            <div className={styles.changes}>
              {changes.map((item) => (
                <article key={item.from} className={styles.change}>
                  <div className={styles.changeHead}>
                    <span className={styles.changeFrom}>{item.from}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/about/arrow-right-12.svg" alt="" width={12} height={12} />
                    <strong className={styles.changeTo}>{item.to}</strong>
                  </div>
                  <p className={styles.changeText}>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.story} ${styles.storyReverse}`}>
            <div className={styles.storyImage}>
              <Image src={story2} alt="" sizes="(max-width: 1100px) 100vw, 560px" />
            </div>
            <div className={styles.storyText}>
              <p className={styles.label}>{t("visionLabel")}</p>
              <h2 className={styles.storyTitle}>{t("visionTitle")}</h2>
              <p className={styles.storyBody}>{t("visionBody")}</p>
            </div>
          </section>

          <section className={styles.photos}>
            <h2 className={styles.photosTitle}>{t("photosTitle")}</h2>
            <div className={styles.photoRow}>
              {[photo1, photo2, photo3].map((img, i) => (
                <div key={i} className={styles.photo}>
                  <Image src={img} alt="" sizes="(max-width: 1024px) 33vw, 410px" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* mobile principles + gallery -------------------------------- */}
        <div className={styles.mobileOnly}>
          <section className={styles.mobileSection}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelMain}>{t("principlesLabel")}</span>
              <span className={styles.sectionLabelSub}>01 // 03</span>
            </div>
            <ol className={styles.principles}>
              {principles.map((p) => (
                <li key={p.n} className={styles.principle}>
                  <div className={styles.principleHead}>
                    <span className={styles.principleN}>{p.n}</span>
                    <h2 className={styles.principleTitle}>{p.title}</h2>
                  </div>
                  <p className={styles.principleText}>{p.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={`${styles.mobileSection} ${styles.mobileGallery}`}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelMain}>{t("galleryLabel")}</span>
              <span className={styles.sectionLabelSub}>02 // 03</span>
            </div>
            <div className={styles.galleryList}>
              {[mGallery1, mGallery2, mGallery3].map((img, i) => (
                <div key={i} className={styles.galleryItem}>
                  <Image src={img} alt="" sizes="(max-width: 640px) 100vw, 1px" />
                </div>
              ))}
            </div>
          </section>

          <CtaBand title={t("ctaTitle")} lead={t("ctaLead")} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
