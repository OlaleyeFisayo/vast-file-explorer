import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/types.ts",
    "src/vite/index.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: true,
  sourcemap: true,
  shims: true,
  external: [
    "express",
    "axios",
    "zod",
    "vite",
  ],
});
