# Architecture Document: Experience Timeline

## System Context

The Experience Timeline replaces the current `ProjectGrid` section on the portfolio homepage. It renders a unified vertical timeline of work, education, and personal project entries in reverse chronological order with scroll-driven reveal animation. Work entries embed existing `ProjectCard` components for associated case studies. Project entries link to case study pages. Education entries are standalone.

The feature serves two audiences at different speeds: recruiters scanning in 30 seconds and hiring managers reading in 2-3 minutes.

### Business Capabilities

| Capability | Description |
|-----------|-------------|
| Professional narrative | Unified chronological story across work, education, projects |
| Rapid classification | Recruiter identifies seniority, stack, trajectory without clicking |
| Deep-dive navigation | Hiring manager follows timeline to case studies and back |
| Progressive disclosure | Scroll-driven reveal guides reading pace |

---

## Existing System Analysis

### Reused Components (no modifications)

| Component | Path | Role |
|-----------|------|------|
| `ProjectCard` | `src/features/projects/project-card.tsx` | Rendered inside work entries for related case studies |
| `CaseStudyLayout` | `src/features/projects/case-study-layout.tsx` | Case study detail pages (needs back-link text update) |
| Case study page | `src/app/[locale]/projects/[slug]/page.tsx` | Route handler, unchanged |
| Content loader | `src/shared/lib/content-loader.ts` | `getAllProjects` + `toSummary` used to resolve `relatedProjects` slugs |
| i18n config | `src/i18n/config.ts` | `Locale` type, `locales` array |

### Modified Components

| Component | Path | Change |
|-----------|------|--------|
| Homepage | `src/app/[locale]/page.tsx` | Replace `<ProjectGrid>` import/usage with `<ExperienceTimeline>` |
| Navigation | `src/shared/ui/navigation.tsx` | `NAV_LINKS`: key `projects` -> `experience`, href `#projects` -> `#experience`. Back link href `/#projects` -> `/#experience` |
| Hero section | `src/features/hero/hero-section.tsx` | CTA href `#projects` -> `#experience` |
| Case study layout | `src/features/projects/case-study-layout.tsx` | `BackLink` href `/#projects` -> `/#experience` |
| EN common.json | `messages/en/common.json` | `nav.projects` -> `nav.experience`, `nav.back_to_projects` -> `nav.back_to_experience` |
| IT common.json | `messages/it/common.json` | Same key renames |

### Candidate for Removal

| Component | Path | Reason |
|-----------|------|--------|
| `ProjectGrid` | `src/features/projects/project-grid.tsx` | Fully replaced by `ExperienceTimeline`. No other consumer. Remove after timeline is verified. |

### Justification for New Components

The existing `ProjectGrid` is a flat grid of `ProjectCard` elements. The timeline requires fundamentally different structure: ordered list with three visually-differentiated entry types, nested project cards within work entries, scroll-reveal animation, and a vertical timeline layout. Extending `ProjectGrid` would require rewriting 100% of its logic and template -- a new component is cleaner.

No existing utility provides Intersection Observer scroll-reveal. A custom hook is required (approximately 30 lines).

No existing loader handles the `content/experience/` data. A new loader following the `content-loader.ts` pattern is required.

---

## Component Architecture

### Component Tree

```
page.tsx (server component)
  |
  +-- getExperience(locale)        -> ExperienceData
  +-- getAllProjects(locale)        -> ProjectCaseStudy[]
  +-- toSummary()                   -> ProjectSummary[]
  |
  +-- <ExperienceTimeline>  (client component, "use client")
        |
        props: { entries: TimelineEntry[], projectSummaries: ProjectSummary[] }
        |
        +-- useScrollReveal() hook (Intersection Observer)
        |
        +-- <section id="experience">
              +-- <h2> heading (from useTranslations)
              +-- <p> subtext
              +-- <ol> (ordered list, semantic)
                    |
                    +-- <TimelineEntry> (per entry)
                          |
                          props: { entry: TimelineEntry, projectSummaries: ProjectSummary[], index: number }
                          |
                          +-- type badge (Work / Education / Project)
                          +-- title, organization, period
                          +-- description
                          +-- highlights (if work)
                          +-- technology tags (if work or project)
                          +-- nested <ul> of <ProjectCard> (if work + relatedProjects)
                          +-- "Read case study" link (if project + projectSlug)
```

