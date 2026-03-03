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
      className="inline-block text-sm font-medium text-foreground/60 underline underline-offset-4 transition-colors hover:text-foreground"
    >
      {label}
    </Link>
  );
}

function AnchorNav({ sections, t }: { readonly sections: readonly SectionEntry[]; readonly t: ReturnType<typeof useTranslations<"projects">> }) {
  return (
    <nav aria-label="Case study sections" className="flex flex-wrap gap-x-4 gap-y-2 border-b border-foreground/10 pb-4">
      {sections.map((section) => (
        <a
          key={section.anchor}
          href={`#${section.anchor}`}
          className="text-sm text-foreground/50 underline-offset-4 transition-colors hover:text-foreground hover:underline"
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
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {heading}
      </h2>
      <p className="text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed whitespace-pre-line">
        {content}
      </p>
    </section>
  );
}

function StackList({ stack, label }: { readonly stack: readonly string[]; readonly label: string }) {
  return (
    <section className="flex flex-col gap-3 border-t border-foreground/10 pt-8">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {label}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-foreground/10 px-3 py-1 text-sm text-foreground/70"
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
    <article className="bg-background px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto flex max-w-[65ch] flex-col gap-10">
        <BackLink label={t("back_to_experience")} />

        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-base leading-relaxed text-foreground/60 sm:text-lg sm:leading-relaxed">
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
