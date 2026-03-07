import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProjectCaseStudy, CaseStudySections } from "@/shared/types/project";

type SectionEntry = {
  readonly key: keyof CaseStudySections;
  readonly labelKey: string;
  readonly anchor: string;
};

const SECTIONS: readonly SectionEntry[] = [
  { key: "theProblem", labelKey: "section_the_problem", anchor: "the-problem" },
  { key: "whatISaw", labelKey: "section_what_i_saw", anchor: "what-i-saw" },
  { key: "theDecisions", labelKey: "section_the_decisions", anchor: "the-decisions" },
  { key: "beyondTheAssignment", labelKey: "section_beyond", anchor: "beyond" },
  { key: "whatDidntWork", labelKey: "section_what_didnt_work", anchor: "what-didnt-work" },
  { key: "theBiggerPicture", labelKey: "section_bigger_picture", anchor: "bigger-picture" },
  { key: "forNonSpecialists", labelKey: "section_for_non_specialists", anchor: "for-non-specialists" },
] as const;

type CaseStudyLayoutProps = {
  readonly project: ProjectCaseStudy;
};

function BackLink({ label }: { readonly label: string }) {
  return (
    <Link
      href="/#experience"
      className="font-mono text-xs text-muted underline decoration-muted/40 decoration-1 underline-offset-[3px] transition-all duration-200 hover:text-accent hover:decoration-accent"
    >
      {label}
    </Link>
  );
}

function AnchorNav({ sections, t }: { readonly sections: readonly SectionEntry[]; readonly t: ReturnType<typeof useTranslations<"projects">> }) {
  return (
    <nav aria-label="Case study sections" className="flex flex-wrap gap-x-4 gap-y-2 border-b border-border pb-4">
      {sections.map((section) => (
        <a
          key={section.anchor}
          href={`#${section.anchor}`}
          className="font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
        >
          {t(section.labelKey)}
        </a>
      ))}
    </nav>
  );
}

function ContentSection({
  anchor,
  heading,
  content,
}: {
  readonly anchor: string;
  readonly heading: string;
  readonly content: string;
}) {
  return (
    <section id={anchor} className="flex flex-col gap-3 scroll-mt-8">
      <h2 className="font-display font-semibold tracking-[-0.02em] text-foreground text-xl sm:text-2xl">
        {heading}
      </h2>
      <p className="text-[1.0625rem] leading-[1.8] text-foreground/70 whitespace-pre-line">
        {content}
      </p>
    </section>
  );
}

function StackList({ stack, label }: { readonly stack: readonly string[]; readonly label: string }) {
  return (
    <section className="flex flex-col gap-3 border-t border-border pt-8">
      <h2 className="font-display font-semibold tracking-[-0.02em] text-foreground text-xl sm:text-2xl">
        {label}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li
            key={tech}
            className="font-mono text-xs rounded-md border border-border/60 px-3 py-1 text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  const t = useTranslations("projects");

  return (
    <article className="bg-background px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
      <div className="mx-auto flex max-w-[68ch] flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1
            className="text-display-md leading-display-md tracking-display-md font-display font-semibold text-foreground text-balance"
          >
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
              {project.subtitle}
            </p>
          )}
        </header>

        <AnchorNav sections={SECTIONS} t={t} />

        {SECTIONS.map((section) => (
          <ContentSection
            key={section.anchor}
            anchor={section.anchor}
            heading={t(section.labelKey)}
            content={project.sections[section.key]}
          />
        ))}

        <StackList stack={project.stack} label={t("section_stack")} />

        <BackLink label={t("back_to_experience")} />
      </div>
    </article>
  );
}
