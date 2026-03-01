import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("hero");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold">{t("name")}</h1>
      <p className="text-xl text-foreground/80">{t("title")}</p>
      <p className="max-w-md text-lg italic">{t("tagline")}</p>
      <p className="max-w-lg text-base text-foreground/60">{t("statement")}</p>
      <div className="mt-4 flex gap-4">
        <span className="rounded border px-4 py-2">{t("cta_work")}</span>
        <span className="rounded border px-4 py-2">{t("cta_contact")}</span>
      </div>
    </main>
  );
}
