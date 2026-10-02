import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import avatar from "../../../public/images/dashboard/avatar-admin.png";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "მთავარი პანელი — LYST Admin",
  description: "სუპერ ადმინის პანელი: პლატფორმის მართვის ცენტრი და მონიტორინგი.",
};

const SIDEBAR_NAV = [
  { icon: "home", label: "მთავარი", href: "/dashboard/admin", active: true },
  { icon: "bag", label: "შეკვეთები", href: "#orders" },
  { icon: "usersB", label: "კლიენტები", href: "/dashboard/client" },
  { icon: "calendarB", label: "ღონისძიებები", href: "/dashboard/host" },
  { icon: "barchart", label: "ანალიტიკა", href: "#analytics" },
  { icon: "dollar", label: "ფინანსები", href: "#finance" },
  { icon: "usercheck", label: "გუნდი", href: "#activity" },
  { icon: "settings", label: "პარამეტრები", href: "/login" },
];

const STATS = [
  { label: "მთლიანი შემოსავალი", value: "₾47,850", trend: "+12.5%", icon: "creditcard" },
  { label: "აქტიური შეკვეთები", value: "234", trend: "+8.1%", icon: "activity" },
  { label: "რეგისტრირებული კლიენტები", value: "1,847", trend: "+15.3%", icon: "usersD" },
];

const REVENUE_BARS = [
  { month: "ივნ", value: "₾34000", height: 109 },
  { month: "ივლ", value: "₾41000", height: 131 },
  { month: "აგვ", value: "₾38000", height: 122 },
  { month: "სექტ", value: "₾47850", height: 153 },
];

const RECENT_ACTIVITY = [
  { name: "ნინო გოგიაშვილი", note: "შეიძინა ბილეთი ღონისძიებაზე 'Jazz Fest 2026'", time: "3 წუთის წინ" },
  { name: "გიორგი ხარაზიშვილი", note: "მოითხოვა ანგარიშფაქტურის დუბლიკატი", time: "14 წუთის წინ" },
  { name: "დავით ლომიძე", note: "დაარეგისტრირა ახალი კომპანია პლატფორმაზე", time: "1 საათის წინ" },
  { name: "მარიამ წიკლაური", note: "გააუქმა დაჯავშნილი ადგილები კინოჩვენებაზე", time: "2 საათის წინ" },
  { name: "ანა ჯანელიძე", note: "განაახლა საკონტაქტო ტელეფონის ნომერი", time: "4 საათის წინ" },
];

type OrderStatus = "confirmed" | "processing" | "done";

const ORDERS: Array<{
  id: string;
  client: string;
  event: string;
  date: string;
  amount: string;
  status: OrderStatus;
}> = [
  { id: "#1094", client: "ნინო გოგიაშვილი", event: "თბილისი ჯაზ ფესტივალი 2026", date: "15 სექ, 2026", amount: "₾350.00", status: "confirmed" },
  { id: "#1095", client: "გიორგი ხარაზიშვილი", event: "ბიზნეს კონფერენცია", date: "15 სექ, 2026", amount: "₾120.00", status: "processing" },
  { id: "#1096", client: "მარიამ წიკლაური", event: "ღვინის დეგუსტაციის ტური", date: "14 სექ, 2026", amount: "₾480.00", status: "done" },
  { id: "#1097", client: "დავით ლომიძე", event: "ელექტრონული მუსიკის ღამე", date: "14 სექ, 2026", amount: "₾180.00", status: "confirmed" },
  { id: "#1098", client: "ანა ჯანელიძე", event: "კლასიკური კონცერტების სერია", date: "13 სექ, 2026", amount: "₾250.00", status: "processing" },
];

const STATUS_COPY: Record<OrderStatus, string> = {
  confirmed: "დადასტურებული",
  processing: "პროცესში",
  done: "დასრულებული",
};

const MOBILE_TRANSACTIONS = [
  { name: "დავით კოხრეიძე", note: "საქორწინო პაკეტი · დღეს", amount: "₾ 120" },
  { name: "ეკა ტაბატაძე", note: "დაბადების დღე VIP · გუშინ", amount: "₾ 85" },
  { name: "ლადო გოგუაძე", note: "კორპორატიული · 2 დღის წინ", amount: "₾ 250" },
];

const SERVER_STATUS = ["Database", "SMS Gateway", "RSVP API"];

