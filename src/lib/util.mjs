// Small helpers shared by every page builder.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const publicDir = path.join(root, "public");
export const data = JSON.parse(fs.readFileSync(path.join(root, "data/data.json"), "utf8"));
export const config = JSON.parse(fs.readFileSync(path.join(root, "site.config.json"), "utf8"));

// Optional build-time override, used only to preview the filled-in states.
if (process.env.OPTILINK_CONTACT_EMAIL) config.contactEmail = process.env.OPTILINK_CONTACT_EMAIL;
if (process.env.OPTILINK_MEASURED_RANGE) config.measuredRange = process.env.OPTILINK_MEASURED_RANGE;

/** Returns the trimmed value, or null when it is empty or still a {{PLACEHOLDER}}. */
export function provided(value) {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v || /^\{\{.*\}\}$/.test(v)) return null;
  return v;
}

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const num = (n) => Math.round(n).toLocaleString("en-US");
export const rs = (n) => `Rs ${num(n)}`;
export const roundTo = (n, step) => Math.round(n / step) * step;
export const pct = (v, digits = 1) => `${(v * 100).toFixed(digits)}%`;

/** Absolute-from-root URL under the GitHub Pages base path. */
export const href = (p = "") => config.basePath + p.replace(/^\//, "");
export const abs = (p = "") => config.siteUrl + p.replace(/^\//, "");

export function publicFileExists(rel) {
  return fs.existsSync(path.join(publicDir, rel));
}

/** Downloads that actually exist in src/public/downloads/. */
export function availableDownloads() {
  return config.downloads.filter((d) => publicFileExists(`downloads/${d.file}`));
}

/** Responsive WebP image with srcset, explicit size and lazy loading. */
export function img({ name, small, large, w, h, alt, sizes, lazy = true, cls = "", fetchpriority }) {
  const big = href(`images/${name}-${large}.webp`);
  const little = href(`images/${name}-${small}.webp`);
  return `<img class="${cls}" src="${big}" srcset="${little} ${small}w, ${big} ${large}w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ""}${fetchpriority ? ` fetchpriority="${fetchpriority}"` : ""}>`;
}

/** Wraps key names in a controls string in keycap labels. */
export function keycaps(text) {
  const out = [];
  const re = /\b(START|STOP|F[1-4])\b|(?<![\w.–-])([0-9*#])(?![\w.–]|\s*(?:s|seconds?|V|mm|W|kHz)\b)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    out.push(esc(text.slice(last, m.index)));
    out.push(`<kbd>${esc(m[0])}</kbd>`);
    last = m.index + m[0].length;
  }
  out.push(esc(text.slice(last)));
  return out.join("");
}
