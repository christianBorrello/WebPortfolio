import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="flex min-h-[85vh] flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <header className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("name")}
        </h1>
        <p className="text-lg font-medium text-foreground/70 sm:text-xl">
          {t("title")}
        </p>
      </header>

      <blockquote className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        {t("statement")}
      </blockquote>

      <p className="max-w-lg text-lg italic text-foreground/60 sm:text-xl">
        {t("tagline")}
      </p>

      <nav className="mt-6 flex gap-4" aria-label="Primary actions">
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
      </nav>
    </section>
  );
}
