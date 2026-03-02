# Technology Stack: Italian Localization

## New Dependencies

None. No new packages are required.

## Existing Dependencies (No Changes)

| Package | Version | License | Role in This Feature |
|---|---|---|---|
| `next-intl` | ^4.x | MIT | Already handles locale routing, `useTranslations()`, `useLocale()`, `Link` with locale prop. Adding a locale means adding config + message files, not new code. |
| `next` | 16.x | MIT | `[locale]` dynamic route segment, `generateStaticParams()`, static export. All already in use. |
| `js-yaml` | ^4.x | MIT | YAML parsing for project content files. Already used by content loader. |
| `gray-matter` | ^4.x | MIT | Front-matter parsing (if used by content loader). Already installed. |

## Packages NOT Needed

| Package | Why Not |
|---|---|
| `i18next` / `react-i18next` | next-intl already provides the full i18n layer. Adding a second i18n library would create redundancy. |
| `@formatjs/intl` | next-intl uses FormatJS internally. No need to install separately. |
| `yaml` (npm package) | `js-yaml` is already installed and sufficient. |
| Any translation management SDK | 5 project files and a handful of JSON message files. Manual translation is appropriate at this scale. |
| Any locale detection library | next-intl middleware handles locale detection and redirect via Accept-Language header. |

## Environment Variables

No new environment variables required.

## Build Impact

| Concern | Assessment |
|---|---|
| Build time | Negligible increase. 5 additional YAML files parsed at build time. |
| Bundle size | Zero increase. Content is loaded at build time, not bundled into client JS. Message JSON files are loaded per-locale by next-intl (only the active locale is sent to the client). |
| Static output size | Doubles for page routes (each page rendered in 2 locales). This is expected and correct for SSG i18n. |
| CI/CD | No pipeline changes needed. `next build` already handles `generateStaticParams()` for all locale + slug combinations. |
