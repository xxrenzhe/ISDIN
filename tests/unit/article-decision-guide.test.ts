import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const guideSource = readFileSync(
  new URL("../../src/components/content/ArticleDecisionGuide.astro", import.meta.url),
  "utf8",
);
const layoutSource = readFileSync(
  new URL("../../src/layouts/ArticleLayout.astro", import.meta.url),
  "utf8",
);

const editorialCollections = [
  "concerns",
  "ingredients",
  "routines",
  "product-guides",
  "makeup",
  "hair-care",
  "fragrance",
  "journal",
  "brand-focus",
];

describe("article decision guide", () => {
  it("provides a distinct practical guide for every editorial collection", () => {
    for (const collection of editorialCollections) {
      expect(guideSource).toMatch(new RegExp(`(?:${collection}|"${collection}"): \\{`));
    }

    expect(guideSource.match(/title: "/g)).toHaveLength(editorialCollections.length);
    expect(guideSource).toContain("PRACTICAL NEXT STEP");
    expect(guideSource).toContain("Keep the limit clear:");
  });

  it("places practical guidance after the article and before related reading", () => {
    expect(layoutSource).toContain(
      'import ArticleDecisionGuide from "@/components/content/ArticleDecisionGuide.astro";',
    );
    expect(layoutSource.indexOf("<slot />")).toBeLessThan(
      layoutSource.indexOf("<ArticleDecisionGuide"),
    );
    expect(layoutSource.indexOf("<ArticleDecisionGuide")).toBeLessThan(
      layoutSource.indexOf("<RelatedReading"),
    );
  });
});
