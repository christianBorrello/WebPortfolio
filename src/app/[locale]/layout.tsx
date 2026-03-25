import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";
import { Navigation } from "@/shared/ui/navigation";
import { Footer } from "@/shared/ui/footer";
import { SITE_URL } from "@/shared/lib/site-config";
import { OWNER } from "@/shared/lib/owner-config";

export const metadata: Metadata = {
  title: {
    template: `%s | ${OWNER.name}`,
    default: `${OWNER.name} — ${OWNER.title}`,
  },
  description:
    "Software Engineer who sees architectures where others see tasks. Portfolio and case studies.",
  metadataBase: new URL(SITE_URL),
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
