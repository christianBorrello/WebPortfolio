import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { getAllProjects, getProjectBySlug } from "@/shared/lib/content-loader";
import { buildCaseStudyMetadata } from "@/shared/lib/metadata";
import { CaseStudyLayout } from "@/features/projects/case-study-layout";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const projects = getAllProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = getProjectBySlug(slug);
    return buildCaseStudyMetadata(project.title, project.hook);
  } catch {
    return {};
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  let project;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col">
      <CaseStudyLayout project={project} />
    </main>
  );
}
