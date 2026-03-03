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
      className="flex min-h-screen flex-col justify-center bg-foreground/[0.03] px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <h2
          id="experience-heading"
          className="font-display text-4xl text-foreground sm:text-5xl"
        >
          {t("heading")}
        </h2>

        <p className="text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
          {t("subtext")}
        </p>

        <ol
          ref={containerRef}
          className="relative flex flex-col gap-12 border-l-2 border-foreground/10 pl-8"
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
