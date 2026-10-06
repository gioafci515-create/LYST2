import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import camera from "@/public/images/product/camera.png";
import memory1 from "@/public/images/product/memory-1.png";
import memory2 from "@/public/images/product/memory-2.png";
import phoneHero from "@/public/images/product/phone-hero.png";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "პროდუქტი — LYST",
  description:
    "LYST აერთიანებს ღონისძიების დაგეგმვას, სტუმრების მართვას, ინტერაქციას და მოგონებების შენახვას ერთ სივრცეში.",
};

const GUESTS = [
  { name: "ალექსანდრე მდივანი", note: "+1 სტუმარი", status: "ok" as const },
  {
    name: "თამარ ლორთქიფანიძე",
    note: "მხოლოდ თავად",
    status: "ok" as const,
    extra: true,
  },
  { name: "ლაშა გიორგობიანი", note: "პასუხი არ არის", status: "wait" as const },
];

// bar heights of the voice-message waveform; the last two are "unplayed"
const WAVE = [18, 12, 24, 6, 16, 10];

function Copy({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.copy}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.copyTitle}>{title}</h2>
      <p className={styles.copyText}>{children}</p>
    </div>
  );
}

export default function ProductPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="glow-light" aria-hidden="true" />
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>მოსაწვევზე მეტი.</h1>
            <p className={styles.heroLead}>
              LYST აერთიანებს ღონისძიების დაგეგმვას, სტუმრების მართვას,
              ინტერაქციას და მოგონებების შენახვას ერთ სივრცეში.
            </p>
          </div>
          <div className={styles.heroActions}>
            <Link href="/create" className="btn btn-primary btn-md">
              შექმენი მოსაწვევი
            </Link>
            <Link href="/how-it-works" className={styles.heroLink}>
              ნახე როგორ მუშაობს
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/product/arrow-right-16.svg"
                alt=""
                width={16}
                height={16}
                className={styles.arrowLg}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/arrow-right.svg"
                alt=""
                width={12}
                height={12}
                className={styles.arrowSm}
              />
            </Link>
          </div>
        </section>

        <Divider />

        {/* 01 — invitation */}
        <section className={styles.module}>
          <div className={`${styles.media} ${styles.phoneWrap}`}>
            <div className={styles.phone}>
              <div className={styles.screen}>
                <div className={styles.statusBar} aria-hidden="true">
                  <span className={styles.statusTime}>9:41</span>
                  <span className={styles.statusIcons}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/product/status-signal.svg" alt="" width={14} height={10} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/product/status-wifi.svg" alt="" width={14} height={10} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/product/status-battery.svg" alt="" width={18} height={10} />
                  </span>
                </div>
                <div className={styles.phoneImage}>
                  <Image src={phoneHero} alt="" sizes="270px" />
                </div>
                <div className={styles.phoneBody}>
                  <p className={styles.phoneTitle}>შემოდგომის ვახშამი</p>
                  <p className={styles.phoneHost}>მასპინძლები: ნინო და გიორგი</p>
                  <Divider />
                  <div className={styles.phoneMeta}>
                    <div className={styles.phoneMetaRow}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/product/icon-calendar.svg" alt="" width={14} height={14} />
                      <span>22 სექტ, 18:30 - გვიან</span>
                    </div>
                    <div className={styles.phoneMetaRow}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/product/icon-pin.svg" alt="" width={14} height={14} />
                      <span>ვერანდა, თბილისი</span>
                    </div>
                  </div>
                </div>
                <div className={styles.phoneRsvp}>
                  <span>დავესწრები</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.media} ${styles.mobileImage}`}>
            <Image src={phoneHero} alt="" sizes="(max-width: 640px) 100vw, 1px" />
          </div>
          <Copy eyebrow="01 // მოსაწვევი" title="ღონისძიების ყველა მნიშვნელოვანი ინფორმაცია ერთ ბმულზე.">
            სტუმარს აღარ უწევს სხვადასხვა ჩატებში მისამართების, დროისა თუ ჩაცმის
            სტილის ძებნა. ყველაფერი დახვეწილ, ადაპტირებულ ციფრულ სივრცეშია
            წარმოდგენილი, რომელიც ნებისმიერი სმარტფონიდან იდეალურად იხსნება.
          </Copy>
        </section>

        <Divider />

        {/* 02 — RSVP responses */}
        <section className={`${styles.module} ${styles.subtle} ${styles.reverse}`}>
          <div className={styles.media}>
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <p className={styles.panelTitle}>სტუმრებიდან მიღებული პასუხები</p>
                <span className={styles.chip}>სტატისტიკა</span>
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <p className={styles.statLabel}>დადასტურებული</p>
                  <p className={styles.statValue}>74 სტუმარი</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statLabel}>ვერ დაესწრება</p>
                  <p className={styles.statValue}>12 სტუმარი</p>
                </div>
              </div>
            </div>
          </div>
          <Copy eyebrow="02 // დასწრების პასუხები" title="სტუმრების პასუხები და სტატუსები ერთ სივრცეში.">
            დასწრების დადასტურება ხდება უმარტივესად, ზედმეტი ზარებისა და
            შეტყობინებების გარეშე. სტუმარს შეუძლია მიუთითოს პლუს-სტუმრები და
            გაგიზიაროთ მნიშვნელოვანი დეტალები.
          </Copy>
        </section>

        <Divider />

        {/* 03 — guest management */}
        <section className={styles.module}>
          <div className={styles.media}>
            <div className={styles.guestPanel}>
              <div className={styles.guestHead}>
                <p className={styles.panelTitle}>სტუმრების სია</p>
                <p className={styles.guestHint}>მყისიერი განახლებები</p>
              </div>
              <ul className={styles.guestList}>
                {GUESTS.map((guest) => (
                  <li
                    key={guest.name}
                    className={`${styles.guestRow}${guest.extra ? ` ${styles.guestRowExtra}` : ""}`}
                  >
                    <div className={styles.guestName}>
                      <strong>{guest.name}</strong>
                      <span>{guest.note}</span>
                    </div>
                    <span
                      className={`${styles.badge} ${guest.status === "ok" ? styles.badgeOk : styles.badgeWait}`}
                    >
                      {guest.status === "ok" ? "დადასტურებულია" : "მოლოდინში"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Copy eyebrow="03 // სტუმრების მართვა" title="მასპინძლისთვის მარტივი მართვის პანელი.">
            აკონტროლეთ სტუმრების სრული ნაკადი ერთი ცენტრალიზებული პანელიდან.
            მოახდინეთ მონაცემების ექსპორტირება, დააჯგუფეთ სტუმრები მაგიდების ან
            სტატუსის მიხედვით და დაზოგეთ დრო საორგანიზაციო საკითხებზე.
          </Copy>
        </section>

        <Divider />

        {/* 04 — participation */}
        <section className={`${styles.module} ${styles.subtle} ${styles.reverse}`}>
          <div className={styles.media}>
            <div className={styles.stack}>
              <div className={styles.voice}>
                <span className={styles.voiceIcon} aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/product/icon-mic.svg" alt="" width={14} height={14} />
                </span>
                <div className={styles.voiceBody}>
                  <div className={styles.voiceMeta}>
                    <strong>ნინო მარიამიძე</strong>
                    <span>22:15</span>
                  </div>
                  <div className={styles.wave} aria-hidden="true">
                    {WAVE.map((h, i) => (
                      <i key={i} className={i > 3 ? styles.off : undefined} style={{ height: h }} />
                    ))}
                  </div>
                </div>
                <span className={styles.voiceTime}>0:18</span>
              </div>
              <div className={styles.camera}>
                <div className={styles.cameraHead}>
                  <p className={styles.cameraLabel}>
                    <span className="d-only">პირდაპირი კამერის რეჟიმი</span>
                    <span className="m-only">პირდაპირი კამერა</span>
                  </p>
                  <span className={styles.liveDot} aria-hidden="true" />
                </div>
                <div className={styles.cover}>
                  <Image src={camera} alt="" sizes="(max-width: 640px) 100vw, 685px" />
                </div>
              </div>
            </div>
          </div>
          <Copy eyebrow="04 // ღონისძიებაში მონაწილეობა" title="ფოტოები, ვიდეოები და ხმოვანი გზავნილები.">
            აქციეთ თქვენი სტუმრები ღონისძიების თანაავტორებად. ციფრული ერთჯერადი
            კამერისა და პირდაპირ ეთერში ჩაწერილი ხმოვანი გზავნილების მეშვეობით,
            თითოეული ემოცია რეალურ დროში ფიქსირდება.
          </Copy>
        </section>

        <Divider />

        {/* 05 — memories */}
        <section className={styles.module}>
          <div className={styles.media}>
            <div className={styles.memories}>
              <div className={styles.memory}>
                <Image src={memory1} alt="" sizes="(max-width: 640px) 50vw, 250px" />
              </div>
              <div className={styles.memory}>
                <Image src={memory2} alt="" sizes="(max-width: 640px) 50vw, 250px" />
              </div>
            </div>
          </div>
          <Copy eyebrow="05 // მოგონებები" title="დასრულების შემდეგ შექმნილი კონტენტი ერთ სივრცეში რჩება.">
            არცერთი დაკარგული ფოტო ან ხმოვანი მილოცვა. ღონისძიების
            დასრულებისთანავე, LYST ავტომატურად აგენერირებს ციფრულ არქივს,
            რომელიც წლების განმავლობაში შეგინახავთ იმ ძვირფას მომენტებს,
            რომლებიც ერთად შექმენით.
          </Copy>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>მზად ხარ პირველი ღონისძიებისთვის?</h2>
            <p className={styles.ctaLead}>
              შექმენი შენი ციფრული მოსაწვევი დღესვე და გადააქციე უბრალო შეკრება
              დაუვიწყარ გამოცდილებად.
            </p>
          </div>
          <Link href="/create" className="btn btn-primary btn-md">
            შექმენი მოსაწვევი
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
