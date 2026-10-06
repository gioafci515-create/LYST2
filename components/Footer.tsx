import Image from "next/image";
import logo from "../public/images/lyst-logo-footer.png";

const NAV_GROUPS = [
  { label: "პროდუქტი", href: "#product" },
  { label: "მოსაწვევები", href: "#path" },
  { label: "გამოცდილებები", href: "#experiences" },
  { label: "როგორ მუშაობს", href: "#how" },
];

const QUICK_LINKS = [
  { label: "ფასები", href: "#path" },
  { label: "ჩვენ შესახებ", href: "#trust" },
  { label: "შესვლა", href: "/login" },
];

export default function Footer() {
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
          <p>მოიწვიე ჭკვიანურად.</p>
        </div>

        <nav className="footer-nav-groups" aria-label="ფუტერის ნავიგაცია">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="footer-nav-column">
              <a href={group.href}>{group.label}</a>
            </div>
          ))}
        </nav>

        <div className="footer-utility">
          <p className="footer-utility-title">სწრაფი ბმულები</p>
          <ul className="footer-quick-links">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <ul className="footer-contact">
            <li>
              <a href="mailto:studio@lyst.app">studio@lyst.app</a>
            </li>
            <li>ქართული / English / Русский</li>
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
        <p>© LYST. ყველა უფლება დაცულია.</p>
        <div className="footer-legal">
          <a>კონფიდენციალურობა</a>
          <a>პირობები</a>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden="true">
        LYST
      </p>
      <br />
      <br />
    </footer>
  );
}
