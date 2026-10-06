import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "@/public/images/lyst-logo-footer.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NAV_GROUPS = [
  { key: "product" as const, href: "#product" },
  { key: "invitations" as const, href: "#path" },
  { key: "experiences" as const, href: "#experiences" },
  { key: "howItWorks" as const, href: "#how" },
];

const QUICK_LINKS = [
  { key: "pricing" as const, href: "#path" },
  { key: "about" as const, href: "#trust" },
  { key: "login" as const, href: "/login" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Image
            src={logo}
            alt="LYST"
            width={84}
            height={30}
            className="footer-logo"
          />
          <p>{t("tagline")}</p>
        </div>

        <nav className="footer-nav-groups" aria-label={t("navLabel")}>
          {NAV_GROUPS.map((group) => (
            <div key={group.key} className="footer-nav-column">
              <a href={group.href}>{tNav(group.key)}</a>
            </div>
          ))}
        </nav>

        <div className="footer-utility">
          <p className="footer-utility-title">{t("quickLinksTitle")}</p>
          <ul className="footer-quick-links">
            {QUICK_LINKS.map((link) => (
              <li key={link.key}>
                <a href={link.href}>{tNav(link.key)}</a>
              </li>
            ))}
          </ul>
          <ul className="footer-contact">
            <li>
              <a href="mailto:studio@lyst.app">studio@lyst.app</a>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/line.svg"
        alt=""
        width={1280}
        height={1}
        className="footer-line"
      />

      <div className="footer-bottom">
        <p>{t("copyright")}</p>
        <div className="footer-legal">
          <a>{t("privacy")}</a>
          <a>{t("terms")}</a>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden="true">
        LYST
      </p>
    </footer>
  );
}
