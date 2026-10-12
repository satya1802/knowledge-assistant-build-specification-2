import { expect, test } from "@playwright/test";

/**
 * Drives the real backend (see playwright.config.ts: it boots
 * `uvicorn app.main:app` against the default offline/SQLite config, no
 * mocked fetch). Each test uses a freshly generated email so it never
 * collides with another run's accounts or with "first signup is admin".
 */

function uniqueEmail(label: string): string {
  return `${label}-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;
}

const PASSWORD = "a-decent-password-123";

async function signUp(page: import("@playwright/test").Page, email: string, password: string) {
  await page.goto("/sign-in");
  await page.getByRole("tab", { name: "Create account" }).click();
  await page.getByLabel("Work email").last().fill(email);
  await page.getByLabel("Password", { exact: false }).last().fill(password);
  await page.getByLabel("Confirm password").fill(password);
  await page.getByRole("button", { name: "Create account and sign in" }).click();
}

test("sign-in success lands on Chat", async ({ page }) => {
  const email = uniqueEmail("signin-success");
  await signUp(page, email, PASSWORD);
  await expect(page).toHaveURL(/\/chat$/);

  // Sign out, then exercise the sign-in form itself.
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/sign-in$/);

  await page.getByLabel("Work email").fill(email);
  await page.getByLabel("Password", { exact: false }).first().fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  await expect(page).toHaveURL(/\/chat$/);
});

test("sign-in failure shows a single generic error and no field-level message", async ({
  page,
}) => {
  const email = uniqueEmail("signin-failure");
  await signUp(page, email, PASSWORD);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/sign-in$/);

  await page.getByLabel("Work email").fill(email);
  await page.getByLabel("Password", { exact: false }).first().fill("totally-wrong-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  const alert = page.getByRole("alert");
  await expect(alert).toBeVisible();
  await expect(alert).toContainText("Incorrect email or password.");

  // No field-level error text under the email or password inputs.
  await expect(page.locator("#signin-email-error")).toHaveCount(0);
  await expect(page.locator("#signin-password-error")).toHaveCount(0);

  // Still on the sign-in page: a failed attempt never navigates away.
  await expect(page).toHaveURL(/\/sign-in$/);
});

test("sign out returns to sign-in and a direct /chat visit afterwards is blocked", async ({
  page,
}) => {
  const email = uniqueEmail("signout");
  await signUp(page, email, PASSWORD);
  await expect(page).toHaveURL(/\/chat$/);

  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/sign-in$/);

  await page.goto("/chat");
  await expect(page).toHaveURL(/\/sign-in$/);
});
