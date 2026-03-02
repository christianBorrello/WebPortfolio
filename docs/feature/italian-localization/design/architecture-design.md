# Architecture Design: Italian Localization

## Overview

Add Italian (`it`) as a second locale to the portfolio site. The i18n infrastructure (next-intl) already handles UI strings, routing, and locale detection. The open decision is how to organize localized YAML project content.

## ADR-007: Separate Locale Directories for Project Content

### Status

Accepted

### Context

The site has 5 YAML project files in `content/projects/`. Each file contains ~80 lines of translatable prose (title, hook, metrics, sections) alongside locale-independent fields (slug, type, tags, stack). The content loader reads from a flat directory and returns typed project data. Adding Italian requires a strategy for localized content that preserves type safety, authoring simplicity, and build-time validation.

### Decision

Organize content as separate complete YAML files in locale-specific subdirectories:

```
content/projects/en/sagitterhub.yaml
content/projects/en/project-b.yaml
content/projects/it/sagitterhub.yaml
content/projects/it/project-b.yaml
```

The content loader accepts a `locale` parameter and reads from `content/projects/${locale}/`.

### Alternatives Considered

#### Locale-keyed fields in single YAML file

Each project file would contain a `locales` object with `en` and `it` sub-keys for translatable fields, plus shared top-level fields (slug, type, tags, stack).

**Rejected because**:
- Files grow to 160+ lines with 2 locales, 240+ with 3. YAML readability degrades at that size, especially with multiline `|` strings nested 3 levels deep (`locales.it.sections.theProblem`).
- The content loader needs merge logic (combine shared fields with locale-specific fields). This adds complexity to a currently simple file reader.
- TypeScript types must split into `SharedProjectFields` and `LocalizedProjectFields` with a merge type. The current flat `ProjectCaseStudy` interface works as-is with Option A.
- Translator workflow is harder: editing deeply nested YAML vs editing a complete standalone file.
- With only 5 project files, the duplication of 5 shared fields (slug, type, tags, stack, sections key names) per file is negligible -- approximately 8 lines duplicated per project.

#### CMS or database-backed content

Store content in a headless CMS with locale support (e.g., Contentful, Strapi).

**Rejected because**: The site is statically exported. YAML files are version-controlled, diffable, and require no external service. A CMS is over-engineered for 5 project files and 2 locales. Contradicts YAGNI and the existing ADR-003 decision for YAML.

### Consequences

- **Positive**: Zero loader complexity -- directory path parameterized by locale
- **Positive**: TypeScript types (`ProjectCaseStudy`, `ProjectSummary`) remain unchanged
- **Positive**: Each file is independently readable, editable, and diffable
- **Positive**: Translator receives a complete file to translate, no YAML nesting knowledge needed
- **Negative**: Shared fields (slug, type, tags, stack) are duplicated across locale files (~8 lines per project)
- **Negative**: Changes to shared fields (e.g., adding a tag) require updating both locale files
- **Mitigation**: With 5 projects and 2 locales, the duplication is 10 files total. A build-time validation step can verify slug/type/tags/stack consistency across locales if drift becomes a concern.

## Locale Flow: Route to Content

```
URL: /it/projects/sagitterhub
         |
         v
[locale] param from Next.js dynamic route segment
         |
         v
next-intl middleware validates locale ("en" | "it")
         |
         v
Page component receives locale from params
         |
    +----+----+
    |         |
    v         v
UI strings:  Content:
useTranslations()  getProjectBySlug(slug, locale)
reads messages/it/*.json  reads content/projects/it/sagitterhub.yaml
```

All components already receive `locale` via `useLocale()` (next-intl) or via the `[locale]` route param. The only wiring change is passing locale into the content loader functions.

## Content Loader API Changes

`Locale` type is imported from `@/i18n/config` (the union of configured locale strings, currently `"en" | "it"`).

Current:
- `getAllProjects(): ProjectSummary[]`
- `getProjectBySlug(slug: string): ProjectCaseStudy | undefined`

New:
- `getAllProjects(locale: Locale): ProjectSummary[]`
- `getProjectBySlug(slug: string, locale: Locale): ProjectCaseStudy | undefined`

Internal change: read from `content/projects/${locale}/` instead of `content/projects/`.

The `locale` parameter is required (no default) and typed as `Locale` (not `string`). This forces all call sites to be explicit about which locale they need and prevents passing arbitrary strings.

