import { test, expect } from "@playwright/test";

// --- SEO scenarios ---

test.describe("Infrastructure -- SEO", () => {
  test("home page has proper meta tags for search engines", async ({
    page,
  }) => {
    await page.goto("/en");

    const title = await page.title();
    expect(title).toContain("Christian Borrello");

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(10);

    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    expect(ogTitle).toBeTruthy();

    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(ogDescription).toBeTruthy();

    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).toBeTruthy();

    expect(ogTitle).toContain("Christian Borrello");
  });

  test("case study pages have unique meta tags", async ({ page }) => {
    await page.goto("/en");
    const homeDescription = await page
      .locator('meta[name="description"]')
      .getAttribute("content");

    await page.goto("/en/projects/sagitterhub");

    const title = await page.title();
    expect(title).toContain("SagitterHub");

    const caseStudyDescription = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(caseStudyDescription).toBeTruthy();
    expect(caseStudyDescription).not.toBe(homeDescription);
  });

  test("sitemap is generated and accessible", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/en");
    expect(body).toContain("/en/projects/sagitterhub");
    expect(body).toContain("/en/projects/azure-infrastructure");
    expect(body).toContain("/en/projects/opengl-renderer");
    expect(body).toContain("/en/projects/ios-habit-tracker");
    expect(body).toContain("/en/projects/unity-soulslike");
  });
});

// --- Performance scenarios ---

test.describe("Infrastructure -- Performance", () => {
  test("page loads within performance budget", async ({ page }) => {
    test.skip(!!process.env.CI, "Skipped in CI -- runner performance varies");
    await page.goto("/en", { waitUntil: "load" });

    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ type: "largest-contentful-paint", buffered: true });

        setTimeout(() => resolve(0), 5000);
      });
    });

    expect(lcp).toBeGreaterThan(0);
    expect(lcp).toBeLessThan(2500);
  });
});

// --- Accessibility scenarios ---

test.describe("Infrastructure -- Accessibility", () => {
  test("heading hierarchy is semantically correct", async ({ page }) => {
    await page.goto("/en");

    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    const headings = await page.evaluate(() => {
      const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      return Array.from(elements).map((el) => {
        const level = parseInt(el.tagName[1]);
        return { level, text: el.textContent?.trim() ?? "" };
      });
    });

    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0].level).toBe(1);

    for (let i = 1; i < headings.length; i++) {
      const current = headings[i].level;
      const previous = headings[i - 1].level;
      expect(
        current,
        `Heading "${headings[i].text}" (h${current}) skips level after "${headings[i - 1].text}" (h${previous})`
      ).toBeLessThanOrEqual(previous + 1);
    }
  });

  test("contact form inputs have associated labels", async ({ page }) => {
    await page.goto("/en");

    const inputs = page.locator(
      'section:has(button[type="submit"]) input, section:has(button[type="submit"]) textarea'
    );
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThan(0);

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");

      if (id) {
        const associatedLabel = page.locator(`label[for="${id}"]`);
        const hasLabel = (await associatedLabel.count()) > 0;
        const hasAriaLabel = !!ariaLabel || !!ariaLabelledBy;
        expect(
          hasLabel || hasAriaLabel,
          `Input with id="${id}" has no associated label`
        ).toBe(true);
      } else {
        expect(
          !!ariaLabel || !!ariaLabelledBy,
          "Input without id has no aria-label"
        ).toBe(true);
      }
    }
  });

  test("text contrast meets minimum accessibility standards", async ({
    page,
  }) => {
    await page.goto("/en");

    const contrastResults = await page.evaluate(() => {
      function getLuminance(r: number, g: number, b: number): number {
        const [rs, gs, bs] = [r, g, b].map((c) => {
          const srgb = c / 255;
          return srgb <= 0.03928
            ? srgb / 12.92
            : Math.pow((srgb + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      }

      function parseColor(
        color: string
      ): { r: number; g: number; b: number; a: number } | null {
        const match = color.match(
          /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
        );
        if (!match) return null;
        return {
          r: parseInt(match[1]),
          g: parseInt(match[2]),
          b: parseInt(match[3]),
          a: match[4] ? parseFloat(match[4]) : 1,
        };
      }

      const violations: string[] = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            if (["script", "style", "noscript"].includes(tag))
              return NodeFilter.FILTER_REJECT;
            const style = window.getComputedStyle(parent);
            if (style.display === "none" || style.visibility === "hidden")
              return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      let node: Node | null;
      let checked = 0;
      while ((node = walker.nextNode()) && checked < 50) {
        const text = (node.textContent ?? "").trim();
        if (text.length < 2) continue;

        const parent = node.parentElement!;
        const style = window.getComputedStyle(parent);
        const fgColor = parseColor(style.color);
        const bgColor = parseColor(style.backgroundColor);
        if (!fgColor || !bgColor || bgColor.a < 0.1) continue;

        const fgLum = getLuminance(fgColor.r, fgColor.g, fgColor.b);
        const bgLum = getLuminance(bgColor.r, bgColor.g, bgColor.b);
        const lighter = Math.max(fgLum, bgLum);
        const darker = Math.min(fgLum, bgLum);
        const ratio = (lighter + 0.05) / (darker + 0.05);

        const fontSize = parseFloat(style.fontSize);
        const isBold = parseInt(style.fontWeight) >= 700;
        const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && isBold);
        const minRatio = isLargeText ? 3 : 4.5;

        if (ratio < minRatio) {
          violations.push(
            `"${text.substring(0, 30)}" ratio=${ratio.toFixed(2)} (need ${minRatio})`
          );
        }
        checked++;
      }
      return violations;
    });

    expect(
      contrastResults,
      `WCAG AA contrast violations:\n${contrastResults.join("\n")}`
    ).toHaveLength(0);
  });
});

// --- Privacy scenarios ---

test.describe("Infrastructure -- Privacy", () => {
  test("no tracking cookies or analytics in version one", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    const cookies = await page.context().cookies();
    const trackingCookies = cookies.filter(
      (c) =>
        c.name.startsWith("_ga") ||
        c.name.startsWith("_fb") ||
        c.name.startsWith("_gcl") ||
        c.name === "_gid" ||
        c.name === "hubspotutk"
    );
    expect(trackingCookies).toHaveLength(0);

    const analyticsLoaded = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll("script[src]"));
      return scripts.some((s) => {
        const src = s.getAttribute("src") ?? "";
        return (
          src.includes("google-analytics") ||
          src.includes("googletagmanager") ||
          src.includes("facebook.net") ||
          src.includes("hotjar")
        );
      });
    });
    expect(analyticsLoaded).toBe(false);
  });
});

// --- Navigation scenarios ---

test.describe("Infrastructure -- Navigation", () => {
  test("navigation links scroll to the correct sections", async ({
    page,
  }) => {
    await page.goto("/en");

    const projectsLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "Projects" });
    await projectsLink.click();

    await page.waitForTimeout(500);
    const projectsSection = page.locator("section#projects, section:has(h2:text('Projects'))").first();
    await expect(projectsSection).toBeInViewport();

    const contactLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "Contact" });
    await contactLink.click();

    await page.waitForTimeout(500);
    const contactSection = page.locator("section#contact, section:has(h2:text('Let'))").first();
    await expect(contactSection).toBeInViewport();
  });

  test("locale routing works correctly", async ({ page }) => {
    const enResponse = await page.goto("/en");
    expect(enResponse).not.toBeNull();
    expect(enResponse!.status()).toBe(200);

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(page.url()).toMatch(/\/(en|it)\b/);
  });
});
