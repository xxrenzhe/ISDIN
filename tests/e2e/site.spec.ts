import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const astroImageUrl = /^https:\/\/bes3\.com\/(?:_astro\/|@fs\/)/;

test("home page has an accessible editorial entry point", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("BES3");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Beauty, examined more clearly.",
  );
  await expect(
    page.getByRole("img", {
      name: "Person considering makeup, fragrance and hair care at a sunlit vanity",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore beauty coverage" })).toHaveAttribute(
    "href",
    "/beauty/",
  );
  await expect(page.locator('.desktop-nav a[href="/beauty/"]')).toHaveAttribute(
    "data-analytics-link-type",
    "primary-navigation",
  );

  const schema = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((element) => JSON.parse(element.textContent || "{}"));
  expect(
    schema["@graph"].some(
      (item: { "@type": string; potentialAction?: { "@type": string; target: string } }) =>
        item["@type"] === "WebSite" && item.potentialAction?.["@type"] === "SearchAction",
    ),
  ).toBe(true);

  const results = await new AxeBuilder({ page }).include("main").analyze();
  expect(results.violations).toEqual([]);
});

test("mobile navigation reaches the skincare hub", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");

  await page.getByLabel("Open site menu").click();
  await page.getByRole("link", { name: "02 Skincare" }).click();

  await expect(page).toHaveURL(/\/skincare\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Skincare, made clearer.");
});

test("beauty hubs provide a clear route to makeup, hair care and fragrance coverage", async ({
  page,
}) => {
  await page.goto("/beauty/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Beauty, with room for context.",
  );
  await expect(page.getByRole("link", { name: /Explore Makeup$/ })).toHaveAttribute(
    "href",
    "/makeup/",
  );
  await expect(page.getByRole("link", { name: /Explore Hair care$/ })).toHaveAttribute(
    "href",
    "/hair-care/",
  );
  await expect(page.getByRole("link", { name: /Explore Fragrance$/ })).toHaveAttribute(
    "href",
    "/fragrance/",
  );

  await page.goto("/makeup/complexion-makeup-guide/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Complexion Makeup: A Practical Place to Start",
  );
  await expect(
    page.getByRole("img", {
      name: "Complexion Makeup: A Practical Place to Start editorial photo",
    }),
  ).toBeVisible();
});

test("mobile menu locks the page and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");

  const menu = page.locator(".mobile-menu");
  const trigger = page.getByLabel("Open site menu");
  await trigger.click();
  await expect(menu).toHaveAttribute("open", "");
  await expect(page.locator("body")).toHaveClass(/mobile-menu-open/);

  const menuBounds = await page.locator(".mobile-menu nav").evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return { bottom: bounds.bottom, top: bounds.top };
  });
  expect(menuBounds.top).toBe(70);
  expect(menuBounds.bottom).toBeGreaterThanOrEqual(560);

  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(page.locator("body")).not.toHaveClass(/mobile-menu-open/);
  await expect(trigger).toBeFocused();
});

test("the home page has no horizontal overflow at required breakpoints", async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    expect(
      await page.locator("html").evaluate((element) => element.scrollWidth <= element.clientWidth),
    ).toBe(true);
  }
});

test("ISDIN merchant links stay editorial before affiliate approval", async ({ page }) => {
  await page.goto("/brand-focus/isdin/");

  const hubCta = page.getByRole("link", { name: "Visit ISDIN" });
  await expect(hubCta).toHaveAttribute("href", "https://www.isdin.com/us");
  await expect(hubCta).toHaveAttribute("data-merchant-link", "true");

  await page.goto("/brand-focus/isdin/brand-guide/");

  const articleCta = page.getByRole("link", { name: "Visit ISDIN" });
  await expect(articleCta).toHaveAttribute("href", "https://www.isdin.com/us");
  await expect(articleCta).toHaveAttribute("data-merchant-link", "true");
  await expect(page.getByLabel("affiliate disclosure")).toHaveCount(0);

  await page.goto("/brand-focus/isdin/actinica-vs-ageless/");

  const productCta = page.getByRole("link", { name: "Explore Eryfotona Ageless at ISDIN" });
  await expect(productCta).toHaveCSS("background-color", "rgb(62, 102, 98)");
  await expect(productCta).toHaveCSS("color", "rgb(255, 255, 255)");
});

