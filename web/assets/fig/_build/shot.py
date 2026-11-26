from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for f,wd in [("F14",1280),("F15",1280),("F14-mobile",375),("F15-mobile",375)]:
        pg=b.new_page(viewport={"width":wd,"height":900})
        pg.goto(f"file:///M:/optilink/web/assets/fig/{f}.svg"); pg.wait_for_timeout(500)
        print(f,pg.evaluate("""()=>{const s=document.documentElement;const vb=s.viewBox.baseVal;let bad=[];
        s.querySelectorAll('text').forEach(t=>{const b=t.getBBox();if(b.x+b.width>vb.width-4||b.x<0)bad.push(t.textContent+' '+Math.round(b.x+b.width))});return [vb.width,bad]}"""))
        open(f"M:/optilink/web/assets/fig/_build/shots/{f}.html","w").write(f'<body style="margin:0;background:#0B0D10"><img src="../../{f}.svg" style="width:100%;display:block">')
        pg.goto(f"file:///M:/optilink/web/assets/fig/_build/shots/{f}.html"); pg.wait_for_timeout(500)
        pg.screenshot(path=f"M:/optilink/web/assets/fig/_build/shots/{f}.png",full_page=True)
    b.close()
