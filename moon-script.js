// moon-script.js - JavaScript file specifically for providing interaction and animation effects for the Moon page

/**
 * Execute initialization function when DOM content is loaded
 * Add various interactive features and visual effects to the page
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize moon page
    initMoonPage();
    
    // Add basic scroll effects
    window.addEventListener('scroll', handleSimpleScroll);
    
    // Ensure initial state is correct
    handleSimpleScroll();
    
    // Initialize basic moon phase effects
    initSimplePhaseAnimations();
    
    // Initialize timeline interaction
    initTimelineInteraction();
    
    // Initialize fact carousel
    initFactCarousel();
});

/**
 * Initialize the moon page
 * Set up page entrance animation and floating card effects
 */
function initMoonPage() {
    console.log('Moon page initialized'); // Log output for debugging
    
    // Add page fade-in animation effect to enhance user experience
    document.body.classList.add('fade-in');
    
    // Initialize floating effect for information cards to make UI more vibrant
    initCardFloating();
}

/**
 * Handle moon page scroll effects
 * Simplified scroll effect, removing complex parallax calculations
 */
function handleSimpleScroll() {
    // Detect if elements have scrolled into view
    animateOnScroll('.moon-card', 'card-visible', 0.8);
    animateOnScroll('.moon-earth-section', 'section-visible', 0.7);
    animateOnScroll('.footer-navigation', 'nav-visible', 0.9);
}

/**
 * Add animation classes to elements based on scroll position
 * Implement appearance animations for elements when they scroll into view
 * 
 * @param {string} selector - CSS selector for target elements
 * @param {string} className - CSS class name to add
 * @param {number} threshold - Trigger threshold, representing the proportion of element visible in viewport
 */
function animateOnScroll(selector, className, threshold = 0.8) {
    const elements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight; // Get viewport height
    
    elements.forEach(element => {
        // Get element top position relative to viewport
        const elementTop = element.getBoundingClientRect().top;
        // Calculate trigger position, when element enters viewport at specified ratio
        const elementVisible = windowHeight * threshold;
        
        // When element enters trigger area, add animation class
        if (elementTop < elementVisible) {
            element.classList.add(className);
        }
    });
}

/**
 * Simplified moon phase animations
 * Retain basic hover effects, remove complex animation sequences
 */
function initSimplePhaseAnimations() {
    const phaseItems = document.querySelectorAll('.phase-item');
    
    // Add simplified mouse hover effects for each phase item
    phaseItems.forEach(item => {
        const phase = item.querySelector('.phase-animation');
        
        if (phase) {
            // Simplified effect on mouse enter
            item.addEventListener('mouseenter', () => {
                // Only add simple scale effect
                phase.style.transform = 'scale(1.05)';
                phase.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.3)';
            });
            
            // Restore original state on mouse leave
            item.addEventListener('mouseleave', () => {
                phase.style.transform = 'scale(1)';
                phase.style.boxShadow = '0 0 10px rgba(143, 184, 255, 0.2)';
            });
        }
    });
}

/**
 * Initialize card floating effect
 * Add subtle up/down floating animation to information cards, enhancing page vitality
 */
function initCardFloating() {
    const cards = document.querySelectorAll('.moon-card');
    
    cards.forEach((card, index) => {
        // Set different animation delays to stagger animation timing for more natural effect
        const delay = index * 0.1;
        card.style.animationDelay = `${delay}s`;
        
        // Add floating animation effect
        card.style.animation = `floatingCard 4s infinite ease-in-out ${delay}s`;
    });
}

// Dynamically add CSS animation styles to the page
// Use JavaScript to create style element, avoiding modification of CSS files
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    /* Card floating animation */
    @keyframes floatingCard {
        0% { transform: translateY(0); } /* Starting position */
        50% { transform: translateY(-10px); } /* Float up 10 pixels */
        100% { transform: translateY(0); } /* Return to starting position */
    }
    
    /* Card reveal animation */
    .card-visible {
        animation: cardReveal 0.8s forwards ease-out;
    }
    
    /* Card slides in from below and fades in */
    @keyframes cardReveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Section reveal animation */
    .section-visible {
        animation: sectionFadeIn 1s forwards ease-out;
    }
    
    /* Section fade-in animation */
    @keyframes sectionFadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    /* Navigation reveal animation */
    .nav-visible {
        animation: navSlideUp 0.5s forwards ease-out;
    }
    
    /* Navigation slides in from below */
    @keyframes navSlideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
// Add style to document head
document.head.appendChild(floatingStyle);

