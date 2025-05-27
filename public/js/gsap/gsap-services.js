gsap.from(".service-card", {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.16666,
  });

  gsap.from(".start-section-title", {
    opacity: 0,
    y: "-50",
    filter: "blur(10px)",
    duration: 0.7,
    ease: "power2.out",
  });
