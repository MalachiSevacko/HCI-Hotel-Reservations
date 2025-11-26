document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const overlay = document.getElementById('contactSuccess');
  const homeButton = document.getElementById('successHomeButton');

  // Only run this on the contact page
  if (!form || !overlay || !homeButton) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the real submit (prevents error page)

    // Let built-in HTML validation run
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Fake "sending" – clear the form and show the success card
    form.reset();
    overlay.classList.remove('d-none');
  });

  homeButton.addEventListener('click', () => {
    // Stay on contact page – just close the success popup
    overlay.classList.add('d-none');
  });

});

