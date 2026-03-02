import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { buildHomeMetadata } from "@/shared/lib/metadata";
import { HeroSection } from "@/features/hero/hero-section";
import { AboutSection } from "@/features/about/about-section";
import { ProjectGrid } from "@/features/projects/project-grid";
import { ContactSection } from "@/features/contact/contact-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(): Metadata {
  return buildHomeMetadata(
    "Software Engineer who sees architectures where others see tasks. Portfolio and case studies."
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <AboutSection />
      <ProjectGrid />
      <ContactSection />
    </main>
  );
}
