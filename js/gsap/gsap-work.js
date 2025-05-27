gsap.registerPlugin(ScrollTrigger);

// Initial Animations
gsap.from('.start-section-title', {
  y: '-50',
  opacity: 0,
  filter: "blur(10px)",
  ease: 'power1.inOut',
  duration: 0.4,
});

gsap.from('.circle', {
  y: '-50',
  delay: 0.2,
  opacity: 0,
  ease: 'power1.inOut',
  duration: 0.4,
});

gsap.from('#card1', {
    y: '50',
    delay: 0.2,
    opacity: 0,
    ease: 'power1.inOut',
    duration: 0.4,
  });


  gsap.from('#card2', {
    y: '50',
    opacity: 0,
    ease: 'power1.inOut',
    scrollTrigger: { // lowercase 's'
      trigger: "#card2",
      start: "top bottom",
      end: "top 30%",
      scrub: true,
    }
  });
  
  gsap.from('#card3', {
    y: '50',
    opacity: 0,
    ease: 'power1.inOut',
    scrollTrigger: { // lowercase 's'
      trigger: "#card3",
      start: "top bottom",
      end: "top 30%",
      scrub: true,
    }
  });
  