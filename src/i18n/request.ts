import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { Locale } from "./config";

async function loadMessages(locale: Locale) {
  return {
    common: (await import(`@/../messages/${locale}/common.json`)).default,
    hero: (await import(`@/../messages/${locale}/hero.json`)).default,
    contact: (await import(`@/../messages/${locale}/contact.json`)).default,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = routing.locales.includes(requested as Locale)
    ? (requested as Locale)
    : routing.defaultLocale;

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
