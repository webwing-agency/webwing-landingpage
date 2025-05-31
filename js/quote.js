document.addEventListener("DOMContentLoaded", function () {
  // ------------------------------
  // 1) DOM-Elemente
  // ------------------------------
  const startBtn      = document.getElementById('startBtn');
  const startScreen   = document.getElementById('startScreen');
  const quoteForm     = document.getElementById('quoteForm');
  const steps         = Array.from(document.querySelectorAll('.step'));
  const nextBtn       = document.getElementById('nextBtn');
  const prevBtn       = document.getElementById('prevBtn');
  const progress      = document.getElementById('progress');
  const progressBar   = document.querySelector('.progress-bar');
  const formStepLabel = document.querySelector('.form-step');
  const quoteHeading  = document.querySelector('.quote-heading');
  const bgCircle      = Array.from(document.querySelectorAll('.circle'));
  const backgroundOrb = document.querySelector('.background-orb');
  const slider = document.getElementById("timeline");
  const output = document.getElementById("timeline-label");
  const bookMeetingBtn = document.getElementById('bookMeetingBtn'); // Added definition

  let current = 0;

  // ------------------------------
  // 2) URL-Parameter „step=1“ (Skip-Logik)
  // ------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const stepParam = urlParams.get("step");
  if (stepParam === "1") {
    // Form sofort anzeigen, ohne auf „Start“ klicken zu müssen
    startScreen?.classList.add('hidden');
    quoteForm?.classList.remove('hidden');
    formStepLabel?.classList.remove('hidden');
    progressBar?.classList.remove('hidden');
    current = 0;
    showStep(current);
  }

  // ------------------------------
  // 3) Helfer‐Funktion: Text für „Schritt X von Y“ aktualisieren
  // ------------------------------
  function updateFormStepLabel() {
    formStepLabel.textContent = `Step ${current + 1} of ${steps.length}`;
  }

  // ------------------------------
  // 4) Funktion: Zeige Schritt i und aktualisiere Buttons/Progress/Gradient
  // ------------------------------
  function showStep(i) {
    // a) Alle Schritte durchgehen und nur den i-ten einblenden
    steps.forEach((step, idx) => {
      if (idx === i) {
        step.classList.remove('hidden');
        step.classList.add('active');
      } else {
        step.classList.add('hidden');
        step.classList.remove('active');
      }
    });

    // b) Progress-Bar als Prozentsatz (0…100)
    const pct = (i) / (steps.length - 1) * 100;
    progress.style.width = pct + '%';

    // c) Wenn letzter Schritt, Next-Button ausblenden, Farbe anpassen
    if (i === steps.length - 1) {
      progress.classList.add('final-step'); // evtl. CSS für Gradient
      nextBtn.classList.add('hidden');
      bgCircle.forEach(el => el.style.background = "darkgreen");
    } else {
      progress.classList.remove('final-step');
      nextBtn.classList.remove('hidden');
      bgCircle.forEach(el => el.style.background = "");
    }

    // d) Überschrift („quoteHeading“) immer ausblenden, sobald wir im Form sind
    quoteHeading?.classList.add('hidden');

    // e) Label aktualisieren
    updateFormStepLabel();

    // f) Prev-Button nur anzeigen, wenn i > 0
    if (i === 0) {
      prevBtn.style.opacity = '0';
      prevBtn.style.pointerEvents = 'none';
    } else {
      prevBtn.style.opacity = '1';
      prevBtn.style.pointerEvents = 'auto';
    }

    // g) background-orb nur im ersten Schritt anzeigen, ab Schritt 1 ausblenden
    if (backgroundOrb) {
      if (i > 0) {
        backgroundOrb.classList.add('hidden');
      } else {
        backgroundOrb.classList.remove('hidden');
      }
    }
  }

  // ------------------------------
  // 5) Start-Button: Startscreen verstecken, Form zeigen
  // ------------------------------
  startBtn?.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quoteForm.classList.remove('hidden');
    formStepLabel.classList.remove('hidden');
    progressBar.classList.remove('hidden');
    showStep(current);
  });

  // ------------------------------
  // 6) Prev-Button: Einen Schritt zurück
  // ------------------------------
  prevBtn?.addEventListener('click', () => {
    if (current > 0) {
      current--;
      showStep(current);
    }
  });

  // ------------------------------
  // 7) Next-Button: Validieren und vorgucken
  // ------------------------------
  nextBtn?.addEventListener('click', () => {
    const inputs = steps[current].querySelectorAll('input, textarea');
    const allValid = Array.from(inputs).every(input => input.checkValidity());
    if (!allValid) {
      // Falls ein Feld invalid ist, Fehlermeldung zeigen
      inputs.forEach(input => input.reportValidity());
      return;
    }

    // Nur wenn es wirklich einen nächsten Schritt gibt
    if (current < steps.length - 1) {
      current++;
      showStep(current);
    }
  });

  // Initialize slider label
  if (slider && output) {
    output.innerHTML = `${slider.value} weeks`;
    slider.oninput = function () {
      output.innerHTML = `${this.value} weeks`;
    };
  }

  // Show a specific step
  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('hidden', i !== index);
      step.classList.toggle('active', i === index);
    });

    // Update progress
    const percent = ((index + 1) / steps.length) * 100;
    progress.style.width = `${percent}%`;
    formStepLabel.textContent = `Step ${index + 1} of ${steps.length}`;

    // Show/hide nav buttons
    prevBtn.style.display = index > 0 ? 'inline-block' : 'none';
    nextBtn.style.display = index < steps.length - 1 ? 'inline-flex' : 'none';
  }

  // Next button click
  nextBtn.addEventListener('click', () => {
    const currentStep = steps[current];
    const requiredFields = currentStep.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      if (!field.checkValidity()) {
        field.reportValidity();
        valid = false;
      }
    });

    if (!valid) return;

    if (current < steps.length - 1) {
      current++;
      showStep(current);
    }
  });

  // Previous button click
  prevBtn.addEventListener('click', () => {
    if (current > 0) {
      current--;
      showStep(current);
    }
  });

  // Start button click
  startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quoteForm.classList.remove('hidden');
    formStepLabel.style.display = 'inline-block';
    progressBar.style.display = 'block';
    quoteHeading.classList.add('hidden');
    showStep(current);
  });

  // Optional: Handle Enter key to go to next step
  quoteForm.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextBtn.click();
    }
  });

  // Hide any .background-orb if present
  if (backgroundOrb) {
    backgroundOrb.classList.add('hidden');
  }

  // ------------------------------
  // SLIDER LABEL UPDATE (with singular/plural)
  // ------------------------------
  if (slider && output) {
    const updateLabel = () => {
      const weeks = parseInt(slider.value, 10);
      const unit = weeks === 1 ? "week" : "weeks";
      output.textContent = `${weeks} ${unit}`;
    };

    updateLabel();
    slider.addEventListener("input", updateLabel);
  }

  // ------------------------------
  // MAIL VALIDATION (no digits in local‐part)
  // ------------------------------
  function setupEmailValidation() {
    const emailInput = document.querySelector('input[name="email"]');
    if (!emailInput) return;

    emailInput.addEventListener('input', () => {
      const value = emailInput.value;
      const [local] = value.split('@');
      const digits = (local.match(/\d/g) || []).length;

      if (digits > 0) {
        emailInput.setCustomValidity('Please provide a professional email address');
      } else {
        emailInput.setCustomValidity('');
      }
    });
  }
  setupEmailValidation();

  // ------------------------------
  // URL PARAM STEP SKIPPER (skip to step=1)
  // ------------------------------
  (function () {
    const stepParam = new URLSearchParams(window.location.search).get("step");
    if (stepParam === "1") {
      if (startScreen) startScreen.classList.add('hidden');
      if (quoteForm) quoteForm.classList.remove('hidden');
      if (formStepLabel) formStepLabel.classList.remove('hidden');
      if (progressBar) progressBar.classList.remove('hidden');
      current = 0;
      showStep(current);
    }
  })();

  // ------------------------------
  // CAL.COM STUB + PREFILL CONFIG
  // ------------------------------
  // 1) Create a stub function for Cal if not already defined
  window.Cal = window.Cal || function() {
    (window.Cal.q = window.Cal.q || []).push(arguments);
  };
  // 2) Ensure forwardQueryParams is set before the embed script runs
  Cal.config = Cal.config || {};
  Cal.config.forwardQueryParams = true;

  // ------------------------------
  // CAL.COM EMBED + INITIALIZE
  // ------------------------------
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    // If Cal is not yet the stub or the embed function, define it
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  // Initialize Cal.com under namespace "discovery-call"
  Cal("init", "discovery-call", { origin: "https://cal.com" });

  // ------------------------------
  // BOOKING: COLLECT FORM + OPEN CAL WIDGET
  // ------------------------------
  if (bookMeetingBtn) {
    bookMeetingBtn.addEventListener("click", () => {
      // 1) Collect & validate inputs
      const nameInput   = document.querySelector('input[name="name"]');
      const emailInput  = document.querySelector('input[name="email"]');
      const name        = nameInput?.value.trim();
      const email       = emailInput?.value.trim();
      const projectType = document.querySelector('input[name="projectType"]:checked')?.value;
      const pages       = document.querySelector('input[name="pages"]:checked')?.value;
      const timeline    = document.getElementById('timeline')?.value;
      const notes       = document.querySelector('textarea[name="additionalNotes"]')?.value.trim();
      const business    = document.querySelector('input[name="business"]')?.value.trim();
      const website     = document.querySelector('input[name="website"]')?.value.trim();

      if (!name || !email || !projectType || !pages || !timeline) {
        return alert("Please fill in all required fields before booking.");
      }

      // 2) Build payload for confirmation page
      const quoteData = {
        requesterName:   name,
        requesterEmail:  email,
        projectType,
        pages,
        timelineWeeks:   timeline,
        additionalNotes: notes,
        business,
        website,
        estimatedPrice:  calculatePrice()
      };

      // 3) Build redirect URL with query params
      const params      = new URLSearchParams(quoteData).toString();
      const ourRedirect = `${window.location.origin}/quote-confirmation.html?${params}`;

      // 4) Build Cal.com booking URL (prefill via URL params)
      const calBookUrl = `https://cal.com/webwing-agency/discovery-call?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

      // 5) Open Cal.com popup (omit redirectUrl)
      Cal("ui", {
        theme:                "light",
        layout:               "month_view",
        hideEventTypeDetails: false,
        url:                  calBookUrl
      });

      // 6) Register a one-time listener for successful booking
      const onBooking = (event) => {
        // Unregister this listener
        Cal("off", { action: "bookingSuccessful", callback: onBooking });
        // Redirect the parent window to the confirmation page with params
        window.location.href = ourRedirect;
      };

      Cal("on", {
        action:   "bookingSuccessful",
        callback: onBooking
      });
    });
  }

  // ------------------------------
  // PRICING CALCULATION
  // ------------------------------
  function calculatePrice() {
    const projectType = document.querySelector('input[name="projectType"]:checked')?.value;
    const pages       = document.querySelector('input[name="pages"]:checked')?.value;
    const timeline    = Number(document.getElementById('timeline')?.value);

    let basePrice = 20000;
    if (projectType === 'websiteRedesign') basePrice = 15000;
    else if (projectType === 'newWebsite') basePrice = 20000;

    let pagesPrice = 0;
    switch (pages) {
      case '1-5':   pagesPrice = 5000;  break;
      case '10-20': pagesPrice = 12000; break;
      case '20+':   pagesPrice = 20000; break;
    }

    let timelinePrice = (timeline <= 4) ? ((5 - timeline) * 4000) : 0;

    let totalPrice = basePrice + pagesPrice + timelinePrice;
    totalPrice = Math.max(30000, Math.min(200000, totalPrice));

    return totalPrice;
  }
});
