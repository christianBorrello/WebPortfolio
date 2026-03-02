# Italian Localization -- Evolution Document

**Date**: 2026-03-02
**Project ID**: italian-localization
**Status**: COMPLETE

## Goal

Add full Italian localization to the portfolio site: Italian UI strings, Italian YAML project content, locale-aware content loader, language switcher, multi-locale SEO (sitemap + metadata).

## Phases Completed

### Phase 01 -- Italian UI on Homepage

Wired the `it` locale end-to-end: added `"it"` to the locales array in `src/i18n/config.ts`, updated the middleware matcher to recognize `/it` paths, and verified Italian message JSON files (`messages/it/*.json`) were complete. After this phase, navigating to `/it` rendered the full homepage with Italian navigation, headings, labels, and footer.

Key decision: the middleware matcher string `"/(en|it)/:path*"` must remain a hardcoded static literal because Next.js `config.matcher` is evaluated at build time and cannot reference runtime variables.

### Phase 02 -- Italian Content and Content Loader

Three steps executed sequentially:

1. **02-01**: Moved 5 existing English YAML files from `content/projects/` to `content/projects/en/`. Created `content/projects/it/` with Italian translations of all 5 project files following ADR-007's locale directory structure. Translation rules preserved slugs, types, tags, and stack values unchanged while translating titles, subtitles, hooks, metric labels, and all 7 prose sections.

2. **02-02**: Added `locale: Locale` parameter to `getAllProjects()` and `getProjectBySlug()` in `content-loader.ts`. Changed the read path from `content/projects/` to `content/projects/${locale}/`. The `Locale` type imported from `@/i18n/config` ensures compile-time safety.

3. **02-03**: Updated all call sites to pass the locale parameter. `ProjectGrid` receives locale prop, `CaseStudyPage` extracts locale from route params, `generateStaticParams` iterates `routing.locales` to produce all locale + slug combinations.

### Phase 03 -- Language Switcher and SEO Metadata

Two steps executed in parallel (no dependency between them):

1. **03-01**: Created `LanguageSwitcher` client component using next-intl's `useLocale()` and `usePathname()`. Renders a link showing the other locale (EN when on `/it`, IT when on `/en`). Integrated into `Navigation` component for both desktop and mobile layouts.

2. **03-02**: Updated metadata helpers (`buildHomeMetadata`, `buildCaseStudyMetadata`) to accept a `locale` parameter. Both now generate locale-aware canonical URLs and `alternates.languages` entries with hreflang for all configured locales. Extracted `SITE_URL` to a shared config constant to eliminate hardcoded domain strings.

### Phase 04 -- Infrastructure and Build Validation

Updated `sitemap.ts` to generate URLs for all locales with hreflang alternates. Verified `npm run build` generates static HTML for both locales across all routes. The build produces 17 static pages covering both `/en/` and `/it/` variants of every page.

## Architecture Decisions

- **ADR-007**: Separate locale directories for content (`content/projects/{locale}/`). Complete YAML files per locale rather than locale-keyed fields in a single file. Accepted during DESIGN wave, implemented during BUILD wave.
- **proxy.ts at src/proxy.ts**: Next.js 16 renamed `middleware.ts` to `proxy.ts`, requiring locale routing configuration to be placed in the new file location.
- **SITE_URL extracted to shared config**: Eliminated hardcoded domain strings across metadata helpers and sitemap generation.
- **Static matcher duplication**: The middleware/proxy matcher pattern `"/(en|it)/:path*"` is duplicated from `src/i18n/config.ts` because Next.js requires a static string literal at build time. This is accepted under YAGNI for 2 locales.

## Key Metrics

| Metric | Value |
|---|---|
| Steps | 7/7 complete |
| TDD phases executed | 35 (5 per step: PREPARE, RED_ACCEPTANCE, RED_UNIT, GREEN, COMMIT) |
| RED_UNIT phases skipped | 7 (all steps: config changes, content moves, parameter threading, UI component, declarative config -- no unit-testable business logic introduced) |
| Acceptance tests | 6 passing, 13 skipped (future scenarios) |
| Build output | 17 static pages generated |
| Locales | en, it |
| Files modified | ~45 |
| New dependencies | 0 |
| Execution window | 2026-03-02 19:03 -- 23:06 UTC (~4 hours) |

## Challenges and Resolutions

### Next.js 16 proxy.ts migration

The most significant challenge was discovering that Next.js 16 renamed `middleware.ts` to `proxy.ts`. The locale routing middleware configuration initially failed because the framework no longer recognized `middleware.ts`. Resolution: moved the locale detection and routing logic to `src/proxy.ts`, the new Next.js 16 convention. This was discovered during step 01-01's GREEN phase when the `/it` route returned 404 instead of 200.

### Parallel step execution

Steps 03-01 (LanguageSwitcher) and 03-02 (SEO metadata) had no dependency on each other -- both depended only on 02-03. The roadmap correctly identified this parallelism, and both steps were executed in the same phase without conflicts.

### DES task marker handling

The execution operated within DES (Development Execution Session) governance, requiring proper marker file management for task activation and completion tracking throughout the multi-step workflow.

### RED_UNIT phase decisions

All 7 steps skipped the RED_UNIT phase with documented justification. The changes fell into categories where acceptance tests provided sufficient coverage: config changes (01-01), content file operations (02-01), parameter additions to existing functions (02-02, 02-03), UI components without business logic (03-01), declarative metadata configuration (03-02), and sitemap generation (04-01).

## What's Next

- **Enable remaining 13 acceptance test scenarios**: Currently skipped tests cover future scenarios (additional locales, edge cases, content validation). Enable as the feature matures.
- **Umami Cloud analytics integration**: Track locale-specific page views and language switcher usage. Separate feature, not part of this localization scope.
- **Build-time content parity validation**: ADR-007 notes that a build-time check can verify shared field consistency (slug, type, tags, stack) across locale files. Implement if content drift becomes a concern.
- **Third locale consideration**: Adding a third locale requires updating `src/i18n/config.ts`, the proxy matcher pattern, and creating a new `content/projects/{locale}/` directory with translated files. The architecture supports this with minimal changes.
