import type { Metadata } from "next";

export function buildCaseStudyMetadata(
  title: string,
  description: string
): Metadata {
  return {
    title: `${title} | Christian Borrello`,
    description,
    openGraph: {
      title: `${title} | Christian Borrello`,
      description,
      images: ["/og-default.png"],
    },
  };
}
