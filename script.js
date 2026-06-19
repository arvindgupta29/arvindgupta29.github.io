/* ==========================================================================
   Dr. Arvind Gupta Portfolio JavaScript Logic
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Active Link Highlighting on Scroll (Intersection Observer)
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu-item a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the middle part of viewport
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                menuLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--color-hover-text)';
                        link.style.fontWeight = '700';
                    } else {
                        link.style.color = 'var(--text-color)';
                        link.style.fontWeight = '500';
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});
