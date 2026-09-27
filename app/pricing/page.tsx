import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "../../components/CtaBand";
import Divider from "../../components/Divider";
import Header from "../../components/Header";
import SiteFooter from "../../components/SiteFooter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ფასები — LYST",
  description:
    "ორი გზა სხვადასხვა საჭიროებისთვის. აირჩიე ის, რაც შენს ღონისძიებას შეესაბამება.",
};

// `mobile: false` = only listed in the desktop frame; the mobile frame shows a shorter list.
const SELF_FEATURES = [
  { text: "ციფრული მოსაწვევის შექმნა", mobile: true },
  { text: "RSVP და დასწრების მართვა", mobile: true },
  { text: "ძირითადი გალერეა", mobile: false },
  { text: "ელფოსტით მხარდაჭერა", mobile: true },
  { text: "საკუთარი ტემპით გამოქვეყნება", mobile: false },
];

const PREMIUM_FEATURES = [
  { text: "კონსულტაციით შექმნილი მოდულები", mobile: true },
  { text: "ღონისძიებაზე ინდივიდუალურად მორგება", mobile: true },
  { text: "პერსონალური მენეჯერი", mobile: false },
  { text: "ღონისძიების კონფიგურაცია", mobile: false },
  { text: "პრიორიტეტული მხარდაჭერა", mobile: true },
  { text: "ინდივიდუალურად მორგებული შეთავაზება", mobile: false },
];

const COMPARISON = [
  ["მიზანი", "საკუთარი მოსაწვევი", "კონსულტაციით შექმნილი გამოცდილება"],
  ["მართვის სტილი", "თვითმომსახურება", "კონსულტაციით"],
  ["ფუნქციები", "ძირითადი", "კონსულტაციით"],
  ["მხარდაჭერა", "ელფოსტა", "პრიორიტეტული"],
  ["ფასი", "გამოქვეყნებამდე", "ინდივიდუალური"],
  ["შეთავაზება", "სტანდარტული", "ინდივიდუალურად მორგებული"],
];

const FAQ_DESKTOP = [
  {
    q: "როგორ ხდება დასწრების დადასტურება (RSVP)?",
    a: "სტუმრები იღებენ უნიკალურ ბმულს, სადაც ერთი ღილაკის დაჭერით შეუძლიათ დაადასტურონ დასწრება, მიუთითონ პლუს-სტუმრები და სხვა საჭირო ინფორმაცია.",
  },
  {
    q: "რა არის ხმოვანი სტუმართა წიგნი?",
    a: "ეს არის ციფრული ფუნქცია, რომელიც სტუმრებს საშუალებას აძლევს პირდაპირ ტელეფონებიდან ჩაწერონ აუდიო მილოცვები და ემოციები, რომლებიც სამუდამოდ ინახება თქვენს გალერეაში.",
  },
  {
    q: "შესაძლებელია თუ არა გზის შეცვლა ღონისძიებამდე?",
    a: "შესაძლებელია — საჭიროებები კონსულტაციის ან გამოქვეყნების პროცესში დაზუსტდება.",
  },
];

const FAQ_MOBILE = [
  {
    q: "შემიძლია მოგვიანებით დავამატო დამატებითი გამოცდილებები?",
    a: "კი. LYST-ის გუნდი შეაფასებს ღონისძიების თარიღს, სასურველ გამოცდილებებსა და მომზადების პირობებს.",
  },
  {
    q: "როგორ ავირჩიო შესაბამისი გზა?",
    a: "თუ მხოლოდ ციფრული მოსაწვევი გჭირდებათ, დაიწყეთ თვითმომსახურებით. დამატებითი გამოცდილებებისთვის დაჯავშნეთ კონსულტაცია.",
  },
];

