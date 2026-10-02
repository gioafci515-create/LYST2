import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import avatar from "../../../public/images/dashboard/avatar-host.png";
import ShareLinkButton from "./ShareLinkButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "მიმოხილვა — LYST",
  description: "ჰოსტის დეშბორდი: ღონისძიების მართვა და დასწრების პასუხები.",
};

const SIDEBAR_NAV = [
  { icon: "overview", label: "მიმოხილვა", href: "/dashboard/host", active: true },
  { icon: "users", label: "სტუმრები", href: "#rsvp-summary" },
  { icon: "mail", label: "მოწვევა", href: "/invitations/moonlight" },
  { icon: "image", label: "გამოცდილება", href: "/features/event-camera" },
  { icon: "mic", label: "არქივი", href: "/invitations" },
  { icon: "lock", label: "პარამეტრები", href: "/login" },
];

const RSVP_FEED = [
  { name: "გიორგი ხარაზიშვილი", note: "დაადასტურა დასწრება", time: "2 სთ წინ", status: "ok" as const },
  { name: "ნათია ბერიძე", note: "უარყო მოწვევა", time: "5 სთ წინ", status: "no" as const },
  { name: "დავით ლომიძე", note: "დაადასტურა დასწრება (+1)", time: "გუშინ", status: "ok" as const },
  { name: "ეკა სულაკაური", note: "დაადასტურა დასწრება", time: "გუშინ", status: "ok" as const },
  { name: "ანა ჯანელიძე", note: "პასუხი არ გაუცია", time: "2 დღის წინ", status: "pending" as const },
];

const OTHER_EVENTS = [
  { title: "ანას დაბადების დღე", date: "2026 წ. 5 ნოემბერი", guests: "45 სტუმარი", state: "მომზადების პროცესში" },
  { title: "კორპორატიული წვეულება", date: "2026 წ. 20 დეკემბერი", guests: "200 სტუმარი", state: "დაგეგმილი" },
];

const MOBILE_ACTIVITY = [
  { initial: "ა", name: "ანი მგელაძე", note: "დაადასტურა დასწრება", time: "2 წთ-ის წინ" },
  { initial: "დ", name: "დავით კახიძე", note: "უარყო დასწრება", time: "1 სთ-ის წინ" },
  { initial: "გ", name: "გიორგი ბერიძე", note: "დაამატა მესიჯი", time: "3 სთ-ის წინ" },
];

const BOTTOM_TABS = [
  { icon: "m-home", label: "მთავარი", active: true },
  { icon: "m-calendar", label: "ღონისძიებები" },
  { icon: "m-users", label: "სტუმრები" },
  { icon: "m-user", label: "პროფილი" },
];

function StatusBadge({ status }: { status: "ok" | "no" | "pending" }) {
  const copy = status === "ok" ? "დაესწრება" : status === "no" ? "ვერ დაესწრება" : "მოლოდინში";
  return <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>{copy}</span>;
}

