export type TimelineEntryType = "work" | "education" | "project";

export type TimelinePeriod = {
  readonly start: string;
  readonly startMonth?: number;
  readonly end: string | null;
};

export type TimelineEntry = {
  readonly type: TimelineEntryType;
  readonly title: string;
  readonly organization?: string;
  readonly period: TimelinePeriod;
  readonly description: string;
  readonly highlights?: readonly string[];
  readonly technologies?: readonly string[];
  readonly relatedProjects?: readonly string[];
  readonly projectSlug?: string;
};

export type ExperienceData = {
  readonly entries: readonly TimelineEntry[];
};
