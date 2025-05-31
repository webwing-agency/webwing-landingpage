// ------------------------------
// WRAP EVERYTHING IN DOMContentLoaded TO ENSURE ELEMENTS EXIST
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {
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
const output        = document.getElementById("timeline-label");
const bookMeetingBtn = document.getElementById("bookMeeting");

let current = 0;

// ------------------------------
// UI SETUP (initial hides, styles)
// ------------------------------
if (progressBar) {
progressBar.classList.add('hidden');
}
if (prevBtn) {
prevBtn.style.opacity = '0';
prevBtn.style.pointerEvents = 'none';
}
if (formStepLabel) {
formStepLabel.classList.add('hidden');
}

function updateFormStepLabel() {
if (!formStepLabel) return;
formStepLabel.textContent = `Step ${current + 1} of ${steps.length}`;
}

function showStep(i) {
// Show/hide each .step element based on index
steps.forEach((step, idx) => {
  step.classList.toggle('hidden', idx !== i);
  step.classList.toggle('active', idx === i);
});

// Update progress-bar width (percentage)
const pct = (i) / (steps.length - 1) * 100;
if (progress) {
  progress.style.width = pct + '%';
}

// If it's the last step, mark progress as final and hide next button
if (i === steps.length - 1) {
  if (progress) progress.classList.add('final-step');
  if (nextBtn) nextBtn.classList.add('hidden');
  bgCircle.forEach(el => el.style.background = "darkgreen");
} else {
  if (progress) progress.classList.remove('final-step');
  if (nextBtn) nextBtn.classList.remove('hidden');
  bgCircle.forEach(el => el.style.background = "");
}

// Hide the heading once we move into the form
if (quoteHeading) {
  quoteHeading.classList.add('hidden');
}
updateFormStepLabel();

// Toggle prevBtn visibility
if (prevBtn) {
  prevBtn.style.opacity = i === 0 ? '0' : '1';
  prevBtn.style.pointerEvents = i === 0 ? 'none' : 'auto';
}

// Hide any .background-orb if present
const backgroundOrb = document.querySelector('.background-orb');
if (backgroundOrb) {
  backgroundOrb.classList.add('hidden');
}
}

// ------------------------------
// EVENT LISTENERS: START / NEXT / PREV
// ------------------------------
if (startBtn) {
startBtn.addEventListener('click', () => {
  if (startScreen) startScreen.classList.add('hidden');
  if (quoteForm) quoteForm.classList.remove('hidden');
  if (formStepLabel) formStepLabel.classList.remove('hidden');
  if (progressBar) progressBar.classList.remove('hidden');
  current = 0;
  showStep(current);
});
}

if (nextBtn) {
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
}

if (prevBtn) {
prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    showStep(current);
  }
});
}

// ------------------------------
// SLIDER LABEL UPDATE
// ------------------------------
if (slider && output) {
const updateLabel = () => {
  const weeks = parseInt(slider.value, 10);
  const unit  = weeks === 1 ? "week" : "weeks";
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
  const calBookUrl = `https://cal.com/webwing-agency/discovery-call?` +
                     `name=${encodeURIComponent(name)}` +
                     `&email=${encodeURIComponent(email)}`;

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

