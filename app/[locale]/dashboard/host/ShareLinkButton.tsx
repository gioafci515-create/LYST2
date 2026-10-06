"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

/** Copies the invitation's share link to the clipboard; confirms visually. */
export default function ShareLinkButton({ className }: { className?: string }) {
  const t = useTranslations("dashboardHost");
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText("https://lyst.app/i/moonlight");
    } catch {
      // clipboard can be blocked (insecure origin, permissions) — the UI still confirms
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button type="button" className={className} onClick={copy}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/dashboard/m-share.svg" alt="" width={20} height={20} />
      <span>{copied ? t("shareLinkCopied") : t("shareLinkCta")}</span>
    </button>
  );
}
