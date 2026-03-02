import type { MetadataRoute } from "next";
import { getAllProjects } from "@/shared/lib/content-loader";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://christianborrello.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/en/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...projectEntries,
  ];
}
