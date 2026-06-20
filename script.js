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
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        if (href === `#${id}`) {
                            link.style.color = 'var(--color-hover-text)';
                            link.style.fontWeight = '700';
                        } else {
                            link.style.color = 'var(--text-color)';
                            link.style.fontWeight = '500';
                        }
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // 2. Visitor Counter
    const visitorSpan = document.getElementById('visitor-count');
    if (visitorSpan) {
        fetch('https://api.counterapi.dev/v1/arvindgupta29/portfolio/up')
            .then(response => response.json())
            .then(data => {
                if (data && typeof data.count === 'number') {
                    visitorSpan.textContent = data.count.toLocaleString();
                } else {
                    visitorSpan.textContent = '—';
                }
            })
            .catch(error => {
                console.error('Error fetching counter:', error);
                visitorSpan.textContent = '—';
            });
    }
});
