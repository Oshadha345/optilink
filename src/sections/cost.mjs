import { COST } from "../lib/content.mjs";
import { bedIcon, stationIcon, tabletIcon } from "../lib/icons.mjs";
import { data, esc, num, rs, roundTo } from "../lib/util.mjs";

const LOG_MIN = 3; // Rs 1,000
const LOG_MAX = 7; // Rs 10,000,000
const pos = (v) => ((Math.log10(v) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
const TICKS = [
  [1e3, "Rs 1,000"],
  [1e4, "Rs 10,000"],
  [1e5, "Rs 100,000"],
  [1e6, "Rs 1 million"],
  [1e7, "Rs 10 million"],
];

function money(min, max) {
  if (max >= 1e6) return `Rs ${(min / 1e6).toFixed(1)}–${(max / 1e6).toFixed(1)} million`;
  return min === max ? rs(min) : `Rs ${num(min)}–${num(max)}`;
}

function costChart() {
  const rows = data.cost_per_bed
    .map((o) => {
      const s = pos(o.min);
      const e = pos(o.max);
      const label = money(o.min, o.max);
      const side = e > 62 ? "left" : "right";
      const cls = ["cb-row", o.highlight ? "cb-row--ol" : "", o.has_content ? "" : "cb-row--nocontent"].join(" ").trim();
      const valStyle = side === "right" ? `left:calc(${e.toFixed(2)}% + 10px)` : `right:calc(${(100 - s).toFixed(2)}% + 10px)`;
      return `<li class="${cls}">
<div class="cb-label"><p class="cb-name">${esc(o.option)}<span class="cb-val cb-val--head">${label}</span></p><p class="cb-note">${esc(o.note)}${o.has_content ? "" : ' <span class="cb-flag">No message content</span>'}</p></div>
<div class="cb-track"><span class="cb-bar" style="left:${s.toFixed(2)}%;width:${(e - s).toFixed(2)}%"></span><span class="cb-val cb-val--track" style="${valStyle}">${label}</span></div>
</li>`;
    })
    .join("");
  const grid = TICKS.map(([v]) => `<span class="cb-gl" style="left:${pos(v).toFixed(2)}%"></span>`).join("");
  const ticks = TICKS.map(([v, l], i) => `<span class="cb-tick${i === 0 ? " first" : ""}${i === TICKS.length - 1 ? " last" : ""}" style="left:${pos(v).toFixed(2)}%">${l}</span>`).join("");
  const tableRows = data.cost_per_bed
    .map((o) => `<tr><th scope="row">${esc(o.option)}</th><td>${money(o.min, o.max)}</td><td>${o.has_content ? "Yes" : "No message content"}</td><td>${esc(o.note)}</td></tr>`)
    .join("");
  return `<figure class="cb">
<figcaption><strong>Cost per bed, in Sri Lankan rupees.</strong> Logarithmic scale: each gridline is ten times the one before. Prices approximate, checked Nov 2026.</figcaption>
<div class="cb-chart">
<div class="cb-grid" aria-hidden="true">${grid}</div>
<ul class="cb-rows">${rows}</ul>
<div class="cb-axis" aria-hidden="true">${ticks}</div>
</div>
<ul class="cb-legend" aria-label="Legend"><li><span class="lg lg-ol"></span>OptiLink</li><li><span class="lg lg-other"></span>Carries message content</li><li><span class="lg lg-nocontent"></span>No message content</li></ul>
<details class="more"><summary>Show as table</summary><div class="table-scroll"><table class="data-table"><caption class="sr-only">Cost per bed by option</caption><thead><tr><th scope="col">Option</th><th scope="col">Cost per bed</th><th scope="col">Message content</th><th scope="col">Note</th></tr></thead><tbody>${tableRows}</tbody></table></div></details>
</figure>`;
}

function wardKit() {
  const k = data.ward_kit;
  const beds = Array.from({ length: k.bed_units }, () => `<li>${bedIcon}</li>`).join("");
  const tablets = Array.from({ length: 2 }, () => `<li>${tabletIcon}</li>`).join("");
  return `<div class="vs">
<div class="vs-col vs-ol">
<p class="vs-title">OptiLink ward kit</p>
<ul class="vs-icons" aria-label="1 Doctor Station and ${k.bed_units} Bed Units"><li class="vs-station">${stationIcon}</li>${beds}</ul>
<p class="vs-price">about ${rs(roundTo(k.total_rs, 100))}</p>
<p class="vs-cover"><strong>${k.bed_units} beds</strong> and 1 Doctor Station, about ${rs(roundTo(k.per_bed_rs, 100))} per bed</p>
<p class="vs-fine">${k.doctor_stations + k.bed_units} × ${rs(data.bom_per_unit.total)} = ${rs(k.units_rs)}, plus ${k.chargers} chargers × ${rs(data.pair.charger_rs)} = ${rs(k.chargers_rs)}</p>
</div>
<div class="vs-col">
<p class="vs-title">Two tablets</p>
<ul class="vs-icons" aria-label="2 tablets">${tablets}</ul>
<p class="vs-price">${rs(COST.tabletRs)}</p>
<p class="vs-cover"><strong>2 beds</strong>, ${rs(COST.tabletEach)} per bed</p>
<p class="vs-fine">Two Samsung Galaxy Tab A9 tablets</p>
</div>
</div>`;
}

const BOM_CLASSES = ["bom-1", "bom-2", "bom-3", "bom-4"];
function bom() {
  const b = data.bom_per_unit;
  const segs = b.items
    .map((it, i) => `<li class="bom-seg ${BOM_CLASSES[i]}" style="flex:${it.rs}"><span>${rs(it.rs)}</span></li>`)
    .join("");
  const legend = b.items
    .map((it, i) => `<li><span class="lg ${BOM_CLASSES[i]}"></span><span class="bom-name">${esc(it.name)}</span><span class="bom-rs">${rs(it.rs)} <span class="bom-pct">${((it.rs / b.total) * 100).toFixed(0)}%</span></span></li>`)
    .join("");
  const max = Math.max(...b.largest_parts.map((p) => p.rs));
  const parts = b.largest_parts
    .map((p) => `<li><span class="lp-name">${esc(p.name)}</span><span class="lp-bar"><span style="width:${((p.rs / max) * 100).toFixed(1)}%"></span></span><span class="lp-rs">${rs(p.rs)}</span></li>`)
    .join("");
  const sup = b.sources.map((s) => `<li>${esc(s)}</li>`).join("");
  return `<div class="bom">
<div class="bom-main">
<p class="bom-total"><strong>${rs(b.total)}</strong> to build one unit</p>
<ul class="bom-bar" aria-hidden="true">${segs}</ul>
<ul class="bom-legend">${legend}</ul>
</div>
<div class="bom-side">
<h4>Largest parts</h4>
<ul class="lp">${parts}</ul>
<h4>Suppliers</h4>
<ul class="pill-list pill-list--sm">${sup}</ul>
</div>
</div>`;
}

export function calcDefaults() {
  const p = data.payback;
  const days = Math.round(p.pair_price_rs / (p.entries_avoided_per_day * p.ppe_cost_per_entry_rs));
  const month = p.entries_avoided_per_day * p.ppe_cost_per_entry_rs * 30;
  return { p, days, month };
}

function calculator() {
  const { p, days, month } = calcDefaults();
  const ppe = p.ppe_prices_rs;
  return `<form class="calc" id="payback" onsubmit="return false" aria-labelledby="calc-h">
<h3 id="calc-h" class="sub-h sub-h--sm">When does the pair pay for itself?</h3>
<p class="calc-intro">Every entry into an isolation room that OptiLink avoids saves a set of PPE. Payback days = pair price ÷ (entries avoided per day × PPE cost per entry).</p>
<div class="calc-presets" role="group" aria-label="Presets">
<button type="button" class="btn btn-small btn-ghost" data-ppe="${p.examples[0].per_entry}" aria-pressed="true">Retail PPE</button>
<button type="button" class="btn btn-small btn-ghost" data-ppe="${p.examples[1].per_entry}" aria-pressed="false">Bulk tender (half price)</button>
</div>
<div class="calc-fields">
<label>Pair price (Rs)<input type="number" inputmode="numeric" min="0" step="500" name="pair" value="${p.pair_price_rs}"></label>
<label>PPE cost per entry (Rs)<input type="number" inputmode="numeric" min="0" step="10" name="ppe" value="${p.ppe_cost_per_entry_rs}"></label>
<label>Entries avoided per day<input type="number" inputmode="numeric" min="0" step="1" name="entries" value="${p.entries_avoided_per_day}"></label>
</div>
<div class="calc-out" role="status" aria-live="polite">
<p><span class="calc-big" data-out="days">${days}</span> <span data-out="days-unit">days</span> to pay back</p>
<p><span class="calc-big calc-big--sm" data-out="month">${rs(month)}</span> saved per 30-day month</p>
</div>
<p class="calc-caption">Illustration. Use your ward’s own numbers. The default pair price, Rs ${num(p.pair_price_rs)}, sits inside our proposed range.</p>
<p class="calc-ppe">PPE prices, approximate, checked Nov 2026: isolation gown ${money(ppe.isolation_gown[0], ppe.isolation_gown[1])}; nitrile gloves Rs ${ppe.nitrile_gloves_pair[0]}–${ppe.nitrile_gloves_pair[1]} a pair; N95 (3M 8210) ${rs(ppe.n95_3m_8210)}; coverall ${money(ppe.coverall[0], ppe.coverall[1])}.</p>
</form>`;
}

export function cost() {
  const b = data.bom_per_unit;
  const pr = data.proposed_price;
  const perBed = roundTo(data.ward_kit.per_bed_rs, 100);
  return `<section id="cost" class="section" aria-labelledby="cost-h">
<div class="container">
<div class="section-head"><p class="kicker">Cost and comparison</p><h2 id="cost-h">${esc(COST.title)}</h2></div>
<ul class="bignums">
<li><p class="bn-num">${rs(b.total)}</p><p class="bn-text">per unit, to build</p></li>
<li><p class="bn-num">${rs(data.pair.total_rs)}</p><p class="bn-text">per pair with one charger (about USD ${data.pair.total_usd} at Rs ${data.currency.usd_rate} per USD)</p></li>
<li class="bn-ol"><p class="bn-num">About ${rs(perBed)}</p><p class="bn-text">per bed in a 10-bed ward</p></li>
</ul>
<p class="note note--wide">Build costs come from our bill of materials at Sri Lankan supplier prices. All prices are approximate, checked Nov 2026.</p>
<h3 class="sub-h">Cost per bed against the alternatives</h3>
${costChart()}
<h3 class="sub-h">Ward kit against two tablets</h3>
${wardKit()}
<h3 class="sub-h">Where the Rs ${num(b.total)} goes</h3>
${bom()}
<h3 class="sub-h">Payback on PPE</h3>
${calculator()}
<div class="proposed">
<p class="proposed-tag">Proposed</p>
<p class="proposed-line"><strong>Rs ${num(pr.per_unit_rs[0])}–${num(pr.per_unit_rs[1])}</strong> per unit</p>
<p class="proposed-line"><strong>Rs ${num(pr.per_pair_with_charger_rs[0])}–${num(pr.per_pair_with_charger_rs[1])}</strong> per pair with charger</p>
<p class="proposed-note">Proposed selling price, not a final price list.</p>
</div>
<p class="note note--wide">${esc(COST.atScale)}</p>
</div>
</section>`;
}
