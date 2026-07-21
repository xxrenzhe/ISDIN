import type { CollectionEntry, CollectionKey } from "astro:content";

const ROUTES: Record<string, string> = {
  concerns: "/concerns/",
  ingredients: "/ingredients/",
  routines: "/routines/",
  "product-guides": "/product-guides/",
  makeup: "/makeup/",
  "hair-care": "/hair-care/",
  fragrance: "/fragrance/",
  journal: "/journal/",
  "brand-focus": "/brand-focus/",
};

export function contentHref(entry: CollectionEntry<CollectionKey>) {
  const base = ROUTES[entry.collection];
  if (!base) return "/";
  return `${base}${entry.id.replace(/\.(md|mdx)$/, "")}/`;
}

export function contentArtworkKey(entry: CollectionEntry<CollectionKey>) {
  return `${entry.collection}/${entry.id.replace(/\.(md|mdx)$/, "")}`;
}

export function byNewest<T extends { data: { publishDate: Date } }>(items: T[]) {
  return [...items].sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
