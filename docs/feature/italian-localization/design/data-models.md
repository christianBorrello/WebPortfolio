# Data Models: Italian Localization

## YAML Schema: No Change

The YAML schema for project files is unchanged. Each locale file is a complete, standalone project definition conforming to the existing schema.

### Current schema (unchanged)

```yaml
slug: string           # URL-safe identifier, e.g. "sagitterhub"
title: string          # Project title
subtitle: string?      # Optional subtitle
hook: string           # One-line project description
type: "work" | "personal"
tags: string[]         # Technology/domain tags
metrics:               # Optional measurable outcomes
  - label: string
    value: string
sections:
  theProblem: string   # Multiline prose (|)
  theApproach: string
  keyFeatures: string
  technicalHighlights: string
  lessonsLearned: string
  outcome: string
  whatIWouldDoDifferently: string
stack: string[]        # Technologies used
```

### Example: Italian file (`content/projects/it/sagitterhub.yaml`)

```yaml
slug: sagitterhub
title: SagitterHub
hook: "Piattaforma web per la gestione degli studi veterinari"
type: work
tags: [React, Node.js, PostgreSQL]
metrics:
  - label: "Riduzione tempi di gestione"
    value: "40%"
sections:
  theProblem: |
    Gli studi veterinari gestivano appuntamenti e cartelle cliniche...
  theApproach: |
    Progettazione di un sistema centralizzato...
  # ... remaining sections
stack: [React, Node.js, Express, PostgreSQL, Docker]
```

Note: `slug`, `type`, `tags`, and `stack` are duplicated from the English file. These shared fields must remain consistent across locales. `title` may or may not differ (proper nouns often stay the same). `hook`, `metrics`, and `sections` are fully translated.

## TypeScript Types: No Change

The existing interfaces in `src/shared/types/project.ts` remain unchanged.

### ProjectCaseStudy (unchanged)

```typescript
// Full project with all sections -- used on project detail pages
readonly interface ProjectCaseStudy {
  readonly slug: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly hook: string;
  readonly type: "work" | "personal";
  readonly tags: readonly string[];
  readonly metrics?: readonly { readonly label: string; readonly value: string }[];
  readonly sections: {
    readonly theProblem: string;
    readonly theApproach: string;
    readonly keyFeatures: string;
    readonly technicalHighlights: string;
    readonly lessonsLearned: string;
    readonly outcome: string;
    readonly whatIWouldDoDifferently: string;
  };
  readonly stack: readonly string[];
}
```

### ProjectSummary (unchanged)

```typescript
// Subset used in project grid/listing
readonly interface ProjectSummary {
  readonly slug: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly hook: string;
  readonly type: "work" | "personal";
  readonly tags: readonly string[];
}
```

These types describe the shape of a single locale's project file. Since Option A uses complete files per locale (not merged/split structures), no type changes are needed.

## Content Loader Function Signatures

### Current

```typescript
function getAllProjects(): ProjectSummary[]
function getProjectBySlug(slug: string): ProjectCaseStudy | undefined
```

### After

```typescript
function getAllProjects(locale: string): ProjectSummary[]
function getProjectBySlug(slug: string, locale: string): ProjectCaseStudy | undefined
```

The `locale` parameter changes the directory read path. No return type changes. No new types introduced.

## Directory Structure: Before and After

### Before

```
content/
  projects/
    sagitterhub.yaml
    project-b.yaml
    project-c.yaml
    project-d.yaml
    project-e.yaml
```

### After

```
content/
  projects/
    en/
      sagitterhub.yaml
      project-b.yaml
      project-c.yaml
      project-d.yaml
      project-e.yaml
    it/
      sagitterhub.yaml
      project-b.yaml
      project-c.yaml
      project-d.yaml
      project-e.yaml
```

## Shared Field Consistency

Fields that should be identical across locale files for the same project:

| Field | Reason |
|---|---|
| `slug` | Used in URL routing. Must match across locales for language switching. |
| `type` | Classification. Not a user-facing string. |
| `tags` | Technology names are English by convention (React, Docker). |
| `stack` | Technology names are English by convention. |

Fields that differ across locales:

| Field | Reason |
|---|---|
| `title` | May differ for non-proper-noun projects. |
| `subtitle` | Translated. |
| `hook` | Translated. |
| `metrics[].label` | Translated (e.g., "Time saved" vs "Tempo risparmiato"). |
| `metrics[].value` | May differ (e.g., number formatting, percentage labels). |
| `sections.*` | All prose is fully translated. |

Build-time consistency validation (optional, not in v1): a script could compare `slug`, `type`, `tags`, and `stack` fields across `en/` and `it/` files for the same slug and report mismatches.
