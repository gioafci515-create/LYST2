import { Link } from "@/i18n/navigation";
import styles from "./CtaBand.module.css";

type Props = {
  title: string;
  lead: string;
  /** the mobile frames use shorter copy; falls back to the desktop copy */
  mobileTitle?: string;
  mobileLead?: string;
  cta?: string;
  href?: string;
};

/** Closing call-to-action: light band on desktop, dark band on mobile. */
export default function CtaBand({
  title,
  lead,
  mobileTitle,
  mobileLead,
  cta = "შექმენი მოსაწვევი",
  href = "/create",
}: Props) {
  return (
    <section className={styles.band}>
      <div className={styles.text}>
        <h2 className={styles.title}>
          <span className="d-only">{title}</span>
          <span className="m-only">{mobileTitle ?? title}</span>
        </h2>
        <p className={styles.lead}>
          <span className="d-only">{lead}</span>
          <span className="m-only">{mobileLead ?? lead}</span>
        </p>
      </div>
      <Link href={href} className={`btn btn-primary ${styles.button}`}>
        {cta}
      </Link>
    </section>
  );
}
