import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "../../components/CtaBand";
import Divider from "../../components/Divider";
import Header from "../../components/Header";
import SiteFooter from "../../components/SiteFooter";
import previewCamera from "../../public/images/features/preview-camera.png";
import previewHidden from "../../public/images/features/preview-hidden.png";
import previewLetters from "../../public/images/features/preview-letters.png";
import previewVoice from "../../public/images/features/preview-voice.png";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ფუნქციები — LYST",
  description:
    "აღმოაჩინეთ სრული ეკოსისტემა, რომელიც აერთიანებს პრემიუმ საორგანიზაციო ხელსაწყოებსა და სტუმრების ინტერაქტიულ გამოცდილებას.",
};

const MANAGEMENT = [
  {
    n: "01",
    title: "დასწრების პასუხები (RSVP)",
    text: "გაიმარტივეთ კომუნიკაცია. სტუმრები დასწრებას ერთი კლიკით ადასტურებენ, იქვე უთითებენ პლუს-სტუმრებსა და კვების სპეციფიკურ მოთხოვნებს.",
  },
  {
    n: "02",
    title: "სტუმრების დეტალური სია",
    text: "აკონტროლეთ ყველა სტუმარი და მათი სტატუსები რეალურ დროში. დააჯგუფეთ მაგიდების, კატეგორიების ან პასუხების მიხედვით მოსახერხებელი პანელიდან.",
  },
  {
    n: "03",
    title: "ლოკაცია, დრო და ჩაცმის სტილი",
    text: "გაუზიარეთ სტუმრებს მყისიერი ნავიგაცია რუკაზე, კალენდრის ბმულები და Dress Code-ის ვიზუალური შთაგონება ერთ ინტუიციურ ინტერფეისში.",
  },
];

type Experience = {
  title: string;
  text: string;
  icon: string;
  small?: boolean;
  /** only the five experiences shown on mobile have a photo */
  photo?: (typeof previewVoice);
  href?: string;
};

const EXPERIENCES: Experience[] = [
  {
    title: "Voice Guestbook",
    text: "მათი ხმა, რომელიც ღონისძიების შემდეგაც დარჩება.",
    icon: "camera",
    photo: previewVoice,
  },
  {
    title: "Hidden Moments",
    text: "ნახე ის მომენტები, რომლებიც თავად გამოგრჩა.",
    icon: "mic",
    photo: previewHidden,
  },
  {
    title: "Letters From the Room",
    text: "ერთი ოთახის ემოციები — ერთ ცოცხალ ისტორიად.",
    icon: "clock",
    photo: previewLetters,
  },
  {
    title: "Event Camera",
    text: "ყველა სტუმარი თქვენი ღონისძიების ფოტოგრაფია.",
    icon: "lock",
    small: true,
    photo: previewCamera,
    href: "/features/event-camera",
  },
  {
    title: "Living Archive",
    text: "ღონისძიება მთავრდება. მოგონებები — არა.",
    icon: "mail",
    small: true,
    photo: previewLetters,
  },
  {
    title: "Shared Gallery",
    text: "ყველა სტუმრის მიერ გადაღებული კადრი ერთიანდება დახვეწილ, ცოცხალ ციფრულ არქივში.",
    icon: "image",
    small: true,
  },
];

