# ADR-003: YAML for Project Content over MDX

## Status

Accepted

## Context

Project case studies follow a strict 8-section template. The content is structured data (title, slug, type, sections, stack, metrics), not free-form prose. The content format must be readable for authoring, type-safe for rendering, and easy to validate.

## Decision

Store project content as YAML files in `content/projects/{slug}.yaml`. Parse at build time using gray-matter and js-yaml. TypeScript interfaces enforce the 8-section template structure.

## Alternatives Considered

### MDX (Markdown with JSX)
Standard for content-heavy sites. Supports embedded React components. **Rejected because**: MDX is optimized for free-form prose with optional structure. The case study template is the opposite: rigid structure with prose inside each section. YAML enforces that all 8 sections are present at the type level. With MDX, missing sections would only be caught by visual inspection.

### Contentlayer
Type-safe content layer with automatic TypeScript generation from content files. **Rejected because**: Contentlayer has had no releases since 2023 and is effectively unmaintained. Depending on an abandoned library contradicts the project's open-source-first principle of using well-maintained tools.

## Consequences

- **Positive**: YAML enforces structured content -- missing sections cause build-time type errors
- **Positive**: Content is cleanly separated from rendering logic
- **Positive**: Adding a new project means adding one YAML file -- no code changes
- **Negative**: YAML is less readable than Markdown for long-form text (multiline strings require `|` syntax)
- **Negative**: No inline formatting (bold, links) without adding a Markdown rendering step inside sections
- **Mitigation**: If inline formatting is needed in v2, individual YAML section values can be parsed as Markdown at build time