### Component Boundaries

| Component | Responsibility | Boundary |
|-----------|---------------|----------|
| `ExperienceTimeline` | Section container, scroll-reveal orchestration, heading, ordered list | Owns the `<section>` element, the `<ol>`, and the scroll-reveal hook lifecycle. Passes data down. |
| `TimelineEntry` | Single entry rendering with type-specific visual variants | Owns the `<li>` element. Decides which fields to render based on `entry.type`. Delegates project cards to `ProjectCard`. |
| `useScrollReveal` | Intersection Observer lifecycle | Accepts refs, returns visibility state. Respects `prefers-reduced-motion`. |
| `ProjectCard` | Project summary card (existing) | Unchanged. Receives `ProjectSummary` as prop. |

### Client/Server Boundary

The server component (`page.tsx`) loads all data:
- `getExperience(locale)` reads `content/experience/{locale}.yaml`
- `getAllProjects(locale)` reads project YAML files (existing)
- `toSummary()` maps to `ProjectSummary` (existing)

The client component (`ExperienceTimeline`) receives data as serializable props. This is required because scroll-reveal animation needs browser APIs (`IntersectionObserver`, `window.matchMedia`).

---

## Type Definitions

### `src/shared/types/experience.ts`

```ts
type TimelineEntryType = "work" | "education" | "project";

type TimelinePeriod = {
  readonly start: string;          // year, e.g. "2022"
  readonly end: string | null;     // null = ongoing ("Present" / "Presente")
};

type TimelineEntry = {
  readonly type: TimelineEntryType;
  readonly title: string;
  readonly organization?: string;       // work, education only
  readonly period: TimelinePeriod;
  readonly description: string;         // single line
  readonly highlights?: readonly string[];  // work only: concrete results
  readonly technologies?: readonly string[]; // work, project only
  readonly relatedProjects?: readonly string[]; // work only: slugs
  readonly projectSlug?: string;        // project only: single slug
};

type ExperienceData = {
  readonly entries: readonly TimelineEntry[];
};
```

### Type constraints (enforced by loader validation)

| Field | Required for types | Validated |
|-------|-------------------|-----------|
| `type` | all | Must be "work" \| "education" \| "project" |
| `title` | all | Non-empty string |
| `organization` | work, education | Non-empty string when present |
| `period.start` | all | Non-empty string |
| `period.end` | all | String or null |
| `description` | all | Non-empty string |
| `highlights` | work (optional) | Array of non-empty strings |
| `technologies` | work, project (optional) | Array of non-empty strings |
| `relatedProjects` | work (optional) | Array of slugs, each must resolve to a project YAML file |
| `projectSlug` | project (optional) | Single slug, must resolve to a project YAML file |

---

## Content Model

### YAML Schema: `content/experience/{locale}.yaml`

```yaml
entries:
  - type: work
    title: "Senior Software Engineer"
    organization: "Sagitter S.p.A."
    period:
      start: "2022"
      end: null                    # ongoing
    description: "One-line description of role and impact."
    highlights:
      - "Concrete result 1"
      - "Concrete result 2"
    technologies:
      - ".NET"
      - "React"
      - "Azure"
    relatedProjects:
      - sagitterhub                # must match slug in content/projects/{locale}/
      - azure-infrastructure

  - type: project
    title: "Unity Soulslike Game"
    period:
      start: "2023"
      end: "2023"
    description: "Why this project exists (motivation, not what)."
    technologies:
      - "Unity"
      - "C#"
    projectSlug: unity-soulslike   # must match slug in content/projects/{locale}/

  - type: education
    title: "Laurea in Informatica"
    organization: "Universita'"
    period:
      start: "2016"
      end: "2020"
    description: "One-line description of studies."
```

