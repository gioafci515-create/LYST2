import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { TemplateMeta } from "@/lib/invitations";
import styles from "./TemplateCard.module.css";

export default function TemplateCard({ template }: { template: TemplateMeta }) {
  const t = useTranslations("invitationsData");
  const tCommon = useTranslations("invitations");

  return (
    <Link href={`/invitations/${template.slug}`} className={styles.card}>
      <span className={styles.image}>
        <Image
          src={template.image}
          alt=""
          sizes="(max-width: 1024px) 50vw, 405px"
        />
      </span>
      <span className={styles.body}>
        <span className={styles.head}>
          <span className={styles.title}>{t(`templates.${template.slug}.title`)}</span>
          <span className={styles.chip}>{t(`categories.${template.categoryKey}`)}</span>
        </span>
        <span className={styles.desc}>{t(`templates.${template.slug}.description`)}</span>
        <span className={styles.tagline}>{t(`templates.${template.slug}.tagline`)}</span>
      </span>
      <span className={styles.cta}>
        {tCommon("cardCta")}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/invitations/arrow-right-14.svg"
          alt=""
          width={14}
          height={14}
        />
      </span>
    </Link>
  );
}
