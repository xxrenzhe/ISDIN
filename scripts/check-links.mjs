import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");
const hrefPattern = /\b(?:href|src)=["']([^"']+)["']/g;

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

function internalTarget(href) {
  const path = href.split(/[?#]/, 1)[0];
  if (path === "/") return resolve(dist, "index.html");
  if (path.endsWith("/")) return resolve(dist, path.slice(1), "index.html");
  return resolve(dist, path.slice(1));
}

if (!existsSync(dist)) {
  throw new Error("dist/ is missing. Run npm run build before checking links.");
}

const broken = [];
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = internalTarget(href);
    if (!existsSync(target) || statSync(target).isDirectory()) {
      broken.push(`${file.replace(`${dist}/`, "")}: ${href}`);
    }
  }
}

if (broken.length > 0) {
  throw new Error(`Broken internal links:\n${broken.join("\n")}`);
}

process.stdout.write(`Checked internal links in ${htmlFiles(dist).length} HTML files.\n`);
