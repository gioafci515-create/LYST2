"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import styles from "./page.module.css";

type Step = "contact" | "event" | "time" | "confirmed" | "reschedule" | "cancelled";

const EXPERIENCES = ["Voice Guestbook", "Event Camera", "Hidden Moments"] as const;

type FormData = {
  name: string;
  contactMethod: "email" | "phone";
  contact: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests: string;
  experiences: string[];
  slotIndex: number;
};

const INITIAL: FormData = {
  name: "",
  contactMethod: "email",
  contact: "",
  eventType: "",
  eventDate: "",
  location: "",
  guests: "",
  experiences: [],
  slotIndex: 0,
};

function Icon({ src, ...rest }: { src: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" {...rest} />;
}

function Header({
  step,
  index,
  total,
  label,
  statusLabel,
}: {
  step: Step;
  index: number;
  total: number;
  label: string;
  statusLabel: string;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.brandWord}>LYST</span>
        <span className={styles.brandDot} aria-hidden="true" />
        <span className={styles.brandTag}>Consultation Booking</span>
      </div>
      <div className={styles.progress}>
        <span className={styles.progressStep}>
          {step === "cancelled" ? statusLabel : `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        </span>
        <span className={styles.progressLabel}>{label}</span>
      </div>
    </header>
  );
}

function Footer({ rights, privacy, terms }: { rights: string; privacy: string; terms: string }) {
  return (
    <footer className={styles.footer}>
      <p>{rights}</p>
      <div className={styles.footerLinks}>
        <a>{privacy}</a>
        <a>{terms}</a>
      </div>
    </footer>
  );
}

export default function BookingWizard() {
  const t = useTranslations("booking");
  const slots = t.raw("slots") as string[];
  const [step, setStep] = useState<Step>("contact");
  const [data, setData] = useState<FormData>(INITIAL);

  function patch(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function toggleExperience(name: string) {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.includes(name)
        ? prev.experiences.filter((e) => e !== name)
        : [...prev.experiences, name],
    }));
  }

  const slot = slots[data.slotIndex];

  const headerLabel =
    step === "contact"
      ? t("stepLabelContact")
      : step === "event"
        ? t("stepLabelEvent")
        : step === "time"
          ? t("stepLabelTime")
          : step === "confirmed"
            ? t("stepLabelConfirmed")
            : step === "reschedule"
              ? t("stepLabelReschedule")
              : t("stepLabelCancelled");

  const headerIndex = step === "contact" ? 1 : step === "event" ? 2 : step === "time" ? 3 : step === "reschedule" ? 5 : 6;
  const headerTotal = step === "contact" || step === "event" || step === "time" ? 3 : 6;

  return (
    <div className={styles.wizard} data-subtle={step === "confirmed" || step === "cancelled"}>
      <Header step={step} index={headerIndex} total={headerTotal} label={headerLabel} statusLabel={t("progressStatusLabel")} />

      <main className={styles.body}>
        {step === "contact" && (
          <div className={styles.contentRow}>
            <div className={styles.editorial}>
              <h1 className={styles.editorialTitle}>{t("contactTitle")}</h1>
              <p className={styles.editorialText}>{t("contactText")}</p>
              <span className={styles.decorativeLine} aria-hidden="true" />
            </div>
            <form
              className={styles.formPanel}
              onSubmit={(e) => {
                e.preventDefault();
                setStep("event");
              }}
            >
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t("fullNameLabel")}</span>
                <input
                  className={styles.input}
                  required
                  value={data.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  placeholder={t("fullNamePlaceholder")}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t("contactMethodLabel")}</span>
                <select
                  className={styles.input}
                  value={data.contactMethod}
                  onChange={(e) => patch({ contactMethod: e.target.value as FormData["contactMethod"] })}
                >
                  <option value="email">{t("contactMethodEmail")}</option>
                  <option value="phone">{t("contactMethodPhone")}</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t("contactValueLabel")}</span>
                <input
                  className={styles.input}
                  required
                  value={data.contact}
                  onChange={(e) => patch({ contact: e.target.value })}
                  placeholder={t("contactValuePlaceholder")}
                />
              </label>
              <div className={styles.actions}>
                <Link href="/" className={styles.backBtn}>
                  {t("backCta")}
                </Link>
                <button type="submit" className={styles.nextBtn}>
                  {t("contactNextCta")}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "event" && (
          <div className={styles.contentRow}>
            <div className={styles.editorial}>
              <h1 className={styles.editorialTitle}>{t("eventTitle")}</h1>
              <p className={styles.editorialText}>{t("eventText")}</p>
              <div className={styles.noticeCard}>
                <p className={styles.noticeTitle}>{t("noticeTitleExperiences")}</p>
                <p className={styles.noticeText}>{t("noticeTextExperiences")}</p>
              </div>
            </div>
            <form
              className={styles.formPanel}
              onSubmit={(e) => {
                e.preventDefault();
                setStep("time");
              }}
            >
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t("eventTypeLabel")}</span>
                <input
                  className={styles.input}
                  required
                  value={data.eventType}
                  onChange={(e) => patch({ eventType: e.target.value })}
                  placeholder={t("eventTypePlaceholder")}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t("eventDateLabel")}</span>
                <input
                  type="date"
                  className={styles.input}
                  value={data.eventDate}
                  onChange={(e) => patch({ eventDate: e.target.value })}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t("locationLabel")}</span>
                <input
                  className={styles.input}
                  required
                  value={data.location}
                  onChange={(e) => patch({ location: e.target.value })}
                  placeholder={t("locationPlaceholder")}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t("guestsLabel")}</span>
                <input
                  className={styles.input}
                  value={data.guests}
                  onChange={(e) => patch({ guests: e.target.value })}
                  placeholder={t("guestsPlaceholder")}
                />
              </label>
              <div className={styles.checkGroup}>
                <span className={styles.fieldLabel}>{t("experiencesLabel")}</span>
                <div className={styles.checkStack}>
                  {EXPERIENCES.map((name) => (
                    <label key={name} className={styles.checkRow}>
                      <span className={styles.checkbox} data-checked={data.experiences.includes(name)}>
                        {data.experiences.includes(name) && (
                          <Icon src="/images/booking/check-14.svg" width={14} height={14} />
                        )}
                      </span>
                      <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={data.experiences.includes(name)}
                        onChange={() => toggleExperience(name)}
                      />
                      {name}
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.actions}>
                <button type="button" className={styles.backBtn} onClick={() => setStep("contact")}>
                  {t("backCta")}
                </button>
                <button type="submit" className={styles.nextBtnPrimary}>
                  {t("eventNextCta")}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "time" && (
          <div className={styles.contentRow}>
            <div className={styles.editorial}>
              <h1 className={styles.editorialTitleLg}>{t("timeTitle")}</h1>
            </div>
            <form
              className={styles.formPanel}
              onSubmit={(e) => {
                e.preventDefault();
                setStep("confirmed");
              }}
            >
              <div className={styles.timeLabel}>
                <p className={styles.timeLabelTitle}>{t("chooseTimeTitle")}</p>
                <p className={styles.timeLabelSub}>{t("timezoneLabel")}</p>
              </div>
              <div className={styles.slotList}>
                {slots.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    className={styles.slotOption}
                    data-selected={data.slotIndex === i}
                    onClick={() => patch({ slotIndex: i })}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className={styles.stackActions}>
                <button type="submit" className={styles.nextBtnPrimary}>
                  {t("sendRequestCta")}
                </button>
                <button type="button" className={styles.backBtn} onClick={() => setStep("event")}>
                  {t("editInfoCta")}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "confirmed" && (
          <div className={styles.contentRowCenter}>
            <div className={styles.editorial}>
              <div className={styles.statusRow}>
                <span className={styles.statusDotGreen} aria-hidden="true" />
                <span className={styles.statusLabel}>{t("requestReceivedLabel")}</span>
              </div>
              <h1 className={styles.editorialTitleXl}>{t("confirmedTitle")}</h1>
              <p className={styles.editorialText}>{t("confirmedText")}</p>
              <div className={styles.summaryCard}>
                <p className={styles.summaryKicker}>{t("summaryKicker")}</p>
                <div className={styles.summaryList}>
                  <div className={styles.summaryRow}>
                    <Icon src="/images/booking/check-16.svg" width={16} height={16} />
                    <span>{t("summaryName", { name: data.name || "—" })}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <Icon src="/images/booking/check-16.svg" width={16} height={16} />
                    <span>{t("summaryContact", { contact: data.contact || "—" })}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <Icon src="/images/booking/check-16.svg" width={16} height={16} />
                    <span>
                      {data.guests
                        ? t("summaryEventWithGuests", {
                            eventType: data.eventType || "—",
                            location: data.location || "—",
                            guests: data.guests,
                          })
                        : t("summaryEvent", { eventType: data.eventType || "—", location: data.location || "—" })}
                    </span>
                  </div>
                </div>
              </div>
              <p className={styles.footnote}>{t("footnote")}</p>
            </div>

            <div className={styles.formPanel}>
              <div className={styles.selectedTimeCard}>
                <p className={styles.noticeTitleSm}>{t("selectedTimeLabel")}</p>
                <p className={styles.selectedTimeValue}>{slot}</p>
                <p className={styles.timeLabelSub}>{t("timezoneLabel")}</p>
              </div>
              <div className={styles.stackActions}>
                <button type="button" className={styles.calendarBtn}>
                  <Icon src="/images/booking/calendar.svg" width={16} height={16} />
                  {t("calendarCta")}
                </button>
                <div className={styles.pairActions}>
                  <button type="button" className={styles.backBtn} onClick={() => setStep("reschedule")}>
                    {t("stepLabelReschedule")}
                  </button>
                  <button type="button" className={styles.cancelBtn} onClick={() => setStep("cancelled")}>
                    {t("cancelCta")}
                  </button>
                </div>
              </div>
              <div className={styles.navActions}>
                <Link href="/" className={styles.nextBtnPrimary}>
                  {t("backHomeCta")}
                </Link>
                <Link href="/dashboard/client" className={styles.textLink}>
                  {t("backDashboardCta")}
                </Link>
              </div>
            </div>
          </div>
        )}

        {step === "reschedule" && (
          <div className={styles.contentRow}>
            <div className={styles.editorial}>
              <h1 className={styles.editorialTitle}>{t("rescheduleTitle")}</h1>
              <p className={styles.editorialText}>{t("rescheduleText")}</p>
              <div className={styles.noticeCard}>
                <p className={styles.noticeTitle}>{t("activeBookingLabel")}</p>
                <p className={styles.noticeText}>{t("activeBookingValue", { slot })}</p>
              </div>
            </div>
            <form
              className={styles.formPanel}
              onSubmit={(e) => {
                e.preventDefault();
                setStep("confirmed");
              }}
            >
              <div className={styles.timeLabel}>
                <p className={styles.timeLabelTitle}>{t("chooseNewTimeTitle")}</p>
              </div>
              <div className={styles.slotList}>
                {slots.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    className={styles.slotOption}
                    data-selected={data.slotIndex === i}
                    onClick={() => patch({ slotIndex: i })}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className={styles.stackActions}>
                <button type="submit" className={styles.nextBtnPrimary}>
                  {t("rescheduleRequestCta")}
                </button>
                <button type="button" className={styles.backBtn} onClick={() => setStep("confirmed")}>
                  {t("cancelCta")}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "cancelled" && (
          <div className={styles.contentRowCenter} data-single>
            <div className={styles.cancelCard}>
              <span className={styles.cancelIcon} aria-hidden="true">
                ✕
              </span>
              <h1 className={styles.editorialTitleXl}>{t("cancelledTitle")}</h1>
              <p className={styles.editorialText}>{t("cancelledText")}</p>
              <div className={styles.noticeCard}>
                <p className={styles.noticeTitle}>{t("cancelledDetailsTitle")}</p>
                <p className={styles.noticeText}>{t("cancelledDetailsValue", { slot })}</p>
              </div>
              <div className={styles.cancelActions}>
                <button
                  type="button"
                  className={styles.nextBtnPrimary}
                  onClick={() => {
                    setData(INITIAL);
                    setStep("contact");
                  }}
                >
                  {t("rebookCta")}
                </button>
                <div className={styles.pairActions}>
                  <Link href="/" className={styles.backBtn}>
                    {t("cancelledBackHome")}
                  </Link>
                  <Link href="/dashboard/client" className={styles.backBtn}>
                    {t("cancelledBackDashboard")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer rights={t("footerRights")} privacy={t("footerPrivacy")} terms={t("footerTerms")} />
    </div>
  );
}
