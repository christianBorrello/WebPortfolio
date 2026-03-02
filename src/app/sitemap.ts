import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllProjects } from "@/shared/lib/content-loader";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://christianborrello.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
  }));

  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllProjects(locale).map((project) => ({
      url: `${SITE_URL}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...homepageEntries, ...projectEntries];
}
