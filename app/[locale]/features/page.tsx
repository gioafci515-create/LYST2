import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CtaBand from "@/components/CtaBand";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import previewCamera from "@/public/images/features/preview-camera.png";
import previewHidden from "@/public/images/features/preview-hidden.png";
import previewLetters from "@/public/images/features/preview-letters.png";
import previewVoice from "@/public/images/features/preview-voice.png";
import styles from "./page.module.css";

// experiences[3] (Event Camera) links out; the rest are display-only here
const EXPERIENCE_PHOTOS = [previewVoice, previewHidden, previewLetters, previewCamera, previewLetters, null];
const EXPERIENCE_ICONS = ["camera", "mic", "clock", "lock", "mail", "image"];
const EXPERIENCE_SMALL = [false, false, false, true, true, true];
const EXPERIENCE_HREF = [undefined, undefined, undefined, "/features/event-camera", undefined, undefined];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "features" });
  return { title: `${t("eyebrow")} — LYST`, description: t("heroLeadDesktop") };
}

function Arrow() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/invitations/arrow-right-14.svg" alt="" width={14} height={14} />
  );
}

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("features");

  const management = t.raw("management") as { n: string; title: string; text: string }[];
  const experiences = (t.raw("experiences") as { title: string; text: string; icon: string }[]).map(
    (item, i) => ({
      ...item,
      small: EXPERIENCE_SMALL[i],
      photo: EXPERIENCE_PHOTOS[i],
      href: EXPERIENCE_HREF[i],
    }),
  );
  const guestNames = t.raw("guestNames") as string[];

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="glow-light" aria-hidden="true" />
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
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

        {/* system 01 ------------------------------------------------- */}
        <section className={styles.system}>
          <div className={styles.systemHead}>
            <p className={styles.systemLabel}>{t("system1Label")}</p>
            <h2 className={styles.systemTitle}>{t("system1Title")}</h2>
          </div>

          <div className={styles.blocks}>
            <div className={styles.block}>
              <div className={styles.blockText}>
                <h3 className={styles.blockTitle}>{t("rsvpTitle")}</h3>
                <p className={styles.blockLead}>{t("rsvpLead")}</p>
                <Link href="/features/guest-management" className={styles.blockLink}>
                  {t("rsvpLink")} <Arrow />
                </Link>
              </div>
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <p className={styles.cardTitle}>{t("rsvpCardTitle")}</p>
                  <p className={styles.cardMeta}>{t("rsvpCardMeta")}</p>
                </div>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <p className={styles.statLabel}>{t("rsvpConfirmed")}</p>
                    <p className={styles.statValue}>{t("rsvpConfirmedCount")}</p>
                  </div>
                  <div className={`${styles.stat} ${styles.statMuted}`}>
                    <p className={styles.statLabel}>{t("rsvpPending")}</p>
                    <p className={styles.statValue}>{t("rsvpPendingCount")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.block} ${styles.blockReverse}`}>
              <div className={styles.card}>
                <p className={styles.listLabel}>{t("guestListLabel")}</p>
                {guestNames.map((name) => (
                  <div key={name} className={styles.guestRow}>
                    <span className={styles.guestName}>{name}</span>
                    <span className={styles.badgeOk}>{t("guestStatusConfirmed")}</span>
                  </div>
                ))}
              </div>
              <div className={styles.blockText}>
                <h3 className={styles.blockTitle}>{t("guestListTitle")}</h3>
                <p className={styles.blockLead}>{t("guestListLead")}</p>
                <Link href="/features/guest-management" className={styles.blockLink}>
                  {t("guestListLink")} <Arrow />
                </Link>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.blockText}>
                <h3 className={styles.blockTitle}>{t("logisticsTitle")}</h3>
                <p className={styles.blockLead}>{t("logisticsLead")}</p>
              </div>
              <div className={`${styles.card} ${styles.cardRow}`}>
                <div className={styles.infoCol}>
                  <p className={styles.infoLabel}>{t("whereWhenLabel")}</p>
                  <p className={styles.infoStrong}>{t("whereWhenStrong")}</p>
                  <p className={styles.infoSub}>{t("whereWhenSub")}</p>
                </div>
                <div className={styles.infoCol}>
                  <p className={styles.infoLabel}>{t("dressCodeLabel")}</p>
                  <span className={styles.infoChip}>{t("dressCodeChip")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* mobile: numbered list */}
          <div className={styles.mobileList}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelMain}>{t("mobileOrgLabel")}</span>
              <span className={styles.sectionLabelSub}>01 // 02</span>
            </div>
            <ol className={styles.numbered}>
              {management.map((item) => (
                <li key={item.n} className={styles.numberedItem}>
                  <div className={styles.numberedHead}>
                    <span className={styles.numberedN}>{item.n}</span>
                    <h3 className={styles.numberedTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.numberedText}>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Divider className={styles.systemDivider} />

        {/* system 02 ------------------------------------------------- */}
        <section className={`${styles.system} ${styles.systemSubtle}`}>
          <div className={styles.systemHead}>
            <p className={styles.systemLabel}>{t("system2Label")}</p>
            <h2 className={styles.systemTitle}>{t("system2Title")}</h2>
          </div>

          <div className={styles.experienceGrid}>
            {experiences.map((item) => {
              const body = (
                <>
                  <div className={styles.experienceHead}>
                    <h3
                      className={`${styles.experienceTitle}${item.small ? ` ${styles.experienceTitleSm}` : ""}`}
                    >
                      {item.title}
                    </h3>
                    <span className={styles.iconDisc} aria-hidden="true">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/features/icon-${item.icon}.svg`}
                        alt=""
                        width={18}
                        height={18}
                      />
                    </span>
                  </div>
                  <p className={styles.experienceText}>{item.text}</p>
                </>
              );
              return item.href ? (
                <Link key={item.title} href={item.href} className={styles.experience}>
                  {body}
                </Link>
              ) : (
                <article key={item.title} className={styles.experience}>
                  {body}
                </article>
              );
            })}
          </div>

          {/* mobile: photo cards */}
          <div className={styles.mobileExperiences}>
            <div className={styles.sectionLabelStack}>
              <span className={styles.sectionLabelMain}>{t("extendedLabel")}</span>
              <span className={styles.sectionLabelSub}>{t("extendedSub")}</span>
            </div>
            <p className={styles.mobileNote}>{t("mobileNote")}</p>
            <ul className={styles.photoCards}>
              {experiences
                .filter((e) => e.photo)
                .map((item) => (
                  <li key={item.title} className={styles.photoCard}>
                    <div className={styles.photoCardImage}>
                      <Image src={item.photo!} alt="" sizes="(max-width: 640px) 100vw, 350px" />
                    </div>
                    <div className={styles.photoCardBody}>
                      <h3 className={styles.photoCardTitle}>{item.title}</h3>
                      <p className={styles.photoCardText}>{item.text}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.consult}>
            <p className={styles.consultText}>
              <span className="d-only">{t("consultTextDesktop")}</span>
              <span className="m-only">{t("consultTextMobile")}</span>
            </p>
            <Link href="/booking" className={styles.consultButton}>
              {t("consultButton")}
            </Link>
          </div>
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
