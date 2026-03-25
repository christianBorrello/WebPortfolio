# Test Scenarios — Acceptance Test Map

---

## Overview

Total scenarios: 38
- Walking skeleton (no @skip, implement first): 3
- Walking skeleton (@skip, implement during Feature 0): 3
- Milestone 1 (@skip): 18
- Milestone 2 (@skip): 12
- Infrastructure cross-cutting (@skip): 2 (counted above in milestones)

Error/edge path ratio: 15 of 38 scenarios (~39%) cover error paths, boundary conditions, negative cases, or infrastructure constraints.

---

## Implementation Order

### Phase 0: Walking Skeleton (Feature 0)

These scenarios validate the deployment pipeline and form integration. They must all pass before any feature work begins.

| File | Scenario | Tag | Status |
|------|----------|-----|--------|
| walking-skeleton.feature | Site is live and reachable | @walking-skeleton | FIRST -- no @skip |
| walking-skeleton.feature | Contact form delivers a message end-to-end | @walking-skeleton | No @skip |
| walking-skeleton.feature | All visible text comes from locale files | @walking-skeleton | No @skip |
| walking-skeleton.feature | Automatic deployment on push to main | @walking-skeleton @skip | Enable after Vercel connected |
| walking-skeleton.feature | Custom domain resolves correctly | @walking-skeleton @skip | Enable after domain purchased |
| infrastructure.feature | No tracking cookies or analytics in version one | @walking-skeleton @skip | Enable with skeleton |

### Phase 1: Milestone 1 -- Core Sections + Contact Form

Enable one scenario at a time, implement, commit, repeat.

**Hero Section (US-01)**

| File | Scenario | Tag |
|------|----------|-----|
| hero-section.feature | Identity statement breaks the generic portfolio pattern | @milestone-1 @skip |
| hero-section.feature | Clear calls to action guide the visitor forward | @milestone-1 @skip |
| hero-section.feature | Hero displays the owner's name and role | @milestone-1 @skip |
| hero-section.feature | Hero text is fully localized | @milestone-1 @skip |

**About Section (US-02)**

| File | Scenario | Tag |
|------|----------|-----|
| about-section.feature | ADHD is framed as a functional pattern, not a limitation | @milestone-1 @skip |
| about-section.feature | Technology philosophy is present and authentic | @milestone-1 @skip |
| about-section.feature | Values and what the owner looks for are stated clearly | @milestone-1 @skip |
| about-section.feature | Philosophy is present as applied thinking, not academic display | @milestone-1 @skip |
| about-section.feature | About section is not a skills list | @milestone-1 @skip |
| about-section.feature | About section is readable in approximately 90 seconds | @milestone-1 @skip |

**Contact Section (US-04) -- Structure and Validation**

| File | Scenario | Tag |
|------|----------|-----|
| contact-section.feature | Contact form has exactly three fields | @milestone-1 @skip |
| contact-section.feature | Headline and subtext welcome both recruiters and collaborators | @milestone-1 @skip |
| contact-section.feature | Submitting without email shows a clear error | @milestone-1 @skip |
| contact-section.feature | Submitting an invalid email format shows an error | @milestone-1 @skip |
| contact-section.feature | Marco sends a message with only his email | @milestone-1 @skip |
| contact-section.feature | Giulia sends a complete message with all fields | @milestone-1 @skip |
| contact-section.feature | Submission failure preserves the visitor's input | @milestone-1 @skip |
| contact-section.feature | No CAPTCHA is shown in version one | @milestone-1 @skip |

**Infrastructure -- Accessibility Basics**

| File | Scenario | Tag |
|------|----------|-----|
| infrastructure.feature | Heading hierarchy is semantically correct | @milestone-1 @skip |
| infrastructure.feature | Contact form inputs have associated labels | @milestone-1 @skip |
| infrastructure.feature | Text contrast meets minimum accessibility standards | @milestone-1 @skip |
| infrastructure.feature | Navigation links scroll to the correct sections | @milestone-1 @skip |

### Phase 2: Milestone 2 -- Projects + Case Studies + SEO

**Projects Section (US-03)**

| File | Scenario | Tag |
|------|----------|-----|
| projects-section.feature | Five project cards are displayed | @milestone-2 @skip |
| projects-section.feature | Each card shows a concrete hook, not just a technology list | @milestone-2 @skip |
| projects-section.feature | Work projects highlight measurable outcomes | @milestone-2 @skip |
| projects-section.feature | Personal projects are framed as active exploration | @milestone-2 @skip |
| projects-section.feature | Each card links to a dedicated case study page | @milestone-2 @skip |
| projects-section.feature | SagitterHub case study has all eight sections | @milestone-2 @skip |
| projects-section.feature | Azure case study shows business impact clearly | @milestone-2 @skip |
| projects-section.feature | Case study page has navigation back to projects | @milestone-2 @skip |
| projects-section.feature | Non-specialist section is genuinely accessible | @milestone-2 @skip |

