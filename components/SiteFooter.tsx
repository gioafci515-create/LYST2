import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "@/public/images/lyst-logo-footer.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import Divider from "./Divider";

const COLUMNS = [
  {
    titleKey: "productTitle" as const,
    links: [
      { key: "features" as const, href: "/features" },
      { key: "pricing" as const, href: "/pricing" },
      { key: "templates" as const, href: "/invitations" },
    ],
  },
  {
    titleKey: "companyTitle" as const,
    links: [
      { key: "about" as const, href: "/about" },
      { key: "blog" as const, href: "#" },
      { key: "careers" as const, href: "#" },
    ],
  },
  {
    titleKey: "supportTitle" as const,
    mobileHidden: true,
    links: [
      { key: "help" as const, href: "#" },
      { key: "contact" as const, href: "#" },
      { key: "rules" as const, href: "#" },
    ],
  },
];

const SOCIAL = ["Facebook", "Instagram", "LinkedIn"];

export default function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <Link href="/" aria-label="LYST">
            <Image
              src={logo}
              alt="LYST"
              width={98}
              height={35}
              className="site-footer-logo"
            />
          </Link>
          <p className="d-only">{t("siteDescriptionLong")}</p>
          <p className="m-only">{t("siteDescriptionShort")}</p>
        </div>

        <nav className="site-footer-links" aria-label={t("navLabel")}>
          {COLUMNS.map((col) => (
            <div
              key={col.titleKey}
              className={`site-footer-col${col.mobileHidden ? " d-only" : ""}`}
            >
              <h3>{t(col.titleKey)}</h3>
              {col.links.map((link) =>
                link.href === "#" ? (
                  <a key={link.key}>{t(link.key)}</a>
                ) : (
                  <Link key={link.key} href={link.href}>
                    {t(link.key)}
                  </Link>
                ),
              )}
            </div>
          ))}
        </nav>
      </div>

      <Divider />

      <div className="site-footer-bottom">
        <p>{t("copyright")}</p>
        <LanguageSwitcher className="d-only" />
        <div className="site-footer-social d-only">
          {SOCIAL.map((name) => (
            <a key={name}>{name}</a>
          ))}
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden="true">
        LYST
      </p>
    </footer>
  );
}