Entries are authored in reverse chronological order in the YAML (most recent first). The loader preserves this order.

### i18n Message Schema: `messages/{locale}/experience.json`

```json
{
  "heading": "Experience",
  "subtext": "The path that shaped how I think about software.",
  "type_work": "Work",
  "type_education": "Education",
  "type_project": "Project",
  "present": "Present",
  "read_case_study": "Read case study"
}
```

Italian equivalent:

```json
{
  "heading": "Esperienze",
  "subtext": "Il percorso che ha formato il mio modo di pensare il software.",
  "type_work": "Lavoro",
  "type_education": "Formazione",
  "type_project": "Progetto",
  "present": "Presente",
  "read_case_study": "Leggi il case study"
}
```

---

## Data Flow

```
Build time (server):
  content/experience/en.yaml ──> experience-loader.ts ──> ExperienceData
  content/projects/en/*.yaml ──> content-loader.ts ──> ProjectCaseStudy[] ──> ProjectSummary[]

  page.tsx (server component):
    entries = getExperience(locale).entries
    projectSummaries = getAllProjects(locale).map(toSummary)
    <ExperienceTimeline entries={entries} projectSummaries={projectSummaries} />

Render (client):
  ExperienceTimeline:
    for each entry:
      if entry.type === "work" && entry.relatedProjects:
        filter projectSummaries by slug match
        pass matched summaries to TimelineEntry
      <TimelineEntry entry={entry} matchedProjects={matched} index={i} />

  TimelineEntry:
    renders fields based on entry.type
    if work: renders <ProjectCard> for each matched project
    if project: renders link to /projects/{projectSlug}
```

### Experience Loader: `src/shared/lib/experience-loader.ts`

Follows the same pattern as `content-loader.ts`:
- Reads `content/experience/{locale}.yaml`
- Parses YAML using `js-yaml` (already a dependency)
- Validates each entry against the type schema
- Throws descriptive errors for missing/invalid fields (build-time fail-fast)
- Returns `ExperienceData`

The loader does NOT validate that `relatedProjects` slugs or `projectSlug` resolve to actual project files. That cross-validation happens at render time in `page.tsx` where both data sources are available. If a slug does not match, the project card is simply not rendered (graceful degradation).

---

## File Structure

### New Files (8)

| # | Path | Purpose |
|---|------|---------|
| 1 | `src/shared/types/experience.ts` | TypeScript types |
| 2 | `src/shared/lib/experience-loader.ts` | YAML loader + validation |
| 3 | `src/features/experience/experience-timeline.tsx` | Timeline section (client component) |
| 4 | `src/features/experience/timeline-entry.tsx` | Single entry with type variants |
| 5 | `content/experience/en.yaml` | Timeline data EN (placeholder for Christian to fill) |
| 6 | `content/experience/it.yaml` | Timeline data IT (placeholder for Christian to fill) |
| 7 | `messages/en/experience.json` | UI labels EN |
| 8 | `messages/it/experience.json` | UI labels IT |

### Modified Files (6)

| # | Path | Change |
|---|------|--------|
| 9 | `src/app/[locale]/page.tsx` | Import `ExperienceTimeline`, replace `<ProjectGrid>`, pass data props |
| 10 | `src/shared/ui/navigation.tsx` | NAV_LINKS key+href, back link href+text key |
| 11 | `src/features/hero/hero-section.tsx` | CTA href `#projects` -> `#experience` |
| 12 | `src/features/projects/case-study-layout.tsx` | BackLink href `/#projects` -> `/#experience` |
| 13 | `messages/en/common.json` | nav key renames |
| 14 | `messages/it/common.json` | nav key renames |

### Removed Files (1, after verification)

| # | Path | Reason |
|---|------|--------|
| 15 | `src/features/projects/project-grid.tsx` | Replaced by `ExperienceTimeline`. Verify no other imports before removing. |

