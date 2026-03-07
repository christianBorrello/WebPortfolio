"use client";

import { useTranslations } from "next-intl";
import { useSectionReveal } from "@/shared/hooks/use-section-reveal";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const t = useTranslations("contact");
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex flex-col bg-background px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <h2
          className="text-display-lg leading-display-lg tracking-display-lg font-display font-semibold text-foreground text-balance accent-line"
        >
          {t("heading")}
        </h2>
        <p className="max-w-lg text-body leading-[1.8] text-muted text-pretty">
          {t("subtext")}
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
