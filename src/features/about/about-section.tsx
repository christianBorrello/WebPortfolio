import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="flex min-h-screen flex-col justify-center bg-background px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto flex max-w-[65ch] flex-col gap-8">
        <h2 className="font-display text-4xl text-foreground sm:text-5xl">
          {t("heading")}
        </h2>

        <p className="text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
          {t("identity")}
        </p>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-2xl text-foreground sm:text-3xl">
            {t("adhd_title")}
          </h3>
          <p className="text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
            {t("adhd_content")}
          </p>
        </div>

        <p className="text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
          {t("tech_philosophy")}
        </p>

        <p className="text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
          {t("philosophy")}
        </p>

        <p className="text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
          {t("values")}
        </p>

        <p className="text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
          {t("looking_for")}
        </p>
      </div>
    </section>
  );
}
