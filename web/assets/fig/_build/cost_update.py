import re, math, os
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
MONO = "OL JetBrains Mono,'JetBrains Mono',ui-monospace,Consolas,monospace"
SG = "OL Space Grotesk,'Space Grotesk',system-ui,sans-serif"
SGB = "OL Space Grotesk Bold,'Space Grotesk',system-ui,sans-serif"
POP = "OL Poppins,'Poppins',system-ui,sans-serif"
RED = "#D63B31"


def defs(name):
    # fonts are embedded in the existing file; reuse them (run once on originals, or on its own output)
    s = open(os.path.join(D, name), encoding='utf8').read()
    return re.search(r'<defs>.*?</defs>', s, re.S).group(0)


def T(x, y, fam, sz, fill, txt, anc='start'):
    txt = txt.replace('&', '&amp;')
    return f'<text x="{x:g}" y="{y:g}" font-family="{fam}" font-size="{sz}" fill="{fill}" text-anchor="{anc}">{txt}</text>'


def head(wd, h, title, desc, dfs):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {wd} {h}" width="{wd}" height="{h}" role="img" aria-labelledby="t d">\n'
            f'<title id="t">{title}</title>\n<desc id="d">{desc}</desc>\n{dfs}')


def save(name, parts):
    p = os.path.join(D, name)
    open(p, 'w', encoding='utf8').write('\n'.join(parts) + '\n')
    print(name, os.path.getsize(p))


ITEMS = [("ATmega328P-PU with Uno bootloader", 230, "#7B96B6"),
         ("1.3-inch SH1106 OLED display, 128 x 64", 950, "#7B96B6"),
         ("4 x 4 membrane keypad and 8-way extension", 210, "#7B96B6"),
         ("MP1584 buck converter, set to 5.0 V", 230, "#7B96B6"),
         ("AT24C256 phrase-memory EEPROM", 80, "#7B96B6"),
         ("IR parts, buzzer, power parts, passives, IC sockets", 431, "#7B96B6"),
         ("PCB Rev 1.7: faculty manufacturing lab, soldered by us", 0, "#3F4E61"),
         ("3D-printed PLA+ case (body, front, battery cover)", 2170, "#A9BBD0"),
         ("9 V NiMH rechargeable battery", 1180, "#566C86"),
         ("Foam tape, link wire, solder, ribbon", 195, "#3F4E61")]
CARDS = [("Rs 5,676", "per unit (about USD 17 at Rs 332)"),
         ("Rs 11,352", "a pair: Doctor Station + Bed Unit"),
         ("Rs 12,632", "a pair with charger (Rs 1,280), about USD 38")]
F14T = "Bill of materials: Rs 5,676 per unit"
F14D = ("Ranked bars of the build cost of one unit, Rs 5,676 in total: ATmega328P-PU with Uno bootloader Rs 230; 1.3-inch SH1106 OLED display Rs 950; "
        "4 x 4 membrane keypad and 8-way extension Rs 210; MP1584 buck converter Rs 230; AT24C256 phrase-memory EEPROM Rs 80; IR parts, buzzer, power parts, passives and IC sockets Rs 431; "
        "PCB Rev 1.7 made in the faculty manufacturing lab and soldered by us Rs 0; 3D-printed PLA+ case Rs 2,170; 9 V NiMH rechargeable battery Rs 1,180; foam tape, link wire, solder and ribbon Rs 195. "
        "A pair (Doctor Station and Bed Unit) costs Rs 11,352. The optional dual-slot charger, one per pair, is Rs 1,280, so a pair with charger costs Rs 12,632 (about USD 38). About USD 17 per unit at Rs 332.")
FOOT = "Prices: Duino.lk, Tronic.lk, Alphatronic.lk, Daraz.lk, Ciphertecx (printing at Rs 14 per gram), Nov 2026. Build cost, not a selling price."


def money(v):
    return f"Rs {v:,}"


