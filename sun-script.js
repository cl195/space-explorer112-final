/* 
 * Sun Page JavaScript - Contains all interactive functionality for the Sun page
 * This script handles animations, interactive elements, and dynamic content related to the Sun
 */

// Sun Page JavaScript - Controls animations, interactive elements, and dynamic effects
// This file manages all interactive and animated elements on the Sun exploration page
// It handles parallax effects, scroll animations, and user interactions

// Wait for DOM content to be fully loaded before initializing page elements
// This ensures all HTML elements are available before JavaScript tries to access them
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sun page script initialized');
    
    // Initialize sun parallax effect on page load
    // This creates the initial interactive background motion effects
    initSunParallax();
    
    // Set up all scroll-based animations and effects
    // This configures the handling of element animations as user scrolls
    initScrollEffects();
    
    // Initialize interactive hotspots and pop-up information windows
    // This sets up the clickable regions that reveal additional information
    initSunHotspots();
    
    // Set up dynamic solar flare animations
    // This creates the animated solar flare effects that bring the sun to life
    initSolarFlareAnimation();
    
    // Initialize interactive energy cycle diagram
    // This sets up the animated solar energy production visualization
    initEnergyCycle();
    
    // Add fade-in effect to the entire page
    // This creates the smooth appearance animation when the page first loads
    document.body.classList.add('fade-in');
    
    // Enable navigation menu interactions
    // This ensures the mobile navigation toggle works properly
    initMobileNavigation();
});

/**
 * Initializes all Sun page specific functionality
 * Sets up animations, interactions, and dynamic content
 */
function initSunPage() {
    // Setup composition chart animations
    setupCompositionCharts();
    
    // Initialize interactive elements
    setupInteractiveElements();
    
    // Setup sun animation enhancements
    enhanceSunAnimation();
}

/**
 * Sets up the composition charts with animated loading on scroll
 * Charts show percentages of different elements in the Sun
 */
function setupCompositionCharts() {
    const chartBars = document.querySelectorAll('.bar-fill');
    
    // Reset all bars to 0 width initially
    chartBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        
        // Store target width as data attribute
        bar.dataset.targetWidth = targetWidth;
    });
    
    // Set up scroll observer to animate bars when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                // Animate to target width
                setTimeout(() => {
                    bar.style.width = bar.dataset.targetWidth;
                }, 200);
                // Stop observing after animation
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each chart bar
    chartBars.forEach(bar => {
        observer.observe(bar);
    });
    
    console.log('Composition charts initialized');
}

/**
 * Sets up interactive elements on the Sun page
 * Includes hover effects, tooltips, and click interactions
 */
function setupInteractiveElements() {
    // Add click event listeners to fact items for enhanced interaction
    const factItems = document.querySelectorAll('.fact-item');
    factItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
        });
    });
    
    // Set up portal link hover effects
    const portalLinks = document.querySelectorAll('.portal-link');
    portalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Add custom hover effect
            this.classList.add('hover-effect');
        });
        
        link.addEventListener('mouseleave', function() {
            // Remove custom hover effect
            this.classList.remove('hover-effect');
        });
    });
    
    console.log('Interactive elements initialized');
}

/**
 * Enhances the Sun animation with additional dynamic effects
 * Adds particle effects, flares, and responsive behavior
 */
function enhanceSunAnimation() {
    const sunCore = document.querySelector('.sun-core');
    const sunRays = document.querySelector('.sun-rays');
    
    if (!sunCore || !sunRays) {
        console.warn('Sun animation elements not found');
        return;
    }
    
    // Add random flare effect occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            sunCore.classList.add('flare');
            setTimeout(() => {
                sunCore.classList.remove('flare');
            }, 500);
        }
    }, 3000);
    
    // Add responsive behavior to sun animation
    window.addEventListener('resize', adjustSunSize);
    adjustSunSize(); // Initial adjustment
    
    console.log('Sun animation enhancements applied');
}

/**
 * Adjusts the sun size based on viewport dimensions
 * Ensures the sun appears properly on different screen sizes
 */
function adjustSunSize() {
    const sunAnimation = document.querySelector('.sun-animation');
    if (!sunAnimation) return;
    
    const viewportWidth = window.innerWidth;
    
    // Adjust size based on viewport width
    if (viewportWidth < 768) {
        // Mobile size
        sunAnimation.style.width = '280px';
        sunAnimation.style.height = '280px';
    } else if (viewportWidth < 1200) {
        // Tablet size
        sunAnimation.style.width = '400px';
        sunAnimation.style.height = '400px';
    } else {
        // Desktop size - reset to default
        sunAnimation.style.width = '550px';
        sunAnimation.style.height = '550px';
    }
}

