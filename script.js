document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            
            // Interaction with interactive elements
            const target = e.target;
            if (target.closest('a') || target.closest('.btn') || target.closest('.card')) {
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)';
            } else {
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)';
            }
        });
    } else {
        cursorGlow.style.display = 'none'; // hide on mobile
    }

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animating in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade-in-up elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Staggered lists (projects, timeline, skills)
    const staggerContainers = [
        document.querySelector('.projects-grid'),
        document.querySelector('.timeline'),
        document.querySelector('.skills-grid')
    ];

    staggerContainers.forEach(container => {
        if (!container) return;
        
        const items = container.querySelectorAll('.stagger-in');
        
        // Setup observer for each item with delay based on index
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
