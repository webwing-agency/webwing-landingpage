document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav#standard-nav");
  if (!nav) return;

  // 1. Load the nav stylesheet (once)
  function addNavStylesheet() {
    return new Promise(resolve => {
      // If already present, resolve immediately
      const existing = document.querySelector('link[href="css/components/nav.css"]');
      if (existing) {
        // If it’s already loaded, the browser may have fired onload;
        // best effort: resolve on next tick.
        return setTimeout(resolve, 0);
      }

      // Otherwise, inject and wait for it
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/nav.css";
      link.onload = () => resolve();
      // Optionally: link.onerror = () => resolve(); // fail-safe
      document.head.appendChild(link);
    });
  }

  // 2. Once CSS is ready, inject HTML, run animations, and reveal
  addNavStylesheet().then(() => {
    // — Inject nav markup
    nav.innerHTML = `
      <img class="nav-logo compact-logo" src="assets/compact-logo-white.svg" alt="Webwing Logo" width="50" height="50">
      <div class="menu-wrapper">
        <div class="hamburger-menu">
          <div class="bar"></div><div class="bar"></div><div class="bar"></div>
        </div>
        <div class="popup-menu">
          <div class="popup-menu-card">
            <div class="main-link-wrapper">
              <a class="main-link link_animated" href="/">Home</a>
              <a class="main-link link_animated" href="services">Services</a>
              <a class="main-link link_animated" href="work">Work</a>
              <a class="main-link link_animated" href="about-us">About Us</a>
              <a class="main-link link_animated" href="team">Team</a>
            </div>
          </div>
          <div class="popup-menu-card">
            <div class="main-cta-wrapper">
              <div class="main-cta standard-cta"></div>
            </div>
            <div class="secondary-cta-wrapper">
              <div class="secondary-cta">
                <a href="contact" class="main-link">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gradient-blur-mask"></div>
    `;

    // — Reveal the nav
    nav.style.visibility = "visible";

    // — Letter animation
    (function runLetterAnimation() {
      document.querySelectorAll(".link_animated").forEach(link => {
        const text = link.textContent.trim();
        link.innerHTML = ""; 
        const block = document.createElement("div");
        block.classList.add("block");
        for (let char of text) {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\xa0" : char;
          span.classList.add("letter");
          block.appendChild(span);
        }
        link.append(block, block.cloneNode(true));
        link.addEventListener("mouseover", () => link.classList.remove("play"));
      });
    })();

    // — Hamburger/menu logic (unchanged)
    const hamburger = document.querySelector(".hamburger-menu");
    const popupMenu = document.querySelector(".popup-menu");
    const popupCards = document.querySelectorAll(".popup-menu-card");
    const overlay = document.querySelector(".gradient-blur-mask");
    const bars = document.querySelectorAll(".bar");
    let isOpen = false;

    hamburger.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        overlay.style.display = "flex"; overlay.style.opacity = 0;
        gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power1.out" });
        popupMenu.style.display = "flex";
        gsap.fromTo(popupCards[0], { opacity: 0, y: 20, scale: 0.95 },
                                 { opacity: 1, y: 0, scale: 1, rotate: -5, duration: 0.5 });
        gsap.fromTo(popupCards[1], { opacity: 0, y: 20, scale: 0.95 },
                                 { opacity: 1, y: 0, scale: 1, rotate: 3, duration: 0.5, delay: 0.05 });
        gsap.to(bars[0], { rotate: 45, y: 8.5, duration: 0.3 });
        gsap.to(bars[1], { opacity: 0, duration: 0.2 });
        gsap.to(bars[2], { rotate: -45, y: -8.5, duration: 0.3 });
      } else {
        gsap.to(popupCards, { opacity: 0, y: 20, scale: 0.95, duration: 0.3, stagger: 0.05,
          onComplete: () => popupMenu.style.display = "none"
        });
        gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => overlay.style.display = "none" });
        gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3 });
        gsap.to(bars[1], { opacity: 1, duration: 0.2 });
        gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3 });
      }
    });

    popupMenu.addEventListener("mouseleave", () => {
      if (!isOpen) return;
      gsap.to(popupCards, { opacity: 0, y: 20, scale: 0.95, duration: 0.3, stagger: 0.2,
        onComplete: () => { popupMenu.style.display = "none"; isOpen = false; }
      });
      gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => overlay.style.display = "none" });
      gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(bars[1], { opacity: 1, duration: 0.2 });
      gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3 });
    });

    // — Logo click
    document.querySelector(".nav-logo")
      .addEventListener("click", () => window.location.href = "/");

    // — Link-click menu teardown
    document.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        gsap.to(".popup-menu-card", { opacity: 0, duration: 0.5, scale: 0.95 });
        gsap.to(".gradient-blur-mask", { opacity: 0, duration: 0.4 });
        gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3 });
        gsap.to(bars[1], { opacity: 1, duration: 0.2 });
        gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3 });
      });
    });
  });
});
