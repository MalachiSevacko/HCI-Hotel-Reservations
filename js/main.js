document.addEventListener('DOMContentLoaded', () => {
  /* ---------- CONTACT PAGE ---------- */
  const contactForm = document.getElementById('contactForm');
  const contactOverlay = document.getElementById('contactSuccess');
  const contactCloseBtn = document.getElementById('successHomeButton');

  if (contactForm && contactOverlay && contactCloseBtn) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // built-in required / email checks
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      contactForm.reset();
      contactOverlay.classList.remove('d-none');
    });

    contactCloseBtn.addEventListener('click', () => {
      contactOverlay.classList.add('d-none');
    });
  }

  /* ---------- LOGIN / SIGNUP PAGE ---------- */
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  const authOverlay = document.getElementById('authSuccess');
  const authTitle = document.getElementById('authSuccessTitle');
  const authText = document.getElementById('authSuccessText');
  const authHomeButton = document.getElementById('authHomeButton');

  // Only wire this up if the overlay exists (i.e., on login.html)
  if (authOverlay && authTitle && authText && authHomeButton) {
    authHomeButton.addEventListener('click', () => {
      // after acknowledging, go back to home page
      window.location.href = 'index.html';
    });

    // LOGIN FORM: required + email pattern
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!loginForm.checkValidity()) {
          loginForm.reportValidity();
          return;
        }

        authTitle.textContent = 'Login Successful!';
        authText.textContent =
          'You are now signed in. You will be returned to the home page.';
        authOverlay.classList.remove('d-none');
      });
    }

    // SIGNUP FORM: required + email pattern + passwords must match
    if (signupForm) {
      const pw = document.getElementById('signupPassword');
      const confirm = document.getElementById('signupConfirm');

      const checkPasswordsMatch = () => {
        if (pw.value && confirm.value && pw.value !== confirm.value) {
          confirm.setCustomValidity('Passwords must match.');
        } else {
          confirm.setCustomValidity('');
        }
      };

      pw.addEventListener('input', checkPasswordsMatch);
      confirm.addEventListener('input', checkPasswordsMatch);

      signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        checkPasswordsMatch();

        if (!signupForm.checkValidity()) {
          signupForm.reportValidity();
          return;
        }

        authTitle.textContent = 'Account Created!';
        authText.textContent =
          'Your account has been created and you are now signed in. You will be returned to the home page.';
        authOverlay.classList.remove('d-none');
      });
    }
  }
});
