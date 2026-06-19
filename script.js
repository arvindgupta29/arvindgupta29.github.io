/* ==========================================================================
   Dr. Arvind Gupta Portfolio JavaScript Logic
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Profile Switcher Logic
    const body = document.body;
    const btnResearch = document.getElementById('btn-research');
    const btnEtrm = document.getElementById('btn-etrm');

    // Define the profile switcher function
    const setProfile = function(profile) {
        if (profile === 'research') {
            body.classList.remove('profile-etrm');
            body.classList.add('profile-research');
            
            btnEtrm.classList.remove('active');
            btnResearch.classList.add('active');
            
            localStorage.setItem('arvind-portfolio-profile', 'research');
        } else if (profile === 'etrm') {
            body.classList.remove('profile-research');
            body.classList.add('profile-etrm');
            
            btnResearch.classList.remove('active');
            btnEtrm.classList.add('active');
            
            localStorage.setItem('arvind-portfolio-profile', 'etrm');
        }
    };

    // Make it available globally for the inline onclick handlers in HTML
    window.setProfile = setProfile;

    // Retrieve saved profile preference or default to 'research' and apply it
    const savedProfile = localStorage.getItem('arvind-portfolio-profile') || 'research';
    setProfile(savedProfile);

    // 2. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // 3. Active Link Highlighting on Scroll (Intersection Observer)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle part of viewport
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // 4. Subtle Page Intro Animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(15px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 150);
    }
});
