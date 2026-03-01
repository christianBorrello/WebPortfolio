# Walking Skeleton Plan -- Feature 0
# Christian Borrello
# Wave: DESIGN -- 2026-03-01

---

## Goal

Deploy a minimal Next.js site to Vercel with i18n structure and Formspree form wired end-to-end. After this, pushing to `main` updates the live site. Every feature built after this point starts from a working, deployed foundation.

---

## Prerequisites

- [ ] Node.js 20.x installed
- [ ] GitHub account with access to create a public repository
- [ ] Vercel account (free tier, linked to GitHub)
- [ ] Formspree account (free tier, one form created -- note the form ID)
- [ ] Domain `christianborrello.dev` purchased (optional -- skeleton works with Vercel subdomain first)

---

## Step 1: Scaffold Next.js Project

### Commands

```bash
cd /Users/christian/Desktop/WebPortfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

**Flags explained**:
- `--typescript`: TypeScript enabled
- `--tailwind`: Tailwind CSS preconfigured
- `--eslint`: ESLint preconfigured with next config
- `--app`: App Router (not Pages Router)
- `--src-dir`: Source code under `src/`
- `--no-import-alias`: No `@/` alias (use relative imports or configure later)
- `.`: Install in current directory (WebPortfolio already exists with docs)

### Post-scaffold cleanup

Remove default boilerplate content from `src/app/page.tsx` and `src/app/globals.css` (keep only Tailwind directives).

---

## Step 2: Install Dependencies

```bash
npm install next-intl gray-matter js-yaml
npm install --save-dev @types/js-yaml
```

---

## Step 3: Create Directory Structure

```bash
# Content directories
mkdir -p content/projects
mkdir -p messages/en

# Feature directories
mkdir -p src/features/hero
mkdir -p src/features/about
mkdir -p src/features/projects
mkdir -p src/features/contact

# Shared directories
mkdir -p src/shared/ui
mkdir -p src/shared/types
mkdir -p src/shared/lib

# i18n directory
mkdir -p src/i18n

# Public assets
mkdir -p public
```

---

## Step 4: Configure i18n (next-intl)

Create the following configuration files:

### `src/i18n/config.ts`
- Define supported locales: `['en']`
- Define default locale: `'en'`

### `src/i18n/request.ts`
- Configure next-intl request handler for App Router

### `messages/en/common.json`
- Nav labels, footer text, meta defaults

### `messages/en/hero.json`
- Placeholder identity strings (will be replaced with real content later)

### `messages/en/contact.json`
- Form labels, placeholders, success/error messages

### `next.config.ts`
- Add next-intl plugin configuration

### App Router locale layout
- Create `src/app/[locale]/layout.tsx` with `NextIntlClientProvider`
- Create `src/app/[locale]/page.tsx` as the home page

---

## Step 5: Create Placeholder Home Page

The home page should render:
1. A heading with Christian's name (from `hero.json` via `useTranslations`)
2. A paragraph with the positioning statement
3. A minimal contact form section

All text via i18n keys. No hardcoded strings.

---

## Step 6: Wire Contact Form to Formspree

### Environment variable

Create `.env.local`:
```
NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
```

Add `NEXT_PUBLIC_FORMSPREE_ID` to `.env.example` (without the actual value) for documentation.

### Form implementation

Create a minimal form in the contact feature:
- Three fields: name (text, optional), email (email, required), message (textarea, optional)
- Client-side validation: email required
- Submit via `fetch` POST to `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
- Display success state on 200, error state on failure
- Preserve field values on validation error

---

## Step 7: Initialize Git Repository and Push to GitHub

```bash
git init
git add .
git commit -m "feat: walking skeleton - Next.js with i18n and Formspree"
git branch -M main
git remote add origin https://github.com/christianBorrello/web-portfolio.git
git push -u origin main
```

### .gitignore

Verify the Next.js scaffold `.gitignore` includes:
- `.next/`
- `node_modules/`
- `.env.local`
- `out/`

---

## Step 8: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and import the GitHub repository
2. Vercel auto-detects Next.js -- accept default settings
3. Add environment variable: `NEXT_PUBLIC_FORMSPREE_ID` = your form ID
4. Trigger first deploy
5. Verify the site is live at `{project-name}.vercel.app`

