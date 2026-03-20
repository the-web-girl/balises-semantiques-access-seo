/* ================================================================
   DESIGN PATTERNS — JavaScript
   - openModal / closeModal / toggleFav : window.xxx (accessibles
     depuis les onclick="" du HTML)
   - carousel, formulaire, menus : IIFE isolées
================================================================ */

/* ────────────────────────────────────────────────────────────────
   HEADER BURGER
──────────────────────────────────────────────────────────────── */
(function () {
  var burger = document.getElementById("site-burger");
  var panel  = document.getElementById("site-mobile-panel");
  var ico    = document.getElementById("site-burger-ico");
  if (!burger || !panel) return;

  burger.addEventListener("click", function (e) {
    e.stopPropagation();
    var ouvert = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!ouvert));
    burger.setAttribute("aria-label", ouvert ? "Ouvrir le menu de navigation" : "Fermer le menu de navigation");
    if (ico) ico.textContent = ouvert ? "☰" : "✕";
    if (ouvert) { panel.setAttribute("hidden", ""); }
    else        { panel.removeAttribute("hidden"); var fl = panel.querySelector("a"); if (fl) fl.focus(); }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".site-header") && !e.target.closest(".site-mobile-nav")) {
      panel.setAttribute("hidden", "");
      burger.setAttribute("aria-expanded", "false");
      if (ico) ico.textContent = "☰";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
      panel.setAttribute("hidden", "");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Ouvrir le menu de navigation");
      if (ico) ico.textContent = "☰";
      burger.focus();
    }
  });
}());

/* ────────────────────────────────────────────────────────────────
   1. CAROUSEL
──────────────────────────────────────────────────────────────── */
(function () {
  var track  = document.getElementById("c1-track");
  var prev   = document.getElementById("c1-prev");
  var next   = document.getElementById("c1-next");
  var live   = document.getElementById("c1-live");
  var dots   = document.querySelectorAll("#carousel-1 .carousel-dot");
  var slides = document.querySelectorAll("#carousel-1 .carousel-slide");
  if (!track) return;

  var total  = slides.length;
  var cur    = 0;
  var LABELS = [
    "Diapositive 1 sur 4 : HTML de A \u00e0 Z",
    "Diapositive 2 sur 4 : CSS de A \u00e0 Z",
    "Diapositive 3 sur 4 : JavaScript de A \u00e0 Z",
    "Diapositive 4 sur 4 : React de A \u00e0 Z"
  ];

  function goTo(n) {
    cur = ((n % total) + total) % total;
    track.style.transform = "translateX(-" + (cur * 100) + "%)";
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === cur);
      d.setAttribute("aria-current", i === cur ? "true" : "false");
    });
    if (live) {
      live.textContent = "";
      setTimeout(function () { live.textContent = LABELS[cur]; }, 100);
    }
  }

  if (prev) prev.addEventListener("click", function () { goTo(cur - 1); });
  if (next) next.addEventListener("click", function () { goTo(cur + 1); });

  dots.forEach(function (d) {
    d.addEventListener("click", function () {
      goTo(parseInt(this.getAttribute("data-index"), 10));
    });
  });

  var region = document.getElementById("carousel-1");
  if (region) {
    region.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(cur - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(cur + 1); }
    });
  }
}());

