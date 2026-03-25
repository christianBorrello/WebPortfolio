# Production Readiness Checklist -- Personal Portfolio CV Site

# Wave: DESIGN (Infrastructure) -- 2026-03-01

---

## Purpose

This checklist defines everything that must be true before `yourdomain.dev` is publicly shared on LinkedIn, in job applications, and with recruiters. "Live" means intentionally shared, not just technically accessible.

The walking skeleton makes the site technically reachable. This checklist validates that it is ready to represent the owner professionally.

---

## 1. Infrastructure Readiness

### Deployment Pipeline

| Check | Verification | Status |
|-------|-------------|--------|
| GitHub repository is public | Visit `github.com/christianBorrello/web-portfolio` | [ ] |
| GitHub Actions CI workflow exists and passes | Green check on latest `main` commit | [ ] |
| Branch protection enabled on `main` | GitHub Settings > Branches shows rules active | [ ] |
| Vercel project connected to GitHub repo | Vercel dashboard shows linked repository | [ ] |
| Vercel auto-deploys on merge to main | Push a change, verify deploy within 2 minutes | [ ] |
| Preview deploys work on PR branches | Open a PR, verify Vercel bot posts preview URL | [ ] |

### Domain and SSL

| Check | Verification | Status |
|-------|-------------|--------|
| Custom domain `yourdomain.dev` configured | Vercel domain settings show "Valid Configuration" | [ ] |
| DNS A record points to `76.76.21.21` | `dig yourdomain.dev` returns correct IP | [ ] |
| DNS CNAME for www points to `cname.vercel-dns.com` | `dig www.yourdomain.dev` returns CNAME | [ ] |
| HTTPS works | `curl -I https://yourdomain.dev` returns 200 | [ ] |
| HTTP redirects to HTTPS | `curl -I http://yourdomain.dev` returns 301 to https | [ ] |
| www redirects to apex domain | `curl -I https://www.yourdomain.dev` redirects | [ ] |

### Environment

| Check | Verification | Status |
|-------|-------------|--------|
| `NEXT_PUBLIC_FORMSPREE_ID` set in Vercel | Vercel > Project Settings > Environment Variables | [ ] |
| `.env.local` is in `.gitignore` | `grep '.env.local' .gitignore` returns match | [ ] |
| `.env.example` committed with variable names | File exists without actual values | [ ] |

---

## 2. Content Completeness

### Sections

| Section | Content Written | i18n Keys Complete | Visually Reviewed | Status |
|---------|----------------|-------------------|-------------------|--------|
| Hero | [ ] | [ ] | [ ] | [ ] |
| About | [ ] | [ ] | [ ] | [ ] |
| Projects overview (5 cards) | [ ] | [ ] | [ ] | [ ] |
| Contact form | [ ] | [ ] | [ ] | [ ] |
| Navigation | [ ] | [ ] | [ ] | [ ] |
| Footer | [ ] | [ ] | [ ] | [ ] |

### Case Studies

| Project | YAML Content Written | All 8 Sections Complete | Reviewed for Tone | Status |
|---------|---------------------|------------------------|-------------------|--------|
| SagitterHub | [ ] | [ ] | [ ] | [ ] |
| Azure Infrastructure | [ ] | [ ] | [ ] | [ ] |
| OpenGL Renderer | [ ] | [ ] | [ ] | [ ] |
| iOS Habit Tracker | [ ] | [ ] | [ ] | [ ] |
| Unity Soulslike | [ ] | [ ] | [ ] | [ ] |

### Content Quality Gates

| Check | Verification | Status |
|-------|-------------|--------|
| No hardcoded strings in React components | `grep -r ">[A-Z]" src/ --include="*.tsx"` returns only dynamic content | [ ] |
| All user-facing text from locale files | Visual inspection + automated check | [ ] |
| Azure metrics (savings, resource count) verified | The owner confirms numbers are accurate | [ ] |
| Tone consistent with SA-07 (direct, not corporate) | Read all text aloud -- does it sound like you? | [ ] |
| No apologetic framing for personal projects | Review project card descriptions | [ ] |
| "What didn't work" sections are honest, not empty | Read each case study's honest-limits section | [ ] |

---

## 3. SEO and Social Sharing

