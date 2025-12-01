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

  /* ---------- BOOKING PAGE ---------- */
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();   // stop the normal submit for a moment

      // Run HTML5 validation: required, email, date, pattern, etc.
      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();  // show the browser's own messages
        return;
      }

      // If everything is valid, go to the confirmation page
      window.location.href = 'booking_confirmation.html';
    });
  }

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict'
  
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)
  
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    const setTheme = theme => {
      if (theme === 'auto') {
        document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
    }
  
    setTheme(getPreferredTheme())
  
    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector('#bd-theme')
  
      if (!themeSwitcher) {
        return
      }
  
      const themeSwitcherText = document.querySelector('#bd-theme-text')
      const activeThemeIcon = document.querySelector('.theme-icon-active use')
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
  
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
        element.setAttribute('aria-pressed', 'false')
      })
  
      btnToActive.classList.add('active')
      btnToActive.setAttribute('aria-pressed', 'true')
      activeThemeIcon.setAttribute('href', svgOfActiveBtn)
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
  
      if (focus) {
        themeSwitcher.focus()
      }
    }
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme()
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme())
  
      document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            setStoredTheme(theme)
            setTheme(theme)
            showActiveTheme(theme, true)
          })
        })
    })
  })()
