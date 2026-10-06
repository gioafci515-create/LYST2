import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import cameraShot from "@/public/images/features/camera-shot.png";
import gallery1 from "@/public/images/features/gallery-1.png";
import gallery2 from "@/public/images/features/gallery-2.png";
import gallery3 from "@/public/images/features/gallery-3.png";
import guestHero from "@/public/images/features/guest-hero.png";
import styles from "./page.module.css";

const SLUGS = ["event-camera", "guest-management"] as const;
type Slug = (typeof SLUGS)[number];

type Props = { params: Promise<{ slug: string }> };

const META: Record<Slug, { title: string; description: string }> = {
  "event-camera": {
    title: "Event Camera — ფუნქციები — LYST",
    description:
      "ღონისძიების მომენტები, სტუმრების თვალით. ციფრული ერთჯერადი კამერა თითოეული სტუმრისთვის.",
  },
  "guest-management": {
    title: "სტუმრების მართვა — ფუნქციები — LYST",
    description:
      "მართეთ სტუმრების სრული სია რეალურ დროში, დააჯგუფეთ კატეგორიებად და აკონტროლეთ RSVP სტატუსები.",
  },
};

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return META[slug as Slug] ?? {};
}

function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="breadcrumb">
      <Link href="/features">ფუნქციები</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}

function EventCamera() {
  return (
    <>
      <Breadcrumbs current="Event Camera" />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>ციფრული ერთჯერადი კამერა</p>
          <h1 className={styles.heroTitle}>Event Camera</h1>
          <p className={styles.heroSubtitle}>
            ღონისძიების მომენტები, სტუმრების თვალით.
          </p>
          <p className={styles.heroText}>
            აღარ არის საჭირო სურათების სხვადასხვა ჩატებში გაფანტვა. Event Camera
            აძლევს თითოეულ სტუმარს შესაძლებლობას, გადაიღოს და გააზიაროს კადრები
            პირდაპირ ღონისძიების ბმულიდან.
          </p>
        </div>

        <div className={styles.stage}>
          <div className={styles.phoneShell} role="img" aria-label="Event Camera-ს გადახედვა">
            <div className={styles.phoneScreen}>
              <div className={styles.shot}>
                <Image src={cameraShot} alt="" sizes="240px" />
                <span className={styles.shotChip}>ერთჯერადი რეჟიმი</span>
              </div>
              <div className={styles.shutter}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/features/shutter.svg" alt="" width={56} height={56} />
                <span>გადაიღე ფოტო</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className={styles.dual}>
        <div className={styles.dualCol}>
          <p className={styles.dualLabel}>სტუმრისთვის</p>
          <h2 className={styles.dualTitle}>სკანირება. გადაღება.</h2>
          <ol className={styles.steps}>
            <li>1. სტუმარი ასკანირებს მაგიდაზე განთავსებულ QR კოდს</li>
            <li>2. მყისიერად იხსნება ვებ-კამერა აპლიკაციის გადმოწერის გარეშე</li>
            <li>3. იღებს უნიკალურ კადრებს და ამატებს გულწრფელ აღწერას</li>
          </ol>
        </div>
        <div className={styles.dualCol}>
          <p className={styles.dualLabel}>მასპინძლისთვის</p>
          <h2 className={styles.dualTitle}>კონტროლი. არქივი.</h2>
          <ol className={styles.steps}>
            <li>1. ფოტოების ავტომატური მოდერაცია და დასტური</li>
            <li>2. პრივატულობის რეჟიმი: დამალე ფოტოები მომდევნო დღემდე</li>
            <li>3. მაღალი ხარისხის არქივის სრული ექსპორტი ერთი კლიკით</li>
          </ol>
        </div>
      </section>

      <Divider />

      <section className={styles.result}>
        <div className={styles.resultHead}>
          <p className={styles.dualLabel}>ღონისძიების შემდეგ</p>
          <h2 className={styles.resultTitle}>ციფრული გალერეა და მოგონებები.</h2>
        </div>
        <div className={styles.gallery}>
          {[gallery1, gallery2, gallery3].map((img, i) => (
            <div key={i} className={styles.galleryItem}>
              <Image src={img} alt="" sizes="(max-width: 640px) 100vw, 405px" />
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="გამოცადე Event Camera"
        lead="შექმენი შენი პირველი ინტერაქტიული კამერა და დააკვირდი ღონისძიებას სტუმრების თვალით."
        mobileTitle="შექმენი შენი პირველი LYST"
        mobileLead="გახადე დაგეგმარების პროცესი სასიამოვნო თავგადასავლად."
      />
    </>
  );
}

const OUTCOMES = [
  { value: "98%", label: "სწრაფი გამოხმაურება სტუმრებისგან" },
  { value: "0", label: "დაკარგული ან დავიწყებული მოსაწვევები" },
  { value: "100%", label: "კონტროლი დაგეგმვის პროცესზე" },
];

function GuestManagement() {
  return (
    <>
      <Breadcrumbs current="სტუმრების მართვა" />

      <section className={`${styles.hero} ${styles.heroSubtle}`}>
        <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>სტუმრების მართვა</h1>
          <p className={styles.heroText}>
            მართეთ სტუმრების სრული სია რეალურ დროში, დააჯგუფეთ კატეგორიებად და
            აკონტროლეთ RSVP სტატუსები მარტივად, ერთ სივრცეში.
          </p>
        </div>
        <div className={styles.heroImage}>
          <Image src={guestHero} alt="" priority sizes="(max-width: 1100px) 100vw, 560px" />
        </div>
      </section>

      <section className={styles.perspective}>
        <div className={styles.perspectiveHead}>
          <h2 className={styles.perspectiveTitle}>ორმხრივი პერსპექტივა</h2>
          <p className={styles.perspectiveLead}>
            ერთი პლატფორმა, რომელიც იდეალურად ერგება როგორც მასპინძელს, ასევე
            მის სტუმარს.
          </p>
        </div>
        <div className={styles.perspectiveCards}>
          <article className={styles.perspectiveCard}>
            <h3>ორგანიზატორის ხედვა</h3>
            <p>
              სტუმრების დეტალური სია, RSVP სტატისტიკა რეალურ დროში, ფილტრაცია
              ჯგუფების მიხედვით (ოჯახი, მეგობრები, კოლეგები) და მარტივი
              ექსპორტი.
            </p>
          </article>
          <article className={styles.perspectiveCard}>
            <h3>სტუმრის ხედვა</h3>
            <p>
              მინიმალისტური და მოსახერხებელი გვერდი, სადაც სტუმარს შეუძლია ერთი
              დაწკაპუნებით დაადასტუროს დასწრება, მონიშნოს მენიუს პრიორიტეტები და
              ნახოს ლოკაცია.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.outcomes}>
        <h2 className={styles.outcomesTitle}>მოსალოდნელი შედეგები</h2>
        <ul className={styles.outcomesList}>
          {OUTCOMES.map((item) => (
            <li key={item.value} className={styles.outcome}>
              <span className={styles.outcomeValue}>{item.value}</span>
              <span className={styles.outcomeLabel}>{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="შექმენი შენი პირველი LYST"
        lead="გახადე დაგეგმარების პროცესი სასიამოვნო თავგადასავლად."
      />
    </>
  );
}

export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();

  return (
    <>
      <Header />
      <main>{slug === "event-camera" ? <EventCamera /> : <GuestManagement />}</main>
      <SiteFooter />
    </>
  );
}
