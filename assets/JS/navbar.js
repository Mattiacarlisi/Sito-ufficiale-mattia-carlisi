document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobileMenu");
  const toggleBtn = document.getElementById("menu-toggle");

  function toggleMobileMenu() {
    menu.classList.toggle("active");

    // Scrolla in cima se il menu viene aperto
    if (menu.classList.contains("active")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  // Toggle apertura/chiusura al click sul bottone ☰
  toggleBtn.addEventListener("click", toggleMobileMenu);

  // Chiudi il menu quando si clicca un link o bottone dentro il menu
  menu.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });

  // Chiudi il menu se la finestra viene allargata oltre i 768px
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.classList.remove("active");
    }
  });
});
