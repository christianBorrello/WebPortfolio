# ADR-001: Next.js with Static Site Generation

## Status

Accepted

## Context

The portfolio site needs a framework that supports:
- Static pre-rendering for performance and SEO
- i18n routing with locale-based URL segments
- Image optimization for portfolio assets
- Automatic sitemap generation
- Vercel-native deployment with zero configuration
- React-based components (relevant to Christian's professional profile)

The site has no backend, no database, and no dynamic content at runtime.

## Decision

Use Next.js 15 with Static Site Generation (SSG) via the App Router.

All pages are pre-rendered at build time. No server-side rendering (SSR) or Incremental Static Regeneration (ISR) is used. No API routes are needed -- the contact form submits directly to Formspree from the client.

## Alternatives Considered

### Astro
Strong SSG framework with smaller JS output and content-focused architecture. Supports React components via islands. **Rejected because**: Christian's professional stack includes React/Next.js -- demonstrating proficiency with Next.js is directly relevant to the portfolio's purpose as an engineering showcase. Astro's island architecture adds conceptual complexity for component communication without clear benefit at this site's scale.

### Plain HTML/CSS + Static Hosting
Zero dependencies, maximum simplicity. **Rejected because**: Lacks i18n routing, image optimization, component reuse, and sitemap generation. Would require custom tooling for YAML content loading and locale management. The maintenance cost of custom tooling exceeds the maintenance cost of Next.js for this project.

## Consequences

- **Positive**: Zero-config Vercel deployment, built-in image optimization, native i18n support via next-intl, automatic sitemap, React component model
- **Positive**: Build-time errors catch content/template mismatches before deployment
- **Negative**: Heavier framework than needed for a 6-page site
- **Negative**: Next.js major version upgrades require migration effort
- **Mitigation**: Pin major version, update on Christian's schedule
