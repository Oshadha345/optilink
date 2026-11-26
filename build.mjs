// Static site build, zero dependencies: `node build.mjs`.
// Renders the pages in src/pages/ from src/data/data.json and src/site.config.json,
// copies src/public/ into dist/, lightly minifies CSS, JS and HTML, then verifies that
// every local reference in the output resolves.
import fs from "node:fs/promises";
import path from "node:path";
import { root, publicDir, config } from "./src/lib/util.mjs";
import { home } from "./src/pages/home.mjs";
import { setup } from "./src/pages/setup.mjs";
import { sources } from "./src/pages/sources.mjs";
import { notFound } from "./src/pages/notfound.mjs";

const dist = path.join(root, "..", "dist");

const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();

// Conservative: drops full-line // comments and indentation only.
const minifyJs = (js) =>
  js
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//"))
    .join("\n");

const minifyHtml = (html) => html.replace(/<!--[\s\S]*?-->/g, "").replace(/^[ \t]+/gm, "").replace(/\n{2,}/g, "\n");

async function copyDir(from, to) {
  await fs.mkdir(to, { recursive: true });
  for (const e of await fs.readdir(from, { withFileTypes: true })) {
    const a = path.join(from, e.name);
    const b = path.join(to, e.name);
    if (e.isDirectory()) await copyDir(a, b);
    else if (e.name === ".gitkeep" || e.name === ".keep") continue;
    else if (e.name.endsWith(".css")) await fs.writeFile(b, minifyCss(await fs.readFile(a, "utf8")));
    else if (e.name.endsWith(".js")) await fs.writeFile(b, minifyJs(await fs.readFile(a, "utf8")));
    else await fs.copyFile(a, b);
  }
}

async function write(rel, html) {
  const out = path.join(dist, rel);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, minifyHtml(html));
}

await fs.rm(dist, { recursive: true, force: true });
await copyDir(publicDir, dist);
await write("index.html", home());
await write("setup/index.html", setup());
await write("sources/index.html", sources());
await write("404.html", notFound());
await fs.writeFile(path.join(dist, ".nojekyll"), "");

// Verify local references (under the base path) exist in dist/.
const pages = ["index.html", "setup/index.html", "sources/index.html", "404.html"];
const missing = new Set();
let checked = 0;
for (const p of pages) {
  const html = await fs.readFile(path.join(dist, p), "utf8");
  const refs = [...html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)].map((m) => m[1]);
  const srcsets = [...html.matchAll(/srcset="([^"]+)"/g)].flatMap((m) => m[1].split(",").map((s) => s.trim().split(/\s+/)[0]));
  for (const ref of [...refs, ...srcsets]) {
    checked++;
    if (!ref.startsWith(config.basePath)) {
      missing.add(`${p}: ${ref} (outside base path)`);
      continue;
    }
    let rel = ref.slice(config.basePath.length);
    if (!rel || rel.endsWith("/")) rel += "index.html";
    try {
      await fs.access(path.join(dist, rel));
    } catch {
      missing.add(`${p}: ${ref}`);
    }
  }
}
if (missing.size) {
  console.error("Broken local references:\n" + [...missing].join("\n"));
  process.exit(1);
}
console.log(`Built ${pages.length} pages; ${checked} local references verified.`);
