import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const registry = readFileSync(resolve("src/data/affiliate-links/isdin.ts"), "utf8");
const contentRoot = resolve("src/content/brand-focus/isdin");
const allowedHosts = new Set(["www.isdin.com"]);
const officialUrls = [...registry.matchAll(/officialUrl:\s*"([^"]+)"/g)].map((match) => match[1]);
const registeredIds = new Set(
  [...registry.matchAll(/^\s*"([^"]+)":\s*\{/gm)].map((match) => match[1]),
);
const contentFiles = [
  "actinica-vs-ageless.md",
  "brand-guide.md",
  "fusion-water-magic.md",
  "melaclear-dark-spot-routine.md",
  "melatonik-guide.md",
  "retinal-advanced-guide.md",
];

if (officialUrls.length === 0) {
  throw new Error("No official merchant URLs found in the ISDIN registry.");
}

for (const href of officialUrls) {
  const url = new URL(href);
  if (url.protocol !== "https:" || !allowedHosts.has(url.hostname)) {
    throw new Error(`Unapproved ISDIN destination: ${href}`);
  }
}

for (const file of contentFiles) {
  const content = readFileSync(resolve(contentRoot, file), "utf8");
  const ctaIds = [...content.matchAll(/ctaLinkIds:\s*\[([^\]]*)\]/g)].flatMap(
    (match) => match[1].match(/[\w-]+/g) || [],
  );

  for (const id of ctaIds) {
    if (!registeredIds.has(id)) {
      throw new Error(`${file} references an unknown CTA id: ${id}`);
    }
  }
}

process.stdout.write(
  `Validated ${officialUrls.length} official ISDIN destinations and Brand Focus CTA references.\n`,
);
