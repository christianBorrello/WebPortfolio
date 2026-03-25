# ADR-004: Formspree for Contact Form over API Route

## Status

Superseded by [ADR-006](adr-006-resend-over-formspree.md)

## Context

The contact form needs to relay submissions to the owner's email. The site has no backend. The solution must work within the free tier and require zero server-side infrastructure.

## Decision

Use Formspree free tier. The contact form POSTs directly from the browser to `https://formspree.io/f/{FORM_ID}`. No Next.js API route is needed. The form ID is a public value (similar to embedding a form via iframe).

## Alternatives Considered

### Resend via Next.js API Route
Modern email API with good developer experience. **Rejected for v1 because**: Resend requires a server-side API route to avoid exposing the API key in client-side code. This means adding a Next.js API route, managing an environment secret, and handling server-side error cases. This complexity is not justified for a form that will receive fewer than 50 submissions per month. Resend is a viable upgrade path if Formspree limits are reached.

### Netlify Forms
Built-in form handling for Netlify-hosted sites. **Rejected because**: The site is hosted on Vercel, not Netlify. Using Netlify Forms would require either deploying to Netlify (losing Vercel-native Next.js optimizations) or using their API externally (adding unnecessary coupling).

## Consequences

- **Positive**: Zero backend code, zero API routes, zero secrets management
- **Positive**: Immediate email notifications to the owner
- **Positive**: Free tier (50 submissions/month) is sufficient for portfolio traffic
- **Negative**: 50/month limit -- could be reached if the form is spammed
- **Negative**: No server-side validation (client-side only)
- **Mitigation**: Formspree includes basic spam filtering. If limit is exceeded, migrate to Resend with API route.
