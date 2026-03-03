import { test, expect } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

const EN_PROJECTS_DIR = path.resolve("content/projects/en");
const IT_PROJECTS_DIR = path.resolve("content/projects/it");

// --- AC 4: Static generation for both locales ---

test.describe("Italian Localization Infrastructure -- Static Generation", () => {
  test("build generates static HTML pages for both Italian and English", async ({
    page,
  }) => {
    const enResponse = await page.goto("/en");
    expect(enResponse).not.toBeNull();
    expect(enResponse!.status()).toBe(200);

    const itResponse = await page.goto("/it");
    expect(itResponse).not.toBeNull();
    expect(itResponse!.status()).toBe(200);

    const enSagitterhub = await page.goto("/en/projects/sagitterhub");
    expect(enSagitterhub).not.toBeNull();
    expect(enSagitterhub!.status()).toBe(200);

    const itSagitterhub = await page.goto("/it/projects/sagitterhub");
    expect(itSagitterhub).not.toBeNull();
    expect(itSagitterhub!.status()).toBe(200);
  });

  test("every English project page has an Italian counterpart", async ({
    page,
  }) => {
    const enFiles = fs
      .readdirSync(EN_PROJECTS_DIR)
      .filter((f) => f.endsWith(".yaml"))
      .map((f) => f.replace(".yaml", ""));

    for (const slug of enFiles) {
      const itFile = path.join(IT_PROJECTS_DIR, `${slug}.yaml`);
      expect(
        fs.existsSync(itFile),
        `Missing Italian counterpart for ${slug}`
      ).toBe(true);

      const response = await page.goto(`/it/projects/${slug}`);
      expect(response).not.toBeNull();
      expect(
        response!.status(),
        `Italian page for ${slug} returned ${response!.status()}`
      ).toBe(200);
    }
  });
});

// --- AC 5: Sitemap contains both locale URLs ---

test.describe("Italian Localization Infrastructure -- Sitemap", () => {
  test("sitemap includes Italian and English homepage URLs", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("/it");
    expect(body).toContain("/en");
  });

  test("sitemap includes Italian and English project URLs", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    expect(body).toContain("/en/projects/sagitterhub");
    expect(body).toContain("/it/projects/sagitterhub");
  });
});

// --- AC 6: Build-time validation for missing content ---

test.describe("Italian Localization Infrastructure -- Content Parity", () => {
  test("all English project YAML files have Italian counterparts", async () => {
    const enFiles = fs
      .readdirSync(EN_PROJECTS_DIR)
      .filter((f) => f.endsWith(".yaml"));

    const itFiles = fs
      .readdirSync(IT_PROJECTS_DIR)
      .filter((f) => f.endsWith(".yaml"));

    for (const file of enFiles) {
      expect(
        itFiles,
        `Missing Italian content file: ${file}`
      ).toContain(file);
    }
  });

  test("Italian project YAML files contain all required sections", async () => {
    const requiredSections = [
      "theProblem",
      "theDecisions",
      "whatDidntWork",
    ];

    const itFiles = fs
      .readdirSync(IT_PROJECTS_DIR)
      .filter((f) => f.endsWith(".yaml"));

    for (const file of itFiles) {
      const content = fs.readFileSync(
        path.join(IT_PROJECTS_DIR, file),
        "utf-8"
      );

      for (const section of requiredSections) {
        expect(
          content,
          `${file} missing required section: ${section}`
        ).toContain(section);
      }
    }
  });
});
