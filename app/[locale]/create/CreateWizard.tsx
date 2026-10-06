"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import Toggle from "@/components/Toggle";
import {
  CREATION_TEMPLATES,
  EVENT_TYPES,
  INITIAL_WIZARD_DATA,
  type WizardData,
} from "@/lib/creationFlow";
import styles from "./page.module.css";

const TOTAL_STEPS = 5;

const INTL_LOCALES: Record<string, string> = {
  ka: "ka-GE",
  en: "en-US",
  ru: "ru-RU",
};

function Icon({ src, alt = "", ...rest }: { src: string; alt?: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} {...rest} />;
}

function useFormatDate() {
  const locale = useLocale();
  return (value: string) => {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
}

export default function CreateWizard() {
  const t = useTranslations("create");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_WIZARD_DATA);
  const [published, setPublished] = useState(false);

  const template = useMemo(
    () => CREATION_TEMPLATES.find((entry) => entry.template.slug === data.templateSlug) ?? CREATION_TEMPLATES[0],
    [data.templateSlug],
  );

  function patch(fields: Partial<WizardData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function patchSettings(key: keyof WizardData["settings"], value: boolean) {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, [key]: value } }));
  }

  function goTo(next: number) {
    setStep(Math.min(Math.max(next, 1), TOTAL_STEPS));
    window.scrollTo({ top: 0 });
  }

  function handlePublish() {
    setPublished(true);
    window.setTimeout(() => router.push("/dashboard/host"), 900);
  }

  const canGoNext = step !== 3 || data.name.trim().length > 0;
  const stepLabels = t.raw("stepLabels") as string[];

  return (
    <div className={styles.wizard}>
      <WizardHeader step={step} onJump={(n) => n < step && goTo(n)} stepLabels={stepLabels} />

      <div className={styles.body}>
        {step === 1 && <StepEventType data={data} patch={patch} />}
        {step === 2 && <StepTemplate data={data} patch={patch} />}
        {step === 3 && <StepDetails data={data} patch={patch} template={template} />}
        {step === 4 && <StepRsvp data={data} patchSettings={patchSettings} />}
        {step === 5 && (
          <StepPreview data={data} template={template} onEditStep={goTo} published={published} />
        )}
      </div>

      <footer className={styles.footer}>
        {step > 1 ? (
          <button type="button" className={styles.backBtn} onClick={() => goTo(step - 1)}>
            {t("back")}
          </button>
        ) : (
          <span className={styles.backSpacer} aria-hidden="true" />
        )}
        {step < TOTAL_STEPS ? (
          <div className={styles.footerRight}>
            <span className={styles.draftHint}>{t("draftHint")}</span>
            <button
              type="button"
              className={`btn btn-primary ${styles.continueBtn}`}
              disabled={!canGoNext}
              onClick={() => goTo(step + 1)}
            >
              {t("continueCta")}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={`btn btn-primary ${styles.continueBtn} ${styles.publishBtn}`}
            onClick={handlePublish}
            disabled={published}
            data-loading={published}
          >
            {published && <span className="btn-spinner" aria-hidden="true" />}
            {published ? t("publishingCta") : t("publishCta")}
          </button>
        )}
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */
function WizardHeader({
  step,
  onJump,
  stepLabels,
}: {
  step: number;
  onJump: (n: number) => void;
  stepLabels: string[];
}) {
  const t = useTranslations("create");
  const percent = (step / TOTAL_STEPS) * 100;
  return (
    <header className={styles.header}>
      <div className={styles.headerDesktop}>
        <Link href="/" className={styles.logoGroup}>
          <span className={styles.logoWord}>Lyst.</span>
          <span className={styles.modeBadge}>{t("modeBadge")}</span>
        </Link>
        <nav className={styles.stepNav} aria-label={t("stepNavAriaLabel")}>
          {stepLabels.map((label, i) => {
            const n = i + 1;
            const state = n < step ? "done" : n === step ? "current" : "upcoming";
            return (
              <span key={label} className={styles.stepNavItem}>
                <button
                  type="button"
                  className={styles.stepChip}
                  data-state={state}
                  onClick={() => onJump(n)}
                  disabled={state === "upcoming"}
                >
                  {state === "done" ? (
                    <Icon src="/images/create/step-check.svg" width={20} height={20} />
                  ) : (
                    <span className={styles.stepChipBadge} data-state={state}>
                      {n}
                    </span>
                  )}
                  <span className={styles.stepChipLabel} data-state={state}>
                    {label}
                  </span>
                </button>
                {n < TOTAL_STEPS && <span className={styles.stepSlash}>/</span>}
              </span>
            );
          })}
        </nav>
        <Link href="/dashboard/host" className={styles.exitLink}>
          {t("exitLink")}
        </Link>
      </div>

      <div className={styles.headerMobile}>
        <div className={styles.mobileHeadLeft}>
          {step > 1 ? (
            <button type="button" className={styles.mobileIconBtn} onClick={() => onJump(step - 1)} aria-label={t("mobileBack")}>
              <Icon src="/images/create/m-chevron-back.svg" width={20} height={20} />
            </button>
          ) : (
            <Link href="/" className={styles.mobileIconBtn} aria-label={t("mobileClose")}>
              <Icon src="/images/create/m-close.svg" width={20} height={20} />
            </Link>
          )}
          <span className={styles.mobileTitle}>{t("mobileTitle")}</span>
        </div>
        <span className={styles.mobileBrand}>LYST.GE</span>
      </div>
      <div className={styles.progressWrap}>
        <div className={styles.progressMeta}>
          <span>
            {String(step).padStart(2, "0")} / 0{TOTAL_STEPS}
          </span>
          <strong>{Math.round(percent)}%</strong>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — event type                                                */
/* ------------------------------------------------------------------ */
function StepEventType({
  data,
  patch,
}: {
  data: WizardData;
  patch: (fields: Partial<WizardData>) => void;
}) {
  const t = useTranslations("create");
  return (
    <div className={styles.content}>
      <div className={styles.contentHead}>
        <p className={styles.stepEyebrow}>01 / 05</p>
        <h1 className={styles.stepTitle}>{t("step1Title")}</h1>
      </div>
      <div className={styles.typeGrid}>
        {EVENT_TYPES.map((type) => {
          const selected = data.eventType === type.key;
          // black-stroke icons invert when selected (white-on-black badge);
          // the one white-stroke icon (wedding) inverts the other way.
          const invert = type.whiteIcon ? !selected : selected;
          return (
            <button
              key={type.key}
              type="button"
              className={styles.typeCard}
              data-selected={selected}
              onClick={() => patch({ eventType: type.key })}
            >
              <span className={styles.typeIcon} data-selected={selected}>
                <Icon
                  src={`/images/create/icon-${type.icon}.svg`}
                  width={20}
                  height={20}
                  data-invert={invert}
                  data-white-icon={type.whiteIcon}
                />
              </span>
              <span className={styles.typeLabel}>{t(`eventTypes.${type.key}`)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — template                                                  */
/* ------------------------------------------------------------------ */
function StepTemplate({
  data,
  patch,
}: {
  data: WizardData;
  patch: (fields: Partial<WizardData>) => void;
}) {
  const t = useTranslations("create");
  return (
    <div className={styles.content}>
      <div className={styles.contentHead}>
        <p className={styles.stepEyebrow}>02 / 05</p>
        <h1 className={styles.stepTitle}>{t("step2Title")}</h1>
      </div>

      <div className={styles.formatToggle} role="group" aria-label={t("formatAriaLabel")}>
        {(["digital", "interactive"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={styles.formatBtn}
            aria-pressed={data.format === f}
            onClick={() => patch({ format: f })}
          >
            {f === "digital" ? t("formatDigital") : t("formatInteractive")}
          </button>
        ))}
      </div>

      <div className={styles.templateGrid}>
        {CREATION_TEMPLATES.map(({ tag, template }) => (
          <button
            key={template.slug}
            type="button"
            className={styles.templateCard}
            data-selected={data.templateSlug === template.slug}
            onClick={() => patch({ templateSlug: template.slug })}
          >
            <span className={styles.templateImage}>
              <Image src={template.image} alt="" sizes="(max-width: 640px) 50vw, 25vw" />
            </span>
            <span className={styles.templateBody}>
              <span className={styles.templateTag}>{tag}</span>
              <span className={styles.templateTitle}>{t(`templates.${template.slug}`)}</span>
            </span>
          </button>
        ))}
      </div>

      <p className={`${styles.formatHint} m-only`}>
        <Icon src="/images/create/m-info.svg" width={16} height={16} />
        {t("templateHint")}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — details                                                   */
/* ------------------------------------------------------------------ */
function StepDetails({
  data,
  patch,
  template,
}: {
  data: WizardData;
  patch: (fields: Partial<WizardData>) => void;
  template: (typeof CREATION_TEMPLATES)[number];
}) {
  const t = useTranslations("create");
  const formatDate = useFormatDate();
  return (
    <div className={`${styles.content} ${styles.detailsContent}`}>
      <div className={styles.detailsMain}>
        <div className={styles.contentHead}>
          <p className={styles.stepEyebrow}>03 / 05</p>
          <h1 className={styles.stepTitle}>{t("step3Title")}</h1>
        </div>

        <a href="#preview" className={`${styles.previewLink} m-only`}>
          {t("previewLinkMobile")}
          <Icon src="/images/create/m-chevron-right.svg" width={16} height={16} />
        </a>

        <div className={styles.fieldsGrid}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{t("nameLabel")}</span>
            <input
              className={styles.input}
              value={data.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder={t("namePlaceholder")}
            />
          </label>
          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{t("dateLabel")}</span>
              <input
                type="date"
                className={styles.input}
                value={data.date}
                onChange={(e) => patch({ date: e.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{t("timeLabel")}</span>
              <input
                type="time"
                className={styles.input}
                value={data.time}
                onChange={(e) => patch({ time: e.target.value })}
              />
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{t("locationLabel")}</span>
            <input
              className={styles.input}
              value={data.location}
              onChange={(e) => patch({ location: e.target.value })}
              placeholder={t("locationPlaceholder")}
            />
          </label>
          <label className={`${styles.field} ${styles.fieldDesktopOnly}`}>
            <span className={styles.fieldLabel}>{t("descriptionLabelDesktop")}</span>
            <textarea
              className={styles.textarea}
              rows={3}
              value={data.description}
              onChange={(e) => patch({ description: e.target.value })}
              placeholder={t("descriptionPlaceholderDesktop")}
            />
          </label>
          <label className={`${styles.field} ${styles.fieldMobileOnly}`}>
            <span className={styles.fieldLabel}>{t("descriptionLabelMobile")}</span>
            <input
              className={styles.input}
              value={data.description}
              onChange={(e) => patch({ description: e.target.value })}
              placeholder={t("descriptionPlaceholderMobile")}
            />
          </label>
          <label className={`${styles.field} ${styles.fieldDesktopOnly}`}>
            <span className={styles.fieldLabel}>{t("dressCodeLabel")}</span>
            <input
              className={styles.input}
              value={data.dressCode}
              onChange={(e) => patch({ dressCode: e.target.value })}
              placeholder={t("dressCodePlaceholder")}
            />
          </label>
        </div>
      </div>

      <aside id="preview" className={styles.livePreview}>
        <div className={styles.previewHead}>
          <p className={styles.previewKicker}>{t("previewKicker")}</p>
          <p className={styles.previewBig}>{t("previewBig")}</p>
          <p className={styles.previewSub}>{t("previewSub")}</p>
        </div>
        <div className={styles.previewMeta}>
          <p className={styles.previewMetaLabel}>{t("previewEventLabel")}</p>
          <p className={styles.previewMetaValue}>{data.name || "—"}</p>
        </div>
        <div className={styles.previewMeta}>
          <p className={styles.previewMetaLabel}>{t("previewDetailsLabel")}</p>
          <p className={styles.previewMetaValue}>
            {[formatDate(data.date), data.time, data.location].filter(Boolean).join(" • ") || "—"}
          </p>
        </div>
        {data.description && (
          <div className={styles.previewNote}>
            <p className={styles.previewMetaLabel}>{t("previewNoteLabel")}</p>
            <p className={styles.previewNoteText}>{data.description}</p>
          </div>
        )}
        <p className={styles.previewTemplateNote}>
          {t("previewTemplateNote", { title: t(`templates.${template.template.slug}`) })}
        </p>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4 — RSVP & guests                                             */
/* ------------------------------------------------------------------ */
const SETTINGS_KEYS = ["rsvp", "guestQuestions", "gallery", "guestInfoFields"] as const;

function StepRsvp({
  data,
  patchSettings,
}: {
  data: WizardData;
  patchSettings: (key: keyof WizardData["settings"], value: boolean) => void;
}) {
  const t = useTranslations("create");
  return (
    <div className={styles.content}>
      <div className={styles.contentHead}>
        <p className={styles.stepEyebrow}>04 / 05</p>
        <h1 className={styles.stepTitle}>{t("step4Title")}</h1>
      </div>

      <div className={styles.settingsList}>
        {SETTINGS_KEYS.map((key) => {
          const title = t(`settings.${key}.title`);
          return (
            <div key={key} className={styles.settingItem} data-on={data.settings[key]}>
              <div className={styles.settingText}>
                <p className={styles.settingTitle}>{title}</p>
                <p className={styles.settingDesc}>{t(`settings.${key}.text`)}</p>
              </div>
              <Toggle checked={data.settings[key]} onChange={(v) => patchSettings(key, v)} label={title} />
            </div>
          );
        })}
      </div>

      <div className={styles.consultBlock}>
        <p className={styles.consultTitle}>{t("consultTitle")}</p>
        <p className={styles.consultText}>{t("consultText")}</p>
        <Link href="/booking" className={styles.consultLink}>
          {t("consultLink")}
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 5 — preview & publish                                         */
/* ------------------------------------------------------------------ */
function StepPreview({
  data,
  template,
  onEditStep,
  published,
}: {
  data: WizardData;
  template: (typeof CREATION_TEMPLATES)[number];
  onEditStep: (n: number) => void;
  published: boolean;
}) {
  const t = useTranslations("create");
  const formatDate = useFormatDate();

  const featureChips = [
    data.settings.rsvp && "RSVP",
    data.settings.guestQuestions && t("featureChipGuestQuestions"),
    data.settings.gallery && t("featureChipGallery"),
    data.settings.guestInfoFields && t("featureChipGuestInfo"),
  ].filter(Boolean) as string[];

  return (
    <div className={styles.content}>
      <div className={styles.contentHead}>
        <p className={styles.stepEyebrow}>05 / 05</p>
        <h1 className={styles.stepTitle}>{t("step5Title")}</h1>
      </div>

      {published && (
        <p className={styles.publishedNote} role="status">
          {t("publishedNote")}
        </p>
      )}

      <div className={styles.previewRow}>
        <div className={styles.phoneShell}>
          <div className={styles.phoneScreen}>
            <div className={styles.phoneStatus} aria-hidden="true">
              <span>9:41</span>
              <span className={styles.phoneStatusIcons}>
                <Icon src="/images/create/status-signal.svg" width={14} height={10} />
                <Icon src="/images/create/status-wifi.svg" width={14} height={10} />
                <Icon src="/images/create/status-battery.svg" width={18} height={10} />
              </span>
            </div>
            <div className={styles.phoneImage}>
              <Image src={template.template.screen} alt="" sizes="300px" />
            </div>
            <div className={styles.phoneBody}>
              <p className={styles.phoneTitle}>{data.name || t("phoneDefaultName")}</p>
              <p className={styles.phoneHost}>
                {[formatDate(data.date), data.time].filter(Boolean).join(" · ") || t("phoneNoDate")}
              </p>
              <hr className={styles.phoneRule} />
              <div className={styles.phoneMeta}>
                <div className={styles.phoneMetaRow}>
                  <Icon src="/images/create/icon-calendar-14.svg" width={14} height={14} />
                  <span>{[formatDate(data.date), data.time].filter(Boolean).join(" · ") || "—"}</span>
                </div>
                <div className={styles.phoneMetaRow}>
                  <Icon src="/images/create/icon-pin-14.svg" width={14} height={14} />
                  <span>{data.location || t("phoneNoLocation")}</span>
                </div>
              </div>
            </div>
            {data.settings.rsvp && (
              <div className={styles.phoneRsvp}>
                <span>{t("rsvpChipLabel")}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryBlock}>
            <h2 className={styles.summaryTitle}>{t("summaryTitle")}</h2>
            <div className={styles.summaryRule} />
            <dl className={styles.summaryGrid}>
              <dt>{t("summaryEventLabel")}</dt>
              <dd>{data.name || "—"}</dd>
              <dt>{t("summaryDateLabel")}</dt>
              <dd>{[formatDate(data.date), data.time].filter(Boolean).join(` ${t("dateTimeJoin")} `) || "—"}</dd>
              <dt>{t("summaryLocationLabel")}</dt>
              <dd>{data.location || "—"}</dd>
              <dt>{t("summaryTemplateLabel")}</dt>
              <dd>{t(`templates.${template.template.slug}`)}</dd>
            </dl>
          </div>

          <div className={styles.summaryBlock}>
            <h2 className={styles.summaryTitle}>{t("summaryFeaturesTitle")}</h2>
            <div className={styles.chipRow}>
              {featureChips.length > 0 ? (
                featureChips.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    {chip}
                  </span>
                ))
              ) : (
                <span className={styles.chip}>{t("noFeaturesChip")}</span>
              )}
            </div>
          </div>

          <div className={`${styles.editRow} m-only`}>
            <button type="button" className={styles.editItem} onClick={() => onEditStep(2)}>
              <span>{t("editDesignCta")}</span>
              <Icon src="/images/create/m-edit3.svg" width={16} height={16} />
            </button>
            <button type="button" className={styles.editItem} onClick={() => onEditStep(3)}>
              <span>{t("editDetailsCta")}</span>
              <Icon src="/images/create/m-calendar.svg" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
