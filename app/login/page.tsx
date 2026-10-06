import type { Metadata } from "next";
import Image from "next/image";
import Header from "../../components/Header";
import SiteFooter from "../../components/SiteFooter";
import logo from "../../public/images/lyst-logo.png";
import LoginForm from "./LoginForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "შესვლა — LYST",
  description: "მიესალმეთ თქვენს ჭკვიან ციფრულ მოსაწვევს.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className={styles.split}>
        <section className={styles.panel}>
          <div className={styles.head}>
            <Image src={logo} alt="LYST" width={140} height={50} className={styles.logo} />
            <div className={styles.headText}>
              <h1 className={styles.title}>შესვლა</h1>
              <p className={styles.subtitle}>
                <span className="d-only">მიესალმეთ თქვენს ჭკვიან ციფრულ მოსაწვევს</span>
                <span className="m-only">
                  მიესალმეთ თქვენს სტუმრებს და მართეთ ღონისძიებები
                </span>
              </p>
            </div>
          </div>
          <LoginForm />
        </section>
        <aside className={styles.visual} aria-hidden="true">
          <div className="glow-dark" />
          <p className={styles.visualWordmark}>LYST</p>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
