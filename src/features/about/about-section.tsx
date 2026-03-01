import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-24 sm:px-10"
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t("heading")}
      </h2>

      <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
        {t("identity")}
      </p>

      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {t("adhd_title")}
        </h3>
        <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
          {t("adhd_content")}
        </p>
      </div>

      <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
        {t("tech_philosophy")}
      </p>

      <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
        {t("philosophy")}
      </p>

      <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
        {t("values")}
      </p>

      <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
        {t("looking_for")}
      </p>
    </section>
  );
}
