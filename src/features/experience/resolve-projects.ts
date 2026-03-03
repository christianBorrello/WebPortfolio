import type { TimelineEntry } from "@/shared/types/experience";
import type { ProjectSummary } from "@/shared/types/project";

export function resolveProjects(
  entry: TimelineEntry,
  projectSummaries: readonly ProjectSummary[]
): readonly ProjectSummary[] {
  if (entry.type !== "work" || !entry.relatedProjects) return [];
  return entry.relatedProjects
    .map((slug) => projectSummaries.find((p) => p.slug === slug))
    .filter((p): p is ProjectSummary => p !== undefined);
}
