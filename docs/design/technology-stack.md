# Technology Stack -- Personal Portfolio CV Site

# Wave: DESIGN -- 2026-03-01

---

## Stack Overview

| Layer | Technology | Version | License | Purpose |
|-------|-----------|---------|---------|---------|
| Framework | Next.js | 15.x (latest stable) | MIT | SSG, App Router, image optimization, sitemap generation |
| Language | TypeScript | 5.x | Apache-2.0 | Type safety, IDE support, data model enforcement |
| UI Library | React | 19.x | MIT | Component model, bundled with Next.js |
| Styling | Tailwind CSS | 4.x | MIT | Utility-first CSS, build-time purging, zero runtime |
| i18n | next-intl | 4.x | MIT | App Router i18n, locale routing, message loading |
| Content parsing | gray-matter | 4.x | MIT | YAML frontmatter parsing for project content |
| Content parsing | js-yaml | 4.x | MIT | YAML parsing for structured project data |
| Hosting | Vercel | Free tier | N/A (service) | CDN, automated Git deploy, preview deploys |
| Form service | Formspree | Free tier | N/A (service) | Contact form relay, 50 submissions/month |
| Domain | yourdomain.dev | .dev TLD | N/A | Custom domain, ~12-15 EUR/year |

---

## Rationale per Technology

### Next.js 15 (MIT)

**Why**: SSG-first framework with built-in image optimization, automatic sitemap generation, and native Vercel integration. The App Router provides file-based routing with layout nesting.

**Alternatives considered**:
- **Astro**: Strong SSG contender with smaller JS output. Rejected because the owner's professional stack includes React -- demonstrating Next.js proficiency is directly relevant to the portfolio's purpose as a showcase piece. Astro's component island model adds conceptual complexity without clear benefit for this site's scope.
- **plain HTML/CSS**: Zero-dependency option. Rejected because it lacks i18n routing, image optimization, and component reuse. Would require custom build tooling for YAML content and locale management.

**Version pinning**: Pin major version in `package.json` (e.g., `"next": "^15.0.0"`). Minor/patch updates via Dependabot or manual `npm update`.

---

### TypeScript 5 (Apache-2.0)

**Why**: Enforces data model contracts (project content, i18n keys, form state). Catches mismatches between YAML content and component expectations at build time.

**Alternatives considered**:
- **JavaScript**: Less boilerplate. Rejected because the portfolio demonstrates engineering discipline -- type safety is a core value the developer advocates. Using JS would contradict the "quality-first" positioning.

---

### Tailwind CSS 4 (MIT)

**Why**: Utility-first approach produces minimal CSS. Build-time purging eliminates unused styles. No runtime overhead. Consistent spacing/color system without a design tool.

**Alternatives considered**:
- **CSS Modules**: Native scoping, zero dependencies. Rejected because CSS Modules require more manual design-system work (spacing, colors, typography) that Tailwind provides out of the box. For a solo developer without a designer, Tailwind's defaults produce professional results faster.
- **styled-components/emotion**: CSS-in-JS runtime. Rejected because runtime CSS-in-JS adds client-side JS weight and contradicts the SSG performance goal.

---

### next-intl 4 (MIT)

**Why**: Purpose-built for Next.js App Router i18n. Handles locale routing (`/en/`, `/it/`), message loading, and ICU formatting. Adding a locale requires only new JSON files.

**Alternatives considered**:
- **next-i18next**: Established library. Rejected because next-i18next was designed for Pages Router. next-intl has native App Router support with cleaner integration (no `getStaticProps` wrappers needed).
- **Manual i18n (custom JSON loader)**: Zero dependency. Rejected because locale-aware routing, middleware redirect, and message interpolation would need custom implementation. next-intl handles this in ~20 lines of configuration.

---

### gray-matter + js-yaml (MIT)

**Why**: Reads YAML project content files at build time. gray-matter handles frontmatter parsing; js-yaml handles structured YAML. Together they enable the `content/projects/*.yaml` approach.

**Alternatives considered**:
- **MDX**: Markdown with components. Rejected because case study content is structured data (8 defined sections, metadata, tags), not free-form prose. YAML enforces structure; MDX does not.
- **Contentlayer**: Type-safe content layer. Rejected because Contentlayer is currently unmaintained (no releases since 2023). Using a stalled dependency contradicts the "well-maintained open source" principle.

---

### Formspree (Free Tier Service)

**Why**: Zero backend, client-side form POST, 50 submissions/month. No API key exposed -- the form ID is public by design. Immediate email notifications.

**Alternatives considered**:
- **Resend**: Modern email API. Rejected for v1 because Resend requires an API route (server-side) to avoid exposing the API key. This adds complexity (Next.js API route, environment secret management) that is unnecessary for 50 submissions/month. Resend is a viable upgrade path if submission volume exceeds Formspree free tier.
- **Netlify Forms**: Netlify-native. Rejected because the hosting is on Vercel, not Netlify. Cross-platform form handling adds unnecessary coupling.

---

### Vercel (Free Tier Service)

**Why**: Zero-config Next.js deployment. Git push triggers build and deploy. Global CDN. Free custom domain support. Preview deploys on PRs.

**Alternatives considered**:
- **Cloudflare Pages**: Strong free tier, larger bandwidth. Rejected because Next.js SSG works natively on Vercel with zero configuration. Cloudflare Pages requires additional setup for Next.js features (image optimization, middleware).
- **GitHub Pages**: Free static hosting. Rejected because GitHub Pages does not support Next.js features (redirects, middleware, image optimization) without custom workarounds.

---

## Version Pinning Strategy

| Dependency Type | Strategy | Example |
|----------------|----------|---------|
| Framework (Next.js) | Pin major, allow minor/patch | `"next": "^15.0.0"` |
| Runtime deps (React, next-intl) | Pin major | `"react": "^19.0.0"` |
| Build deps (Tailwind, TypeScript) | Pin major | `"tailwindcss": "^4.0.0"` |
| Utility deps (gray-matter, js-yaml) | Pin major | `"gray-matter": "^4.0.0"` |

### Update Policy

- **Security patches**: Apply immediately
- **Minor versions**: Update monthly, verify build passes
- **Major versions**: Evaluate changelog, test in preview deploy before merging

---

## Dev Dependencies

| Tool | Version | License | Purpose |
|------|---------|---------|---------|
| ESLint | 9.x | MIT | Code quality enforcement |
| eslint-config-next | 15.x | MIT | Next.js-specific lint rules |
| Prettier | 3.x | MIT | Code formatting consistency |
| @types/react | 19.x | MIT | React type definitions |

---

## Dependency Count

**Target**: Under 15 production dependencies. The site is a portfolio, not an application. Every dependency is justified above.

**Current count**: 7 production dependencies (next, react, react-dom, next-intl, tailwindcss, gray-matter, js-yaml).

---

## License Compliance

All production dependencies use MIT or Apache-2.0 licenses. No proprietary, GPL, or commercial licenses in the dependency tree.
