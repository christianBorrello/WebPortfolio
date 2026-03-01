# ADR-005: Feature-Based Code Organization over File-Type Organization

## Status

Accepted

## Context

The codebase needs a directory structure that supports independent development of site sections, clear ownership of content, and easy navigation for a solo developer. The site has 4 main features (hero, about, projects, contact) plus shared infrastructure.

## Decision

Organize source code by feature (site section) under `src/features/`. Each feature directory contains all components specific to that section. Shared code lives in `src/shared/`.

```
src/features/hero/
src/features/about/
src/features/projects/
src/features/contact/
src/shared/ui/
src/shared/types/
src/shared/lib/
```

## Alternatives Considered

### File-type organization
Group by file type: `src/components/`, `src/hooks/`, `src/utils/`, `src/types/`. **Rejected because**: File-type organization scatters a feature's code across multiple directories. To understand the contact form, a developer must look in `components/ContactForm.tsx`, `hooks/useContactForm.ts`, `types/contact.ts`, `utils/formValidation.ts`. Feature-based organization keeps all contact-related code in one directory.

### Flat component directory
All components in `src/components/` without subdirectories. **Rejected because**: With 10-15 components, a flat directory becomes difficult to scan. The feature-based approach provides natural grouping that scales without restructuring.

## Consequences

- **Positive**: Each feature is self-contained and independently modifiable
- **Positive**: Clear ownership: "contact form issue" -> look in `src/features/contact/`
- **Positive**: Scales to v2 (persona UX, analytics) without restructuring
- **Negative**: Cross-feature UI consistency requires discipline (use `shared/ui/`)
- **Constraint**: Features must not import from each other. Shared code lives in `shared/`.
