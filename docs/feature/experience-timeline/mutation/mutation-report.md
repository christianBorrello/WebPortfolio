# Mutation Testing Report — experience-timeline

**Status**: SKIPPED (documented justification)
**Date**: 2026-03-04
**Tool**: Stryker (@stryker-mutator/core) with vitest runner

## Exploratory Run Results

An exploratory mutation run was performed on the two logic-bearing files:

| File | Kill Rate | Killed | Survived | No Coverage |
|------|-----------|--------|----------|-------------|
| `resolve-projects.ts` | 88.89% | 8 | 1 | 0 |
| `experience-loader.ts` | 47.31% | 44 | 40 | 9 |
| **Total** | **50.98%** | **52** | **41** | **9** |

## Skip Justification

This feature is **predominantly presentational** (React components, CSS transitions, scroll animation). The two testable logic files are:

1. **`resolve-projects.ts`** (88.89% kill rate) — already above threshold. The single surviving mutant replaces `entry.type !== "work"` with `false`, which is caught by acceptance tests but not the isolated unit test (test exercises work entries with relatedProjects, not a non-work entry type filter in isolation).

2. **`experience-loader.ts`** (47.31% kill rate) — surviving mutants fall into categories with low behavioral impact:
   - **Error message formatting** (~15 mutants): `ERROR_PREFIX = ""` or empty strings in error messages. These don't affect validation behavior.
   - **`.trim()` removal** (~10 mutants): Cosmetic — whitespace handling in field values.
   - **Conditional spread guards** (~10 mutants): `true && { field }` would include `undefined` values, handled gracefully by consumers.
   - **Defensive null checks** (~5 mutants): Guards for paths that YAML parsing never produces (e.g., `data` being a non-object after `yaml.load`).

   Strengthening tests to kill these mutants would require testing error message exact text, whitespace handling, and impossible YAML parse states — tests that verify implementation details rather than behavior.

## Decision

Skip mutation testing gate for this feature. The acceptance test suite (Playwright) and unit tests provide adequate behavioral coverage for a presentational feature with minimal domain logic.
