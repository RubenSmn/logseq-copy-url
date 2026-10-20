import { cp, mkdir, rm } from "node:fs/promises";

const outdir = "./dist";

// Alten Build entfernen
await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });

// TypeScript zu JavaScript kompilieren
const result = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir,
  target: "browser",
  format: "esm",
  minify: true,
});

if (!result.success) {
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

// HTML-Einstiegspunkt kopieren
await cp("./src/index.html", `${outdir}/index.html`);

console.log("✓ Logseq plugin built successfully");