import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import { remarkTranscriptPlugin } from "./src/remark-transcript-plugin/plugin";

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
    remarkPlugins: [remarkTranscriptPlugin],
    extendDefaultPlugins: true,
  },
});
