# Walking Skeleton Test Suite
# Christian Borrello -- Personal Portfolio CV Site
# Wave: DISTILL -- 2026-03-01

---

## Purpose

The walking skeleton test suite is the minimum set of acceptance scenarios that must pass before any feature development begins. These scenarios validate that the end-to-end infrastructure works: deployment, form submission, and i18n structure.

If the walking skeleton fails, stop. Fix the infrastructure before writing any content or feature code.

---

## Walking Skeleton Scenarios

Three scenarios run immediately (no @skip tag). These are the outer loop that drives the initial implementation.

### 1. Site is live and reachable

**File**: `tests/acceptance/walking-skeleton.feature`
**What it proves**: The deployment pipeline works. Next.js builds, Vercel serves it, the URL responds.
**Playwright action**: Navigate to the production URL, assert HTTP 200 and no error content on the page.

### 2. Contact form delivers a message end-to-end

**File**: `tests/acceptance/walking-skeleton.feature`
**What it proves**: The form-to-Formspree integration works. A visitor can send a message and see confirmation.
**Playwright action**: Fill the email field, click "Send message", assert the success state text appears.
**Note**: This tests against the real Formspree endpoint. Use a test email. Verify delivery via Formspree dashboard (manual step, not automated).

### 3. All visible text comes from locale files

**File**: `tests/acceptance/walking-skeleton.feature`
**What it proves**: The i18n architecture works. No hardcoded strings. Adding a language requires only new locale files, not component changes.
**Playwright action**: This is a code-level verification. The Playwright test can check that no raw English text exists outside of what the locale files provide, or this can be verified via a build-time linting step.
**Alternative verification**: `grep -r ">[A-Z]" src/ --include="*.tsx"` returns only dynamic content patterns, not literal English strings.

---

## Deferred Walking Skeleton Scenarios

Three additional scenarios are tagged @walking-skeleton @skip. They validate infrastructure that depends on external configuration (Vercel webhook, domain DNS). Enable them as their prerequisites become available.

### 4. Automatic deployment on push to main

**Prerequisite**: GitHub repository connected to Vercel with webhook active.
**What it proves**: The CI/CD loop works end-to-end.
**Verification**: Push a trivial change, observe Vercel dashboard showing new deployment within 2 minutes.

### 5. Custom domain resolves correctly

**Prerequisite**: Domain `christianborrello.dev` purchased and DNS configured.
**What it proves**: The custom domain setup works. Visitors reach the site at the intended URL.
**Verification**: Navigate to `https://christianborrello.dev`, assert it loads with valid HTTPS.

### 6. No tracking cookies or analytics in version one

**File**: `tests/acceptance/infrastructure.feature`
**What it proves**: Privacy compliance. No analytics scripts or tracking cookies in v1.
**Playwright action**: Navigate, inspect cookies and network requests for analytics scripts.

---

## Run Order

```
1. Site is live and reachable          <-- enables all other scenarios
2. Contact form delivers a message     <-- proves external service integration
3. All visible text from locale files  <-- proves i18n architecture
4. No tracking cookies (enable @skip)  <-- proves privacy constraint
5. Auto-deploy on push (enable @skip)  <-- proves CI/CD pipeline
6. Custom domain resolves (enable @skip) <-- proves DNS configuration
```

---

## What "Passing" Means

The walking skeleton is complete when:

1. Scenarios 1-3 pass against the live Vercel URL (either `*.vercel.app` subdomain or custom domain)
2. The contact form submission is received in the Formspree dashboard (manual verification)
3. No user-facing strings are hardcoded in React components (automated or manual grep)

After these pass, the foundation is proven. Feature development (US-01 through US-04) can begin safely. Each feature starts by removing the @skip tag from its first scenario.

---

## Driving Ports for Walking Skeleton Tests

The acceptance tests interact with the system exclusively through the driving ports identified in the architecture:

| Driving Port | Test Interaction |
|-------------|------------------|
| Browser (HTTPS to Vercel CDN) | Playwright navigates to production URL, asserts page content |
| Contact form (client-side POST to Formspree) | Playwright fills form fields, clicks submit, asserts success state |
| Locale files (build-time content) | Verified by asserting that rendered text matches locale file content |

No internal components are accessed directly. The tests observe what a real visitor observes.
