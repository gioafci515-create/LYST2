"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * UI-only sign-in: validates the fields and continues to the host dashboard.
 * There is no authentication backend yet.
 */
export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email.trim())) next.email = "შეიყვანეთ სწორი ელფოსტა";
    if (password.length < 1) next.password = "შეიყვანეთ პაროლი";
    setErrors(next);
    if (!next.email && !next.password) router.push("/dashboard");
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          <span className="d-only">ელფოსტა</span>
          <span className="m-only">ელ. ფოსტა</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={styles.input}
          placeholder="სახელი@მაგალითი.com"
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
            პაროლი
          </label>
          <a className={styles.forgot}>
            <span className="d-only">პაროლის აღდგენა</span>
            <span className="m-only">დაგავიწყდა პაროლი?</span>
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
            aria-label={showPassword ? "პაროლის დამალვა" : "პაროლის ჩვენება"}
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
        შესვლა
      </button>

      <div className={styles.or} aria-hidden="true">
        <span className={styles.orLine} />
        <span>ან</span>
        <span className={styles.orLine} />
      </div>

      <button
        type="button"
        className={styles.google}
        onClick={() => router.push("/dashboard")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/login/google.svg" alt="" width={20} height={20} />
        Google-ით შესვლა
      </button>

      <div className={styles.rule} aria-hidden="true" />

      <p className={styles.signup}>
        <span>ანგარიში არ გაქვს?</span>
        <Link href="/create">რეგისტრაცია</Link>
      </p>
    </form>
  );
}
