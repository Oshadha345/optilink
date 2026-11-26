import { MARKET } from "../lib/content.mjs";
import { data, esc, num } from "../lib/util.mjs";

export function market() {
  const m = data.market;
  const items = MARKET.items.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  const beach = m.beachhead.map((b) => `<li><span class="mk-num">${num(b.beds)}</span><span>${esc(b.name)}, beds</span></li>`).join("");
  return `<section id="market" class="section section--compact" aria-labelledby="market-h">
<div class="container">
<div class="section-head"><p class="kicker">Market</p><h2 id="market-h">${esc(MARKET.title)}</h2></div>
<div class="market-grid">
<dl class="market-defs">${items}</dl>
<div class="market-beds">
<p class="mk-big"><span class="mk-num mk-num--xl">${num(m.public_beds)}</span> public hospital beds in ${num(m.public_hospitals)} hospitals <span class="mk-sub">(${num(m.inpatient_beds)} inpatient; Annual Health Bulletin 2024)</span></p>
<p class="mk-label">Beachhead examples</p>
<ul class="mk-list">${beach}</ul>
<p class="mk-pilot">Pilot region: ${esc(m.pilot_region)}.</p>
</div>
</div>
</div>
</section>`;
}
