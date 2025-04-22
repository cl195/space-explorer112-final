// Specialized JavaScript for the Moon page - Handles animations, parallax effects, and interactive elements
// This file contains all the JavaScript functionality specific to the Moon exploration page
// It manages dynamic visual effects, user interactions, and responsive behaviors

// Main event listener that triggers when the DOM content is fully loaded
// This ensures all HTML elements are available before JavaScript tries to access them
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main page components
    // This is the entry point for all page functionality
    initMoonPage();
    
    // Add scroll event listener for parallax and animation effects
    // This creates the scrolling-based visual effects throughout the page
    window.addEventListener('scroll', handleMoonScroll);
    
    // Trigger scroll handler once initially to set starting positions
    // This ensures elements are correctly positioned when the page first loads
    handleMoonScroll();
    
    // Initialize parallax effects for mouse movement
    // This creates the interactive background movement that follows cursor position
    moonParallaxEffect();
    
    // Set up lunar phase animations and interactions
    // This manages the visual effects for the moon phases section
    initPhaseAnimations();
    
    // Initialize timeline interaction for historical events
    // This handles hover states and focus effects for the mission timeline
    initTimelineInteraction();
    
    // Set up rotating fact carousel functionality
    // This manages the auto-rotating lunar facts with dot navigation
    initFactCarousel();
    
    // Initialize panoramic image viewer capabilities
    // This creates the fullscreen panorama viewer for lunar surface images
    initPanoramaViewer();
    
    // Initialize and enhance image info arrows
    // This ensures the information arrows are visible and properly animated
    initImageInfoArrows();
});

// Initialize the Moon page with entry animations and card effects
// This function handles the initial page load animations and setups
function initMoonPage() {
    console.log('Moon page initialized');
    
    // Add page entry fade-in animation
    // This creates the smooth fade-in effect when the page first loads
    document.body.classList.add('fade-in');
    
    // Initialize floating animation effect for information cards
    // This creates the subtle floating movement for the content cards
    initCardFloating();
}

// Initialize and enhance the image info arrows
// This function ensures the information arrows are properly visible and interactive
function initImageInfoArrows() {
    console.log('Initializing image info arrows');
    
    // Get all arrow elements
    // This selects all down arrows that indicate additional information is available
    const arrows = document.querySelectorAll('.image-info-arrow');
    
    // Ensure all arrows are visible
    // This applies additional styling and behavior to each arrow
    arrows.forEach(arrow => {
        // Add additional visual enhancements
        // This ensures arrows are fully visible with proper opacity
        arrow.style.opacity = '1';
        
        // Add highlight effect when parent container is hovered
        // This creates the interactive color change on hover
        const container = arrow.closest('.terrain-image') || arrow.closest('.panorama-viewer');
        if (container) {
            container.addEventListener('mouseenter', () => {
                arrow.style.color = 'var(--moon-accent)';
            });
            
            container.addEventListener('mouseleave', () => {
                arrow.style.color = 'white';
            });
        }
    });
    
    // Ensure arrows are visible after a short delay 
    // This is useful for browsers that might have rendering issues
    // The timeout ensures arrows appear even if there are initial display problems
    setTimeout(() => {
        arrows.forEach(arrow => {
            arrow.style.visibility = 'visible';
            arrow.style.opacity = '1';
        });
    }, 500);
}

// Handle scroll-based effects and animations for the Moon page
// This function manages all scroll-triggered animations and parallax effects
function handleMoonScroll() {
    const scrollPosition = window.scrollY;
    
    // Process parallax effects for multiple layers
    // This creates the depth effect as user scrolls through the page
    const moonHero = document.querySelector('.moon-hero');
    const moonImage = document.querySelector('.moon-image');
    const starsLayer = document.querySelector('.stars-layer');
    const cloudsLayer = document.querySelector('.clouds-layer');
    
    if (moonHero && moonImage && starsLayer && cloudsLayer) {
        const heroHeight = moonHero.offsetHeight;
        const scrollRatio = Math.min(scrollPosition / heroHeight, 1);
        
        // Moon upward movement effect based on scroll position
        // This creates the effect of the moon rising as the user scrolls down
        moonImage.style.transform = `translateY(calc(-50% - ${scrollRatio * 30}px))`;
        
        // Adjust cloud layer animation speed based on scroll position
        // This creates a dynamic cloud movement that responds to scrolling
        cloudsLayer.style.animationDuration = `${60 - scrollRatio * 20}s`;
        
        // Stars layer parallax movement
        // This creates the effect of stars moving at a different rate than the moon
        starsLayer.style.transform = `translateY(${scrollRatio * 50}px)`;
    }
    
    // Detect and trigger element animations when scrolled into view
    // These function calls add animation classes to elements as they enter the viewport
    animateOnScroll('.moon-card', 'card-visible', 0.8);
    animateOnScroll('.moon-earth-section', 'section-visible', 0.7);
    animateOnScroll('.footer-navigation', 'nav-visible', 0.9);
}

