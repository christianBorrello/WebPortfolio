# Portfolio Template

A modern, bilingual (EN/IT) developer portfolio built with Next.js 16, TypeScript, and Tailwind CSS 4. Designed as a clean starting point — clone it, customize the content, and deploy your own portfolio in minutes.

## Features

- **Bilingual** — English + Italian with locale-based routing (`/en/`, `/it/`)
- **Dark / Light theme** — System-aware toggle with smooth transitions
- **Contact form** — Resend email integration with Zod validation and React Email templates
- **Case studies** — YAML-driven project pages with dedicated routes
- **Experience timeline** — Scroll-reveal animated work history
- **SEO** — Open Graph, Twitter cards, dynamic sitemap, canonical URLs
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation
- **Tested** — BDD acceptance tests (Playwright) + unit tests (Vitest)
- **CI/CD** — GitHub Actions pipeline (lint, typecheck, build, e2e)
- **Deploy-ready** — One-click Vercel deployment

## Tech Stack

| Category    | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 16 (App Router, SSG)        |
| Language    | TypeScript                          |
| Styling     | Tailwind CSS 4                      |
| i18n        | next-intl                           |
| Email       | Resend + React Email                |
| Validation  | Zod                                 |
| E2E Tests   | Playwright                          |
| Unit Tests  | Vitest                              |
| CI/CD       | GitHub Actions                      |
| Hosting     | Vercel                              |

## Quick Start

```bash
# 1. Clone
git clone https://github.com/your-username/portfolio.git my-portfolio
cd my-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local and add your RESEND_API_KEY

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

### 1. Your identity (one file)

Edit **`src/shared/lib/owner-config.ts`**:

```ts
export const OWNER = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  domain: "https://yoursite.dev",
  linkedin: "https://www.linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  contactFrom: "Portfolio Contact <contact@yoursite.dev>",
} as const;
```

This is the single source of truth for your name, email, social links, and domain. It's referenced by metadata, navigation, footer, and the contact form API.

### 2. Your content

| What                  | Where                                  | Format |
| --------------------- | -------------------------------------- | ------ |
| Hero text             | `messages/{locale}/hero.json`          | JSON   |
| About section         | `messages/{locale}/about.json`         | JSON   |
| Nav & footer labels   | `messages/{locale}/common.json`        | JSON   |
| Experience labels     | `messages/{locale}/experience.json`    | JSON   |
| Project labels        | `messages/{locale}/projects.json`      | JSON   |
| Contact form labels   | `messages/{locale}/contact.json`       | JSON   |
| Work experience data  | `content/experience/{locale}.yaml`     | YAML   |
| Project case studies  | `content/projects/{locale}/*.yaml`     | YAML   |

The existing files contain example content — replace them with your own text and data.

### 3. Your photo

Replace `public/assets/profile-placeholder.svg` with your photo. Update the `src` path in `src/features/about/about-section.tsx` if you change the filename.

### 4. Your logo

Replace `public/assets/logo.svg` with your own logo or monogram.

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── [locale]/               # Locale-aware pages
│   │   ├── layout.tsx          # Shell with nav + footer
│   │   ├── page.tsx            # Homepage
│   │   └── projects/[slug]/    # Case study pages
│   ├── api/contact/            # Contact form API (Resend)
│   └── sitemap.ts              # Dynamic sitemap
├── features/                   # Feature modules
│   ├── hero/                   # Hero section
│   ├── about/                  # About section
│   ├── experience/             # Timeline with scroll reveal
│   ├── projects/               # Project cards + case studies
│   └── contact/                # Contact form + email template
├── shared/                     # Cross-feature code
│   ├── lib/                    # Utilities (content loader, metadata, owner config)
│   ├── ui/                     # Navigation, footer, theme toggle
│   ├── hooks/                  # Shared React hooks
│   └── types/                  # TypeScript interfaces
└── i18n/                       # Internationalization config

content/                        # Structured data (YAML)
messages/                       # UI translations (JSON)
tests/
├── acceptance/                 # Playwright BDD tests
└── unit/                       # Vitest unit tests
docs/design/                    # Architecture docs, ADRs
```

## Scripts

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Start development server                          |
| `npm run build`      | Production build (SSG)                            |
| `npm start`          | Serve production build                            |
| `npm run lint`       | ESLint check                                      |
| `npm run typecheck`  | TypeScript type checking                          |
| `npm run test:unit`  | Run unit tests (Vitest)                           |
| `npm run test:e2e`   | Run acceptance tests (Playwright)                 |
| `npm run ci`         | Full CI pipeline: lint + typecheck + test:unit + build |

## Deployment

### Vercel (recommended)

1. Push your repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Set environment variables:
   - `RESEND_API_KEY` — your Resend API key
   - `NEXT_PUBLIC_SITE_URL` — your production domain (e.g., `https://yourdomain.dev`)
4. Deploy — Vercel auto-deploys on every push to `main`

### Contact form setup

The contact form uses [Resend](https://resend.com) to send emails:

1. Create a free account at [resend.com](https://resend.com)
2. Add and verify your domain
3. Generate an API key
4. Set `RESEND_API_KEY` in your `.env.local` (dev) and Vercel environment variables (prod)

## Architecture

See `docs/design/` for detailed documentation:

- **Architecture Design** — C4 diagrams, component boundaries, data flow
- **ADRs** — Architecture Decision Records explaining key choices
- **Technology Stack** — Rationale for every dependency
- **Data Models** — TypeScript interfaces and content schemas

## License

MIT