**Infrastructure -- SEO and Performance**

| File | Scenario | Tag |
|------|----------|-----|
| infrastructure.feature | Home page has proper meta tags for search engines | @milestone-2 @skip |
| infrastructure.feature | Case study pages have unique meta tags | @milestone-2 @skip |
| infrastructure.feature | Sitemap is generated and accessible | @milestone-2 @skip |
| infrastructure.feature | Page loads within performance budget | @milestone-2 @skip |
| infrastructure.feature | Locale routing works correctly | @milestone-2 @skip |

---

## Coverage by User Story

| User Story | Scenarios | Error/Edge Paths | Coverage |
|------------|-----------|------------------|----------|
| US-00 Walking Skeleton | 6 | 1 (domain not purchased) | AC-00-01 through AC-00-06 |
| US-01 Hero | 4 | 1 (negative: no generic terms) | AC-01-01 through AC-01-05 |
| US-02 About | 6 | 2 (no skills list, word count boundary) | AC-02-01 through AC-02-08 |
| US-03 Projects | 9 | 2 (no apologetic language, no jargon) | AC-03-01 through AC-03-22 |
| US-04 Contact | 8 | 4 (missing email, invalid email, service failure, no CAPTCHA) | AC-04-01 through AC-04-10 |
| Cross-cutting (infra) | 11 | 5 (privacy, contrast, heading gaps, performance budget) | AC-X-01 through AC-X-10 |

---

## Acceptance Criteria Coverage Matrix

| AC ID | Covered by Scenario |
|-------|---------------------|
| AC-00-01 | Site is live and reachable |
| AC-00-02 | Automatic deployment on push to main |
| AC-00-03 | Contact form delivers a message end-to-end |
| AC-00-04 | All visible text comes from locale files |
| AC-00-05 | Custom domain resolves correctly |
| AC-00-06 | Site is live and reachable (200 status) |
| AC-01-01 | Identity statement breaks the generic portfolio pattern |
| AC-01-02 | Identity statement breaks the generic portfolio pattern |
| AC-01-03 | Identity statement breaks the generic portfolio pattern |
| AC-01-04 | Clear calls to action guide the visitor forward |
| AC-01-05 | Hero text is fully localized |
| AC-02-01 | ADHD is framed as a functional pattern |
| AC-02-02 | Technology philosophy is present and authentic |
| AC-02-03 | Values and what the owner looks for are stated clearly |
| AC-02-04 | Philosophy is present as applied thinking |
| AC-02-05 | Values and what the owner looks for are stated clearly |
| AC-02-06 | About section is not a skills list |
| AC-02-07 | About section is not a skills list |
| AC-02-08 | About section is readable in approximately 90 seconds |
| AC-03-01 | Five project cards are displayed |
| AC-03-02 | Each card shows a concrete hook |
| AC-03-03 | Work projects highlight measurable outcomes |
| AC-03-04 | Work projects highlight measurable outcomes |
| AC-03-05 | Personal projects are framed as active exploration |
| AC-03-06..13 | SagitterHub case study has all eight sections |
| AC-03-14..18 | Azure case study shows business impact clearly |
| AC-03-19..22 | Personal projects are framed as active exploration |
| AC-04-01 | Contact form has exactly three fields |
| AC-04-02 | Marco sends a message with only his email |
| AC-04-03 | Giulia sends a complete message with all fields |
| AC-04-04 | Submitting without email shows a clear error |
| AC-04-05 | Submitting without email shows a clear error (message preserved) |
| AC-04-06 | Marco sends a message with only his email (success message) |
| AC-04-07 | Headline and subtext welcome both recruiters and collaborators |
| AC-04-08 | Headline and subtext welcome both recruiters and collaborators |
| AC-04-09 | Contact form has exactly three fields |
| AC-04-10 | No CAPTCHA is shown in version one |
| AC-X-01 | Page loads within performance budget |
| AC-X-02 | All visible text comes from locale files |
| AC-X-04 | Site is live and reachable |
| AC-X-05 | No tracking cookies or analytics in version one |
| AC-X-06 | No tracking cookies or analytics in version one |
| AC-X-08 | Heading hierarchy is semantically correct |
| AC-X-09 | Text contrast meets minimum accessibility standards |
| AC-X-10 | Home page has proper meta tags for search engines |

---

## Notes

- AC-01-06 (tone consistency) and AC-X-07 (no marketing language) are narrative quality criteria verified through manual review, not automated tests. They are listed in the requirements as NQ-01 through NQ-05.
- AC-X-03 (adding Italian without component changes) is an architectural constraint verified during development, not a browser-level acceptance test.
- The recommended implementation sequence within each milestone is: structure scenarios first (do the elements exist?), then behavior scenarios (do they work correctly?), then error scenarios (do failures degrade gracefully?).
