import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";

import { remarkTranscriptPlugin } from "./src/remark-transcript-plugin/plugin";
import { remarkResponsiveImages } from './src/plugins/remark-responsive-images';
import { remarkLinksExtractor } from './src/plugins/remark-links-extractor';

// https://astro.build/config
export default defineConfig({
  publicDir: "public",
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
      },
    },
    optimizeDeps: {
      exclude: ['/pagefind/pagefind.js'],
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkLinksExtractor, remarkTranscriptPlugin, remarkResponsiveImages],
    }),
  },
  experimental: {
    chromeDevtoolsWorkspace: true,
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
});
