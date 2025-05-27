document.addEventListener("DOMContentLoaded", () => {
    // COMPONENT HTML SETUP
    const footerHTML = `
      <div class="footer-container">
        <div class="footer-top">
        <div class="footer-logo">
            <img src="assets/logo.svg" alt="Logo" class="footer-logo-img" />
        </div>
        <div class="footer-contact" style="display: none">
            <p> <a href="mailto:contact@webwing.agency" class="footer-link">contact@webwing.agency</a></p>
            <div class="footer-socials" style="display:none">
            <a href="#" aria-label="Instagram" class="footer-icon">
                <svg class="icon" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.5 3c-2.5 0-4.5 2.1-4.5 4.7 0 .37.04.73.12 1.07-3.75-.2-7.08-1.95-9.31-4.63a4.7 4.7 0 00-.61 2.37c0 1.63.83 3.07 2.1 3.91a4.45 4.45 0 01-2.03-.58v.06c0 2.28 1.6 4.18 3.72 4.62a4.5 4.5 0 01-2.02.08c.57 1.8 2.21 3.11 4.16 3.15A9 9 0 010 19.54 12.74 12.74 0 006.92 21c8.3 0 12.84-6.87 12.84-12.83 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" class="footer-icon">
                <svg class="icon" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48s1.34 2.98 2.98 2.98S7.96 8.12 7.96 6.48 6.62 3.5 4.98 3.5zM2.4 21h5.16V9H2.4v12zM9.84 21H15v-6.6c0-3.52 4.32-3.8 4.32 0V21H24V13.2c0-6.32-7.2-6.08-8.16-2.96V9h-5.16c.08 1.48 0 12 0 12z"/></svg>
            </a>
            </div>
        </div>
        </div>
        <div class="footer-bottom">
        <div>&copy; <span id="year"></span> Webwing. All rights reserved.</div>
        <a href="impressum.html" class="footer-legal">Impressum</a>
        </div>
    </div>
    `;
  
    // Ensure only the first element with the given ID is selected
    const footer = document.querySelector("footer#standard-footer");
    if (footer) {
      footer.innerHTML = footerHTML;
    }
  
    // Function to add the stylesheet only if it's not already present
    function addFooterStylesheet() {
      if (!document.querySelector('link[href="css/components/footer.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/components/footer.css';
        document.head.appendChild(link);
      }
    }
  
    // Call the function to add the stylesheet when the script runs
    addFooterStylesheet();

    // GSAP ScrollTrigger Animation for Footer

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('footer', {
    y: 50, 
    ease: 'power1.inOut', 
    scrollTrigger: {
        trigger: 'footer', 
        start: 'top bottom',
        end: 'center bottom',
        scrub: true,
    }
    });

});

