// Create star background - simplified version
function createStars() {
    // Check if star background already exists to avoid duplicate creation
    if (document.querySelector('.star-background')) return;
    
    // Create star container
    const starBackground = document.createElement('div');
    starBackground.classList.add('star-background');
    document.body.appendChild(starBackground);
    
    // Reduce number of stars
    const numberOfStars = 150;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size class - only two sizes
        const sizeClass = Math.random();
        if (sizeClass < 0.7) {
            star.classList.add('star-small');
        } else {
            star.classList.add('star-medium');
        }
        
        // Simplified style settings
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.opacity = (0.3 + Math.random() * 0.7).toString();
        
        starBackground.appendChild(star);
    }
}

// Ensure stars are created immediately when page loads
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createStars);
    } else {
        createStars();
    }
})();

// Simplified scroll effect
function handleScroll() {
    const scrollPosition = window.scrollY;
    const items = document.querySelectorAll('.structure-item');
    const planetSections = document.querySelectorAll('.planet-detail-section');
    
    items.forEach((item, index) => {
        const delay = index * 0.1;
        const triggerPosition = item.offsetTop - window.innerHeight * 0.8;
        
        if (scrollPosition > triggerPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transitionDelay = `${delay}s`;
        }
    });
    
    // Handle simplified display of planet detail sections
    planetSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

// Basic smooth scrolling
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Basic simplified parallax effect
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.2}px`;
        }
    });
}

// Simplified page transitions
function setupPageTransitions() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links that aren't for the current page or anchors
            if (!this.classList.contains('active') && !this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Simplify transition - just redirect without animation effects
                const targetHref = this.getAttribute('href');
                window.location.href = targetHref;
            }
        });
    });
}

// Page load initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize structure item styles
    const items = document.querySelectorAll('.structure-item');
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial trigger of scroll handling
    handleScroll();
    
    // Initialize smooth scrolling
    smoothScroll();
    
    // Initialize simplified parallax effect
    parallaxEffect();
    
    // Set up simplified page transitions
    setupPageTransitions();
    
    // Add simplified page fade-in effect
    document.body.classList.add('fade-in');
}); 