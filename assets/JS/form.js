

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var params = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,  // Capture the phone number
        service: document.getElementById("service").value,
        message: document.getElementById("message").value
    }

    const serviceID = "service_sih6ozs";
    const templateID = "template_ttja0xl";

    emailjs.send(serviceID, templateID, params)
    .then(res => {
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";  // Clear the phone number input
        document.getElementById("service").value = "";
        document.getElementById("message").value = "";
        document.getElementById("form-feedback").innerHTML = "<p style='color: green;'>Your message was sent successfully!</p>";
    })
    .catch((err) => {
        console.error(err);
        document.getElementById("form-feedback").innerHTML = "<p style='color: red;'>There was an error sending your message.</p>";
    });
});
