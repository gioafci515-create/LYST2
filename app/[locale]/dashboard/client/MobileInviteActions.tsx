"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./page.module.css";

/** Accept/decline on the mobile "new invite" card — real local RSVP state. */
export default function MobileInviteActions() {
  const t = useTranslations("dashboardClient");
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">("pending");

  if (status !== "pending") {
    return (
      <p className={styles.mInviteResponded} data-accepted={status === "accepted"}>
        {status === "accepted" ? t("inviteAcceptedNote") : t("inviteDeclinedNote")}
      </p>
    );
  }

  return (
    <div className={styles.mInviteActions}>
      <button type="button" className={styles.mBtnAccept} onClick={() => setStatus("accepted")}>
        {t("inviteAccept")}
      </button>
      <button type="button" className={styles.mBtnDecline} onClick={() => setStatus("declined")}>
        {t("inviteDecline")}
      </button>
    </div>
  );
}