### Custom domain (when ready)

1. Add `christianborrello.dev` as custom domain in Vercel project settings
2. Update DNS records at domain registrar (Cloudflare or Google Domains):
   - `A` record: `76.76.21.21`
   - `CNAME` for `www`: `cname.vercel-dns.com`
3. Vercel provisions SSL automatically (.dev requires HTTPS)

---

## Step 9: Verify End-to-End

### Verification checklist

| Check | Method | Expected Result |
|-------|--------|-----------------|
| Site loads | Visit Vercel URL | Page renders, status 200 |
| No hardcoded strings | Inspect page source | All visible text comes from locale files |
| i18n structure | Check `messages/en/` | JSON files exist for common, hero, contact |
| Form renders | Visit contact section | 3 fields visible, labels from i18n |
| Form validation | Submit without email | Inline error on email field, message preserved |
| Form submission | Submit with valid email | Formspree receives submission |
| Success state | After valid submission | "Message sent..." message displayed |
| Email notification | Check inbox | Christian receives email from Formspree |
| Auto-deploy | Push a small change | Vercel deploys within 2 minutes |
| Locale route | Visit `/en` | Page loads correctly |

---

## File Structure After Skeleton

```
WebPortfolio/
├── .env.local                       # NEXT_PUBLIC_FORMSPREE_ID (not committed)
├── .env.example                     # Documents required env vars
├── .gitignore
├── content/
│   └── projects/                    # Empty, ready for YAML files
├── docs/                            # Existing documentation
│   ├── design/
│   ├── requirements/
│   ├── profile/
│   └── ux/
├── messages/
│   └── en/
│       ├── common.json
│       ├── hero.json
│       └── contact.json
├── next.config.ts
├── package.json
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── features/
│   │   ├── hero/
│   │   │   └── hero-section.tsx
│   │   ├── about/                   # Empty, ready for US-02
│   │   ├── projects/                # Empty, ready for US-03
│   │   └── contact/
│   │       ├── contact-section.tsx
│   │       └── contact-form.tsx
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   └── shared/
│       ├── lib/
│       ├── types/
│       │   └── contact.ts
│       └── ui/
├── tailwind.config.ts
└── tsconfig.json
```

---

## Definition of Done -- Feature 0

All 6 criteria from AC-00 must pass:

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-00-01 | Production URL responds with status 200 | `curl -I {url}` returns 200 |
| AC-00-02 | Push on main triggers Vercel deploy within 2 minutes | Push a README change, observe Vercel dashboard |
| AC-00-03 | Form submission with valid email reaches Christian | Submit test form, check Formspree dashboard + email |
| AC-00-04 | No user-facing string hardcoded in React components | `grep -r "hardcoded" src/` returns nothing; visual inspection |
| AC-00-05 | .dev domain resolves to Vercel URL | `dig christianborrello.dev` resolves correctly (deferred if domain not yet purchased) |
| AC-00-06 | Placeholder page loads without build errors | `next build` succeeds, page renders in browser |

**Note on AC-00-05**: The walking skeleton can be considered complete without the custom domain. The Vercel subdomain (`*.vercel.app`) satisfies AC-00-01 and AC-00-02. Domain configuration is a separate step that can happen before or after feature development begins.

---

## Risk Mitigations

| Risk | Mitigation |
|------|------------|
| Domain purchase blocks progress | Start with Vercel subdomain, add domain later |
| Formspree free tier limits | 50/month is sufficient for development and early launch |
| next-intl configuration complexity | Follow official App Router guide, minimal config for single locale |
| Scaffold conflicts with existing docs/ | `create-next-app .` preserves existing directories |

---

## Estimated Duration

1-2 days for a developer familiar with Next.js. The majority of time is configuration, not coding.

---

## What Comes After Feature 0

Once the walking skeleton is verified:
1. **US-01 Hero**: Replace placeholder hero with real content and styling
2. **US-02 About**: Build about section
3. **US-03 Projects**: Build project grid + case study pages (content authoring is parallel work)
4. **US-04 Contact**: Enhance contact section styling and states

Each user story starts from a deployed, working site and keeps it deployed throughout.
