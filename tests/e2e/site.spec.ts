import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home page has an accessible editorial entry point", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("BES3");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Skincare, examined more clearly.",
  );
  await expect(page.getByRole("img", { name: /applying sunscreen/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore the essentials" })).toHaveAttribute(
    "href",
    "/ingredients/",
  );

  const results = await new AxeBuilder({ page }).include("main").analyze();
  expect(results.violations).toEqual([]);
});

test("mobile navigation reaches the concerns index", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");

  await page.getByLabel("Open site menu").click();
  await page.getByRole("link", { name: "01 Concerns" }).click();

  await expect(page).toHaveURL(/\/concerns\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Skin concerns");
});

test("ISDIN feature keeps its official URL before affiliate approval", async ({ page }) => {
  await page.goto("/brand-focus/isdin/");

  const cta = page.getByRole("link", { name: "Visit ISDIN" });
  await expect(cta).toHaveAttribute("href", "https://www.isdin.com/us");
  await expect(cta).toHaveAttribute("data-affiliate", "false");
});
