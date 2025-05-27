gsap.registerPlugin(CSSPlugin);

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".large-cta");
  const orb    = document.querySelector(".background-orb");
  const svgEl  = document.querySelector(".bg-svg-line");
  const yearEl = document.getElementById("year");
  if (!button || !orb || !svgEl || !yearEl) return;

  // Inject current year
  yearEl.textContent = new Date().getFullYear();

  // Conventional GSAP hover tweens
  button.addEventListener("mouseenter", () => {
    gsap.to(orb, {
      opacity: 0,
      filter: "blur(50px)",
      scale: 1.4,
      duration: 1,
      ease: "power2.out"
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(orb, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1.3,
      duration: 0.75,
      ease: "power2.out"
    });
  });


  // SVG line animation setup
  const pathsData = Array.from(svgEl.querySelectorAll(".animated-path")).map(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray  = length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();
    return { path, length };
  });
  if (!pathsData.length) return;

  let ticking = false;
  const update = () => {
    const rect = svgEl.getBoundingClientRect();
    const start = window.innerHeight;
    const end   = -rect.height;
    const progress = Math.min(Math.max((start - rect.top)/(start - end), 0), 1);

    pathsData.forEach(({ path, length }) => {
      path.style.strokeDashoffset = length * (1 - progress);
    });
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // Initial draw
  update();
});