/**
 * Initialize timeline interaction
 * Add interactive effects to lunar mission timeline
 */
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        // Highlight effect on mouse hover
        item.addEventListener('mouseenter', () => {
            // Highlight current historical event
            item.style.backgroundColor = 'rgba(143, 184, 255, 0.1)'; // Add light blue background
            item.style.borderRadius = '8px'; // Rounded corners
            item.style.padding = '10px'; // Increase padding
            item.style.marginLeft = '10px'; // Slight offset
            item.style.transition = 'all 0.3s ease'; // Smooth transition
            
            // Simultaneously dim other historical events to highlight current item
            timelineItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5'; // Lower opacity of unrelated items
                    otherItem.style.transition = 'opacity 0.3s ease'; // Add transition effect
                }
            });
        });
        
        // Restore original state on mouse leave
        item.addEventListener('mouseleave', () => {
            // Restore current item style
            item.style.backgroundColor = 'transparent';
            item.style.padding = '0';
            item.style.marginLeft = '0';
            
            // Restore opacity for all items
            timelineItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
}

/**
 * Earth-Moon system animation effects
 * Add animations to Earth and Moon orbits when page loads
 */
window.addEventListener('load', () => {
    const earthMoonSection = document.querySelector('.earth-moon-section');
    
    if (earthMoonSection) {
        // Use IntersectionObserver to detect when Earth-Moon system section is visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get Earth and Moon orbit elements
                    const earth = document.querySelector('.earth');
                    const moonOrbital = document.querySelector('.moon-orbital');
                    
                    if (earth) {
                        // Add Earth rotation animation
                        earth.style.animation = 'earthRotate 20s linear infinite';
                        
                        // Dynamically add CSS definition for Earth rotation animation
                        const earthStyle = document.createElement('style');
                        earthStyle.textContent = `
                            @keyframes earthRotate {
                                from { background-position: 0% center; } /* Initial position */
                                to { background-position: 200% center; } /* Complete two full rotations */
                            }
                        `;
                        document.head.appendChild(earthStyle);
                    }
                    
                    if (moonOrbital) {
                        // Highlight Moon orbit
                        moonOrbital.style.boxShadow = '0 0 20px var(--moon-accent)';
                    }
                    
                    // Stop observing to avoid repeated triggers
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.5 // Trigger when element is 50% in view
        });
        
        // Start observing Earth-Moon system section
        observer.observe(earthMoonSection);
    }
});

/**
 * Handle page exit animations
 * Simplified navigation - remove animations
 */
document.querySelectorAll('a').forEach(link => {
    // Don't add animation to moon link (since we're already on the moon page)
    if (!link.classList.contains('moon-link')) {
        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
            
            // Only add animation to internal links (not anchors or external links)
            if (targetHref && targetHref.indexOf('#') !== 0 && !targetHref.match(/^https?:\/\//)) {
                e.preventDefault(); // Prevent default navigation behavior
                
                // Direct navigation without animations
                window.location.href = targetHref;
            }
        });
    }
});

/**
 * Initialize fact carousel functionality
 * Create auto-switching lunar facts carousel display
 */
function initFactCarousel() {
    const factSlides = document.querySelectorAll('.fact-slide');
    const factDots = document.querySelectorAll('.fact-dot');
    
    if (factSlides.length > 0 && factDots.length > 0) {
        // Set up auto-carousel
        let currentIndex = 0;
        const slideInterval = setInterval(() => {
            // Cycle to the next fact
            currentIndex = (currentIndex + 1) % factSlides.length;
            updateFactSlide();
        }, 5000); // Switch every 5 seconds
        
        // Click navigation dots to manually switch facts
        factDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index; // Update current index
                updateFactSlide(); // Update display
                
                // Reset auto-carousel timer
                clearInterval(slideInterval);
                setTimeout(() => {
                    // Resume auto-carousel after 10 seconds
                    setInterval(() => {
                        currentIndex = (currentIndex + 1) % factSlides.length;
                        updateFactSlide();
                    }, 5000);
                }, 10000);
            });
        });
        
        /**
         * Update fact carousel display
         * Show fact at current index, hide other facts
         */
        function updateFactSlide() {
            factSlides.forEach((slide, index) => {
                // Remove all active states
                slide.classList.remove('active');
                factDots[index].classList.remove('active');
                
                // Add active state to current index
                if (index === currentIndex) {
                    slide.classList.add('active');
                    factDots[index].classList.add('active');
                }
            });
        }
    }
} 