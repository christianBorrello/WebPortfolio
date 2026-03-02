# Test Scenarios: Italian Localization

## Walking Skeleton

**Italian homepage displays navigation in Italian** (AC 1)
- Navigate to `/it`, verify nav links show "Progetti", "Contatti", "Chi sono"
- This is the simplest proof that the Italian locale is wired and rendering
- Implemented first, all other scenarios tagged `@skip`

## Scenario Inventory

### User-Facing Behavior (`italian-localization.feature`)

| # | Scenario | AC | Priority | Type |
|---|----------|----|----------|------|
| 1 | Italian homepage displays navigation in Italian | AC 1 | Walking skeleton | Happy path |
| 2 | Hero section displays Italian text | AC 1 | Milestone 1 | Happy path |
| 3 | About section displays Italian text | AC 1 | Milestone 1 | Happy path |
| 4 | Contact section displays Italian text | AC 1 | Milestone 1 | Happy path |
| 5 | Footer displays Italian text | AC 1 | Milestone 1 | Happy path |
| 6 | All visible text originates from Italian locale files | AC 1 | Milestone 1 | Comprehensive |
| 7 | Project cards display Italian hooks and labels | AC 2 | Milestone 2 | Happy path |
| 8 | SagitterHub case study displays Italian content | AC 2 | Milestone 2 | Happy path |
| 9 | SagitterHub case study metrics displayed | AC 2 | Milestone 2 | Happy path |
| 10 | Language switcher visible on Italian homepage | AC 3 | Milestone 2 | Happy path |
| 11 | Language switcher visible on English homepage | AC 3 | Milestone 2 | Happy path |
| 12 | Switching from Italian to English on homepage | AC 3 | Milestone 2 | Happy path |
| 13 | Switching from English to Italian on homepage | AC 3 | Milestone 2 | Happy path |
| 14 | Language switcher preserves page on case study | AC 3 | Milestone 2 | Happy path |
| 15 | Language switcher preserves page on contact | AC 3 | Milestone 2 | Happy path |
| 16 | Italian contact form shows Italian success message | AC 1 | Milestone 3 | Error/edge |
| 17 | Italian contact form shows Italian error message | AC 1 | Milestone 3 | Error/edge |
| 18 | Direct navigation to Italian project URL works | AC 2 | Milestone 2 | Edge case |
| 19 | Italian and English pages have equivalent structure | AC 1+2 | Milestone 3 | Edge case |

### Infrastructure (`italian-localization-infrastructure.feature`)

| # | Scenario | AC | Priority | Type |
|---|----------|----|----------|------|
| 20 | Build generates static pages for both locales | AC 4 | Milestone 3 | Infrastructure |
| 21 | Every English project has Italian counterpart | AC 4 | Milestone 3 | Infrastructure |
| 22 | Sitemap includes Italian homepage URL | AC 5 | Milestone 3 | Infrastructure |
| 23 | Sitemap includes Italian project URLs | AC 5 | Milestone 3 | Infrastructure |
| 24 | Sitemap includes Italian contact page URL | AC 5 | Milestone 3 | Infrastructure |
| 25 | Missing Italian YAML causes build failure | AC 6 | Milestone 3 | Error path |
| 26 | Missing YAML error message is descriptive | AC 6 | Milestone 3 | Error path |

## Coverage Summary

- **Total scenarios**: 26
- **Happy path**: 15 (58%)
- **Error/edge/infrastructure**: 11 (42%)
- **Walking skeletons**: 1
- **AC coverage**: All 6 acceptance criteria covered

## Milestone Progression

### Milestone 1: Italian UI on Homepage (Scenarios 1-6)
Enable one at a time. Start with walking skeleton (scenario 1), then hero, about, contact, footer, then the comprehensive locale file check.

**Implementation order**: 1 -> 2 -> 3 -> 4 -> 5 -> 6

Prerequisites: `messages/it/*.json` files created, `"it"` added to locale config, middleware matcher updated.

### Milestone 2: Italian Content and Language Switcher (Scenarios 7-15, 18)
Project content in Italian and the language switcher component.

**Implementation order**: 7 -> 8 -> 9 -> 18 -> 10 -> 11 -> 12 -> 13 -> 14 -> 15

Prerequisites: `content/projects/it/*.yaml` files created, content loader updated with locale parameter, LanguageSwitcher component created.

### Milestone 3: Infrastructure and Error Paths (Scenarios 16-17, 19-26)
Form localization edge cases, build validation, sitemap generation.

**Implementation order**: 16 -> 17 -> 19 -> 20 -> 21 -> 22 -> 23 -> 24 -> 25 -> 26

Prerequisites: All production code complete, `generateStaticParams` iterates locales, sitemap generates both locale URLs, build-time YAML validation added.

## Mandate Compliance Evidence

### CM-A: Driving Port Usage
All browser tests invoke through the user-facing HTTP interface (Playwright navigating to URLs). Infrastructure tests use build output and file system checks. No internal module imports in test code.

### CM-B: Business Language in Feature Files
Feature files use domain language exclusively: "visitor navigates", "navigation shows", "case study content", "language switcher". Zero technical terms (no HTTP status codes, no CSS selectors, no component names in Gherkin).

### CM-C: Walking Skeleton and Scenario Counts
- Walking skeletons: 1 (Italian homepage navigation)
- Focused scenarios: 25
- Total: 26
