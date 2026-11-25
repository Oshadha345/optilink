// OptiLink demo site — purely client-side, no real backend.
(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Fake shortener (demo only — nothing is sent anywhere)
  var shortenForm = document.getElementById("shorten-form");
  var result = document.getElementById("shorten-result");
  if (shortenForm && result) {
    shortenForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("long-url");
      var url = input.value.trim();
      if (!/^https?:\/\//i.test(url)) {
        result.textContent = "Please enter a full URL starting with http:// or https://";
        return;
      }
      var slug = Math.random().toString(36).slice(2, 8);
      result.innerHTML = "Your demo link: <strong>optil.ink/" + slug + "</strong> (demo only)";
    });
  }

  // Fake signup (demo only)
  var signupForm = document.getElementById("signup-form");
  var msg = document.getElementById("signup-msg");
  if (signupForm && msg) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("email").value.trim();
      msg.textContent = "Thanks! " + email + " is on the demo waitlist.";
      signupForm.reset();
    });
  }
})();
