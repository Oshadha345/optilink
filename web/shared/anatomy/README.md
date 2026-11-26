# web/shared/anatomy: product anatomy (part 2c)

Owner: part 2c. Four partials that label the real OptiLink unit: photos and CAD renders exactly as
provided (only scaled, framed and feathered into the ink), with real-text labels, hairline leaders
and hotspots. Static: no scroll-driven motion (part 3 owns that, through the hooks below).

## Files
| File | What it is |
|---|---|
| `anatomy.css` | All styles. Reads tokens from tokens.css (with the same values as fallbacks). |
| `anatomy.js` | Active-part behaviour (hover, keyboard focus, tap) and the PCB card's hide-if-missing. No dependencies. |
| `partials/anatomy-front.html` | Design S2. Labelled front view (photo P11_keypad), 7 parts. |
| `partials/anatomy-exploded.html` | Design S3. Exploded stack of the three CAD layers, 3 parts, plus the PCB card. |
| `partials/anatomy-side-back.html` | Design S4 (or S2). Four detail figures: side (photo plus CAD dimension strip), back, battery bay, top end. |
| `partials/anatomy-teaser.html` | Overview. Hero CAD render with 4 labels and a link to `design/`. |
| `preview/index.html` | Review page only, not linked from the site. Uses copies in `preview/img/`. |

## How a page includes a partial
The site is static (GitHub Pages), so there is no include step at build time.
1. In the page `<head>`, after tokens.css, base.css and components.css:
   `<link rel="stylesheet" href="shared/anatomy/anatomy.css">`
2. After site.js: `<script src="shared/anatomy/anatomy.js" defer></script>`
3. Open the partial file and paste everything between its `BEGIN anatomy:` and `END anatomy:` comments
   (keep the comments) inside the page's own section, under the page's own heading from 1A_PAGES:
   ```html
   <section class="section"><div class="container">
     <header class="section-head"><h2>What is on the front.</h2><p class="lead">...</p></header>
     <!-- BEGIN anatomy:anatomy-front ... --> ... <!-- END anatomy:anatomy-front -->
   </div></section>
   ```
   Partials carry no headings, so pages own all copy above them.
4. Paths are root-relative without a leading slash (`assets/img/...`, `design/`), so they work with the
   page's `<base href>` locally and under `/optilink/`. Each partial is used once per page (it carries ids).
5. To update a partial, replace everything between its comments with the new file contents.

Everything reads without JavaScript: all labels are real text in an ordered list. anatomy.js only adds
the emphasis. Pages that inject partials later can call `window.OptiLinkAnatomy.init(root)`.

## Layout and behaviour
- Each figure picks its layout from its own width (container query), not the viewport:
  compact (numbered markers on the image, numbered list under it) and wide (labels in aligned columns
  with 1 px leaders ending in 6 px ring markers). Large figures switch at 900 px of figure width, the
  half-width detail figures (back, battery bay) at 520 px, the side dimension labels at 1100 px.
- Hover (mouse), keyboard focus (Tab) or tap lights one part, steps the others down and writes the
  part's facts into the card's readout. A second tap, a tap outside or Escape releases it.
- Signal red is used only for the switch opening and low-battery light markers.
- Reduced motion: every transition is off.
- Each figure fires `anx:change` with `detail.part` when the lit part changes.
  `window.OptiLinkAnatomy.select(figureElement, "switch")` lights a part from script (null clears).

## Hooks for part 3 (motion)
All figures stay static here. Every hook below is already in the markup.

### Exploded stack: `[data-motion="explode"]` (#anx-exploded)
- Three `<img class="anx-layer">` stacked at identical size, bottom to top: cover, body, front
  (`data-stack` 0, 1, 2). Shown in the exploded state, from the `*_exploded` layers.
- On each layer image, and on that part's marker (`.anx-hot`), leader (`.anx-leader`) and label (`.anx-label`):
  - `data-layer`: `front`, `body` or `cover` (the PCB card carries `data-layer="pcb"`).
  - `data-depth`: position in the physical stack from the top: front 0, PCB 1, body 2, cover 3.
  - `data-move-x`, `data-move-y`: the exploded-to-assembled move from layers.json, in % of the canvas
    (front -0.19, 16.91; body 0, 0; cover 0.76, -18.45).
- Each layer image also carries `data-assembled-src` (PNG) and `data-assembled-srcset-avif` /
  `data-assembled-srcset-webp` for the `*_assembled` frames.
- The simplest way to move it: set `--anx-assemble` on `#anx-exploded`, from 0 (exploded) to 1
  (assembled). The CSS already turns the move values into transforms for the layer images, markers,
  leaders and labels, so they travel together and stay registered at every width.
  Checked at 0, 0.5 and 1.
