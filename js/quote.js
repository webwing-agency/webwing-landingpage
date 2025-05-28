// ------------------------------
// DOM ELEMENTS
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
const slider        = document.getElementById("timeline");
const output        = document.getElementById("timeline-value");

let current = 0;

// ------------------------------
// UI SETUP
// ------------------------------
progressBar.classList.add('hidden');
prevBtn.style.opacity = '0';
prevBtn.style.pointerEvents = 'none';
formStepLabel.classList.add('hidden');

function updateFormStepLabel() {
  formStepLabel.textContent = `Step ${current + 1} of ${steps.length}`;
}

function showStep(i) {
  steps.forEach((step, idx) => {
    step.classList.toggle('hidden', idx !== i);
    step.classList.toggle('active', idx === i);
  });

  const pct = (i) / (steps.length - 1) * 100;
  progress.style.width = pct + '%';

  if (i === steps.length - 1) {
    progress.classList.add('final-step');
    nextBtn.classList.add('hidden');
    bgCircle.forEach(el => el.style.background = "darkgreen");
  } else {
    progress.classList.remove('final-step');
    nextBtn.classList.remove('hidden');
    bgCircle.forEach(el => el.style.background = "");
  }

  quoteHeading.classList.add('hidden');
  updateFormStepLabel();

  prevBtn.style.opacity = i === 0 ? '0' : '1';
  prevBtn.style.pointerEvents = i === 0 ? 'none' : 'auto';

  const backgroundOrb = document.querySelector('.background-orb');
  if (backgroundOrb) {
    backgroundOrb.classList.add('hidden');
  }
}

// ------------------------------
// EVENT LISTENERS
// ------------------------------
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  quoteForm.classList.remove('hidden');
  formStepLabel.classList.remove('hidden');
  progressBar.classList.remove('hidden');
  showStep(current);
});

nextBtn.addEventListener('click', () => {
  const inputs = steps[current].querySelectorAll('input, textarea');
  const allValid = Array.from(inputs).every(input => input.checkValidity());
  if (!allValid) {
    inputs.forEach(input => input.reportValidity());
    return;
  }
  current++;
  showStep(current);
});

prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    showStep(current);
  }
});


// ------------------------------
// MAIL VALIDATION
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


// ------------------------------
// URL PARAM STEP SKIPPER
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const stepParam = new URLSearchParams(window.location.search).get("step");
  if (stepParam === "1") {
    startScreen.classList.add('hidden');
    quoteForm.classList.remove('hidden');
    formStepLabel.classList.remove('hidden');
    progressBar.classList.remove('hidden');
    current = 0;
    showStep(current);
  }
});

// ------------------------------
// CAL.COM EMBED + LISTENER
// ------------------------------
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
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

Cal("init", "discovery-call", { origin: "https://cal.com" });
Cal.ns["discovery-call"]("ui", {
  "hideEventTypeDetails": false,
  "layout": "month_view"
});

// ------------------------------
// EMAILJS SETUP
// ------------------------------
emailjs.init("72yexfrXpqwZWs_yj");

// ------------------------------
// BOOK BUTTON LISTENER
// ------------------------------
document.querySelector("#bookMeeting").addEventListener("click", () => {
  const name = document.querySelector('input[name="name"]')?.value?.trim();
  const email = document.querySelector('input[name="email"]')?.value?.trim();

  const quoteData = {
    projectType: document.querySelector('input[name="projectType"]:checked')?.value,
    pages: document.querySelector('input[name="pages"]:checked')?.value,
    timelineWeeks: document.getElementById('timeline')?.value,
    additionalNotes: document.querySelector('textarea[name="additionalNotes"]')?.value,
    business: document.querySelector('input[name="business"]')?.value,
    website: document.querySelector('input[name="website"]')?.value,
    requesterName: name,
    requesterEmail: email,
    estimatedPrice: calculatePrice(),
  };

  localStorage.setItem("quotePayload", JSON.stringify(quoteData));

  const calUrl = `https://cal.com/webwing-agency/discovery-call?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

  Cal("ui", {
    theme: "light",
    layout: "month_view",
    hideEventTypeDetails: false,
    url: calUrl,
  });
});


// ------------------------------
// SLIDER LABEL UPDATE
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("timeline");
  const output = document.getElementById("timeline-label");

  if (slider && output) {
    const updateLabel = () => {
      output.textContent = slider.value + " weeks";
    };
    updateLabel();
    slider.addEventListener("input", updateLabel);
  }
});

// ------------------------------
// PRICING CALCULATION
// ------------------------------
function calculatePrice() {
  const projectType = document.querySelector('input[name="projectType"]:checked')?.value;
  const pages = document.querySelector('input[name="pages"]:checked')?.value;
  const timeline = Number(document.getElementById('timeline')?.value);

  let basePrice = 20000;
  if (projectType === 'websiteRedesign') basePrice = 15000;
  else if (projectType === 'newWebsite') basePrice = 20000;

  let pagesPrice = 0;
  switch (pages) {
    case '1-5':   pagesPrice = 5000; break;
    case '10-20': pagesPrice = 12000; break;
    case '20+':   pagesPrice = 20000; break;
  }

  let timelinePrice = timeline <= 4 ? (5 - timeline) * 4000 : 0;

  let totalPrice = basePrice + pagesPrice + timelinePrice;
  totalPrice = Math.max(30000, Math.min(200000, totalPrice));

  return totalPrice;
}