// Initialize the parallax effect for the sun image and corona
// This function creates a 3D-like effect where elements move at different speeds
function initSunParallax() {
    const sunHero = document.querySelector('.sun-hero');
    const sunImage = document.querySelector('.sun-image');
    const coronaLayer = document.querySelector('.corona-layer');
    const starsLayer = document.querySelector('.stars-layer');
    
    if (sunHero && sunImage && coronaLayer && starsLayer) {
        // Add mouse move event listener for interactive parallax effect
        // This tracks cursor position to move elements at different rates
        window.addEventListener('mousemove', (e) => {
            // Calculate cursor position as a percentage of the window dimensions
            // This normalizes the mouse position between -0.5 and 0.5
            const mouseX = (e.clientX / window.innerWidth - 0.5);
            const mouseY = (e.clientY / window.innerHeight - 0.5);
            
            // Move the sun image based on cursor position
            // This creates a subtle movement effect for the main sun image
            sunImage.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
            
            // Move the corona layer in the opposite direction for parallax depth
            // This creates a depth effect as the corona moves counter to the sun
            coronaLayer.style.transform = `translate(${-mouseX * 40}px, ${-mouseY * 40}px)`;
            
            // Move the stars layer at a different rate
            // This creates another layer of depth with stars moving at their own pace
            starsLayer.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
        });
    }
}

// Set up scroll-based animations and parallax effects
// This function manages all effects triggered by the user scrolling
function initScrollEffects() {
    // Add scroll event listener to window
    // This triggers effects as the user scrolls through the page
    window.addEventListener('scroll', () => {
        // Get current scroll position
        // This determines how far down the page the user has scrolled
        const scrollY = window.scrollY;
        
        // Handle parallax effect for the sun hero section
        // This creates a scrolling parallax effect independent of mouse movement
        const sunHero = document.querySelector('.sun-hero');
        const sunImage = document.querySelector('.sun-image');
        const coronaLayer = document.querySelector('.corona-layer');
        
        if (sunHero && sunImage && coronaLayer) {
            const heroHeight = sunHero.offsetHeight;
            // Calculate the scroll progress through the hero section
            // This produces a value from 0 (at top) to 1 (at bottom of section)
            const scrollRatio = Math.min(scrollY / heroHeight, 1);
            
            // Move the sun image upward as user scrolls down
            // This creates the effect of the sun rising in the viewport
            sunImage.style.transform = `translateY(${-scrollRatio * 50}px)`;
            
            // Adjust the corona opacity based on scroll position
            // This creates a fading effect as the user scrolls down
            coronaLayer.style.opacity = 1 - scrollRatio * 0.8;
        }
        
        // Animate elements as they come into view during scrolling
        // These function calls highlight elements as they become visible
        animateOnScroll('.fact-card', 'fade-in-up');
        animateOnScroll('.sun-layer-section', 'fade-in');
        animateOnScroll('.energy-cycle', 'fade-in-up');
        animateOnScroll('.comparison-section', 'fade-in');
    });
    
    // Trigger scroll handler once on load to set initial positions
    // This ensures elements are positioned correctly even without scrolling
    window.dispatchEvent(new Event('scroll'));
}

// Add animation when elements scroll into view
// This function applies CSS animation classes to elements as they become visible
// Parameters:
// - selector: CSS selector for target elements
// - animationClass: CSS class containing the animation to apply
function animateOnScroll(selector, animationClass) {
    const elements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        // Calculate element position relative to viewport
        // This determines how far the element is from being visible
        const elementTop = element.getBoundingClientRect().top;
        // Define how far into the viewport the element needs to be before animating
        // This determines when the animation is triggered (80% of viewport height)
        const elementVisible = windowHeight * 0.8;
        
        // Add animation class when element comes into view
        // This applies the animation when the element is visible
        if (elementTop < elementVisible) {
            element.classList.add(animationClass);
        }
    });
}

// Initialize interactive hotspots on the sun visualization
// This function sets up clickable regions that show pop-up information
function initSunHotspots() {
    const hotspots = document.querySelectorAll('.sun-hotspot');
    
    hotspots.forEach(hotspot => {
        // Add click event listener to each hotspot
        // This sets up the toggle behavior for information pop-ups
        hotspot.addEventListener('click', function() {
            // Get the associated info panel for this hotspot
            // This finds the information panel that should be displayed
            const targetInfo = this.getAttribute('data-target');
            const infoPanel = document.getElementById(targetInfo);
            
            // Hide all info panels first
            // This ensures only one panel is visible at a time
            document.querySelectorAll('.layer-info').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Remove active class from all hotspots
            // This resets the visual state of all hotspots
            hotspots.forEach(spot => {
                spot.classList.remove('active');
            });
            
            // Show the selected info panel and mark hotspot as active
            // This displays the selected information and highlights the active hotspot
            if (infoPanel) {
                infoPanel.classList.add('active');
                this.classList.add('active');
            }
        });
    });
    
    // Activate the first hotspot by default
    // This ensures something is visible when the page loads
    if (hotspots.length > 0) {
        hotspots[0].click();
    }
}

