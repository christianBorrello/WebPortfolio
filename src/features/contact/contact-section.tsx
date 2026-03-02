import { useTranslations } from "next-intl";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col justify-center bg-foreground/[0.03] px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <h2 className="font-display text-4xl text-foreground sm:text-5xl">
          {t("heading")}
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-foreground/60 sm:text-lg sm:leading-relaxed">
          {t("subtext")}
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
