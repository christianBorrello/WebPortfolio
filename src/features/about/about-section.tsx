"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSectionReveal } from "@/shared/hooks/use-section-reveal";

export function AboutSection() {
  const t = useTranslations("about");
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="about" className="bg-background px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto flex max-w-[68ch] flex-col gap-10">
        <h2 className="text-display-lg leading-display-lg tracking-display-lg font-display font-semibold text-foreground text-balance accent-line">
          {t("heading")}
        </h2>

        <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl border-2 border-accent/20 sm:h-56 sm:w-56">
          <Image
            src="/assets/profile.jpg"
            alt="Christian Borrello"
            fill
            sizes="(max-width: 640px) 192px, 224px"
            className="object-cover grayscale-[30%] sepia-[15%]"
            priority={false}
          />
        </div>

        <p className="text-body-lg font-medium leading-[1.8] text-foreground/80 text-pretty">
          {t("identity")}
        </p>

        <blockquote className="relative py-6" aria-label={t("pull_quote")}>
          <span
            aria-hidden="true"
            className="absolute -left-2 -top-2 select-none font-display text-[6rem] leading-none text-accent/10 sm:-left-4 sm:text-[8rem]"
          >
            &ldquo;
          </span>
          <p className="relative font-display text-display-md leading-display-md tracking-display-md font-semibold text-foreground/90 text-balance italic">
            {t("pull_quote")}
          </p>
        </blockquote>

        <div className="flex flex-col gap-3 border-l-[3px] border-accent/60 py-2 pl-6">
          <h3 className="text-display-md leading-display-md tracking-display-md font-display font-semibold text-foreground">
            {t("adhd_title")}
          </h3>
          <p className="text-[1.0625rem] leading-[1.8] text-foreground/70">
            {t("adhd_content")}
          </p>
        </div>

        <p className="text-[1.0625rem] leading-[1.8] text-foreground/70">
          {t("tech_philosophy")}
        </p>

        <p className="text-[1.0625rem] leading-[1.8] text-foreground/70">
          {t("philosophy")}
        </p>

        <p className="text-[1.0625rem] leading-[1.8] text-foreground/70">
          {t("values")}
        </p>

        <p className="text-[1.0625rem] leading-[1.8] text-foreground/70">
          {t("looking_for")}
        </p>
      </div>
    </section>
  );
}
