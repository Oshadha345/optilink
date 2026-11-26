// Page shell: <head>, header, footer.
import { config, esc, href, abs } from "./util.mjs";
import { icons, logo } from "./icons.mjs";

export const TITLE = "OptiLink: two-way infrared bedside communicator";
export const DESCRIPTION =
  "A two-way infrared communicator that lets doctors and patients understand each other in Sinhala, Tamil and English, with no network at all.";
export const DISCLAIMER =
  "OptiLink is a student prototype and is not a certified medical device. It supports, and does not replace, normal clinical care and the ward’s nurse-call system.";

const NAV = [
  ["problem", "Problem"],
  ["gap", "Gap"],
  ["how-it-works", "How it works"],
  ["cost", "Cost"],
  ["technology", "Technology"],
  ["design", "Design"],
  ["docs", "Docs and setup"],
  ["contact", "Contact"],
];

function navHref(id, onHome) {
  if (id === "docs") return href("setup/");
  return onHome ? `#${id}` : href(`#${id}`);
}

export function header({ onHome = false, current = "" } = {}) {
  const items = NAV.map(([id, label]) => {
    const isCurrent = (id === "docs" && current === "setup") ? ' aria-current="page"' : "";
    return `<li><a href="${navHref(id, onHome)}"${isCurrent}>${label}</a></li>`;
  }).join("");
  return `<header class="site-header">
<div class="container header-inner">
<a class="brand" href="${href()}" aria-label="OptiLink, home">${logo({ dark: true, size: 36, label: false })}</a>
<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav"><span class="menu-open">${icons.menu}</span><span class="menu-close">${icons.close}</span><span class="menu-label">Menu</span></button>
<nav id="site-nav" class="site-nav" aria-label="Main"><ul>${items}</ul></nav>
</div>
</header>`;
}

export function footer() {
  return `<footer class="site-footer">
<div class="container footer-grid">
<div class="footer-brand">${logo({ dark: true, size: 40 })}
<p class="footer-tag">Two-way infrared bedside communicator</p></div>
<div class="footer-disclaimer"><p>${esc(DISCLAIMER)}</p></div>
<ul class="footer-links">
<li><a href="${href("setup/")}">Docs and setup</a></li>
<li><a href="${href("sources/")}">Sources</a></li>
<li><a href="${esc(config.repoUrl)}" rel="noopener">GitHub repository</a></li>
</ul>
</div>
<div class="container footer-base"><p>EE356 Product Design, Faculty of Engineering, University of Peradeniya</p></div>
</footer>`;
}

export function page({ title = TITLE, description = DESCRIPTION, path = "", body, bodyClass = "", onHome = false, current = "" }) {
  const url = abs(path);
  const ogImage = abs("og-image.png");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#3F4E61">
<meta property="og:type" content="website">
<meta property="og:site_name" content="OptiLink">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="OptiLink logo and the headline: Talk across the isolation line.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" type="image/svg+xml" href="${href("favicon.svg")}">
<link rel="apple-touch-icon" href="${href("apple-touch-icon.png")}">
<link rel="preload" href="${href("fonts/poppins-400-latin.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${href("fonts/poppins-700-latin.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${href("css/styles.css")}">
<script>document.documentElement.classList.add("js")</script>
</head>
<body class="${bodyClass}" id="top">
<a class="skip-link" href="#main">Skip to content</a>
${header({ onHome, current })}
${body}
${footer()}
<script src="${href("js/main.js")}" defer></script>
</body>
</html>`;
}
