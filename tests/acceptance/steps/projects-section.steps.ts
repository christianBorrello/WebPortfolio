import { test, expect } from "@playwright/test";

const PROJECT_NAMES = [
  "SagitterHub",
  "Azure Infrastructure",
  "OpenGL Renderer",
  "iOS Habit Tracker",
  "Unity Soulslike",
];

const CASE_STUDY_SECTIONS = [
  "The Problem",
  "What I Saw",
  "The Decisions",
  "Beyond the Assignment",
  "What Didn't Work",
  "The Bigger Picture",
  "For Non-Specialists",
  "Stack",
];

test.describe("Projects Section -- Cards Overview", () => {
  test("five project cards are displayed", async ({ page }) => {
    await page.goto("/en");

    const projectsSection = page.locator("section:has(h2:text('Projects'))");
    await expect(projectsSection).toBeVisible();

    for (const name of PROJECT_NAMES) {
      await expect(
        projectsSection.getByText(name, { exact: false }).first()
      ).toBeVisible();
    }
  });

  test("each card shows a concrete hook, not just a technology list", async ({
    page,
  }) => {
    await page.goto("/en");

    const cards = page.locator("section:has(h2:text('Projects')) article, section:has(h2:text('Projects')) [class*='card']");
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThanOrEqual(5);

    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const text = (await card.textContent()) ?? "";
      const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
      expect(
        wordCount,
        `Card ${i + 1} should have enough text for a hook, not just tech names`
      ).toBeGreaterThan(5);
    }
  });

  test("work projects highlight measurable outcomes", async ({ page }) => {
    await page.goto("/en");

    const projectsSection = page.locator("section:has(h2:text('Projects'))");
    const projectsText = (await projectsSection.textContent()) ?? "";

    const hasTddMetric = projectsText.includes("TDD") || projectsText.includes(">90%");
    expect(hasTddMetric).toBe(true);

    const hasCostMetric =
      projectsText.includes("cost") ||
      projectsText.includes("60%") ||
      projectsText.includes("46");
    expect(hasCostMetric).toBe(true);
  });

  test("personal projects are framed as active exploration", async ({
    page,
  }) => {
    await page.goto("/en");

    const projectsSection = page.locator("section:has(h2:text('Projects'))");
    const text = (await projectsSection.textContent()) ?? "";

    expect(text).not.toMatch(/unfinished/i);
    expect(text).not.toMatch(/incomplete/i);
  });

  test("each card links to a dedicated case study page", async ({ page }) => {
    await page.goto("/en");

    const caseStudyLink = page
      .getByRole("link", { name: /read case study/i })
      .first();
    await expect(caseStudyLink).toBeVisible();

    await caseStudyLink.click();
    await expect(page).toHaveURL(/\/en\/projects\//);
  });
});

test.describe("Projects Section -- Case Study Pages", () => {
  test("SagitterHub case study has all eight sections", async ({ page }) => {
    await page.goto("/en/projects/sagitterhub");

    for (const sectionName of CASE_STUDY_SECTIONS) {
      await expect(
        page.getByRole("heading", { name: sectionName }),
        `Missing section: ${sectionName}`
      ).toBeVisible();
    }
  });

  test("Azure case study shows business impact clearly", async ({ page }) => {
    await page.goto("/en/projects/azure-infrastructure");

    const text = (await page.locator("article").textContent()) ?? "";

    const hasCostInfo =
      text.includes("cost") || text.includes("€") || text.includes("60%");
    expect(hasCostInfo).toBe(true);

    const hasInfraAsCode =
      text.includes("infrastructure-as-code") ||
      text.includes("Terraform") ||
      text.includes("IaC");
    expect(hasInfraAsCode).toBe(true);

    const hasHonestReflection =
      text.includes("didn't work") ||
      text.includes("could have") ||
      text.includes("What Didn't Work");
    expect(hasHonestReflection).toBe(true);
  });

  test("case study page has navigation back to projects", async ({ page }) => {
    await page.goto("/en/projects/sagitterhub");

    const backLink = page.getByRole("link", { name: /back to experience/i }).first();
    await expect(backLink).toBeVisible();

    await backLink.click();
    await expect(page).toHaveURL(/\/en\b/);
  });

  test("non-specialist section is genuinely accessible", async ({ page }) => {
    await page.goto("/en/projects/opengl-renderer");

    const forNonSpecialists = page.getByRole("heading", {
      name: "For Non-Specialists",
    });
    await expect(forNonSpecialists).toBeVisible();

    const section = page.locator("section#for-non-specialists");
    const sectionText = (await section.textContent()) ?? "";

    expect(sectionText.length).toBeGreaterThan(50);
  });
});
