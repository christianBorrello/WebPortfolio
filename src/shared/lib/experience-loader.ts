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

const ERROR_PREFIX = "[experience-loader]";

const VALID_ENTRY_TYPES: readonly TimelineEntryType[] = [
  "work",
  "education",
  "project",
];

function experienceFilePath(locale: Locale): string {
  return path.join(process.cwd(), "content", "experience", `${locale}.yaml`);
}

function validationError(message: string, file: string): Error {
  return new Error(`${ERROR_PREFIX} ${message} in ${file}`);
}

function validateString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw validationError(`Missing or empty required field "${field}"`, file);
  }
  return value.trim();
}

function validateEntryType(
  value: unknown,
  file: string
): TimelineEntryType {
  if (!VALID_ENTRY_TYPES.includes(value as TimelineEntryType)) {
    throw validationError(
      `Invalid entry type "${String(value)}". Expected "work", "education", or "project".`,
      file
    );
  }
  return value as TimelineEntryType;
}

function validateOptionalStartMonth(
  value: unknown,
  file: string
): number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > 12) {
    throw validationError(
      `"period.startMonth" must be an integer between 1 and 12, got "${String(value)}"`,
      file
    );
  }
  return value;
}

function validatePeriod(
  value: unknown,
  file: string
): TimelinePeriod {
  if (typeof value !== "object" || value === null) {
    throw validationError(`"period" must be an object`, file);
  }
  const period = value as Record<string, unknown>;
  const startMonth = validateOptionalStartMonth(period.startMonth, file);
  return {
    start: validateString(period.start, "period.start", file),
    ...(startMonth !== undefined && { startMonth }),
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
    throw validationError(`"${field}" must be an array`, file);
  }
  return value.map((item, index) => {
    if (typeof item !== "string" || item.trim().length === 0) {
      throw validationError(
        `"${field}[${index}]" must be a non-empty string`,
        file
      );
    }
    return item.trim();
  });
}

function optionalTrimmedString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function validateEntry(
  value: unknown,
  index: number,
  file: string
): TimelineEntry {
  if (typeof value !== "object" || value === null) {
    throw validationError(`"entries[${index}]" must be an object`, file);
  }
  const entry = value as Record<string, unknown>;
  const prefix = `entries[${index}]`;

  const organization = optionalTrimmedString(entry.organization);
  const highlights = validateOptionalStringArray(entry.highlights, `${prefix}.highlights`, file);
  const technologies = validateOptionalStringArray(entry.technologies, `${prefix}.technologies`, file);
  const relatedProjects = validateOptionalStringArray(entry.relatedProjects, `${prefix}.relatedProjects`, file);
  const projectSlug = optionalTrimmedString(entry.projectSlug);

  return {
    type: validateEntryType(entry.type, file),
    title: validateString(entry.title, `${prefix}.title`, file),
    period: validatePeriod(entry.period, file),
    description: validateString(entry.description, `${prefix}.description`, file),
    ...(organization !== undefined && { organization }),
    ...(highlights !== undefined && { highlights }),
    ...(technologies !== undefined && { technologies }),
    ...(relatedProjects !== undefined && { relatedProjects }),
    ...(projectSlug !== undefined && { projectSlug }),
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
      `${ERROR_PREFIX} Could not read experience file: ${filePath}`
    );
  }

  let data: Record<string, unknown>;
  try {
    data = yaml.load(fileContent) as Record<string, unknown>;
  } catch (cause) {
    throw new Error(
      `${ERROR_PREFIX} Malformed YAML in ${fileName}: ${cause instanceof Error ? cause.message : String(cause)}`
    );
  }

  if (typeof data !== "object" || data === null) {
    throw validationError("YAML did not produce a valid object", fileName);
  }

  if (!Array.isArray(data.entries)) {
    throw validationError(`"entries" must be an array`, fileName);
  }

  const entries: readonly TimelineEntry[] = data.entries.map(
    (entry: unknown, index: number) => validateEntry(entry, index, fileName)
  );

  return { entries };
}
