document.addEventListener("DOMContentLoaded", () => {
  // COMPONENT HTML SETUP
  const navHTML = `
    <img class="nav-logo compact-logo" src="assets/compact-logo-white.svg" alt="Webwing Webdesign Agency Logo">

    <div class="menu-wrapper">
        <div class="hamburger-menu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>

        <div class="popup-menu">
            <div class="popup-menu-card">
                <div class="main-link-wrapper">
                    <a class='main-link link_animated' href='index.html'>Home</a>
                    <a class='main-link link_animated' href='services.html'>Services</a>
                    <a class='main-link link_animated' href='work.html'>Work</a>
                    <a class='main-link link_animated' href='about-us.html'>About Us</a>   
                    <a class='main-link link_animated' href='team.html'>Team</a>  
                </div>
            </div>

            <!-- Navigation CTAs -->
            <div class="popup-menu-card">
              <div class="main-cta-wrapper">
                  <div class="main-cta standard-cta">
                      
                  </div>
              </div>

            <div class="secondary-cta-wrapper">
                <div class="secondary-cta">
                  <a href="contact.html" class="main-link">Contact</a>
                </div>
            </div>
            </div>
        </div>
    </div>
    <div class="gradient-blur-mask"></div>
  `;

  // Ensure only the first element with the given ID is selected
  const nav = document.querySelector("nav#standard-nav");
  if (nav) {
    nav.innerHTML = navHTML;
  }

  // Function to add the stylesheet only if it's not already present
  function addNavStylesheet() {
    if (!document.querySelector('link[href="css/components/nav.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'css/components/nav.css';
      document.head.appendChild(link);
    }
  }

  // Call the function to add the stylesheet when the script runs
  addNavStylesheet();

  // LETTER ANIMATION LOGIC
  function runLetterAnimation() {
    let animatedLinks = document.querySelectorAll(".link_animated");

    animatedLinks.forEach((singleAnimatedLink) => {
      let innerText = singleAnimatedLink.innerText;
      singleAnimatedLink.innerHTML = "";

      let textContainer = document.createElement("div");
      textContainer.classList.add("block");

      for (let letter of innerText) {
        let span = document.createElement("span");
        span.innerText = letter.trim() === "" ? "\xa0" : letter;
        span.classList.add('letter');
        textContainer.appendChild(span);
      }

      singleAnimatedLink.appendChild(textContainer);
      singleAnimatedLink.appendChild(textContainer.cloneNode(true));
    });

    animatedLinks.forEach((singleAnimatedLink) => {
      singleAnimatedLink.addEventListener('mouseover', () => {
        singleAnimatedLink.classList.remove('play');
      });
    });
  }

  runLetterAnimation();

  // COMPONENT JS LOGIC

  // Select the necessary DOM elements
  const hamburger = document.querySelector('.hamburger-menu');
  const popupMenu = document.querySelector('.popup-menu');
  const popupCards = document.querySelectorAll('.popup-menu-card');
  const overlayBlur = document.querySelector('.gradient-blur-mask');
  // Select all .bar elements (assumes you have exactly 3)
  const bars = document.querySelectorAll('.bar');

  let isOpen = false;

  hamburger.addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen) {
      // Show & fade in overlay
      overlayBlur.style.display = 'flex';
      overlayBlur.style.opacity = '0';
      gsap.to(overlayBlur, {
        opacity: 1,
        duration: 0.4,
        ease: "power1.out"
      });

      // Show menu
      popupMenu.style.display = 'flex';

      // Animate cards in
      gsap.fromTo(popupCards[0],
        { opacity: 0, y: 20, scale: 0.95, rotate: 0 },
        { opacity: 1, y: 0, scale: 1, rotate: -5, duration: 0.5, ease: "power1.out" }
      );
      gsap.fromTo(popupCards[1],
        { opacity: 0, y: 20, scale: 0.95, rotate: 0 },
        { opacity: 1, y: 0, scale: 1, rotate: 3, duration: 0.5, ease: "power1.out", delay: 0.05 }
      );

      // Hamburger → X
      gsap.to(bars[0], { rotate: 45, y: 8.5, duration: 0.3, ease: "power2.inOut" });
      gsap.to(bars[1], { opacity: 0, duration: 0.2, ease: "power2.inOut" });
      gsap.to(bars[2], { rotate: -45, y: -8.5, duration: 0.3, ease: "power2.inOut" });

    } else {
      // Animate cards out, then hide menu
      gsap.to(popupCards, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power1.in",
        stagger: { each: 0.05, from: "end" },
        onComplete: () => {
          popupMenu.style.display = 'none';
        }
      });

      // Fade out overlay, then hide it
      gsap.to(overlayBlur, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => {
          overlayBlur.style.display = 'none';
        }
      });

      // X → hamburger
      gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(bars[1], { opacity: 1, duration: 0.2, ease: "power2.inOut" });
      gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
    }
  });

  popupMenu.addEventListener('mouseleave', () => {
    if (!isOpen) return;

    // Animate cards out, then hide menu
    gsap.to(popupCards, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      ease: "power1.in",
      stagger: { each: 0.2, from: "end" },
      onComplete: () => {
        popupMenu.style.display = 'none';
        isOpen = false;
      }
    });

    // Fade out overlay, then hide it
    gsap.to(overlayBlur, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.in",
      onComplete: () => {
        overlayBlur.style.display = 'none';
      }
    });

    // Reset hamburger
    gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
    gsap.to(bars[1], { opacity: 1, duration: 0.2, ease: "power2.inOut" });
    gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
  });

  // Navlogo = Home Link

  const navLogo = document.querySelector(".nav-logo");

  navLogo.addEventListener("click", () => {
    window.location.href = "index.html"; // Navigate to index.html
  });

  const links = document.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", () => {
      gsap.to(".popup-menu-card", {
        opacity: 0,
        duration: 0.5,
        rotation: 0,
        scale: 0.95,
        ease: 'power2.out'
      });
      gsap.to(".gradient-blur-mask", {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(bars[1], { opacity: 1, duration: 0.2, ease: "power2.inOut" });
      gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
    });
  });
  

});
