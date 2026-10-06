"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = [
  { code: "ka", label: "ქართული" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
] as const;

/**
 * Switches locale while staying on the same page. `compact` renders the
 * 2-letter codes (header, tight on space); the full names are used in the
 * footer, matching the old static "ქართული / English / Русский" text it
 * replaces — except these are now real buttons.
 */
export default function LanguageSwitcher({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`lang-switcher${className ? ` ${className}` : ""}`} role="group" aria-label="Language / ენა / Язык">
      {LOCALES.map((l, i) => (
        <span key={l.code} className="lang-switcher-item">
          {i > 0 && <span aria-hidden="true" className="lang-switcher-sep">/</span>}
          <button
            type="button"
            aria-current={l.code === locale ? "true" : undefined}
            onClick={() => router.replace(pathname, { locale: l.code })}
          >
            {compact ? l.code.toUpperCase() : l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
