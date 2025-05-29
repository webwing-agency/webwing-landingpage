document.addEventListener("DOMContentLoaded", () => {
    const standardCtaHTML = `
        <div class="main-cta-gradient"></div>
        <a href="get-a-quote.html" class="main-cta-link">
            Get a Quote
            <svg class="main-cta-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </a>
    `;

    const standardCtaHTML_contact = `
        <div class="main-cta-gradient"></div>
        <a href="get-a-quote.html" class="main-cta-link">
            Contact Me
            <svg class="main-cta-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </a>
    `;

    const largeCtaHTML = `
        <span class="gradient-bg"></span>
        <span class="get-a-quote-button-content">
            <span>Get a Quote</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </span>
    `;

    document.querySelectorAll(".standard-cta").forEach(cta => {
        cta.innerHTML = standardCtaHTML;
    });

    document.querySelectorAll(".standard-cta-contact").forEach(cta => {
        cta.innerHTML = standardCtaHTML_contact;
    });

    document.querySelectorAll(".large-cta").forEach(cta => {
        cta.innerHTML = largeCtaHTML;
    });

    function addCtaStylesheet() {
        if (!document.querySelector('link[href="css/components/cta.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/components/cta.css';
            document.head.appendChild(link);
        }
    }

    addCtaStylesheet();

    const largeCta = document.querySelector(".large-cta")
    const bgOrb = document.querySelector(".background-orb")

    largeCta.addEventListener("mouseenter", () => {
        gsap.to(bgOrb, {opacity : 0, duration: 0.3, ease : "ease.inOuts"})
    })

    largeCta.addEventListener("mouseleave", () => {
        gsap.to(bgOrb, {opacity : 1, duration: 0.3, ease : "ease.inOuts"})
    })
});
