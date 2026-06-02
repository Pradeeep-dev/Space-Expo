// ============ SMOOTH SCROLL FOR BUTTONS ============
document.addEventListener('DOMContentLoaded', function() {
    // Scroll button functionality
    const scrollButtons = document.querySelectorAll('.scroll-btn');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Discover button in navbar
    const discoverBtn = document.querySelector('.btn-cosmic');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target) {
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    // Animate stat counters
    animateCounters();
});

// ============ COUNTER ANIMATION ============
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                entry.target.animated = true;
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16);
                let current = 0;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ============ PARALLAX EFFECT ============
let scrollPosition = 0;
let ticking = false;

function updateParallax() {
    const heroBanner = document.querySelector('.hero-banner');
    if (heroBanner) {
        const heroContent = heroBanner.querySelector('.hero-content');
        if (heroContent && scrollPosition < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            heroContent.style.opacity = Math.max(0, 1 - (scrollPosition / window.innerHeight * 0.5));
        }
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    scrollPosition = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// ============ NAVBAR ACTIVE STATE ============
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.cosmos-navbar .nav-link');
    const sections = document.querySelectorAll('section[id]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ============ SCROLL TO TOP ON LOAD ============
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});
