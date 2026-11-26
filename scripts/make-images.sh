#!/usr/bin/env bash
# One-off asset preparation: turns the original renders (kept out of git in _refs/) into
# the optimised WebP files that the site ships in src/public/images/.
# Needs ImageMagick with WebP support. Re-run only when a source render changes.
set -euo pipefail
SRC="${1:-_refs/optilink-website-pack}"
OUT="src/public/images"
mkdir -p "$OUT"

# name  small-width  (large = original width, capped at 1600)
variants() {
  local name="$1" small="$2"
  local in="$SRC/images/$name.png"
  local w; w=$(identify -format '%w' "$in")
  [ "$w" -gt 1600 ] && w=1600
  magick "$in" -resize "${small}x" -quality 82 -define webp:method=6 "$OUT/$name-$small.webp"
  magick "$in" -resize "${w}x"     -quality 82 -define webp:method=6 "$OUT/$name-$w.webp"
  echo "$name: $small, $w"
}
variants hero-exploded 540
variants unit-front 520
variants unit-back 520
variants enclosure-dimensions 720
variants block-diagram 800
variants pcb-component-side 640
variants pcb-copper-side 640

# Packaging artwork: crop to the black lid shape (drop crop marks and print notes),
# then make the white outside corners transparent so it sits on the black band.
magick "$SRC/images/packaging-lid-wrap.png" -crop 3305x3169+141+141 +repage \
  -fuzz 22% -fill none \
  -draw "color 0,0 floodfill" -draw "color 3304,0 floodfill" \
  -draw "color 0,3168 floodfill" -draw "color 3304,3168 floodfill" \
  -define webp:method=6 -define webp:alpha-quality=100 \
  \( +clone -resize 820x \) -delete 0 -quality 84 "$OUT/packaging-lid-wrap-820.webp"
magick "$SRC/images/packaging-lid-wrap.png" -crop 3305x3169+141+141 +repage \
  -fuzz 22% -fill none \
  -draw "color 0,0 floodfill" -draw "color 3304,0 floodfill" \
  -draw "color 0,3168 floodfill" -draw "color 3304,3168 floodfill" \
  -resize 1600x -quality 84 -define webp:method=6 -define webp:alpha-quality=100 "$OUT/packaging-lid-wrap-1600.webp"

# Logo, labels, favicon
sed 's/ width="40mm" height="40mm"//' "$SRC/logo/OptiLink_mark.svg" > src/public/favicon.svg
cp "$SRC/labels/OptiLink_label_DOCTOR.svg" "$OUT/label-doctor.svg"
cp "$SRC/labels/OptiLink_label_PATIENT.svg" "$OUT/label-patient.svg"
magick "$SRC/logo/OptiLink_mark.png" -resize 156x156 -background '#3F4E61' -gravity center -extent 180x180 -flatten src/public/apple-touch-icon.png
