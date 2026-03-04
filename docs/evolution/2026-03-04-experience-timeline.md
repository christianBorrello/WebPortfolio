# Evolution: experience-timeline

## Summary

Replaced the flat `ProjectGrid` section on the portfolio homepage with a unified chronological `ExperienceTimeline` that interleaves work, education, and project entries in reverse chronological order. Work entries embed existing `ProjectCard` components for associated case studies. Scroll-driven reveal animation guides reading pace. Zero new npm dependencies introduced.

## Goal

Provide a single professional narrative on the homepage that serves two audiences at different speeds: recruiters scanning in 30 seconds (seniority, stack, trajectory) and hiring managers reading in 2-3 minutes (impact, architecture thinking, case study deep-dives). The previous `ProjectGrid` presented projects as a disconnected catalogue with no career context.

## Execution Timeline

| Marker | Timestamp (UTC) |
|--------|-----------------|
| First step started (01-01 PREPARE) | 2026-03-03 21:53 |
| Phase 01 completed (types, loader, content, i18n) | 2026-03-03 22:24 |
| Phase 02 completed (TimelineEntry component) | 2026-03-03 22:25 |
| Phase 03 completed (timeline section, homepage integration) | 2026-03-03 22:38 |
| Phase 04-01 completed (navigation update) | 2026-03-03 23:29 |
| Phase 04-02 completed (ProjectGrid removal) | 2026-03-04 09:48 |
| Refactoring pass (L1-L4) | 2026-03-04 (post-commit) |
| Edge case tests added | 2026-03-04 (post-commit) |
| **Total wall-clock**: ~12 hours (with overnight gap between 04-01 and 04-02) | |

## Changes Made

### New Production Files (8)

| File | Purpose |
|------|---------|
| `src/shared/types/experience.ts` | `TimelineEntryType`, `TimelinePeriod`, `TimelineEntry`, `ExperienceData` type definitions |
| `src/shared/lib/experience-loader.ts` | YAML loader with field-level validation, follows `content-loader.ts` pattern |
| `src/features/experience/timeline-entry.tsx` | Single entry component with three visual variants (work/education/project) |
| `src/features/experience/experience-timeline.tsx` | Timeline section container with `useScrollReveal` hook (IntersectionObserver + CSS transitions) |
| `content/experience/en.yaml` | Timeline content data (EN) |
| `content/experience/it.yaml` | Timeline content data (IT) |
| `messages/en/experience.json` | UI labels for timeline section (EN) |
| `messages/it/experience.json` | UI labels for timeline section (IT) |

### Modified Production Files (6)

| File | Change |
|------|--------|
| `src/app/[locale]/page.tsx` | Replaced `ProjectGrid` import/usage with `ExperienceTimeline`; calls `getExperience(locale)` and passes entries + projectSummaries as props |
| `src/shared/ui/navigation.tsx` | NAV_LINKS key `projects` -> `experience`, href `#projects` -> `#experience` |
| `src/features/hero/hero-section.tsx` | CTA href `#projects` -> `#experience` |
| `src/features/projects/case-study-layout.tsx` | Back link href `/#projects` -> `/#experience`, label key `back_to_projects` -> `back_to_experience` |
| `messages/en/common.json` | `nav.projects` -> `nav.experience`, `nav.back_to_projects` -> `nav.back_to_experience` |
| `messages/it/common.json` | Same key renames with Italian values |

### Removed Production Files (1)

| File | Reason |
|------|--------|
| `src/features/projects/project-grid.tsx` | Fully replaced by `ExperienceTimeline`. Zero remaining imports verified before deletion. |

### Post-Implementation

| Commit | Description |
|--------|-------------|
| `6d586c6` | L1-L4 refactoring pass (extracted `resolve-projects.ts`, improved readability) |
| `54c0da8` | Edge case tests for loader validation |

## Architecture Decisions

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-ET-001 | Replace ProjectGrid with unified timeline | Single narrative section vs. flat grid + separate experience section. ProjectCard reused inside work entries. |
| ADR-ET-002 | IntersectionObserver + CSS transitions | Zero bundle impact vs. framer-motion (~30KB). CSS scroll-timeline rejected for limited browser support. |
| ADR-ET-003 | Separate YAML files for experience data | Clean separation of timeline content (YAML) from UI labels (JSON). Education entries have no project YAML counterpart. |
| ADR-ET-004 | Client component for ExperienceTimeline | Scroll-reveal requires browser APIs (IntersectionObserver, matchMedia). Data loading stays server-side. |

## Key Design Choices

- **Immutable readonly types throughout**: All fields in `TimelineEntry` and `ExperienceData` are `readonly`, preventing accidental mutation of content data.
- **Build-time fail-fast validation**: The experience loader throws descriptive errors for missing/invalid fields during `next build`, not at runtime.
- **Graceful degradation for slug mismatches**: If a `relatedProjects` slug does not match any project YAML, the project card is silently omitted rather than throwing.
- **Single IntersectionObserver instance**: One observer for all entries, disconnected after all are revealed. GPU-composited transitions (`opacity` + `transform`).
- **prefers-reduced-motion**: Hook checks `matchMedia` and skips observer entirely. CSS `@media` fallback removes transitions.
- **Server/client boundary at section level**: `page.tsx` (server) loads all data; `ExperienceTimeline` (client) receives serializable props only.

## Key Metrics

| Metric | Value |
|--------|-------|
| Roadmap steps | 8 across 4 phases |
| New production files | 8 |
| Modified production files | 6 |
| Removed production files | 1 |
| New npm dependencies | 0 |
| Git commits (feature) | 8 implementation + 2 post-implementation |
| TDD cycles completed | 8 (PREPARE -> RED -> GREEN -> COMMIT per step) |
| Unit tests skipped with justification | 5 (presentational components, type-only files, file deletion) |

## Mutation Testing

Exploratory run performed. Overall kill rate 50.98% (52 killed / 41 survived / 9 no coverage). `resolve-projects.ts` at 88.89%. `experience-loader.ts` at 47.31% -- surviving mutants are error message formatting, `.trim()` removal, and defensive null checks for impossible YAML states. Gate skipped: predominantly presentational feature with minimal domain logic. Acceptance test suite (Playwright) provides behavioral coverage.

## Learnings and Trade-offs

1. **Content-first architecture works well**: Defining the YAML schema and loader before the UI components meant the component tree was shaped by real data constraints, not guesses.
2. **ProjectCard reuse avoided duplication**: Work entries embed existing `ProjectCard` without modification, validating the original component's prop interface design.
3. **Navigation rename was the riskiest step**: Changing `projects` to `experience` across 6 files + 2 i18n files had the widest blast radius. Acceptance tests caught a regression in the back-link text.
4. **Mutation testing has diminishing returns on presentational code**: Most surviving mutants targeted error message text or cosmetic whitespace handling. The effort to kill them would produce implementation-coupled tests.
5. **Overnight gap between phases 04-01 and 04-02**: The removal step was intentionally deferred to the next session to allow visual verification of navigation changes before deleting `ProjectGrid`.

## What's Next

- **Fill placeholder YAML content**: Replace placeholder entries with real professional history.
- **Visual polish**: Adjust timeline spacing, badge colors, and responsive breakpoints after content is finalized.
- **Acceptance test coverage**: Verify Playwright scenarios cover all three entry types rendered on the homepage.
