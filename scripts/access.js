(function () {
  // Annee footer
  var yr = document.getElementById("yr-a");
  if (yr) yr.textContent = new Date().getFullYear();
}());

// Burger mobile
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
    if (ico) ico.textContent = ouvert ? "\u2630" : "\u2715";
    if (ouvert) { panel.setAttribute("hidden", ""); }
    else        { panel.removeAttribute("hidden"); var fl = panel.querySelector("a"); if (fl) fl.focus(); }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".site-header") && !e.target.closest(".site-mobile-nav")) {
      panel.setAttribute("hidden", "");
      burger.setAttribute("aria-expanded", "false");
      if (ico) ico.textContent = "\u2630";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
      panel.setAttribute("hidden", "");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Ouvrir le menu de navigation");
      if (ico) ico.textContent = "\u2630";
      burger.focus();
    }
  });
}());