function Arrow() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/invitations/arrow-right-14.svg" alt="" width={14} height={14} />
  );
}

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="glow-light" aria-hidden="true" />
          <p className={styles.eyebrow}>პლატფორმის შესაძლებლობები</p>
          <h1 className={styles.heroTitle}>
            <span className="d-only">
              ღონისძიება მხოლოდ მაშინ არ იწყება, როცა სტუმრები მოვლენ.
            </span>
            <span className="m-only">ფუნქციები</span>
          </h1>
          <p className={styles.heroLead}>
            <span className="d-only">
              აღმოაჩინეთ სრული ეკოსისტემა, რომელიც აერთიანებს პრემიუმ
              საორგანიზაციო ხელსაწყოებსა და სტუმრების ინტერაქტიულ გამოცდილებას.
            </span>
            <span className="m-only">
              ყველაფერი რაც გჭირდებათ იდეალური ციფრული მოსაწვევის შესაქმნელად
              და ღონისძიების სრულყოფილად დასაგეგმად.
            </span>
          </p>
        </section>

        <Divider className={styles.heroDivider} />

        {/* system 01 ------------------------------------------------- */}
        <section className={styles.system}>
          <div className={styles.systemHead}>
            <p className={styles.systemLabel}>სისტემა 01</p>
            <h2 className={styles.systemTitle}>ღონისძიების მართვა</h2>
          </div>

          <div className={styles.blocks}>
            <div className={styles.block}>
              <div className={styles.blockText}>
                <h3 className={styles.blockTitle}>დასწრების პასუხები (RSVP)</h3>
                <p className={styles.blockLead}>
                  გაიმარტივეთ კომუნიკაცია. სტუმრები დასწრებას ერთი კლიკით
                  ადასტურებენ, იქვე უთითებენ პლუს-სტუმრებსა და კვების
                  სპეციფიკურ მოთხოვნებს.
                </p>
                <Link href="/features/guest-management" className={styles.blockLink}>
                  დეტალურად მართვაზე <Arrow />
                </Link>
              </div>
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <p className={styles.cardTitle}>მყისიერი RSVP სტატისტიკა</p>
                  <p className={styles.cardMeta}>განახლებული 2 წთ წინ</p>
                </div>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <p className={styles.statLabel}>დადასტურებული</p>
                    <p className={styles.statValue}>48 სტუმარი</p>
                  </div>
                  <div className={`${styles.stat} ${styles.statMuted}`}>
                    <p className={styles.statLabel}>მოლოდინში</p>
                    <p className={styles.statValue}>12 სტუმარი</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.block} ${styles.blockReverse}`}>
              <div className={styles.card}>
                <p className={styles.listLabel}>სტუმრების სია</p>
                {["გიორგი მერაბიშვილი", "მარიამ ჩხეიძე"].map((name) => (
                  <div key={name} className={styles.guestRow}>
                    <span className={styles.guestName}>{name}</span>
                    <span className={styles.badgeOk}>დადასტურებულია</span>
                  </div>
                ))}
              </div>
              <div className={styles.blockText}>
                <h3 className={styles.blockTitle}>სტუმრების დეტალური სია</h3>
                <p className={styles.blockLead}>
                  აკონტროლეთ ყველა სტუმარი და მათი სტატუსები რეალურ დროში.
                  დააჯგუფეთ მაგიდების, კატეგორიების ან პასუხების მიხედვით
                  მოსახერხებელი პანელიდან.
                </p>
                <Link href="/features/guest-management" className={styles.blockLink}>
                  სიაზე გადასვლა <Arrow />
                </Link>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.blockText}>
                <h3 className={styles.blockTitle}>ლოკაცია, დრო და ჩაცმის სტილი</h3>
                <p className={styles.blockLead}>
                  გაუზიარეთ სტუმრებს მყისიერი ნავიგაცია რუკაზე, კალენდრის
                  ბმულები და Dress Code-ის ვიზუალური შთაგონება ერთ ინტუიციურ
                  ინტერფეისში.
                </p>
              </div>
              <div className={`${styles.card} ${styles.cardRow}`}>
                <div className={styles.infoCol}>
                  <p className={styles.infoLabel}>სად და როდის</p>
                  <p className={styles.infoStrong}>თბილისი, მყუდრო ვერანდა</p>
                  <p className={styles.infoSub}>22 სექტემბერი, 18:30 სთ</p>
                </div>
                <div className={styles.infoCol}>
                  <p className={styles.infoLabel}>ჩაცმის სტილი</p>
                  <span className={styles.infoChip}>კაჟუალ სტილი</span>
                </div>
              </div>
            </div>
          </div>

          {/* mobile: numbered list */}
          <div className={styles.mobileList}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelMain}>ორგანიზება</span>
              <span className={styles.sectionLabelSub}>01 // 02</span>
            </div>
            <ol className={styles.numbered}>
              {MANAGEMENT.map((item) => (
                <li key={item.n} className={styles.numberedItem}>
                  <div className={styles.numberedHead}>
                    <span className={styles.numberedN}>{item.n}</span>
                    <h3 className={styles.numberedTitle}>{item.title}</h3>
                  </div>
                  <p className={styles.numberedText}>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Divider className={styles.systemDivider} />

        {/* system 02 ------------------------------------------------- */}
        <section className={`${styles.system} ${styles.systemSubtle}`}>
          <div className={styles.systemHead}>
            <p className={styles.systemLabel}>სისტემა 02</p>
            <h2 className={styles.systemTitle}>მოგონებების გამოცდილება</h2>
          </div>

          <div className={styles.experienceGrid}>
            {EXPERIENCES.map((item) => {
              const body = (
                <>
                  <div className={styles.experienceHead}>
                    <h3
                      className={`${styles.experienceTitle}${item.small ? ` ${styles.experienceTitleSm}` : ""}`}
                    >
                      {item.title}
                    </h3>
                    <span className={styles.iconDisc} aria-hidden="true">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/features/icon-${item.icon}.svg`}
                        alt=""
                        width={18}
                        height={18}
                      />
                    </span>
                  </div>
                  <p className={styles.experienceText}>{item.text}</p>
                </>
              );
              return item.href ? (
                <Link key={item.title} href={item.href} className={styles.experience}>
                  {body}
                </Link>
              ) : (
                <article key={item.title} className={styles.experience}>
                  {body}
                </article>
              );
            })}
          </div>

          {/* mobile: photo cards */}
          <div className={styles.mobileExperiences}>
            <div className={styles.sectionLabelStack}>
              <span className={styles.sectionLabelMain}>გაფართოებული გამოცდილებები</span>
              <span className={styles.sectionLabelSub}>კონსულტაციის შემდეგ</span>
            </div>
            <p className={styles.mobileNote}>
              ეს ფორმატები არ არის პირდაპირ აქტივირებადი. თქვენი ღონისძიების
              ტონის, სტილისა და მიზნის შესაბამისად ისინი კონსულტანტთან ერთად
              იწყება.
            </p>
            <ul className={styles.photoCards}>
              {EXPERIENCES.filter((e) => e.photo).map((item) => (
                <li key={item.title} className={styles.photoCard}>
                  <div className={styles.photoCardImage}>
                    <Image src={item.photo!} alt="" sizes="(max-width: 640px) 100vw, 350px" />
                  </div>
                  <div className={styles.photoCardBody}>
                    <h3 className={styles.photoCardTitle}>{item.title}</h3>
                    <p className={styles.photoCardText}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.consult}>
            <p className={styles.consultText}>
              <span className="d-only">
                ეს გამოცდილებები კონსულტაციის შედეგად იქმნება და გასააქტიურებლად
                განკუთვნილი არ არის.
              </span>
              <span className="m-only">
                აირჩიეთ ფორმატი და დაგეგმეთ კონსულტაცია სასურველი მომენტისთვის.
              </span>
            </p>
            <Link href="/booking" className={styles.consultButton}>
              დაჯავშნე კონსულტაცია
            </Link>
          </div>
        </section>

        <CtaBand
          title="დაიწყე შენი პირველი ციფრული თავგადასავალი"
          lead="შექმენი სრულიად განსხვავებული მოლოდინი და აქციე შენი სტუმრები ღონისძიების თანაავტორებად."
          mobileTitle="შექმენი შენი პირველი LYST"
          mobileLead="გახადე დაგეგმარების პროცესი სასიამოვნო თავგადასავლად."
        />
      </main>
      <SiteFooter />
    </>
  );
}
