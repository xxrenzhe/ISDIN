import { existsSync, readdirSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const dist = resolve("dist");
const bannedCopy = [
  "This page must be updated before launch",
  "The initial static site",
  "before production launch",
  "Individual contributors will be added",
  "Lorem ipsum",
  "TODO",
  "TBD",
];

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

if (!existsSync(dist)) {
  throw new Error("dist/ is missing. Run npm run build before checking public content.");
}

const violations = htmlFiles(dist).flatMap((file) => {
  const html = readFileSync(file, "utf8");
  return bannedCopy
    .filter((phrase) => html.toLocaleLowerCase().includes(phrase.toLocaleLowerCase()))
    .map((phrase) => `${relative(dist, file)}: ${phrase}`);
});

if (violations.length > 0) {
  throw new Error(`Reader-facing placeholder copy found:\n${violations.join("\n")}`);
}

process.stdout.write(`Checked reader-facing copy in ${htmlFiles(dist).length} HTML files.\n`);
