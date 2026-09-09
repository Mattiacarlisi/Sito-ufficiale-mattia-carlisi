// Menu mobile: apertura/chiusura con stato accessibile (aria-expanded).
document.addEventListener("DOMContentLoaded", function () {
  var menu = document.getElementById("mobileMenu");
  var toggleBtn = document.getElementById("menu-toggle");
  if (!menu || !toggleBtn) return;

  function setOpen(open) {
    menu.classList.toggle("active", open);
    toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  toggleBtn.addEventListener("click", function () {
    setOpen(!menu.classList.contains("active"));
  });

  // Chiude il menu quando si sceglie una voce
  menu.querySelectorAll("a, button").forEach(function (el) {
    el.addEventListener("click", function () { setOpen(false); });
  });

  // Chiude il menu se la finestra torna al layout desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && menu.classList.contains("active")) setOpen(false);
  });
});
