# web/shared: OptiLink design system

Owner: 1B. Used by every page and by the Phase 2 presentation.

## Files
- `tokens.css`: colours, type, spacing, radii, shadows, motion, breakpoints. Change values here only.
- `base.css`: reset, type styles, focus ring, containers, section padding.
- `components.css`: every component below.
- `site.js`: mobile menu, Escape to close, reveal hook. No dependencies.
- `shell.html`: the page template. Copy it for each page.

## Tokens (from sources/optilink_web_assets/BRAND.md)
| Token | Value | Use |
|---|---|---|
| `--ink` | #0B0D10 | page background (`--bg`) |
| `--graphite` | #14171C | raised surfaces (`--surface`) |
| `--product-face` | #E8E1CC | primary button, product ivory |
| `--product-body` | #7B96B6 | product blue-grey |
| `--link-blue` | #A9BBD0 | focus ring, hover |
| `--accent` | #7C92AB | callout rule |
| `--signal-red` | #D63B31 | IR dot, proposal callout only. Use sparingly. |
| `--off-white` / `--mist` | #F8F7F3 / #E7EBF1 | light sections |
| `--text` / `--text-muted` | #F2F1EC / #A3ADBB | text on dark |

Fonts are self-hosted: the `@font-face` rules at the top of `base.css` load `assets/fonts/*.woff2` (no Google Fonts link, works offline). TODO: if 2a logs `assets/fonts/fonts.css`, either link it in the shell and delete the rules in base.css, or keep base.css; never both.

Type: `--font-display` Space Grotesk (500) for headlines; `--font-body` Poppins (300 body, 400 to 500 UI); `--font-mono` JetBrains Mono for specs and figure captions; Noto Sans Sinhala and Tamil via `lang="si"` and `lang="ta"`.

Scale: `--fs-xs` 13 px, `--fs-sm` 15 px, `--fs-base` 17 px, `--fs-md` 20 px, `--fs-lg` fluid 22 to 28 px, `--fs-xl` fluid 32 to 52 px, `--fs-hero` fluid 44 to 104 px.

Spacing: `--s-1` (4 px) to `--s-10` (128 px), 8 px base. Radii: `--r-sm` 6, `--r-md` 14, `--r-lg` 24, `--r-pill`. Motion: `--dur-fast` 160 ms, `--dur-base` 320 ms, `--dur-slow` 640 ms; `--ease-out`. All durations drop to 0 under reduced motion.

Breakpoints: 640 px (`--bp-sm`), 960 px (`--bp-md`, nav switches to the bar), 1280 px (`--bp-lg`), 1920 px (`--bp-xl`).

## Layout
- `.container`: max 1200 px, 16 px gutter on phones, wider from 640 px.
- `.section`: vertical padding. `.section--tight`: smaller.
- `.theme-light` on any wrapper: switches to light colours.

## Components (HTML)
- **Nav:** `header.site-header > nav.container.site-nav`. Brand, `ul.nav-links` (from 960 px), `a.nav-cta` (small 34 px pill), `button.nav-toggle`. Mobile panel: `div.nav-panel#nav-panel`. The "More" menu is a `details.nav-more`. Mark the current page with `aria-current="page"` on its link.
- **Footer:** `footer.site-footer` (13 px) with `.footer-grid` (three navs; two columns on phones, three 13 rem columns from 640 px), `.footer-note` with `ul.footer-team` (one `li` per person: name, ID, email), the course line and the disclaimer. The disclaimer is verbatim and always present.
- **Hero:** `section.hero > .container.hero-grid > div (h1, p.hero-sub, .btn-row) + figure.hero-media > picture > img` (AVIF and WebP sources, `sizes="100vw"`). Phones: 10:9 crop of the photo's right side, bleeding to the screen edges. 768 to 1199 px: 16:10. From 1200 px: the photo is the hero backdrop, capped at its native 1672 x 941 px so it is never zoomed; the text column is 40 rem. The headline has `max-width: 12ch`; keep the last two words together with `&nbsp;` so it sets as two lines at every width. Add `<div class="isolation-line" aria-hidden="true"><span class="ir-dot"></span></div>` at the end of the section for the signature line.
- **Section head:** `header.section-head > h2 + p.lead`.
- **Barriers (typographic, ruled):** `ul.barriers > li > h3 + p`. Phones: one hairline above each item. 640 to 959 px: two columns. From 960 px: four columns under one shared hairline. No icons, ticks or numbers (not a sequence).
- **Buttons:** `a.btn` (outline), `a.btn.btn--primary` (ivory), `.btn--block` for full width on phones. Group with `.btn-row`.
- **Text link:** `a.text-link`: link-blue, 17 px, underline on hover only. No arrow.
- **Media frame and figure:** `figure.media-frame > img` or `figure.figure > img + figcaption`. Captions use the mono style.
- **Spec table:** `div.table-wrap > table.spec` with `th` (label) and `td` (value).
- **Comparison table:** `div.table-wrap > table.compare` with a header row.
- **FAQ item:** `details.faq-item > summary + div.faq-answer`. Native, works without JS.
- **Stat:** `div.stat > p.stat-value + p.stat-label`.
- **Callout:** `div.callout` (neutral) or `div.callout.callout--proposal` (for proposal figures, with the signal-red rule). Label proposals as proposals in the text.
- **Title block (Nerfies style, centred):** `header.title-block > h1 + ul.authors (li > a) + p.affiliation + .btn-row`.
- **Team member:** `article.member > div.avatar (monogram text or img) + h3 + p (ID) + a (email)`. Photo file: `assets/img/team/<MONOGRAM>.jpg`; when added, put the `img` inside `.avatar`.
- **Video slot:** `section.video-slot[hidden]`. Remove the `hidden` attribute only when a real video exists.
- **Reveal:** add `.reveal` to any element the motion module should animate. Without the motion module, `.reveal` stays hidden only when JS adds `.reveal-ready`; the motion module (part 3) owns that behaviour.

## Rules for using these
- One idea per section. Headlines 2 to 6 words. British English. No exclamation marks, no "first" or "only".
- No all-caps labels, no numbered markers unless the content is a real sequence, no decorative arrows in links.
- Keep the disclaimer in every footer.
- Do not add new colours. Use tokens.
