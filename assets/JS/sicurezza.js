// Consenso cookie + caricamento condizionato dei servizi di terze parti.
//
// Google Analytics 4: per attivarlo inserisci l'ID di misurazione (es. "G-ABC123XYZ")
// nella costante GA_MEASUREMENT_ID. Finché resta vuoto non viene caricato nulla.
// La mappa di Google Maps viene caricata solo dopo il consenso (o cliccando "Mostra la mappa").
(function () {
  var GA_MEASUREMENT_ID = "G-M79S23EB3E";
  var STORAGE_KEY = "cookieConsent";

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* storage non disponibile */ }
  }

  function loadAnalytics() {
    if (!GA_MEASUREMENT_ID || window.__gaLoaded) return;
    window.__gaLoaded = true;
    var script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    script.async = true;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function loadMap() {
    var frame = document.getElementById("map-frame");
    if (!frame || frame.dataset.loaded) return;
    var src = frame.getAttribute("data-map-src");
    if (!src) return;
    frame.dataset.loaded = "1";
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = "Mappa dello studio del Dott. Mattia Carlisi, chinesiologo a Torino";
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    frame.innerHTML = "";
    frame.appendChild(iframe);
  }

  function loadThirdParty() {
    loadAnalytics();
    loadMap();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var popup = document.getElementById("cookie-popup");
    var acceptBtn = document.getElementById("accept-cookies");
    var declineBtn = document.getElementById("decline-cookies");
    var mapBtn = document.getElementById("map-load-btn");

    var consent = getConsent();
    if (!consent) {
      if (popup) popup.hidden = false;
    } else if (consent === "accepted") {
      loadThirdParty();
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        setConsent("accepted");
        if (popup) popup.hidden = true;
        loadThirdParty();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener("click", function () {
        setConsent("declined");
        if (popup) popup.hidden = true;
      });
    }

    // Consenso esplicito per la sola mappa (clic dell'utente)
    if (mapBtn) mapBtn.addEventListener("click", loadMap);
  });
})();

// Tracciamento clic su "Chiama" e "WhatsApp" (inviato a GA4 solo se attivo e con consenso)
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-track]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (typeof window.gtag === "function") {
        window.gtag("event", "contact_click", { method: el.getAttribute("data-track"), page: location.pathname });
      }
    });
  });
});
