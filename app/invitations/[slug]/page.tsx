import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import SiteFooter from "../../../components/SiteFooter";
import TemplateCard from "../../../components/TemplateCard";
import RsvpDemo from "./RsvpDemo";
import {
  TEMPLATE_INCLUDES,
  TEMPLATES,
  getTemplate,
} from "../../../lib/invitations";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  return {
    title: `${template.title} — მოსაწვევები — LYST`,
    description: template.description,
  };
}

export default async function InvitationDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const others = TEMPLATES.filter((t) => t.slug !== template.slug);

  return (
    <>
      <Header />
      <main>
        <nav className={styles.breadcrumbs} aria-label="breadcrumb">
          <Link href="/invitations">მოსაწვევი</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{template.title}</span>
        </nav>

        <section className={styles.hero}>
          <span className={`${styles.categoryChip} ${styles.mobileChip} m-only`}>
            {template.category}
          </span>

          <div className={styles.preview}>
            <div
              className={styles.phone}
              role="img"
              aria-label={`${template.title} — მოსაწვევის გადახედვა`}
            >
              <div className={styles.screen}>
                <div className={styles.statusBar} aria-hidden="true">
                  <span className={styles.statusTime}>9:41</span>
                  <span className={styles.statusIcons}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/invitations/status-signal.svg" alt="" width={14} height={10} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/invitations/status-wifi.svg" alt="" width={14} height={10} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/invitations/status-battery.svg" alt="" width={18} height={10} />
                  </span>
                </div>
                <div className={styles.screenImage}>
                  <Image src={template.screen} alt="" sizes="300px" />
                </div>
                <div className={styles.screenBody}>
                  <p className={styles.screenTitle}>{template.title}</p>
                  <p className={styles.screenHost}>ორგანიზატორები: ანა და ლუკა</p>
                  <hr className={styles.screenRule} />
                  <div className={styles.screenMeta}>
                    <div className={styles.metaRow}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/icon-clock.svg" alt="" width={14} height={14} className="d-only" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/m-clock-10.svg" alt="" width={10} height={10} className="m-only" />
                      <span>14 ოქტ, 19:00</span>
                    </div>
                    <div className={styles.metaRow}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/icon-map-pin.svg" alt="" width={14} height={14} className="d-only" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/m-pin-10.svg" alt="" width={10} height={10} className="m-only" />
                      <span>თბილისი, ვერანდა.</span>
                    </div>
                  </div>
                  <div className={styles.dress}>
                    <span>ჩაცმულობის ფორმატი:</span>
                    <span className={styles.dressChip}>Black Tie</span>
                  </div>
                </div>
                <RsvpDemo />
              </div>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoHead}>
              <span className={`${styles.categoryChip} d-only`}>{template.category}</span>
              <h1 className={styles.title}>{template.title}</h1>
              <p className={styles.lead}>
                ელეგანტური მოსაწვევი მთვარის შუქზე შთაგონებული დიზაინით.
                მინიმალისტური ესთეტიკა, დახვეწილი ტიპოგრაფიკა და ციფრული
                ფუფუნება თანამედროვე წყვილებისთვის, ვისაც სურს დაუვიწყარი
                პირველი შთაბეჭდილების შექმნა.
              </p>
            </div>

            <div className={styles.includes}>
              <h2 className={styles.includesTitle}>რას მოიცავს შაბლონი:</h2>
              <ul className={styles.includesList}>
                {TEMPLATE_INCLUDES.map((item, i) => (
                  <li
                    key={item}
                    className={`${styles.includesItem}${i === TEMPLATE_INCLUDES.length - 1 ? ` ${styles.includesItemExtra}` : ""}`}
                  >
                    <span className={styles.checkBadge} aria-hidden="true">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/icon-check-10.svg" alt="" width={10} height={10} className="d-only" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/m-check-18.svg" alt="" width={18} height={18} className="m-only" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.actions}>
              <Link href={`/create?template=${template.slug}`} className={`btn btn-primary ${styles.action}`}>
                ამ მოსაწვევის არჩევა
              </Link>
              <Link href={`/invite/${template.slug}`} className={`btn ${styles.action} ${styles.actionOutline}`}>
                ნახე დემო ვერსია
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.more}>
          <div className={styles.moreHead}>
            <h2 className={styles.moreTitle}>სხვა მოსაწვევები</h2>
            <Link href="/invitations" className={styles.moreLink}>
              ყველას ნახვა
            </Link>
          </div>

          <div className={styles.moreGrid}>
            {others.slice(0, 3).map((t) => (
              <TemplateCard key={t.slug} template={t} />
            ))}
          </div>

          <ul className={styles.moreList}>
            {others.slice(0, 2).map((t) => (
              <li key={t.slug}>
                <Link href={`/invitations/${t.slug}`} className={styles.moreItem}>
                  <span className={styles.moreThumb}>
                    <Image src={t.thumb ?? t.image} alt="" sizes="80px" />
                  </span>
                  <span className={styles.moreText}>
                    <span className={styles.moreItemHead}>
                      <span className={styles.moreItemTitle}>{t.title}</span>
                      <span className={styles.moreItemCat}>{t.category}</span>
                    </span>
                    <span className={styles.moreItemDesc}>{t.shortDescription}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
