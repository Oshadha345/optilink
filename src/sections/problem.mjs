import { PROBLEM } from "../lib/content.mjs";
import { data, esc } from "../lib/util.mjs";

const statValue = (v) => v.replace(/^(\d+)x$/, "$1×").replace("1/2", "½");

export function problem() {
  const barriers = PROBLEM.barriers
    .map(([name, text], i) => `<li><span class="barrier-n" aria-hidden="true">${i + 1}</span><h3>${esc(name)}</h3><p>${esc(text)}</p></li>`)
    .join("");
  const stats = data.evidence_stats
    .map((s) => `<li class="stat"><p class="stat-num">${esc(statValue(s.value))}</p><p class="stat-text">${esc(s.text)}</p><p class="stat-src">${esc(s.source)}</p></li>`)
    .join("");
  return `<section id="problem" class="section" aria-labelledby="problem-h">
<div class="container">
<div class="section-head"><p class="kicker">The problem</p><h2 id="problem-h">${esc(PROBLEM.title)}</h2></div>
<p class="lede">${esc(PROBLEM.intro)}</p>
<h3 class="sr-only">Four barriers</h3>
<ol class="barriers">${barriers}</ol>
<h3 class="sub-h">What the evidence says</h3>
<ul class="stats">${stats}</ul>
<p class="note">${esc(PROBLEM.ppeNote)} Prices approximate, checked Nov 2026.</p>
</div>
</section>`;
}
