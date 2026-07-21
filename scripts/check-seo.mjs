import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");
const requiredPages = [
  "index.html",
  "beauty/index.html",
  "ingredients/melatonin-topical-skincare/index.html",
];
const googleVerification = process.env.PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

if (!existsSync(dist)) {
  throw new Error("dist/ is missing. Run npm run build before checking SEO output.");
}

const documents = requiredPages.map((file) => {
  const path = resolve(dist, file);
  if (!existsSync(path)) throw new Error(`Missing expected SEO output: ${file}`);
  return { file, html: readFileSync(path, "utf8") };
});

const violations = [];
for (const { file, html } of documents) {
  if (!/<link rel="canonical" href="https:\/\/bes3\.com\//.test(html)) {
    violations.push(`${file}: missing canonical link`);
  }
  if (!/<meta name="description" content="[^"]+"/.test(html)) {
    violations.push(`${file}: missing meta description`);
  }
}

const home = documents.find(({ file }) => file === "index.html")?.html || "";
if (!home.includes('"@type":"WebSite"') || !home.includes('"@type":"SearchAction"')) {
  violations.push("index.html: missing WebSite SearchAction structured data");
}

const article =
  documents.find(({ file }) => file.includes("melatonin-topical-skincare"))?.html || "";
if (!/<meta property="og:image" content="https:\/\/bes3\.com\/_astro\//.test(article)) {
  violations.push("article: missing article-specific Open Graph image");
}
const articleSchemaMatch = article.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
let articleSchema;
try {
  articleSchema = articleSchemaMatch ? JSON.parse(articleSchemaMatch[1]) : undefined;
} catch {
  articleSchema = undefined;
}
const structuredArticle = articleSchema?.["@graph"]?.find((item) => item?.["@type"] === "Article");
const articleImages = Array.isArray(structuredArticle?.image)
  ? structuredArticle.image
  : [structuredArticle?.image];
if (!articleImages.some((image) => /^https:\/\/bes3\.com\/_astro\//.test(image))) {
  violations.push("article: missing structured article image");
}
if (!article.includes('data-analytics-link-type="article-topic-path"')) {
  violations.push("article: missing contextual internal links");
}

if (googleVerification) {
  const expected = `<meta name="google-site-verification" content="${googleVerification}"`;
  if (!home.includes(expected))
    violations.push("index.html: missing Google Search Console verification tag");
}

if (violations.length > 0) {
  throw new Error(`SEO validation failed:\n${violations.join("\n")}`);
}

process.stdout.write(
  `Validated canonical metadata, structured data, social images and internal links in ${documents.length} SEO targets.\n`,
);
