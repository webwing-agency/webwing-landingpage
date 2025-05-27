gsap.from('.contact-form-wrapper', {
    y: '-50',
    opacity: 0,
    filter: "blur(10px)",
    ease: 'power1.inOut',
    duration: 0.4,
  });
  
  gsap.from('.background-orb', {
    y: '50',
    opacity: 0,
    ease: 'power1.inOut',
    duration: 0.4,
  });
  