### Total Production Files: 14 (8 new + 6 modified)

---

## Animation Strategy

### Approach: Intersection Observer + CSS Transitions

Zero external dependencies. Uses browser APIs available in all modern browsers.

### Mechanism

1. `useScrollReveal` hook creates a single `IntersectionObserver` instance with `threshold: 0.1`
2. Each `TimelineEntry` registers its root element ref with the hook
3. Entries start with CSS: `opacity: 0; transform: translateY(20px)`
4. When an entry intersects the viewport, the hook marks it as visible
5. Visible entries transition to: `opacity: 1; transform: translateY(0)`
6. Transition: `0.6s ease-out`, with stagger via `transition-delay: {index * 100}ms`
7. Once revealed, entries stay visible (observer `unobserve` after trigger -- no re-animation)

### prefers-reduced-motion

The hook checks `window.matchMedia('(prefers-reduced-motion: reduce)')`:
- If active: all entries are immediately visible (no observer, no transitions)
- CSS `@media (prefers-reduced-motion: reduce)` removes `transition` properties as a fallback

### Performance

- Single observer instance for all entries (not one per entry)
- Observer disconnects after all entries revealed
- CSS transitions are GPU-composited (`opacity` + `transform`)
- With 6-8 entries (current scope), zero performance concern
- If entries exceed 20 in the future, consider virtualizing off-screen entries

### Hook Contract

```
useScrollReveal(count: number) -> {
  refs: (index: number) -> (element: HTMLElement | null) -> void,
  isVisible: (index: number) -> boolean
}
```

The hook is internal to the experience feature. It is not placed in `shared` because no other feature needs it. If scroll-reveal becomes needed elsewhere, it can be promoted.

---

## Navigation Changes

### Anchor Link Migration

| Location | Before | After |
|----------|--------|-------|
| `navigation.tsx` NAV_LINKS | `{ key: "projects", href: "#projects" }` | `{ key: "experience", href: "#experience" }` |
| `navigation.tsx` back link href | `/${locale}/#projects` | `/${locale}/#experience` |
| `hero-section.tsx` CTA | `href="#projects"` | `href="#experience"` |
| `case-study-layout.tsx` BackLink | `href="/#projects"` | `href="/#experience"` |

### i18n Key Migration

| File | Before | After |
|------|--------|-------|
| `messages/en/common.json` | `"nav.projects": "Projects"` | `"nav.experience": "Experience"` |
| `messages/en/common.json` | `"nav.back_to_projects": "Back to projects"` | `"nav.back_to_experience": "Back to experience"` |
| `messages/it/common.json` | `"nav.projects": "Progetti"` | `"nav.experience": "Esperienze"` |
| `messages/it/common.json` | `"nav.back_to_projects": "Torna ai progetti"` | `"nav.back_to_experience": "Torna alle esperienze"` |

Note: `projects.json` keys (`heading`, `subtext`, `read_case_study`, `type_work`, `type_personal`, etc.) remain unchanged. They are still used by `ProjectCard` and `CaseStudyLayout`. The new `experience.json` has its own keys for the timeline section.

---

## Accessibility Architecture

### Semantic HTML Structure

```html
<section id="experience" aria-labelledby="experience-heading">
  <h2 id="experience-heading">Experience</h2>
  <p>Subtext</p>
  <ol>
    <li>
      <!-- work entry -->
      <span>badge: Work</span>
      <h3>Senior Software Engineer</h3>
      <p>Sagitter S.p.A. -- 2022 - Present</p>
      <p>Description</p>
      <ul><!-- highlights --></ul>
      <ul><!-- tech tags --></ul>
      <ul><!-- nested project cards -->
        <li><ProjectCard /></li>
        <li><ProjectCard /></li>
      </ul>
    </li>
    <li>
      <!-- project entry -->
      ...
      <a href="/projects/unity-soulslike">Read case study</a>
    </li>
    <li>
      <!-- education entry -->
      ...
    </li>
  </ol>
</section>
```