### Meta Tags

| Check | Verification | Status |
|-------|-------------|--------|
| Home page has `<title>` | View source or browser tab | [ ] |
| Home page has `<meta name="description">` | View source | [ ] |
| Each case study page has unique title | Navigate to each and check browser tab | [ ] |
| Each case study page has unique description | View source on each | [ ] |

### Open Graph (LinkedIn Sharing)

| Check | Verification | Status |
|-------|-------------|--------|
| `og:title` set on home page | View source | [ ] |
| `og:description` set on home page | View source | [ ] |
| `og:image` set (default OG image) | View source, verify `public/og-image.png` exists | [ ] |
| `og:url` set | View source | [ ] |
| `og:type` set to `website` | View source | [ ] |
| LinkedIn preview looks correct | Use LinkedIn Post Inspector or opengraph.xyz | [ ] |

### Sitemap and Robots

| Check | Verification | Status |
|-------|-------------|--------|
| `sitemap.xml` accessible | Visit `https://yourdomain.dev/sitemap.xml` | [ ] |
| `robots.txt` accessible | Visit `https://yourdomain.dev/robots.txt` | [ ] |
| `robots.txt` allows all crawlers | Content includes `Allow: /` | [ ] |
| Sitemap includes all pages | Home + 5 case study URLs listed | [ ] |

---

## 4. Performance

### Core Web Vitals

| Metric | Target | Verification | Status |
|--------|--------|-------------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse on production URL | [ ] |
| FCP (First Contentful Paint) | < 1.8s | Lighthouse on production URL | [ ] |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse on production URL | [ ] |
| Total Blocking Time | < 200ms | Lighthouse on production URL | [ ] |

### Bundle Size

| Metric | Target | Verification | Status |
|--------|--------|-------------|--------|
| Total JS (gzipped) | < 100KB | `next build` output or Lighthouse | [ ] |
| Total CSS (gzipped) | < 15KB | `next build` output or Lighthouse | [ ] |

### How to Verify

Run Lighthouse in Chrome DevTools (Incognito mode) on the production URL:
1. Open `https://yourdomain.dev` in Chrome Incognito
2. DevTools (F12) > Lighthouse tab
3. Categories: Performance, Accessibility, Best Practices, SEO
4. Device: Mobile (more stringent)
5. Target: all scores > 90

---

## 5. Accessibility

| Check | Verification | Status |
|-------|-------------|--------|
| Lighthouse Accessibility score > 90 | Lighthouse audit | [ ] |
| Color contrast meets WCAG AA | Lighthouse or axe DevTools | [ ] |
| Heading hierarchy is semantic (h1 > h2 > h3) | View source / Accessibility tree | [ ] |
| All form inputs have associated labels | Inspect contact form HTML | [ ] |
| Skip-to-content link present | Tab from page load, verify focus | [ ] |
| Images have alt text | Inspect `<img>` tags (when images added) | [ ] |
| Site navigable by keyboard | Tab through all interactive elements | [ ] |
| Focus indicators visible | Tab through and verify visual focus ring | [ ] |

---

## 6. Contact Form Verification

| Check | Verification | Status |
|-------|-------------|--------|
| Form renders with all three fields | Visual inspection | [ ] |
| Email field is required | Submit without email, verify error | [ ] |
| Name and message fields are optional | Submit with only email, verify success | [ ] |
| Validation error preserves entered data | Enter data, trigger error, verify fields retain values | [ ] |
| Successful submission shows confirmation | Submit valid form, verify success message | [ ] |
| Error state shows on Formspree failure | Disconnect network, submit, verify error message | [ ] |
| Formspree receives the submission | Check Formspree dashboard after test submit | [ ] |
| The owner receives email notification | Check inbox after test submit | [ ] |
| Form fields clear after successful submission | Submit, verify fields reset | [ ] |

---

## 7. Cross-Browser and Device Check

### Browsers (Manual Spot Check)

| Browser | Home Page Loads | Form Works | Case Study Navigation | Status |
|---------|----------------|-----------|----------------------|--------|
| Chrome (desktop) | [ ] | [ ] | [ ] | [ ] |
| Safari (desktop) | [ ] | [ ] | [ ] | [ ] |
| Firefox (desktop) | [ ] | [ ] | [ ] | [ ] |
| Safari (iOS) | [ ] | [ ] | [ ] | [ ] |
| Chrome (Android) | [ ] | [ ] | [ ] | [ ] |

