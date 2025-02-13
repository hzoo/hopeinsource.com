import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import { remarkTranscriptPlugin } from "./src/remark-transcript-plugin/plugin";
import { remarkResponsiveImages } from './src/plugins/remark-responsive-images';

// https://astro.build/config
export default defineConfig({
  publicDir: "public",
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkTranscriptPlugin, remarkResponsiveImages],
    extendDefaultPlugins: true,
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
        quality: 80,
        formats: ['webp'],
        widths: [640, 750, 828, 1080, 1200, 1920],
      },
    },
  },
});
