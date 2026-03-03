import { test, expect } from "@playwright/test";

test.describe("ExperienceTimeline -- Section with Scroll-Reveal Animation", () => {
  test("renders section#experience with h2 heading and subtext from i18n", async ({
    page,
  }) => {
    await page.goto("/en");

    const section = page.locator("section#experience");
    await expect(section).toBeVisible();
    await expect(section).toHaveAttribute(
      "aria-labelledby",
      "experience-heading"
    );

    const heading = section.locator("h2#experience-heading");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Experience");

    const subtext = section.locator("p").first();
    await expect(subtext).toBeVisible();
    await expect(subtext).toHaveText(
      "The path that shaped how I think about software."
    );
  });

  test("entries render inside an ol in the order received", async ({
    page,
  }) => {
    await page.goto("/en");

    const section = page.locator("section#experience");
    const ol = section.locator("ol");
    await expect(ol).toBeVisible();

    const entries = ol.locator(":scope > li");
    const count = await entries.count();
    expect(count).toBeGreaterThanOrEqual(3);

    const firstEntryTitle = entries.first().locator("h3").first();
    await expect(firstEntryTitle).toBeVisible();
  });

  test("scroll-reveal: entries use data-visible attribute controlled by IntersectionObserver", async ({
    page,
  }) => {
    await page.goto("/en");

    const section = page.locator("section#experience");
    const ol = section.locator("ol");
    const entries = ol.locator(":scope > li");

    const count = await entries.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // After scrolling into view and waiting for observer, entries should have data-visible="true"
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const firstEntry = entries.first();
    await expect(firstEntry).toHaveAttribute("data-visible", "true");
  });

  test("prefers-reduced-motion: all entries have data-visible=true immediately", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/en");

    const section = page.locator("section#experience");
    const ol = section.locator("ol");
    const entries = ol.locator(":scope > li");
    const count = await entries.count();

    // With reduced motion, all entries should be immediately visible
    // without needing to scroll
    for (let i = 0; i < count; i++) {
      const entry = entries.nth(i);
      await expect(entry).toHaveAttribute("data-visible", "true");
    }

    await context.close();
  });

  test("revealed entries stay visible on subsequent scrolls (no re-animation)", async ({
    page,
  }) => {
    await page.goto("/en");

    const section = page.locator("section#experience");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const ol = section.locator("ol");
    const firstEntry = ol.locator(":scope > li").first();
    await expect(firstEntry).toHaveAttribute("data-visible", "true");

    // Scroll away
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Scroll back -- entry should still be data-visible="true"
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(firstEntry).toHaveAttribute("data-visible", "true");
  });
});
