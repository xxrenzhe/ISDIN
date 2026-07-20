import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/data/site";
import { byNewest, contentHref } from "@/utils/content";

export async function GET(context) {
  const [journal, focus] = await Promise.all([
    getCollection("journal", ({ data }) => !data.draft),
    getCollection("brand-focus", ({ data }) => !data.draft),
  ]);
  const items = byNewest([...journal, ...focus]).slice(0, 30);
  return rss({
    title: "BES3 editorial feed",
    description: SITE.description,
    site: context.site || SITE.url,
    items: items.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: contentHref(entry),
    })),
  });
}
