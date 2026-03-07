import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "@/features/projects/project-card";
import type { TimelineEntry as TimelineEntryType } from "@/shared/types/experience";
import type { ProjectSummary } from "@/shared/types/project";

type TimelineEntryProps = {
  readonly entry: TimelineEntryType;
  readonly matchedProjects: readonly ProjectSummary[];
  readonly index: number;
};

const BADGE_STYLES = {
  work: "bg-accent/15 text-accent font-mono font-medium",
  education: "bg-surface text-muted font-mono",
  project: "bg-surface text-muted font-mono",
} as const;

function TypeBadge({
  type,
  label,
}: {
  readonly type: TimelineEntryType["type"];
  readonly label: string;
}) {
  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1 text-xs ${BADGE_STYLES[type]}`}
    >
      {label}
    </span>
  );
}

function PeriodDisplay({
  start,
  end,
  presentLabel,
}: {
  readonly start: string;
  readonly end: string | null;
  readonly presentLabel: string;
}) {
  return (
    <span className="font-mono text-xs tracking-wider uppercase text-muted">
      {start} - {end ?? presentLabel}
    </span>
  );
}

function HighlightsList({
  highlights,
}: {
  readonly highlights: readonly string[];
}) {
  return (
    <ul className="flex flex-col gap-1.5">
      {highlights.map((highlight) => (
        <li
          key={highlight}
          className="text-[0.9375rem] leading-[1.7] text-muted"
        >
          {highlight}
        </li>
      ))}
    </ul>
  );
}

function TechnologyTags({ tags }: { readonly tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="font-mono text-xs rounded-md border border-border/60 px-2 py-0.5 text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function NestedProjectCards({
  projects,
}: {
  readonly projects: readonly ProjectSummary[];
}) {
  return (
    <ul className="flex flex-col gap-4">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}

export function TimelineEntry({
  entry,
  matchedProjects,
  index,
}: TimelineEntryProps) {
  const t = useTranslations("experience");
  const badgeLabel = t(`type_${entry.type}`);
  const presentLabel = t("present");
  const displayNumber = String(index + 1).padStart(2, "0");
  const monthLabel = entry.period.startMonth
    ? t(`month_${entry.period.startMonth}`)
    : undefined;

  return (
    <li className="grid grid-cols-[4.5rem_1.25rem_1fr] sm:grid-cols-[5.5rem_1.25rem_1fr]">
      <span
        className="self-start pt-0.5 text-right font-mono text-[0.6875rem] uppercase tracking-wider text-muted/70 sm:text-xs"
        aria-hidden="true"
      >
        {monthLabel && <span className="block text-foreground/50">{monthLabel}</span>}
        <span className="block">{entry.period.start}</span>
      </span>

      <div className="timeline-rail relative flex justify-center" aria-hidden="true">
        <span className="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_var(--background)]" />
      </div>

      <div className="relative flex flex-col gap-3 pl-4">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 -right-4 select-none font-display text-[8rem] font-bold leading-none text-accent/[0.04] sm:text-[10rem]"
        >
          {displayNumber}
        </span>

        <TypeBadge type={entry.type} label={badgeLabel} />

        <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-foreground">
          {entry.title}
        </h3>

        <p className="text-sm text-muted">
          {entry.organization && <>{entry.organization} &middot; </>}
          <PeriodDisplay
            start={entry.period.start}
            end={entry.period.end}
            presentLabel={presentLabel}
          />
        </p>

        <p className="text-[0.9375rem] leading-[1.7] text-muted">
          {entry.description}
        </p>

        {entry.type === "work" &&
          entry.highlights &&
          entry.highlights.length > 0 && (
            <HighlightsList highlights={entry.highlights} />
          )}

        {(entry.type === "work" || entry.type === "project") &&
          entry.technologies &&
          entry.technologies.length > 0 && (
            <TechnologyTags tags={entry.technologies} />
          )}

        {entry.type === "work" && matchedProjects.length > 0 && (
          <NestedProjectCards projects={matchedProjects} />
        )}

        {entry.type === "project" && entry.projectSlug && (
          <Link
            href={`/projects/${entry.projectSlug}`}
            className="font-mono text-sm text-accent underline decoration-accent/40 decoration-1 underline-offset-[3px] transition-all duration-200 hover:decoration-accent hover:decoration-2"
          >
            {t("read_case_study")}
          </Link>
        )}
      </div>
    </li>
  );
}
