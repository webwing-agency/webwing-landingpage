document.addEventListener("DOMContentLoaded", () => {
  // Register the Head plugin
  barba.use(barbaHead);

  barba.init({
    transitions: [
      {
        name: 'fade-transition',

        leave(data) {
          const popupCards = data.current.container.querySelector('.popup-menu-card');
          return gsap.to(popupCards, {
            opacity: 0, // Fading OUT
            duration: 0.5,
            ease: 'power2.out'
          });
        },

        enter(data) {
          const main         = data.next.container.querySelector('main');
          const contactForm  = data.next.container.querySelector('.contact-form-wrapper');
          const quote        = data.next.container.querySelector('.quote-wrapper');

          const tl = gsap.timeline();

          tl.set(main, { opacity: 0 });

          tl.from(contactForm, {
            y: 50,
            opacity: 0,
            filter: "blur(10px)",
            ease: 'power1.inOut',
            duration: 0.4
          });

          tl.from(main, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
          }, "<"); // overlap with previous

          tl.from(quote, {
            opacity: 0,
            y: -50,
            duration: 0.4
          }, "<"); // also overlap

          return tl;
        }
      }
    ]
  });
});
