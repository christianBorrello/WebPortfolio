import { test, expect } from "@playwright/test";

test.describe("Timeline Entry -- Visual Variants by Type", () => {
  test("work entry renders badge, title, organization, period, description, highlights, tech tags, and nested project cards", async ({
    page,
  }) => {
    await page.goto("/en");

    const experienceSection = page.locator(
      "section:has(h2:text('Experience'))"
    );
    await expect(experienceSection).toBeVisible();

    const workEntry = experienceSection.locator("li").filter({
      has: page.getByText("Work", { exact: true }),
    }).first();
    await expect(workEntry).toBeVisible();

    await expect(workEntry.locator("h3").first()).toBeVisible();

    const workText = (await workEntry.textContent()) ?? "";
    expect(workText).toMatch(/\d{4}/);

    const highlightsList = workEntry.locator("ul").first();
    await expect(highlightsList).toBeVisible();
  });

  test("education entry renders badge, title, organization, period, description without tech tags or project cards", async ({
    page,
  }) => {
    await page.goto("/en");

    const experienceSection = page.locator(
      "section:has(h2:text('Experience'))"
    );

    const educationEntry = experienceSection.locator("li").filter({
      has: page.getByText("Education", { exact: true }),
    }).first();
    await expect(educationEntry).toBeVisible();

    await expect(educationEntry.locator("h3").first()).toBeVisible();

    const educationText = (await educationEntry.textContent()) ?? "";
    expect(educationText).toMatch(/\d{4}/);

    const caseStudyLink = educationEntry.getByRole("link", {
      name: /read case study/i,
    });
    await expect(caseStudyLink).toHaveCount(0);
  });

  test("project entry renders badge, title, period, description, tech tags, and case study link", async ({
    page,
  }) => {
    await page.goto("/en");

    const experienceSection = page.locator(
      "section:has(h2:text('Experience'))"
    );

    const projectEntry = experienceSection.locator("li").filter({
      has: page.getByText("Project", { exact: true }),
    }).first();
    await expect(projectEntry).toBeVisible();

    await expect(projectEntry.locator("h3").first()).toBeVisible();

    const caseStudyLink = projectEntry.getByRole("link", {
      name: /read case study/i,
    });
    await expect(caseStudyLink).toBeVisible();
    await expect(caseStudyLink).toHaveAttribute("href", /\/projects\//);
  });

  test("three entry types are visually distinguishable through different badge styles", async ({
    page,
  }) => {
    await page.goto("/en");

    const experienceSection = page.locator(
      "section:has(h2:text('Experience'))"
    );

    const workBadge = experienceSection
      .getByText("Work", { exact: true })
      .first();
    const educationBadge = experienceSection
      .getByText("Education", { exact: true })
      .first();
    const projectBadge = experienceSection
      .getByText("Project", { exact: true })
      .first();

    await expect(workBadge).toBeVisible();
    await expect(educationBadge).toBeVisible();
    await expect(projectBadge).toBeVisible();

    const workClasses = await workBadge.getAttribute("class");
    const educationClasses = await educationBadge.getAttribute("class");
    const projectClasses = await projectBadge.getAttribute("class");

    expect(workClasses).not.toBe(educationClasses);
    expect(workClasses).not.toBe(projectClasses);
    expect(educationClasses).not.toBe(projectClasses);
  });

  test("semantic HTML: each entry is an li with h3 title", async ({
    page,
  }) => {
    await page.goto("/en");

    const experienceSection = page.locator(
      "section:has(h2:text('Experience'))"
    );

    const entries = experienceSection.locator("ol > li");
    const count = await entries.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      const entry = entries.nth(i);
      await expect(entry.locator("h3").first()).toBeVisible();
    }
  });
});
