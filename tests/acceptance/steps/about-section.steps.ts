import { test, expect } from "@playwright/test";

function aboutSection(page: import("@playwright/test").Page) {
  return page.locator("section:has(h2:text('About'))");
}

test.describe("About Section", () => {
  test("ADHD is framed as a functional pattern, not a limitation", async ({
    page,
  }) => {
    await page.goto("/en");

    const section = aboutSection(page);
    const text = (await section.textContent()) ?? "";

    expect(text.toLowerCase()).toContain("adhd");

    const hasFunctionalFraming =
      text.includes("curiosity") ||
      text.includes("hyperfocus") ||
      text.includes("systems") ||
      text.includes("system");
    expect(hasFunctionalFraming).toBe(true);

    expect(text).not.toMatch(/adhd.{0,30}(limitation|disability|struggle|suffer|despite)/i);
  });

  test("technology philosophy is present and authentic", async ({ page }) => {
    await page.goto("/en");

    const section = aboutSection(page);
    const text = (await section.textContent()) ?? "";

    expect(text).toContain("based on the problem");
    expect(text).not.toMatch(/comfortable with.{0,20}(because|since|as)/i);
  });

  test("values and what Christian looks for are stated clearly", async ({
    page,
  }) => {
    await page.goto("/en");

    const section = aboutSection(page);
    const text = (await section.textContent()) ?? "";

    const hasValues =
      text.includes("honesty") ||
      text.includes("simplicity") ||
      text.includes("respect");
    expect(hasValues).toBe(true);

    const hasLookingFor =
      text.includes("remote-first") || text.includes("ownership");
    expect(hasLookingFor).toBe(true);
  });

  test("philosophy is present as applied thinking, not academic display", async ({
    page,
  }) => {
    await page.goto("/en");

    const section = aboutSection(page);
    const text = (await section.textContent()) ?? "";

    expect(text.toLowerCase()).toContain("philosophy");

    const philosophyBlock = text.split("philosophy")[1]?.substring(0, 500) ?? "";
    const wordCount = philosophyBlock.split(/\s+/).length;
    expect(wordCount).toBeLessThan(200);
  });

  test("about section is not a skills list", async ({ page }) => {
    await page.goto("/en");

    const section = aboutSection(page);
    const text = (await section.textContent()) ?? "";

    const skillsListItems = await section.locator("ul li").count();
    expect(skillsListItems).toBe(0);

    expect(text).not.toMatch(/certif(ication|ied)/i);
    expect(text).not.toMatch(/incomplete degree/i);
  });

  test("about section is readable in approximately 90 seconds", async ({
    page,
  }) => {
    await page.goto("/en");

    const section = aboutSection(page);
    const text = (await section.textContent()) ?? "";
    const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;

    expect(wordCount).toBeGreaterThanOrEqual(200);
    expect(wordCount).toBeLessThanOrEqual(400);
  });
});
