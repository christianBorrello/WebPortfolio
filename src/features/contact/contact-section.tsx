import { useTranslations } from "next-intl";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="flex flex-col items-center gap-6 px-6 py-24 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t("heading")}
      </h2>
      <p className="max-w-lg text-base leading-relaxed text-foreground/60">
        {t("subtext")}
      </p>
      <ContactForm />
    </section>
  );
}
