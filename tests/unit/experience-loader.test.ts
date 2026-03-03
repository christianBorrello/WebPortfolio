import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { getExperience } from "@/shared/lib/experience-loader";
import type { ExperienceData } from "@/shared/types/experience";

const FIXTURE_DIR = path.join(process.cwd(), "content", "experience");

function writeFixture(locale: string, data: unknown): void {
  fs.mkdirSync(FIXTURE_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(FIXTURE_DIR, `${locale}.yaml`),
    yaml.dump(data),
    "utf-8"
  );
}

function removeFixtureDir(): void {
  if (fs.existsSync(FIXTURE_DIR)) {
    fs.rmSync(FIXTURE_DIR, { recursive: true });
  }
}

const validExperienceData = {
  entries: [
    {
      type: "work",
      title: "Senior Software Engineer",
      organization: "Acme Corp",
      period: { start: "2022", end: null },
      description: "Led platform engineering.",
      highlights: ["Reduced deploy time by 60%"],
      technologies: [".NET", "React"],
      relatedProjects: ["project-alpha"],
    },
    {
      type: "education",
      title: "Computer Science Degree",
      organization: "University",
      period: { start: "2016", end: "2020" },
      description: "Studied algorithms and systems.",
    },
    {
      type: "project",
      title: "Side Project",
      period: { start: "2023", end: "2023" },
      description: "Built for learning.",
      technologies: ["Unity", "C#"],
      projectSlug: "unity-soulslike",
    },
  ],
};

describe("experience-loader", () => {
  beforeEach(() => {
    removeFixtureDir();
  });

  afterEach(() => {
    removeFixtureDir();
  });

  it("loads and validates experience YAML returning ExperienceData", () => {
    writeFixture("en", validExperienceData);

    const result: ExperienceData = getExperience("en");

    expect(result.entries).toHaveLength(3);
    expect(result.entries[0].type).toBe("work");
    expect(result.entries[0].title).toBe("Senior Software Engineer");
    expect(result.entries[0].period.start).toBe("2022");
    expect(result.entries[0].period.end).toBeNull();
    expect(result.entries[0].organization).toBe("Acme Corp");
    expect(result.entries[0].highlights).toEqual(["Reduced deploy time by 60%"]);
    expect(result.entries[0].technologies).toEqual([".NET", "React"]);
    expect(result.entries[0].relatedProjects).toEqual(["project-alpha"]);

    expect(result.entries[1].type).toBe("education");
    expect(result.entries[1].title).toBe("Computer Science Degree");

    expect(result.entries[2].type).toBe("project");
    expect(result.entries[2].projectSlug).toBe("unity-soulslike");
  });

  it("throws descriptive error when locale file is missing", () => {
    expect(() => getExperience("en")).toThrow(/experience/i);
  });

  it("throws descriptive error for invalid entry type", () => {
    writeFixture("en", {
      entries: [
        {
          type: "invalid",
          title: "Something",
          period: { start: "2022", end: null },
          description: "A description.",
        },
      ],
    });

    expect(() => getExperience("en")).toThrow(/type/i);
  });

  it("throws descriptive error for empty title", () => {
    writeFixture("en", {
      entries: [
        {
          type: "work",
          title: "",
          period: { start: "2022", end: null },
          description: "A description.",
        },
      ],
    });

    expect(() => getExperience("en")).toThrow(/title/i);
  });

  it("throws descriptive error for missing period.start", () => {
    writeFixture("en", {
      entries: [
        {
          type: "work",
          title: "Engineer",
          period: { end: null },
          description: "A description.",
        },
      ],
    });

    expect(() => getExperience("en")).toThrow(/start/i);
  });
});
