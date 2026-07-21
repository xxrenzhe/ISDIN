import { readdirSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const contentRoot = resolve("src/content");
const blockedDraftMarkers = [
  "https://example.com",
  "Add a first source before publishing",
  "Replace this draft",
];

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.name.endsWith(".md") ? [path] : [];
  });
}

function isDraft(source) {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] || "";
  return /^draft:\s*true\s*$/m.test(frontmatter);
}

const violations = markdownFiles(contentRoot).flatMap((file) => {
  const source = readFileSync(file, "utf8");
  if (isDraft(source)) return [];

  return blockedDraftMarkers
    .filter((marker) => source.includes(marker))
    .map((marker) => `${relative(contentRoot, file)}: unresolved draft marker “${marker}”`);
});

if (violations.length > 0) {
  throw new Error(`Content readiness validation failed:\n${violations.join("\n")}`);
}

process.stdout.write(
  `Verified ${markdownFiles(contentRoot).length} editorial files contain no unresolved publishing markers.\n`,
);
