import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import heroImage from "../public/images/hero-image.png";

const WALKTHROUGH_POINTS = [
  "მოსაწვევის მომენტალური გახსნა ინსტალაციის გარეშე",
  "ღონისძიების დეტალური ინფორმაცია და ლოკაცია",
  "დასწრების ავტომატური დადასტურება (RSVP)",
  "ღონისძიების დღის ცოცხალი ინტერაქტიული რეჟიმი",
  "მუდმივი ციფრული არქივი (Living Archive)",
];

const PHASES = [
  {
    marker: "01",
    title: "ის გიწვევს.",
    text: "სტუმარი ერთ პირად ბმულზე იღებს ყველა საჭირო ინფორმაციას, ლოკაციას, დრესკოდსა და განრიგს.",
  },
  {
    marker: "02",
    title: "ის ცოცხლდება.",
    text: "ღონისძიების დღეს ბმული იცვლის სახეს: აქტიურდება კამერა, ხმოვანი სტუმართა წიგნი და სტუმრები ხდებიან თანაშემქმნელები.",
  },
  {
    marker: "03",
    title: "ის ინახავს.",
    text: "საბოლოოდ, შეგროვებული ფოტოები, მილოცვები და ემოციები გარდაიქმნება დაცულ ციფრულ მოგონებად.",
  },
];

const TRUST_COLUMNS = [
  [
    "არანაირი აპლიკაცია — მუშაობს პირდაპირ ბრაუზერში",
    "არანაირი რეგისტრაცია სტუმრებისთვის",
    "ერთი პირადი დაცული ბმული მთელი ღონისძიებისთვის",
  ],
  [
    "მასპინძლის სრული კონტროლი კონტენტის წვდომაზე",
    "დასწრების წინასწარი გადახედვა (RSVP Preview)",
    "მონაცემები ინახება დაცულ ევროპულ სერვერებზე",
  ],
];

const FAQ = [
  {
    q: "სჭირდება თუ არა სტუმარს აპლიკაციის ჩამოტვირთვა?",
    a: "არა, ყველა ფუნქციონალი ხელმისაწვდომია მობილური ბრაუზერიდან, მარტივი ბმულით.",
  },
  {
    q: "როგორ ემატება Voice Guestbook ან Event Camera?",
    a: "ეს დამატებითი მოდულები იგეგმება ინდივიდუალურად და აქტიურდება ჩვენს გუნდთან კონსულტაციის შემდეგ.",
  },
  {
    q: "როდის ხდება საბოლოო ფასის დადასტურება?",
    a: "მოსაწვევის ფასი გეცნობებათ გამოქვეყნებამდე, ხოლო ინდივიდუალური ღონისძიებებისთვის იქმნება პერსონალური შეთავაზება.",
  },
];

function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="check-row">
      <span className="icon-check" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/check.svg" alt="" width={12} height={12} />
      </span>
      <span>{children}</span>
    </li>
  );
}

function ArrowIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/arrow-right.svg"
      alt=""
      width={12}
      height={12}
      className="arrow-icon"
    />
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="section hero">
          <div className="hero-split">
            <div className="hero-content">
              <div className="text-stack">
                <h1 className="t-display">ერთი ბმული მთელი ღონისძიებისთვის.</h1>
                <p className="t-body-lg">
                  შექმენი ციფრული მოსაწვევი, მართე სტუმრების დასწრება და LYST-ის
                  გუნდთან ერთად აქციე ღონისძიება ცოცხალ გამოცდილებად.
                </p>
              </div>
              <div className="hero-actions">
                <a href="#" className="btn btn-primary">
                  შექმენი მოსაწვევი
                </a>
                <a href="#path" className="btn btn-secondary hero-consult">
                  დაჯავშნე კონსულტაცია
                  <ArrowIcon />
                </a>
                <a href="#product" className="text-link">
                  ნახე როგორ მუშაობს
                  <span className="arrow-char" aria-hidden="true">
                    {" "}
                    →
                  </span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
            <div className="hero-image">
              <Image
                src={heroImage}
                alt=""
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                placeholder="blur"
              />
            </div>
          </div>
        </section>

        <section id="product" className="section section-subtle walkthrough">
          <div className="section-header">
            <p className="eyebrow">პროდუქტი</p>
            <h2 className="t-h1">ნახე, როგორ მუშაობს LYST</h2>
          </div>
          <div className="walkthrough-grid">
            <div className="walkthrough-details">
              <p className="t-body-lg">
                პლატფორმა გთავაზობთ სრულყოფილ ციფრულ გადაწყვეტას თქვენი
                სტუმრებისთვის — მარტივი ბმულით, რომელიც მორგებულია ნებისმიერ
                ეკრანსა და ბრაუზერზე.
              </p>
              <ul className="check-list">
                {WALKTHROUGH_POINTS.map((point) => (
                  <CheckRow key={point}>{point}</CheckRow>
                ))}
              </ul>
            </div>
            <div className="showcase">
              <h3 className="showcase-title">დასწრების კონტროლი სტუმრისთვის</h3>
              <p className="t-body">
                სტუმრები დადასტურებისას უთითებენ სახელსა და სტატუსს. არ არის
                საჭირო რეგისტრაცია.
              </p>
            </div>
          </div>
        </section>

        <section id="how" className="section lifecycle">
          <div className="section-header">
            <p className="eyebrow">ციკლი</p>
            <h2 className="t-h1">ერთი ბმული სამ ფაზაში.</h2>
          </div>
          <div className="cards-row">
            {PHASES.map((phase) => (
              <article key={phase.marker} className="phase-card">
                <span className="marker">{phase.marker}</span>
                <h3 className="phase-title">{phase.title}</h3>
                <p className="t-body">{phase.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="path" className="section section-subtle choose-path">
          <div className="section-header">
            <p className="eyebrow">გზა</p>
            <h2 className="t-h1">აირჩიე შენი გზა.</h2>
          </div>
          <div className="path-split">
            <article className="path-card">
              <div className="content-block">
                <p className="eyebrow path-eyebrow">თვითმომსახურება</p>
                <h3 className="t-h3">ციფრული მოსაწვევი</h3>
                <p className="t-body-lg">
                  შექმენი დამოუკიდებლად, მართე სტუმრები და გამოიყენე მზა
                  შაბლონები.
                </p>
              </div>
              <div className="price-action">
                <p className="price">ფასი დადასტურდება გამოქვეყნებამდე</p>
                <a href="#" className="btn btn-primary">
                  შექმენი მოსაწვევი
                </a>
              </div>
            </article>
            <article className="path-card">
              <div className="content-block">
                <p className="eyebrow path-eyebrow">პრემიუმ სერვისი</p>
                <h3 className="t-h3">ინდივიდუალური გამოცდილება</h3>
                <p className="t-body-lg">
                  სრული ციფრული სცენოგრაფია, ინტერაქტიული მოდულები და ჩვენი
                  გუნდის სრული მხარდაჭერა.
                </p>
              </div>
              <div className="price-action">
                <p className="price">ინდივიდუალური შეთავაზება</p>
                <a href="#final-cta" className="btn btn-secondary">
                  დაჯავშნე კონსულტაცია
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="experiences" className="section editorial">
          <div className="story-narrative">
            <div className="section-header">
              <p className="eyebrow">გამოცდილებები</p>
              <h2 className="t-h1">კონსულტაციით შექმნილი გამოცდილება</h2>
            </div>
            <p className="t-body-lg">
              ჩვენი სტუდია თბილისში ეხმარება მასპინძლებს უნიკალური ციფრული
              ატმოსფეროს შექმნაში. ხმოვანი მოსაგონარი წიგნაკი, ლოკალური
              ფოტო-პრინტერები და კამერები სინქრონიზებულია ერთიან, მდგრად
              ციფრულ არქივთან.
            </p>
            <div className="editorial-stats">
              <div className="stat-item">
                <p className="stat-title">კონსულტაცია</p>
                <p className="stat-text">
                  ღონისძიების გამოცდილება შენი საჭიროებების მიხედვით განიგება.
                </p>
              </div>
              <div className="stat-item">
                <p className="stat-title">კონტროლი</p>
                <p className="stat-text">
                  მასპინძლებს სრული კონტროლი აქვთ სტუმრების დასწრებაზე და
                  ღონისძიების ინფორმაციაზე.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="section section-subtle trust">
          <div className="section-header">
            <p className="eyebrow">უსაფრთხოება &amp; სიმარტივე</p>
            <h2 className="t-h1">ნდობა რეალური ციფრული სტატუსით</h2>
          </div>
          <div className="trust-grid">
            {TRUST_COLUMNS.map((column, index) => (
              <ul key={index} className="check-list trust-col">
                {column.map((point) => (
                  <CheckRow key={point}>{point}</CheckRow>
                ))}
              </ul>
            ))}
          </div>
        </section>

        <section id="faq" className="section faq">
          <div className="section-header">
            <p className="eyebrow">FAQ</p>
            <h2 className="t-h3 faq-title">ხშირად დასმული კითხვები</h2>
          </div>
          <div className="faq-rows">
            {FAQ.map((item) => (
              <div key={item.q} className="faq-row">
                <h3 className="faq-q">{item.q}</h3>
                <p className="faq-a">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="final-cta" className="section section-subtle final-cta">
          <div className="cta-content">
            <h2 className="t-h1">როგორი LYST გჭირდება?</h2>
            <p className="t-body-lg">
              დაიწყე მოსაწვევის შექმნა ახლავე ან დაგვიკავშირდი სრული ციფრული
              გამოცდილების დასაგეგმად.
            </p>
          </div>
          <div className="cta-actions">
            <a href="#" className="btn btn-primary">
              შექმენი მოსაწვევი
            </a>
            <a href="#path" className="btn btn-secondary">
              დაჯავშნე კონსულტაცია
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