### Requirements

- `<ol>` for the timeline (ordered, chronological)
- `<li>` for each entry
- `<ul>` for nested project cards inside work entries
- `<h2>` for section heading, `<h3>` for entry titles
- `aria-labelledby` on section pointing to heading
- Focus-visible styles on all interactive elements (links, cards)
- Tab order follows DOM order (which follows reverse chronological order)
- Type badges have >= 4.5:1 contrast ratio (WCAG 2.1 AA)
- `prefers-reduced-motion` disables all CSS transitions

---

## Responsive Strategy

### Breakpoints (Tailwind CSS 4)

| Viewport | Layout |
|----------|--------|
| < 768px (mobile) | Single column, full-width entries, stacked project cards |
| >= 768px (tablet+) | Desktop layout with wider timeline, project cards may sit side-by-side |

### Mobile Constraints

- No horizontal scroll on any viewport >= 320px
- Technology tags use `flex-wrap` for natural line wrapping
- Project cards stack vertically (single column)
- Touch targets >= 44x44 points for all interactive elements
- Text never truncated or overlapping

### Desktop Layout

- Timeline entries have comfortable spacing
- Project cards inside work entries may display in a responsive grid (1-2 columns depending on space)
- The vertical timeline line is a CSS pseudo-element on the `<ol>`, hidden or simplified on mobile

---

## Integration Patterns

### Data Integration

| Source | Consumer | Pattern |
|--------|----------|---------|
| `content/experience/{locale}.yaml` | `experience-loader.ts` | File system read at build time (SSG) |
| `content/projects/{locale}/*.yaml` | `content-loader.ts` | Existing pattern, unchanged |
| `messages/{locale}/experience.json` | `useTranslations("experience")` | next-intl message namespace |
| `messages/{locale}/common.json` | `useTranslations("common")` | Existing, keys renamed |

### Component Integration

| Producer | Consumer | Contract |
|----------|----------|----------|
| `page.tsx` | `ExperienceTimeline` | Props: `{ entries: TimelineEntry[], projectSummaries: ProjectSummary[] }` |
| `ExperienceTimeline` | `TimelineEntry` | Props: `{ entry: TimelineEntry, matchedProjects: ProjectSummary[], index: number }` |
| `TimelineEntry` | `ProjectCard` | Props: `{ project: ProjectSummary }` (existing interface) |

### Slug Resolution

`page.tsx` resolves `relatedProjects` slugs to `ProjectSummary` objects before passing them to the client component:

```
For each entry where type === "work" && relatedProjects exists:
  matchedProjects = entry.relatedProjects
    .map(slug -> projectSummaries.find(p -> p.slug === slug))
    .filter(defined)
```

This resolution happens server-side. The client component receives pre-matched data.

---

## Technology Stack

All technologies are already present in the project. No new dependencies.

| Technology | License | Usage | Justification |
|-----------|---------|-------|---------------|
| Next.js 16 | MIT | Server/client components, SSG | Already in use |
| React 19 | MIT | UI rendering | Already in use |
| TypeScript 5 | Apache-2.0 | Type safety | Already in use |
| Tailwind CSS 4 | MIT | Styling, responsive | Already in use |
| next-intl 4 | MIT | i18n, `useTranslations` | Already in use |
| js-yaml 4 | MIT | YAML parsing | Already in use |
| Intersection Observer API | Web standard | Scroll-reveal | Browser built-in, no polyfill needed |

No new npm dependencies are introduced.

---

## ADR Summary

### ADR-ET-001: Replace ProjectGrid with Unified Timeline

**Status**: Accepted

**Context**: The portfolio homepage displays projects as a flat grid. Recruiters cannot assess professional trajectory without clicking into each case study. The grid works against the portfolio as it grows.

**Decision**: Replace `ProjectGrid` with a unified chronological timeline (`ExperienceTimeline`) that interleaves work, education, and project entries.

