import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { buildHomeMetadata } from "@/shared/lib/metadata";
import { getAllProjects, toSummary } from "@/shared/lib/content-loader";
import { getExperience } from "@/shared/lib/experience-loader";
import { HeroSection } from "@/features/hero/hero-section";
import { AboutSection } from "@/features/about/about-section";
import { ExperienceTimeline } from "@/features/experience/experience-timeline";
import { ContactSection } from "@/features/contact/contact-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildHomeMetadata(
    "Software Engineer who sees architectures where others see tasks. Portfolio and case studies.",
    locale as Locale
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const experienceData = getExperience(locale as Locale);
  const projectSummaries = getAllProjects(locale as Locale).map(toSummary);

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline
        entries={experienceData.entries}
        projectSummaries={projectSummaries}
      />
      <ContactSection />
    </main>
  );
}
