import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("abbaspuzi.dev@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("abbas123");
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await page
    .getByRole("button", { name: "**********************" })
    .first()
    .click();
  await page.getByRole("link", { name: "Dashboard" }).click();
  await page.waitForURL("http://localhost:3000/dashboard");
  const title = page.getByRole("heading");
  expect(await title.textContent()).toBe("Dashboard");

  await page.getByRole("link", { name: "Policies" }).click();
  await page.waitForURL("http://localhost:3000/policies");
  const policiesTitle = page.getByRole("heading");
  expect(await policiesTitle.textContent()).toBe("Policies");

  await page.getByRole("link", { name: "Claims" }).click();

  await page.getByRole("link", { name: "Zurich" }).click();

  await page.getByRole("button", { name: "Sign Out" }).click();
});
