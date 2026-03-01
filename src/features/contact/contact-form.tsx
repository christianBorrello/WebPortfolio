"use client";

import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");

  return (
    <form className="mx-auto flex w-full max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        {t("name_label")}
        <input
          type="text"
          name="name"
          placeholder={t("name_placeholder")}
          className="rounded-md border border-foreground/20 bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-foreground/40"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        {t("email_label")}
        <input
          type="email"
          name="email"
          required
          placeholder={t("email_placeholder")}
          className="rounded-md border border-foreground/20 bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-foreground/40"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        {t("message_label")}
        <textarea
          name="message"
          rows={5}
          placeholder={t("message_placeholder")}
          className="resize-none rounded-md border border-foreground/20 bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-foreground/40"
        />
      </label>

      <button
        type="submit"
        className="mt-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        {t("submit")}
      </button>
    </form>
  );
}
