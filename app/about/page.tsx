import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "../../components/CtaBand";
import Header from "../../components/Header";
import SiteFooter from "../../components/SiteFooter";
import mGallery1 from "../../public/images/about/m-gallery-1.png";
import mGallery2 from "../../public/images/about/m-gallery-2.png";
import mGallery3 from "../../public/images/about/m-gallery-3.png";
import photo1 from "../../public/images/about/photo-1.png";
import photo2 from "../../public/images/about/photo-2.png";
import photo3 from "../../public/images/about/photo-3.png";
import story1 from "../../public/images/about/story-1.png";
import story2 from "../../public/images/about/story-2.png";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ჩვენს შესახებ — LYST",
  description:
    "LYST შეიქმნა იმისთვის, რომ ღონისძიება მხოლოდ ორგანიზებული კი არა, დასამახსოვრებელიც იყოს.",
};

const CHANGES = [
  {
    from: "დაშლილი კომუნიკაცია",
    to: "დახვეწილი ციფრული სივრცე",
    text: "მოსაწვევი, ღონისძიების დეტალები, RSVP და სტუმართა კომუნიკაცია ერთ სივრცეში ერთიანდება, რაც ზოგავს დროს და ამარტივებს მართვას.",
  },
  {
    from: "სტატიკური დეტალები",
    to: "ინტერაქტიული რუკა და RSVP",
    text: "სტუმრები მყისიერად იღებენ განახლებებს, ზუსტ ლოკაციას და მარტივად ადასტურებენ დასწრებას.",
  },
  {
    from: "ცალკეული ჩატები და ალბომები",
    to: "ერთიანი ცოცხალი მოგონება",
    text: "ყველა ფოტო, ვიდეო და ხმოვანი მილოცვა ერთად იყრის თავს და სამუდამოდ ინახება.",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "ციფრული ესთეტიკა",
    text: "ჩვენ გვჯერა, რომ მოსაწვევი ღონისძიების სახეა. სწორედ ამიტომ, დიზაინის თითოეულ დეტალს განსაკუთრებულ ყურადღებას ვუთმობთ.",
  },
  {
    n: "02",
    title: "ინოვაცია & ფუნქციურობა",
    text: "ჩვენ ვაერთიანებთ უახლეს ტექნოლოგიებს მარტივ სამომხმარებლო ინტერფეისთან, რათა მინიმალური ძალისხმევით მიაღწიოთ მაქსიმალურ შედეგს.",
  },
  {
    n: "03",
    title: "ცოცხალი კავშირი",
    text: "ციფრული მოსაწვევი, RSVP, ფოტოები, ვიდეო და ხმოვანი გზავნილები ერთ სივრცეში აერთიანებს სტუმრებს ღონისძიებამდე, ღონისძიებისას და მის შემდეგ.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            <span className="d-only">ჩვენს შესახებ</span>
            <span className="m-only">ჩვენი ისტორია</span>
          </p>
          <h1 className={styles.heroTitle}>
            <span className="d-only">
              LYST შეიქმნა იმისთვის, რომ ღონისძიება მხოლოდ ორგანიზებული კი არა,
              დასამახსოვრებელიც იყოს.
            </span>
            <span className="m-only">ჩვენს შესახებ</span>
          </h1>
          <p className={styles.quote}>
            „ჩვენი მისიაა გარდავქმნათ დღესასწაულებისთვის მზადების პროცესი
            მარტივ, სასიამოვნო და თანამედროვე გამოცდილებად.“
          </p>
        </section>

        {/* desktop story ------------------------------------------- */}
        <div className={styles.desktopOnly}>
          <section className={styles.story}>
            <div className={styles.storyText}>
              <p className={styles.label}>ჩვენი მისია</p>
              <h2 className={styles.storyTitle}>რატომ შეიქმნა LYST</h2>
              <p className={styles.storyBody}>
                ტრადიციული მოსაწვევი ერთი მომენტია. ჩვენ გვინდოდა შეგვექმნა
                რაღაც, რაც ღონისძიების მთელ გამოცდილებას მოიცავს — მოწვევიდან
                მოგონებამდე.
              </p>
            </div>
            <div className={styles.storyImage}>
              <Image src={story1} alt="" sizes="(max-width: 1100px) 100vw, 560px" />
            </div>
          </section>

          <section className={`${styles.story} ${styles.storySubtle} ${styles.storyStack}`}>
            <div className={styles.storyHead}>
              <p className={styles.label}>ტრანსფორმაცია</p>
              <h2 className={styles.storyTitle}>რას ვცვლით</h2>
            </div>
            <div className={styles.changes}>
              {CHANGES.map((item) => (
                <article key={item.from} className={styles.change}>
                  <div className={styles.changeHead}>
                    <span className={styles.changeFrom}>{item.from}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/about/arrow-right-12.svg" alt="" width={12} height={12} />
                    <strong className={styles.changeTo}>{item.to}</strong>
                  </div>
                  <p className={styles.changeText}>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.story} ${styles.storyReverse}`}>
            <div className={styles.storyImage}>
              <Image src={story2} alt="" sizes="(max-width: 1100px) 100vw, 560px" />
            </div>
            <div className={styles.storyText}>
              <p className={styles.label}>ხედვა</p>
              <h2 className={styles.storyTitle}>
                ტექნოლოგია, რომელიც ემოციას ემსახურება
              </h2>
              <p className={styles.storyBody}>
                ჩვენ გვჯერა, რომ ციფრული პროდუქტები უნდა აახლოებდეს ადამიანებს.
                LYST-ის თითოეული ფუნქცია შექმნილია იმისათვის, რომ გაამარტივოს
                საორგანიზაციო ქაოსი და მეტი დრო დაგიტოვოთ დღესასწაულით
                ტკბობისთვის.
              </p>
            </div>
          </section>

          <section className={styles.photos}>
            <h2 className={styles.photosTitle}>ატმოსფერული მომენტები</h2>
            <div className={styles.photoRow}>
              {[photo1, photo2, photo3].map((img, i) => (
                <div key={i} className={styles.photo}>
                  <Image src={img} alt="" sizes="(max-width: 1024px) 33vw, 410px" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* mobile principles + gallery -------------------------------- */}
        <div className={styles.mobileOnly}>
          <section className={styles.mobileSection}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelMain}>პრინციპები</span>
              <span className={styles.sectionLabelSub}>01 // 03</span>
            </div>
            <ol className={styles.principles}>
              {PRINCIPLES.map((p) => (
                <li key={p.n} className={styles.principle}>
                  <div className={styles.principleHead}>
                    <span className={styles.principleN}>{p.n}</span>
                    <h2 className={styles.principleTitle}>{p.title}</h2>
                  </div>
                  <p className={styles.principleText}>{p.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={`${styles.mobileSection} ${styles.mobileGallery}`}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelMain}>გალერეა</span>
              <span className={styles.sectionLabelSub}>02 // 03</span>
            </div>
            <div className={styles.galleryList}>
              {[mGallery1, mGallery2, mGallery3].map((img, i) => (
                <div key={i} className={styles.galleryItem}>
                  <Image src={img} alt="" sizes="(max-width: 640px) 100vw, 1px" />
                </div>
              ))}
            </div>
          </section>

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
