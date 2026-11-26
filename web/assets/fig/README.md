# OptiLink figures (Phase 2b)

Self-contained SVGs for the near-black site (#0B0D10) and raised panels (#14171C). Transparent background, each file embeds a WOFF2 subset of only the glyphs it uses (Space Grotesk, JetBrains Mono, Poppins, Noto Sans Sinhala, Noto Sans Tamil, with their layout features, so Sinhala and Tamil shape correctly in an `<img>`). Every file has `<title>` and `<desc>`. File names follow `notes/INTEGRATION.md` (`F01.svg` ...). Sinhala and Tamil strings were extracted from deck slide 18 by script, never retyped. Sources for the generators are in `_build/` (not part of the site; safe to exclude from deploy).

Use `<picture>` where a mobile file exists:

```html
<picture>
  <source media="(max-width: 600px)" srcset="assets/fig/F01-mobile.svg">
  <img src="assets/fig/F01.svg" width="1600" height="830" alt="...">
</picture>
```

Sizes are viewBox units; keep `width` and `height` attributes equal to the viewBox so the layout does not shift. Mobile heights are in the table. All files are under 40 KB except the two unchanged PCB vectors.

| File | viewBox (desktop) | Mobile file and viewBox | Placement |
|---|---|---|---|
| F01.svg | 1600 x 830 | F01-mobile.svg 800 x 1430 | Technology S2 "Only a number travels"; Overview OV-5 under the language strip |
| F02.svg | 1800 x 700 | F02-mobile.svg 800 x 1352 | Technology S3 "One small, checked frame" |
| F03.svg | 1400 x 1627 | F03-mobile.svg 800 x 2334 | Technology S4; reused in S5 "Urgent request" (row 5 is the red one) |
| F04.svg | 1600 x 750 | F04-mobile.svg 800 x 1686 | Technology S6 "Written once. Drawn as images." |
| F05.svg | 1600 x 590 | F05-mobile.svg 700 x 670 | Technology S11 "Everything inside 32 KB" |
| F06.svg | 1360 x 1000 | none (pan or scale; parts table in HTML) | Technology S8 hardware |
| F07.svg | 800 x 1060 | none (portrait already) | Technology S9 battery |
| F08.svg | 1600 x 800 | none | Technology S8, below the block diagram |
| F09.svg | 1000 x 1000 | none (square) | Technology S7 several beds |
| F10a.svg, F10b.svg | as supplied | none | Technology S10 PCB (flip toggle), unchanged copies of the asset-pack vectors |
| F11.svg | 1280 x 720 | F11-mobile.svg 700 x 956 | Why OptiLink, Isolation harm |
| F12.svg | 1000 x 760 | F12-mobile.svg 700 x 760 | Why OptiLink, Where the gap sits |
| F14.svg | 1800 x 600 | F14-mobile.svg 760 x 926 | Hospitals H2 "Rs 7,876 to build" |
| F15.svg | 1600 x 840 | F15-mobile.svg 700 x 1040 | Hospitals H3 "About Rs 9,500 per bed" |
| F19.svg | 1400 x 940 | F19-mobile.svg 780 x 1640 | Design S4 "Opens without tools"; Specs |

Not built here: F13 (HTML table, 4a builds it), F16 (HTML table), F17/F18 (anatomy track), F20 (plain media), F21 guided assessment flow and F22 development timeline (optional, low priority, skipped).

## Per figure

### F01 Phrase-code flow
- Caption: "Only the phrase number travels. Each unit shows the phrase in its own language."
- Alt: "A Doctor Station set to English shows 'Do you have pain?' and sends only a 12-bit phrase ID over infrared at 38 kHz. A Bed Unit set to Tamil shows the same phrase in Tamil; the same unit set to Sinhala would show it in Sinhala. The patient presses 1 for YES, the answer returns as another code, and the Doctor Station shows the answer and Delivered."
- Motion steps (`data-motion-step`, group ids): 1 `step-1-doctor-english` (`step-1b-doctor-sinhala` has no step, static), 2 `step-2-phrase-id`, 3 `step-3-infrared-beam` (red dot is the one to animate), 4 `step-4-bed-tamil`, 5 `step-5-patient-presses-1`, 6 `step-6-answer-code`, 7 `step-7-doctor-sees-answer`.

### F02 Frame structure
- Caption: "A message is one small checked frame: 32 bits of payload on a 2400-baud, Manchester-coded 940 nm link. Block widths are indicative, not to scale."
- Alt: "Frame fields left to right: preamble (sync), start (1 byte), destination, source and type (11 bits together), sequence (1 bit), phrase ID (12 bits), CRC-8 (8 bits). The last four fields are 32 bits of payload. 940 nm LED, 38 kHz carrier, VS1838B, 2400 baud, Manchester coded; Doctor Station 0, Bed Units 1 to 14. Seven frame types."
- Motion steps: `field-1` to `field-6` = steps 1 to 6 (slide in left to right; mobile: top to bottom).

### F03 Link reliability
- Caption: "A blocked beam delays a message instead of losing it. The retry, resend and beacon times are design constants, not measurements."
- Alt: "Sequence diagram between the Doctor Station and a Bed Unit. Every frame is acknowledged and the sender shows Delivered. A lost frame is retried after a random back-off, up to 3 retries. A copy within 8 s of the previous one is ignored. Bed Units listen before talking and resend an unconfirmed request every 3 s; Can't breathe, in red, is resent every 1.5 s and the Doctor Station alarm repeats until acknowledged. Every 15 s the Doctor Station checks the selected bed: Link *** on the doctor, Link OK on the bed."
- Motion steps: 1 `step-1-acknowledge`, 2 `step-2-retry`, 3 `step-3-ignore-repeats`, 4 `step-4-listen-first`, 5 `step-5-cant-breathe` (the red row, highlight it in S5), 6 `step-6-beacon`. No success rate or distance appears.

### F04 Content pipeline
- Caption: "Every phrase is written once, rendered with proper text shaping, and stored as small images in the EEPROM."
- Alt: "Five steps: a phrase table with English, Sinhala, Tamil, ID and answer type; a Python tool that renders Sinhala and Tamil with Pillow and libraqm using Noto fonts; run-length compressed 1-bit images; loading images and an index into each unit's EEPROM, content version 3; the firmware drawing English from its own font and Sinhala or Tamil from images. The AT24C256 EEPROM (32 KB) holds 29,219 of 32,768 bytes, 89.2%."
- Motion steps: 1 `step-1-phrase-table`, 2 `step-2-proper-shaping`, 3 `step-3-onebit-images`, 4 `step-4-into-the-eeprom`, 5 `step-5-drawn-on-screen`, plus `eeprom` (step 4 group) for the chip bar.

### F05 Memory used (firmware 4.6)
- Caption: "Memory used, firmware 4.6. The Doctor Station program is almost full."
- Alt: "Bars: Doctor Station program 32,128 of 32,256 bytes (99.6%), in red; Bed Unit program about 24,460 bytes (75.8%); phrase images in EEPROM 29,219 of 32,768 bytes (89.2%). The Doctor Station is almost full, so the roadmap moves to a larger processor before adding features."

### F06 Hardware block diagram (card)
- File `F06.svg` is a light card (#F8F7F3) that wraps the asset-pack `optilink_block_diagram.svg` unchanged (copied byte for byte as `F06-original.svg`; its markup is nested as-is, with an embedded Poppins subset so the original's `font-family:Poppins` now renders instead of falling back to Times). Not redrawn, as instructed; 1A_FIGURES asked for a redraw, so 4a should know the diagram is light on dark. The original's own small overlaps (for example the "TXD + 38 kHz" label touching the MCU box) remain.
- Caption: "Hardware block diagram: standard parts around one ATmega328P."
- Alt: "Block diagram. 9 V PP3 NiMH, then a switch and 1N5819 diode, then an MP1584 buck converter to 5.0 V and a battery sense divider into PC0. The ATmega328P at 16 MHz drives an IR transmitter (74HC04 and 74HC08, Q1) feeding a 940 nm IR LED, receives from a VS1838B IR receiver on RXD, talks I2C to a 1.3 inch SH1106 OLED (0x3C) and an AT24C256 EEPROM (0x50), reads a 4 by 4 keypad, and drives a buzzer and a low-battery LED."

### F07 Battery thresholds
- Caption: "Battery monitor (100k / 47k divider). Zone heights are not to scale; no battery life is implied."
- Alt: "Three states: above 7.0 V is Normal; 6.4 to 7.0 V is LOW, the red light blinks, one beep, warning; below 6.4 V is CRITICAL, light on, three beeps, and a Bed Unit also alerts the Doctor Station. A 0.2 V hysteresis stops flickering between levels and the screen sleeps after inactivity."

### F08 Transmitter waveform
- Caption: "Like a TV remote: the LED flashes at 38 kHz only while a data bit is low. Schematic, not a measurement."
- Alt: "Three aligned waveforms: a continuous 38 kHz carrier, the inverted TX line with three high pulses (short, long, short), and the IR LED output, which carries 38 kHz bursts only during those pulses."

### F09 Several beds
- Caption: "One Doctor Station (address 0) and up to fourteen Bed Units. It talks to one selected bed at a time and receives from every bed."
- Alt: "A Doctor Station at the centre with fourteen numbered Bed Units, 1 to 14, around it. One bed is selected with an infrared signal dot on its line; the others are shown with faint lines."
- Groups `bed-1` to `bed-14` for a sweep animation (no step numbers set).

### F10a / F10b PCB Rev 1.7
- Unchanged copies of `optilink_pcb_rev17_component_side.svg` and `..._copper_side.svg` (590 KB and 802 KB, the only files over 150 KB; unchanged as instructed). No title or desc added (file untouched): give the img a full alt.

### F11 Isolation harm
- Caption: "Events per 1,000 patient-days. Isolated patients were also 8 times more likely to make a formal complaint (8% vs 1%). Source: Stelfox et al., JAMA 2003."
- Alt: "Bar chart: adverse events 15 not isolated against 31 isolated; preventable events 3 not isolated against 20 isolated, per 1,000 patient-days (Stelfox et al., JAMA 2003)."

### F12 Positioning map
- Caption: "Positions are our judgement, not measurements. We never claim to be the first or the only."
- Alt: "Two by two map. Vertical axis: two-way, checked, in each person's language. Horizontal axis: needs network, devices, installation or cost per bed. OptiLink is alone in the shaded top-left gap. Tablet with Translate or video and AAC apps and devices are top right; communication board, talking through glass and wireless call button are bottom left; walkie-talkie or intercom sits on the vertical divider; hospital nurse-call is bottom right."
- Deviation: the OptiLink dot is ivory with a link-blue ring, not red-outlined as in the deck (the brief reserves red for the infrared dot and alarms). Coordinates were read off slide 12 by eye as fractions of its plot box.

### F14 Cost per unit
- Caption: "Build cost of one unit, Rs 7,876. Sources: Tronic.lk, Alphatronic.lk, Daraz.lk, Ciphertecx (printing), JLCPCB (PCB)."
- Alt: "Stacked bar of Rs 7,876: electronics Rs 2,661, 3D-printed enclosure Rs 2,170 (PLA+ at Rs 14 per gram), PCB Rs 1,600, battery and consumables Rs 1,445. A pair with one charger (Rs 1,450) costs Rs 17,202; enclosure and PCB are Rs 3,770, 48% of the unit."

### F15 Cost per bed
- Caption: "Cost per bed, Rs, on a logarithmic axis (each gridline is ten times the one before). The OptiLink figure is a build cost, not a selling price. Not shown: Tobii Dynavox speech devices at Rs 1.3-3.3 million each. Nurse-call converted at USD 140-650 per bed and Rs 332.4 per dollar."
- Alt: "Range bars of cost per bed in Rs. OptiLink ward kit about 9,500 (build cost; 1 station, 10 beds and 6 chargers, about Rs 95,300). Wireless call button with no content 2,062 to 6,637. Tablet with an app 24,249 to 126,666. Hospital nurse-call system 46,500 to 216,000 plus installation. Proloquo2Go with an iPad about 210,000 and up."
- Axis: log scale (the deck's shared axis makes the OptiLink marker vanish); stated on the figure. OptiLink marker is an ivory diamond.

### F19 Outline dimensions
- Caption: "Outline dimensions in millimetres."
- Alt: "Front, side and back views of the enclosure. Front 95.0 wide by 162.0 tall with OLED window 35.6 by 20.6, a switch opening, the LOW BATTERY light and a keypad foil slot 24 by 5. Side 36.0 overall with a seam at 27.0 between body and front. Back with an 80 by 43.4 battery cover in an 80.8 recess."
- The switch opening is drawn dashed and labelled "switch opening" with no size, because the sources conflict on its height (flag in 1A_FIGURES F17/F19). The OptiLink wordmark from the old PNG is not redrawn. The outline is an approximation of the supplied PNG's shape, not a manufacturing drawing.

## Notes
- Red (#D63B31) appears only on infrared dots, the IR LED waveform, Can't breathe and alarm moments, the CRITICAL battery zone and the nearly-full Doctor Station memory bar. Red text uses a brighter tint (#F0635A) for AA contrast.
- Secondary text is #7C92AB (6.1:1 on #0B0D10, 5.6:1 on #14171C) or #A3ADBB.
- Figures are drawn for dark. The light variants in 1A_FIGURES (for the deck and PDF) are not made in this phase.
- Characters not in the brand fonts (the approximately-equal sign, in F15) are drawn as paths.
