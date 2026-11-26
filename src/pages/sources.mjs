import { page } from "../lib/layout.mjs";
import { SOURCES } from "../lib/content.mjs";
import { esc, href } from "../lib/util.mjs";

const list = (rows) =>
  `<ul class="src-list">${rows
    .map(([a, b, c]) => `<li><p class="src-cite"><strong>${esc(a)}</strong>${b ? `, ${esc(b)}` : ""}</p>${c ? `<p class="src-use">Used for: ${esc(c)}</p>` : ""}</li>`)
    .join("")}</ul>`;

export function sources() {
  const prices = SOURCES.prices.map((p) => `<li>${esc(p)}</li>`).join("");
  const body = `<main id="main" class="setup">
<section class="page-hero band-slate" aria-labelledby="src-title">
<div class="container">
<p class="kicker kicker--dark">Sources</p>
<h1 id="src-title">Where our numbers come from</h1>
<p class="lead">Every statistic and price on the OptiLink site comes from the references below.</p>
</div>
</section>
<div class="container setup-wrap">
<section class="setup-block" aria-labelledby="s1"><h2 id="s1">International studies</h2>${list(SOURCES.international)}</section>
<section class="setup-block" aria-labelledby="s2"><h2 id="s2">Sri Lankan sources and data</h2>${list(SOURCES.srilanka)}</section>
<section class="setup-block" aria-labelledby="s3"><h2 id="s3">Prices</h2>
<p>Prices come from the sites below, <strong>approximate, checked November 2026</strong>. Build costs come from the team bill of materials (Tronic.lk, Alphatronic.lk, Daraz.lk, Ciphertecx for printing, JLCPCB for the PCB).</p>
<ul class="pill-list">${prices}</ul></section>
<p class="back-link"><a class="btn btn-primary" href="${href()}">Back to the OptiLink site</a></p>
</div>
</main>`;
  return page({ title: "Sources | OptiLink", description: "References and price sources behind the OptiLink product website.", path: "sources/", body });
}