// Initialize dynamic solar flare animations
// This function creates the animated solar flare effects that bring the sun to life
function initSolarFlareAnimation() {
    const sunContainer = document.querySelector('.sun-image-container');
    
    if (sunContainer) {
        // Create multiple solar flares with different properties
        // This generates several flare elements for a dynamic effect
        for (let i = 0; i < 5; i++) {
            createSolarFlare(sunContainer, i);
        }
    }
}

// Create an individual solar flare element
// This function generates a single animated solar flare with randomized properties
// Parameters:
// - container: The DOM element to append the flare to
// - index: A unique identifier for the flare to ensure variety
function createSolarFlare(container, index) {
    // Create solar flare element
    // This generates a new DOM element for the flare
    const flare = document.createElement('div');
    flare.classList.add('solar-flare');
    
    // Randomize flare position, size, and animation parameters
    // This ensures each flare has unique properties for visual variety
    const randomAngle = Math.random() * 360;
    const randomSize = 50 + Math.random() * 100;
    const randomDuration = 10 + Math.random() * 15;
    const randomDelay = Math.random() * 5;
    
    // Set the CSS properties of the flare
    // This positions and styles the flare based on random parameters
    flare.style.transform = `rotate(${randomAngle}deg)`;
    flare.style.width = `${randomSize}px`;
    flare.style.height = `${randomSize * 0.5}px`;
    flare.style.animation = `flareAnimation ${randomDuration}s infinite ${randomDelay}s`;
    
    // Position the flare at the edge of the sun
    // This ensures flares appear to emanate from the sun's surface
    const radius = 150; // Approximate sun radius in pixels
    const posX = Math.cos(randomAngle * Math.PI / 180) * radius;
    const posY = Math.sin(randomAngle * Math.PI / 180) * radius;
    
    flare.style.left = `calc(50% + ${posX}px)`;
    flare.style.top = `calc(50% + ${posY}px)`;
    
    // Add flare to sun container
    // This adds the flare element to the page
    container.appendChild(flare);
}

// Initialize the energy cycle interactive diagram
// This function sets up the animated solar energy production visualization
function initEnergyCycle() {
    const energyCycle = document.querySelector('.energy-cycle');
    
    if (energyCycle) {
        // Set up Intersection Observer to detect when the cycle comes into view
        // This triggers animations only when the element is visible in the viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start animation sequence when element is in view
                    // This begins the energy flow animation throughout the diagram
                    startEnergyCycleAnimation();
                    // Disconnect observer after triggering animation
                    // This prevents the animation from restarting multiple times
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 }); // Observe when 50% of element is visible
        
        observer.observe(energyCycle);
    }
}

// Start the animation sequence for the energy cycle diagram
// This function manages the sequential highlighting of energy cycle steps
function startEnergyCycleAnimation() {
    const steps = document.querySelectorAll('.cycle-step');
    const arrows = document.querySelectorAll('.cycle-arrow');
    
    // Define how long to wait before starting the animation
    // This adds a brief delay before the animation sequence begins
    const initialDelay = 500;
    
    // Define how long to wait between highlighting each step
    // This sets the timing for the sequential animation
    const stepDelay = 1000;
    
    // First hide all arrows to prepare for sequential display
    // This ensures arrows can be shown one by one during the animation
    arrows.forEach(arrow => {
        arrow.style.opacity = '0';
    });
    
    // Wait for the initial delay before starting animation
    // This gives the user time to focus on the diagram before animation starts
    setTimeout(() => {
        // Highlight each step in sequence with delays between
        // This creates a step-by-step animation through the energy cycle
        steps.forEach((step, index) => {
            setTimeout(() => {
                // Add active class to highlight current step
                // This applies the highlighting effect to the current step
                step.classList.add('active');
                
                // Show the corresponding arrow (if not the last step)
                // This displays the arrow pointing to the next step
                if (index < arrows.length) {
                    arrows[index].style.opacity = '1';
                }
            }, index * stepDelay);
        });
        
        // After all steps are highlighted, add pulsing effect to the whole cycle
        // This adds a continuous animation effect to show the cycle is ongoing
        setTimeout(() => {
            const cycleCenter = document.querySelector('.cycle-center');
            if (cycleCenter) {
                cycleCenter.classList.add('pulsing');
            }
        }, steps.length * stepDelay + 500);
    }, initialDelay);
}

// Initialize mobile navigation menu functionality
// This function ensures the mobile menu toggle works correctly
function initMobileNavigation() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        // Add click event listener to menu toggle button
        // This sets up the show/hide functionality for the mobile menu
        menuToggle.addEventListener('click', () => {
            // Toggle active class on navigation links
            // This shows or hides the navigation menu
            navLinks.classList.toggle('active');
            
            // Toggle the menu icon between hamburger and X
            // This changes the icon to indicate the menu state
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close menu when clicking a navigation link
        // This improves user experience by automatically closing the menu after selection
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                
                // Reset menu icon to hamburger
                // This ensures the icon correctly reflects the closed menu state
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
} 