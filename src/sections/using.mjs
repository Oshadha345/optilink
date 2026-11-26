import { USING } from "../lib/content.mjs";
import { data, esc, keycaps, href } from "../lib/util.mjs";
import { img } from "../lib/util.mjs";

export function using() {
  const rows = data.controls
    .map(
      (c) => `<tr><th scope="row" data-label="Function">${esc(c.function)}</th><td data-label="Doctor Station">${c.doctor === "—" ? '<span class="dash" aria-label="not used">—</span>' : keycaps(c.doctor)}</td><td data-label="Bed Unit">${c.bed === "—" ? '<span class="dash" aria-label="not used">—</span>' : keycaps(c.bed)}</td></tr>`
    )
    .join("");
  const requests = data.requests
    .map((r) => (r === "Can't breathe" ? `<li class="req req--urgent"><span class="req-name">Can’t breathe</span><span class="req-note">repeating alarm until acknowledged</span></li>` : `<li class="req"><span class="req-name">${esc(r)}</span></li>`))
    .join("");
  const menu = USING.doctorMenu.map((m) => `<li>${esc(m)}</li>`).join("");
  return `<section id="using" class="section section--tint" aria-labelledby="using-h">
<div class="container">
<div class="section-head"><p class="kicker">Using it</p><h2 id="using-h">${esc(USING.title)}</h2></div>
<p class="lede lede--keys">${keycaps(USING.switchOn)}</p>
<div class="units">
<article class="unit-card">
<h3>Doctor Station</h3>
<p>One station serves up to 14 numbered Bed Units. Its keys are START, STOP, F1 to F4 and the digits.</p>
<p class="unit-sub">Main menu</p>
<ul class="pill-list">${menu}</ul>
</article>
<article class="unit-card">
<h3>Bed Unit</h3>
<p>${keycaps(USING.sinceNote)} Beds are numbered 1 to 14, and each unit keeps its own language.</p>
<p class="unit-sub">The patient can</p>
<ul class="pill-list"><li>Answer with ${keycaps("1")} or ${keycaps("2")}</li><li>Ask for something with ${keycaps("7")}</li><li>Send with ${keycaps("#")}</li></ul>
</article>
</div>
<h3 class="sub-h">Controls (firmware 4.6)</h3>
<div class="table-scroll"><table class="data-table stack-table controls-table"><caption class="sr-only">Controls for the Doctor Station and the Bed Unit</caption>
<thead><tr><th scope="col">Function</th><th scope="col">Doctor Station</th><th scope="col">Bed Unit</th></tr></thead><tbody>${rows}</tbody></table></div>
<h3 class="sub-h">The seven patient requests</h3>
<ul class="requests">${requests}</ul>
</div>
</section>`;
}
