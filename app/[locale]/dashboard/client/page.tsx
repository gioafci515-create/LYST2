import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import avatar from "@/public/images/dashboard/avatar-client.png";
import MobileInviteActions from "./MobileInviteActions";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ჩემი პანელი — LYST",
  description: "კლიენტის დეშბორდი: ჩემი ღონისძიებები და მოსაწვევები.",
};

const SIDEBAR_NAV = [
  { icon: "home", label: "მთავარი", href: "/dashboard/client", active: true },
  { icon: "calendarB", label: "ჩემი ღონისძიებები", href: "#events" },
  { icon: "mail", label: "მოსაწვევები", href: "/invitations" },
  { icon: "usersB", label: "სტუმრები", href: "/features/guest-management" },
  { icon: "image", label: "გალერეა", href: "/features/event-camera" },
  { icon: "settings", label: "პარამეტრები", href: "/login" },
];

const STATS = [
  { label: "აქტიური ღონისძიებები", value: "2", note: "მიმდინარე თვეში" },
  { label: "მოწვეული სტუმრები", value: "184", note: "ჯამური რაოდენობა" },
  { label: "დასწრების პასუხი (RSVP)", value: "76%", note: "საშუალო მაჩვენებელი" },
];

const UPCOMING = [
  { title: "ანას დაბადების დღე", date: "2026 წ. 5 ნოემბერი", guests: "45 სტუმარი", state: "მომზადების პროცესში", tone: "amber" as const },
  { title: "კორპორატიული წვეულება", date: "2026 წ. 20 დეკემბერი", guests: "200 სტუმარი", state: "დაგეგმილი", tone: "gray" as const },
  { title: "ნინოს ნიშნობა", date: "2027 წ. 14 თებერვალი", guests: "80 სტუმარი", state: "მოსაწვევი იგზავნება", tone: "green" as const },
];

const RSVP_FEED = [
  { name: "გიორგი ხარაზიშვილი", note: "დაადასტურა", time: "2 სთ წინ", tone: "green" as const },
  { name: "ნათია ბერიძე", note: "უარყო", time: "5 სთ წინ", tone: "red" as const },
  { name: "დავით ლომიძე", note: "დაადასტურა +1", time: "1 დღის წინ", tone: "green" as const },
  { name: "ეკა სულაკაური", note: "დაადასტურა", time: "2 დღის წინ", tone: "green" as const },
];

const CONFIRMED = { title: "ეკას დაბადების დღე", date: "28 იანვარი", place: "რესტორანი „ფუნიკულიორი“" };

const CALENDAR_DAYS = [
  { label: "ორშ", num: 26, active: false },
  { label: "სამ", num: 27, active: false },
  { label: "ოთხ", num: 28, active: true },
  { label: "ხუთ", num: 29, active: false },
  { label: "პარ", num: 30, active: false },
];

export default function ClientDashboardPage() {
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
                <p className={styles.userName}>მარიამ წიკლაური</p>
                <Link href="/login" className={styles.profileLink}>
                  პროფილი
                </Link>
              </div>
            </div>
          </aside>

          <main className={styles.main}>
            <div className={styles.topBar}>
              <h1 className={styles.pageTitle}>ჩემი პანელი</h1>
              <div className={styles.topBarActions}>
                <span className={styles.notifBell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-bell.svg" alt="შეტყობინებები" width={20} height={20} />
                </span>
                <Link href="/create" className={`btn btn-primary ${styles.newEventBtn}`}>
                  ახალი ღონისძიება +
                </Link>
              </div>
            </div>

            <div className={styles.statsRow}>
              {STATS.map((stat) => (
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
                  <h2 className={styles.eventTitle}>ლუკა და თამარის ქორწილი</h2>
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    აქტიური
                  </span>
                </div>
                <span className={styles.mainEventTag}>მთავარი ღონისძიება</span>
              </div>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>თარიღი</p>
                  <p className={styles.detailValue}>2026 წ. 18 ოქტომბერი</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>ლოკაცია</p>
                  <p className={styles.detailValue}>შატო მუხრანი</p>
                </div>
                <div className={styles.detailItem}>
                  <p className={styles.detailLabel}>სტუმრები</p>
                  <p className={styles.detailValue}>120 / 150</p>
                </div>
              </div>
              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>მზადყოფნა</span>
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
                  მოსაწვევის ნახვა
                </Link>
                <Link href="/features/guest-management" className={styles.actionBtn}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-users-3.svg" alt="" width={16} height={16} />
                  სტუმრების მართვა
                </Link>
                <Link href="/features/event-camera" className={styles.actionBtn}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-image.svg" alt="" width={16} height={16} />
                  გალერეა
                </Link>
              </div>
            </section>

            <section id="events" className={styles.bottomGrid}>
              <div className={styles.eventsPanel}>
                <h2 className={styles.sectionTitle}>მომავალი ღონისძიებები</h2>
                <div className={styles.tableContainer}>
                  <div className={`${styles.row} ${styles.rowHead}`}>
                    <span className={styles.colEvent}>ღონისძიება</span>
                    <span className={styles.colDate}>თარიღი</span>
                    <span className={styles.colGuests}>სტუმრები</span>
                    <span className={styles.colStatus}>სტატუსი</span>
                  </div>
                  {UPCOMING.map((ev) => (
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
                <h2 className={styles.sectionTitle}>ბოლო დასწრების პასუხები</h2>
                <div className={styles.feedContainer}>
                  {RSVP_FEED.map((item, i) => (
                    <div key={item.name} className={styles.feedRow} data-last={i === RSVP_FEED.length - 1}>
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
            <span className={styles.mAvatar}>ა</span>
          </header>

          <div className={styles.mContent}>
            <div className={styles.mGreeting}>
              <p className={styles.mGreetingTitle}>ჩემი მოსაწვევები</p>
              <p className={styles.mGreetingSub}>საპასუხო და მოახლოებული ღონისძიებები</p>
            </div>

            <div className={styles.mSection}>
              <p className={styles.mSectionTitle}>ახალი მოწვევა</p>
              <div className={styles.mInviteCard}>
                <div className={styles.mInviteTop}>
                  <p className={styles.mInviteMeta}>ქორწილი · 15 თებერვალი</p>
                  <p className={styles.mInviteTitle}>გიორგი & ნინო</p>
                  <p className={styles.mInviteLocation}>ლოკაცია: შერატონ მეტეხი პალასი, თბილისი</p>
                </div>
                <MobileInviteActions />
              </div>
            </div>

            <div className={styles.mSection}>
              <p className={styles.mSectionTitle}>დადასტურებული</p>
              <div className={styles.mConfirmedCard}>
                <div>
                  <p className={styles.mConfirmedTitle}>{CONFIRMED.title}</p>
                  <p className={styles.mConfirmedMeta}>
                    {CONFIRMED.date} · {CONFIRMED.place}
                  </p>
                </div>
                <span className={styles.mConfirmedBadge}>მივდივარ</span>
              </div>
            </div>

            <div className={styles.mCalendar}>
              <div className={styles.mCalendarHead}>
                <p className={styles.mCalendarTitle}>იანვარი 2026</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/m-calendar-client.svg" alt="" width={16} height={16} />
              </div>
              <div className={styles.mCalendarDays}>
                {CALENDAR_DAYS.map((day) => (
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
