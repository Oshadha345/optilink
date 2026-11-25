// Build script for the OptiLink demo site.
// Copies src/ into dist/, verifies that every local asset referenced by the HTML exists,
// and minifies CSS/JS by stripping comments and collapsing whitespace.
// Zero dependencies: run with `node build.mjs`.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(here, "src");
const distDir = path.join(here, "dist");

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

function minifyJs(js) {
  // Conservative: strip full-line // comments and leading indentation only,
  // so string literals containing "//" are never touched.
  return js
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("//"))
    .join("\n");
}

function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^\s+/gm, "")
    .replace(/\n{2,}/g, "\n");
}

async function main() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });

  const files = await fs.readdir(srcDir);
  for (const file of files) {
    const from = path.join(srcDir, file);
    const to = path.join(distDir, file);
    const ext = path.extname(file);
    const raw = await fs.readFile(from, "utf8");

    let out = raw;
    if (ext === ".css") out = minifyCss(raw);
    else if (ext === ".js" || ext === ".mjs") out = minifyJs(raw);
    else if (ext === ".html") out = minifyHtml(raw);

    await fs.writeFile(to, out);
    console.log(`built ${file} (${raw.length} -> ${out.length} bytes)`);
  }

  // Verify local references resolve inside dist/
  const html = await fs.readFile(path.join(distDir, "index.html"), "utf8");
  const refs = [...html.matchAll(/(?:href|src)="([^"#:]+)"/g)].map((m) => m[1]);
  const missing = [];
  for (const ref of refs) {
    try {
      await fs.access(path.join(distDir, ref));
    } catch {
      missing.push(ref);
    }
  }
  if (missing.length) {
    console.error("Missing local assets:", missing);
    process.exit(1);
  }
  console.log(`OK — ${files.length} files written to dist/, ${refs.length} references verified.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
