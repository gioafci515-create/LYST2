"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

type Step = "contact" | "event" | "time" | "confirmed" | "reschedule" | "cancelled";

const EXPERIENCES = ["Voice Guestbook", "Event Camera", "Hidden Moments"] as const;

const SLOTS = ["15 ოქტომბერი - 11:30", "15 ოქტომბერი - 14:00", "16 ოქტომბერი - 10:00"];

type FormData = {
  name: string;
  contactMethod: "ელფოსტა" | "ტელეფონი";
  contact: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests: string;
  experiences: string[];
  slot: string;
};

const INITIAL: FormData = {
  name: "",
  contactMethod: "ელფოსტა",
  contact: "",
  eventType: "",
  eventDate: "",
  location: "",
  guests: "",
  experiences: [],
  slot: SLOTS[0],
};

function Icon({ src, ...rest }: { src: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" {...rest} />;
}

function Header({ step, index, total, label }: { step: Step; index: number; total: number; label: string }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.brandWord}>LYST</span>
        <span className={styles.brandDot} aria-hidden="true" />
        <span className={styles.brandTag}>Consultation Booking</span>
      </div>
      <div className={styles.progress}>
        <span className={styles.progressStep}>
          {step === "cancelled" ? "ჯავშნის სტატუსი" : `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        </span>
        <span className={styles.progressLabel}>{label}</span>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© LYST. ყველა უფლება დაცულია.</p>
      <div className={styles.footerLinks}>
        <a>კონფიდენციალურობა</a>
        <a>წესები და პირობები</a>
      </div>
    </footer>
  );
}

export default function BookingWizard() {
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

  const headerLabel =
    step === "contact"
      ? "საკონტაქტო ინფორმაცია"
      : step === "event"
        ? "ღონისძიების დეტალები"
        : step === "time"
          ? "დრო და გადამოწმება"
          : step === "confirmed"
            ? "დადასტურებულია"
            : step === "reschedule"
              ? "დროის შეცვლა"
              : "გაუქმებულია";

  const headerIndex = step === "contact" ? 1 : step === "event" ? 2 : step === "time" ? 3 : step === "reschedule" ? 5 : 6;
  const headerTotal = step === "contact" || step === "event" || step === "time" ? 3 : 6;

  return (
    <div className={styles.wizard} data-subtle={step === "confirmed" || step === "cancelled"}>
      <Header step={step} index={headerIndex} total={headerTotal} label={headerLabel} />

      <main className={styles.body}>
        {step === "contact" && (
          <div className={styles.contentRow}>
            <div className={styles.editorial}>
              <h1 className={styles.editorialTitle}>როგორ დაგიკავშირდეთ?</h1>
              <p className={styles.editorialText}>
                დატოვეთ თქვენი საკონტაქტო მონაცემები, რათა ჩვენმა წარმომადგენელმა შეძლოს თქვენთან
                დაკავშირება და კონსულტაციის დეტალების დაზუსტება.
              </p>
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
                <span className={styles.fieldLabel}>სრული სახელი</span>
                <input
                  className={styles.input}
                  required
                  value={data.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  placeholder="გიორგი მახარაძე"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>საკონტაქტო მეთოდი</span>
                <select
                  className={styles.input}
                  value={data.contactMethod}
                  onChange={(e) => patch({ contactMethod: e.target.value as FormData["contactMethod"] })}
                >
                  <option>ელფოსტა</option>
                  <option>ტელეფონი</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>ტელეფონი / ელფოსტა</span>
                <input
                  className={styles.input}
                  required
                  value={data.contact}
                  onChange={(e) => patch({ contact: e.target.value })}
                  placeholder="giorgi@example.com • +995 5XX XX XX XX"
                />
              </label>
              <div className={styles.actions}>
                <Link href="/" className={styles.backBtn}>
                  უკან
                </Link>
                <button type="submit" className={styles.nextBtn}>
                  ღონისძიების დეტალები
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "event" && (
          <div className={styles.contentRow}>
            <div className={styles.editorial}>
              <h1 className={styles.editorialTitle}>მოგვიყევი შენი ღონისძიების შესახებ</h1>
              <p className={styles.editorialText}>
                ღონისძიების ტიპი და მასშტაბი გვეხმარება სწორად შევარჩიოთ შესაბამისი დამატებითი
                გამოცდილებები და ტექნიკური აღჭურვილობა.
              </p>
              <div className={styles.noticeCard}>
                <p className={styles.noticeTitle}>გამოცდილებების მონიშვნა</p>
                <p className={styles.noticeText}>
                  * ინტერესის მონიშვნა არის სავარაუდო და არ გულისხმობს სერვისების ავტომატურ აქტიურებას.
                </p>
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
                <span className={styles.fieldLabel}>ღონისძიების ტიპი</span>
                <input
                  className={styles.input}
                  required
                  value={data.eventType}
                  onChange={(e) => patch({ eventType: e.target.value })}
                  placeholder="ქორწილი, დღესასწაული, კორპორატიული..."
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>სავარაუდო თარიღი</span>
                <input
                  type="date"
                  className={styles.input}
                  value={data.eventDate}
                  onChange={(e) => patch({ eventDate: e.target.value })}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>ლოკაცია (ქალაქი)</span>
                <input
                  className={styles.input}
                  required
                  value={data.location}
                  onChange={(e) => patch({ location: e.target.value })}
                  placeholder="თბილისი, ბათუმი, ქუთაისი..."
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>სტუმრების რაოდენობა</span>
                <input
                  className={styles.input}
                  value={data.guests}
                  onChange={(e) => patch({ guests: e.target.value })}
                  placeholder="დაახლოებით 50-150 კაცი"
                />
              </label>
              <div className={styles.checkGroup}>
                <span className={styles.fieldLabel}>გამოცდილებები (არასავალდებულო)</span>
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
                  უკან
                </button>
                <button type="submit" className={styles.nextBtnPrimary}>
                  კონსულტაციის დრო
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "time" && (
          <div className={styles.contentRow}>
            <div className={styles.editorial}>
              <h1 className={styles.editorialTitleLg}>გადაამოწმეთ ინფორმაცია დადასტურებამდე</h1>
            </div>
            <form
              className={styles.formPanel}
              onSubmit={(e) => {
                e.preventDefault();
                setStep("confirmed");
              }}
            >
              <div className={styles.timeLabel}>
                <p className={styles.timeLabelTitle}>აირჩიეთ კონსულტაციის საათი</p>
                <p className={styles.timeLabelSub}>დროის სარტყელი: Tbilisi (GMT+4)</p>
              </div>
              <div className={styles.slotList}>
                {SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={styles.slotOption}
                    data-selected={data.slot === slot}
                    onClick={() => patch({ slot })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <div className={styles.stackActions}>
                <button type="submit" className={styles.nextBtnPrimary}>
                  კონსულტაციის მოთხოვნის გაგზავნა
                </button>
                <button type="button" className={styles.backBtn} onClick={() => setStep("event")}>
                  ინფორმაციის შეცვლა
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
                <span className={styles.statusLabel}>მოთხოვნა მიღებულია</span>
              </div>
              <h1 className={styles.editorialTitleXl}>კონსულტაციის მოთხოვნა მიღებულია.</h1>
              <p className={styles.editorialText}>
                თქვენი შეხვედრის მოთხოვნა წარმატებით დარეგისტრირდა სისტემაში. ჩვენი წარმომადგენელი
                დეტალურად გაეცნობა თქვენს მიერ მოწოდებულ ინფორმაციას და მოემზადება ინდივიდუალური
                პრეზენტაციისთვის.
              </p>
              <div className={styles.summaryCard}>
                <p className={styles.summaryKicker}>საკონტაქტო და ღონისძიების ინფორმაცია</p>
                <div className={styles.summaryList}>
                  <div className={styles.summaryRow}>
                    <Icon src="/images/booking/check-16.svg" width={16} height={16} />
                    <span>სახელი: {data.name || "—"}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <Icon src="/images/booking/check-16.svg" width={16} height={16} />
                    <span>საკონტაქტო: {data.contact || "—"}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <Icon src="/images/booking/check-16.svg" width={16} height={16} />
                    <span>
                      ღონისძიება: {data.eventType || "—"}, {data.location || "—"}
                      {data.guests ? ` (${data.guests})` : ""}
                    </span>
                  </div>
                </div>
              </div>
              <p className={styles.footnote}>დადასტურებასა და შეხვედრის დეტალებს მითითებულ ელფოსტაზე მიიღებ.</p>
            </div>

            <div className={styles.formPanel}>
              <div className={styles.selectedTimeCard}>
                <p className={styles.noticeTitleSm}>არჩეული დრო</p>
                <p className={styles.selectedTimeValue}>{data.slot}</p>
                <p className={styles.timeLabelSub}>დროის სარტყელი: Tbilisi (GMT+4)</p>
              </div>
              <div className={styles.stackActions}>
                <button type="button" className={styles.calendarBtn}>
                  <Icon src="/images/booking/calendar.svg" width={16} height={16} />
                  კალენდარში დამატება
                </button>
                <div className={styles.pairActions}>
                  <button type="button" className={styles.backBtn} onClick={() => setStep("reschedule")}>
                    დროის შეცვლა
                  </button>
                  <button type="button" className={styles.cancelBtn} onClick={() => setStep("cancelled")}>
                    გაუქმება
                  </button>
                </div>
              </div>
              <div className={styles.navActions}>
                <Link href="/" className={styles.nextBtnPrimary}>
                  მთავარ გვერდზე დაბრუნება
                </Link>
                <Link href="/dashboard/client" className={styles.textLink}>
                  პანელზე დაბრუნება
                </Link>
              </div>
            </div>
          </div>
        )}

        {step === "reschedule" && (
          <div className={styles.contentRow}>
            <div className={styles.editorial}>
              <h1 className={styles.editorialTitle}>საკონსულტაციო შეხვედრის გადატანა</h1>
              <p className={styles.editorialText}>
                თუ მიმდინარე დრო აღარ არის თქვენთვის ხელსაყრელი, გთხოვთ ქვემოთ მონიშნოთ სხვა სასურველი
                ალტერნატივა. მიმდინარე ჯავშანი ძალაში დარჩება ახალი დროის დადასტურებამდე.
              </p>
              <div className={styles.noticeCard}>
                <p className={styles.noticeTitle}>აქტიური ჯავშანი</p>
                <p className={styles.noticeText}>{data.slot} (Tbilisi Time)</p>
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
                <p className={styles.timeLabelTitle}>აირჩიეთ ახალი საათი</p>
              </div>
              <div className={styles.slotList}>
                {SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={styles.slotOption}
                    data-selected={data.slot === slot}
                    onClick={() => patch({ slot })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <div className={styles.stackActions}>
                <button type="submit" className={styles.nextBtnPrimary}>
                  გადატანის მოთხოვნა
                </button>
                <button type="button" className={styles.backBtn} onClick={() => setStep("confirmed")}>
                  გაუქმება
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
              <h1 className={styles.editorialTitleXl}>ჯავშანი გაუქმდა</h1>
              <p className={styles.editorialText}>
                თქვენი საკონსულტაციო შეხვედრა წარმატებით გაუქმდა. იმედს ვიტოვებთ, მომავალში კვლავ
                ისარგებლებთ ჩვენი ციფრული სერვისებით.
              </p>
              <div className={styles.noticeCard}>
                <p className={styles.noticeTitle}>გაუქმებული შეხვედრის დეტალები</p>
                <p className={styles.noticeText}>გადაწყვეტილი დრო ყოფილიყო: {data.slot}</p>
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
                  კონსულტაციის ხელახლა დაჯავშნა
                </button>
                <div className={styles.pairActions}>
                  <Link href="/" className={styles.backBtn}>
                    დაბრუნება მთავარ გვერდზე
                  </Link>
                  <Link href="/dashboard/client" className={styles.backBtn}>
                    დაბრუნება პანელზე
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
