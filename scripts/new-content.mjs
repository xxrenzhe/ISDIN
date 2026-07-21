import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";

const collections = new Set([
  "concerns",
  "ingredients",
  "routines",
  "product-guides",
  "makeup",
  "hair-care",
  "fragrance",
  "journal",
]);

const { values } = parseArgs({
  options: {
    collection: { type: "string" },
    slug: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    eyebrow: { type: "string", default: "BES3 EDITORIAL" },
    "dry-run": { type: "boolean", default: false },
  },
});

const required = ["collection", "slug", "title", "description"];
const missing = required.filter((key) => !values[key]);

if (missing.length > 0) {
  throw new Error(`Missing required option(s): ${missing.map((key) => `--${key}`).join(", ")}`);
}

if (!collections.has(values.collection)) {
  throw new Error(
    `Unsupported collection: ${values.collection}. Choose one of: ${[...collections].join(", ")}`,
  );
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.slug)) {
  throw new Error("Slug must use lowercase letters, numbers and single hyphens only.");
}

const date = new Date().toISOString().slice(0, 10);
const destination = resolve("src/content", values.collection, `${values.slug}.md`);

if (existsSync(destination)) {
  throw new Error(`Content file already exists: ${destination}`);
}

const quote = (value) => JSON.stringify(value);
const source = `---
title: ${quote(values.title)}
description: ${quote(values.description)}
eyebrow: ${quote(values.eyebrow)}
publishDate: ${date}
draft: true
readTime: 6
concerns: []
ingredients: []
productTypes: []
tags: []
sources:
  - label: Add a first source before publishing
    url: https://example.com
---

## Replace this draft

Write a reader-first opening that states the scope, what the article can answer and where its limits are.

## Add evidence and context

Use clear subheadings. Explain the decision, practical fit and relevant limitations without overclaiming.

## Before publishing

- Replace the placeholder source and add enough primary or authoritative references to support the article.
- Add a unique WebP image under \`src/assets/images/\` and register it in \`src/data/article-artwork.ts\`.
- Replace every bracketed or draft instruction, set \`draft: false\`, then run \`npm run check\` and \`npm run test:e2e\`.
`;

if (values["dry-run"]) {
  process.stdout.write(`Would create ${destination}\n\n${source}`);
  process.exit(0);
}

mkdirSync(dirname(destination), { recursive: true });
writeFileSync(destination, source, "utf8");
process.stdout.write(`Created draft: ${destination}\n`);
