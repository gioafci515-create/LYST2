"use client";

import { useState } from "react";
import TemplateCard from "@/components/TemplateCard";
import { CATEGORIES, TEMPLATES, type Category } from "@/lib/invitations";
import styles from "./page.module.css";

const ALL = "ყველა";
const FORMATS = ["ციფრული", "ინტერაქტიული"] as const;

export default function InvitationCatalog() {
  const [category, setCategory] = useState<Category | typeof ALL>(ALL);
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("ციფრული");

  const visible =
    category === ALL ? TEMPLATES : TEMPLATES.filter((t) => t.category === category);

  return (
    <>
      <div className={styles.filterBar}>
        <div className={styles.categories} role="group" aria-label="კატეგორია">
          {[ALL, ...CATEGORIES].map((name) => (
            <button
              key={name}
              type="button"
              className={styles.pill}
              aria-pressed={category === name}
              onClick={() => setCategory(name as Category | typeof ALL)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className={styles.toggle} role="group" aria-label="ფორმატი">
          {FORMATS.map((name) => (
            <button
              key={name}
              type="button"
              className={styles.toggleBtn}
              aria-pressed={format === name}
              onClick={() => setFormat(name)}
            >
              {name}
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
