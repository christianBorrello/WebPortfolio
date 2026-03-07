import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-background px-6 py-24 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--accent)/0.07,transparent_50%)]" />

      <div className="stagger relative mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2 animate-fade-in">
          <h1 className="font-display text-5xl font-semibold tracking-[-0.025em] text-foreground sm:text-6xl lg:text-7xl">
            {t("name")}
          </h1>
          <p className="font-mono text-sm tracking-wider text-accent/80">
            {t("title")}
          </p>
        </header>

        <div className="animate-fade-up w-12 h-px bg-accent/40" aria-hidden="true" />

        <blockquote className="animate-fade-up max-w-4xl text-display-xl leading-display-xl tracking-display-xl font-display font-semibold text-foreground text-balance">
          {t("statement")}
        </blockquote>

        <p className="animate-fade-up max-w-xl text-body-lg leading-[1.8] text-muted text-pretty">
          {t("tagline")}
        </p>

        <nav className="animate-fade-up flex items-center gap-8 pt-2" aria-label="Primary actions">
          <a
            href="#experience"
            className="group flex items-center gap-2 border-b border-accent/40 pb-0.5 font-mono text-sm text-foreground transition-all duration-200 hover:border-accent hover:text-accent"
          >
            {t("cta_work")}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              &rarr;
            </span>
          </a>
          <a
            href="#contact"
            className="font-mono text-sm text-muted transition-colors duration-200 hover:text-foreground"
          >
            {t("cta_contact")}
          </a>
        </nav>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted/60"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
