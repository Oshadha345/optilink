import { SAFETY, TEAM, FAQ } from "../lib/content.mjs";
import { icons } from "../lib/icons.mjs";
import { config, data, esc, provided, publicFileExists, href } from "../lib/util.mjs";

export function safety() {
  const items = SAFETY.items.map(([k, v]) => `<li><h3>${esc(k)}</h3><p>${esc(v)}</p></li>`).join("");
  const lim = SAFETY.limitations.map((l) => `<li>${esc(l)}</li>`).join("");
  return `<section id="safety" class="section section--tint" aria-labelledby="safety-h">
<div class="container">
<div class="section-head"><p class="kicker">Safety, privacy and limitations</p><h2 id="safety-h">${esc(SAFETY.title)}</h2></div>
<ul class="safety-grid">${items}</ul>
<div class="warn-panel" role="note">
<h3>${icons.warn}<span>Honest limitations</span></h3>
<ul class="plain-list">${lim}</ul>
</div>
</div>
</section>`;
}

export function journey() {
  const tl = data.timeline.map((t, i) => `<li><span class="tl-n" aria-hidden="true">${i + 1}</span><span class="tl-text">${esc(t)}</span></li>`).join("");
  const road = data.roadmap.map((r) => `<li>${esc(r)}</li>`).join("");
  const stages = data.firmware_stages.map((s) => `<li><span class="fs-n mono">${esc(s.stage)}</span><span>${esc(s.added)}</span></li>`).join("");
  return `<section id="journey" class="section" aria-labelledby="journey-h">
<div class="container">
<div class="section-head"><p class="kicker">Journey and roadmap</p><h2 id="journey-h">From concept to a boxed prototype, and what comes next</h2></div>
<ol class="timeline">${tl}</ol>
<div class="two-col two-col--top journey-cols">
<div><h3 class="sub-h sub-h--sm">Firmware stages</h3><ol class="fs-list">${stages}</ol></div>
<div><h3 class="sub-h sub-h--sm">Roadmap</h3><ul class="road-list">${road}</ul></div>
</div>
</div>
</section>`;
}

export function team() {
  const people = data.team.map((t) => `<li><p class="tm-name">${esc(t.name)}</p><p class="tm-reg mono">${esc(t.reg)}</p></li>`).join("");
  const photo = publicFileExists("images/team.jpg")
    ? `<figure class="team-photo"><img src="${href("images/team.jpg")}" alt="The OptiLink team" loading="lazy" decoding="async" width="1200" height="800"></figure>`
    : "";
  return `<section id="team" class="section section--tint section--compact" aria-labelledby="team-h">
<div class="container">
<div class="section-head"><p class="kicker">Team</p><h2 id="team-h">${esc(TEAM.title)}</h2></div>
<div class="team-grid">
<div><ul class="team-list">${people}</ul><p class="team-course">${esc(TEAM.course)}</p></div>
${photo}
</div>
</div>
</section>`;
}

export function faq() {
  const items = FAQ({ range: provided(config.measuredRange), battery: provided(config.measuredBatteryLife) })
    .map(([q, a]) => `<details class="faq-item"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`)
    .join("");
  return `<section id="faq" class="section" aria-labelledby="faq-h">
<div class="container container--narrow">
<div class="section-head"><p class="kicker">FAQ</p><h2 id="faq-h">Questions people ask first</h2></div>
<div class="faq">${items}</div>
</div>
</section>`;
}

export function contact() {
  const email = provided(config.contactEmail);
  const body = email
    ? `<p class="contact-line">Email us at <a class="contact-mail" href="mailto:${esc(email)}">${esc(email)}</a></p>
<p><button type="button" class="btn btn-light btn-small copy-btn" data-copy="${esc(email)}">${icons.copy}<span>Copy address</span></button> <span class="copy-status" role="status" aria-live="polite"></span></p>
<form class="contact-form" id="contact-form" data-mailto="${esc(email)}">
<p class="form-intro">Or write a note here. This opens your email app with the message filled in; nothing is sent from this page.</p>
<label>Name<input type="text" name="name" autocomplete="name"></label>
<label>Organisation<input type="text" name="org" autocomplete="organization"></label>
<label>Message<textarea name="message" rows="5" required></textarea></label>
<button type="submit" class="btn btn-light">Compose email</button>
</form>`
    : `<p class="contact-line">Our contact email address will be added here soon.</p>`;
  return `<section id="contact" class="section band-slate" aria-labelledby="contact-h">
<div class="container container--narrow">
<div class="section-head"><p class="kicker kicker--dark">Contact</p><h2 id="contact-h">Questions, a pilot or a demo?</h2></div>
${body}
</div>
</section>`;
}
