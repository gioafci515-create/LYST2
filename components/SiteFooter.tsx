import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/lyst-logo.png";
import Divider from "./Divider";

const COLUMNS = [
  {
    title: "პროდუქტი",
    links: [
      { label: "ფუნქციები", href: "/features" },
      { label: "ფასები", href: "/pricing" },
      { label: "შაბლონები", href: "/invitations" },
    ],
  },
  {
    title: "კომპანია",
    links: [
      { label: "ჩვენ შესახებ", href: "/about" },
      { label: "ბლოგი", href: "#" },
      { label: "კარიერა", href: "#" },
    ],
  },
  {
    title: "მხარდაჭერა",
    mobileHidden: true,
    links: [
      { label: "დახმარება", href: "#" },
      { label: "კონტაქტი", href: "#" },
      { label: "წესები", href: "#" },
    ],
  },
];

const SOCIAL = ["Facebook", "Instagram", "LinkedIn"];

export default function SiteFooter() {
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
          <p className="d-only">
            ჭკვიანი ტექნოლოგია. ცოცხალი ემოცია. ციფრული მოსაწვევები და
            ღონისძიების მართვის პრემიუმ პლატფორმა.
          </p>
          <p className="m-only">
            შექმენით ციფრული გამოცდილება, რომელიც აერთიანებს თქვენს სტუმრებს.
          </p>
        </div>

        <nav className="site-footer-links" aria-label="ფუტერის ნავიგაცია">
          {COLUMNS.map((col) => (
            <div
              key={col.title}
              className={`site-footer-col${col.mobileHidden ? " d-only" : ""}`}
            >
              <h3>{col.title}</h3>
              {col.links.map((link) =>
                link.href === "#" ? (
                  <a key={link.label}>{link.label}</a>
                ) : (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </nav>
      </div>

      <Divider />

      <div className="site-footer-bottom">
        <p>© LYST. ყველა უფლება დაცულია.</p>
        <div className="site-footer-social d-only">
          {SOCIAL.map((name) => (
            <a key={name}>{name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