test("privacy page provides a current reader-facing notice", async ({ page }) => {
  await page.goto("/privacy/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy, in plain language.");
  await expect(page.getByRole("heading", { name: "Information we collect" })).toBeVisible();
  await expect(page.getByText("This page must be updated before launch")).toHaveCount(0);
  await expect(page.locator("main")).toContainText(
    "Cloudflare's handling of information is described in its Privacy Policy.",
  );
  await expect(page.locator("main")).toContainText("Optional analytics and measurement");
  await expect(page.locator("main")).toContainText("We do not send search terms");
  await expect(page.locator("main")).toContainText("Read our affiliate disclosure for details.");
  await expect(page.getByRole("link", { name: "Privacy Policy", exact: true })).toHaveAttribute(
    "href",
    "https://www.cloudflare.com/privacypolicy/",
  );

  const results = await new AxeBuilder({ page }).include("main").analyze();
  expect(results.violations).toEqual([]);
});

test("editorial coverage includes the 2025 topical melatonin guide", async ({ page }) => {
  await page.goto("/ingredients/");

  await expect(
    page.getByRole("link", { name: "Can Melatonin Work in Topical Skin Care?" }),
  ).toHaveAttribute("href", "/ingredients/melatonin-topical-skincare/");

  await page.goto("/ingredients/melatonin-topical-skincare/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Can Melatonin Work in Topical Skin Care?",
  );
  await expect(page.locator(".article-header time").first()).toHaveText(/2025/);
  await expect(
    page.getByRole("img", {
      name: "Can Melatonin Work in Topical Skin Care? editorial photo",
    }),
  ).toBeVisible();

  const results = await new AxeBuilder({ page }).include("main").analyze();
  expect(results.violations).toEqual([]);
});

test("articles provide breadcrumb, related-reading and structured-data paths", async ({ page }) => {
  await page.goto("/ingredients/melatonin-topical-skincare/");

  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  await expect(breadcrumb.getByRole("link", { name: "Ingredients" })).toHaveAttribute(
    "href",
    "/ingredients/",
  );
  await expect(breadcrumb.getByRole("link", { name: "Ingredients" })).toHaveAttribute(
    "data-analytics-link-type",
    "breadcrumb",
  );
  await expect(breadcrumb.getByText("Can Melatonin Work in Topical Skin Care?")).toBeVisible();

  const relatedReading = page.getByRole("heading", {
    name: "Continue with a connected guide.",
  });
  await expect(relatedReading).toBeVisible();
  await expect(page.locator(".related-reading a")).toHaveCount(3);

  const topicLinks = page.getByRole("heading", { name: "Continue through the beauty archive." });
  await expect(topicLinks).toBeVisible();
  await expect(page.locator(".article-topic-links a")).toHaveCount(3);
  await expect(page.locator(".sources a").first()).toHaveAttribute("target", "_blank");
  await expect(page.locator(".sources a").first()).toHaveAttribute("rel", "noopener noreferrer");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", astroImageUrl);

  const schema = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((element) => JSON.parse(element.textContent || "{}"));
  const articleSchema = schema["@graph"].find(
    (item: { "@type": string }) => item["@type"] === "Article",
  ) as { image?: string[] };
  expect(articleSchema.image?.[0]).toMatch(astroImageUrl);
  expect(
    schema["@graph"].some((item: { "@type": string }) => item["@type"] === "BreadcrumbList"),
  ).toBe(true);
});

test("the 404 page remains noindex and offers three useful exits", async ({ page }) => {
  const response = await page.goto("/out-of-the-archive/");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "This page is no longer on the shelf.",
  );
  const main = page.locator("main");
  await expect(main.getByRole("link", { name: "Search BES3" })).toBeVisible();
  await expect(main.getByRole("link", { name: "Browse ingredients" })).toBeVisible();
  await expect(main.getByRole("link", { name: "Browse routines" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
});

test("search stays available to readers without being indexed", async ({ page }) => {
  await page.goto("/search/?q=retinal");

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,follow");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://bes3.com/search/",
  );
});
