"use client";

import { type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import type { FormStatus } from "@/shared/types/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_URL = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`;

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
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
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

  const inputClassName =
    "rounded-md border border-foreground/20 bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-foreground/40";
  const inputErrorClassName =
    "rounded-md border border-red-500 bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-red-400";

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-4"
    >
      <label className="flex flex-col gap-1 text-sm font-medium">
        {t("name_label")}
        <input
          type="text"
          name="name"
          placeholder={t("name_placeholder")}
          disabled={isSubmitting}
          className={inputClassName}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        {t("email_label")}
        <input
          type="email"
          name="email"
          required
          placeholder={t("email_placeholder")}
          disabled={isSubmitting}
          onChange={() => emailError && setEmailError(false)}
          className={emailError ? inputErrorClassName : inputClassName}
        />
        {emailError && (
          <span className="text-xs text-red-500">{t("email_error")}</span>
        )}
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        {t("message_label")}
        <textarea
          name="message"
          rows={5}
          placeholder={t("message_placeholder")}
          disabled={isSubmitting}
          className={`resize-none ${inputClassName}`}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? t("sending") : t("submit")}
      </button>

      {status === "success" && (
        <p className="text-center text-sm text-green-600">{t("success")}</p>
      )}

      {status === "error" && (
        <p className="text-center text-sm text-red-500">{t("error")}</p>
      )}
    </form>
  );
}
