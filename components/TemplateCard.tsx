import Image from "next/image";
import Link from "next/link";
import type { Template } from "../lib/invitations";
import styles from "./TemplateCard.module.css";

export default function TemplateCard({ template }: { template: Template }) {
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
          <span className={styles.title}>{template.title}</span>
          <span className={styles.chip}>{template.category}</span>
        </span>
        <span className={styles.desc}>{template.description}</span>
        <span className={styles.tagline}>{template.tagline}</span>
      </span>
      <span className={styles.cta}>
        ნახვა და რედაქტირება
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
