// Optimized parallax scrolling with requestAnimationFrame
let scrollPosition = 0;
let ticking = false;

function updateParallax() {
    const heroText = document.querySelector('.hero-text');
    const newsSection = document.querySelector('.news-section');

    if (heroText) {
        const opacity = Math.max(0, 1 - (scrollPosition / 800));
        heroText.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        heroText.style.opacity = opacity;
    }

    if (newsSection) {
        const newsSectionTop = newsSection.offsetTop;
        const relativeScroll = scrollPosition - newsSectionTop;
        
        if (relativeScroll > 0) {
            const opacity = Math.max(0, 1 - (relativeScroll / 600));
            newsSection.style.transform = `translateY(${relativeScroll * 0.2}px)`;
            newsSection.style.opacity = opacity;
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

// Passive scroll listener for better performance

// Scroll to top function
function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Generate stars
function createStars() {
    const starfield = document.getElementById('starfield');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Random opacity variation
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        starfield.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createStars();
});
