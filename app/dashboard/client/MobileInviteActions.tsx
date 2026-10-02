"use client";

import { useState } from "react";
import styles from "./page.module.css";

/** Accept/decline on the mobile "new invite" card — real local RSVP state. */
export default function MobileInviteActions() {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">("pending");

  if (status !== "pending") {
    return (
      <p className={styles.mInviteResponded} data-accepted={status === "accepted"}>
        {status === "accepted" ? "✓ დადასტურდა — მოხარული ვართ!" : "პასუხი გაგზავნილია: ვერ დავესწრები"}
      </p>
    );
  }

  return (
    <div className={styles.mInviteActions}>
      <button type="button" className={styles.mBtnAccept} onClick={() => setStatus("accepted")}>
        მივიღებ
      </button>
      <button type="button" className={styles.mBtnDecline} onClick={() => setStatus("declined")}>
        ვერ მივალ
      </button>
    </div>
  );
}
