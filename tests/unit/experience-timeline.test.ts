import { describe, it, expect } from "vitest";
import { resolveProjects } from "@/features/experience/resolve-projects";
import type { TimelineEntry } from "@/shared/types/experience";
import type { ProjectSummary } from "@/shared/types/project";

const projectAlpha: ProjectSummary = {
  slug: "project-alpha",
  title: "Project Alpha",
  hook: "A great project",
  type: "work",
  tags: ["react"],
};

const projectBeta: ProjectSummary = {
  slug: "project-beta",
  title: "Project Beta",
  hook: "Another project",
  type: "personal",
  tags: ["vue"],
};

const allSummaries: readonly ProjectSummary[] = [projectAlpha, projectBeta];

describe("resolveProjects", () => {
  it("matches related project slugs to project summaries for work entries", () => {
    const workEntry: TimelineEntry = {
      type: "work",
      title: "Senior Engineer",
      period: { start: "2022", end: null },
      description: "Led platform engineering.",
      relatedProjects: ["project-alpha", "project-beta"],
    };

    const result = resolveProjects(workEntry, allSummaries);

    expect(result).toEqual([projectAlpha, projectBeta]);
  });

  it("returns empty array for non-work entries or entries without relatedProjects", () => {
    const educationEntry: TimelineEntry = {
      type: "education",
      title: "CS Degree",
      period: { start: "2016", end: "2020" },
      description: "Studied CS.",
    };

    const workWithoutRelated: TimelineEntry = {
      type: "work",
      title: "Junior Dev",
      period: { start: "2020", end: "2022" },
      description: "First job.",
    };

    expect(resolveProjects(educationEntry, allSummaries)).toEqual([]);
    expect(resolveProjects(workWithoutRelated, allSummaries)).toEqual([]);
  });

  it("filters out slugs that do not match any project summary", () => {
    const workEntry: TimelineEntry = {
      type: "work",
      title: "Engineer",
      period: { start: "2022", end: null },
      description: "Building things.",
      relatedProjects: ["project-alpha", "nonexistent-slug"],
    };

    const result = resolveProjects(workEntry, allSummaries);

    expect(result).toEqual([projectAlpha]);
  });
});
