"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/config";

const OPPOSITE_LOCALE: Record<Locale, Locale> = {
  en: "it",
  it: "en",
};

const DISPLAY_LABEL: Record<Locale, string> = {
  en: "IT",
  it: "EN",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const targetLocale = OPPOSITE_LOCALE[locale];
  const label = DISPLAY_LABEL[locale];

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className={className}
    >
      {label}
    </Link>
  );
}
