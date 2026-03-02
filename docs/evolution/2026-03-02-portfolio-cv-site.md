# Evolution: portfolio-cv-site

## Summary

Portfolio and CV site for Christian Borrello, built as a Next.js 16 statically generated (SSG) single-page application with dynamic case study routes. The site communicates professional identity, values, project work, and contact availability -- all content-driven through i18n locale files and YAML project data.

## Goal

Build and deploy Christian Borrello's portfolio/CV site as a Next.js SSG application on Vercel, with i18n support, YAML-driven project case studies, Formspree contact form, SEO metadata, and Playwright acceptance tests.

## Execution Timeline

| Marker | Timestamp |
|--------|-----------|
| First step started | 2026-03-01 22:18 UTC |
| Last step committed | 2026-03-02 00:45 UTC |
| Total wall-clock time | ~2 hours 27 minutes |

## Phases Completed

| Phase | Name | Steps | Description |
|-------|------|-------|-------------|
| 01 | Walking Skeleton | 01-01 through 01-06 | Scaffold, deps, i18n, placeholder page, Formspree form, CI workflow |
| 02 | Hero Section | 02-01, 02-02 | Identity statement, CTAs, dark theme styling |
| 03 | About Section | 03-01, 03-02 | Identity, ADHD framing, philosophy, values, styling |
| 04 | Contact Enhancement | 04-01 | Conversational tone, accessibility, polished states |
| 05 | Projects Section | 05-01 through 05-04 | Content loader, card grid, case study template, 5 YAML files |
| 06 | Infrastructure and Polish | 06-01 through 06-03 | SEO/OG metadata, navigation, Playwright acceptance tests |

**Total: 6 phases, 17 steps, 18 commits**

Each step followed the 5-phase TDD cycle: PREPARE, RED_ACCEPTANCE, RED_UNIT, GREEN, COMMIT. Infrastructure and presentational steps documented skip reasons for RED phases (no testable business logic).

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, SSG via `output: "export"`) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| i18n | next-intl |
| Content | YAML files parsed with gray-matter + js-yaml |
| Forms | Formspree (client-side POST) |
| Testing | Playwright (acceptance tests) |
| CI | GitHub Actions (lint, typecheck, build) |
| Deployment target | Vercel (static export) |

## Architectural Decisions

Five ADRs were recorded in `docs/design/adrs/`:

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-001 | Next.js SSG over Astro/Hugo | App Router ecosystem, React component model, Vercel-native deployment |
| ADR-002 | next-intl over next-i18next | App Router native support, type-safe message keys, SSG-compatible |
| ADR-003 | YAML over MDX for project content | Structured data with typed schemas, no rich text needed for case studies |
| ADR-004 | Formspree over API route | SSG-compatible (no server), zero backend, works with static export |
| ADR-005 | Feature-based organization | Colocation of feature components under `src/features/`, shared utilities under `src/shared/` |

## Key Metrics

| Metric | Value |
|--------|-------|
| Steps completed | 17/17 |
| Steps with GREEN pass | 17/17 |
| Commits | 18 |
| TDD cycles executed | 17 (all PASS) |
| RED phases skipped (justified) | 17 (infrastructure/presentational steps) |
| Project YAML files | 5 |
| ADRs recorded | 5 |
| Locale files | 6 (common, hero, about, contact, projects + layout keys) |

## Commit History

```
3b73246 feat(test): set up Playwright with walking skeleton acceptance tests - step 06-03
5cec9c2 feat(nav): add sticky navigation with smooth scroll and responsive mobile menu - step 06-02
d9a8874 feat(seo): add metadata, Open Graph tags, and sitemap generation - step 06-01
9b9505d feat(content): create 5 project YAML files with case study content - step 05-04
80eb5e5 feat(projects): add case study page template with dynamic routing - step 05-03
29871c0 feat(projects): add project card grid with responsive layout - step 05-02
0bb6ac0 feat(content): add build-time content loader for YAML project files - step 05-01
e1688f9 feat(contact): enhance contact section styling and accessibility - step 04-01
7bcddab feat(about): style about section with readable typography and visual hierarchy - step 03-02
b8ce946 feat(about): add about section with identity, ADHD, philosophy, values - step 03-01
8bfa4ca feat(hero): style hero section with dark theme and responsive layout - step 02-02
ca67504 feat(hero): establish visual hierarchy with statement as primary text - step 02-01
d54c645 feat(ci): add GitHub Actions CI workflow with quality gates - step 01-06
e447e08 feat(contact): wire contact form to Formspree with validation - step 01-05
b6e8e8e feat(home): create hero and contact sections with i18n - step 01-04
b97649e feat(i18n): configure next-intl with App Router - step 01-03
9c63b3f feat(scaffold): install runtime deps and create feature directory structure
cee1663 feat(scaffold): clean Next.js boilerplate and initialize project
```

## Notes

- All user-facing text is externalized to i18n locale files; no hardcoded strings in components.
- Project content is fully data-driven: adding a new project requires only a new YAML file in `content/projects/`.
- The walking skeleton approach ensured a deployable foundation existed from step 01-06 onward, with every subsequent step building on a working baseline.
- RED phases (acceptance/unit) were intentionally skipped for infrastructure and presentational-only steps, with documented justification in the execution log. This avoided testing theater (tautological tests with no behavioral assertions).
- The feature directory at `docs/feature/portfolio-cv-site/` is preserved for reference, containing the roadmap, execution log, and design artifacts.
