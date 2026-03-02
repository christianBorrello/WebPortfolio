# Component Boundaries: Italian Localization

## Files to CREATE

| File | Purpose |
|---|---|
| `content/projects/it/*.yaml` | 5 Italian project content files (one per existing English project). Complete translations of the English originals. |
| `messages/it/common.json` | Italian UI strings for shared components (nav, footer, language switcher labels). |
| `messages/it/hero.json` | Italian UI strings for hero section. |
| `messages/it/about.json` | Italian UI strings for about section. |
| `messages/it/projects.json` | Italian UI strings for projects page. |
| `messages/it/contact.json` | Italian UI strings for contact page. |
| `docs/design/adrs/adr-007-locale-directories-for-content.md` | ADR documenting the YAML localization strategy (content from architecture-design.md ADR-007 section). |

Note: the exact set of `messages/it/*.json` files mirrors whatever `messages/en/*.json` files exist. Each is a copy of the English file with values translated to Italian. Keys remain identical.

## Files to MODIFY

| File | Change Summary |
|---|---|
| `src/i18n/config.ts` | Add `"it"` to the `locales` array. |
| `src/shared/lib/content-loader.ts` | Add `locale: Locale` parameter (from `@/i18n/config`) to `getAllProjects()` and `getProjectBySlug()`. Change read path from `content/projects/` to `content/projects/${locale}/`. |
| `src/features/projects/project-grid.tsx` | Pass `locale` (from `useLocale()`) to `getAllProjects(locale)`. |
| `src/app/[locale]/projects/[slug]/page.tsx` | Pass `locale` (from route params) to `getProjectBySlug(slug, locale)` and `getAllProjects(locale)` in `generateStaticParams()`. |
| `src/app/sitemap.ts` | Import `locales` from config. Generate URLs for all locales instead of hardcoded `/en/`. Pass locale to `getAllProjects(locale)`. |
| `src/shared/lib/metadata.ts` | Accept `locale` parameter. Generate canonical URL with locale. Add `alternates.languages` with hreflang entries for all locales. |
| `middleware.ts` | Change matcher from `"/(en)/:path*"` to `"/(en\|it)/:path*"`. |

## Files to CREATE (New Component)

| File | Purpose |
|---|---|
| `src/features/navigation/language-switcher.tsx` | Language toggle component. Spec below. |

Note: the exact file path depends on existing navigation component organization. If navigation components live elsewhere (e.g., `src/shared/components/`), place the switcher there instead.

### LanguageSwitcher Specification

- **Client component** (`"use client"`) -- requires browser hooks for current locale and path.
- Uses `useLocale()` from next-intl to read the active locale.
- Uses `usePathname()` from next-intl to read the current path (without locale prefix).
- Renders a link/button showing the OTHER locale: if current locale is `en`, displays `IT`; if `it`, displays `EN`.
- Uses next-intl's `Link` component with the `locale` prop to navigate to the same path in the other locale. No custom routing logic.
- **Placement**: inside the Navigation component, visible on both desktop and mobile layouts.
- **No fallback needed**: both locales always serve the same set of pages, enforced by `generateStaticParams()` iterating all locales.

## Content File Translation Rules

Each Italian YAML file in `content/projects/it/` is a complete translation of its English counterpart in `content/projects/en/`.

| Field | Translate? | Rationale |
|-------|-----------|-----------|
| `slug` | Never | Must match English for URL routing consistency |
| `title` | Case by case | Product names (SagitterHub) stay unchanged; descriptive titles get translated |
| `subtitle` | Yes | Business context description |
| `hook` | Yes | Value proposition shown on project cards |
| `type` | Never | Enum value (`work` / `personal`) used in code logic |
| `tags` | Never | Technical terms (.NET, React, Azure, DDD) |
| `metrics.label` | Yes | Human-readable metric name (e.g., "Code Coverage" → "Copertura del codice") |
| `metrics.value` | Never | Numeric/symbolic values (">90%") |
| `metrics.unit` | Case by case | Technical acronyms (TDD) stay; natural language units get translated |
| `sections.*` | Yes | All 7 prose sections fully translated |
| `stack` | Never | Tool and technology names (.NET 8.0, React 19, Docker) |

## Files to MOVE

| From | To |
|---|---|
| `content/projects/*.yaml` (5 files) | `content/projects/en/*.yaml` |

The existing English YAML files move into an `en/` subdirectory. This is a file move, not a content change. Git tracks it as a rename.

## Files to DELETE

None.

## Unchanged Files

| File | Why Unchanged |
|---|---|
| `src/shared/types/project.ts` | `ProjectCaseStudy` and `ProjectSummary` interfaces are locale-independent. Each locale file conforms to the same schema. |
| `next.config.ts` | next-intl configuration is in `src/i18n/config.ts`, not in Next.js config. |
| All React components using `useTranslations()` | They already read from locale-specific message files. Adding `messages/it/*.json` is sufficient. |
| `src/features/contact/contact-form.tsx` | Contact form behavior is locale-independent. UI strings already use `useTranslations()`. |
| `src/app/api/contact/route.ts` | API route is locale-independent. |

## Change Impact Summary

| Metric | Value |
|---|---|
| New production files | 1 (language-switcher.tsx) |
| New content files | 5 (Italian YAML) + N (Italian message JSONs) |
| Moved content files | 5 (English YAML into `en/` subdirectory) |
| Modified production files | 5 (content-loader, project-grid, case-study page, sitemap, metadata) |
| Modified config files | 2 (i18n config, middleware) |
| New docs | 1 (ADR-007) |
| Deleted files | 0 |
| New dependencies | 0 |
