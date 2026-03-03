import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { Locale } from "@/i18n/config";
import type {
  ExperienceData,
  TimelineEntry,
  TimelineEntryType,
  TimelinePeriod,
} from "@/shared/types/experience";

const VALID_ENTRY_TYPES: readonly TimelineEntryType[] = [
  "work",
  "education",
  "project",
];

function experienceFilePath(locale: Locale): string {
  return path.join(process.cwd(), "content", "experience", `${locale}.yaml`);
}

function validateString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      `[experience-loader] Missing or empty required field "${field}" in ${file}`
    );
  }
  return value.trim();
}

function validateEntryType(
  value: unknown,
  file: string
): TimelineEntryType {
  if (!VALID_ENTRY_TYPES.includes(value as TimelineEntryType)) {
    throw new Error(
      `[experience-loader] Invalid entry type "${String(value)}" in ${file}. Expected "work", "education", or "project".`
    );
  }
  return value as TimelineEntryType;
}

function validatePeriod(
  value: unknown,
  file: string
): TimelinePeriod {
  if (typeof value !== "object" || value === null) {
    throw new Error(
      `[experience-loader] "period" must be an object in ${file}`
    );
  }
  const period = value as Record<string, unknown>;
  return {
    start: validateString(period.start, "period.start", file),
    end:
      period.end === null || period.end === undefined
        ? null
        : validateString(period.end, "period.end", file),
  };
}

function validateOptionalStringArray(
  value: unknown,
  field: string,
  file: string
): readonly string[] | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (!Array.isArray(value)) {
    throw new Error(
      `[experience-loader] "${field}" must be an array in ${file}`
    );
  }
  return value.map((item, index) => {
    if (typeof item !== "string" || item.trim().length === 0) {
      throw new Error(
        `[experience-loader] "${field}[${index}]" must be a non-empty string in ${file}`
      );
    }
    return item.trim();
  });
}

function validateEntry(
  value: unknown,
  index: number,
  file: string
): TimelineEntry {
  if (typeof value !== "object" || value === null) {
    throw new Error(
      `[experience-loader] "entries[${index}]" must be an object in ${file}`
    );
  }
  const entry = value as Record<string, unknown>;
  const prefix = `entries[${index}]`;

  return {
    type: validateEntryType(entry.type, file),
    title: validateString(entry.title, `${prefix}.title`, file),
    ...(typeof entry.organization === "string" &&
    entry.organization.trim().length > 0
      ? { organization: entry.organization.trim() }
      : {}),
    period: validatePeriod(entry.period, file),
    description: validateString(
      entry.description,
      `${prefix}.description`,
      file
    ),
    ...(entry.highlights !== undefined
      ? {
          highlights: validateOptionalStringArray(
            entry.highlights,
            `${prefix}.highlights`,
            file
          ),
        }
      : {}),
    ...(entry.technologies !== undefined
      ? {
          technologies: validateOptionalStringArray(
            entry.technologies,
            `${prefix}.technologies`,
            file
          ),
        }
      : {}),
    ...(entry.relatedProjects !== undefined
      ? {
          relatedProjects: validateOptionalStringArray(
            entry.relatedProjects,
            `${prefix}.relatedProjects`,
            file
          ),
        }
      : {}),
    ...(typeof entry.projectSlug === "string" &&
    entry.projectSlug.trim().length > 0
      ? { projectSlug: entry.projectSlug.trim() }
      : {}),
  };
}

export function getExperience(locale: Locale): ExperienceData {
  const filePath = experienceFilePath(locale);
  const fileName = path.basename(filePath);

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch {
    throw new Error(
      `[experience-loader] Could not read experience file: ${filePath}`
    );
  }

  let data: Record<string, unknown>;
  try {
    data = yaml.load(fileContent) as Record<string, unknown>;
  } catch (cause) {
    throw new Error(
      `[experience-loader] Malformed YAML in ${fileName}: ${cause instanceof Error ? cause.message : String(cause)}`
    );
  }

  if (typeof data !== "object" || data === null) {
    throw new Error(
      `[experience-loader] YAML in ${fileName} did not produce a valid object`
    );
  }

  if (!Array.isArray(data.entries)) {
    throw new Error(
      `[experience-loader] "entries" must be an array in ${fileName}`
    );
  }

  const entries: readonly TimelineEntry[] = data.entries.map(
    (entry: unknown, index: number) => validateEntry(entry, index, fileName)
  );

  return { entries };
}
