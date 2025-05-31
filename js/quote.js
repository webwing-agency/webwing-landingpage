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
  const progressBar   = document.querySelector('.progress-bar');
  const progress      = document.getElementById('progress');
  const formStepLabel = document.querySelector('.form-step');
  const quoteHeading  = document.querySelector('.quote-heading');
  const bgCircles     = Array.from(document.querySelectorAll('.circle'));
  const backgroundOrb = document.querySelector('.background-orb');
  const slider        = document.getElementById("timeline");
  const output        = document.getElementById("timeline-label");
  const bookMeetingBtn= document.getElementById('bookMeetingBtn');

  let current = 0;

  // ------------------------------
  // 2) Helfer‐Funktion: Text für „Schritt X von Y“ aktualisieren
  // ------------------------------
  function updateFormStepLabel(i) {
    formStepLabel.textContent = `Step ${i + 1} of ${steps.length}`;
  }

  // ------------------------------
  // 3) Funktion: Zeige Schritt i und aktualisiere Buttons/Progress/Gradient/etc.
  // ------------------------------
  function showStep(i) {
    // a) Alle Schritte durchgehen und nur den i-ten einblenden
    steps.forEach((stepEl, idx) => {
      if (idx === i) {
        stepEl.classList.remove('hidden');
        stepEl.classList.add('active');
      } else {
        stepEl.classList.add('hidden');
        stepEl.classList.remove('active');
      }
    });

    // b) Progress-Bar als Prozentsatz (0…100)
    const pct = (i) / (steps.length - 1) * 100;
    progress.style.width = `${pct}%`;

    // c) Wenn letzter Schritt, Next-Button ausblenden, Farbe anpassen
    if (i === steps.length - 1) {
      progress.classList.add('final-step');
      nextBtn.classList.add('hidden');
      bgCircles.forEach(el => el.style.background = "darkgreen");
    } else {
      progress.classList.remove('final-step');
      nextBtn.classList.remove('hidden');
      bgCircles.forEach(el => el.style.background = "");
    }

    // d) Überschrift („quoteHeading“) immer ausblenden, sobald wir im Form sind
    quoteHeading?.classList.add('hidden');

    // e) Label aktualisieren
    updateFormStepLabel(i);

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
  // 4) URL-Parameter „step=1“ (Skip-Logik)
  // ------------------------------
  (function () {
    const stepParam = new URLSearchParams(window.location.search).get("step");
    if (stepParam === "1") {
      startScreen?.classList.add('hidden');
      quoteForm?.classList.remove('hidden');
      formStepLabel?.classList.remove('hidden');
      progressBar?.classList.remove('hidden');
      current = 0;
      showStep(current);
    }
  })();

  // ------------------------------
  // 5) Start-Button: Startscreen verstecken, Form zeigen
  // ------------------------------
  startBtn?.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quoteForm.classList.remove('hidden');
    formStepLabel.classList.remove('hidden');
    progressBar.classList.remove('hidden');
    quoteHeading.classList.add('hidden');
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
  // 7) Next-Button: Validieren und vorwärtsspringen
  // ------------------------------
  nextBtn?.addEventListener('click', () => {
    // a) Validierung aller Felder in diesem Schritt
    const inputs = steps[current].querySelectorAll('input, textarea');
    const allValid = Array.from(inputs).every(input => input.checkValidity());
    if (!allValid) {
      inputs.forEach(input => input.reportValidity());
      return;
    }

    // b) Nur wenn es wirklich einen nächsten Schritt gibt
    if (current < steps.length - 1) {
      current++;
      showStep(current);
    }
  });

  // ------------------------------
  // 8) SLIDER LABEL UPDATE (singular/plural)
  // ------------------------------
  if (slider && output) {
    function updateLabel() {
      const weeks = parseInt(slider.value, 10);
      const unit = weeks === 1 ? "week" : "weeks";
      output.textContent = `${weeks} ${unit}`;
    }

    updateLabel();
    slider.addEventListener("input", updateLabel);
  }

  // ------------------------------
  // 9) MAIL VALIDATION (kein Ziffern‐Local‐Part)
  // ------------------------------
  function setupEmailValidation() {
    const emailInput = document.querySelector('input[name="email"]');
    if (!emailInput) return;

    emailInput.addEventListener('input', () => {
      const value = emailInput.value;
      const [local] = value.split('@');
      const hasDigits = (/\d/).test(local);
      if (hasDigits) {
        emailInput.setCustomValidity('Please provide a professional email address');
      } else {
        emailInput.setCustomValidity('');
      }
    });
  }
  setupEmailValidation();

  // ------------------------------
  // 10) CAL.COM STUB + PREFILL CONFIG
  // ------------------------------
  window.Cal = window.Cal || function() {
    (window.Cal.q = window.Cal.q || []).push(arguments);
  };
  window.Cal.config = window.Cal.config || {};
  window.Cal.config.forwardQueryParams = true;

  (function (C, A, L) {
    let d = C.document;
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
        const api = function () { api.q.push(arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          api.q.push(ar);
          cal.q.push(["initNamespace", namespace]);
        } else {
          cal.q.push(ar);
        }
        return;
      }
      cal.q.push(ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  // Initialize Cal.com under namespace "discovery-call"
  Cal("init", "discovery-call", { origin: "https://cal.com" });

  // ------------------------------
  // 11) BOOKING: COLLECT FORM + OPEN CAL WIDGET
  // ------------------------------
  if (bookMeetingBtn) {
    bookMeetingBtn.addEventListener("click", () => {
      // a) Eingaben sammeln & validieren
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

      // b) Payload für Bestätigungsseite zusammenstellen
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

      // c) Redirect-URL mit Query-Params bauen
      const params      = new URLSearchParams(quoteData).toString();
      const ourRedirect = `${window.location.origin}/quote-confirmation.html?${params}`;

      // d) Cal.com Buchungs-URL (Prefill via URL-Params)
      const calBookUrl = `https://cal.com/webwing-agency/discovery-call?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

      // e) Cal.com Popup öffnen (ohne RedirectUrl)
      Cal("ui", {
        theme:                "light",
        layout:               "month_view",
        hideEventTypeDetails: false,
        url:                  calBookUrl
      });

      // f) Einmaliger Listener für erfolgreiche Buchung
      const onBooking = (event) => {
        Cal("off", { action: "bookingSuccessful", callback: onBooking });
        window.location.href = ourRedirect;
      };
      Cal("on", { action: "bookingSuccessful", callback: onBooking });
    });
  }

  // ------------------------------
  // 12) PRICING-BERECHNUNG
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
      case '1-5':   pagesPrice = 5000;   break;
      case '10-20': pagesPrice = 12000;  break;
      case '20+':   pagesPrice = 20000;  break;
      default:      pagesPrice = 0;      break;
    }

    let timelinePrice = (timeline <= 4) ? ((5 - timeline) * 4000) : 0;

    let totalPrice = basePrice + pagesPrice + timelinePrice;
    totalPrice = Math.max(30000, Math.min(200000, totalPrice));

    return totalPrice;
  }
});
