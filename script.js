document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // ====================================================
    // 1. UNIVERSAL FADE-IN FIX (Prevents White Screen)
    // ====================================================
    
    // Add a temporary class to hide the body initially via JS right before the content loads
    body.classList.add('initial-hide');
    body.style.transition = 'opacity 1s ease-out';
    
    // Remove the class immediately after a tiny delay, making the whole page fade in smoothly
    setTimeout(() => {
        body.classList.remove('initial-hide');
    }, 50); 


    // ====================================================
    // 2. SCROLL-REVEAL EFFECT (Universal for all pages)
    // ====================================================
    
    // Select ALL relevant structural elements and tag them for the scroll effect
    const revealElements = document.querySelectorAll(
        'h1, h2, hr, a, table, pre strong, footer, body:not(:has(header))'
    );
    
    // Add the class needed for the CSS animation to take effect
    revealElements.forEach(element => {
        // Exclude the main H1 title on the index page as it has its own CSS animation
        if (element.tagName !== 'H1' || !element.closest('header')) {
             element.classList.add('scroll-reveal-item');
        }
    });

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When element enters viewport, add 'revealed' class
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe only the tagged elements
    document.querySelectorAll('.scroll-reveal-item').forEach(element => {
        observer.observe(element);
    });
    

    // ====================================================
    // 3. HOMEPAGE H1 GLITCH EFFECT (Replaced with a dynamic pulse)
    // ====================================================
    const glitchH1 = document.querySelector('header h1');
    if (glitchH1) {
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes intensePulse {
                0% { text-shadow: var(--shadow-glow); }
                50% { text-shadow: 0 0 40px var(--secondary-color), 0 0 15px var(--accent-color); }
                100% { text-shadow: var(--shadow-glow); }
            }
            .intense-pulse {
                animation: intensePulse 2s linear infinite alternate;
            }
        `;
        document.head.appendChild(pulseStyle);
        glitchH1.classList.add('intense-pulse');
    }

    // ====================================================
    // 4. NOTICES PAGE LIVE DATE ENHANCEMENT
    // ====================================================
    const liveDateElement = document.getElementById('liveDate');
    if (liveDateElement) {
        // Add a click effect that shakes the date element
        liveDateElement.addEventListener('click', () => {
            liveDateElement.style.animation = 'none'; 
            void liveDateElement.offsetWidth;
            liveDateElement.style.animation = 'shake 0.3s ease-in-out'; // Faster shake
            setTimeout(() => {
                liveDateElement.style.animation = 'pulseBorder 1.5s infinite alternate';
            }, 300); // Resume pulse after shake
        });

        const shakeStyle = document.createElement('style');
        shakeStyle.textContent += `
            @keyframes shake {
                0% { transform: translate(0); }
                25% { transform: translate(-8px, -2px) rotate(-1.5deg); }
                50% { transform: translate(8px, 2px) rotate(1.5deg); }
                75% { transform: translate(-8px, -2px) rotate(-1.5deg); }
                100% { transform: translate(0); }
            }
        `;
        document.head.appendChild(shakeStyle);
    }
});