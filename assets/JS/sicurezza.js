
  window.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("cookie-popup");
    const acceptBtn = document.getElementById("accept-cookies");
    const declineBtn = document.getElementById("decline-cookies");

    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      popup.style.display = "flex";
    } else if (consent === "accepted") {
      loadCookies();
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      popup.style.display = "none";
      loadCookies();
    });

    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      popup.style.display = "none";
    });

    function loadCookies() {
      // Esempio: GA4
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    }
  });

