import type {
  TimelineEntryType,
  TimelinePeriod,
  TimelineEntry,
  ExperienceData,
} from "@/shared/types/experience";

// AC1: All four types exist and compile (verified by successful import above)

// AC2: entry.type constrained to "work" | "education" | "project"
const workType: TimelineEntryType = "work";
const educationType: TimelineEntryType = "education";
const projectType: TimelineEntryType = "project";
// @ts-expect-error - "invalid" is not assignable to TimelineEntryType
const invalidType: TimelineEntryType = "invalid";

// AC3: period.end accepts string or null
const ongoingPeriod: TimelinePeriod = { start: "2022", end: null };
const completedPeriod: TimelinePeriod = { start: "2016", end: "2020" };

// AC4a: Optional fields on a work entry
const workEntry: TimelineEntry = {
  type: "work",
  title: "Senior Software Engineer",
  organization: "Acme Corp",
  period: { start: "2022", end: null },
  description: "Led platform engineering.",
  highlights: ["Reduced deploy time by 60%"],
  technologies: [".NET", "React"],
  relatedProjects: ["project-alpha"],
};

// AC4b: Project entry with projectSlug
const projectEntry: TimelineEntry = {
  type: "project",
  title: "Side Project",
  period: { start: "2023", end: "2023" },
  description: "Built for learning.",
  technologies: ["Unity", "C#"],
  projectSlug: "unity-soulslike",
};

// AC4c: Education entry (minimal required fields)
const educationEntry: TimelineEntry = {
  type: "education",
  title: "Computer Science Degree",
  organization: "University",
  period: { start: "2016", end: "2020" },
  description: "Studied algorithms and systems.",
};

// AC4d: ExperienceData wraps entries
const experienceData: ExperienceData = {
  entries: [workEntry, projectEntry, educationEntry],
};

// AC: readonly arrays are enforced
// @ts-expect-error - readonly array cannot be mutated
experienceData.entries.push(workEntry);

// Suppress unused variable warnings - these are compile-time-only checks
void workType;
void educationType;
void projectType;
void invalidType;
void ongoingPeriod;
void completedPeriod;
void experienceData;
