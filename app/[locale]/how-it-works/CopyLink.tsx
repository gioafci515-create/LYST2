"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

/** The "copy" button of the shareable-link mock-up: copies the sample link. */
export default function CopyLink({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const t = useTranslations("howItWorks");
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard can be blocked (insecure origin, permissions) — the UI still confirms
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button type="button" className={className} onClick={copy}>
      {copied ? t("copied") : t("copy")}
    </button>
  );
}