**Alternatives considered**:
- Keep `ProjectGrid`, add a separate Experience section above it. Rejected: two sections covering related content creates redundancy. The user explicitly wants a single narrative section.
- Add timeline metadata to existing `ProjectCard` components. Rejected: education entries have no project YAML files. The data model is fundamentally different.

**Consequences**:
- Positive: single narrative section, supports both fast-scan and deep-read audiences
- Positive: `ProjectCard` reused inside timeline, no duplication
- Negative: `ProjectGrid` becomes dead code (removed after verification)
- Negative: new content files (`content/experience/`) must be maintained alongside project YAMLs

### ADR-ET-002: Intersection Observer + CSS Transitions for Scroll Animation

**Status**: Accepted

**Context**: The timeline needs progressive reveal animation to guide reading and create narrative rhythm. Must respect `prefers-reduced-motion`.

**Decision**: Use browser-native `IntersectionObserver` API with CSS `transition` properties. Zero external animation libraries.

**Alternatives considered**:
- `framer-motion` (MIT): Full-featured animation library. Rejected: adds ~30KB to bundle for a single fade+translate effect. Over-engineered for this use case.
- CSS `@scroll-timeline` / `animation-timeline`: Native CSS scroll-driven animations. Rejected: limited browser support as of 2026. Not available in all Safari versions the portfolio targets.

**Consequences**:
- Positive: zero bundle size impact, GPU-composited transitions, broad browser support
- Positive: simple implementation (~30 lines for the hook)
- Negative: no spring physics or complex choreography (not needed)

### ADR-ET-003: Separate YAML Files for Experience Data

**Status**: Accepted

**Context**: Timeline entries (work, education, project) need a data source. The existing `content/projects/` directory handles case study content with per-file YAML.

**Decision**: Create `content/experience/{locale}.yaml` as a single file per locale containing all timeline entries. A new `experience-loader.ts` handles parsing and validation.

**Alternatives considered**:
- Add timeline metadata to existing project YAML files. Rejected: education entries have no corresponding project file. Work entries need period/organization data that does not belong in project files.
- Use a single JSON file in `messages/`. Rejected: YAML is the established content format. Mixing data and UI labels in messages would break the separation pattern.

**Consequences**:
- Positive: clean separation between timeline content (YAML) and UI labels (messages JSON)
- Positive: follows existing `content/` directory convention
- Negative: two content files to maintain per locale (experience YAML + project YAMLs)

### ADR-ET-004: Client Component for ExperienceTimeline

**Status**: Accepted

**Context**: The timeline needs `IntersectionObserver` and `window.matchMedia` for scroll-reveal animation. These are browser APIs unavailable in server components.

**Decision**: `ExperienceTimeline` is a client component (`"use client"`). Data is loaded in the server component (`page.tsx`) and passed as serializable props.

**Alternatives considered**:
- Server component with a tiny client wrapper for animation only. Rejected: the animation applies to every entry in the list, requiring the list container to be a client component anyway. Splitting would add complexity without benefit.

**Consequences**:
- Positive: clean server/client boundary at the section level
- Positive: all data loading stays on the server (no client-side fetching)
- Negative: entire timeline is client-rendered (acceptable: it is a leaf section with no deeply nested server components)

---

## Implementation Roadmap

### Step 1: Types + Data Layer

**Description**: Define experience types and content loader. Create YAML placeholder files and i18n message files.

**Files**: `experience.ts`, `experience-loader.ts`, `en.yaml`, `it.yaml`, `experience.json` (EN+IT)

**Acceptance criteria**:
- `getExperience(locale)` returns validated `ExperienceData` from YAML
- Loader throws descriptive error for missing/invalid fields
- Placeholder YAML has at least 1 work, 1 education, 1 project entry
- i18n messages contain all required keys

### Step 2: Timeline Entry Component

**Description**: Render a single timeline entry with visual differentiation by type (badge, color). Work entries show nested `ProjectCard` components.

