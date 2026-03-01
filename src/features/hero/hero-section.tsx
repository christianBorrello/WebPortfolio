import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        {t("name")}
      </h1>
      <p className="text-xl font-medium text-foreground/80 sm:text-2xl">
        {t("title")}
      </p>
      <p className="max-w-lg text-lg italic text-foreground/70">
        {t("tagline")}
      </p>
      <p className="max-w-xl text-base leading-relaxed text-foreground/60">
        {t("statement")}
      </p>
      <div className="mt-6 flex gap-4">
        <a
          href="#projects"
          className="rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {t("cta_work")}
        </a>
        <a
          href="#contact"
          className="rounded-md border border-foreground/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          {t("cta_contact")}
        </a>
      </div>
    </section>
  );
}