### Responsive Breakpoints

| Breakpoint | Layout Correct | Text Readable | Form Usable | Status |
|------------|---------------|---------------|-------------|--------|
| Mobile (375px) | [ ] | [ ] | [ ] | [ ] |
| Tablet (768px) | [ ] | [ ] | [ ] | [ ] |
| Desktop (1280px) | [ ] | [ ] | [ ] | [ ] |
| Wide (1920px) | [ ] | [ ] | [ ] | [ ] |

---

## 8. Code Quality

| Check | Verification | Status |
|-------|-------------|--------|
| `npm run lint` passes with zero warnings | Run locally and in CI | [ ] |
| `npx tsc --noEmit` passes | Run locally and in CI | [ ] |
| `npm run build` succeeds | Run locally and in CI | [ ] |
| No `console.log` statements in committed code | `grep -r "console.log" src/` returns nothing | [ ] |
| No TODO comments in production code | `grep -r "TODO" src/` returns nothing | [ ] |
| Dependencies are minimal (< 15 production) | `npm ls --depth=0 --prod` | [ ] |
| `npm audit` shows no high/critical vulnerabilities | `npm audit --audit-level=high` | [ ] |

---

## 9. Repository Presentation

The GitHub repository is part of the portfolio. Recruiters will review it.

| Check | Verification | Status |
|-------|-------------|--------|
| Repository is public | Verify in GitHub settings | [ ] |
| Repository has a clear description | GitHub > Settings > About | [ ] |
| README.md exists with project overview | View repository root | [ ] |
| README includes local dev setup instructions | `npm install && npm run dev` documented | [ ] |
| CI badge in README shows pipeline status | Badge renders with green status | [ ] |
| `.github/pull_request_template.md` exists | Open a PR, verify template loads | [ ] |
| Commit history is clean (squash merges) | `git log --oneline main` shows meaningful messages | [ ] |
| No committed secrets or `.env.local` | `git log --all -p -- '.env*'` returns nothing sensitive | [ ] |

---

## 10. Pre-Launch Final Steps

Execute these in order on launch day:

1. **Run full CI locally**: `npm run ci` (lint + typecheck + build)
2. **Run Lighthouse on production URL**: All scores > 90
3. **Test contact form on production**: Submit real test message, verify email
4. **Check LinkedIn preview**: Paste URL in LinkedIn Post Inspector
5. **Check all case study pages load**: Visit each `/en/projects/{slug}` URL
6. **Verify rollback works**: Promote previous deployment in Vercel, then promote back
7. **Screenshot the production site** for personal records

---

## 11. Post-Launch Monitoring (First 48 Hours)

| Check | When | Action If Failed |
|-------|------|-----------------|
| Site responds with 200 | Every 12 hours | Check Vercel dashboard for deploy status |
| Formspree submission count < 50 | Daily | Monitor for spam; consider honeypot field |
| Vercel bandwidth < 10 GB | After 48 hours | Verify no hotlinked assets from external sites |
| No error emails from GitHub Actions | Ongoing | Fix and push if CI breaks |

---

## 12. Items Explicitly Deferred to v2

These are not blockers for launch. Documented here to prevent scope creep.

| Item | Why Deferred | When to Add |
|------|-------------|-------------|
| Umami analytics | Site must exist before measuring traffic | Iteration 2, after launch |
| Lighthouse CI in pipeline | Manual Lighthouse sufficient for launch | After first 5 PRs with visual changes |
| Security scanning (`npm audit` in CI) | 7 dependencies, all MIT, low risk | When dependency count exceeds 15 |
| Italian locale | EN-only for primary audience (international recruiters) | v2, after analytics confirm Italian traffic |
| OG images per case study | Default OG image sufficient for launch | v2, if LinkedIn sharing shows value |
| Custom 404 page styling | Functional 404 exists, styling is cosmetic | After all main sections complete |
| Automated accessibility testing | Manual Lighthouse check sufficient | v2 pipeline evolution |
