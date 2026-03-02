import type { MetadataRoute } from "next";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { getAllProjects } from "@/shared/lib/content-loader";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://christianborrello.dev";

function buildAlternates(
  pathByLocale: (locale: Locale) => string
): { languages: Record<string, string> } {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, `${SITE_URL}${pathByLocale(l)}`])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
    alternates: buildAlternates((l) => `/${l}`),
  }));

  const slugs = [
    ...new Set(
      locales.flatMap((locale) =>
        getAllProjects(locale).map((p) => p.slug)
      )
    ),
  ];

  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${SITE_URL}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: buildAlternates((l) => `/${l}/projects/${slug}`),
    }))
  );

  return [...homepageEntries, ...projectEntries];
}
