import { TECH } from "../lib/content.mjs";
import { data, esc, img, num } from "../lib/util.mjs";

// Illustrative waveform: data line, 38 kHz carrier, and the LED output. Not to scale.
function waveform() {
  const bits = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1];
  const bw = 60; // px per bit
  const W = bits.length * bw;
  const H = 40;
  const hi = 6;
  const lo = 34;
  // data line
  let d = `M0 ${bits[0] ? hi : lo}`;
  bits.forEach((b, i) => {
    const y = b ? hi : lo;
    if (i > 0) d += ` V${y}`;
    d += ` H${(i + 1) * bw}`;
  });
  // carrier: 6 cycles per bit
  const cyc = 6;
  const cw = bw / cyc;
  let c;
  c = `M0 ${lo}` + Array.from({ length: bits.length * cyc }, (_, k) => ` V${hi} H${k * cw + cw / 2} V${lo} H${(k + 1) * cw}`).join("");
  // LED: carrier only while data is low
  let l = "";
  bits.forEach((b, i) => {
    if (b) {
      l += `M${i * bw} ${lo} H${(i + 1) * bw} `;
    } else {
      l += `M${i * bw} ${lo}` + Array.from({ length: cyc }, (_, k) => ` V${hi} H${i * bw + k * cw + cw / 2} V${lo} H${i * bw + (k + 1) * cw}`).join("") + " ";
    }
  });
  const track = (label, path, cls) => `<div class="wf-row"><p class="wf-label">${label}</p><svg class="wf-svg ${cls}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(label)} waveform"><path d="${path}" fill="none" vector-effect="non-scaling-stroke"/></svg></div>`;
  return `<figure class="wf">
${track("Serial data line", d, "wf-data")}
${track("38 kHz carrier", c, "wf-carrier")}
${track("LED output", l, "wf-led")}
<figcaption>Illustration, not to scale. The LED flashes at 38 kHz only while a data bit is low, and stays dark otherwise.</figcaption>
</figure>`;
}

function frameDiagram() {
  const fields = [
    ["preamble", "sync", 3],
    ["start", "1 byte", 4],
    ["destination, source, type", "11 bits together", 11],
    ["seq", "1 bit", 2],
    ["phrase ID", "12 bits", 12],
    ["CRC-8", "8 bits", 8],
  ];
  const cells = fields
    .map(([n, s, g], i) => `<li class="fr-cell fr-${i}" style="flex-grow:${g}"><span class="fr-name">${esc(n)}</span><span class="fr-size">${esc(s)}</span></li>`)
    .join("");
  return `<div class="frame">
<ol class="fr-strip" aria-label="Frame fields in order">${cells}</ol>
<p class="fr-bracket" aria-hidden="true"><span>32 bits after the start byte</span></p>
<p class="note">${esc(TECH.frameNote)}</p>
</div>`;
}

