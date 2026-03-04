import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const CONTENT_DIR = path.join(process.cwd(), "content", "experience");
const MESSAGES_DIR = path.join(process.cwd(), "messages");
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects", "en");

const REQUIRED_MESSAGE_KEYS = [
  "heading",
  "subtext",
  "type_work",
  "type_education",
  "type_project",
  "present",
  "read_case_study",
];

function loadYaml(locale: string): Record<string, unknown> {
  const filePath = path.join(CONTENT_DIR, `${locale}.yaml`);
  const content = fs.readFileSync(filePath, "utf-8");
  return yaml.load(content) as Record<string, unknown>;
}

function loadMessages(locale: string): Record<string, string> {
  const filePath = path.join(MESSAGES_DIR, locale, "experience.json");
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

function existingProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .map((f) => f.replace(".yaml", ""));
}

type Entry = {
  readonly type: string;
  readonly title: string;
  readonly description: string;
  readonly period: { readonly start: string; readonly end: string | null };
  readonly relatedProjects?: readonly string[];
  readonly projectSlug?: string;
};

function entriesOfType(
  data: Record<string, unknown>,
  type: string
): Entry[] {
  const entries = data.entries as Entry[];
  return entries.filter((e) => e.type === type);
}

test.describe("Experience Content -- YAML and i18n messages", () => {
  test("EN experience YAML contains all three entry types with valid fields", () => {
    const data = loadYaml("en");
    const entries = data.entries as Entry[];

    const workEntries = entriesOfType(data, "work");
    const educationEntries = entriesOfType(data, "education");
    const projectEntries = entriesOfType(data, "project");

    expect(workEntries.length).toBeGreaterThanOrEqual(1);
    expect(educationEntries.length).toBeGreaterThanOrEqual(1);
    expect(projectEntries.length).toBeGreaterThanOrEqual(1);

    for (const entry of entries) {
      expect(entry.title.trim().length).toBeGreaterThan(0);
      expect(entry.description.trim().length).toBeGreaterThan(0);
      expect(entry.period.start.trim().length).toBeGreaterThan(0);
    }
  });

  test("IT experience YAML contains all three entry types with valid fields", () => {
    const data = loadYaml("it");
    const entries = data.entries as Entry[];

    const workEntries = entriesOfType(data, "work");
    const educationEntries = entriesOfType(data, "education");
    const projectEntries = entriesOfType(data, "project");

    expect(workEntries.length).toBeGreaterThanOrEqual(1);
    expect(educationEntries.length).toBeGreaterThanOrEqual(1);
    expect(projectEntries.length).toBeGreaterThanOrEqual(1);

    for (const entry of entries) {
      expect(entry.title.trim().length).toBeGreaterThan(0);
      expect(entry.description.trim().length).toBeGreaterThan(0);
      expect(entry.period.start.trim().length).toBeGreaterThan(0);
    }
  });

  test("work entry references existing project slugs", () => {
    const data = loadYaml("en");
    const workEntries = entriesOfType(data, "work");
    const slugs = existingProjectSlugs();

    const entriesWithRelated = workEntries.filter(
      (e) => e.relatedProjects && e.relatedProjects.length > 0
    );
    expect(entriesWithRelated.length).toBeGreaterThanOrEqual(1);

    for (const entry of entriesWithRelated) {
      for (const slug of entry.relatedProjects!) {
        expect(slugs).toContain(slug);
      }
    }
  });

  test("EN experience messages contain all required keys", () => {
    const messages = loadMessages("en");

    for (const key of REQUIRED_MESSAGE_KEYS) {
      expect(messages).toHaveProperty(key);
      expect(typeof messages[key]).toBe("string");
      expect(messages[key].trim().length).toBeGreaterThan(0);
    }
  });

  test("IT experience messages contain all required keys", () => {
    const messages = loadMessages("it");

    for (const key of REQUIRED_MESSAGE_KEYS) {
      expect(messages).toHaveProperty(key);
      expect(typeof messages[key]).toBe("string");
      expect(messages[key].trim().length).toBeGreaterThan(0);
    }
  });
});
