import { DESIGN } from "../lib/content.mjs";
import { icons } from "../lib/icons.mjs";
import { availableDownloads, config, esc, href, img } from "../lib/util.mjs";

export function design() {
  const facts = DESIGN.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  const inBox = DESIGN.packaging.inBox.map((i) => `<li>${esc(i)}</li>`).join("");
  const have = new Set(availableDownloads().map((d) => d.id));
  const docLink = (id, label) => {
    const d = config.downloads.find((x) => x.id === id);
    return have.has(id) ? ` <a class="inline-dl" href="${href(`downloads/${d.file}`)}">${icons.download}<span>${label}</span></a>` : "";
  };
  return `<section id="design" class="section section--nopad" aria-labelledby="design-h">
<div class="container design-top">
<div class="section-head"><p class="kicker">Design</p><h2 id="design-h">${esc(DESIGN.title)}</h2></div>
<div class="renders">
<figure>${img({ name: "unit-front", small: 520, large: 1212, w: 1212, h: 1035, alt: "OptiLink unit, assembled, seen from the front: a blue-grey waisted case with an OLED window, a rocker switch and a keypad.", sizes: "(min-width: 900px) 360px, 94vw" })}<figcaption>Front</figcaption></figure>
<figure>${img({ name: "unit-back", small: 520, large: 1199, w: 1199, h: 1037, alt: "OptiLink unit seen from the back, with the off-white battery cover clipped in.", sizes: "(min-width: 900px) 360px, 94vw" })}<figcaption>Back, with the battery cover</figcaption></figure>
<figure>${img({ name: "hero-exploded", small: 540, large: 1085, w: 1085, h: 1083, alt: "Exploded view of the three printed parts: front, body and battery cover.", sizes: "(min-width: 900px) 360px, 94vw" })}<figcaption>Exploded: front, body, cover</figcaption></figure>
</div>
<div class="design-grid">
<figure class="dims">${img({ name: "enclosure-dimensions", small: 720, large: 1450, w: 1450, h: 985, alt: "Dimension drawing of the enclosure: assembled size 162 by 95 by 36 millimetres, with the body, front and battery cover dimensions.", sizes: "(min-width: 900px) 600px, 94vw" })}<figcaption>Enclosure dimensions</figcaption></figure>
<dl class="facts">${facts}</dl>
</div>
</div>

<div class="band-black" id="packaging" aria-labelledby="pack-h">
<div class="container pack-grid">
<div class="pack-text">
<p class="kicker kicker--dark">Packaging</p>
<h3 id="pack-h">${esc(DESIGN.packaging.title)}</h3>
<p>${esc(DESIGN.packaging.text)}</p>
<p class="pack-label">In the box</p>
<ul class="pack-list">${inBox}</ul>
</div>
<div class="pack-img">${img({ name: "packaging-lid-wrap", small: 820, large: 1600, w: 1600, h: 1534, alt: "Print artwork for the lid wrap on the matte-black box: the OptiLink logo, the line Two-way infrared bedside communicator, five key facts, a QR code for docs and setup, and a drawing of the unit.", sizes: "(min-width: 900px) 560px, 94vw" })}</div>
</div>
</div>

<div class="container design-bottom">
<h3 class="sub-h">Role labels</h3>
<div class="labels">
<figure><img src="${href("images/label-doctor.svg")}" width="640" height="140" alt="DOCTOR label, 64 by 14 millimetres: dark label with the OptiLink badge and the word DOCTOR." loading="lazy"><figcaption>DOCTOR label, 64 × 14 mm</figcaption></figure>
<figure><img src="${href("images/label-patient.svg")}" width="640" height="140" alt="PATIENT label, 64 by 14 millimetres: dark label with the OptiLink badge and the word PATIENT." loading="lazy"><figcaption>PATIENT label, 64 × 14 mm</figcaption></figure>
</div>
<h3 class="sub-h">The documentation set</h3>
<ul class="docs-set">
<li><strong>User manual.</strong> 12-page trilingual A6 guide: every instruction in English, Sinhala and Tamil.${docLink("user-manual", "Download PDF")}</li>
<li><strong>Design and manufacturing manual.</strong> 8-page A6 manual: block schematic, connections, PCB drawings, BOM, assembly and test.${docLink("manufacturing-manual", "Download PDF")}</li>
${have.has("project-overview") ? `<li><strong>Project overview.</strong>${docLink("project-overview", "Download PDF")}</li>` : ""}
</ul>
<p class="note"><a href="${href("setup/")}">Quick start and downloads on the Docs and setup page</a></p>
</div>
</section>`;
}
