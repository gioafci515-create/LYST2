import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import camera from "@/public/images/product/camera.png";
import memory1 from "@/public/images/product/memory-1.png";
import memory2 from "@/public/images/product/memory-2.png";
import phoneHero from "@/public/images/product/phone-hero.png";
import styles from "./page.module.css";

// bar heights of the voice-message waveform; the last two are "unplayed"
const WAVE = [18, 12, 24, 6, 16, 10];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "product" });
  return { title: `${t("heroTitle")} — LYST`, description: t("heroLead") };
}

function Copy({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.copy}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.copyTitle}>{title}</h2>
      <p className={styles.copyText}>{children}</p>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("product");
  const tNav = await getTranslations("nav");
  const guests = t.raw("guests") as {
    name: string;
    note: string;
    status: "ok" | "wait";
    extra?: boolean;
  }[];

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="glow-light" aria-hidden="true" />
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>{t("heroTitle")}</h1>
            <p className={styles.heroLead}>{t("heroLead")}</p>
          </div>
          <div className={styles.heroActions}>
            <Link href="/create" className="btn btn-primary btn-md">
              {tNav("createCta")}
            </Link>
            <Link href="/how-it-works" className={styles.heroLink}>
              {t("seeHow")}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/product/arrow-right-16.svg"
                alt=""
                width={16}
                height={16}
                className={styles.arrowLg}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/arrow-right.svg"
                alt=""
                width={12}
                height={12}
                className={styles.arrowSm}
              />
            </Link>
          </div>
        </section>

        <Divider />

        {/* 01 — invitation */}
        <section className={styles.module}>
          <div className={`${styles.media} ${styles.phoneWrap}`}>
            <div className={styles.phone}>
              <div className={styles.screen}>
                <div className={styles.statusBar} aria-hidden="true">
                  <span className={styles.statusTime}>9:41</span>
                  <span className={styles.statusIcons}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/product/status-signal.svg" alt="" width={14} height={10} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/product/status-wifi.svg" alt="" width={14} height={10} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/product/status-battery.svg" alt="" width={18} height={10} />
                  </span>
                </div>
                <div className={styles.phoneImage}>
                  <Image src={phoneHero} alt="" sizes="270px" />
                </div>
                <div className={styles.phoneBody}>
                  <p className={styles.phoneTitle}>{t("demoEventTitle")}</p>
                  <p className={styles.phoneHost}>{t("demoEventHost")}</p>
                  <Divider />
                  <div className={styles.phoneMeta}>
                    <div className={styles.phoneMetaRow}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/product/icon-calendar.svg" alt="" width={14} height={14} />
                      <span>{t("demoEventWhen")}</span>
                    </div>
                    <div className={styles.phoneMetaRow}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/product/icon-pin.svg" alt="" width={14} height={14} />
                      <span>{t("demoEventWhere")}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.phoneRsvp}>
                  <span>{t("demoRsvpAttend")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.media} ${styles.mobileImage}`}>
            <Image src={phoneHero} alt="" sizes="(max-width: 640px) 100vw, 1px" />
          </div>
          <Copy eyebrow={t("m1Eyebrow")} title={t("m1Title")}>
            {t("m1Text")}
          </Copy>
        </section>

        <Divider />

        {/* 02 — RSVP responses */}
        <section className={`${styles.module} ${styles.subtle} ${styles.reverse}`}>
          <div className={styles.media}>
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <p className={styles.panelTitle}>{t("rsvpPanelTitle")}</p>
                <span className={styles.chip}>{t("rsvpPanelChip")}</span>
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <p className={styles.statLabel}>{t("rsvpConfirmed")}</p>
                  <p className={styles.statValue}>{t("rsvpConfirmedCount")}</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statLabel}>{t("rsvpDeclined")}</p>
                  <p className={styles.statValue}>{t("rsvpDeclinedCount")}</p>
                </div>
              </div>
            </div>
          </div>
          <Copy eyebrow={t("m2Eyebrow")} title={t("m2Title")}>
            {t("m2Text")}
          </Copy>
        </section>

        <Divider />

        {/* 03 — guest management */}
        <section className={styles.module}>
          <div className={styles.media}>
            <div className={styles.guestPanel}>
              <div className={styles.guestHead}>
                <p className={styles.panelTitle}>{t("guestListTitle")}</p>
                <p className={styles.guestHint}>{t("guestListHint")}</p>
              </div>
              <ul className={styles.guestList}>
                {guests.map((guest) => (
                  <li
                    key={guest.name}
                    className={`${styles.guestRow}${guest.extra ? ` ${styles.guestRowExtra}` : ""}`}
                  >
                    <div className={styles.guestName}>
                      <strong>{guest.name}</strong>
                      <span>{guest.note}</span>
                    </div>
                    <span
                      className={`${styles.badge} ${guest.status === "ok" ? styles.badgeOk : styles.badgeWait}`}
                    >
                      {guest.status === "ok" ? t("guestStatusOk") : t("guestStatusWait")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Copy eyebrow={t("m3Eyebrow")} title={t("m3Title")}>
            {t("m3Text")}
          </Copy>
        </section>

        <Divider />

        {/* 04 — participation */}
        <section className={`${styles.module} ${styles.subtle} ${styles.reverse}`}>
          <div className={styles.media}>
            <div className={styles.stack}>
              <div className={styles.voice}>
                <span className={styles.voiceIcon} aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/product/icon-mic.svg" alt="" width={14} height={14} />
                </span>
                <div className={styles.voiceBody}>
                  <div className={styles.voiceMeta}>
                    <strong>{t("voiceName")}</strong>
                    <span>22:15</span>
                  </div>
                  <div className={styles.wave} aria-hidden="true">
                    {WAVE.map((h, i) => (
                      <i key={i} className={i > 3 ? styles.off : undefined} style={{ height: h }} />
                    ))}
                  </div>
                </div>
                <span className={styles.voiceTime}>0:18</span>
              </div>
              <div className={styles.camera}>
                <div className={styles.cameraHead}>
                  <p className={styles.cameraLabel}>
                    <span className="d-only">{t("liveCameraDesktop")}</span>
                    <span className="m-only">{t("liveCameraMobile")}</span>
                  </p>
                  <span className={styles.liveDot} aria-hidden="true" />
                </div>
                <div className={styles.cover}>
                  <Image src={camera} alt="" sizes="(max-width: 640px) 100vw, 685px" />
                </div>
              </div>
            </div>
          </div>
          <Copy eyebrow={t("m4Eyebrow")} title={t("m4Title")}>
            {t("m4Text")}
          </Copy>
        </section>

        <Divider />

        {/* 05 — memories */}
        <section className={styles.module}>
          <div className={styles.media}>
            <div className={styles.memories}>
              <div className={styles.memory}>
                <Image src={memory1} alt="" sizes="(max-width: 640px) 50vw, 250px" />
              </div>
              <div className={styles.memory}>
                <Image src={memory2} alt="" sizes="(max-width: 640px) 50vw, 250px" />
              </div>
            </div>
          </div>
          <Copy eyebrow={t("m5Eyebrow")} title={t("m5Title")}>
            {t("m5Text")}
          </Copy>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>{t("ctaTitle")}</h2>
            <p className={styles.ctaLead}>{t("ctaLead")}</p>
          </div>
          <Link href="/create" className="btn btn-primary btn-md">
            {tNav("createCta")}
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
