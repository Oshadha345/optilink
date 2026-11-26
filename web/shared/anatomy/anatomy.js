/* OptiLink product anatomy. Owner: part 2c. No dependencies. Load with defer after site.js.
   Everything in the partials is readable without this file; it adds the active-part emphasis:
   hover (mouse), focus (keyboard) and tap (touch) light one part, step the others down and write
   the part's facts into the card's readout. No scroll-driven motion here (that is part 3's).

   For part 3 and page code:
     window.OptiLinkAnatomy.init(root?)       wire up any .anx inside root (idempotent)
     window.OptiLinkAnatomy.select(fig, part)  light a part (null clears)
     each figure fires "anx:change" with detail { part } whenever the lit part changes. */
(function () {
  "use strict";

  var figures = [];

  function partsOf(fig) {
    var map = Object.create(null);
    var nodes = fig.querySelectorAll(".anx-hot[data-part], .anx-label[data-part], .anx-leader[data-part]");
    for (var i = 0; i < nodes.length; i++) {
      var p = nodes[i].getAttribute("data-part");
      (map[p] || (map[p] = [])).push(nodes[i]);
    }
    return map;
  }

  function render(fig) {
    var s = fig.__anx;
    var part = s.hover || s.focus || s.pinned || null;
    if (part === s.shown) return;
    s.shown = part;
    if (part) fig.setAttribute("data-active", part);
    else fig.removeAttribute("data-active");
    for (var p in s.parts) {
      var on = p === part;
      for (var i = 0; i < s.parts[p].length; i++) {
        var el = s.parts[p][i];
        el.classList.toggle("is-active", on);
        if (el.classList.contains("anx-hot")) el.setAttribute("aria-pressed", String(on && s.pinned === p));
      }
    }
    if (s.readout) {
      var label = part && fig.querySelector('.anx-label[data-part="' + part + '"]');
      s.readout.textContent = (label && label.getAttribute("data-readout")) || s.restText;
    }
    var ev;
    try { ev = new CustomEvent("anx:change", { detail: { part: part } }); }
    catch (e) { ev = document.createEvent("CustomEvent"); ev.initCustomEvent("anx:change", false, false, { part: part }); }
    fig.dispatchEvent(ev);
  }

  function select(fig, part) {
    if (!fig || !fig.__anx) return;
    fig.__anx.pinned = part || null;
    fig.__anx.hover = null;
    render(fig);
  }

  function setup(fig) {
    if (fig.__anx) return;
    var readout = fig.querySelector("[data-anx-readout]");
    var s = fig.__anx = {
      parts: partsOf(fig),
      readout: readout,
      restText: readout ? readout.textContent : "",
      hover: null, focus: null, pinned: null, shown: undefined
    };
    figures.push(fig);

    function partOf(target) {
      var el = target && target.closest ? target.closest("[data-part]") : null;
      return el && fig.contains(el) ? el.getAttribute("data-part") : null;
    }

    // Mouse hover only: on touch, pointerenter arrives just before the click and would fight it.
    fig.addEventListener("pointerover", function (e) {
      if (e.pointerType !== "mouse") return;
      var p = partOf(e.target);
      if (p && p !== s.hover) { s.hover = p; render(fig); }
    });
    fig.addEventListener("pointerout", function (e) {
      if (e.pointerType !== "mouse") return;
      var to = partOf(e.relatedTarget);
      if (to !== s.hover) { s.hover = to; render(fig); }
    });

    // Keyboard focus lights a part; the focus that a mouse click leaves behind does not.
    function keyboardFocus(el) {
      try { return el.matches(":focus-visible"); } catch (err) { return true; }
    }
    fig.addEventListener("focusin", function (e) {
      if (e.target.classList && e.target.classList.contains("anx-hot") && keyboardFocus(e.target)) {
        s.focus = partOf(e.target);
        render(fig);
      }
    });
    fig.addEventListener("focusout", function (e) {
      var to = partOf(e.relatedTarget);
      s.focus = to && e.relatedTarget.classList.contains("anx-hot") ? to : null;
      render(fig);
    });

    // A tap or click on a marker, or on its label, pins the part; a second tap releases it.
    fig.addEventListener("click", function (e) {
      var hit = e.target.closest && e.target.closest(".anx-hot, .anx-label[data-part]");
      if (!hit || !fig.contains(hit)) return;
      var p = hit.getAttribute("data-part");
      s.pinned = s.pinned === p ? null : p;
      if (!s.pinned && s.hover === p) s.hover = null;
      render(fig);
    });

    fig.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Esc") {
        if (s.pinned || s.focus) {
          s.pinned = null;
          s.focus = null;
          render(fig);
        }
      }
    });

  }

  // A tap anywhere outside a figure releases its pinned part.
  document.addEventListener("pointerdown", function (e) {
    for (var i = 0; i < figures.length; i++) {
      var fig = figures[i];
      if (fig.__anx.pinned && !fig.contains(e.target)) { fig.__anx.pinned = null; render(fig); }
    }
  });

  // Optional blocks (the PCB card): hidden if their image file is missing.
  function optional(wrap) {
    if (wrap.__anxOpt) return;
    wrap.__anxOpt = true;
    var img = wrap.querySelector("img");
    if (!img) return;
    var hide = function () { wrap.hidden = true; };
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) hide();
    img.addEventListener("error", hide);
  }

  function init(root) {
    var scope = root || document;
    var list = scope.querySelectorAll(".anx");
    for (var i = 0; i < list.length; i++) setup(list[i]);
    var opt = scope.querySelectorAll("[data-anx-optional]");
    for (var j = 0; j < opt.length; j++) optional(opt[j]);
  }

  window.OptiLinkAnatomy = { init: init, select: select };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(); });
  else init();
})();
