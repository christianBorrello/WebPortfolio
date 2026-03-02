import type { Metadata } from "next";
import { type Locale, locales } from "@/i18n/config";
import { SITE_URL } from "./site-config";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

function buildAlternateLanguages(
  pathBuilder: (locale: Locale) => string
): Record<string, string> {
  return Object.fromEntries(
    locales.map((l) => [l, pathBuilder(l)])
  );
}

export function buildHomeMetadata(
  description: string,
  locale: Locale
): Metadata {
  const title = "Christian Borrello — Software Engineer";
  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages((l) => `${SITE_URL}/${l}`),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Christian Borrello",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function buildCaseStudyMetadata(
  title: string,
  description: string,
  locale: Locale,
  slug?: string
): Metadata {
  const canonicalUrl = slug
    ? `${SITE_URL}/${locale}/projects/${slug}`
    : undefined;

  return {
    title,
    description,
    alternates: {
      ...(canonicalUrl ? { canonical: canonicalUrl } : {}),
      ...(slug
        ? {
            languages: buildAlternateLanguages(
              (l) => `${SITE_URL}/${l}/projects/${slug}`
            ),
          }
        : {}),
    },
    openGraph: {
      title: `${title} | Christian Borrello`,
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      siteName: "Christian Borrello",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Christian Borrello`,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
