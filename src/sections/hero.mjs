import { HERO } from "../lib/content.mjs";
import { logo } from "../lib/icons.mjs";
import { href, img, esc, data, roundTo, num } from "../lib/util.mjs";

export function hero() {
  const pairAbout = roundTo(data.pair.total_rs, 1000); // about Rs 17,000
  return `<section class="hero band-slate" aria-labelledby="hero-title">
<div class="container hero-grid">
<div class="hero-text">
<p class="hero-logo">${logo({ dark: true, size: 52 })}</p>
<h1 id="hero-title">${esc(HERO.headline)}</h1>
<p class="lead">${esc(HERO.sub)}</p>
<ul class="key-facts" aria-label="Key facts">
<li><span class="kf-num">3</span><span class="kf-text">languages</span></li>
<li><span class="kf-num">0</span><span class="kf-text">networks needed (no Wi-Fi, SIM or radio)</span></li>
<li><span class="kf-num">Up to 14</span><span class="kf-text">Bed Units per Doctor Station</span></li>
<li><span class="kf-num">About Rs&nbsp;${num(pairAbout)}</span><span class="kf-text">for a complete pair</span></li>
</ul>
<div class="hero-actions">
<a class="btn btn-light" href="#how-it-works">See how it works</a>
<a class="btn btn-outline" href="#cost">Compare the cost</a>
<a class="btn btn-docs" href="${href("setup/")}">Docs and setup</a>
</div>
</div>
<div class="hero-visual">
<div class="paper-panel">${img({ name: "hero-exploded", small: 540, large: 1085, w: 1085, h: 1083, alt: "Exploded view of an OptiLink unit: the blue-grey front, the body with its internal posts, and the off-white battery cover.", sizes: "(min-width: 900px) 520px, 90vw", lazy: false, fetchpriority: "high" })}</div>
</div>
</div>
</section>`;
}
