import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import type { Locale } from "./config";

async function loadMessages(locale: Locale) {
  return {
    common: (await import(`@/../messages/${locale}/common.json`)).default,
    hero: (await import(`@/../messages/${locale}/hero.json`)).default,
    about: (await import(`@/../messages/${locale}/about.json`)).default,
    contact: (await import(`@/../messages/${locale}/contact.json`)).default,
    projects: (await import(`@/../messages/${locale}/projects.json`)).default,
    experience: (await import(`@/../messages/${locale}/experience.json`)).default,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
