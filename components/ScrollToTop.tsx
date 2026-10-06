"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";

// Wizard pages (create/booking) have their own sticky bottom action bar —
// skip the button there so the two floating elements never collide.
const HIDDEN_ON = ["/create", "/booking"];

export default function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const suppressed = HIDDEN_ON.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (suppressed) return;
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [suppressed]);

  if (suppressed) return null;

  return (
    <button
      type="button"
      className="scroll-to-top"
      data-visible={visible}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      aria-label="ზემოთ დაბრუნება"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/arrow-right.svg" alt="" width={14} height={14} />
    </button>
  );
}
