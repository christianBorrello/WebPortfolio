import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import type {
  CaseStudySections,
  ProjectCaseStudy,
  ProjectMetric,
  ProjectSummary,
  ProjectType,
} from "@/shared/types/project";
import type { Locale } from "@/i18n/config";

function projectsDir(locale: Locale): string {
  return path.join(process.cwd(), "content", "projects", locale);
}

const REQUIRED_SECTIONS: readonly (keyof CaseStudySections)[] = [
  "theProblem",
  "whatISaw",
  "theDecisions",
  "beyondTheAssignment",
  "whatDidntWork",
  "theBiggerPicture",
  "forNonSpecialists",
];

const VALID_PROJECT_TYPES: readonly ProjectType[] = ["work", "personal"];

function validateString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      `[content-loader] Missing or empty required field "${field}" in ${file}`
    );
  }
  return value.trim();
}

function validateProjectType(value: unknown, file: string): ProjectType {
  if (!VALID_PROJECT_TYPES.includes(value as ProjectType)) {
    throw new Error(
      `[content-loader] Invalid project type "${String(value)}" in ${file}. Expected "work" or "personal".`
    );
  }
  return value as ProjectType;
}

function validateStringArray(
  value: unknown,
  field: string,
  file: string
): readonly string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(
      `[content-loader] "${field}" must be a non-empty array of strings in ${file}`
    );
  }
  return value.map((item, index) => {
    if (typeof item !== "string" || item.trim().length === 0) {
      throw new Error(
        `[content-loader] "${field}[${index}]" must be a non-empty string in ${file}`
      );
    }
    return item.trim();
  });
}

function validateSections(
  value: unknown,
  file: string
): CaseStudySections {
  if (typeof value !== "object" || value === null) {
    throw new Error(
      `[content-loader] "sections" must be an object in ${file}`
    );
  }
  const sections = value as Record<string, unknown>;
  const validated: Record<string, string> = {};

  for (const key of REQUIRED_SECTIONS) {
    validated[key] = validateString(sections[key], `sections.${key}`, file);
  }

  return validated as unknown as CaseStudySections;
}

function validateMetrics(
  value: unknown,
  file: string
): readonly ProjectMetric[] | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (!Array.isArray(value)) {
    throw new Error(
      `[content-loader] "metrics" must be an array in ${file}`
    );
  }
  return value.map((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(
        `[content-loader] "metrics[${index}]" must be an object in ${file}`
      );
    }
    const metric = item as Record<string, unknown>;
    return {
      label: validateString(metric.label, `metrics[${index}].label`, file),
      value: validateString(metric.value, `metrics[${index}].value`, file),
      ...(typeof metric.unit === "string" && metric.unit.trim().length > 0
        ? { unit: metric.unit.trim() }
        : {}),
    };
  });
}

function parseProjectFile(filePath: string): ProjectCaseStudy {
  const fileName = path.basename(filePath);
  let fileContent: string;

  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch {
    throw new Error(
      `[content-loader] Could not read file: ${filePath}`
    );
  }

  let data: Record<string, unknown>;
  try {
    const hasFrontMatter = fileContent.trimStart().startsWith("---");
    if (hasFrontMatter) {
      const parsed = matter(fileContent, {
        engines: {
          yaml: (s: string) => yaml.load(s) as Record<string, unknown>,
        },
      });
      data = parsed.data as Record<string, unknown>;
    } else {
      data = yaml.load(fileContent) as Record<string, unknown>;
    }
  } catch (cause) {
    throw new Error(
      `[content-loader] Malformed YAML in ${fileName}: ${cause instanceof Error ? cause.message : String(cause)}`
    );
  }

  if (typeof data !== "object" || data === null) {
    throw new Error(
      `[content-loader] YAML in ${fileName} did not produce a valid object`
    );
  }

  return {
    slug: validateString(data.slug, "slug", fileName),
    title: validateString(data.title, "title", fileName),
    ...(typeof data.subtitle === "string" && data.subtitle.trim().length > 0
      ? { subtitle: data.subtitle.trim() }
      : {}),
    hook: validateString(data.hook, "hook", fileName),
    type: validateProjectType(data.type, fileName),
    tags: validateStringArray(data.tags, "tags", fileName),
    metrics: validateMetrics(data.metrics, fileName),
    sections: validateSections(data.sections, fileName),
    stack: validateStringArray(data.stack, "stack", fileName),
  };
}

function sortWorkFirst(
  a: ProjectCaseStudy,
  b: ProjectCaseStudy
): number {
  if (a.type === b.type) return 0;
  return a.type === "work" ? -1 : 1;
}

export function getAllProjects(locale: Locale): readonly ProjectCaseStudy[] {
  const dir = projectsDir(locale);

  if (!fs.existsSync(dir)) {
    throw new Error(
      `[content-loader] Projects directory not found: ${dir}`
    );
  }

  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"));

  if (files.length === 0) {
    return [];
  }

  return files
    .map((file) => parseProjectFile(path.join(dir, file)))
    .sort(sortWorkFirst);
}

export function getProjectBySlug(slug: string, locale: Locale): ProjectCaseStudy {
  const projects = getAllProjects(locale);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    throw new Error(
      `[content-loader] Project not found with slug: "${slug}"`
    );
  }

  return project;
}

export function toSummary(project: ProjectCaseStudy): ProjectSummary {
  return {
    slug: project.slug,
    title: project.title,
    hook: project.hook,
    type: project.type,
    tags: project.tags,
    metrics: project.metrics,
  };
}
