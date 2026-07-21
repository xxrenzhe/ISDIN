import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const analyticsComponent = readFileSync(
  new URL("../../src/components/analytics/Analytics.astro", import.meta.url),
  "utf8",
);
const analyticsScript = readFileSync(new URL("../../public/analytics.js", import.meta.url), "utf8");
const layoutSource = readFileSync(
  new URL("../../src/layouts/BaseLayout.astro", import.meta.url),
  "utf8",
);
const articleLayoutSource = readFileSync(
  new URL("../../src/layouts/ArticleLayout.astro", import.meta.url),
  "utf8",
);
const headerSource = readFileSync(
  new URL("../../src/components/navigation/SiteHeader.astro", import.meta.url),
  "utf8",
);
const footerSource = readFileSync(
  new URL("../../src/components/navigation/SiteFooter.astro", import.meta.url),
  "utf8",
);
const breadcrumbsSource = readFileSync(
  new URL("../../src/components/navigation/Breadcrumbs.astro", import.meta.url),
  "utf8",
);
const searchPageSource = readFileSync(
  new URL("../../src/pages/search.astro", import.meta.url),
  "utf8",
);
const deployWorkflow = readFileSync(
  new URL("../../.github/workflows/deploy-pages.yml", import.meta.url),
  "utf8",
);

describe("SEO and consent-aware analytics", () => {
  it("keeps Google integrations configurable and gated by reader consent", () => {
    expect(analyticsComponent).toContain("PUBLIC_GTM_ID");
    expect(analyticsComponent).toContain("PUBLIC_GA4_MEASUREMENT_ID");
    expect(analyticsComponent).toContain('data-analytics-choice="granted"');
    expect(analyticsComponent).toContain('data-analytics-choice="denied"');
    expect(analyticsScript).toContain("navigator.doNotTrack");
    expect(analyticsScript).toContain("const disableAnalytics");
    expect(analyticsScript).toContain('analytics_storage: "denied"');
    expect(analyticsScript).toContain("bes3_search_result_click");
    expect(analyticsScript).toContain("bes3_scroll_depth");
    expect(analyticsScript).toContain("percent_scrolled");
    expect(analyticsScript).toContain("currentConsent");
    expect(analyticsScript).toContain("query_length");
    expect(analyticsScript).not.toContain("query: field.value");
    expect(headerSource).toContain('data-analytics-link-type="primary-navigation"');
    expect(footerSource).toContain('data-analytics-link-type="footer-primary-navigation"');
    expect(breadcrumbsSource).toContain('data-analytics-link-type="breadcrumb"');
  });

  it("emits Search Console, structured search, image, and deployment hooks", () => {
    expect(layoutSource).toContain("google-site-verification");
    expect(layoutSource).toContain('"@type": "SearchAction"');
    expect(layoutSource).toContain("robotsDirective");
    expect(searchPageSource).toContain('robots="noindex,follow"');
    expect(layoutSource).toContain("socialImage");
    expect(articleLayoutSource).toContain("ArticleTopicLinks");
    expect(articleLayoutSource).toContain("getArtwork");
    expect(articleLayoutSource).toContain('target="_blank"');
    expect(articleLayoutSource).toContain('rel="noopener noreferrer"');
    expect(articleLayoutSource).toContain('data-analytics-link-type="source-reference"');
    expect(deployWorkflow).toContain("PUBLIC_GOOGLE_SITE_VERIFICATION");
    expect(deployWorkflow).toContain("PUBLIC_GTM_ID");
    expect(deployWorkflow).toContain("PUBLIC_GA4_MEASUREMENT_ID");
  });
});
