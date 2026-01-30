// Main JavaScript - Scroll Animations and Interactions

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initNavigationScroll();
    setActiveNavLink();
});

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // If user prefers reduced motion, make all elements visible immediately
        const fadeElements = document.querySelectorAll('.scroll-fade-in');
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
        return;
    }

    // Set up Intersection Observer
    const fadeElements = document.querySelectorAll('.scroll-fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Navigation scroll behavior (shadows removed, keeping border only)
function initNavigationScroll() {
    const nav = document.querySelector('.main-nav');

    if (!nav) return;

    window.addEventListener('scroll', () => {
        // Keep border only, no shadows
        nav.style.boxShadow = 'none';
    });
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        // Check if this link matches the current page
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll to anchor links (if any are added)
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the height of the fixed navigation
                const navHeight = document.querySelector('.main-nav').offsetHeight;

                // Calculate position accounting for fixed nav
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Optional: Initialize smooth scroll if anchor links are present
if (document.querySelector('a[href^="#"]')) {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
}

// Log page load for debugging (can be removed in production)
console.log('Page loaded successfully');
