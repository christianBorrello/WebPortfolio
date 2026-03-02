# Technology Stack: Contact Form Resend Migration

## New Dependencies

| Package | Version | License | Purpose | Justification |
|---|---|---|---|---|
| `resend` | ^4.x | MIT | Email delivery SDK | Official Node.js SDK for Resend API. Typed, minimal footprint (~15KB). Free tier: 100 emails/day, 3000/month. No alternative needed -- this is the SDK for the chosen email provider. |
| `zod` | ^3.x | MIT | Server-side validation | Schema validation for API route input. Zero dependencies, tree-shakeable, TypeScript-native inference. Already present in `package-lock.json` as a transitive dependency. |

## Existing Dependencies (No Changes)

| Package | Role in Migration |
|---|---|
| `next` 16.1.6 | App Router route handlers (`src/app/api/contact/route.ts`) |
| `react` 19.2.3 | ContactForm component (minimal changes) |
| `next-intl` ^4.8.3 | Unaffected -- i18n middleware does not match `/api/*` paths |
| `typescript` ^5 | Type safety for API route and schemas |

## Packages NOT Needed

| Package | Why Not |
|---|---|
| `nodemailer` | Lower-level SMTP client. Resend SDK is simpler and purpose-built for the Resend API. |
| `next-rate-limit` | Overkill for portfolio traffic. Resend's 100/day cap provides a natural ceiling. Add later if needed. |
| `helmet` / `cors` | Same-origin API route. No cross-origin requests. No session cookies. |
| `@sendgrid/mail` | Proprietary-leaning, heavier SDK. Resend is simpler and has a more generous free tier. |

## Environment Variables

| Variable | Scope | Value |
|---|---|---|
| `RESEND_API_KEY` | **Server-side only** | Resend API key from dashboard (starts with `re_`) |
| `NEXT_PUBLIC_FORMSPREE_ID` | **REMOVE** | No longer needed after migration |

The `RESEND_API_KEY` must be set in:
- Vercel project settings (production + preview environments)
- Local `.env.local` for development

### Deployment Transition Sequence

To avoid downtime and preserve rollback capability:

1. **Before deploy**: Add `RESEND_API_KEY` to Vercel project settings (production + preview). Keep `NEXT_PUBLIC_FORMSPREE_ID` — it's harmless as unused code won't reference it.
2. **Deploy**: Push the code that replaces Formspree with Resend.
3. **Verify**: Confirm the contact form works on the live site by sending a test message.
4. **After verification**: Remove `NEXT_PUBLIC_FORMSPREE_ID` from Vercel project settings and `.env.local`.

If the deploy fails or the form breaks, rollback to the previous deployment — Formspree will still work because its env var is still set.

## Resend Domain Verification

The `from` address in production (`contact@christianborrello.dev`) requires domain verification in Resend.

### Setup Steps

1. **Create Resend account** at [resend.com](https://resend.com)
2. **Add domain**: Settings → Domains → Add `christianborrello.dev`
3. **Add DNS records**: Resend provides 3 DNS records to add (MX, SPF via TXT, DKIM via TXT). Add these in your domain registrar / DNS provider.
4. **Verify**: Resend checks DNS propagation (usually < 5 minutes, can take up to 72h).
5. **Get API key**: Settings → API Keys → Create key with "Sending access" permission.

### Development vs Production

| Environment | `from` address | Notes |
|---|---|---|
| Local dev | `onboarding@resend.dev` | Resend's sandbox address, works without domain verification. Emails only delivered to the account owner's email. |
| Production | `contact@christianborrello.dev` | Requires verified domain. Full delivery to any recipient. |

The API route should use an environment variable for the `from` address, or hardcode `contact@christianborrello.dev` and accept that local dev emails will fail unless using `onboarding@resend.dev` in a separate env var. Simplest approach: hardcode the production address; for local testing, use the Playwright mock (which doesn't hit Resend at all).

## Runtime Environment

| Concern | Solution |
|---|---|
| Runtime | Vercel serverless functions (Node.js) |
| Cold start | Minimal -- route handler + resend SDK only |
| Region | Auto (Vercel default, or configure to match Resend's API region) |
| Timeout | Vercel default (10s for hobby, 60s for pro). Resend API typically responds in <1s. |
