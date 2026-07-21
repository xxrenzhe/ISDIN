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
    expect(analyticsScript).toContain("query_length");
    expect(analyticsScript).not.toContain("query: field.value");
  });

  it("emits Search Console, structured search, image, and deployment hooks", () => {
    expect(layoutSource).toContain("google-site-verification");
    expect(layoutSource).toContain('"@type": "SearchAction"');
    expect(layoutSource).toContain("socialImage");
    expect(articleLayoutSource).toContain("ArticleTopicLinks");
    expect(articleLayoutSource).toContain("getArtwork");
    expect(articleLayoutSource).toContain('target="_blank" rel="noopener noreferrer"');
    expect(deployWorkflow).toContain("PUBLIC_GOOGLE_SITE_VERIFICATION");
    expect(deployWorkflow).toContain("PUBLIC_GTM_ID");
    expect(deployWorkflow).toContain("PUBLIC_GA4_MEASUREMENT_ID");
  });
});
