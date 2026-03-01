import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { HeroSection } from "@/features/hero/hero-section";
import { AboutSection } from "@/features/about/about-section";
import { ContactSection } from "@/features/contact/contact-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
