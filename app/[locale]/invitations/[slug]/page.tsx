import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import TemplateCard from "@/components/TemplateCard";
import RsvpDemo from "./RsvpDemo";
import { TEMPLATES, getTemplate } from "@/lib/invitations";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tData = await getTranslations({ locale, namespace: "invitationsData" });
  return {
    title: `${tData(`templates.${slug}.title`)} — ${tNav("invitations")} — LYST`,
    description: tData(`templates.${slug}.description`),
  };
}

export default async function InvitationDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const template = getTemplate(slug);
  if (!template) notFound();

  const t = await getTranslations("invitations");
  const tNav = await getTranslations("nav");
  const tData = await getTranslations("invitationsData");

  const title = tData(`templates.${template.slug}.title`);
  const category = tData(`categories.${template.categoryKey}`);
  const description = tData(`templates.${template.slug}.description`);
  const includes = tData.raw("includes") as string[];
  const others = TEMPLATES.filter((tpl) => tpl.slug !== template.slug);

  return (
    <>
      <Header />
      <main>
        <nav className={styles.breadcrumbs} aria-label="breadcrumb">
          <Link href="/invitations">{tNav("invitations")}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <section className={styles.hero}>
          <span className={`${styles.categoryChip} ${styles.mobileChip} m-only`}>
            {category}
          </span>

          <div className={styles.preview}>
            <div
              className={styles.phone}
              role="img"
              aria-label={t("previewAlt", { title })}
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
                  <p className={styles.screenTitle}>{title}</p>
                  <p className={styles.screenHost}>{t("demoHost")}</p>
                  <hr className={styles.screenRule} />
                  <div className={styles.screenMeta}>
                    <div className={styles.metaRow}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/icon-clock.svg" alt="" width={14} height={14} className="d-only" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/m-clock-10.svg" alt="" width={10} height={10} className="m-only" />
                      <span>{t("demoDate")}</span>
                    </div>
                    <div className={styles.metaRow}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/icon-map-pin.svg" alt="" width={14} height={14} className="d-only" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/invitations/m-pin-10.svg" alt="" width={10} height={10} className="m-only" />
                      <span>{t("demoLocation")}</span>
                    </div>
                  </div>
                  <div className={styles.dress}>
                    <span>{t("demoDressLabel")}</span>
                    <span className={styles.dressChip}>{t("demoDressValue")}</span>
                  </div>
                </div>
                <RsvpDemo />
              </div>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoHead}>
              <span className={`${styles.categoryChip} d-only`}>{category}</span>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.lead}>{description}</p>
            </div>

            <div className={styles.includes}>
              <h2 className={styles.includesTitle}>{t("includesTitle")}</h2>
              <ul className={styles.includesList}>
                {includes.map((item, i) => (
                  <li
                    key={item}
                    className={`${styles.includesItem}${i === includes.length - 1 ? ` ${styles.includesItemExtra}` : ""}`}
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
                {t("chooseCta")}
              </Link>
              <Link href={`/invite/${template.slug}`} className={`btn ${styles.action} ${styles.actionOutline}`}>
                {t("demoCta")}
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.more}>
          <div className={styles.moreHead}>
            <h2 className={styles.moreTitle}>{t("moreTitle")}</h2>
            <Link href="/invitations" className={styles.moreLink}>
              {t("moreLinkAll")}
            </Link>
          </div>

          <div className={styles.moreGrid}>
            {others.slice(0, 3).map((tpl) => (
              <TemplateCard key={tpl.slug} template={tpl} />
            ))}
          </div>

          <ul className={styles.moreList}>
            {others.slice(0, 2).map((tpl) => (
              <li key={tpl.slug}>
                <Link href={`/invitations/${tpl.slug}`} className={styles.moreItem}>
                  <span className={styles.moreThumb}>
                    <Image src={tpl.thumb ?? tpl.image} alt="" sizes="80px" />
                  </span>
                  <span className={styles.moreText}>
                    <span className={styles.moreItemHead}>
                      <span className={styles.moreItemTitle}>
                        {tData(`templates.${tpl.slug}.title`)}
                      </span>
                      <span className={styles.moreItemCat}>
                        {tData(`categories.${tpl.categoryKey}`)}
                      </span>
                    </span>
                    <span className={styles.moreItemDesc}>
                      {tData(`templates.${tpl.slug}.shortDescription`)}
                    </span>
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