### `generateStaticParams()` in `[slug]/page.tsx`

The project detail page must generate params for every slug in every locale so the static export produces all combinations.

Before (English only):
```
generateStaticParams():
  projects = getAllProjects()
  return projects.map(p => ({ slug: p.slug }))
```

After (all locales):
```
generateStaticParams():
  params = []
  for each locale in routing.locales:
    projects = getAllProjects(locale)
    for each project in projects:
      params.push({ locale, slug: project.slug })
  return params
```

This ensures `next build` generates a static page for every locale + slug combination (e.g., `/en/projects/sagitterhub` and `/it/projects/sagitterhub`).

## Language Switcher

A new `LanguageSwitcher` component allows users to toggle between `en` and `it`.

- Placement: site header/navigation, visible on all pages
- Behavior: navigates to the same page in the other locale (e.g., `/en/projects/foo` to `/it/projects/foo`)
- Implementation note: next-intl provides `usePathname()` and `Link` with locale prop for this pattern. No custom routing logic needed.
- Static export compatible: generates links to pre-rendered locale paths, no server-side redirect.

## SEO and Sitemap

### Sitemap (`src/app/sitemap.ts`)

Currently hardcodes `/en/` URLs. Updated to iterate over all locales and all projects:

```
For each locale in ["en", "it"]:
  - /{locale}
  - /{locale}/projects
  - /{locale}/projects/{slug}  (for each project)
  - /{locale}/contact
```

### Metadata (`src/shared/lib/metadata.ts`)

Currently hardcodes `/en/projects/${slug}`. Updated signatures:

- `buildHomeMetadata(description: string, locale: Locale): Metadata`
- `buildCaseStudyMetadata(title: string, description: string, slug: string, locale: Locale): Metadata`

Both functions produce:
- `canonical` using `/${locale}/` prefix
- `alternates.languages` with full URLs for every configured locale

```
canonical: https://christianborrello.dev/{locale}/projects/{slug}
alternates.languages:
  en: https://christianborrello.dev/en/projects/{slug}
  it: https://christianborrello.dev/it/projects/{slug}
```

### Middleware (`middleware.ts`)

Matcher pattern changes from `"/(en)/:path*"` to `"/(en|it)/:path*"`. The `locales` array in `src/i18n/config.ts` gets `"it"` added.

## Hardcoded Path Fixes

| File | Current | After |
|---|---|---|
| `middleware.ts` | `"/(en)/:path*"` | `"/(en\|it)/:path*"` |
| `src/app/sitemap.ts` | Hardcoded `/en/` URLs | Iterate over `locales` from config |
| `src/shared/lib/metadata.ts` | Hardcoded `/en/projects/${slug}` | Use locale param, add `alternates.languages` |

**Note on middleware matcher**: The matcher string `"/(en|it)/:path*"` must remain hardcoded. Next.js `config.matcher` requires a static string literal evaluated at build time -- it cannot reference a runtime variable or imported array. This means adding a 3rd locale requires updating both `src/i18n/config.ts` (the `locales` array) and `middleware.ts` (the matcher pattern). This duplication is acceptable under YAGNI for 2 locales.

## Static Export Compatibility

All changes are compatible with `output: "export"`:
- Locale directories are read at build time by the content loader
- `generateStaticParams()` returns params for all locale + slug combinations
- The language switcher uses `<Link>` to pre-rendered paths
- The sitemap is generated at build time
- No server-side features are introduced

## Acceptance Criteria

Observable behaviors that validate the feature is complete:

1. **Italian UI**: User navigates to `/it` -- all UI text (nav, headings, labels, footer) renders in Italian.
2. **Italian project content**: User navigates to `/it/projects/sagitterhub` -- case study title, hook, metrics, and section prose are in Italian.
3. **Language switcher**: User clicks the language switcher on any page -- browser navigates to the same page in the other locale (e.g., `/en/contact` to `/it/contact` and vice versa).
4. **Static generation**: `next build` generates static HTML pages for both locales across all routes (every project slug appears under both `/en/projects/` and `/it/projects/`).
5. **Sitemap**: The generated sitemap contains URLs for both `/en/` and `/it/` variants of every page.
6. **Build-time validation**: If an Italian YAML content file is missing (e.g., `content/projects/it/sagitterhub.yaml` does not exist), the build fails with a descriptive error identifying the missing file.
