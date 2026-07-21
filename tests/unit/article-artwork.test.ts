import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const registrySource = readFileSync(
  new URL("../../src/data/article-artwork.ts", import.meta.url),
  "utf8",
);
const imageImports = [...registrySource.matchAll(/from "@\/assets\/images\/([^"\n]+)"/g)].map(
  (match) => match[1],
);

describe("article artwork", () => {
  it("assigns a distinct photo to every editorial and feature entry", () => {
    expect(imageImports).toHaveLength(33);
    expect(new Set(imageImports).size).toBe(imageImports.length);
  });

  it("fails the build path when an article has no registered photo", () => {
    expect(registrySource).toContain("No unique editorial artwork is registered for");
  });
});
