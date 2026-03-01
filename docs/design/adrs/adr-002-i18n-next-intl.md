# ADR-002: Internationalization with next-intl

## Status

Accepted

## Context

All user-facing strings must be externalized from components (RF-06). The site launches with English only but must support adding Italian (and other languages) by adding locale files without modifying components. The architecture must support locale-based routing (`/en/`, `/it/`).

## Decision

Use next-intl 4.x for i18n. Locale files in `messages/{locale}/`, organized by feature namespace (hero.json, about.json, etc.). App Router integration with `[locale]` dynamic segment.

## Alternatives Considered

### next-i18next
Established library with large community. **Rejected because**: next-i18next was designed for the Pages Router. Its App Router support is incomplete and requires workarounds (`getStaticProps`-style wrappers). next-intl is purpose-built for App Router.

### Custom JSON loader
Zero-dependency approach: read JSON files at build time, pass strings as props. **Rejected because**: This requires custom implementation for locale-aware routing, middleware redirects, and message interpolation. next-intl provides all of this in approximately 20 lines of configuration, with type safety and ICU message format support.

## Consequences

- **Positive**: Adding a language requires only new JSON files -- no component changes
- **Positive**: Locale-aware routing (`/en/projects/sagitterhub`) works out of the box
- **Positive**: `useTranslations` hook provides clean API in components
- **Negative**: Adds a runtime dependency (~8KB gzipped)
- **Negative**: next-intl major version changes may require migration