export default function HostDashboardPage() {
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
                <span className={styles.rolePill}>ჰოსტი</span>
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
                <p className={styles.userName}>ლუკა ბერიძე</p>
                <p className={styles.userRole}>მასპინძელი</p>
              </div>
            </div>
          </aside>

          <main className={styles.main}>
            <div className={styles.headerBar}>
              <h1 className={styles.pageTitle}>მიმოხილვა</h1>
              <Link href="/create" className={`btn btn-primary ${styles.newEventBtn}`}>
                ახალი ღონისძიება +
              </Link>
            </div>

            <section className={styles.heroCard}>
              <div className={styles.heroTop}>
                <div className={styles.heroTitleRow}>
                  <h2 className={styles.heroTitle}>ლუკა და თამარის ქორწილი</h2>
                  <span className={styles.activeTag}>
                    <span className={styles.activeDot} aria-hidden="true" />
                    აქტიური
                  </span>
                </div>
                <p className={styles.heroSubtitle}>საქორწილო ცერემონია და წვეულება</p>
              </div>
              <div className={styles.heroMeta}>
                <span className={styles.heroMetaItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-calendar.svg" alt="" width={18} height={18} />
                  2026 წ. 18 ოქტომბერი
                </span>
                <span className={styles.heroMetaItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-pin.svg" alt="" width={18} height={18} />
                  შატო მუხრანი
                </span>
                <span className={styles.heroMetaItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-users-2.svg" alt="" width={18} height={18} />
                  120 / 150 სტუმარი
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/divider.svg" alt="" className={styles.divider} />
              <div className={styles.readiness}>
                <div className={styles.readinessLabel}>
                  <span>მოსაწვევის მზადყოფნა</span>
                  <strong>80%</strong>
                </div>
                <div className={styles.readinessTrack}>
                  <div className={styles.readinessFill} style={{ width: "80%" }} />
                </div>
              </div>
              <div className={styles.heroActions}>
                <Link href="/invitations/moonlight" className={`btn btn-primary ${styles.heroBtn}`}>
                  მოსაწვევის ნახვა
                </Link>
                <Link href="#rsvp-summary" className={`btn btn-secondary ${styles.heroBtn}`}>
                  სტუმრების მართვა
                </Link>
                <Link href="/features/event-camera" className={`btn btn-secondary ${styles.heroBtn}`}>
                  გალერეა
                </Link>
                <Link href="/login" className={`btn btn-secondary ${styles.heroBtn}`}>
                  პარამეტრები
                </Link>
              </div>
            </section>

            <section id="rsvp-summary" className={styles.rsvpSummary}>
              <h2 className={styles.sectionTitle}>სტუმრების პასუხები</h2>
              <div className={styles.rsvpSummaryBlock}>
                <p className={styles.rsvpBig}>89 / 120 სტუმარმა დაადასტურა</p>
                <p className={styles.rsvpSub}>16 პასუხს ელოდებით. 15 სტუმარმა ვერ დაესწრება.</p>
                <Link href="#feed" className={styles.rsvpLink}>
                  სტუმრების ნახვა
                </Link>
              </div>
            </section>

            <section className={styles.splitSection}>
              <div id="feed" className={styles.feedCard}>
                <h2 className={styles.sectionTitle}>ბოლო დასწრების პასუხები</h2>
                <div className={styles.feedList}>
                  {RSVP_FEED.map((item) => (
                    <div key={item.name} className={styles.feedItem}>
                      <div className={styles.feedNames}>
                        <p className={styles.feedName}>{item.name}</p>
                        <p className={styles.feedNote}>{item.note}</p>
                      </div>
                      <p className={styles.feedTime}>{item.time}</p>
                      <div className={styles.feedBadgeWrap}>
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.otherEvents}>
                <h2 className={styles.sectionTitle}>სხვა ღონისძიებები</h2>
                {OTHER_EVENTS.map((ev) => (
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
                <p className={styles.consultTitle}>მოსაწვევზე მეტს გეგმავ?</p>
                <p className={styles.consultText}>
                  LYST-ის დამატებითი გამოცდილებები კონსულტაციის შემდეგ იგეგმება და მხოლოდ გუნდის მიერ
                  მომზადების შემდეგ გამოჩნდება აქტიურად.
                </p>
              </div>
              <Link href="/booking" className={styles.consultBtn}>
                დაჯავშნე კონსულტაცია
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
              <img src="/images/dashboard/m-bell.svg" alt="შეტყობინებები" width={18} height={18} />
            </span>
          </header>

          <div className={styles.mContent}>
            <div className={styles.mGreeting}>
              <p className={styles.mGreetingTitle}>გამარჯობა, ნინო</p>
              <p className={styles.mGreetingSub}>შენი ღონისძიება აქტიურია</p>
            </div>

            <div className={styles.mEventCard}>
              <div className={styles.mEventHead}>
                <p className={styles.mEventLabel}>მთავარი ღონისძიება</p>
                <p className={styles.mEventTitle}>ლაშა & მარიამი · ქორწილი</p>
              </div>
              <div className={styles.mEventDivider} />
              <div className={styles.mEventStats}>
                <div>
                  <p className={styles.mStatLabel}>სტუმრები</p>
                  <p className={styles.mStatValue}>142 / 200</p>
                </div>
                <div className={styles.mStatRight}>
                  <p className={styles.mStatLabel}>პასუხი</p>
                  <p className={styles.mStatValue}>71%</p>
                </div>
              </div>
              <div className={styles.mProgressTrack}>
                <div className={styles.mProgressFill} style={{ width: "71%" }} />
              </div>
            </div>

            <div className={styles.mSection}>
              <p className={styles.mSectionTitle}>სწრაფი მოქმედებები</p>
              <div className={styles.mActionsGrid}>
                <Link href="/features/guest-management" className={styles.mActionBtn}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/m-plus-circle.svg" alt="" width={20} height={20} />
                  <span>სტუმრის დამატება</span>
                </Link>
                <ShareLinkButton className={styles.mActionBtn} />
              </div>
            </div>

            <div className={styles.mSection}>
              <p className={styles.mSectionTitle}>ბოლო აქტივობა</p>
              <div className={styles.mFeedList}>
                {MOBILE_ACTIVITY.map((item) => (
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
