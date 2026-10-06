import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import heroImage from "@/public/images/hero-image.png";

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const walkthroughPoints = t.raw("walkthrough.points") as string[];
  const phases = t.raw("lifecycle.phases") as {
    marker: string;
    title: string;
    text: string;
  }[];
  const trustColumns = t.raw("trust.columns") as string[][];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <>
      <Header variant="home" />
      <main id="top">
        <section className="section hero">
          <div className="glow-light" aria-hidden="true" />
          <div className="hero-split">
            <div className="hero-content">
              <div className="text-stack">
                <h1 className="t-display">{t("hero.title")}</h1>
                <p className="t-body-lg t-slash">
                  {t("hero.leadPrefix")} <span className="t-accent">LYST</span>{" "}
                  {t("hero.leadSuffix")}
                </p>
              </div>
              <div className="hero-actions">
                <Link href="/create" className="btn btn-primary">
                  {t("hero.createCta")}
                </Link>
                <a href="#path" className="btn btn-secondary hero-consult">
                  {t("hero.bookConsult")}
                  <ArrowIcon />
                </a>
                <a href="#product" className="text-link">
                  {t("hero.seeHow")}
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
            <p className="eyebrow">{t("walkthrough.eyebrow")}</p>
            <h2 className="t-h1">{t("walkthrough.title")}</h2>
          </div>
          <div className="walkthrough-grid">
            <div className="walkthrough-details">
              <p className="t-body-lg">
                {t("walkthrough.leadPrefix")}{" "}
                <mark>{t("walkthrough.leadHighlight")}</mark>
                {t("walkthrough.leadSuffix")}
              </p>
              <ul className="check-list">
                {walkthroughPoints.map((point) => (
                  <CheckRow key={point}>{point}</CheckRow>
                ))}
              </ul>
            </div>
            <div className="showcase">
              <h3 className="showcase-title">{t("walkthrough.showcaseTitle")}</h3>
              <p className="t-body">{t("walkthrough.showcaseText")}</p>
            </div>
          </div>
        </section>

        <section id="how" className="section lifecycle section-dark">
          <div className="section-header">
            <p className="eyebrow">{t("lifecycle.eyebrow")}</p>
            <h2 className="t-h1">{t("lifecycle.title")}</h2>
          </div>
          <div className="cards-row">
            {phases.map((phase) => (
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
            <p className="eyebrow">{t("path.eyebrow")}</p>
            <h2 className="t-h1">{t("path.title")}</h2>
          </div>
          <div className="path-split">
            <article className="path-card">
              <div className="content-block">
                <p className="eyebrow path-eyebrow">{t("path.self.eyebrow")}</p>
                <h3 className="t-h3">{t("path.self.title")}</h3>
                <p className="t-body-lg">{t("path.self.lead")}</p>
              </div>
              <div className="price-action">
                <p className="price">{t("path.self.price")}</p>
                <Link href="/create" className="btn btn-primary">
                  {t("path.self.cta")}
                </Link>
              </div>
            </article>
            <article className="path-card path-card-featured">
              <div className="content-block">
                <p className="eyebrow path-eyebrow">{t("path.premium.eyebrow")}</p>
                <h3 className="t-h3">{t("path.premium.title")}</h3>
                <p className="t-body-lg">{t("path.premium.lead")}</p>
              </div>
              <div className="price-action">
                <p className="price">{t("path.premium.price")}</p>
                <a href="#final-cta" className="btn btn-secondary">
                  {t("path.premium.cta")}
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="experiences" className="section editorial">
          <div className="story-narrative">
            <div className="section-header">
              <p className="eyebrow">{t("experiences.eyebrow")}</p>
              <h2 className="t-h1">{t("experiences.title")}</h2>
            </div>
            <p className="t-body-lg">{t("experiences.lead")}</p>
            <div className="editorial-stats">
              {(t.raw("experiences.stats") as { title: string; text: string }[]).map(
                (stat) => (
                  <div key={stat.title} className="stat-item">
                    <p className="stat-title">{stat.title}</p>
                    <p className="stat-text">{stat.text}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section id="trust" className="section section-subtle trust">
          <div className="section-header">
            <p className="eyebrow">{t("trust.eyebrow")}</p>
            <h2 className="t-h1">{t("trust.title")}</h2>
          </div>
          <div className="trust-grid">
            {trustColumns.map((column, index) => (
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
            <p className="eyebrow">{t("faq.eyebrow")}</p>
            <h2 className="t-h3 faq-title">{t("faq.title")}</h2>
          </div>
          <div className="faq-rows">
            {faqItems.map((item, i) => (
              <details key={item.q} className="faq-row" open={i === 0}>
                <summary className="faq-q">
                  <span>{item.q}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/pricing/chevron-down-16.svg" alt="" width={16} height={16} className="faq-chevron" />
                </summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="final-cta" className="section final-cta section-dark">
          <div className="glow-dark" aria-hidden="true" />
          <div className="cta-content">
            <h2 className="t-h1">
              {t("finalCta.titlePrefix")} <span className="t-accent">LYST</span>{" "}
              {t("finalCta.titleSuffix")}
            </h2>
            <p className="t-body-lg">{t("finalCta.lead")}</p>
          </div>
          <div className="cta-actions">
            <Link href="/create" className="btn btn-primary">
              {t("finalCta.createCta")}
            </Link>
            <a href="#path" className="btn btn-secondary">
              {t("finalCta.bookConsult")}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