function Check({ strong }: { strong?: boolean }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/pricing/${strong ? "check-14-strong" : "check-14"}.svg`}
        alt=""
        width={14}
        height={14}
        className="d-only"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/pricing/m-check-16.svg"
        alt=""
        width={16}
        height={16}
        className="m-only"
      />
    </>
  );
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            <span className="d-only">ტარიფები</span>
            <span className="m-only">აირჩიე შენი გეგმა</span>
          </p>
          <h1 className={styles.heroTitle}>
            <span className="d-only">
              აირჩიე გზა, რომელიც შენს ღონისძიებას შეესაბამება.
            </span>
            <span className="m-only">ფასები</span>
          </h1>
          <p className={styles.heroLead}>
            ორი გზა სხვადასხვა საჭიროებისთვის. აირჩიე ის, რაც შენს ღონისძიებას
            შეესაბამება.
          </p>
        </section>

        <section className={styles.plans}>
          <article className={styles.plan}>
            <header className={styles.planHead}>
              <h2 className={styles.planTitle}>ციფრული მოსაწვევი</h2>
              <p className={styles.planDesc}>
                <span className="d-only">
                  საკუთარი მოსაწვევის შექმნა და მართვა საკუთარი ტემპით.
                </span>
                <span className="m-only">
                  საკუთარი მოსაწვევის შექმნა და გაგზავნა საკუთარი ტემპით.
                </span>
              </p>
            </header>
            <p className={styles.price}>ფასი დადასტურდება გამოქვეყნებამდე</p>
            <Divider className={styles.planRule} />
            <ul className={styles.features}>
              {SELF_FEATURES.map((item) => (
                <li
                  key={item.text}
                  className={`${styles.feature}${item.mobile ? "" : ` ${styles.featureDesktopOnly}`}`}
                >
                  <Check />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <Link href="/create" className={styles.planButton}>
              შექმენი მოსაწვევი
            </Link>
          </article>

          <article className={`${styles.plan} ${styles.planPremium}`}>
            <span className={styles.planBadge}>
              <span className="d-only">კონსულტაციით შექმნილი გამოცდილება</span>
              <span className="m-only">კონსულტაცია</span>
            </span>
            <header className={styles.planHead}>
              <h2 className={styles.planTitle}>LYST გამოცდილება</h2>
              <p className={styles.planDesc}>
                კონსულტაციით შექმნილი მოდულები და ღონისძიებაზე ინდივიდუალურად
                მორგება.
              </p>
            </header>
            <p className={styles.price}>ინდივიდუალური შეთავაზება</p>
            <Divider className={styles.planRule} />
            <ul className={styles.features}>
              {PREMIUM_FEATURES.map((item) => (
                <li
                  key={item.text}
                  className={`${styles.feature} ${styles.featureStrong}${item.mobile ? "" : ` ${styles.featureDesktopOnly}`}`}
                >
                  <Check strong />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <Link href="/booking" className={styles.planButton}>
              დაჯავშნე კონსულტაცია
            </Link>
          </article>
        </section>

        <section className={styles.comparison}>
          <h2 className={styles.sectionTitle}>გზების შედარება</h2>
          <div className={styles.table} role="table" aria-label="გზების შედარება">
            <div className={`${styles.row} ${styles.rowHead}`} role="row">
              <span role="columnheader">გზა</span>
              <span role="columnheader" className={styles.cell}>
                ციფრული მოსაწვევი
              </span>
              <span role="columnheader" className={styles.cell}>
                LYST გამოცდილება
              </span>
            </div>
            {COMPARISON.map(([label, a, b]) => (
              <div key={label} className={styles.row} role="row">
                <span role="rowheader">{label}</span>
                <span role="cell" className={styles.cell}>
                  {a}
                </span>
                <span role="cell" className={styles.cell}>
                  {b}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* desktop FAQ */}
        <section className={styles.faq}>
          <h2 className={styles.sectionTitle}>ხშირად დასმული კითხვები</h2>
          <div className={styles.faqList}>
            {FAQ_DESKTOP.map((item) => (
              <details key={item.q} className={styles.faqItem} open>
                <summary className={styles.faqSummary}>
                  <span>{item.q}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/pricing/chevron-down-16.svg" alt="" width={16} height={16} />
                </summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* mobile FAQ */}
        <section className={styles.mobileFaq}>
          <h2 className={styles.mobileFaqTitle}>ხშირად დასმული კითხვები</h2>
          <div className={styles.mobileFaqList}>
            <p className={styles.mobileFaqNote}>
              ციფრული მოსაწვევი შექმენი თვითმომსახურებით; დამატებითი
              გამოცდილებები კონსულტაციის შემდეგ იგეგმება.
            </p>
            {FAQ_MOBILE.map((item) => (
              <details key={item.q} className={styles.mobileFaqItem} open>
                <summary className={styles.mobileFaqSummary}>
                  <span>{item.q}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/pricing/m-chevron-down-20.svg" alt="" width={20} height={20} />
                </summary>
                <p className={styles.mobileFaqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className={styles.mobileCta}>
          <CtaBand
            title="შექმენი შენი პირველი LYST"
            lead="გახადე დაგეგმარების პროცესი სასიამოვნო თავგადასავლად."
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
