import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from '@astrojs/preact';

import { remarkTranscriptPlugin } from "./src/remark-transcript-plugin/plugin";
import { remarkResponsiveImages } from './src/plugins/remark-responsive-images';

// https://astro.build/config
export default defineConfig({
  publicDir: "public",
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkTranscriptPlugin, remarkResponsiveImages],
  },
  experimental: {
    responsiveImages: true,
  },
  image: {
    // Default settings for images
    experimentalLayout: 'responsive',
    experimentalObjectFit: 'cover',
    experimentalObjectPosition: 'center',
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