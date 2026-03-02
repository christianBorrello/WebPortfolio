import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://christianborrello.dev";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function buildHomeMetadata(description: string): Metadata {
  const title = "Christian Borrello — Software Engineer";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: SITE_URL,
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
  slug?: string
): Metadata {
  const fullTitle = title;
  const url = slug ? `${SITE_URL}/en/projects/${slug}` : undefined;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: `${fullTitle} | Christian Borrello`,
      description,
      ...(url ? { url } : {}),
      siteName: "Christian Borrello",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${fullTitle} | Christian Borrello`,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
