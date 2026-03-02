import { test, expect, type Page } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

const IT_LOCALE_DIR = path.resolve("messages/it");

function loadItalianLocaleValues(): string[] {
  const values: string[] = [];
  if (!fs.existsSync(IT_LOCALE_DIR)) return values;

  const files = fs.readdirSync(IT_LOCALE_DIR).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const content = JSON.parse(
      fs.readFileSync(path.join(IT_LOCALE_DIR, file), "utf-8")
    );
    extractStrings(content, values);
  }

  return values;
}

function extractStrings(obj: unknown, result: string[]): void {
  if (typeof obj === "string") {
    const trimmed = obj.trim();
    if (trimmed.length > 2) {
      result.push(trimmed);
    }
    return;
  }
  if (obj !== null && typeof obj === "object") {
    for (const value of Object.values(obj as Record<string, unknown>)) {
      extractStrings(value, result);
    }
  }
}

function navigationLink(page: Page, name: string) {
  return page.getByRole("navigation").getByRole("link", { name });
}

function languageSwitcher(page: Page) {
  return page.getByRole("navigation").getByRole("link", { name: /^(EN|IT)$/i });
}

// --- Walking skeleton: Italian homepage displays navigation in Italian ---

test.describe("Italian Localization -- Walking Skeleton", () => {
  test("Italian homepage displays navigation in Italian", async ({ page }) => {
    const response = await page.goto("/it");

    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);

    await expect(navigationLink(page, "Progetti")).toBeVisible();
    await expect(navigationLink(page, "Contatti")).toBeVisible();
    await expect(navigationLink(page, "Chi sono")).toBeVisible();
  });
});

// --- AC 1: Italian UI text across the homepage ---

