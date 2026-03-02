# Component Boundaries: Contact Form Resend Migration

## Files to CREATE

| File | Purpose |
|---|---|
| `src/app/api/contact/route.ts` | API route handler. Validates input with Zod, calls Resend, returns JSON response. This is the only new production file. |

## Files to MODIFY

| File | Change Summary |
|---|---|
| `src/features/contact/contact-form.tsx` | Replace Formspree URL with `/api/contact`. Change `FormData` body to JSON body. Remove `FORMSPREE_URL` constant. The `handleSubmit` function sends `JSON.stringify({ name, email, message })` with `Content-Type: application/json` instead of `FormData` with `Accept: application/json`. |
| `src/shared/types/contact.ts` | Add request/response types for the API contract. Keep existing `FormStatus` type unchanged. |
| `.env.example` | Replace `NEXT_PUBLIC_FORMSPREE_ID=...` with `RESEND_API_KEY=...` |
| `tests/acceptance/steps/walking-skeleton.steps.ts` | Update route intercept (see updated test code below). |

### Updated Playwright Test Code

The route intercept changes from Formspree to the local API route. The mock response changes from `{ ok: true }` to `{ success: true }`:

```typescript
// Before (Formspree)
await page.route("**/formspree.io/**", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ ok: true }),
  });
});

// After (API Route)
await page.route("**/api/contact", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: true }),
  });
});
```

The rest of the test (form filling, button click, success message assertion) remains identical. The test still verifies user-visible behavior, not implementation details.
| `docs/design/adrs/adr-004-formspree-over-api-route.md` | Update status to "Superseded by ADR-006". Add supersession note. |

## Files to CREATE (Documentation)

| File | Purpose |
|---|---|
| `docs/design/adrs/adr-006-resend-over-formspree.md` | New ADR documenting the migration decision, superseding ADR-004. |

## Files to DELETE

None. No files are deleted. The Formspree integration is removed by modifying `contact-form.tsx`, not by deleting files.

## Environment Variables to REMOVE

| Variable | Location |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Vercel project settings, `.env.local`, `.env.example` |

## Environment Variables to ADD

| Variable | Location |
|---|---|
| `RESEND_API_KEY` | Vercel project settings (production + preview), `.env.local`, `.env.example` |

## Unchanged Files

| File | Why Unchanged |
|---|---|
| `src/features/contact/contact-section.tsx` | Container component. No dependency on email delivery mechanism. |
| `messages/en/contact.json` | i18n strings remain the same. Success/error messages are already generic. |
| `middleware.ts` | Matcher does not include `/api/*`. No interference with the new route. |
| `next.config.ts` | No configuration changes needed. |
| `tests/acceptance/contact-section.feature` | BDD scenarios describe user behavior, not implementation. All scenarios remain valid. The Gherkin says "form is submitted successfully", not "Formspree receives a POST". |

## ADR-004 Update Plan

**Current**: `Status: Accepted`
**New**: `Status: Superseded by ADR-006`

Add a note at the top:
> This ADR is superseded by [ADR-006](adr-006-resend-over-formspree.md). The Formspree integration has been replaced by Resend via a Next.js API route.

The body of ADR-004 stays intact as historical record.

## ADR-006 Summary (New)

- **Title**: Resend via API Route over Formspree Client-Side POST
- **Status**: Accepted
- **Context**: Formspree free tier limit (50/month) is restrictive. Server-side email delivery enables input validation, eliminates third-party client-side dependency, keeps API keys off the browser.
- **Decision**: Use Resend SDK in a Next.js App Router API route (`/api/contact`).
- **Alternatives considered**: Keep Formspree (rejected: 50/month limit, no server validation), SendGrid (rejected: heavier SDK, proprietary-leaning, less generous free tier), AWS SES (rejected: requires AWS account, over-engineered for portfolio site)
- **Consequences**: +server-side validation, +100 emails/day, +API key stays server-side, -one new API route to maintain, -new dependency (resend)

## Change Impact Summary

| Metric | Value |
|---|---|
| New production files | 1 |
| Modified production files | 2 (contact-form.tsx, contact.ts) |
| Modified config files | 1 (.env.example) |
| Modified test files | 1 (walking-skeleton.steps.ts) |
| Modified docs | 1 (ADR-004 status update) |
| New docs | 1 (ADR-006) + 4 (design docs) |
| Deleted files | 0 |
| New dependencies | 2 (resend, zod) |
| Removed dependencies | 0 |
