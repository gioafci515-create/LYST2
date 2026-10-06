import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import avatar from "@/public/images/dashboard/avatar-host.png";
import ShareLinkButton from "./ShareLinkButton";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboardHost" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

type FeedItem = { name: string; note: string; time: string; status: "ok" | "no" | "pending" };
type OtherEvent = { title: string; date: string; guests: string; state: string };
type MobileActivityItem = { initial: string; name: string; note: string; time: string };

function StatusBadge({
  status,
  labels,
}: {
  status: "ok" | "no" | "pending";
  labels: Record<"ok" | "no" | "pending", string>;
}) {
  return <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>{labels[status]}</span>;
}

export default async function HostDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dashboardHost");

  const SIDEBAR_NAV = [
    { icon: "overview", label: t("navOverview"), href: "/dashboard/host", active: true },
    { icon: "users", label: t("navGuests"), href: "#rsvp-summary" },
    { icon: "mail", label: t("navInvitation"), href: "/invitations/moonlight" },
    { icon: "image", label: t("navExperience"), href: "/features/event-camera" },
    { icon: "mic", label: t("navArchive"), href: "/invitations" },
    { icon: "lock", label: t("navSettings"), href: "/login" },
  ];

  const feed = t.raw("feed") as FeedItem[];
  const otherEvents = t.raw("otherEvents") as OtherEvent[];
  const mobileActivity = t.raw("mobileActivity") as MobileActivityItem[];

  const statusLabels = {
    ok: t("statusOk"),
    no: t("statusNo"),
    pending: t("statusPending"),
  } as const;

  const BOTTOM_TABS = [
    { icon: "m-home", label: t("tabHome"), active: true },
    { icon: "m-calendar", label: t("tabEvents") },
    { icon: "m-users", label: t("tabGuests") },
    { icon: "m-user", label: t("tabProfile") },
  ];

  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/* desktop                                                     */}
      {/* ---------------------------------------------------------- */}
      <div className={styles.desktopOnly}>
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTop}>
              <Link href="/" className={styles.logoBlock}>
                <span className={styles.logoWord}>Lyst.</span>
                <span className={styles.rolePill}>{t("rolePill")}</span>
              </Link>
              <nav className={styles.sidebarNav}>
                {SIDEBAR_NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={styles.navLink}
                    data-active={item.active}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/images/dashboard/icon-${item.icon}.svg`} alt="" width={18} height={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className={styles.sidebarFooter}>
              <Image src={avatar} alt="" width={40} height={40} className={styles.avatar} />
              <div className={styles.sidebarFooterText}>
                <p className={styles.userName}>{t("userName")}</p>
                <p className={styles.userRole}>{t("userRole")}</p>
              </div>
            </div>
          </aside>

          <main className={styles.main}>
            <div className={styles.headerBar}>
              <h1 className={styles.pageTitle}>{t("pageTitle")}</h1>
              <Link href="/create" className={`btn btn-primary ${styles.newEventBtn}`}>
                {t("newEventCta")}
              </Link>
            </div>

            <section className={styles.heroCard}>
              <div className={styles.heroTop}>
                <div className={styles.heroTitleRow}>
                  <h2 className={styles.heroTitle}>{t("heroEventTitle")}</h2>
                  <span className={styles.activeTag}>
                    <span className={styles.activeDot} aria-hidden="true" />
                    {t("heroActiveTag")}
                  </span>
                </div>
                <p className={styles.heroSubtitle}>{t("heroSubtitle")}</p>
              </div>
              <div className={styles.heroMeta}>
                <span className={styles.heroMetaItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-calendar.svg" alt="" width={18} height={18} />
                  {t("heroDate")}
                </span>
                <span className={styles.heroMetaItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-pin.svg" alt="" width={18} height={18} />
                  {t("heroLocation")}
                </span>
                <span className={styles.heroMetaItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-users-2.svg" alt="" width={18} height={18} />
                  {t("heroGuests")}
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/divider.svg" alt="" className={styles.divider} />
              <div className={styles.readiness}>
                <div className={styles.readinessLabel}>
                  <span>{t("readinessLabel")}</span>
                  <strong>80%</strong>
                </div>
                <div className={styles.readinessTrack}>
                  <div className={styles.readinessFill} style={{ width: "80%" }} />
                </div>
              </div>
              <div className={styles.heroActions}>
                <Link href="/invitations/moonlight" className={`btn btn-primary ${styles.heroBtn}`}>
                  {t("heroBtnView")}
                </Link>
                <Link href="#rsvp-summary" className={`btn btn-secondary ${styles.heroBtn}`}>
                  {t("heroBtnGuests")}
                </Link>
                <Link href="/features/event-camera" className={`btn btn-secondary ${styles.heroBtn}`}>
                  {t("heroBtnGallery")}
                </Link>
                <Link href="/login" className={`btn btn-secondary ${styles.heroBtn}`}>
                  {t("heroBtnSettings")}
                </Link>
              </div>
            </section>

            <section id="rsvp-summary" className={styles.rsvpSummary}>
              <h2 className={styles.sectionTitle}>{t("rsvpSummaryTitle")}</h2>
              <div className={styles.rsvpSummaryBlock}>
                <p className={styles.rsvpBig}>{t("rsvpBig")}</p>
                <p className={styles.rsvpSub}>{t("rsvpSub")}</p>
                <Link href="#feed" className={styles.rsvpLink}>
                  {t("rsvpLink")}
                </Link>
              </div>
            </section>

            <section className={styles.splitSection}>
              <div id="feed" className={styles.feedCard}>
                <h2 className={styles.sectionTitle}>{t("feedTitle")}</h2>
                <div className={styles.feedList}>
                  {feed.map((item) => (
                    <div key={item.name} className={styles.feedItem}>
                      <div className={styles.feedNames}>
                        <p className={styles.feedName}>{item.name}</p>
                        <p className={styles.feedNote}>{item.note}</p>
                      </div>
                      <p className={styles.feedTime}>{item.time}</p>
                      <div className={styles.feedBadgeWrap}>
                        <StatusBadge status={item.status} labels={statusLabels} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.otherEvents}>
                <h2 className={styles.sectionTitle}>{t("otherEventsTitle")}</h2>
                {otherEvents.map((ev) => (
                  <div key={ev.title} className={styles.eventCard}>
                    <div className={styles.eventCardHead}>
                      <p className={styles.eventCardTitle}>{ev.title}</p>
                      <span className={styles.eventState}>{ev.state}</span>
                    </div>
                    <p className={styles.eventCardDate}>{ev.date}</p>
                    <span className={styles.eventCardGuests}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/dashboard/icon-users-3.svg" alt="" width={14} height={14} />
                      {ev.guests}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.consultEntry}>
              <div>
                <p className={styles.consultTitle}>{t("consultTitle")}</p>
                <p className={styles.consultText}>{t("consultText")}</p>
              </div>
              <Link href="/booking" className={styles.consultBtn}>
                {t("consultBtn")}
              </Link>
            </section>
          </main>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* mobile                                                      */}
      {/* ---------------------------------------------------------- */}
      <div className={styles.mobileOnly}>
        <div className={styles.mShell}>
          <header className={styles.mHeader}>
            <div className={styles.mBrand}>
              <span className={styles.mLogo}>LYST</span>
              <span className={styles.mRolePill}>HOST</span>
            </div>
            <span className={styles.mBell}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/m-bell.svg" alt={t("notifAlt")} width={18} height={18} />
            </span>
          </header>

          <div className={styles.mContent}>
            <div className={styles.mGreeting}>
              <p className={styles.mGreetingTitle}>{t("greetingTitle")}</p>
              <p className={styles.mGreetingSub}>{t("greetingSub")}</p>
            </div>

            <div className={styles.mEventCard}>
              <div className={styles.mEventHead}>
                <p className={styles.mEventLabel}>{t("mainEventLabel")}</p>
                <p className={styles.mEventTitle}>{t("mainEventTitle")}</p>
              </div>
              <div className={styles.mEventDivider} />
              <div className={styles.mEventStats}>
                <div>
                  <p className={styles.mStatLabel}>{t("statGuestsLabel")}</p>
                  <p className={styles.mStatValue}>{t("statGuestsValue")}</p>
                </div>
                <div className={styles.mStatRight}>
                  <p className={styles.mStatLabel}>{t("statRsvpLabel")}</p>
                  <p className={styles.mStatValue}>{t("statRsvpValue")}</p>
                </div>
              </div>
              <div className={styles.mProgressTrack}>
                <div className={styles.mProgressFill} style={{ width: "71%" }} />
              </div>
            </div>

            <div className={styles.mSection}>
              <p className={styles.mSectionTitle}>{t("quickActionsTitle")}</p>
              <div className={styles.mActionsGrid}>
                <Link href="/features/guest-management" className={styles.mActionBtn}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/m-plus-circle.svg" alt="" width={20} height={20} />
                  <span>{t("addGuestCta")}</span>
                </Link>
                <ShareLinkButton className={styles.mActionBtn} />
              </div>
            </div>

            <div className={styles.mSection}>
              <p className={styles.mSectionTitle}>{t("recentActivityTitle")}</p>
              <div className={styles.mFeedList}>
                {mobileActivity.map((item) => (
                  <div key={item.name} className={styles.mFeedItem}>
                    <span className={styles.mAvatar}>{item.initial}</span>
                    <div className={styles.mFeedText}>
                      <p className={styles.mFeedName}>
                        {item.name} <span>{item.note}</span>
                      </p>
                      <p className={styles.mFeedTime}>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <nav className={styles.mBottomNav}>
            {BOTTOM_TABS.map((tab) => (
              <span key={tab.label} className={styles.mTab} data-active={tab.active}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/dashboard/${tab.icon}.svg`} alt="" width={20} height={20} />
                <span>{tab.label}</span>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
