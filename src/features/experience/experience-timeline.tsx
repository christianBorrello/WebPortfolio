"use client";

import { useTranslations } from "next-intl";
import { TimelineEntry } from "./timeline-entry";
import { resolveProjects } from "./resolve-projects";
import { useScrollReveal } from "./use-scroll-reveal";
import type { TimelineEntry as TimelineEntryType } from "@/shared/types/experience";
import type { ProjectSummary } from "@/shared/types/project";

type ExperienceTimelineProps = {
  readonly entries: readonly TimelineEntryType[];
  readonly projectSummaries: readonly ProjectSummary[];
};

export function ExperienceTimeline({
  entries,
  projectSummaries,
}: ExperienceTimelineProps) {
  const t = useTranslations("experience");
  const { containerRef } = useScrollReveal(entries.length);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="flex flex-col bg-background px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <h2
          id="experience-heading"
          className="text-display-lg leading-display-lg tracking-display-lg font-display font-semibold text-foreground text-balance accent-line"
        >
          {t("heading")}
        </h2>

        <p className="text-[1.0625rem] leading-[1.8] text-muted">
          {t("subtext")}
        </p>

        <ol
          ref={containerRef}
          className="relative flex flex-col gap-16"
        >
          {entries.map((entry, index) => (
            <TimelineEntry
              key={`${entry.type}-${entry.title}`}
              entry={entry}
              matchedProjects={resolveProjects(entry, projectSummaries)}
              index={index}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
