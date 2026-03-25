import { test, expect } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";
import * as yaml from "js-yaml";

const LOCALE_DIR = path.resolve("messages/en");
const CONTENT_DIR = path.resolve("content/projects/en");
const EXPERIENCE_DIR = path.resolve("content/experience");

function loadExternalizedValues(): string[] {
  const values: string[] = [];

  const jsonFiles = fs.readdirSync(LOCALE_DIR).filter((f) => f.endsWith(".json"));
  for (const file of jsonFiles) {
    const content = JSON.parse(
      fs.readFileSync(path.join(LOCALE_DIR, file), "utf-8")
    );
    extractStrings(content, values);
  }

  if (fs.existsSync(CONTENT_DIR)) {
    const yamlFiles = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".yaml"));
    for (const file of yamlFiles) {
      const content = yaml.load(
        fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8")
      );
      extractStrings(content, values);
    }
  }

  if (fs.existsSync(EXPERIENCE_DIR)) {
    const yamlFiles = fs.readdirSync(EXPERIENCE_DIR).filter((f) => f.endsWith(".yaml"));
    for (const file of yamlFiles) {
      const content = yaml.load(
        fs.readFileSync(path.join(EXPERIENCE_DIR, file), "utf-8")
      );
      extractStrings(content, values);
    }
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

test.describe("Walking Skeleton", () => {
  test("site is live and reachable with HTTP 200", async ({ page }) => {
    const response = await page.goto("/en");

    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);
  });

  test("contact form full submission smoke test", async ({
    page,
  }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/en");

    const nameInput = page.getByLabel("Name");
    const emailInput = page.getByLabel("Email");
    const messageInput = page.getByLabel("Message");
    const submitButton = page.getByRole("button", { name: "Send message" });

    await nameInput.fill("Test User");
    await emailInput.fill("test@example.com");
    await messageInput.fill("Hello, this is a test message.");
    await submitButton.click();

    await expect(
      page.getByText(
        "Message sent. I'll get back to you within a few days."
      )
    ).toBeVisible();
  });

  test("all visible text originates from locale files", async ({ page }) => {
    const localeValues = loadExternalizedValues();

    await page.goto("/en");
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
      const matchesLocale = localeValues.some((localeValue: string) => {
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
      `Found hardcoded text not in locale files:\n${unmatchedTexts.join("\n")}`
    ).toHaveLength(0);
  });

  test("custom domain resolves correctly over HTTPS", async ({ request }) => {
    test.skip(!!process.env.CI, "Skipped in CI -- external dependency");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.dev";
    const response = await request.get(siteUrl, {
      maxRedirects: 5,
    });

    expect(response.status()).toBe(200);
    expect(response.url()).toMatch(/^https:\/\//);
  });
});
