import { readdirSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const registrySource = readFileSync(
  new URL("../../src/data/article-artwork.ts", import.meta.url),
  "utf8",
);
const imageImports = [...registrySource.matchAll(/from "@\/assets\/images\/([^"\n]+)"/g)].map(
  (match) => match[1],
);
const contentRoot = resolve(new URL("../../src/content", import.meta.url).pathname);

function markdownFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.name.endsWith(".md") ? [path] : [];
  });
}

const editorialKeys = markdownFiles(contentRoot)
  .filter((path) => !path.includes("/authors/"))
  .map((path) => relative(contentRoot, path).replace(/\.md$/, ""));

describe("article artwork", () => {
  it("assigns a distinct photo to every editorial and feature entry", () => {
    expect(imageImports).toHaveLength(editorialKeys.length + 2);
    expect(new Set(imageImports).size).toBe(imageImports.length);
    for (const key of editorialKeys) {
      expect(registrySource).toContain(`"${key}":`);
    }
    expect(registrySource).toContain('"brand-focus/isdin":');
    expect(registrySource).toContain('"home-brand-focus":');
  });

  it("fails the build path when an article has no registered photo", () => {
    expect(registrySource).toContain("No unique editorial artwork is registered for");
  });
});
