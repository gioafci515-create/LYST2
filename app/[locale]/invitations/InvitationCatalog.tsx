"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import TemplateCard from "@/components/TemplateCard";
import { CATEGORY_KEYS, TEMPLATES, type CategoryKey } from "@/lib/invitations";
import styles from "./page.module.css";

const ALL = "all" as const;
const FORMATS = ["formatDigital", "formatInteractive"] as const;

export default function InvitationCatalog() {
  const t = useTranslations("invitations");
  const tData = useTranslations("invitationsData");
  const [category, setCategory] = useState<CategoryKey | typeof ALL>(ALL);
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("formatDigital");

  const visible =
    category === ALL ? TEMPLATES : TEMPLATES.filter((tpl) => tpl.categoryKey === category);

  return (
    <>
      <div className={styles.filterBar}>
        <div className={styles.categories} role="group" aria-label={t("categoryAriaLabel")}>
          {[ALL, ...CATEGORY_KEYS].map((key) => (
            <button
              key={key}
              type="button"
              className={styles.pill}
              aria-pressed={category === key}
              onClick={() => setCategory(key as CategoryKey | typeof ALL)}
            >
              {key === ALL ? t("all") : tData(`categories.${key}`)}
            </button>
          ))}
        </div>
        <div className={styles.toggle} role="group" aria-label={t("formatAriaLabel")}>
          {FORMATS.map((key) => (
            <button
              key={key}
              type="button"
              className={styles.toggleBtn}
              aria-pressed={format === key}
              onClick={() => setFormat(key)}
            >
              {t(key)}
            </button>
          ))}
        </div>
      </div>

      <section className={styles.grid} aria-live="polite">
        {visible.map((template) => (
          <TemplateCard key={template.slug} template={template} />
        ))}
      </section>
    </>
  );
}
