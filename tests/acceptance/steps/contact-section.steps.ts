import { test, expect, type Page } from "@playwright/test";

function mockContactApiSuccess(page: Page) {
  return page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
}

function mockContactApiServerError(page: Page) {
  return page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ success: false, error: "send_failed" }),
    });
  });
}

function mockContactApiNetworkError(page: Page) {
  return page.route("**/api/contact", async (route) => {
    await route.abort("connectionrefused");
  });
}

function mockContactApiDelayedSuccess(page: Page) {
  return page.route("**/api/contact", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
}

async function navigateToContactSection(page: Page) {
  await page.goto("/en");
  await page.getByRole("link", { name: "Contact" }).click();
  await expect(page.getByLabel("Email")).toBeVisible();
}

function nameInput(page: Page) {
  return page.getByLabel("Name");
}

function emailInput(page: Page) {
  return page.getByLabel("Email");
}

function messageInput(page: Page) {
  return page.getByLabel("Message");
}

function submitButton(page: Page) {
  return page.getByRole("button", { name: /send message/i });
}

async function fillAndSubmit(
  page: Page,
  fields: { name?: string; email?: string; message?: string }
) {
  if (fields.name) await nameInput(page).fill(fields.name);
  if (fields.email) await emailInput(page).fill(fields.email);
  if (fields.message) await messageInput(page).fill(fields.message);
  await submitButton(page).click();
}

function expectSuccessMessage(page: Page) {
  return expect(
    page.getByText("Message sent. I'll get back to you within a few days.")
  ).toBeVisible();
}

function expectErrorMessage(page: Page) {
  return expect(page.getByText(/something went wrong/i)).toBeVisible();
}

function expectValidationError(page: Page) {
  return expect(
    page.getByText("Please enter a valid email address.")
  ).toBeVisible();
}

// --- Walking skeleton ---

test.describe("Contact Section -- Walking Skeleton", () => {
  test("visitor sends a message and sees confirmation", async ({ page }) => {
    await mockContactApiSuccess(page);
    await navigateToContactSection(page);

    await fillAndSubmit(page, { email: "visitor@example.com" });

    await expectSuccessMessage(page);
  });
});

// --- Form structure and copy ---

test.describe("Contact Section -- Form Structure", () => {
  test("contact form has exactly three fields", async ({ page }) => {
    await navigateToContactSection(page);

    await expect(nameInput(page)).toBeVisible();
    await expect(nameInput(page)).not.toHaveAttribute("required");

    await expect(emailInput(page)).toBeVisible();
    await expect(emailInput(page)).toHaveAttribute("required");

    await expect(messageInput(page)).toBeVisible();
    await expect(messageInput(page)).not.toHaveAttribute("required");

    const formInputs = page.locator("form input, form textarea");
    await expect(formInputs).toHaveCount(3);
  });

  test("headline and subtext welcome both recruiters and collaborators", async ({
    page,
  }) => {
    await navigateToContactSection(page);

    await expect(page.getByText("Let's talk")).toBeVisible();
    await expect(
      page.getByText(/employment|team member/i)
    ).toBeVisible();
    await expect(
      page.getByText(/collaboration|collaborator|freelance/i)
    ).toBeVisible();
  });
});

// --- Form validation (error paths) ---

test.describe("Contact Section -- Validation Errors", () => {
  test("submitting without email shows a clear error", async ({
    page,
  }) => {
    let apiCalled = false;
    await page.route("**/api/contact", async (route) => {
      apiCalled = true;
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: "validation_error",
          details: [{ field: "email", message: "Invalid email address" }],
        }),
      });
    });

    await navigateToContactSection(page);
    await messageInput(page).fill("I have a project for you");
    await submitButton(page).click();

    await expect(emailInput(page)).toHaveAttribute("aria-invalid", "true");
    await expectValidationError(page);
    await expect(messageInput(page)).toHaveValue(
      "I have a project for you"
    );
    expect(apiCalled).toBe(false);
  });

  test("submitting an invalid email format shows an error", async ({
    page,
  }) => {
    let apiCalled = false;
    await page.route("**/api/contact", async (route) => {
      apiCalled = true;
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: "validation_error",
          details: [{ field: "email", message: "Invalid email address" }],
        }),
      });
    });

    await navigateToContactSection(page);
    await emailInput(page).fill("not-an-email");
    await submitButton(page).click();

    await expect(emailInput(page)).toHaveAttribute("aria-invalid", "true");
    await expectValidationError(page);
    expect(apiCalled).toBe(false);
  });
});

// --- Form submission (happy paths) ---

test.describe("Contact Section -- Successful Submission", () => {
  test("Marco sends a message with only his email", async ({ page }) => {
    await mockContactApiSuccess(page);
    await navigateToContactSection(page);

    await fillAndSubmit(page, { email: "marco@recruiting.com" });

    await expectSuccessMessage(page);
  });

  test("Giulia sends a complete message with all fields", async ({
    page,
  }) => {
    await mockContactApiSuccess(page);
    await navigateToContactSection(page);

    await fillAndSubmit(page, {
      name: "Giulia Marchetti",
      email: "giulia@startup.io",
      message:
        "I have an interesting project and I think we could work well together.",
    });

    await expectSuccessMessage(page);
  });
});

// --- Submission feedback ---

test.describe("Contact Section -- Submission Feedback", () => {
  test("submit button shows progress while sending", async ({ page }) => {
    await mockContactApiDelayedSuccess(page);
    await navigateToContactSection(page);

    await fillAndSubmit(page, { email: "visitor@example.com" });

    await expect(
      page.getByRole("button", { name: /sending/i })
    ).toBeVisible();

    await expectSuccessMessage(page);
  });

  test("form is cleared after successful submission", async ({
    page,
  }) => {
    await mockContactApiSuccess(page);
    await navigateToContactSection(page);

    await fillAndSubmit(page, {
      name: "Visitor",
      email: "visitor@example.com",
      message: "Hello there",
    });

    await expectSuccessMessage(page);

    // After success, the form is replaced by the success message.
    await expect(nameInput(page)).not.toBeVisible();
    await expect(emailInput(page)).not.toBeVisible();
    await expect(messageInput(page)).not.toBeVisible();
  });
});

// --- Error recovery ---

test.describe("Contact Section -- Error Recovery", () => {
  test("submission failure preserves the visitor's input", async ({
    page,
  }) => {
    await mockContactApiServerError(page);
    await navigateToContactSection(page);

    await fillAndSubmit(page, {
      name: "Test Visitor",
      email: "test@example.com",
      message: "Important message",
    });

    await expectErrorMessage(page);

    await expect(nameInput(page)).toHaveValue("Test Visitor");
    await expect(emailInput(page)).toHaveValue("test@example.com");
    await expect(messageInput(page)).toHaveValue("Important message");
    await expect(submitButton(page)).toBeEnabled();
  });

  test("network interruption shows a friendly error", async ({
    page,
  }) => {
    await mockContactApiNetworkError(page);
    await navigateToContactSection(page);

    await fillAndSubmit(page, { email: "visitor@example.com" });

    await expectErrorMessage(page);

    await expect(emailInput(page)).toHaveValue("visitor@example.com");
  });
});

// --- Miscellaneous ---

test.describe("Contact Section -- Miscellaneous", () => {
  test("no CAPTCHA is shown in version one", async ({ page }) => {
    await navigateToContactSection(page);

    await expect(page.locator("iframe[src*='captcha']")).toHaveCount(0);
    await expect(page.locator("iframe[src*='recaptcha']")).toHaveCount(0);
    await expect(page.locator("[class*='captcha']")).toHaveCount(0);
  });
});
