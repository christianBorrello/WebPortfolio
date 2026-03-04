import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "@/features/projects/project-card";
import type { TimelineEntry as TimelineEntryType } from "@/shared/types/experience";
import type { ProjectSummary } from "@/shared/types/project";

type TimelineEntryProps = {
  readonly entry: TimelineEntryType;
  readonly matchedProjects: readonly ProjectSummary[];
};

const BADGE_STYLES = {
  work: "bg-foreground/10 text-foreground",
  education: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  project: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
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
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${BADGE_STYLES[type]}`}
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
    <span>
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
          className="text-sm leading-relaxed text-foreground/70"
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
          className="rounded-full border border-foreground/10 px-2.5 py-0.5 text-xs text-foreground/60"
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
}: TimelineEntryProps) {
  const t = useTranslations("experience");
  const badgeLabel = t(`type_${entry.type}`);
  const presentLabel = t("present");

  return (
    <li className="flex flex-col gap-3">
      <TypeBadge type={entry.type} label={badgeLabel} />

      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        {entry.title}
      </h3>

      <p className="text-sm text-foreground/60">
        {entry.organization && <>{entry.organization} &middot; </>}
        <PeriodDisplay
          start={entry.period.start}
          end={entry.period.end}
          presentLabel={presentLabel}
        />
      </p>

      <p className="text-sm leading-relaxed text-foreground/70">
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
          className="self-start text-sm font-medium text-foreground/80 underline underline-offset-4 transition-colors hover:text-foreground"
        >
          {t("read_case_study")}
        </Link>
      )}
    </li>
  );
}
