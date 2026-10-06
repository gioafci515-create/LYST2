"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = { label: string; href: string };

// The homepage frame and the inner-page frames use slightly different menus.
const HOME_NAV: NavItem[] = [
  { label: "პროდუქტი", href: "/product" },
  { label: "მოსაწვევები", href: "/invitations" },
  { label: "გამოცდილებები", href: "/#experiences" },
  { label: "როგორ მუშაობს", href: "/how-it-works" },
  { label: "ფასები", href: "/pricing" },
  { label: "ჩვენ შესახებ", href: "/about" },
];

const INNER_NAV: NavItem[] = [
  { label: "პროდუქტი", href: "/product" },
  { label: "მოსაწვევები", href: "/invitations" },
  { label: "ფუნქციები", href: "/features" },
  { label: "როგორ მუშაობს", href: "/how-it-works" },
  { label: "ფასები", href: "/pricing" },
  { label: "ჩვენ შესახებ", href: "/about" },
];

export default function Header({
  variant = "inner",
}: {
  variant?: "home" | "inner";
}) {
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
          <span className="badge">პლატფორმა</span>
        </Link>

        <nav className="nav-links" aria-label="მთავარი ნავიგაცია">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={current(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="auth-group">
          <Link href="/login" className="auth-login">
            შესვლა
          </Link>
          <Link href="/create" className="btn btn-primary btn-sm">
            შექმენი მოსაწვევი
          </Link>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "მენიუს დახურვა" : "მენიუს გახსნა"}
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
          <nav aria-label="მობილური ნავიგაცია">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={current(item.href)}
                onClick={close}
                tabIndex={open ? undefined : -1}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-actions">
            <Link href="/create" className="btn btn-primary" onClick={close} tabIndex={open ? undefined : -1}>
              შექმენი მოსაწვევი
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
