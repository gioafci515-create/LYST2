import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import preview3 from "@/public/images/invitations/golden.png";
import preview2 from "@/public/images/invitations/minimal.png";
import preview1 from "@/public/images/invitations/moonlight.png";
import preview4 from "@/public/images/features/preview-voice.png";
import memory1 from "@/public/images/how-it-works/memory-1.png";
import memory2 from "@/public/images/how-it-works/memory-2.png";
import memory3 from "@/public/images/how-it-works/memory-3.png";
import CopyLink from "./CopyLink";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "როგორ მუშაობს — LYST",
  description:
    "დაგეგმვიდან დასრულებამდე — მარტივი, დახვეწილი და ემოციური პროცესი თქვენთვის და თქვენი სტუმრებისთვის.",
};

const MOBILE_STEPS = [
  {
    n: "01",
    title: "აირჩიე შაბლონი",
    text: "შეარჩიეთ თქვენს სტილზე მორგებული დიზაინი ჩვენი მრავალფეროვანი გალერეიდან. კლასიკურიდან თანამედროვემდე.",
    image: preview1,
  },
  {
    n: "02",
    title: "მოარგე დეტალები",
    text: "დაამატეთ ტექსტი, ლოკაცია, მუსიკა და სპეციალური კითხვარი სტუმრებისთვის. შექმენით უნიკალური განწყობა.",
    image: preview2,
  },
  {
    n: "03",
    title: "მოიწვიე სტუმრები",
    text: "გააგზავნეთ პერსონალიზებული ბმულები სოციალურ ქსელებში ან SMS-ით. მიიღეთ მყისიერი პასუხები.",
    image: preview3,
  },
  {
    n: "04",
    title: "მართე ღონისძიება",
    text: "ადევნეთ თვალი RSVP პასუხებს რეალურ დროში, დააჯგუფეთ სტუმრები და მიიღეთ თბილი სამახსოვრო წერილები.",
    image: preview4,
  },
];

function Copy({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.copy}>
      <p className={styles.num}>{n}</p>
      <h2 className={styles.stepTitle}>{title}</h2>
      <p className={styles.stepText}>{children}</p>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="glow-light" aria-hidden="true" />
          <p className={styles.eyebrow}>
            <span className="d-only">როგორ მუშაობს LYST</span>
            <span className="m-only">მარტივი პროცესი</span>
          </p>
          <h1 className={styles.heroTitle}>
            <span className="d-only">ერთი ბმული. ერთი უწყვეტი გამოცდილება.</span>
            <span className="m-only">როგორ მუშაობს</span>
          </h1>
          <p className={styles.heroLead}>
            <span className="d-only">
              დაგეგმვიდან დასრულებამდე — მარტივი, დახვეწილი და ემოციური პროცესი
              თქვენთვის და თქვენი სტუმრებისთვის.
            </span>
            <span className="m-only">
              მიჰყევით ოთხ მარტივ ნაბიჯს თქვენი ოცნების ციფრული მოსაწვევის
              შესაქმნელად და ღონისძიების ორგანიზებისთვის.
            </span>
          </p>
        </section>

        <Divider className={styles.heroDivider} />

        {/* desktop journey */}
        <section className={styles.journey}>
          <div className={styles.step}>
            <Copy n="01" title="შექმნა">
              მასპინძელი ქმნის ღონისძიებას და მოსაწვევს მართვის პანელში. ირჩევთ
              სასურველ დიზაინს, უთითებთ დროს, ლოკაციას და აქტიურებთ საჭირო
              მოდულებს (კამერა, ხმოვანი წიგნი).
            </Copy>
            <div className={styles.card}>
              <p className={styles.cardTitle}>ღონისძიების შექმნა</p>
              <div className={styles.fields}>
                <p className={styles.field}>დასახელება: შემოდგომის ვახშამი</p>
                <p className={styles.field}>ლოკაცია: თბილისი, საქართველო</p>
              </div>
            </div>
          </div>

          <div className={`${styles.step} ${styles.reverse}`}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>პერსონალური ბმულის გაზიარება</p>
              <div className={styles.linkBox}>
                <span className={styles.linkText}>lyst.ge/autumn-dinner</span>
                <CopyLink value="lyst.ge/autumn-dinner" className={styles.copyBtn} />
              </div>
            </div>
            <Copy n="02" title="მოწვევა">
              სტუმარი იღებს ერთ პერსონალურ ბმულს. აღარ არის საჭირო უამრავი ჩატი
              და მისამართების ძიება - ყველა დეტალი ერთ დახვეწილ ციფრულ გვერდზეა.
            </Copy>
          </div>

          <div className={styles.step}>
            <Copy n="03" title="მონაწილეობა">
              სტუმარი ადასტურებს დასწრებას და მომენტალურად ერთვება ღონისძიების
              გამოცდილებაში. ტოვებს ხმოვან მესიჯებს, იღებს სურათებს და ხდება
              საღამოს თანაავტორი.
            </Copy>
            <div className={`${styles.card} ${styles.cardCenter}`}>
              <p className={styles.cardTitle}>ხმოვანი წიგნის ჩაწერა</p>
              <span className={styles.record} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/how-it-works/icon-mic.svg" alt="" width={24} height={24} />
              </span>
              <p className={styles.recordHint}>დააჭირე ჩასაწერად</p>
            </div>
          </div>

          <div className={`${styles.step} ${styles.reverse}`}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>ციფრული მოგონებები</p>
              <div className={styles.memories}>
                {[memory1, memory2, memory3].map((img, i) => (
                  <div key={i} className={styles.memory}>
                    <Image src={img} alt="" sizes="(max-width: 1100px) 33vw, 180px" />
                  </div>
                ))}
              </div>
            </div>
            <Copy n="04" title="მოგონება">
              ღონისძიების დასრულების შემდეგ შექმნილი კონტენტი ერთ სივრცეში რჩება.
              იქმნება ციფრული არქივი, რომელიც წლების განმავლობაში შეინახავს
              ერთობლივ მოგონებებს.
            </Copy>
          </div>
        </section>

        {/* mobile steps */}
        <section className={styles.mobileSteps}>
          {MOBILE_STEPS.map((step) => (
            <article key={step.n} className={styles.mobileStep}>
              <div className={styles.mobileHead}>
                <span className={styles.mobileNum}>{step.n}</span>
                <h2 className={styles.mobileTitle}>{step.title}</h2>
              </div>
              <p className={styles.mobileText}>{step.text}</p>
              <div className={styles.mobileImage}>
                <Image src={step.image} alt="" sizes="(max-width: 640px) 100vw, 1px" />
              </div>
            </article>
          ))}
        </section>

        <CtaBand
          title="დაგეგმე შენი ღონისძიება დღესვე"
          lead="გადააქციე ჩვეულებრივი შეკრება პრემიუმ ციფრულ გამოცდილებად და დაუტოვე განსაკუთრებული მოგონება შენს სტუმრებს."
          mobileTitle="შექმენი შენი პირველი LYST"
          mobileLead="გახადე დაგეგმარების პროცესი სასიამოვნო თავგადასავლად."
        />
      </main>
      <SiteFooter />
    </>
  );
}
