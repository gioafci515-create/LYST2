"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Toggle from "../../components/Toggle";
import {
  CREATION_TEMPLATES,
  EVENT_TYPES,
  INITIAL_WIZARD_DATA,
  STEP_LABELS,
  type WizardData,
} from "../../lib/creationFlow";
import styles from "./page.module.css";

const TOTAL_STEPS = 5;

function Icon({ src, alt = "", ...rest }: { src: string; alt?: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} {...rest} />;
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ka-GE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function CreateWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_WIZARD_DATA);
  const [published, setPublished] = useState(false);

  const template = useMemo(
    () => CREATION_TEMPLATES.find((t) => t.template.slug === data.templateSlug) ?? CREATION_TEMPLATES[0],
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

  return (
    <div className={styles.wizard}>
      <WizardHeader step={step} onJump={(n) => n < step && goTo(n)} />

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
            უკან
          </button>
        ) : (
          <span className={styles.backSpacer} aria-hidden="true" />
        )}
        {step < TOTAL_STEPS ? (
          <div className={styles.footerRight}>
            <span className={styles.draftHint}>დრაფტად შენახვა</span>
            <button
              type="button"
              className={`btn btn-primary ${styles.continueBtn}`}
              disabled={!canGoNext}
              onClick={() => goTo(step + 1)}
            >
              გაგრძელება
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={`btn btn-primary ${styles.continueBtn} ${styles.publishBtn}`}
            onClick={handlePublish}
            disabled={published}
          >
            {published ? "იქვეყნება…" : "მოსაწვევის გამოქვეყნება"}
          </button>
        )}
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */
function WizardHeader({ step, onJump }: { step: number; onJump: (n: number) => void }) {
  const percent = (step / TOTAL_STEPS) * 100;
  return (
    <header className={styles.header}>
      <div className={styles.headerDesktop}>
        <Link href="/" className={styles.logoGroup}>
          <span className={styles.logoWord}>Lyst.</span>
          <span className={styles.modeBadge}>შექმნა</span>
        </Link>
        <nav className={styles.stepNav} aria-label="შექმნის ეტაპები">
          {STEP_LABELS.map((label, i) => {
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
          შენახვა და გასვლა
        </Link>
      </div>

      <div className={styles.headerMobile}>
        <div className={styles.mobileHeadLeft}>
          {step > 1 ? (
            <button type="button" className={styles.mobileIconBtn} onClick={() => onJump(step - 1)} aria-label="უკან">
              <Icon src="/images/create/m-chevron-back.svg" width={20} height={20} />
            </button>
          ) : (
            <Link href="/" className={styles.mobileIconBtn} aria-label="დახურვა">
              <Icon src="/images/create/m-close.svg" width={20} height={20} />
            </Link>
          )}
          <span className={styles.mobileTitle}>ახალი მოსაწვევი</span>
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
  return (
    <div className={styles.content}>
      <div className={styles.contentHead}>
        <p className={styles.stepEyebrow}>01 / 05</p>
        <h1 className={styles.stepTitle}>აირჩიე ღონისძიების ტიპი</h1>
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
              <span className={styles.typeLabel}>{type.label}</span>
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
  return (
    <div className={styles.content}>
      <div className={styles.contentHead}>
        <p className={styles.stepEyebrow}>02 / 05</p>
        <h1 className={styles.stepTitle}>აირჩიე მოსაწვევის სტილი</h1>
      </div>

      <div className={styles.formatToggle} role="group" aria-label="ფორმატი">
        {(["digital", "interactive"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={styles.formatBtn}
            aria-pressed={data.format === f}
            onClick={() => patch({ format: f })}
          >
            {f === "digital" ? "ციფრული მოსაწვევი" : "ინტერაქტიული"}
          </button>
        ))}
      </div>

      <div className={styles.templateGrid}>
        {CREATION_TEMPLATES.map(({ tag, title, template }) => (
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
              <span className={styles.templateTitle}>{title}</span>
            </span>
          </button>
        ))}
      </div>

      <p className={`${styles.formatHint} m-only`}>
        <Icon src="/images/create/m-info.svg" width={16} height={16} />
        ყველა შაბლონი სრულად რედაქტირებადია.
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
  return (
    <div className={`${styles.content} ${styles.detailsContent}`}>
      <div className={styles.detailsMain}>
        <div className={styles.contentHead}>
          <p className={styles.stepEyebrow}>03 / 05</p>
          <h1 className={styles.stepTitle}>ღონისძიების დეტალები</h1>
        </div>

        <a href="#preview" className={`${styles.previewLink} m-only`}>
          Preview invitation
          <Icon src="/images/create/m-chevron-right.svg" width={16} height={16} />
        </a>

        <div className={styles.fieldsGrid}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>ღონისძიების სახელი</span>
            <input
              className={styles.input}
              value={data.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="მაგ. ლუკა და თამარის ქორწილი"
            />
          </label>
          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>თარიღი</span>
              <input
                type="date"
                className={styles.input}
                value={data.date}
                onChange={(e) => patch({ date: e.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>დრო</span>
              <input
                type="time"
                className={styles.input}
                value={data.time}
                onChange={(e) => patch({ time: e.target.value })}
              />
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>ლოკაცია</span>
            <input
              className={styles.input}
              value={data.location}
              onChange={(e) => patch({ location: e.target.value })}
              placeholder="მაგ. შატო მუხრანი"
            />
          </label>
          <label className={`${styles.field} ${styles.fieldDesktopOnly}`}>
            <span className={styles.fieldLabel}>აღწერა / სურვილები</span>
            <textarea
              className={styles.textarea}
              rows={3}
              value={data.description}
              onChange={(e) => patch({ description: e.target.value })}
              placeholder="გთხოვთ შემოგვიერთდეთ..."
            />
          </label>
          <label className={`${styles.field} ${styles.fieldMobileOnly}`}>
            <span className={styles.fieldLabel}>აღწერა</span>
            <input
              className={styles.input}
              value={data.description}
              onChange={(e) => patch({ description: e.target.value })}
              placeholder="მოკლე ინფორმაცია სტუმრებისთვის..."
            />
          </label>
          <label className={`${styles.field} ${styles.fieldDesktopOnly}`}>
            <span className={styles.fieldLabel}>ჩაცმის სტილი (Dress Code)</span>
            <input
              className={styles.input}
              value={data.dressCode}
              onChange={(e) => patch({ dressCode: e.target.value })}
              placeholder="მაგ. კაჟუალ სტილი"
            />
          </label>
        </div>
      </div>

      <aside id="preview" className={styles.livePreview}>
        <div className={styles.previewHead}>
          <p className={styles.previewKicker}>LIVE PREVIEW</p>
          <p className={styles.previewBig}>მოსაწვევი</p>
          <p className={styles.previewSub}>რას ნახავს სტუმარი</p>
        </div>
        <div className={styles.previewMeta}>
          <p className={styles.previewMetaLabel}>ღონისძიება</p>
          <p className={styles.previewMetaValue}>{data.name || "—"}</p>
        </div>
        <div className={styles.previewMeta}>
          <p className={styles.previewMetaLabel}>დეტალები</p>
          <p className={styles.previewMetaValue}>
            {[formatDate(data.date), data.time, data.location].filter(Boolean).join(" • ") || "—"}
          </p>
        </div>
        {data.description && (
          <div className={styles.previewNote}>
            <p className={styles.previewMetaLabel}>შენიშვნა</p>
            <p className={styles.previewNoteText}>{data.description}</p>
          </div>
        )}
        <p className={styles.previewTemplateNote}>შაბლონი: {template.title}</p>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4 — RSVP & guests                                             */
/* ------------------------------------------------------------------ */
const SETTINGS_COPY = [
  { key: "rsvp" as const, title: "RSVP", text: "სტუმრებმა შეძლონ დადასტურონ დასწრება ან მიუთითონ ვერ დასწრების შესახებ" },
  {
    key: "guestQuestions" as const,
    title: "პლიუს-ვანი / სტუმრების კითხვები",
    text: "დაამატეთ სტუმარის სახელი, პლიუს-ვანის შესახებ კითხვა და სხვა საჭირო ველები",
  },
  {
    key: "gallery" as const,
    title: "საბაზისო გალერეა",
    text: "სტუმრებმა შეძლონ ფოტოების ნახვა და ჩამოტვირთვა ღონისძიების ბმულიდან",
  },
  {
    key: "guestInfoFields" as const,
    title: "სტუმრების ინფორმაციის ველები",
    text: "სტუმრის სახელი, ელფოსტა და სხვა საჭირო ინფორმაციის ველები.",
  },
];

function StepRsvp({
  data,
  patchSettings,
}: {
  data: WizardData;
  patchSettings: (key: keyof WizardData["settings"], value: boolean) => void;
}) {
  return (
    <div className={styles.content}>
      <div className={styles.contentHead}>
        <p className={styles.stepEyebrow}>04 / 05</p>
        <h1 className={styles.stepTitle}>RSVP და სტუმრების პარამეტრები</h1>
      </div>

      <div className={styles.settingsList}>
        {SETTINGS_COPY.map((item) => (
          <div key={item.key} className={styles.settingItem} data-on={data.settings[item.key]}>
            <div className={styles.settingText}>
              <p className={styles.settingTitle}>{item.title}</p>
              <p className={styles.settingDesc}>{item.text}</p>
            </div>
            <Toggle
              checked={data.settings[item.key]}
              onChange={(v) => patchSettings(item.key, v)}
              label={item.title}
            />
          </div>
        ))}
      </div>

      <div className={styles.consultBlock}>
        <p className={styles.consultTitle}>გსურთ ღონისძიების გამოცდილების გაფართოება?</p>
        <p className={styles.consultText}>
          ხმოვანი სტუმართა წიგნი, Event Camera, Hidden Moments და სხვა სპეციალური გამოცდილებები იქმნება
          LYST-ის გუნდთან კონსულტაციის შემდეგ.
        </p>
        <Link href="/booking" className={styles.consultLink}>
          გსურთ დამატებითი გამოცდილებები? დაჯავშნეთ კონსულტაცია →
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
  const featureChips = [
    data.settings.rsvp && "RSVP",
    data.settings.guestQuestions && "სტუმრების კითხვები",
    data.settings.gallery && "საბაზისო გალერეა",
    data.settings.guestInfoFields && "საკონტაქტო ველები",
  ].filter(Boolean) as string[];

  return (
    <div className={styles.content}>
      <div className={styles.contentHead}>
        <p className={styles.stepEyebrow}>05 / 05</p>
        <h1 className={styles.stepTitle}>გადახედე და გამოაქვეყნე</h1>
      </div>

      {published && (
        <p className={styles.publishedNote} role="status">
          გამოქვეყნდა! გადადიხართ დეშბორდზე…
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
              <p className={styles.phoneTitle}>{data.name || "თქვენი ღონისძიება"}</p>
              <p className={styles.phoneHost}>
                {[formatDate(data.date), data.time].filter(Boolean).join(" · ") || "თარიღი მითითებული არ არის"}
              </p>
              <hr className={styles.phoneRule} />
              <div className={styles.phoneMeta}>
                <div className={styles.phoneMetaRow}>
                  <Icon src="/images/create/icon-calendar-14.svg" width={14} height={14} />
                  <span>{[formatDate(data.date), data.time].filter(Boolean).join(" · ") || "—"}</span>
                </div>
                <div className={styles.phoneMetaRow}>
                  <Icon src="/images/create/icon-pin-14.svg" width={14} height={14} />
                  <span>{data.location || "ლოკაცია მითითებული არ არის"}</span>
                </div>
              </div>
            </div>
            {data.settings.rsvp && (
              <div className={styles.phoneRsvp}>
                <span>დავესწრები</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryBlock}>
            <h2 className={styles.summaryTitle}>ინფორმაციის შეჯამება</h2>
            <div className={styles.summaryRule} />
            <dl className={styles.summaryGrid}>
              <dt>ღონისძიება:</dt>
              <dd>{data.name || "—"}</dd>
              <dt>თარიღი და დრო:</dt>
              <dd>{[formatDate(data.date), data.time].filter(Boolean).join(" წლის ") || "—"}</dd>
              <dt>ლოკაცია:</dt>
              <dd>{data.location || "—"}</dd>
              <dt>შაბლონი:</dt>
              <dd>{template.title}</dd>
            </dl>
          </div>

          <div className={styles.summaryBlock}>
            <h2 className={styles.summaryTitle}>მოსაწვევის ფუნქციები</h2>
            <div className={styles.chipRow}>
              {featureChips.length > 0 ? (
                featureChips.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    {chip}
                  </span>
                ))
              ) : (
                <span className={styles.chip}>დამატებითი ფუნქციები გამორთულია</span>
              )}
            </div>
          </div>

          <div className={`${styles.editRow} m-only`}>
            <button type="button" className={styles.editItem} onClick={() => onEditStep(2)}>
              <span>დიზაინის შეცვლა</span>
              <Icon src="/images/create/m-edit3.svg" width={16} height={16} />
            </button>
            <button type="button" className={styles.editItem} onClick={() => onEditStep(3)}>
              <span>დეტალების რედაქტირება</span>
              <Icon src="/images/create/m-calendar.svg" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
