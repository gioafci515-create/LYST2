"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useState } from "react";
import styles from "./page.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * UI-only sign-in: validates the fields and continues to the host dashboard.
 * There is no authentication backend yet.
 */
export default function LoginForm() {
  const t = useTranslations("login");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email.trim())) next.email = t("emailError");
    if (password.length < 1) next.password = t("passwordError");
    setErrors(next);
    if (!next.email && !next.password) router.push("/dashboard");
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          <span className="d-only">{t("emailLabelDesktop")}</span>
          <span className="m-only">{t("emailLabelMobile")}</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={styles.input}
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className={styles.error} role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label} htmlFor="password">
            {t("passwordLabel")}
          </label>
          <a className={styles.forgot}>
            <span className="d-only">{t("forgotDesktop")}</span>
            <span className="m-only">{t("forgotMobile")}</span>
          </a>
        </div>
        <div className={styles.passwordWrap}>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <button
            type="button"
            className={styles.eye}
            aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((v) => !v)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/login/eye.svg" alt="" width={20} height={20} />
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className={styles.error} role="alert">
            {errors.password}
          </p>
        )}
      </div>

      <button type="submit" className={styles.submit}>
        {t("submit")}
      </button>

      <div className={styles.or} aria-hidden="true">
        <span className={styles.orLine} />
        <span>{t("or")}</span>
        <span className={styles.orLine} />
      </div>

      <button
        type="button"
        className={styles.google}
        onClick={() => router.push("/dashboard")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/login/google.svg" alt="" width={20} height={20} />
        {t("googleCta")}
      </button>

      <div className={styles.rule} aria-hidden="true" />

      <p className={styles.signup}>
        <span>{t("signupText")}</span>
        <Link href="/create">{t("signupCta")}</Link>
      </p>
    </form>
  );
}
