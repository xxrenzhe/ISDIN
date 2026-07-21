import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const imageRoot = resolve("src/assets/images");
const reviewPath = resolve("docs/image-review.json");
const requiredChecks = [
  "anatomy",
  "hands-and-objects",
  "perspective-and-reflections",
  "product-branding",
  "text-and-watermarks",
];
const maxReviewAgeDays = 180;

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function isWebp(path) {
  const header = readFileSync(path).subarray(0, 12);
  return (
    header.subarray(0, 4).toString("ascii") === "RIFF" &&
    header.subarray(8, 12).toString("ascii") === "WEBP"
  );
}

function isDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
}

let review;
try {
  review = JSON.parse(readFileSync(reviewPath, "utf8"));
} catch (error) {
  throw new Error(`Unable to read ${reviewPath}: ${error.message}`);
}

const violations = [];
if (review.schemaVersion !== 1) violations.push("schemaVersion must be 1");
if (typeof review.reviewer !== "string" || review.reviewer.trim() === "") {
  violations.push("reviewer must identify the visual reviewer");
}
if (!Array.isArray(review.approvedChecks)) {
  violations.push("approvedChecks must be an array");
} else {
  for (const check of requiredChecks) {
    if (!review.approvedChecks.includes(check)) {
      violations.push(`approvedChecks is missing “${check}”`);
    }
  }
}
if (!Array.isArray(review.assets)) violations.push("assets must be an array");

const approved = new Map();
const now = Date.now();
for (const entry of review.assets || []) {
  if (!entry || typeof entry !== "object") {
    violations.push("assets contains an invalid record");
    continue;
  }

  const { file, sha256: expectedHash, reviewedAt, status } = entry;
  if (typeof file !== "string" || !/^[a-z0-9][a-z0-9-]*\.webp$/.test(file)) {
    violations.push(`invalid reviewed image filename: ${String(file)}`);
    continue;
  }
  if (approved.has(file)) {
    violations.push(`duplicate review record for ${file}`);
    continue;
  }
  if (status !== "approved") violations.push(`${file} is not approved`);
  if (typeof expectedHash !== "string" || !/^[a-f0-9]{64}$/.test(expectedHash)) {
    violations.push(`${file} has an invalid SHA-256 hash`);
  }
  if (!isDate(reviewedAt)) {
    violations.push(`${file} has an invalid reviewedAt date`);
  } else {
    const ageDays = Math.floor((now - Date.parse(`${reviewedAt}T00:00:00.000Z`)) / 86_400_000);
    if (ageDays > maxReviewAgeDays) {
      violations.push(`${file} has not been visually re-reviewed in ${maxReviewAgeDays} days`);
    }
  }
  approved.set(file, entry);
}

const imageFiles = readdirSync(imageRoot)
  .filter((file) => file.endsWith(".webp"))
  .sort();

for (const file of imageFiles) {
  const entry = approved.get(file);
  const imagePath = resolve(imageRoot, file);
  if (!isWebp(imagePath)) {
    violations.push(`${file} does not contain valid WebP data`);
  }
  if (!entry) {
    violations.push(`${file} has no approved visual-review record`);
    continue;
  }
  if (entry.sha256 !== sha256(imagePath)) {
    violations.push(`${file} changed after visual review; re-review it and update its hash`);
  }
}

for (const file of approved.keys()) {
  if (!imageFiles.includes(file)) violations.push(`${file} is reviewed but does not exist`);
}

if (violations.length > 0) {
  throw new Error(`Image review validation failed:\n${violations.join("\n")}`);
}

process.stdout.write(
  `Verified approved visual review and integrity hashes for ${imageFiles.length} editorial images.\n`,
);
