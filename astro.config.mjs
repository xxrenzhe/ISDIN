import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://bes3.com",
  output: "static",
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      // Search results are useful to readers but should not compete with canonical editorial pages.
      filter: (page) => new URL(page).pathname !== "/search/",
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
