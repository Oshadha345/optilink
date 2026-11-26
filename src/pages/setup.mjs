import { page } from "../lib/layout.mjs";
import { SETUP } from "../lib/content.mjs";
import { icons } from "../lib/icons.mjs";
import { availableDownloads, config, data, esc, href, keycaps, provided } from "../lib/util.mjs";

function videoBlock() {
  const url = provided(config.demoVideoUrl);
  if (!url) return "";
  const yt = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/.exec(url);
  const embed = yt
    ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="OptiLink demo video" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`
    : "";
  return `<section class="setup-block" aria-labelledby="video-h"><h2 id="video-h">Demo video</h2>${embed}<p><a class="btn btn-primary" href="${esc(url)}" rel="noopener">${icons.play}<span>Watch the demo video</span></a></p></section>`;
}

export function setup() {
  const steps = SETUP.steps.map((s) => `<li><p>${keycaps(s)}</p></li>`).join("");
  const trouble = SETUP.troubleshooting.map(([p, f]) => `<li><p class="tr-problem">${esc(p)}</p><p>${esc(f)}</p></li>`).join("");
  const battery = data.battery.map((b) => `<li><p class="bt-range mono">${esc(b.range)}</p><p>${esc(b.state)}</p></li>`).join("");
  const dl = availableDownloads();
  const downloads = dl.length
    ? `<section class="setup-block" aria-labelledby="dl-h"><h2 id="dl-h">Downloads</h2><ul class="dl-list">${dl
        .map((d) => `<li><a class="dl-btn" href="${href(`downloads/${d.file}`)}">${icons.download}<span><strong>${esc(d.title)}</strong><span class="dl-detail">${esc(d.detail)}</span><span class="dl-type">PDF</span></span></a></li>`)
        .join("")}</ul></section>`
    : "";
  const body = `<main id="main" class="setup">
<section class="page-hero band-slate" aria-labelledby="setup-title">
<div class="container">
<p class="kicker kicker--dark">Docs and setup</p>
<h1 id="setup-title">Get your OptiLink pair working</h1>
<p class="lead">Eight steps from the box to your first message. You scanned the code on the box; this page is the short guide.</p>
</div>
</section>
<div class="container setup-wrap">
<section class="setup-block" aria-labelledby="qs-h"><h2 id="qs-h">Quick start</h2>
<ol class="setup-steps">${steps}</ol></section>
<section class="setup-block" aria-labelledby="bat-h"><h2 id="bat-h">Battery light</h2>
<ul class="bat-list">${battery}</ul>
<p class="note">Charge the battery in the dual-slot charger.</p></section>
<section class="setup-block" aria-labelledby="tr-h"><h2 id="tr-h">Troubleshooting</h2>
<ul class="tr-list">${trouble}</ul></section>
${downloads}
${videoBlock()}
<p class="back-link"><a class="btn btn-primary" href="${href()}">${icons.arrowRight}<span>Back to the full OptiLink site</span></a></p>
</div>
</main>`;
  return page({ title: "Docs and setup | OptiLink", description: "Quick start, battery lights, troubleshooting and downloads for the OptiLink two-way infrared bedside communicator.", path: "setup/", body, current: "setup" });
}