/* ────────────────────────────────────────────────────────────────
   2. FORMULAIRE
──────────────────────────────────────────────────────────────── */
(function () {
  var form = document.getElementById("form-inscription");
  if (!form) return;

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function setErr(inputId, errId, msg) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (!inp || !err) return;
    inp.setAttribute("aria-invalid","true");
    inp.style.cssText += ";border-color:var(--rouge);box-shadow:0 0 0 3px rgba(229,62,62,.15)";
    err.textContent = msg;
    err.removeAttribute("hidden");
  }
  function clrErr(inputId, errId) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (!inp || !err) return;
    inp.setAttribute("aria-invalid","false");
    inp.style.borderColor = "";
    inp.style.boxShadow   = "";
    err.setAttribute("hidden","");
  }

  document.getElementById("f-prenom").addEventListener("blur", function () {
    if (!this.value.trim()) setErr("f-prenom","f-prenom-err","⚠ Le prénom est obligatoire.");
    else clrErr("f-prenom","f-prenom-err");
  });
  document.getElementById("f-nom").addEventListener("blur", function () {
    if (!this.value.trim()) setErr("f-nom","f-nom-err","⚠ Le nom est obligatoire.");
    else clrErr("f-nom","f-nom-err");
  });
  document.getElementById("f-email").addEventListener("blur", function () {
    var v = this.value.trim();
    if (!v)            setErr("f-email","f-email-err","⚠ L\u2019email est obligatoire.");
    else if (!isEmail(v)) setErr("f-email","f-email-err","⚠ Format invalide : nom@domaine.com");
    else clrErr("f-email","f-email-err");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok     = true;
    var prenom = document.getElementById("f-prenom");
    var nom    = document.getElementById("f-nom");
    var email  = document.getElementById("f-email");
    var cgu    = document.getElementById("f-cgu");

    if (!prenom.value.trim())  { setErr("f-prenom","f-prenom-err","⚠ Le prénom est obligatoire."); ok=false; }
    else clrErr("f-prenom","f-prenom-err");
    if (!nom.value.trim())     { setErr("f-nom","f-nom-err","⚠ Le nom est obligatoire."); ok=false; }
    else clrErr("f-nom","f-nom-err");
    if (!email.value.trim())         { setErr("f-email","f-email-err","⚠ L\u2019email est obligatoire."); ok=false; }
    else if (!isEmail(email.value))  { setErr("f-email","f-email-err","⚠ Format invalide : nom@domaine.com"); ok=false; }
    else clrErr("f-email","f-email-err");

    var cguErr = document.getElementById("f-cgu-err");
    if (!cgu.checked) { cgu.setAttribute("aria-invalid","true"); cguErr.removeAttribute("hidden"); ok=false; }
    else              { cgu.setAttribute("aria-invalid","false"); cguErr.setAttribute("hidden",""); }

    var res = document.getElementById("form-result");
    if (ok) {
      res.className    = "form-result success";
      res.style.display = "flex";
      res.textContent  = "✅ Compte créé avec succès ! Vérifiez votre email.";
      res.setAttribute("tabindex","-1"); res.focus();
    } else {
      res.className    = "form-result error";
      res.style.display = "flex";
      res.textContent  = "❌ Des erreurs sont présentes. Vérifiez les champs en rouge.";
      var first = form.querySelector("[aria-invalid='true']");
      if (first) first.focus();
    }
  });

  form.addEventListener("reset", function () {
    var res = document.getElementById("form-result");
    if (res) res.style.display = "none";
    ["f-prenom","f-nom","f-email"].forEach(function (id) {
      var inp = document.getElementById(id);
      if (inp) { inp.setAttribute("aria-invalid","false"); inp.style.borderColor=""; inp.style.boxShadow=""; }
    });
    ["f-prenom-err","f-nom-err","f-email-err","f-cgu-err"].forEach(function (id) {
      var el = document.getElementById(id); if (el) el.setAttribute("hidden","");
    });
    var cgu = document.getElementById("f-cgu");
    if (cgu) cgu.setAttribute("aria-invalid","false");
  });
}());

/* ────────────────────────────────────────────────────────────────
   3. CARDS — Favori
   window.toggleFav car appelée via onclick="" dans le HTML
──────────────────────────────────────────────────────────────── */
window.toggleFav = function (btn) {
  var pressed = btn.getAttribute("aria-pressed") === "true";
  var article = btn.closest("article");
  var titre   = article ? article.querySelector(".product-name a").textContent.trim() : "ce cours";
  btn.setAttribute("aria-pressed", String(!pressed));
  btn.querySelector("span").textContent = pressed ? "♡" : "♥";
  btn.style.background = pressed ? "" : "#fff5f5";
  btn.setAttribute("aria-label",
    (pressed ? "Ajouter " : "Retirer ") + titre +
    (pressed ? " aux favoris" : " des favoris")
  );
};

/* ────────────────────────────────────────────────────────────────
   4. TOOLTIP — Fermeture Échap (WCAG 1.4.13)
──────────────────────────────────────────────────────────────── */
document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  var f = document.activeElement;
  if (f && f.closest(".tooltip-trigger")) f.blur();
});

/* ────────────────────────────────────────────────────────────────
   5. MODALES
   window.openModal / window.closeModal car appelées via onclick=""
──────────────────────────────────────────────────────────────── */
var _mTriggers = {};
var _mTraps    = {};
var _mClicks   = {};

