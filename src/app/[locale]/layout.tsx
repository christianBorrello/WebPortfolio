import type { Metadata } from "next";
import { Dynalight } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/config";
import { Navigation } from "@/shared/ui/navigation";
import { Footer } from "@/shared/ui/footer";
import "../globals.css";

const dynalight = Dynalight({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dynalight",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Christian Borrello",
    default: "Christian Borrello — Software Engineer",
  },
  description:
    "Software Engineer who sees architectures where others see tasks. Portfolio and case studies.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://christianborrello.dev"
  ),
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
    <html lang={locale} className={dynalight.variable}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
