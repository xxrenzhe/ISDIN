import { readdirSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const contentRoot = resolve("src/content");
const dateFields = ["publishDate", "updatedDate", "reviewDueDate"];
const requiredArticles = new Map([
  ["brand-focus/isdin/brand-guide.md", "ISDIN Brand Guide: Sun Care, Photoaging and Key Products"],
  ["brand-focus/isdin/fusion-water-magic.md", "ISDIN Fusion Water MAGIC: Who Is It Best For?"],
  ["brand-focus/isdin/actinica-vs-ageless.md", "Eryfotona Actinica vs Ageless: How to Choose"],
  [
    "brand-focus/isdin/melatonik-guide.md",
    "Melatonik: Melatonin, Vitamin C and Overnight Skin Care",
  ],
  ["brand-focus/isdin/retinal-advanced-guide.md", "Retinal Advanced Ingredient and Routine Guide"],
  [
    "brand-focus/isdin/melaclear-dark-spot-routine.md",
    "Building a Dark-Spot Routine Around Melaclear Advanced",
  ],
  ["concerns/uva-vs-uvb.md", "UVA vs UVB: What Your Sunscreen Needs to Cover"],
  ["concerns/photoaging.md", "What Photoaging Looks Like—and How to Build a Routine"],
  ["concerns/how-much-sunscreen.md", "How Much Sunscreen Should You Actually Apply?"],
  ["product-guides/mineral-vs-organic-sunscreen.md", "Mineral vs Organic Sunscreen Filters"],
  [
    "ingredients/retinal-vs-retinol.md",
    "Retinal for Beginners: What It Is and How It Differs From Retinol",
  ],
  ["ingredients/tranexamic-acid.md", "Tranexamic Acid in Skin Care: A Beginner's Guide"],
  ["ingredients/melatonin-topical-skincare.md", "Can Melatonin Work in Topical Skin Care?"],
  ["routines/morning-uneven-tone.md", "A Practical Morning Routine for Uneven Skin Tone"],
  ["routines/vitamin-c-and-retinal.md", "How to Combine Retinal, Vitamin C and Sunscreen"],
]);

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.name.endsWith(".md") ? [path] : [];
  });
}

function frontmatter(file) {
  const source = readFileSync(file, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Missing frontmatter: ${relative(contentRoot, file)}`);
  return match[1];
}

const currentDate = new Date();
const latestAllowed = new Date(
  Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()),
);
const publishYears = new Set();
const monthlyPublishCounts = new Map();
const dateViolations = [];

for (const file of markdownFiles(contentRoot)) {
  const key = relative(contentRoot, file);
  const metadata = frontmatter(file);
  const title = metadata.match(/^title:\s*"([^"]+)"$/m)?.[1];
  const isDraft = /^draft:\s*true$/m.test(metadata);

  if (requiredArticles.has(key) && title !== requiredArticles.get(key)) {
    dateViolations.push(`${key}: expected title “${requiredArticles.get(key)}”`);
  }

  for (const field of dateFields) {
    const value = metadata.match(new RegExp(`^${field}:\\s*(\\d{4}-\\d{2}-\\d{2})$`, "m"))?.[1];
    if (!value) continue;

    const date = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(date.valueOf())) {
      dateViolations.push(`${key}: invalid ${field} ${value}`);
      continue;
    }
    if (date > latestAllowed) {
      dateViolations.push(`${key}: future ${field} ${value}`);
    }
    if (field === "publishDate" && !isDraft) {
      publishYears.add(date.getUTCFullYear());
      const month = date.toISOString().slice(0, 7);
      monthlyPublishCounts.set(month, (monthlyPublishCounts.get(month) || 0) + 1);
    }
  }
}

for (const key of requiredArticles.keys()) {
  const file = resolve(contentRoot, key);
  try {
    readFileSync(file, "utf8");
  } catch {
    dateViolations.push(`Missing required article: ${key}`);
  }
}

for (const year of [2025, 2026]) {
  if (!publishYears.has(year)) dateViolations.push(`Missing published coverage for ${year}`);
}

const distributionStart = new Date(Date.UTC(2025, 0, 1));
const currentMonth = new Date(
  Date.UTC(latestAllowed.getUTCFullYear(), latestAllowed.getUTCMonth(), 1),
);
for (
  const month = new Date(distributionStart);
  month <= currentMonth;
  month.setUTCMonth(month.getUTCMonth() + 1)
) {
  const key = month.toISOString().slice(0, 7);
  const count = monthlyPublishCounts.get(key) || 0;
  if (count === 0) dateViolations.push(`Missing published coverage for ${key}`);
  if (count > 3) dateViolations.push(`${key} has ${count} published articles; distribute releases`);
}

if (dateViolations.length > 0) {
  throw new Error(`Editorial content validation failed:\n${dateViolations.join("\n")}`);
}

process.stdout.write(
  `Validated ${markdownFiles(contentRoot).length} editorial files, required coverage and dates through ${latestAllowed.toISOString().slice(0, 10)}.\n`,
);