test.describe("Italian Localization -- Italian UI Text", () => {
  test.skip("hero section displays Italian text", async ({ page }) => {
    await page.goto("/it");

    await expect(page.getByText("Christian Borrello")).toBeVisible();
    await expect(page.getByText("Vedo architetture dove gli altri vedono task.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Guarda i miei lavori" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Contattami" })).toBeVisible();
  });

  test.skip("about section displays Italian text", async ({ page }) => {
    await page.goto("/it");

    await expect(page.getByRole("heading", { name: "Chi sono" })).toBeVisible();
    await expect(page.getByText("Sono un Software Engineer che ragiona per sistemi")).toBeVisible();
    await expect(page.getByText("Come penso")).toBeVisible();
  });

  test.skip("contact section displays Italian text", async ({ page }) => {
    await page.goto("/it");

    await expect(page.getByRole("heading", { name: "Parliamone" })).toBeVisible();
    await expect(page.getByLabel("Nome")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Messaggio")).toBeVisible();
    await expect(page.getByRole("button", { name: "Invia messaggio" })).toBeVisible();
  });

  test.skip("footer displays Italian text", async ({ page }) => {
    await page.goto("/it");

    await expect(page.getByText("Tutti i diritti riservati")).toBeVisible();
    await expect(page.getByText("Realizzato con Next.js")).toBeVisible();
  });

  test.skip("all visible text on the Italian homepage originates from Italian locale files", async ({
    page,
  }) => {
    const localeValues = loadItalianLocaleValues();

    await page.goto("/it");
    await page.waitForLoadState("networkidle");

    const visibleTexts = await page.evaluate(() => {
      const texts: string[] = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            if (tag === "script" || tag === "style" || tag === "noscript") {
              return NodeFilter.FILTER_REJECT;
            }
            const style = window.getComputedStyle(parent);
            if (style.display === "none" || style.visibility === "hidden") {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = (node.textContent ?? "").trim();
        if (text.length > 2) {
          texts.push(text);
        }
      }
      return texts;
    });

    const unmatchedTexts: string[] = [];

    for (const visibleText of visibleTexts) {
      const matchesLocale = localeValues.some((localeValue) => {
        const normalized = localeValue.replace(/\{[^}]+\}/g, "").trim();
        return (
          visibleText.includes(normalized) || normalized.includes(visibleText)
        );
      });

      if (!matchesLocale) {
        const isNumericOrSymbol = /^[\d\s.,%@:;/\-+()]+$/.test(visibleText);
        if (!isNumericOrSymbol) {
          unmatchedTexts.push(visibleText);
        }
      }
    }

    expect(
      unmatchedTexts,
      `Found text not in Italian locale files:\n${unmatchedTexts.join("\n")}`
    ).toHaveLength(0);
  });
});

// --- AC 2: Italian project content ---

test.describe("Italian Localization -- Italian Project Content", () => {
  test.skip("project cards display Italian hooks and labels", async ({
    page,
  }) => {
    await page.goto("/it");

    await expect(page.getByRole("heading", { name: "Progetti" })).toBeVisible();
    await expect(page.getByText("Leggi il caso studio").first()).toBeVisible();
  });

  test.skip("SagitterHub case study displays Italian content", async ({
    page,
  }) => {
    await page.goto("/it/projects/sagitterhub");

    await expect(page.getByText("SagitterHub")).toBeVisible();
    await expect(page.getByText("Il problema")).toBeVisible();
    await expect(page.getByText("Le decisioni")).toBeVisible();
    await expect(page.getByText("Cosa non ha funzionato")).toBeVisible();
    await expect(page.getByText("Il quadro generale")).toBeVisible();
  });

  test.skip("SagitterHub case study metrics are displayed on the Italian page", async ({
    page,
  }) => {
    await page.goto("/it/projects/sagitterhub");

    await expect(page.getByText(">90%")).toBeVisible();
  });
});

// --- AC 3: Language switcher ---

test.describe("Italian Localization -- Language Switcher", () => {
  test("language switcher is visible on the Italian homepage", async ({
    page,
  }) => {
    await page.goto("/it");

    await expect(languageSwitcher(page)).toBeVisible();
    await expect(languageSwitcher(page)).toHaveText("EN");
  });

  test("language switcher is visible on the English homepage", async ({
    page,
  }) => {
    await page.goto("/en");

    await expect(languageSwitcher(page)).toBeVisible();
    await expect(languageSwitcher(page)).toHaveText("IT");
  });

  test("switching from Italian to English on the homepage", async ({
    page,
  }) => {
    await page.goto("/it");

    await languageSwitcher(page).click();

    await expect(page).toHaveURL(/\/en\b/);
    await expect(navigationLink(page, "Projects")).toBeVisible();
  });

  test("switching from English to Italian on the homepage", async ({
    page,
  }) => {
    await page.goto("/en");

    await languageSwitcher(page).click();

    await expect(page).toHaveURL(/\/it\b/);
    await expect(navigationLink(page, "Progetti")).toBeVisible();
  });

  test("language switcher preserves current page on case study", async ({
    page,
  }) => {
    await page.goto("/en/projects/sagitterhub");

    await languageSwitcher(page).click();

    await expect(page).toHaveURL(/\/it\/projects\/sagitterhub/);
  });

  test.skip("language switcher preserves current page on contact", async ({
    page,
  }) => {
    await page.goto("/en/contact");

    await languageSwitcher(page).click();

    await expect(page).toHaveURL(/\/it/);
  });
});

// --- Error paths and edge cases ---

test.describe("Italian Localization -- Error Paths", () => {
  test.skip("Italian contact form submission shows Italian success message", async ({
    page,
  }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/it");

    await page.getByLabel("Nome").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Messaggio").fill("Messaggio di test");
    await page.getByRole("button", { name: "Invia messaggio" }).click();

    await expect(page.getByText("Messaggio inviato")).toBeVisible();
  });

  test.skip("Italian contact form validation shows Italian error message", async ({
    page,
  }) => {
    await page.goto("/it");

    await page.getByLabel("Nome").fill("Test User");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Messaggio").fill("Test");
    await page.getByRole("button", { name: "Invia messaggio" }).click();

    await expect(page.getByText("Inserisci un indirizzo email valido")).toBeVisible();
  });

  test.skip("navigating directly to an Italian project URL works", async ({
    page,
  }) => {
    const response = await page.goto("/it/projects/sagitterhub");

    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);
  });

  test.skip("Italian and English pages have equivalent structure", async ({
    page,
  }) => {
    await page.goto("/en");
    const englishSections = await page.locator("section").count();

    await page.goto("/it");
    const italianSections = await page.locator("section").count();

    expect(italianSections).toBe(englishSections);
  });
});
