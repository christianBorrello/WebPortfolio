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
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
        isWork
          ? "bg-foreground/10 text-foreground"
          : "bg-foreground/5 text-foreground/70"
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
          className="rounded bg-foreground/[0.04] px-2 py-1 text-xs text-foreground/70"
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
          className="rounded-full border border-foreground/10 px-2.5 py-0.5 text-xs text-foreground/60"
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
    <article className="flex flex-col gap-4 rounded-lg border border-foreground/10 p-6 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.02]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <TypeBadge type={project.type} label={typeLabel} />
      </div>

      <p className="text-sm leading-relaxed text-foreground/70">
        {project.hook}
      </p>

      <MetricsList metrics={project.metrics} />

      <TagList tags={project.tags} />

      <Link
        href={`/projects/${project.slug}`}
        className="mt-auto self-start text-sm font-medium text-foreground/80 underline underline-offset-4 transition-colors hover:text-foreground"
      >
        {t("read_case_study")}
      </Link>
    </article>
  );
}
