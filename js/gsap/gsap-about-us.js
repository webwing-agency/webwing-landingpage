gsap.registerPlugin(ScrollTrigger);

// Initial Animations
gsap.from('.start-section-title', {
  y: '-50',
  opacity: 0,
  filter: "blur(10px)",
  ease: 'power1.Out',
  delay: 0.2,
  duration: 0.4,
});

gsap.from('.circle', {
  y: '-50',
  delay: 0.2,
  opacity: 0,
  ease: 'power1.inOut',
  duration: 0.4,
});

gsap.from('.background-graphic', {
    y: '50',
    opacity: 0,
    ease: 'power1.inOut',
    duration: 0.4,
  });


  const scrollTriggerSettings = {
    trigger: ".about-us-section",
    start: "top bottom",
    end: "center 60%",
    scrub: true,
    once: true,
  };
  
  gsap.from('.left-side', {
    x: 100,
    opacity: 0,
    filter: "blur(50px)",
    ease: 'power1.inOut',
    scrollTrigger: scrollTriggerSettings
  });
  
  gsap.from('.right-side', {
    x: -100,
    opacity: 0,
    filter: "blur(50px)",
    ease: 'power1.inOut',
    scrollTrigger: scrollTriggerSettings
  });
  
  gsap.from('.standard-section h2', {
    y: 50,
    opacity: 0,
    filter: "blur(50px)",
    ease: 'power1.inOut',
    scrollTrigger: {
        trigger: ".standard-section",
        start: "top bottom",
        end: "center 60%",
        scrub: true,
        once: true,
    }
  });

  gsap.from('.standard-section .main-cta', {
    y: 50,
    opacity: 0,
    filter: "blur(50px)",
    ease: 'power1.inOut',
    scrollTrigger: {
        trigger: ".standard-section",
        start: "top bottom",
        end: "center 60%",
        scrub: true,
        once: true,
    }
  });