function dataTable(rows, heads, cls = "") {
  return `<div class="table-scroll"><table class="data-table ${cls}"><thead><tr>${heads.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

export function technology() {
  const hw = data.hardware
    .map((h) => `<tr><th scope="row" data-label="Block">${esc(h.block)}</th><td data-label="Parts" class="mono">${esc(h.parts)}</td><td data-label="Role">${esc(h.role)}</td></tr>`)
    .join("");
  const L = data.link;
  const linkRows = [
    ["Light", L.light],
    ["Rate", L.rate],
    ["Direction", L.direction],
    ["Addresses", L.addresses],
  ]
    .map(([k, v]) => `<tr><th scope="row" data-label="Property">${k}</th><td data-label="Value">${esc(v)}</td></tr>`)
    .join("");
  const types = L.frame_types.map((t) => `<li>${esc(t)}</li>`).join("");
  const rel = L.reliability.map((t) => `<li>${esc(t)}</li>`).join("");
  const bat = data.battery.map((b) => `<tr><th scope="row" data-label="Battery voltage" class="mono">${esc(b.range)}</th><td data-label="State">${esc(b.state)}</td></tr>`).join("");
  const pcbFacts = TECH.pcbFacts.map((f) => `<li>${esc(f)}</li>`).join("");
  const revs = data.pcb_revisions.map((r) => `<li><span class="rev-n mono">Rev ${esc(r.rev)}</span><span>${esc(r.text)}</span></li>`).join("");
  const pipe = TECH.pipeline.map((p) => `<li>${esc(p)}</li>`).join("");
  const mem = data.memory
    .map((m) => {
      const p = m.used / m.total;
      const hot = p > 0.99;
      return `<li class="mem${hot ? " mem--hot" : ""}"><div class="mem-head"><span class="mem-name">${esc(m.name)}</span><span class="mem-pct">${m.approx ? "about " : ""}${(p * 100).toFixed(1)}% full</span></div><div class="mem-bar" role="img" aria-label="${esc(m.name)}: ${m.approx ? "about " : ""}${(p * 100).toFixed(1)} percent full"><span style="width:${(p * 100).toFixed(1)}%"></span></div><p class="mem-fig mono">${num(m.used)} of ${num(m.total)} bytes</p></li>`;
    })
    .join("");
  const stages = data.firmware_stages.map((s) => `<tr><th scope="row" data-label="Stage" class="mono">${esc(s.stage)}</th><td data-label="Added">${esc(s.added)}</td></tr>`).join("");
  return `<section id="technology" class="section section--panel" aria-labelledby="tech-h">
<div class="container">
<div class="section-head"><p class="kicker">Technology</p><h2 id="tech-h">${esc(TECH.title)}</h2></div>
<p class="lede">${esc(TECH.intro)}</p>

<h3 class="sub-h">Hardware</h3>
<figure class="tech-fig">${img({ name: "block-diagram", small: 800, large: 1590, w: 1590, h: 1080, alt: "Block diagram of one OptiLink unit: the ATmega328P controller connected to the keypad, OLED display, phrase memory, buzzer, infrared transmitter and receiver, with power from a 9 V battery through a buck converter.", sizes: "(min-width: 1200px) 1100px, 94vw" })}<figcaption>Block diagram of one unit.</figcaption></figure>
${dataTable(hw, ["Block", "Parts", "Role"], "stack-table hw-table")}

<h3 class="sub-h">The infrared link</h3>
<div class="two-col">
<div><h4>How the transmitter works</h4><p>${esc(TECH.irTx)}</p></div>
${waveform()}
</div>
<h4 class="mt">The frame</h4>
${frameDiagram()}
<div class="two-col two-col--top">
<div><h4>Link layer</h4>${dataTable(linkRows, ["Property", "Value"], "stack-table")}
<h4 class="mt">Frame types</h4><ul class="plain-list">${types}</ul></div>
<div><h4>Reliability</h4><ol class="steps-list">${rel}</ol>
<h4 class="mt">Battery monitor</h4>${dataTable(bat, ["Battery voltage", "State"], "stack-table")}
<p class="note">0.2 V hysteresis; the screen sleeps after inactivity.</p></div>
</div>

<h3 class="sub-h">PCB, Rev 1.7</h3>
<div class="pcb-grid">
<figure class="tech-fig">${img({ name: "pcb-component-side", small: 640, large: 1340, w: 1340, h: 920, alt: "PCB Rev 1.7, component side: the socketed ATmega328P, display and keypad headers, buck converter and infrared parts laid out on a single-sided board.", sizes: "(min-width: 900px) 540px, 94vw" })}<figcaption>Component side</figcaption></figure>
<figure class="tech-fig">${img({ name: "pcb-copper-side", small: 640, large: 1380, w: 1380, h: 1040, alt: "PCB Rev 1.7, copper side: the single layer of tracks with 0.5 mm minimum track and gap.", sizes: "(min-width: 900px) 540px, 94vw" })}<figcaption>Copper side</figcaption></figure>
</div>
<div class="two-col two-col--top">
<div><h4>Specifications</h4><ul class="plain-list">${pcbFacts}</ul></div>
<div><h4>Board history</h4><ol class="revs">${revs}</ol></div>
</div>

<h3 class="sub-h">Firmware and content</h3>
<p class="lede lede--tight">C++ on the Arduino platform. Every phrase goes through the same five steps before it reaches a screen.</p>
<ol class="pipeline">${pipe}</ol>
<div class="two-col two-col--top">
<div><h4>Memory use</h4><ul class="mem-list">${mem}</ul></div>
<div><h4>Firmware stages</h4>${dataTable(stages, ["Stage", "Added"], "stack-table")}</div>
</div>
<h4 class="mt">Service menu</h4>
<p>${esc(TECH.service)}</p>
</div>
</section>`;
}
