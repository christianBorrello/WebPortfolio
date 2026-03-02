"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const NAV_LINKS = [
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
] as const;

function isCaseStudyPage(pathname: string): boolean {
  return /^\/[^/]+\/projects\/[^/]+$/.test(pathname);
}

export function Navigation() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const showBackLink = isCaseStudyPage(pathname);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <a
          href={showBackLink ? `/${pathname.split("/")[1]}` : "#hero"}
          className="text-foreground transition-opacity hover:opacity-80"
          aria-label={t("site_name")}
        >
          <Logo height={36} />
        </a>

        {showBackLink ? (
          <a
            href={`/${pathname.split("/")[1]}/#projects`}
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            &larr; {t("nav.back_to_projects")}
          </a>
        ) : (
          <>
            <ul className="hidden gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={
                menuOpen ? t("nav.menu_close") : t("nav.menu_open")
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="20" y2="16" />
                  </>
                )}
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute left-0 top-full w-full border-b border-foreground/10 bg-background/95 backdrop-blur-md md:hidden">
                <ul className="flex flex-col px-6 py-4">
                  {NAV_LINKS.map((link) => (
                    <li key={link.key}>
                      <a
                        href={link.href}
                        className="block py-3 text-base font-medium text-foreground/70 transition-colors hover:text-foreground"
                        onClick={closeMenu}
                      >
                        {t(`nav.${link.key}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