**Files**: `timeline-entry.tsx`

**Acceptance criteria**:
- Entry renders title, organization, period, description per type
- Work entries render nested project cards
- Project entries render "Read case study" link
- Three types are visually distinguishable without reading content

### Step 3: Timeline Section + Scroll Animation

**Description**: Timeline container with ordered list, heading, scroll-reveal hook. Integrate into homepage replacing `ProjectGrid`.

**Files**: `experience-timeline.tsx`, `page.tsx` (modified)

**Acceptance criteria**:
- Section renders at `id="experience"` between About and Contact
- Entries appear in reverse chronological order
- Scroll-reveal animates entries into view
- `prefers-reduced-motion` shows all entries immediately

### Step 4: Navigation + Cleanup

**Description**: Update all navigation references from "projects" to "experience". Remove `ProjectGrid` after verification.

**Files**: `navigation.tsx`, `hero-section.tsx`, `case-study-layout.tsx`, `common.json` (EN+IT), `project-grid.tsx` (removed)

**Acceptance criteria**:
- Nav shows "Experience"/"Esperienze" and scrolls to `#experience`
- Back link from case study returns to `/#experience`
- Hero CTA scrolls to `#experience`
- `ProjectGrid` has zero remaining imports

### Step/File Ratio: 4 steps / 15 production files = 0.27 (well within 2.5 threshold)

---

## Quality Attributes (ISO 25010)

| Attribute | Strategy |
|-----------|----------|
| **Performance** | Zero new dependencies. CSS GPU-composited transitions. Single IntersectionObserver instance. SSG data loading. |
| **Accessibility** | Semantic HTML (`ol`, `li`, `h2`, `h3`). Focus-visible styles. prefers-reduced-motion. WCAG 2.1 AA contrast on badges. |
| **Maintainability** | Follows existing project patterns (feature folders, content loaders, i18n namespaces). Clear component boundaries. |
| **Reliability** | Build-time validation of YAML content. Graceful degradation for unresolved project slugs. |
| **Portability** | Browser-standard APIs only (IntersectionObserver). No polyfills needed for target browsers. |
| **Usability** | Responsive from 320px. Touch targets >= 44px. No horizontal scroll. Two-speed reading (scan vs. deep-dive). |

---

## Deployment Architecture

No deployment changes. The feature is entirely within the existing Next.js application:
- Static generation at build time (SSG)
- Content files read from filesystem during `next build`
- Deployed to Vercel (existing pipeline)
- No new environment variables
- No new API routes
- No new external service integrations

---

## Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| YAML content not ready at implementation time | Medium | Blocks visual verification | Placeholder YAMLs with realistic fake data. Christian fills real data post-implementation. |
| Project slug mismatch between experience YAML and project YAML | Low | Missing project cards in work entries | Graceful degradation (unmatched slugs silently filtered). Build-time warning in loader. |
| Accessibility regression from scroll animation | Low | Excludes motion-sensitive users | prefers-reduced-motion check in hook + CSS media query fallback. |
| Breaking existing case study links | Low | 404 on bookmarked case study URLs | Case study routes (`/projects/[slug]`) are unchanged. Only the homepage section anchor changes. |

---

## Handoff Checklist

- [x] Component boundaries defined with clear responsibilities
- [x] Type definitions complete with validation rules
- [x] Data flow from YAML to rendered component documented
- [x] File structure with exact paths for all new/modified/removed files
- [x] Animation strategy specified (hook contract, CSS properties, reduced-motion)
- [x] Navigation changes enumerated (all files, all keys)
- [x] Existing component reuse documented (ProjectCard, content-loader)
- [x] Accessibility requirements (semantic HTML, ARIA, focus, contrast)
- [x] Responsive breakpoints and mobile constraints
- [x] ADRs for all significant decisions with alternatives
- [x] Implementation roadmap with behavioral acceptance criteria
- [x] Quality attributes addressed
- [x] Zero new dependencies confirmed
