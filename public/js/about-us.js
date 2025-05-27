document.addEventListener("DOMContentLoaded", () => {
    const mainCta = document.querySelector('.standard-section .main-cta');
    const h2 = document.querySelector('.standard-section h2');
    
    mainCta.addEventListener('mouseenter', () => {
      h2.classList.add('hide-after');
    });
    
    mainCta.addEventListener('mouseleave', () => {
      h2.classList.remove('hide-after');
    });
});
