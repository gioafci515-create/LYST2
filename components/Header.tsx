"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type NavKey =
  | "product"
  | "invitations"
  | "experiences"
  | "features"
  | "howItWorks"
  | "pricing"
  | "about";

type NavItem = { key: NavKey; href: string };

// The homepage frame and the inner-page frames use slightly different menus.
const HOME_NAV: NavItem[] = [
  { key: "product", href: "/product" },
  { key: "invitations", href: "/invitations" },
  { key: "experiences", href: "/#experiences" },
  { key: "howItWorks", href: "/how-it-works" },
  { key: "pricing", href: "/pricing" },
  { key: "about", href: "/about" },
];

const INNER_NAV: NavItem[] = [
  { key: "product", href: "/product" },
  { key: "invitations", href: "/invitations" },
  { key: "features", href: "/features" },
  { key: "howItWorks", href: "/how-it-works" },
  { key: "pricing", href: "/pricing" },
  { key: "about", href: "/about" },
];

export default function Header({
  variant = "inner",
}: {
  variant?: "home" | "inner";
}) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const nav = variant === "home" ? HOME_NAV : INNER_NAV;
  const close = () => setOpen(false);
  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 80);
      // only hide once past the header's own height, and never while the
      // mobile menu is open — avoids it sliding away mid-interaction
      setHidden((prev) => {
        if (open) return false;
        if (y < 160) return false;
        if (y > lastY.current + 4) return true;
        if (y < lastY.current - 4) return false;
        return prev;
      });
      lastY.current = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={`header header--${variant}`}
      data-scrolled={scrolled}
      data-hidden={hidden && !open}
    >
      <div className="header-bar">
        <Link href="/" className="logo-group" aria-label="LYST" onClick={close}>
          <span className="logo-img">Lyst.</span>
          <span className="badge">{t("platformBadge")}</span>
        </Link>

        <nav className="nav-links" aria-label={t("mainNavLabel")}>
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={current(item.href)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="auth-group">
          <LanguageSwitcher compact />
          <Link href="/login" className="auth-login">
            {t("login")}
          </Link>
          <Link href="/create" className="btn btn-primary btn-sm">
            {t("createCta")}
          </Link>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/menu.svg" alt="" width={20} height={20} />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" data-open={open} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          <nav aria-label={t("mobileNavLabel")}>
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={current(item.href)}
                onClick={close}
                tabIndex={open ? undefined : -1}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-actions">
            <Link href="/create" className="btn btn-primary" onClick={close} tabIndex={open ? undefined : -1}>
              {t("createCta")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
