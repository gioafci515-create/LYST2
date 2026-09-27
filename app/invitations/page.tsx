import type { Metadata } from "next";
import Header from "../../components/Header";
import SiteFooter from "../../components/SiteFooter";
import InvitationCatalog from "./InvitationCatalog";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "მოსაწვევები — LYST",
  description:
    "აღმოაჩინეთ ციფრული მოსაწვევების კოლექცია და ინტერაქტიული ღონისძიებები, რომლებიც შექმნილია უნიკალური ესთეტიკითა და მოწინავე ფუნქციონალით.",
};

export default function InvitationsPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            <span className="d-only">
              ციფრული მოსაწვევები და ინტერაქტიული ღონისძიებები, რომლებიც
              ღონისძიებასთან ერთად ცოცხლობენ.
            </span>
            <span className="m-only">
              მოსაწვევი, რომელიც ღონისძიებასთან ერთად ცოცხლობს.
            </span>
          </h1>
          <p className={styles.lead}>
            <span className="d-only">
              აღმოაჩინეთ ციფრული მოსაწვევების კოლექცია და ინტერაქტიული
              ღონისძიებები, რომლებიც შექმნილია უნიკალური ესთეტიკითა და
              მოწინავე ფუნქციონალით.
            </span>
            <span className="m-only">
              აღმოაჩინეთ ციფრული მოსაწვევებისა და ინტერაქტიული ღონისძიებების
              კოლექცია, შექმნილი უნიკალური ესთეტიკითა და მოწინავე
              ფუნქციონალით.
            </span>
          </p>
        </section>
        <InvitationCatalog />
      </main>
      <SiteFooter />
    </>
  );
}
