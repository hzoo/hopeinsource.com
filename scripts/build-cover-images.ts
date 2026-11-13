import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// One cover per site theme; the masters (and the intro videos in public/artwork) come from experiments/cover-lab.html.
const output = new URL("../public/artwork/", import.meta.url);
await mkdir(output, { recursive: true });

await Promise.all(["dark", "light"].flatMap((theme) => {
  const source = Bun.file(new URL(`../src/assets/his-${theme}.png`, import.meta.url));
  return [128, 472, 944].map((width) =>
    source.image().resize(width, width).webp({ quality: 90 })
      .write(fileURLToPath(new URL(`his-${theme}-${width}.webp`, output))),
  );
}));