export default function AdminDashboardPage() {
  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/* desktop                                                     */}
      {/* ---------------------------------------------------------- */}
      <div className={styles.desktopOnly}>
        <div className={styles.shell}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTop}>
              <div className={styles.logoGroup}>
                <span className={styles.logoBadge}>L</span>
                <span className={styles.logoWord}>Lyst.</span>
                <span className={styles.adminBadge}>SUPER</span>
              </div>
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
                <p className={styles.userName}>ალექსანდრე</p>
                <p className={styles.userRole}>ადმინისტრატორი</p>
              </div>
            </div>
          </aside>

          <main className={styles.main}>
            <div className={styles.topBar}>
              <div>
                <p className={styles.pageTitle}>მთავარი პანელი</p>
                <p className={styles.pageSubtitle}>პლატფორმის მართვის ცენტრი და მონიტორინგი</p>
              </div>
              <div className={styles.topBarRight}>
                <div className={styles.search}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-search.svg" alt="" width={16} height={16} />
                  <span>ძებნა...</span>
                </div>
                <div className={styles.dateTag}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-calendarC.svg" alt="" width={16} height={16} />
                  <span>სექტემბერი 2026</span>
                </div>
                <span className={styles.notifBell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-bell.svg" alt="შეტყობინებები" width={18} height={18} />
                </span>
              </div>
            </div>

            <div id="finance" className={styles.statsRow}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <div className={styles.statHead}>
                    <p className={styles.statLabel}>{stat.label}</p>
                    <span className={styles.statIconBox}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/images/dashboard/icon-${stat.icon}.svg`} alt="" width={16} height={16} />
                    </span>
                  </div>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statTrend}>
                    <strong>{stat.trend}</strong> წინა თვესთან შედარებით
                  </p>
                </div>
              ))}
              <div className={styles.statCard}>
                <div className={styles.statHead}>
                  <p className={styles.statLabel}>მიმდინარე ღონისძიებები</p>
                  <span className={styles.statIconBox}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/dashboard/icon-calendarD.svg" alt="" width={16} height={16} />
                  </span>
                </div>
                <p className={styles.statValue}>156</p>
              </div>
            </div>

            <div className={styles.chartRow}>
              <div id="analytics" className={styles.chartCard}>
                <div className={styles.chartHead}>
                  <div>
                    <p className={styles.chartTitle}>შემოსავლების დინამიკა</p>
                    <p className={styles.chartSub}>ბოლო 4 თვის შედარებითი ანალიზი (₾)</p>
                  </div>
                  <span className={styles.chartBadge}>მთლიანი ზრდა +12.5%</span>
                </div>
                <div className={styles.barsRow}>
                  {REVENUE_BARS.map((bar) => (
                    <div key={bar.month} className={styles.barCol}>
                      <p className={styles.barValue}>{bar.value}</p>
                      <div className={styles.bar} style={{ height: bar.height }} />
                      <p className={styles.barMonth}>{bar.month}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="activity" className={styles.activityCard}>
                <div className={styles.activityHead}>
                  <p className={styles.chartTitle}>ბოლო აქტივობა</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-refresh.svg" alt="განახლება" width={16} height={16} />
                </div>
                <div className={styles.activityList}>
                  {RECENT_ACTIVITY.map((item) => (
                    <div key={item.name} className={styles.activityRow}>
                      <div className={styles.activityTop}>
                        <p className={styles.activityName}>{item.name}</p>
                        <p className={styles.activityTime}>{item.time}</p>
                      </div>
                      <p className={styles.activityNote}>{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="orders" className={styles.tableCard}>
              <div className={styles.tableHead}>
                <p className={styles.chartTitle}>ბოლო შეკვეთები</p>
                <Link href="#orders" className={styles.viewAllBtn}>
                  ყველას ნახვა
                </Link>
              </div>
              <div className={styles.table}>
                <div className={`${styles.row} ${styles.rowHead}`}>
                  <span className={styles.colId}>#</span>
                  <span className={styles.colClient}>კლიენტი</span>
                  <span className={styles.colEvent}>ღონისძიება</span>
                  <span className={styles.colDate}>თარიღი</span>
                  <span className={styles.colAmount}>თანხა</span>
                  <span className={styles.colStatus}>სტატუსი</span>
                </div>
                {ORDERS.map((order) => (
                  <div key={order.id} className={styles.row}>
                    <span className={styles.colId}>{order.id}</span>
                    <span className={styles.colClient}>{order.client}</span>
                    <span className={styles.colEvent}>{order.event}</span>
                    <span className={styles.colDate}>{order.date}</span>
                    <span className={styles.colAmount}>{order.amount}</span>
                    <span className={styles.colStatus}>
                      <span className={`${styles.statusBadge} ${styles[`status_${order.status}`]}`}>
                        {STATUS_COPY[order.status]}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
              <span className={styles.mAdminBadge}>SUPER ADMIN</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/m-shield.svg" alt="" width={20} height={20} />
          </header>

          <div className={styles.mContent}>
            <p className={styles.mPageTitle}>სისტემური პანელი</p>

            <div className={styles.mStatsGrid}>
              <div className={styles.mStatCard}>
                <p className={styles.mStatLabel}>სულ მომხმარებელი</p>
                <p className={styles.mStatValue}>4,821</p>
                <p className={styles.mStatTrend}>+12% ამ თვეში</p>
              </div>
              <div className={styles.mStatCard}>
                <p className={styles.mStatLabel}>აქტიური ივენთი</p>
                <p className={styles.mStatValue}>312</p>
                <p className={styles.mStatTrend}>24 იქმნება დღეს</p>
              </div>
            </div>

            <div className={styles.mRevenueCard}>
              <div>
                <p className={styles.mStatLabel}>შემოსავალი (GEL)</p>
                <p className={styles.mStatValue}>₾ 24,850</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/m-trending-up.svg" alt="" width={24} height={24} />
            </div>

            <div className={styles.mSection}>
              <div className={styles.mSectionHead}>
                <p className={styles.mSectionTitle}>ბოლო ტრანზაქციები</p>
                <span className={styles.mSectionLink}>ყველა</span>
              </div>
              <div className={styles.mUserList}>
                {MOBILE_TRANSACTIONS.map((tx) => (
                  <div key={tx.name} className={styles.mUserCard}>
                    <div>
                      <p className={styles.mUserName}>{tx.name}</p>
                      <p className={styles.mUserNote}>{tx.note}</p>
                    </div>
                    <p className={styles.mUserAmount}>{tx.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.mStatusCard}>
              <p className={styles.mSectionTitle}>სერვერების სტატუსი</p>
              <div className={styles.mStatusRow}>
                {SERVER_STATUS.map((name) => (
                  <span key={name} className={styles.mStatusItem}>
                    <span className={styles.mStatusDot} aria-hidden="true" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
