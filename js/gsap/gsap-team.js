gsap.registerPlugin(ScrollTrigger);


// Initial Animations

gsap.from('.start-section-title',{
    y: '-50',
    opacity: 0,
    filter: "blur(10px)",
    ease: 'ease.inOut',
    duration: 0.4,
  });
  
  gsap.from('.background-graphic',{
    y: '-50',
    delay: 0.2,
    opacity: 0,
    ease: 'ease.inOut',
    duration: 0.4,
  });

  gsap.from('.background-gradient',{
    y: '50',
    delay: 0.1,
    opacity: 0,
    ease: 'ease.inOut',
    duration: 0.4,
  });


// Background Stars Fade-Out

gsap.to('.background-stars',{
      opacity: 0,
      scrollTrigger: {
        trigger: '.mystery-section',
        start: 'top bottom',
        end: 'bottom bottom',
        toggleActions: 'play none none none',
        scrub: true,
      }
    }
  );

// Start Section Fade-Out

const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".start-section",
      start: "bottom 90%",
      end:   "bottom center",
      scrub: true,
    }
  });
  
  tl1.to(".start-section-title", { y: -100, opacity: 0, ease: "power2.out" })
    .to(".background-gradient", { autoAlpha: 0, ease: "power2.out" }, 0)
    .to(".background-graphic", { autoAlpha: 0, ease: "power2.out" }, 0);
  
// "Mystery" Section 

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".mystery-section",
    start: "top 10%",
    end: "+=400",        // extend scroll range
    pin: ".mystery-section",
    scrub: true,
  }
});

// fade in the cards, staggered more gently
tl2.from(".mystery-section .card", { 
  opacity: 0,
  y: 75,                // a little more travel for a slower feel
  stagger: {            // slower, more organic stagger
    each: 0.8,
    ease: "power2.out"
  },
  duration: 1.5,        // slower fade-in
  ease: "power2.out"
});

// hold them on screen a bit longer
tl2.to(
  ".mystery-section .card",
  { duration: 1 },      // dummy tween so there's a pause
  "+=3"
);

// fade out the whole section very gradually
tl2.to(
  ".mystery-section",
  { opacity: 0, duration: 5, ease: "power1.inOut" },
  "+=1"
);

  

// Reveal Section Text Animation

gsap.registerPlugin(DrawSVGPlugin);

// grab elements
const svgContainer = document.querySelector(".wavy-gradient-line-container");
const svgEl        = svgContainer.querySelector("svg");
const path         = svgEl.querySelector("path");

// initial states
gsap.set(["#word1"],                       {y: -50, autoAlpha: 0});
gsap.set(["#word2", "#word3","#word3", "#word4"],    { autoAlpha: 0, width: 0});
gsap.set(svgContainer,                     { autoAlpha: 0, width: 0, overflow: "hidden" });
gsap.set(svgEl,                            { autoAlpha: 1, scaleY: 1, transformOrigin: "left center" });
gsap.set(path,                             { drawSVG: "0%" });
gsap.set("#word4",                         { autoAlpha: 0, width: 0, transformOrigin: "left center" });


// build timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".reveal-section",
    start:   "top 25%",
    end:     "+=700",
    scrub:   0,
    pin:     ".reveal-section",
  }
});


// 1) fade in "we"
gsap.set(".reveal-section-text span", {margin: 0, padding: 0})

tl.to("#word1", { autoAlpha: 1, duration: 1, y: 0});

// 2) expand hit-box + draw wave in
tl.to(path, { drawSVG: "100%", duration: 2, ease: "power2.inOut" }, "+=0.1")
  .to(svgContainer, { width: "20vw", padding: "0px 15px", autoAlpha: 2, duration: 1, ease: "power1.in"}, "<0.5");
  tl.to("#word1", { marginRight: 15, duration: 1}, "<0.2");

// 3) fade in "are"
tl.to("#word2", { width: "12vw", marginRight: 15, duration: 1 }, "<");
tl.to("#word2", { autoAlpha: 1, duration: 1 }, "<0.95");

// 4) retract wave + 5) fade in "solo" with gradient underline (all at once)
tl.to(svgContainer, { marginRight: 15, duration: 0.5, ease: "power4.in" }, "<")
  .to(svgContainer, { width: 0, marginRight: 0, padding: 0, duration: 1.2, ease: "power1.inOut" }, "<1")
  .to("#word3", { autoAlpha: 1, marginRight: 15, width: "auto", duration: 1 }, "<0.3")
  // ← set up gradient-underline (no typo, no clipping)
  .set("#word3", {
    backgroundImage:    "linear-gradient(90deg, #9500FF, #EA00FF)",
    backgroundSize:     "0% var(--underline-size)",
    backgroundRepeat:   "no-repeat",
    backgroundPosition: "0 100%",
  }, "<")
  // ← animate it
  .to("#word3", {
    backgroundSize: "100% var(--underline-size)",
    duration: 1,
    ease: "power1.out"
  }, "<")
  
// …then reveal the next word etc.


// 6) reveal word4
tl.to("#word4", { width: "12vw", marginRight: 15, autoAlpha: 1, duration: 1, ease: "power1.inOut" }, ">0.5")
  .set("#word3", { backgroundPosition: "100% 100%" }, "<")
  .to("#word3", { backgroundSize: "0% var(--underline-size)", duration: 1, ease: "power1.out" }, "<")
  .set("#gradient", {
    color:                 "transparent",
    backgroundClip:        "text",
    WebkitBackgroundClip:  "text",
    backgroundImage:       "linear-gradient(to bottom, #9500FF, #EA00FF)"
  }, "<0.2");


  // Card Image Move-In

  function initFounderAnimation() {
    const cards   = gsap.utils.toArray(".founder-image");
    if (!cards.length) return;           // safe-guard
    const count   = cards.length;
    const radiusX = 40, radiusY = 25, pullIn = 7.5;
  
    cards.forEach((card,i) => {
      const t     = i/(count-1);
      const angle = Math.PI - Math.PI * t;
      let   xEnd  = radiusX * Math.cos(angle);
      const yEnd  = -radiusY * Math.sin(angle);
      const rot   = -40 + 80 * t;
  
      if (i === 1 || i === 3) xEnd -= Math.sign(xEnd) * pullIn;
  
      gsap.fromTo(card,
        { xPercent:-50, yPercent:-50, x:0, y:0, rotate:0 },
        {
          x:      `${xEnd}vw`,
          y:      `${yEnd}vh`,
          rotate: rot,
          ease:   "power2.out",
          scrollTrigger: {
            trigger: ".founder-section",
            start:   "top 80%",
            end:     "top 40%",
            scrub:   true,
          }
        }
      );
    });
  
    // ... your other reveal-section and title animations ...
  }
  
  // somewhere in your dynamic loader code:
  loadCards().then(() => {
    initFounderAnimation();
    ScrollTrigger.refresh();  // recalculate start/end positions
  });
  

  gsap.to(".reveal-section", {
    opacity: 0,
    scrollTrigger: {
        trigger: ".founder-section",
        start:   "top 80%",
        end:     "top 40%",
        scrub:   true
      }
  });

  gsap.from(".founder-section-title", {
    y: 50,
    opacity: 0,
    scrollTrigger: {
        trigger: ".founder-section-title",
        start:   "top bottom",
        end:     "bottom bottom",
        scrub:   true
      }
  });
