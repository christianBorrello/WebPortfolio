# Test Scenarios: Contact Form Resend Migration

## Scenario Inventory

| # | Scenario | Type | Tag |
|---|----------|------|-----|
| 1 | Visitor sends a message and sees confirmation | Walking skeleton | `@walking-skeleton` |
| 2 | Contact form has exactly three fields | Structure | `@milestone-1 @skip` |
| 3 | Headline and subtext welcome both recruiters and collaborators | Structure | `@milestone-1 @skip` |
| 4 | Submitting without email shows a clear error | Validation error | `@milestone-1 @skip` |
| 5 | Submitting an invalid email format shows an error | Validation error | `@milestone-1 @skip` |
| 6 | Marco sends a message with only his email | Happy path | `@milestone-1 @skip` |
| 7 | Giulia sends a complete message with all fields | Happy path | `@milestone-1 @skip` |
| 8 | Submit button shows progress while sending | Feedback | `@milestone-1 @skip` |
| 9 | Form is cleared after successful submission | Feedback | `@milestone-1 @skip` |
| 10 | Submission failure preserves the visitor's input | Error recovery | `@milestone-1 @skip` |
| 11 | Network interruption shows a friendly error | Error recovery | `@milestone-1 @skip` |
| 12 | No CAPTCHA is shown in version one | Boundary | `@milestone-1 @skip` |

**Error/edge path ratio**: 5 of 12 scenarios (42%) cover error and edge cases (scenarios 4, 5, 10, 11, 12).

## Mock Strategy

All acceptance tests mock the API route at the network level using Playwright's `page.route()`. This intercepts the browser's fetch call to `/api/contact` before it reaches the server.

**Why mock at the network level, not at the Resend SDK level?**
- Acceptance tests exercise the user-visible behavior through the browser.
- The API route (`/api/contact`) is a server-side concern. In a dev server, the route handler would run, but it would call the real Resend API. Mocking at the network level lets us control the response without starting a separate test server or injecting dependencies.
- This matches the existing pattern used for Formspree (intercept `**/formspree.io/**`).

**Mock patterns used**:

| Mock | HTTP Status | Response Body | Simulates |
|------|-------------|---------------|-----------|
| Success | 200 | `{ success: true }` | Email accepted by Resend |
| Server error | 500 | `{ success: false, error: "send_failed" }` | Resend API failure, rate limit, bad key |
| Network error | abort("connectionrefused") | N/A | Network outage, DNS failure |
| Delayed success | 200 (after 1.5s delay) | `{ success: true }` | Slow response for testing loading state |

**What changes from Formspree mocks**:
- Route pattern: `**/formspree.io/**` becomes `**/api/contact`
- Success body: `{ ok: true }` becomes `{ success: true }`
- Error body: `{ success: false, error: "send_failed" }` (new structured error)

## Implementation Order

Tests should be enabled and made to pass in this sequence. Each test is enabled by removing `test.skip` and verifying it fails for a business logic reason before implementing.

### Phase 1: Walking skeleton (enables the migration)
1. **Visitor sends a message and sees confirmation** -- The walking skeleton. This test already exists in `walking-skeleton.steps.ts` (route intercept updated). The contact-section version is a focused duplicate that tests through the contact section navigation path. Enable it first to verify the API route migration works end-to-end.

### Phase 2: Validation errors (client-side, no migration changes needed)
2. **Submitting without email shows a clear error** -- Client-side validation. Should pass without production code changes since validation logic is unchanged.
3. **Submitting an invalid email format shows an error** -- Same as above, different input.

### Phase 3: Happy paths (variations of the skeleton)
4. **Marco sends a message with only his email** -- Email-only submission.
5. **Giulia sends a complete message with all fields** -- Full form submission.

### Phase 4: Submission feedback
6. **Submit button shows progress while sending** -- Tests the "Sending..." button state during API call.
7. **Form is cleared after successful submission** -- Verifies form reset after success.

### Phase 5: Error recovery
8. **Submission failure preserves the visitor's input** -- Server returns 500, form data retained.
9. **Network interruption shows a friendly error** -- Network failure, form data retained.

### Phase 6: Structure and miscellaneous
10. **Contact form has exactly three fields** -- Static structure verification.
11. **Headline and subtext welcome both recruiters and collaborators** -- Copy verification.
12. **No CAPTCHA is shown in version one** -- Absence verification.

## Mandate Compliance Evidence

### CM-A: Driving Port Usage
All tests interact through the user-facing form UI (the driving port):
- `page.getByLabel("Email")` -- form field interaction
- `page.getByRole("button", { name: /send message/i })` -- form submission
- `page.getByText(...)` -- observable outcome verification

No test imports or invokes internal components (`ContactForm`, `route.ts`, Resend SDK).

### CM-B: Business Language in Feature Files
The `.feature` file contains zero technical terms. No mention of:
- API routes, HTTP status codes, JSON, POST
- Resend, Formspree, SDK
- Zod, validation schema, middleware
- React, components, state

### CM-C: Walking Skeleton + Focused Scenario Counts
- Walking skeletons: 1 (scenario 1)
- Focused scenarios: 11 (scenarios 2-12)
- Total: 12 scenarios covering structure, validation, happy paths, feedback, error recovery, and boundaries
