import { test, expect } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

test.describe("Hero Section", () => {
  test("identity statement breaks the generic portfolio pattern", async ({
    page,
  }) => {
    await page.goto("/en");

    const heroSection = page.locator("section").first();
    const heroText = await heroSection.textContent();

    expect(heroText).not.toContain("passionate");
    expect(heroText).not.toContain("results-driven");
    expect(heroText).not.toContain("experienced");

    await expect(
      page.getByText("architectures where others see tasks")
    ).toBeVisible();

    const techListInHero = await heroSection
      .locator("ul li")
      .count();
    expect(techListInHero).toBe(0);
  });

  test("clear calls to action guide the visitor forward", async ({
    page,
  }) => {
    await page.goto("/en");

    const viewWork = page.getByRole("link", { name: "View my work" });
    await expect(viewWork).toBeVisible();

    const getInTouch = page.getByRole("link", { name: "Get in touch" });
    await expect(getInTouch).toBeVisible();

    const viewWorkHref = await viewWork.getAttribute("href");
    expect(viewWorkHref).toContain("#experience");

    const getInTouchHref = await getInTouch.getAttribute("href");
    expect(getInTouchHref).toContain("#contact");
  });

  test("hero displays Christian's name and role", async ({ page }) => {
    await page.goto("/en");

    await expect(
      page.getByRole("heading", { name: "Christian Borrello" })
    ).toBeVisible();
    const heroSection = page.locator("section").first();
    await expect(heroSection.getByText("Software Engineer")).toBeVisible();
  });

  test("hero text is fully localized", async ({ page }) => {
    const heroFile = path.resolve("messages/en/hero.json");
    const heroContent = JSON.parse(fs.readFileSync(heroFile, "utf-8"));
    const localeValues = Object.values(heroContent) as string[];

    await page.goto("/en");
    const heroSection = page.locator("section").first();
    const heroText = (await heroSection.textContent()) ?? "";

    for (const value of localeValues) {
      expect(
        heroText,
        `Expected hero to contain locale string "${value}"`
      ).toContain(value);
    }
  });
});
