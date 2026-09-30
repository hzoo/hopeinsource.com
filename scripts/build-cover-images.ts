import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const source = Bun.file(new URL("../src/assets/his.jpg", import.meta.url));
const output = new URL("../public/artwork/", import.meta.url);
await mkdir(output, { recursive: true });

await Promise.all([128, 472, 944].map((width) =>
  source.image().resize(width, width).webp({ quality: 90 })
    .write(fileURLToPath(new URL(`his-${width}.webp`, output))),
));
