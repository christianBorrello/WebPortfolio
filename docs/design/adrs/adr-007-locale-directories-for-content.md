# ADR-007: Separate Locale Directories for Project Content

## Status

Accepted

## Context

The site has 5 YAML project files in `content/projects/`. Each file contains ~80 lines of translatable prose (title, hook, metrics, sections) alongside locale-independent fields (slug, type, tags, stack). Adding Italian requires a strategy for localized content that preserves type safety, authoring simplicity, and build-time validation. The existing content loader reads from a flat directory. The existing TypeScript interfaces (`ProjectCaseStudy`, `ProjectSummary`) are well-typed and readonly.

## Decision

Organize content as separate complete YAML files in locale-specific subdirectories:

```
content/projects/en/sagitterhub.yaml
content/projects/it/sagitterhub.yaml
```

The content loader accepts a `locale` parameter and reads from `content/projects/${locale}/`.

## Alternatives Considered

### Locale-keyed fields in single YAML file

Each project file would contain a `locales` object with `en` and `it` sub-keys for translatable fields, plus shared top-level fields (slug, type, tags, stack). **Rejected because**: Files grow to 160+ lines with 2 locales, degrading YAML readability with multiline strings nested 3 levels deep. The content loader needs merge logic (combine shared + locale-specific fields). TypeScript types must split into shared and localized facets. Translator workflow requires understanding YAML nesting. With only 5 projects and 5 shared fields (~8 lines each), the duplication cost of separate files is negligible.

### Headless CMS with locale support

Store content in a CMS (Contentful, Strapi) with built-in locale management. **Rejected because**: The site is statically exported with version-controlled YAML (ADR-003). A CMS is over-engineered for 5 project files and 2 locales. Introduces external service dependency, contradicts YAGNI.

## Consequences

- **Positive**: Zero loader complexity -- directory path parameterized by locale
- **Positive**: TypeScript types remain unchanged
- **Positive**: Each file is independently readable, editable, and diffable
- **Positive**: Translator receives a complete standalone file
- **Negative**: Shared fields (slug, type, tags, stack) duplicated across locale files (~8 lines per project)
- **Negative**: Changes to shared fields require updating both locale files
- **Mitigation**: Build-time validation can verify shared field consistency across locales if drift becomes a concern
