"use client";

import { useState } from "react";
import styles from "./page.module.css";

// Preview-only RSVP widget inside the phone mockup — mirrors the Figma
// "RSVP / Buttons" component states (Default, Confirmed).
export default function RsvpDemo() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className={styles.rsvp}>
      <button
        type="button"
        className={styles.rsvpConfirm}
        data-confirmed={confirmed}
        onClick={() => setConfirmed(true)}
      >
        {confirmed ? "✓ დადასტურებულია" : "დავესწრები"}
      </button>
      <button
        type="button"
        className={styles.rsvpSecondary}
        data-confirmed={confirmed}
        disabled={confirmed}
        onClick={() => setConfirmed(false)}
      >
        ვერ დავესწრები
      </button>
    </div>
  );
}
