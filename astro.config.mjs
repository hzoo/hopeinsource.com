import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import { remarkTranscriptPlugin } from "./src/remark-transcript-plugin/plugin";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkTranscriptPlugin],
    extendDefaultPlugins: true,
  },
});
