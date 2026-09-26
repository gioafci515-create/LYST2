"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "../public/images/lyst-logo.png";

const NAV = [
  { label: "პროდუქტი", href: "#product" },
  { label: "მოსაწვევები", href: "#path" },
  { label: "გამოცდილებები", href: "#experiences" },
  { label: "როგორ მუშაობს", href: "#how" },
  { label: "ფასები", href: "#path" },
  { label: "ჩვენ შესახებ", href: "#trust" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="header-bar">
        <a href="#top" className="logo-group" aria-label="LYST" onClick={close}>
          <Image
            src={logo}
            alt="LYST"
            width={112}
            height={40}
            priority
            className="logo-img"
          />
          <span className="badge">პლატფორმა</span>
        </a>

        <nav className="nav-links" aria-label="მთავარი ნავიგაცია">
          {NAV.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="auth-group">
          <a href="#" className="auth-login">
            შესვლა
          </a>
          <a href="#" className="btn btn-primary btn-sm">
            შექმენი მოსაწვევი
          </a>
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
          {NAV.map((item) => (
            <a key={item.label} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <a href="#" className="btn btn-primary" onClick={close}>
            შექმენი მოსაწვევი
          </a>
        </div>
      </div>
    </header>
  );
}
