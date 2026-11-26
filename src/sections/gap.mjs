import { GAP, MAP_INFO, MAP_ALT } from "../lib/content.mjs";
import { icons } from "../lib/icons.mjs";
import { data, esc } from "../lib/util.mjs";

const LABEL_SIDE = (p) => (p.x > 0.6 ? "left" : "right");
const level = (v) => (v < 0.34 ? "low" : v < 0.67 ? "medium" : "high");

function pointDetails(name) {
  if (MAP_INFO[name]) return MAP_INFO[name];
  const alt = data.alternatives.find((a) => a.name === MAP_ALT[name]);
  return { strength: alt.strength, short: alt.falls_short };
}

function positioningMap() {
  const m = data.positioning_map;
  const pts = m.points.map((p, i) => ({ ...p, i: i + 1, ...pointDetails(p.name) }));
  const dots = pts
    .map(
      (p) => `<button type="button" class="map-dot${p.highlight ? " map-dot--hl" : ""}" style="left:${(p.x * 100).toFixed(1)}%;bottom:${(p.y * 100).toFixed(1)}%" aria-describedby="tip-${p.i}" aria-expanded="false" data-tip="tip-${p.i}"><span class="map-dot-n">${p.i}</span><span class="map-dot-label map-dot-label--${LABEL_SIDE(p)}">${esc(p.name)}</span><span class="sr-only">, ${esc(p.name)}. Select for details.</span></button>`
    )
    .join("");
  const tips = pts
    .map(
      (p) => `<div class="map-tip" role="tooltip" id="tip-${p.i}" hidden><p class="tip-name">${esc(p.name)}</p><p><strong>Strength:</strong> ${esc(p.strength)}</p><p><strong>Falls short:</strong> ${esc(p.short)}</p></div>`
    )
    .join("");
  const rows = pts
    .map(
      (p) => `<tr><th scope="row">${p.i}. ${esc(p.name)}</th><td>${level(p.x)}</td><td>${level(p.y)}</td><td>${esc(p.strength)}</td><td>${esc(p.short)}</td></tr>`
    )
    .join("");
  return `<figure class="map-figure">
<div class="map-wrap">
<p class="map-axis-y" aria-hidden="true"><span>${esc(m.y_axis)}</span></p>
<div class="map" id="pos-map">
<svg class="map-bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
<rect class="map-gap-zone" x="0" y="0" width="50" height="50"/>
<line class="map-grid" x1="50" y1="0" x2="50" y2="100"/><line class="map-grid" x1="0" y1="50" x2="100" y2="50"/>
<line class="map-axis" x1="0" y1="100" x2="100" y2="100"/><line class="map-axis" x1="0" y1="0" x2="0" y2="100"/>
</svg>
<p class="map-zone-label" aria-hidden="true">The gap</p>
${dots}${tips}
</div>
<p class="map-axis-x" aria-hidden="true">${esc(m.x_axis)} <span class="map-axis-dir">(low to high)</span></p>
</div>
<figcaption>${esc(m.caption)} Select a dot, or tab to it, for its strength and why it falls short.</figcaption>
<details class="more"><summary>Show the map as a list</summary>
<div class="table-scroll"><table class="data-table"><caption class="sr-only">Positions on the map. The vertical axis is: ${esc(m.y_axis)}. The horizontal axis is: ${esc(m.x_axis)}.</caption>
<thead><tr><th scope="col">Option</th><th scope="col">Needs network, devices, installation or cost per bed</th><th scope="col">Carries a checked message, two ways, in each person’s language</th><th scope="col">Strength</th><th scope="col">Falls short</th></tr></thead>
<tbody>${rows}</tbody></table></div></details>
</figure>`;
}

function cell(v) {
  const m = /^(yes|no|partly)(?:\s*\((.*)\))?$/.exec(v);
  if (!m) return `<td class="cell cell-text">${esc(v)}</td>`;
  const kind = m[1];
  const icon = kind === "yes" ? icons.check : kind === "no" ? icons.cross : icons.partial;
  const label = kind === "yes" ? "Yes" : kind === "no" ? "No" : "Partly";
  return `<td class="cell cell-${kind}"><span class="cell-in">${icon}<span class="cell-label">${label}</span>${m[2] ? `<span class="cell-detail">${esc(m[2])}</span>` : ""}</span></td>`;
}

function needsMatrix() {
  const nm = data.needs_matrix;
  const head = nm.columns.map((c, i) => `<th scope="col"${i === 0 ? ' class="col-ol"' : ""}>${esc(c)}</th>`).join("");
  const body = nm.rows
    .map((r) => {
      const cells = r.values.map((v, i) => cell(v).replace("class=\"cell ", i === 0 ? 'class="cell col-ol ' : 'class="cell ')).join("");
      return `<tr><th scope="row">${esc(r.need)}</th>${cells}</tr>`;
    })
    .join("");
  return `<div class="table-scroll matrix-scroll" tabindex="0" role="region" aria-label="Needs matrix, scrolls sideways on small screens">
<table class="matrix"><caption class="sr-only">Needs matrix: OptiLink compared with five alternatives. Each cell says Yes, Partly or No.</caption>
<thead><tr><th scope="col"><span class="sr-only">Need</span></th>${head}</tr></thead><tbody>${body}</tbody></table></div>
<ul class="matrix-key" aria-label="Key"><li><span class="key-swatch key-yes">${icons.check}</span> Yes</li><li><span class="key-swatch key-partly">${icons.partial}</span> Partly</li><li><span class="key-swatch key-no">${icons.cross}</span> No</li></ul>`;
}

function alternativesTable() {
  const rows = data.alternatives
    .map(
      (a) => `<tr><th scope="row" data-label="Option">${esc(a.name)}</th><td data-label="Price">${esc(a.price)}</td><td data-label="Strength">${esc(a.strength)}</td><td data-label="Why it falls short">${esc(a.falls_short)}</td></tr>`
    )
    .join("");
  return `<details class="more more--lg" id="alternatives"><summary>What hospitals use today <span class="more-count">(${data.alternatives.length} options)</span></summary>
<div class="table-scroll"><table class="data-table stack-table"><caption>Prices are approximate, checked Nov 2026.</caption>
<thead><tr><th scope="col">Option</th><th scope="col">Price</th><th scope="col">Strength</th><th scope="col">Why it falls short</th></tr></thead><tbody>${rows}</tbody></table></div></details>`;
}

export function gap() {
  const local = GAP.local.map(([a, b]) => `<li><strong>${esc(a)}</strong> ${esc(b)}</li>`).join("");
  return `<section id="gap" class="section section--tint" aria-labelledby="gap-h">
<div class="container">
<div class="section-head"><p class="kicker">The research gap</p><h2 id="gap-h">${esc(GAP.title)}</h2></div>
<blockquote class="gap-statement"><p>${esc(GAP.statement)}</p></blockquote>
<h3 class="sub-h">Where each option sits</h3>
${positioningMap()}
<h3 class="sub-h">Needs matrix</h3>
<p class="lede lede--tight">Six ways to communicate, checked against the needs of an isolation ward.</p>
${needsMatrix()}
${alternativesTable()}
<div class="gap-split">
<div><h3 class="sub-h sub-h--sm">${esc(GAP.whyNotTitle)}</h3><p>${esc(GAP.whyNot)}</p></div>
<div><h3 class="sub-h sub-h--sm">Local context</h3><ul class="plain-list">${local}</ul></div>
</div>
</div>
</section>`;
}