def f14():
    W, H = 1800, 900
    o = [head(W, H, F14T, F14D, defs('F14.svg'))]
    o.append(T(100, 56, MONO, 40, "#F2F4F7", "Rs 5,676"))
    o.append(T(330, 56, SG, 26, "#A3ADBB", "Bill of materials, per unit"))
    x0 = 800
    sc = 700 / 2170
    y = 100
    for n, v, c in ITEMS:
        o.append(T(100, y + 24, POP, 21, "#F2F4F7", n))
        bw = v * sc
        if v:
            o.append(f'<rect x="{x0}" y="{y}" width="{bw:.1f}" height="34" rx="6" fill="{c}"/>')
        else:
            o.append(f'<line x1="{x0}" y1="{y}" x2="{x0}" y2="{y+34}" stroke="#7B96B6" stroke-width="2" stroke-linecap="round"/>')
        o.append(T(x0 + bw + 16, y + 25, MONO, 22, "#F2F4F7", money(v)))
        y += 50
    o.append(f'<line x1="{x0}" y1="{y-6}" x2="1700" y2="{y-6}" stroke="#3F4E61" stroke-width="1"/>')
    y0 = y + 30
    for i, (a, b) in enumerate(CARDS):
        cx = 100 + i * 560
        o.append(f'<rect x="{cx}" y="{y0}" width="520" height="130" rx="16" fill="#14171C" stroke="#3F4E61" stroke-width="1"/>')
        o.append(T(cx + 32, y0 + 62, MONO, 40, "#F2F4F7", a))
        o.append(T(cx + 32, y0 + 100, POP, 21, "#A3ADBB", b))
    o.append(T(100, H - 40, POP, 20, "#7C92AB", FOOT))
    o.append('</svg>')
    save('F14.svg', o)


def f14m():
    W = 760
    o = []
    sc = 440 / 2170
    y = 110
    for n, v, c in ITEMS:
        o.append(T(30, y, POP, 19, "#F2F4F7", n))
        bw = v * sc
        if v:
            o.append(f'<rect x="30" y="{y+10}" width="{bw:.1f}" height="26" rx="6" fill="{c}"/>')
        else:
            o.append(f'<line x1="30" y1="{y+10}" x2="30" y2="{y+36}" stroke="#7B96B6" stroke-width="2" stroke-linecap="round"/>')
        o.append(T(30 + bw + 14, y + 31, MONO, 22, "#F2F4F7", money(v)))
        y += 68
    yy = y + 20
    for a, b in CARDS:
        o.append(T(30, yy + 20, MONO, 28, "#F2F4F7", a))
        o.append(T(30, yy + 46, POP, 19, "#A3ADBB", b))
        yy += 62
    yy += 10
    for l in ["Prices: Duino.lk, Tronic.lk, Alphatronic.lk, Daraz.lk,", "Ciphertecx (printing at Rs 14 per gram), Nov 2026.", "Build cost, not a selling price."]:
        o.append(T(30, yy + 20, POP, 19, "#7C92AB", l))
        yy += 26
    H = int(yy + 14)
    o.insert(0, head(W, H, F14T, F14D, defs('F14-mobile.svg')))
    o.insert(1, T(30, 60, MONO, 40, "#F2F4F7", "Rs 5,676"))
    o.insert(2, T(260, 60, SG, 24, "#A3ADBB", "per unit"))
    o.append('</svg>')
    save('F14-mobile.svg', o)


F15T = "Cost per bed, Rs (log axis, bar = range; bar end = upper price)"
F15D = ("Range bars of cost per bed in Rs on a logarithmic axis; each bar is a price range and its right end is the upper price. "
        "OptiLink: about Rs 6,244 per bed, shown as a single red marker (a 10-bed ward kit of 1 Doctor Station and 10 Bed Units is Rs 62,436, or Rs 70,116 with 6 chargers; a build cost, not a selling price). "
        "Call bell (says only come): Rs 2,062 to 6,637. Tablet plus translator: Rs 24,249 to 41,940 (two Galaxy Tab A9 tablets cost Rs 83,880). Nurse-call system: Rs 46,500 to 216,000, plus installation.")


