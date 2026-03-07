"use client";

import { type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import type { FormStatus } from "@/shared/types/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [emailError, setEmailError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email") as string;

    if (!email || !EMAIL_PATTERN.test(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: data.get("name") ?? "",
          email,
          message: data.get("message") ?? "",
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  const baseInputClassName =
    "rounded-xl border bg-surface px-4 py-3 text-[0.9375rem] outline-none transition-all duration-200 placeholder:text-muted/40";
  const inputClassName = `${baseInputClassName} border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/20`;
  const inputErrorClassName = `${baseInputClassName} border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-500/20`;

  if (status === "success") {
    return (
      <div className="mx-auto mt-10 flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 px-6 py-8 text-center">
        <p className="text-base font-medium text-accent">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex w-full max-w-md flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="font-mono text-xs tracking-wider text-muted">
          {t("name_label")}
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder={t("name_placeholder")}
          disabled={isSubmitting}
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="font-mono text-xs tracking-wider text-muted">
          {t("email_label")}
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          placeholder={t("email_placeholder")}
          disabled={isSubmitting}
          onChange={() => emailError && setEmailError(false)}
          className={emailError ? inputErrorClassName : inputClassName}
          aria-invalid={emailError}
          aria-describedby={emailError ? "contact-email-error" : undefined}
        />
        {emailError && (
          <p id="contact-email-error" className="text-xs text-red-500" role="alert">
            {t("email_error")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="font-mono text-xs tracking-wider text-muted">
          {t("message_label")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={t("message_placeholder")}
          disabled={isSubmitting}
          className={`resize-none ${inputClassName}`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 rounded-xl border border-accent bg-accent px-8 py-3 font-mono text-sm font-medium text-background transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-[var(--accent)]/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? t("sending") : t("submit")}
      </button>

      {status === "error" && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-center">
          <p className="text-sm text-red-500" role="alert">
            {t("error")}
          </p>
        </div>
      )}
    </form>
  );
}