window.openModal = function (id) {
  var ov = document.getElementById(id);
  if (!ov) { console.warn("openModal: #" + id + " introuvable"); return; }

  _mTriggers[id] = document.activeElement;
  ov.classList.add("open");
  document.body.style.overflow = "hidden";

  _mTraps[id] = function (e) {
    if (e.key === "Escape") { window.closeModal(id); return; }
    if (e.key !== "Tab") return;
    var els = Array.from(ov.querySelectorAll(
      "button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled])"
    )).filter(function (el) { return el.offsetParent !== null; });
    if (!els.length) return;
    var first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  _mClicks[id] = function (e) { if (e.target === ov) window.closeModal(id); };

  ov.addEventListener("keydown", _mTraps[id]);
  ov.addEventListener("click",   _mClicks[id]);

  setTimeout(function () {
    var auto  = ov.querySelector("[autofocus]");
    var first = ov.querySelector("button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled])");
    if (auto) auto.focus(); else if (first) first.focus();
  }, 80);
};

window.closeModal = function (id) {
  var ov = document.getElementById(id);
  if (!ov) return;
  ov.classList.remove("open");
  document.body.style.overflow = "";
  if (_mTraps[id])  { ov.removeEventListener("keydown", _mTraps[id]);  delete _mTraps[id]; }
  if (_mClicks[id]) { ov.removeEventListener("click",   _mClicks[id]); delete _mClicks[id]; }
  if (_mTriggers[id]) { _mTriggers[id].focus(); delete _mTriggers[id]; }
};

/* ────────────────────────────────────────────────────────────────
   6. MENU SIMPLE
──────────────────────────────────────────────────────────────── */
(function () {
  var btn   = document.getElementById("simple-burger");
  var links = document.getElementById("simple-nav-links");
  var ico   = document.getElementById("simple-burger-ico");
  if (!btn || !links) return;

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    if (ico) ico.textContent = open ? "☰" : "✕";
    btn.setAttribute("aria-label", open ? "Ouvrir le menu" : "Fermer le menu");
    links.classList.toggle("open", !open);
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-simple")) {
      links.classList.remove("open");
      btn.setAttribute("aria-expanded","false");
      if (ico) ico.textContent = "☰";
    }
  });
}());

/* ────────────────────────────────────────────────────────────────
   7. MENU COMPLEXE
──────────────────────────────────────────────────────────────── */
(function () {
  /* Mobile burger */
  var cBtn   = document.getElementById("complex-burger");
  var cPanel = document.getElementById("complex-mobile-panel");
  var cIco   = document.getElementById("complex-burger-ico");
  if (cBtn && cPanel) {
    cBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = cBtn.getAttribute("aria-expanded") === "true";
      cBtn.setAttribute("aria-expanded", String(!open));
      if (cIco) cIco.textContent = open ? "☰" : "✕";
      cPanel.classList.toggle("open", !open);
    });
  }

  /* Dropdowns */
  var dds = [
    { btnId: "dd-cours-btn", menuId: "dd-cours" },
    { btnId: "mega-btn",     menuId: "mega-menu"  }
  ];

  function closeAll() {
    dds.forEach(function (d) {
      var b = document.getElementById(d.btnId);
      var m = document.getElementById(d.menuId);
      if (b) b.setAttribute("aria-expanded","false");
      if (m) m.classList.remove("open");
    });
  }

  dds.forEach(function (d) {
    var btn  = document.getElementById(d.btnId);
    var menu = document.getElementById(d.menuId);
    if (!btn || !menu) return;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      closeAll();
      if (!isOpen) {
        btn.setAttribute("aria-expanded","true");
        menu.classList.add("open");
        var first = menu.querySelector("[role='menuitem'], a, button");
        if (first) setTimeout(function () { first.focus(); }, 60);
      }
    });

    menu.addEventListener("keydown", function (e) {
      var items = Array.from(menu.querySelectorAll("[role='menuitem'], a, button"));
      var idx   = items.indexOf(document.activeElement);
      if (e.key === "Escape")     { e.preventDefault(); closeAll(); btn.focus(); }
      else if (e.key === "ArrowDown")  { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
      else if (e.key === "ArrowUp")    { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
      else if (e.key === "Home")       { e.preventDefault(); items[0].focus(); }
      else if (e.key === "End")        { e.preventDefault(); items[items.length - 1].focus(); }
    });
  });

  document.addEventListener("click",   function (e) { if (!e.target.closest(".nav-complex-item")) closeAll(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });
}());

/* ────────────────────────────────────────────────────────────────
   ANNÉE FOOTER
──────────────────────────────────────────────────────────────── */
(function () {
  var yr = document.getElementById("yr-p");
  if (yr) yr.textContent = new Date().getFullYear();
}());
