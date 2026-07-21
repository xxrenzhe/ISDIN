const baseUrl = new URL(process.env.SITE_URL || "https://bes3.com");
const canonicalOrigin = new URL(process.env.CANONICAL_ORIGIN || baseUrl);
const attempts = 6;
const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const pages = [
  { path: "/", text: "Beauty, examined more clearly." },
  { path: "/beauty/", text: "Beauty, with room for context." },
  { path: "/makeup/", text: "Makeup, made clearer." },
  { path: "/hair-care/", text: "Hair care, made manageable." },
  { path: "/fragrance/", text: "Fragrance, with more context." },
  { path: "/sitemap-index.xml", text: "sitemap" },
  { path: "/robots.txt", text: "Sitemap:" },
];

async function checkPage(page) {
  const url = new URL(page.path, baseUrl);
  const response = await fetch(url, { redirect: "follow" });
  const body = await response.text();

  if (!response.ok) throw new Error(`${url}: expected 2xx, received ${response.status}`);
  if (!body.includes(page.text)) throw new Error(`${url}: missing expected content “${page.text}”`);

  if (page.path === "/") {
    const canonical = `<link rel="canonical" href="${new URL("/", canonicalOrigin)}"`;
    if (!body.includes(canonical))
      throw new Error(`${url}: canonical does not match ${canonicalOrigin.origin}`);
  }
}

let lastError;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    await Promise.all(pages.map(checkPage));
    process.stdout.write(`Production verification passed for ${baseUrl.origin}.\n`);
    process.exit(0);
  } catch (error) {
    lastError = error;
    if (attempt < attempts) {
      process.stderr.write(
        `Verification attempt ${attempt}/${attempts} failed: ${error.message}. Retrying…\n`,
      );
      await pause(5000);
    }
  }
}

throw lastError;