- At the end of the motion, cross-fade each layer to its assembled image (the front's exploded image is
  very slightly larger, see the layers README).
- At 1 the labels bunch together and the cover sits behind the body, so fade the labels and markers out
  while assembling (for example by `data-depth`), and back in when exploding.

### Hotspot figures: `[data-motion="hotspots"]`
Front, side, back, battery bay, top end and teaser. Markers, leaders and labels carry `data-step`
(1, 2, 3 ... in reading order) for a staggered reveal. If part 3 hides them before revealing, it must
show them again for reduced motion and without JS.

## Images expected from part 2a
Names follow the contract: `assets/img/<source-base-name>-<width>.avif|webp|png`, no upscaling; the
partials use the largest PNG as the fallback.

| Base name | Widths |
|---|---|
| `P04_back` | 480, 960 |
| `P05_battery_open` | 480, 960, 1440 |
| `P06_ir_end` | 480, 960, 1440 |
| `P07_side` | 480, 960 |
| `P11_keypad` | 480, 960, 1440, 1920 |
| `optilink_hero_three_quarter` | 480, 960, 1440, 1920 |
| `optilink_layer_body_assembled` | 480, 960, 1440, 1920 |
| `optilink_layer_body_exploded` | 480, 960, 1440, 1920 |
| `optilink_layer_cover_assembled` | 480, 960, 1440, 1920 |
| `optilink_layer_cover_exploded` | 480, 960, 1440, 1920 |
| `optilink_layer_front_assembled` | 480, 960, 1440, 1920 |
| `optilink_layer_front_exploded` | 480, 960, 1440, 1920 |
| `optilink_side_orthographic` | 480 |

Plus the vector copy: `assets/img/vector/optilink_pcb_rev17_component_side.svg` (hidden automatically if missing).
The six layer files come from `optilink_exploded_layers.zip` (cover, body, front; exploded and assembled).
Note: photos are 1122 px or 1536 px wide, so P04 and P07 stop at 960 px; the P07 side crop then shows
slightly upscaled on large screens. A native-width derivative would fix that (request below).

## Sources and facts
- Every number comes from FACTS.md and the confirmed decisions: switch opening 15.4 x 20.4 mm
  (OptiLink Lift v5 CAD: 15 x 20 mm switch body plus 0.2 mm each side), seam 27.0 mm from the back
  face (CAD model and dimension drawing).
- Alt text comes from 1A_MEDIA_MAP.md. The exploded stack is one `role="img"` with the media-map alt;
  its layer images have empty alt.
- Photo crops are display crops only (CSS); no image file was edited. P03_front is not used
  (garbled screen). P06 and P07 are cropped to exclude their keypad and screen legends, as the media
  map requires. P05's battery label is shown small; charge times are not quoted.
- Not used: the PCB in the 3D stack (it is not in the model; it has its own card), any range,
  battery hours, keypad control mapping or the 80.8 mm recess.

## Checks run before delivery
Served under `/optilink/` with the shipped files: no 404s, no console errors, no sideways scroll, and
an automated layout check (no overlapping labels, markers or corners; every leader starts at its marker
and ends at its label; no leader crosses another label or marker) at 375, 768, 1280 and 1920 px and
every 40 px from 360 to 2560 px. Interaction tested with mouse, keyboard, touch, reduced motion and
JavaScript off. Contrast: labels 17:1, spec text 6.1:1 on ink (5.1:1 on photo backgrounds); while
another part is lit, dimmed spec text is 2.9:1 by design.

## Requests (to copy into notes/BUILD_LOG.md)
- REQ 2c -> 2a: assets/img/: derivatives for the 13 base names above (AVIF, WebP, PNG at the listed widths).
- REQ 2c -> 2a: assets/img/: optionally a native-width derivative of P07_side (1122) for sharper large screens.
- REQ 2c -> 4a: web/design/index.html: paste anatomy-front (S2), anatomy-exploded (S3), anatomy-side-back (S4); load anatomy.css and anatomy.js.
- REQ 2c -> 4a: web/index.html: paste anatomy-teaser where the Overview wants the anatomy moment; load anatomy.css and anatomy.js.
- REQ 2c -> 3: shared/motion/: drive the exploded view through `--anx-assemble` and the data hooks above.
- Note for 1B: tokens.css was not available to part 2c. anatomy.css uses the token names in
  shared/README.md (`--ink`, `--graphite`, `--link-blue`, `--accent`, `--slate`, `--signal-red`, `--text`,
  `--text-muted`, `--line`, `--font-*`, `--dur-*`, `--ease-out`, `--r-*`). The brief's label colour #F2F4F7
  is only a fallback; the live colour is `--text` (#F2F1EC).
