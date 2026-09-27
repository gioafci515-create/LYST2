"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../public/images/lyst-logo.png";

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
  const pathname = usePathname();
  const nav = variant === "home" ? HOME_NAV : INNER_NAV;
  const close = () => setOpen(false);
  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;

  return (
    <header className={`header header--${variant}`}>
      <div className="header-bar">
        <Link href="/" className="logo-group" aria-label="LYST" onClick={close}>
          <Image
            src={logo}
            alt="LYST"
            width={112}
            height={40}
            priority
            className="logo-img"
          />
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

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="მობილური ნავიგაცია">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={current(item.href)}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <Link href="/create" className="btn btn-primary" onClick={close}>
            შექმენი მოსაწვევი
          </Link>
        </div>
      </div>
    </header>
  );
}
