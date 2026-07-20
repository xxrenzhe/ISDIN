import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const sourceSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

const editorialSchema = z.object({
  title: z.string(),
  description: z.string(),
  eyebrow: z.string().optional(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default("bes3-editorial"),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  readTime: z.number().int().positive().default(6),
  concerns: z.array(z.string()).default([]),
  ingredients: z.array(z.string()).default([]),
  productTypes: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).min(1),
  disclosure: z.enum(["none", "affiliate", "sponsored"]).default("none"),
  brand: z.string().optional(),
  brandFocusType: z.enum(["brand-guide", "product-guide", "routine-feature"]).optional(),
  ctaLinkIds: z.array(z.string()).default([]),
  reviewDueDate: z.coerce.date().optional(),
  heroVariant: z.enum(["mineral", "sun", "clay", "ink", "mist"]).default("mineral"),
});

const authorSchema = z.object({
  name: z.string(),
  role: z.string(),
  description: z.string(),
});

const collection = (base: string) =>
  defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base }),
    schema: editorialSchema,
  });

export const collections = {
  authors: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/authors" }),
    schema: authorSchema,
  }),
  concerns: collection("./src/content/concerns"),
  ingredients: collection("./src/content/ingredients"),
  routines: collection("./src/content/routines"),
  "product-guides": collection("./src/content/product-guides"),
  journal: collection("./src/content/journal"),
  "brand-focus": collection("./src/content/brand-focus"),
};
