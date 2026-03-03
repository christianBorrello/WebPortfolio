# Evolution: contact-form-resend-migration

## Summary

Replaced client-side Formspree POST with a server-side Next.js API route (`POST /api/contact`) that validates input with Zod and sends email via the Resend SDK. The contact form behavior is unchanged from the visitor's perspective — only the delivery mechanism changed.

## Goal

Migrate contact form email delivery from Formspree (client-side, 50/month limit, no server validation) to Resend (server-side, 100/day limit, Zod validation, API key protected).

## Execution Timeline

| Marker | Timestamp |
|--------|-----------|
| First step started | 2026-03-02 13:38 UTC |
| Implementation completed | 2026-03-02 ~15:00 UTC |
| Review + hardening | 2026-03-03 |

## Changes Made

### Production Code

| File | Change |
|------|--------|
| `src/app/api/contact/route.ts` | **Created.** API route handler: parses JSON body, validates with Zod schema, sends email via Resend SDK, returns typed JSON responses (200/400/500). Includes JSON parse guard and API key presence check. |
| `src/features/contact/contact-form.tsx` | **Modified.** `handleSubmit` now POSTs JSON to `/api/contact` instead of FormData to Formspree. Null-safe field extraction with `?? ""`. |
| `src/features/contact/emails/contact-notification.tsx` | **Created.** React Email HTML template for contact notifications. Dark theme matching site design. Uses `@react-email/components`. |
| `src/shared/types/contact.ts` | **Modified.** Added `ContactResponse` discriminated union type (success, validation error, server error) and `ContactFieldError` type. Existing `FormStatus` unchanged. |
| `.env.example` | **Modified.** Replaced `NEXT_PUBLIC_FORMSPREE_ID` with `RESEND_API_KEY`. |

### Documentation

| File | Change |
|------|--------|
| `docs/design/adrs/adr-006-resend-over-formspree.md` | **Created.** Documents migration decision, rejected alternatives (Formspree, EmailJS). |
| `docs/design/adrs/adr-004-formspree-over-api-route.md` | **Modified.** Status changed to "Superseded by ADR-006". |

### Tests

| File | Change |
|------|--------|
| `tests/acceptance/steps/contact-section.steps.ts` | **Modified.** All 12 scenarios enabled (previously skipped). Mock intercepts use `**/api/contact` pattern with typed response bodies. |
| `tests/acceptance/steps/walking-skeleton.steps.ts` | **Modified.** Contact form smoke test uses `/api/contact` intercept. Locale text test extended to include YAML content files alongside JSON locale files. |

## Architecture Decisions

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-006 | Resend via API route over Formspree | Server-side validation, 100/day vs 50/month, API key not exposed to browser |

## Key Design Choices

- **Zod `.default("")` over `.optional()`**: Optional fields always resolve to `string` after parsing — downstream code never handles `undefined`.
- **HTML email template**: Enhancement over design spec's plain text. Uses `@react-email/components` for type-safe, styled notifications matching the site's dark theme.
- **JSON parse guard**: `request.json()` wrapped in try/catch returning 400, not unhandled 500.
- **API key presence check**: Explicit guard with `console.error` before Resend instantiation for debuggable misconfiguration.
- **Lazy Resend instantiation**: Client created per-request inside the handler to avoid build-time API key requirement (SSG compatibility).

## Key Metrics

| Metric | Value |
|--------|-------|
| New production files | 2 (route.ts, contact-notification.tsx) |
| Modified production files | 2 (contact-form.tsx, contact.ts) |
| New dependencies | 2 (resend, zod) + 1 (@react-email/components) |
| Acceptance tests enabled | 12 (previously skipped) |
| Total test suite | 21 passing, 13 skipped (future scenarios) |
| Build output | 17 static pages + 1 API route |

## Review Findings Applied

| Finding | Severity | Resolution |
|---------|----------|------------|
| `request.json()` throws on malformed body | HIGH | Added try/catch returning 400 with typed error |
| No API key presence check | IMPORTANT | Added guard with `console.error` before Resend instantiation |
| `FormData.get()` null coalescing | MEDIUM | Added `?? ""` fallback for name and message fields |
| Empty message passes validation | MEDIUM (by design) | No change — message is optional per US-04 acceptance criteria |
| Client ignores 400 response details | MEDIUM (by design) | No change — documented v1 decision |
| Data URI logo blocked in email clients | MEDIUM | No change — notification goes to owner's inbox only |

## What's Next

- **Enable remaining 13 acceptance test scenarios**: Cover edge cases and future locale scenarios.
- **Resend domain verification**: Verify `christianborrello.dev` in Resend dashboard for production `from` address (currently uses `onboarding@resend.dev` in dev).
- **Rate limiting**: Not needed in v1 (Resend 100/day ceiling + Vercel DDoS protection). Add via Edge Middleware if abuse occurs.
