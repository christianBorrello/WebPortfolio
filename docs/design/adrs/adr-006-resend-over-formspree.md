# ADR-006: Resend via API Route over Formspree

## Status

Accepted (supersedes [ADR-004](adr-004-formspree-over-api-route.md))

## Context

The contact form was using Formspree (ADR-004) but the integration was never activated — the environment variable `NEXT_PUBLIC_FORMSPREE_ID` was not set and no `.env.local` existed. Rather than configure Formspree, this is an opportunity to adopt a more robust solution with server-side validation and higher sending limits.

## Decision

Use Resend SDK via a Next.js API route (`POST /api/contact`). The form submits JSON to the local API route, which validates input with Zod and sends email via Resend. The API key is server-side only (`RESEND_API_KEY`, no `NEXT_PUBLIC_` prefix).

## Alternatives Considered

### Formspree (previous choice, ADR-004)

Client-side form submission to external service. **Rejected because**: never activated, 50/month free tier limit, no server-side validation, exposes form ID in client code.

### EmailJS

Client-side email sending via templates. **Rejected because**: similar to Formspree — client-side only, no server-side validation, API key exposed in browser, template-based approach less flexible than code.

## Consequences

- **Positive**: Server-side Zod validation with typed error responses
- **Positive**: 100 emails/day free tier (vs Formspree's 50/month)
- **Positive**: API key never exposed to client
- **Positive**: Reply-To header enables direct inbox replies
- **Negative**: Requires API route (minimal server-side code)
- **Negative**: Requires Resend account and domain verification for production
- **Mitigation**: Development uses `onboarding@resend.dev` sender; production requires verified `yourdomain.dev` domain