// Add animation classes to elements when they scroll into the viewport
// This function handles the reveal animations as content scrolls into view
// Parameters:
// - selector: CSS selector for target elements
// - className: The animation class to add
// - threshold: How far into the viewport the element needs to be (0-1)
function animateOnScroll(selector, className, threshold = 0.8) {
    const elements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = windowHeight * threshold;
        
        if (elementTop < elementVisible) {
            element.classList.add(className);
        }
    });
}

// Create parallax effects for moon elements based on mouse movement
// This function handles the interactive background that responds to mouse position
function moonParallaxEffect() {
    const moonParallax = document.querySelector('.moon-parallax');
    
    if (moonParallax) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moonImage = document.querySelector('.moon-image');
            const starsLayer = document.querySelector('.stars-layer');
            
            if (moonImage && starsLayer) {
                // Subtle moon movement following cursor position
                // This creates a 3D-like effect where the moon follows the cursor slightly
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                
                moonImage.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
                
                // Opposite movement for stars layer to enhance depth effect
                // This creates a parallax effect with the stars moving opposite to the moon
                starsLayer.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`;
            }
        });
    }
}

// Initialize lunar phase animations and hover effects
// This function manages the interactive elements in the moon phases section
function initPhaseAnimations() {
    const phaseItems = document.querySelectorAll('.phase-item');
    
    phaseItems.forEach(item => {
        const phase = item.querySelector('.phase-animation');
        const phaseImg = item.querySelector('.phase-img');
        
        if (phase) {
            item.addEventListener('mouseenter', () => {
                // Add pulsating effect on hover
                // This creates a subtle highlight and scale effect when hovering over a phase
                phase.style.transform = 'scale(1.1)';
                phase.style.boxShadow = '0 0 30px rgba(143, 184, 255, 0.5)';
                phase.style.transition = 'all 0.3s ease';
                
                // Add special effects for specific lunar phases
                // This creates a brightness boost for the full moon phase
                if (item.querySelector('h3').textContent === 'Full Moon') {
                    phaseImg.style.filter = 'brightness(1.2)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                // Restore original state when mouse leaves
                // This resets all hover effects back to default state
                phase.style.transform = 'scale(1)';
                phase.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                
                if (item.querySelector('h3').textContent === 'Full Moon') {
                    phaseImg.style.filter = 'brightness(1)';
                }
            });
        }
    });
    
    // Add fade-in transition effect for phase images after loading
    // This creates a smooth appearance for images as they load
    const phaseImages = document.querySelectorAll('.phase-img');
    phaseImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            }, 100);
        });
        
        // If image is already in cache, manually set opacity
        // This ensures images appear correctly if loaded from browser cache
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Set up lunar phase sequence animation
    // This initializes the automatic phase highlighting sequence
    setupPhaseSequence();
}

// Configure the animated sequence showing lunar phase progression
// This function creates the automated sequence that highlights each phase in order
function setupPhaseSequence() {
    const moonPhasesSection = document.querySelector('.moon-phases-section');
    
    if (moonPhasesSection) {
        // Add sequence animation when scrolled to the lunar phases section
        // This uses Intersection Observer to trigger the sequence when section is visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const phaseItems = document.querySelectorAll('.phase-item');
                    
                    // Highlight each phase in sequence to simulate lunar cycle
                    // This creates an automatic tour through the moon phases
                    let currentIndex = 0;
                    const highlightInterval = setInterval(() => {
                        // Reset all phase items to default state
                        // This ensures only one phase is highlighted at a time
                        phaseItems.forEach(item => {
                            item.style.transform = 'translateY(0)';
                            item.style.borderColor = 'rgba(194, 197, 204, 0.1)';
                            const phaseAnimation = item.querySelector('.phase-animation');
                            if (phaseAnimation) {
                                phaseAnimation.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                            }
                        });
                        
                        // Highlight the current phase in the sequence
                        // This applies special styling to the current phase in the cycle
                        if (phaseItems[currentIndex]) {
                            phaseItems[currentIndex].style.transform = 'translateY(-10px)';
                            phaseItems[currentIndex].style.borderColor = 'var(--moon-accent)';
                            const phaseAnimation = phaseItems[currentIndex].querySelector('.phase-animation');
                            if (phaseAnimation) {
                                phaseAnimation.style.boxShadow = '0 0 30px rgba(143, 184, 255, 0.5)';
                            }
                        }
                        
                        currentIndex = (currentIndex + 1) % phaseItems.length;
                        
                        // 5 seconds after stopping the loop
                        // This stops the animation after one full cycle
                        if (currentIndex === 0) {
                            setTimeout(() => {
                                clearInterval(highlightInterval);
                                // Reset all items to default state
                                // This ensures a clean state after the animation completes
                                phaseItems.forEach(item => {
                                    item.style.transform = 'translateY(0)';
                                    item.style.borderColor = 'rgba(194, 197, 204, 0.1)';
                                    const phaseAnimation = item.querySelector('.phase-animation');
                                    if (phaseAnimation) {
                                        phaseAnimation.style.boxShadow = '0 0 20px rgba(143, 184, 255, 0.2)';
                                    }
                                });
                            }, 1000);
                        }
                    }, 600);
                    
                    // Cancel observation
                    // This prevents the animation from running multiple times
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.5 // Trigger when at least 50% of the element is visible
        });
        
        observer.observe(moonPhasesSection);
    }
}

// Initialize floating animation effect for information cards
// This function creates the subtle floating movement for the content cards
function initCardFloating() {
    const cards = document.querySelectorAll('.moon-card');
    
    cards.forEach((card, index) => {
        // Set different initial delays to make cards look like natural floating
        // This staggers the animation for a more natural, less robotic effect
        const delay = index * 0.1;
        card.style.animationDelay = `${delay}s`;
        
        // Add floating animation
        // This applies the continuous up and down floating animation
        card.style.animation = `floatingCard 4s infinite ease-in-out ${delay}s`;
    });
}

// Add floating animation to CSS
// This dynamically injects animation keyframes and classes into the document
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes floatingCard {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
    
    .card-visible {
        animation: cardReveal 0.8s forwards ease-out;
    }
    
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
    
    .section-visible {
        animation: sectionFadeIn 1s forwards ease-out;
    }
    
    @keyframes sectionFadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .nav-visible {
        animation: navSlideUp 0.5s forwards ease-out;
    }
    
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
document.head.appendChild(floatingStyle);

// Initialize timeline interaction for historical events
// This function manages the interactive hover effects for the mission timeline
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Highlight the current project
            // This applies special styling to the hovered timeline item
            item.style.backgroundColor = 'rgba(143, 184, 255, 0.1)';
            item.style.borderRadius = '8px';
            item.style.padding = '10px';
            item.style.marginLeft = '10px';
            item.style.transition = 'all 0.3s ease';
            
            // Darken other projects
            // This reduces opacity of other timeline items to focus on the current one
            timelineItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                    otherItem.style.transition = 'opacity 0.3s ease';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // Restore original state of all projects
            // This resets all styling back to default when mouse leaves
            item.style.backgroundColor = 'transparent';
            item.style.padding = '0';
            item.style.marginLeft = '0';
            
            timelineItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
}

// Lunar system animation effect
// This function creates the Earth rotation and Moon orbit animations
window.addEventListener('load', () => {
    const earthMoonSection = document.querySelector('.earth-moon-section');
    
    if (earthMoonSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When the area is visible, add special effect
                    // This triggers the Earth-Moon system animations when scrolled into view
                    const earth = document.querySelector('.earth');
                    const moonOrbital = document.querySelector('.moon-orbital');
                    
                    if (earth) {
                        // Earth rotation animation
                        // This creates the continuous rotation effect for Earth
                        earth.style.animation = 'earthRotate 20s linear infinite';
                        
                        // Add CSS animation for earth rotation
                        // This dynamically injects the required keyframes
                        const earthStyle = document.createElement('style');
                        earthStyle.textContent = `
                            @keyframes earthRotate {
                                from { background-position: 0% center; }
                                to { background-position: 200% center; }
                            }
                        `;
                        document.head.appendChild(earthStyle);
                    }
                    
                    if (moonOrbital) {
                        // Highlight lunar orbit
                        // This adds a glowing effect to the moon's orbit
                        moonOrbital.style.boxShadow = '0 0 20px var(--moon-accent)';
                    }
                    
                    // Cancel observation
                    // This prevents the animation from triggering multiple times
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.5 // Trigger when at least 50% of the element is visible
        });
        
        observer.observe(earthMoonSection);
    }
});

// Handle page exit animation
// This creates a smooth transition when navigating to another page
document.querySelectorAll('a').forEach(link => {
    if (!link.classList.contains('moon-link')) {
        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
            
            // Execute only when the link points to another page within the site
            // This ensures the animation only plays for internal navigation
            if (targetHref && targetHref.indexOf('#') !== 0 && !targetHref.match(/^https?:\/\//)) {
                e.preventDefault();
                
                // Add exit animation
                // This applies the fade-out effect
                document.body.classList.add('fade-out');
                
                // Redirect after animation ends
                // This delays the actual navigation until animation completes
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500);
            }
        });
    }
});

// Add exit animation to CSS
// This dynamically injects the fade-out animation
const leaveStyle = document.createElement('style');
leaveStyle.textContent = `
    .fade-out {
        animation: fadeOut 0.5s forwards !important;
    }
    
    @keyframes fadeOut {
        to { opacity: 0; }
    }
`;
document.head.appendChild(leaveStyle);

// Set up rotating fact carousel functionality
// This function manages the auto-rotating lunar facts with dot navigation
function initFactCarousel() {
    const factSlides = document.querySelectorAll('.fact-slide');
    const factDots = document.querySelectorAll('.fact-dot');
    
    if (factSlides.length > 0 && factDots.length > 0) {
        // Automatic rotation
        // This creates the timed carousel that cycles through facts
        let currentIndex = 0;
        const slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % factSlides.length;
            updateFactSlide();
        }, 5000);
        
        // Click navigation point to switch facts
        // This allows users to manually select specific facts
        factDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateFactSlide();
                // Reset automatic rotation timer
                // This ensures a full viewing time for the manually selected fact
                clearInterval(slideInterval);
                setTimeout(() => {
                    setInterval(() => {
                        currentIndex = (currentIndex + 1) % factSlides.length;
                        updateFactSlide();
                    }, 5000);
                }, 10000);
            });
        });
        
        // Update fact rotation
        // This function handles the actual slide transition
        function updateFactSlide() {
            factSlides.forEach((slide, index) => {
                slide.classList.remove('active');
                factDots[index].classList.remove('active');
                
                if (index === currentIndex) {
                    slide.classList.add('active');
                    factDots[index].classList.add('active');
                }
            });
        }
    }
}

// Initialize panoramic image viewer capabilities
// This function creates the fullscreen panorama viewer for lunar surface images
function initPanoramaViewer() {
    const panoramaOverlay = document.querySelector('.panorama-overlay');
    const panoramaImage = document.querySelector('.panorama-viewer img');
    
    if (panoramaOverlay && panoramaImage) {
        panoramaOverlay.addEventListener('click', () => {
            // Create full screen preview element
            // This generates the fullscreen modal for the panorama image
            const fullScreenView = document.createElement('div');
            fullScreenView.classList.add('fullscreen-panorama');
            fullScreenView.innerHTML = `
                <div class="fullscreen-close">
                    <i class="fas fa-times"></i>
                </div>
                <img src="${panoramaImage.src}" alt="Lunar Panorama Fullscreen">
            `;
            
            // Add to body
            // This appends the fullscreen view to the document
            document.body.appendChild(fullScreenView);
            document.body.style.overflow = 'hidden';
            
            // Fade in effect
            // This creates a smooth appearance for the fullscreen view
            setTimeout(() => {
                fullScreenView.style.opacity = '1';
            }, 10);
            
            // Close full screen preview
            // This handles the closing of the fullscreen view
            const closeButton = fullScreenView.querySelector('.fullscreen-close');
            closeButton.addEventListener('click', () => {
                fullScreenView.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(fullScreenView);
                    document.body.style.overflow = '';
                }, 300);
            });
        });
    }
}

// Add styles for full screen preview
// This dynamically injects styling for the panorama fullscreen view
const panoramaStyle = document.createElement('style');
panoramaStyle.textContent = `
    .fullscreen-panorama {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .fullscreen-panorama img {
        max-width: 90%;
        max-height: 90%;
        border-radius: 5px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }
    
    .fullscreen-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(26, 26, 46, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .fullscreen-close:hover {
        background: var(--moon-accent);
        transform: scale(1.1);
    }
    
    .fullscreen-close i {
        color: white;
        font-size: 20px;
    }
`;
document.head.appendChild(panoramaStyle); 