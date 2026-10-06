import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import avatar from "@/public/images/dashboard/avatar-client.png";
import MobileInviteActions from "./MobileInviteActions";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboardClient" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

type Stat = { label: string; value: string; note: string };
type UpcomingEvent = { title: string; date: string; guests: string; state: string; tone: "amber" | "gray" | "green" };
type FeedItem = { name: string; note: string; time: string; tone: "green" | "red" };
type CalendarDay = { label: string; num: number; active: boolean };

export default async function ClientDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dashboardClient");

  const SIDEBAR_NAV = [
    { icon: "home", label: t("navHome"), href: "/dashboard/client", active: true },
    { icon: "calendarB", label: t("navMyEvents"), href: "#events" },
    { icon: "mail", label: t("navInvitations"), href: "/invitations" },
    { icon: "usersB", label: t("navGuests"), href: "/features/guest-management" },
    { icon: "image", label: t("navGallery"), href: "/features/event-camera" },
    { icon: "settings", label: t("navSettings"), href: "/login" },
  ];

  const stats = t.raw("stats") as Stat[];
  const upcoming = t.raw("upcoming") as UpcomingEvent[];
  const feed = t.raw("feed") as FeedItem[];
  const calendarDays = t.raw("calendarDays") as CalendarDay[];

  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/* desktop                                                     */}
      {/* ---------------------------------------------------------- */}
      <div className={styles.desktopOnly}>
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTop}>
              <Link href="/" className={styles.logo}>
                Lyst.
              </Link>
              <nav className={styles.sidebarNav}>
                {SIDEBAR_NAV.map((item) => (
                  <Link key={item.label} href={item.href} className={styles.navLink} data-active={item.active}>
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
                <Link href="/login" className={styles.profileLink}>
                  {t("profileLinkCta")}
                </Link>
              </div>
            </div>
          </aside>

          <main className={styles.main}>
            <div className={styles.topBar}>
              <h1 className={styles.pageTitle}>{t("pageTitle")}</h1>
              <div className={styles.topBarActions}>
                <span className={styles.notifBell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-bell.svg" alt={t("notifAlt")} width={20} height={20} />
                </span>
                <Link href="/create" className={`btn btn-primary ${styles.newEventBtn}`}>
                  {t("newEventCta")}
                </Link>
              </div>
            </div>

            <div className={styles.statsRow}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statNote}>{stat.note}</p>
                </div>
              ))}
            </div>

            <section className={styles.activeEventCard}>
              <div className={styles.eventHead}>
                <div className={styles.titleStatus}>
                  <h2 className={styles.eventTitle}>{t("activeEventTitle")}</h2>
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    {t("activeTag")}
                  </span>
                </div>
                <span className={styles.mainEventTag}>{t("mainEventTag")}</span>
              </div>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>{t("detailDateLabel")}</p>
                  <p className={styles.detailValue}>{t("detailDateValue")}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>{t("detailLocationLabel")}</p>
                  <p className={styles.detailValue}>{t("detailLocationValue")}</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>{t("detailGuestsLabel")}</p>
                  <p className={styles.detailValue}>{t("detailGuestsValue")}</p>
                </div>
              </div>
              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>{t("progressLabel")}</span>
                  <strong>80%</strong>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: "80%" }} />
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/line2.svg" alt="" className={styles.divider} />
              <div className={styles.quickActions}>
                <Link href="/invitations/moonlight" className={styles.actionBtn}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-eye.svg" alt="" width={16} height={16} />
                  {t("quickViewCta")}
                </Link>
                <Link href="/features/guest-management" className={styles.actionBtn}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-users-3.svg" alt="" width={16} height={16} />
                  {t("quickGuestsCta")}
                </Link>
                <Link href="/features/event-camera" className={styles.actionBtn}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-image.svg" alt="" width={16} height={16} />
                  {t("quickGalleryCta")}
                </Link>
              </div>
            </section>

            <section id="events" className={styles.bottomGrid}>
              <div className={styles.eventsPanel}>
                <h2 className={styles.sectionTitle}>{t("upcomingTitle")}</h2>
                <div className={styles.tableContainer}>
                  <div className={`${styles.row} ${styles.rowHead}`}>
                    <span className={styles.colEvent}>{t("colEvent")}</span>
                    <span className={styles.colDate}>{t("colDate")}</span>
                    <span className={styles.colGuests}>{t("colGuests")}</span>
                    <span className={styles.colStatus}>{t("colStatus")}</span>
                  </div>
                  {upcoming.map((ev) => (
                    <div key={ev.title} className={styles.row}>
                      <span className={styles.colEvent}>{ev.title}</span>
                      <span className={styles.colDate}>{ev.date}</span>
                      <span className={styles.colGuests}>{ev.guests}</span>
                      <span className={styles.colStatus}>
                        <span className={`${styles.tag} ${styles[`tag_${ev.tone}`]}`}>
                          <span className={styles.tagDot} aria-hidden="true" />
                          {ev.state}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.feedPanel}>
                <h2 className={styles.sectionTitle}>{t("feedTitle")}</h2>
                <div className={styles.feedContainer}>
                  {feed.map((item, i) => (
                    <div key={item.name} className={styles.feedRow} data-last={i === feed.length - 1}>
                      <span className={`${styles.feedDot} ${styles[`feedDot_${item.tone}`]}`} />
                      <div className={styles.feedText}>
                        <p className={styles.feedName}>
                          {item.name} <span>{item.note}</span>
                        </p>
                        <p className={styles.feedTime}>{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
              <span className={styles.mRolePill}>GUEST</span>
            </div>
            <span className={styles.mAvatar}>{t("mAvatarInitial")}</span>
          </header>

          <div className={styles.mContent}>
            <div className={styles.mGreeting}>
              <p className={styles.mGreetingTitle}>{t("mGreetingTitle")}</p>
              <p className={styles.mGreetingSub}>{t("mGreetingSub")}</p>
            </div>

            <div className={styles.mSection}>
              <p className={styles.mSectionTitle}>{t("mNewInviteTitle")}</p>
              <div className={styles.mInviteCard}>
                <div className={styles.mInviteTop}>
                  <p className={styles.mInviteMeta}>{t("mInviteMeta")}</p>
                  <p className={styles.mInviteTitle}>{t("mInviteTitle")}</p>
                  <p className={styles.mInviteLocation}>{t("mInviteLocation")}</p>
                </div>
                <MobileInviteActions />
              </div>
            </div>

            <div className={styles.mSection}>
              <p className={styles.mSectionTitle}>{t("mConfirmedTitle")}</p>
              <div className={styles.mConfirmedCard}>
                <div>
                  <p className={styles.mConfirmedTitle}>{t("confirmedEventTitle")}</p>
                  <p className={styles.mConfirmedMeta}>
                    {t("confirmedEventDate")} · {t("confirmedEventPlace")}
                  </p>
                </div>
                <span className={styles.mConfirmedBadge}>{t("mConfirmedBadge")}</span>
              </div>
            </div>

            <div className={styles.mCalendar}>
              <div className={styles.mCalendarHead}>
                <p className={styles.mCalendarTitle}>{t("mCalendarMonthTitle")}</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/m-calendar-client.svg" alt="" width={16} height={16} />
              </div>
              <div className={styles.mCalendarDays}>
                {calendarDays.map((day) => (
                  <div key={day.num} className={styles.mDay} data-active={day.active}>
                    <p className={styles.mDayLabel}>{day.label}</p>
                    <p className={styles.mDayNum}>{day.num}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
