import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import avatar from "@/public/images/dashboard/avatar-admin.png";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboardAdmin" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

type Stat = { label: string; value: string; trend: string };
type RevenueBar = { month: string; value: string };
type ActivityItem = { name: string; note: string; time: string };
type OrderStatus = "confirmed" | "processing" | "done";
type Order = { id: string; client: string; event: string; date: string; amount: string; status: OrderStatus };
type Transaction = { name: string; note: string; amount: string };

const STAT_ICONS = ["creditcard", "activity", "usersD"];
const REVENUE_HEIGHTS = [109, 131, 122, 153];
const SERVER_STATUS = ["Database", "SMS Gateway", "RSVP API"];

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dashboardAdmin");

  const SIDEBAR_NAV = [
    { icon: "home", label: t("navHome"), href: "/dashboard/admin", active: true },
    { icon: "bag", label: t("navOrders"), href: "#orders" },
    { icon: "usersB", label: t("navClients"), href: "/dashboard/client" },
    { icon: "calendarB", label: t("navEvents"), href: "/dashboard/host" },
    { icon: "barchart", label: t("navAnalytics"), href: "#analytics" },
    { icon: "dollar", label: t("navFinance"), href: "#finance" },
    { icon: "usercheck", label: t("navTeam"), href: "#activity" },
    { icon: "settings", label: t("navSettings"), href: "/login" },
  ];

  const stats = t.raw("stats") as Stat[];
  const revenueBars = t.raw("revenueBars") as RevenueBar[];
  const recentActivity = t.raw("recentActivity") as ActivityItem[];
  const orders = t.raw("orders") as Order[];
  const mobileTransactions = t.raw("mobileTransactions") as Transaction[];

  const statusCopy: Record<OrderStatus, string> = {
    confirmed: t("statusConfirmed"),
    processing: t("statusProcessing"),
    done: t("statusDone"),
  };

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
                <p className={styles.userName}>{t("userName")}</p>
                <p className={styles.userRole}>{t("userRole")}</p>
              </div>
            </div>
          </aside>

          <main className={styles.main}>
            <div className={styles.topBar}>
              <div>
                <p className={styles.pageTitle}>{t("pageTitle")}</p>
                <p className={styles.pageSubtitle}>{t("pageSubtitle")}</p>
              </div>
              <div className={styles.topBarRight}>
                <div className={styles.search}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-search.svg" alt="" width={16} height={16} />
                  <span>{t("searchPlaceholder")}</span>
                </div>
                <div className={styles.dateTag}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-calendarC.svg" alt="" width={16} height={16} />
                  <span>{t("dateTag")}</span>
                </div>
                <span className={styles.notifBell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-bell.svg" alt={t("notifAlt")} width={18} height={18} />
                </span>
              </div>
            </div>

            <div id="finance" className={styles.statsRow}>
              {stats.map((stat, i) => (
                <div key={stat.label} className={styles.statCard}>
                  <div className={styles.statHead}>
                    <p className={styles.statLabel}>{stat.label}</p>
                    <span className={styles.statIconBox}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/images/dashboard/icon-${STAT_ICONS[i]}.svg`} alt="" width={16} height={16} />
                    </span>
                  </div>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statTrend}>
                    <strong>{stat.trend}</strong> {t("trendSuffix")}
                  </p>
                </div>
              ))}
              <div className={styles.statCard}>
                <div className={styles.statHead}>
                  <p className={styles.statLabel}>{t("currentEventsLabel")}</p>
                  <span className={styles.statIconBox}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/dashboard/icon-calendarD.svg" alt="" width={16} height={16} />
                  </span>
                </div>
                <p className={styles.statValue}>{t("currentEventsValue")}</p>
              </div>
            </div>

            <div className={styles.chartRow}>
              <div id="analytics" className={styles.chartCard}>
                <div className={styles.chartHead}>
                  <div>
                    <p className={styles.chartTitle}>{t("chartTitle")}</p>
                    <p className={styles.chartSub}>{t("chartSub")}</p>
                  </div>
                  <span className={styles.chartBadge}>{t("chartBadge")}</span>
                </div>
                <div className={styles.barsRow}>
                  {revenueBars.map((bar, i) => (
                    <div key={bar.month} className={styles.barCol}>
                      <p className={styles.barValue}>{bar.value}</p>
                      <div className={styles.bar} style={{ height: REVENUE_HEIGHTS[i] }} />
                      <p className={styles.barMonth}>{bar.month}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="activity" className={styles.activityCard}>
                <div className={styles.activityHead}>
                  <p className={styles.chartTitle}>{t("activityTitle")}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/icon-refresh.svg" alt={t("refreshAlt")} width={16} height={16} />
                </div>
                <div className={styles.activityList}>
                  {recentActivity.map((item) => (
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
                <p className={styles.chartTitle}>{t("ordersTitle")}</p>
                <Link href="#orders" className={styles.viewAllBtn}>
                  {t("viewAllCta")}
                </Link>
              </div>
              <div className={styles.table}>
                <div className={`${styles.row} ${styles.rowHead}`}>
                  <span className={styles.colId}>{t("colId")}</span>
                  <span className={styles.colClient}>{t("colClient")}</span>
                  <span className={styles.colEvent}>{t("colEvent")}</span>
                  <span className={styles.colDate}>{t("colDate")}</span>
                  <span className={styles.colAmount}>{t("colAmount")}</span>
                  <span className={styles.colStatus}>{t("colStatus")}</span>
                </div>
                {orders.map((order) => (
                  <div key={order.id} className={styles.row}>
                    <span className={styles.colId}>{order.id}</span>
                    <span className={styles.colClient}>{order.client}</span>
                    <span className={styles.colEvent}>{order.event}</span>
                    <span className={styles.colDate}>{order.date}</span>
                    <span className={styles.colAmount}>{order.amount}</span>
                    <span className={styles.colStatus}>
                      <span className={`${styles.statusBadge} ${styles[`status_${order.status}`]}`}>
                        {statusCopy[order.status]}
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
            <p className={styles.mPageTitle}>{t("mPageTitle")}</p>

            <div className={styles.mStatsGrid}>
              <div className={styles.mStatCard}>
                <p className={styles.mStatLabel}>{t("mStatUsersLabel")}</p>
                <p className={styles.mStatValue}>{t("mStatUsersValue")}</p>
                <p className={styles.mStatTrend}>{t("mStatUsersTrend")}</p>
              </div>
              <div className={styles.mStatCard}>
                <p className={styles.mStatLabel}>{t("mStatEventsLabel")}</p>
                <p className={styles.mStatValue}>{t("mStatEventsValue")}</p>
                <p className={styles.mStatTrend}>{t("mStatEventsTrend")}</p>
              </div>
            </div>

            <div className={styles.mRevenueCard}>
              <div>
                <p className={styles.mStatLabel}>{t("mRevenueLabel")}</p>
                <p className={styles.mStatValue}>{t("mRevenueValue")}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dashboard/m-trending-up.svg" alt="" width={24} height={24} />
            </div>

            <div className={styles.mSection}>
              <div className={styles.mSectionHead}>
                <p className={styles.mSectionTitle}>{t("mTransactionsTitle")}</p>
                <span className={styles.mSectionLink}>{t("mTransactionsAll")}</span>
              </div>
              <div className={styles.mUserList}>
                {mobileTransactions.map((tx) => (
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
              <p className={styles.mSectionTitle}>{t("mServerStatusTitle")}</p>
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
