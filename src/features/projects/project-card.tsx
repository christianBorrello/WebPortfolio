import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProjectSummary } from "@/shared/types/project";

type ProjectCardProps = {
  readonly project: ProjectSummary;
};

function TypeBadge({ type, label }: { type: string; label: string }) {
  const isWork = type === "work";
  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1 text-xs font-mono ${
        isWork
          ? "bg-accent/15 text-accent font-medium"
          : "bg-surface text-muted"
      }`}
    >
      {label}
    </span>
  );
}

function MetricsList({
  metrics,
}: {
  metrics: ProjectSummary["metrics"];
}) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {metrics.map((metric) => (
        <li
          key={metric.label}
          className="font-mono rounded-md bg-surface px-2 py-1 text-xs text-muted"
        >
          {metric.label}: <span className="font-medium text-foreground/90">{metric.value}{metric.unit ? ` ${metric.unit}` : ""}</span>
        </li>
      ))}
    </ul>
  );
}

function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="font-mono text-xs rounded-md border border-border/60 px-2 py-0.5 text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("projects");
  const typeLabel =
    project.type === "work" ? t("type_work") : t("type_personal");

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-[var(--accent)]/5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-foreground">
          {project.title}
        </h3>
        <TypeBadge type={project.type} label={typeLabel} />
      </div>

      <p className="text-[0.9375rem] leading-[1.7] text-muted">
        {project.hook}
      </p>

      <MetricsList metrics={project.metrics} />

      <TagList tags={project.tags} />

      <Link
        href={`/projects/${project.slug}`}
        className="mt-auto font-mono text-sm text-accent underline decoration-accent/40 decoration-1 underline-offset-[3px] transition-all duration-200 hover:decoration-accent hover:decoration-2"
      >
        {t("read_case_study")}
      </Link>
    </article>
  );
}
