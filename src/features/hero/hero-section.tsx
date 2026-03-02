import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#0b0f1a] px-6 py-20 text-center text-[#f0f0f0] sm:px-10 md:py-0"
    >
      <header className="flex flex-col items-center">
        <h1 className="font-display text-7xl text-[#e0e0e0] sm:text-8xl md:text-9xl">
          {t("name")}
        </h1>
        <p className="-mt-2 text-xl font-medium text-[#9ca3af] sm:-mt-3 sm:text-2xl md:-mt-4 md:text-3xl">
          {t("title")}
        </p>
      </header>

      <blockquote className="max-w-3xl text-3xl font-bold leading-snug tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
        {t("statement")}
      </blockquote>

      <p className="max-w-lg text-base text-[#8b95a5] sm:text-lg md:text-xl">
        {t("tagline")}
      </p>

      <nav className="mt-4 flex flex-col gap-4 sm:flex-row" aria-label="Primary actions">
        <a
          href="#projects"
          className="rounded-lg bg-[#f0f0f0] px-7 py-3 text-sm font-semibold text-[#0b0f1a] transition-opacity hover:opacity-85 sm:text-base"
        >
          {t("cta_work")}
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-[#f0f0f0]/20 px-7 py-3 text-sm font-semibold text-[#f0f0f0] transition-colors hover:border-[#f0f0f0]/50 hover:bg-[#f0f0f0]/5 sm:text-base"
        >
          {t("cta_contact")}
        </a>
      </nav>
    </section>
  );
}
