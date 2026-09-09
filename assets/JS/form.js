// Modulo contatti: invio tramite EmailJS (libreria caricata a fine pagina con "defer").
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var PUBLIC_KEY = "-DDVi2ko2CwfN6Tqc";
  var SERVICE_ID = "service_sih6ozs";
  var TEMPLATE_ID = "template_ttja0xl";

  var feedback = document.getElementById("form-feedback");
  var submitBtn = form.querySelector('button[type="submit"]');
  var initialized = false;

  function showFeedback(message, ok) {
    if (!feedback) return;
    feedback.innerHTML =
      '<p style="color:' + (ok ? "#1a7f37" : "#c0392b") + ';font-weight:600;">' + message + "</p>";
  }

  function value(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Honeypot: i bot compilano anche il campo nascosto
    if (value("website")) {
      form.reset();
      showFeedback("Messaggio inviato.", true);
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (typeof emailjs === "undefined") {
      showFeedback("Il servizio di invio non è disponibile in questo momento. Riprova tra poco oppure scrivimi su Instagram.", false);
      return;
    }

    if (!initialized) {
      emailjs.init({ publicKey: PUBLIC_KEY });
      initialized = true;
    }

    var params = {
      firstName: value("firstName"),
      lastName: value("lastName"),
      email: value("email"),
      phone: value("phone"),
      service: value("service"),
      message: value("message"),
      page: window.location.href
    };

    var originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Invio in corso…";
    }
    if (feedback) feedback.innerHTML = "";

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, params)
      .then(function () {
        form.reset();
        showFeedback("Messaggio inviato! Ti rispondo entro 24 ore.", true);
      })
      .catch(function (err) {
        console.error(err);
        showFeedback("Si è verificato un errore durante l'invio. Riprova tra qualche minuto oppure contattami su Instagram.", false);
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      });
  });
});
