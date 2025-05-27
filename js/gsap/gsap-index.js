
  // ────────────────────────────────────────────────────────────────────────────────
  // Register GSAP + ScrollTrigger once
  // ────────────────────────────────────────────────────────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ────────────────────────────────────────────────────────────────────────────────
  // HERO SEQUENCE (video fade, heading blur, scroll-fade, text swap)
  // ────────────────────────────────────────────────────────────────────────────────
  gsap.to(".background-video", {
    opacity: 0,
    scrollTrigger: { trigger: ".hero-section", start: "10% top",   end: "40% top",   scrub: true }
  });
  gsap.to(".video-overlay-fade", {
    opacity: 0,
    scrollTrigger: { trigger: ".hero-section", start: "center top", end: "bottom top", scrub: true }
  });
  gsap.to(".hero-section-title", {
    opacity: 0, y: -10, filter: "blur(5px)", ease: "out",
    scrollTrigger: { trigger: ".hero-section", start: "25% top",   end: "center top", scrub: true }
  });
  gsap.to(".hero-subtitle", {
    opacity: 0, y: -10, filter: "blur(5px)", ease: "out",
    scrollTrigger: { trigger: ".hero-section", start: "35% top",   end: "60% top",     scrub: true }
  });
  gsap.to(".hero-section .cta-wrapper", {
    opacity: 0, y: -10, filter: "blur(5px)", ease: "out",
    scrollTrigger: { trigger: ".hero-section", start: "35% top",   end: "60% top",     scrub: true }
  });

  // generic scroll-fade in multiple sections
  [
    { sel: ".hero-section",  start: "top top",    end: "25% top"    },
    { sel: ".offer-section", start: "top bottom", end: "50vh bottom" }
  ].forEach(o => {
    gsap.from(".scroll-fade", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".hero-section",
        start:   "top top",
        end:     "25% top",
        scrub:   true
      }
    });
  });

  gsap.to(".scroll-fade", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".offer-section",
      start: "top top",
      end: "25% top",
    }
  });

  // scroll-reminder text swap
  document.querySelectorAll(".scroll-reminder > span").forEach((span, i) => {
    if ((i + 1) % 2 === 0) return;
    const original = span.textContent;
    ScrollTrigger.create({
      trigger: ".hero-section",
      start:   "25% top",
      end:     "center top",
      scrub:   true,
      onUpdate: self => {
        const p = self.progress;
        span.textContent = p < 0.5 ? original : "watch reel";
        gsap.to(span, {
          opacity: p < 0.5 ? 1 - p * 2 : (p - 0.5) * 2,
          duration: 0.1,
          overwrite: true
        });
      }
    });
  });

  // ────────────────────────────────────────────────────────────────────────────────
  // VIDEO SECTION
  // ────────────────────────────────────────────────────────────────────────────────
  if (window.innerWidth >= 1025) {
      gsap.from(".main-video", {
      opacity: 0, y: 200, filter: "blur(10px)", ease: "in",
      scrollTrigger: {
        trigger: ".video-section",
        start: "10% bottom",
        end:   "top 25%",
        scrub: true
      }
      });
  }

  gsap.to(".background-video", {
    display: "none",
    scrollTrigger: {
      trigger: ".main-video",
      start: "top bottom",
      end:   "center center",
      scrub: true
    }
  });

  // ────────────────────────────────────────────────────────────────────────────────
  // OFFER SECTION (title + staggered cards)
  // ────────────────────────────────────────────────────────────────────────────────
  // OFFER SECTION TITLE
  gsap.from(".offer-section-title", {
    opacity: 0,
    y: 30,
    ease: "power2.out",
    filter: "blur(10px)",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".offer-section",
      start:   "top bottom",
      end: "35% bottom",
      toggleActions: "play none none none",
      once: true,
      scrub: true
    }
  });

  // OFFER SECTION CARDS (staggered, no “bounce”, now visible)
  if (window.innerWidth >= 1025) {
      gsap.set(".offer-section .card", { opacity: 0, y: 40 }); // ensure starting hidden

      gsap.to(".offer-section .card", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".offer-section",
          start: "top 80%",
          toggleActions: "play none none none",
          once: true
        }
      });
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // BACKGROUND ORB & PROJECTS REVEAL
  // ────────────────────────────────────────────────────────────────────────────────
  // ORB animation
  const orb = document.querySelector(".background-orb");

  // Only run the animation if screen width is 700px or more
  if (window.innerWidth >= 700 && orb) {
    // Detect orientation
    const isPortrait = window.innerHeight > window.innerWidth;
  
    // Set initial position
    gsap.set(orb, {
      x: "5vw",
      y: "-10vh",
      filter: "blur(200px)",
      scale: 1,
      transform: "translate(-50%, -50%)"
    });
  
    // Adjust y-values for portrait mode
    const yMid = "60vh";
    const yFinal = isPortrait ? "127vh" : "190vh";
  
    // Animate with scroll
    gsap.timeline({
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top bottom",
        end: "75% top",
        scrub: true
      }
    })
    .to(orb, {
      opacity: 1,
      x: "90vw",
      y: yMid,
      scale: 0.9,
      ease: "power2.inOut"
    })
    .to(orb, {
      opacity: 1,
      x: "40vw",
      y: yFinal,
      scale: 1.3,
      filter: "blur(0px)",
      ease: "power2.inOut"
    });
  }
  

  // PROJECT SECTION — reversed stagger (right to left)
  if (window.innerWidth >= 1025) {
      gsap.set(".projects-section .card", { opacity: 0, y: 40 });

      gsap.to(".projects-section .card", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: {
          each: 0.2,
          from: "end" // this is the magic line: animates last element first
        },
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%",
          toggleActions: "play none none none",
          once: true
        }
      });
  }

  // PROJECT TITLE — fade in and move up
  gsap.from(".projects-section-title", {
    opacity: 0,
    y: 30,
    ease: "power2.out",
    filter: "blur(10px)",
    scrollTrigger: {
      trigger: ".projects-section",
      start:   "top bottom",
      end: "25% bottom",
      toggleActions: "play none none none",
      scrub: true,
      once: true
    }
  });

  // Refresh ScrollTrigger once everything is loaded
  window.addEventListener("load", () => ScrollTrigger.refresh());

  // BG LINE 
  gsap.to(".bg-svg-line", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top 30%",
      end: "top 10%",
      scrub: true,
    },   
  });

  // FOOTER
  if (window.innerWidth >= 1025) {
    gsap.to('footer',{
        y: '0vh',
        ease: 'ease.in',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top bottom',
          end: 'bottom bottom',
          toggleActions: 'play none none none',
          scrub: true,
        }
      }
    );
  }

  // Initial Animations
  gsap.from('.hero-section-title',{
    y: '-50',
    opacity: 0,
    filter: "blur(10px)",
    ease: 'ease.inOut',
    duration: 0.4,
  });

  gsap.from('.hero-subtitle',{
    y: '-30',
    delay: 0.1,
    opacity: 0,
    ease: 'ease.inOut',
    duration: 0.4,
  });

