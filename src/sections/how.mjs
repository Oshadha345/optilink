import { HOW } from "../lib/content.mjs";
import { icons } from "../lib/icons.mjs";
import { esc } from "../lib/util.mjs";

const LANGS = [
  ["en", "English", "en"],
  ["si", "Sinhala", "si"],
  ["ta", "Tamil", "ta"],
];
const DEFAULT_DOCTOR = "en";
const DEFAULT_PATIENT = "ta";

function phraseSpans(side, active) {
  return LANGS.map(([code]) => `<span class="ph" lang="${code}" data-lang="${code}"${code === active ? "" : " hidden"}>${esc(HOW.phrase[code])}</span>`).join("");
}

function langGroup(side, label, active) {
  const buttons = LANGS.map(
    ([code, name]) => `<button type="button" class="seg-btn" data-side="${side}" data-lang="${code}" aria-pressed="${code === active}">${name}</button>`
  ).join("");
  return `<div class="seg" role="group" aria-label="${label}"><span class="seg-label" aria-hidden="true">${label}</span><span class="seg-btns">${buttons}</span></div>`;
}

function phraseDemo() {
  return `<div class="phrase-demo" id="phrase-demo" data-state="done">
<div class="pd-controls">
${langGroup("doctor", "Doctor reads", DEFAULT_DOCTOR)}
${langGroup("bed", "Patient reads", DEFAULT_PATIENT)}
</div>
<div class="pd-stage">
<div class="pd-unit pd-doctor">
<p class="pd-unit-name">Doctor Station</p>
<div class="pd-screen" aria-live="off"><p class="pd-screen-title">You send</p><p class="pd-phrase" data-side="doctor">${phraseSpans("doctor", DEFAULT_DOCTOR)}</p></div>
</div>
<div class="pd-link" aria-hidden="true">
<span class="pd-ir">Infrared, no network</span>
<span class="pd-track"><span class="pd-chip">phrase ID</span></span>
</div>
<div class="pd-unit pd-bed">
<p class="pd-unit-name">Bed Unit</p>
<div class="pd-screen" aria-live="polite"><p class="pd-screen-title">Patient reads</p><p class="pd-phrase pd-phrase--bed" data-side="bed">${phraseSpans("bed", DEFAULT_PATIENT)}</p><p class="pd-wait">Waiting for a message</p></div>
</div>
</div>
<div class="pd-foot">
<button type="button" class="btn btn-small btn-ghost pd-replay">${icons.play}<span>Send again</span></button>
<p class="pd-caption">Only a code for the phrase crosses the room. Each unit looks it up in its own memory and shows it in its own language.</p>
</div>
</div>`;
}

function exchange() {
  const items = HOW.steps
    .map(
      (s, i) => `<li class="ex-step"><span class="ex-n" aria-hidden="true">${i + 1}</span>
<div class="ex-side ex-doctor${s.doctor ? "" : " is-empty"}">${s.doctor ? `<p class="ex-who">Doctor Station</p><p>${esc(s.doctor)}</p>` : ""}</div>
<div class="ex-side ex-bed${s.bed ? "" : " is-empty"}">${s.bed ? `<p class="ex-who">Bed Unit</p><p>${esc(s.bed)}</p>` : ""}</div></li>`
    )
    .join("");
  return `<div class="ex-head" aria-hidden="true"><span></span><span>Doctor Station</span><span>Bed Unit</span></div><ol class="exchange">${items}</ol>`;
}

export function how() {
  const features = HOW.features.map(([t, d]) => `<li><h4>${esc(t)}</h4><p>${esc(d)}</p></li>`).join("");
  return `<section id="how-it-works" class="section" aria-labelledby="how-h">
<div class="container">
<div class="section-head"><p class="kicker">How it works</p><h2 id="how-h">${esc(HOW.title)}</h2></div>
<p class="lede">${esc(HOW.intro)}</p>
${phraseDemo()}
<p class="note note--wide">${esc(HOW.why)}</p>
<h3 class="sub-h">A typical exchange</h3>
${exchange()}
<h3 class="sub-h">What it can do <span class="sub-h-aside">firmware 4.6</span></h3>
<ul class="features">${features}</ul>
</div>
</section>`;
}
