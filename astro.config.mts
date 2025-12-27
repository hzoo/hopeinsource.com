import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from '@astrojs/preact';

import { remarkTranscriptPlugin } from "./src/remark-transcript-plugin/plugin";
import { remarkResponsiveImages } from './src/plugins/remark-responsive-images';
import { remarkLinksExtractor } from './src/plugins/remark-links-extractor';

// https://astro.build/config
export default defineConfig({
  publicDir: "public",
  integrations: [preact()],
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
    remarkPlugins: [remarkLinksExtractor, remarkTranscriptPlugin, remarkResponsiveImages],
  },
  experimental: {
    // headingIdCompat: true,
    preserveScriptOrder: true,
    staticImportMetaEnv: true,
    chromeDevtoolsWorkspace: true,
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
    // Reasonable default widths for responsive images
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 90,
        formats: ['webp'],
        widths: [640, 750, 828, 1080, 1200, 1920],
      },
    },
  },
});