def f15():
    W, H = 1600, 730
    o = [head(W, H, F15T, F15D, defs('F15.svg'))]

    def L(v):
        return 560 + math.log10(v / 1000) * 384.048
    o.append(T(60, 70, SG, 34, "#F2F4F7", "Cost per bed, Rs"))
    o.append(T(60, 106, POP, 20, "#7C92AB", "Logarithmic axis: each gridline is ten times the one before. Each bar is a range; its right end is the upper price."))
    for v in (1000, 10000, 100000):
        x = L(v)
        o.append(f'<line x1="{x:.3f}" y1="140" x2="{x:.3f}" y2="560" stroke="#3F4E61" stroke-width="1" stroke-dasharray="2 6" stroke-linecap="round"/>')
        o.append(T(x, 590, MONO, 20, "#7C92AB", f"{v:,}", 'middle'))
    x = L(6244)
    o.append('<g id="row-optilink" data-motion-step="1">' + T(60, 178, SGB, 26, "#F2F4F7", "OptiLink") + T(60, 210, POP, 19, "#7C92AB", "build cost")
             + f'<path d="M{x-16:.3f} 170 l16 -16 l16 16 l-16 16 z" fill="{RED}" stroke="{RED}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>'
             + T(x + 46, 174, MONO, 24, "#F2F4F7", "about 6,244")
             + T(x + 46, 204, POP, 19, "#A3ADBB", "10-bed ward kit: Rs 62,436 (Rs 70,116 with 6 chargers)") + '</g>')

    def rng(i, y, lab, a, b, txt, left=False):
        xa, xb = L(a), L(b)
        s = f'<g id="row-{i}" data-motion-step="{i}">' + T(60, y + 28, POP, 23, "#F2F4F7", lab)
        s += f'<rect x="{xa:.3f}" y="{y+2}" width="{xb-xa:.3f}" height="36" rx="6" fill="#7B96B6"/>'
        s += T(xa - 14, y + 28, MONO, 20, "#F2F4F7", txt, 'end') if left else T(xb + 14, y + 28, MONO, 20, "#F2F4F7", txt)
        return s + '</g>'
    o.append(rng(2, 250, "Call bell (says only come)", 2062, 6637, "2,062–6,637"))
    o.append(rng(3, 350, "Tablet + translator", 24249, 41940, "24,249–41,940"))
    o.append(rng(4, 450, "Nurse-call system", 46500, 216000, "46,500–216,000 plus installation", left=True))
    o.append(T(60, 650, POP, 20, "#A3ADBB", "Two Galaxy Tab A9 tablets cost Rs 83,880."))
    o.append(T(60, 680, POP, 20, "#A3ADBB", "10-bed ward: 1 Doctor Station + 10 Bed Units = Rs 62,436 (Rs 70,116 with 6 chargers). OptiLink figure is a build cost, not a selling price."))
    o.append('</svg>')
    save('F15.svg', o)


def f15m():
    W = 700
    o = []

    def L(v):
        return 40 + math.log10(v / 1000) * 248.031
    o.append(T(30, 56, SG, 32, "#F2F4F7", "Cost per bed, Rs"))
    o.append(T(30, 92, POP, 20, "#7C92AB", "Logarithmic axis: each gridline is ten times"))
    o.append(T(30, 118, POP, 20, "#7C92AB", "the one before. Bar = range; bar end = upper price."))
    for v in (1000, 10000, 100000):
        x = L(v)
        o.append(f'<line x1="{x:.3f}" y1="160" x2="{x:.3f}" y2="690" stroke="#3F4E61" stroke-width="1" stroke-dasharray="2 6" stroke-linecap="round"/>')
        o.append(T(x, 718, MONO, 20, "#7C92AB", f"{v:,}", 'middle'))
    x = L(6244)
    o.append('<g id="row-optilink" data-motion-step="1">' + T(30, 200, SGB, 26, "#F2F4F7", "OptiLink") + T(150, 200, POP, 19, "#7C92AB", "build cost")
             + f'<path d="M{x-14:.3f} 240 l14 -14 l14 14 l-14 14 z" fill="{RED}" stroke="{RED}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>'
             + T(x + 34, 246, MONO, 22, "#F2F4F7", "about 6,244")
             + T(30, 284, POP, 19, "#A3ADBB", "10-bed ward kit: Rs 62,436") + T(30, 310, POP, 19, "#A3ADBB", "(Rs 70,116 with 6 chargers)") + '</g>')

    def rng(i, y, lab, a, b, txt, left=False, extra=None):
        xa, xb = L(a), L(b)
        s = f'<g id="row-{i}" data-motion-step="{i}">' + T(30, y, POP, 22, "#F2F4F7", lab)
        s += f'<rect x="{xa:.3f}" y="{y+22}" width="{xb-xa:.3f}" height="30" rx="6" fill="#7B96B6"/>'
        s += T(xa - 12, y + 46, MONO, 19, "#F2F4F7", txt, 'end') if left else T(xb + 12, y + 46, MONO, 19, "#F2F4F7", txt)
        if extra:
            s += T(xa, y + 82, POP, 19, "#A3ADBB", extra)
        return s + '</g>'
    o.append(rng(2, 370, "Call bell (says only come)", 2062, 6637, "2,062–6,637"))
    o.append(rng(3, 470, "Tablet + translator", 24249, 41940, "24,249–41,940", left=True))
    o.append(rng(4, 570, "Nurse-call system", 46500, 216000, "46,500–216,000", left=True, extra="plus installation"))
    y = 770
    for l in ["Two Galaxy Tab A9 tablets cost Rs 83,880.", "10-bed ward: 1 Doctor Station + 10 Bed", "Units = Rs 62,436 (Rs 70,116 with 6", "chargers). OptiLink figure is a build cost,", "not a selling price."]:
        o.append(T(30, y, POP, 19, "#A3ADBB", l))
        y += 28
    H = y + 10
    o.insert(0, head(W, H, F15T, F15D, defs('F15-mobile.svg')))
    o.append('</svg>')
    save('F15-mobile.svg', o)


f14(); f14m(); f15(); f15m()
