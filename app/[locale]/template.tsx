"use client";

import { useEffect, useRef } from "react";

/**
 * Next.js re-mounts `template.tsx` on every navigation (unlike layout.tsx),
 * so this both (a) fades/rises each new page in and (b) re-arms the
 * scroll-reveal observer for that page's own <section> elements.
 *
 * Sections are fully visible by default (plain CSS, no JS needed) — this
 * effect only ever ADDS a one-time entrance-animation class as a section
 * scrolls into view. If IntersectionObserver never fires for any reason
 * (old browser, a throttled background tab, JS disabled), sections simply
 * stay visible with no animation — there is no failure mode where content
 * gets stuck hidden.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("main section"));
    if (reduced || targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-play");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="page-transition">
      {children}
    </div>
  );
}
