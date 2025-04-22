/**
 * Main JavaScript file for the Solar System Explorer website
 * Contains functionality for star backgrounds, navigation, animations, 
 * responsive design handling, and interactive elements
 */

// Create star background for the cosmic atmosphere across all pages
function createStars() {
    // Check if star background already exists to avoid duplicating
    if (document.querySelector('.star-background')) return;
    
    // Create star container that will hold all the individual stars
    const starBackground = document.createElement('div');
    starBackground.classList.add('star-background');
    document.body.appendChild(starBackground);
    
    const numberOfStars = 350; // Increase star count for a more noticeable effect
    
    // Generate individual stars with randomized properties
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position using percentage for responsive placement
        const x = Math.random() * 100; // Horizontal position (0-100%)
        const y = Math.random() * 100; // Vertical position (0-100%)
        
        // Random size class distribution - mostly small stars for realistic night sky
        const sizeClass = Math.random();
        if (sizeClass < 0.6) {
            star.classList.add('star-small');  // 60% small stars
        } else if (sizeClass < 0.9) {
            star.classList.add('star-medium'); // 30% medium stars
        } else {
            star.classList.add('star-large');  // 10% large stars
        }
        
        // Random animation duration and delay for twinkling effect
        const duration = 1.5 + Math.random() * 3; // Animation cycle between 1.5-4.5s
        const delay = Math.random() * 3; // Delay start by 0-3s for varied effect
        
        // Apply calculated styles to the star
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--twinkle-duration', `${duration}s`);
        star.style.setProperty('--twinkle-delay', `${delay}s`);
        
        // Random initial opacity for varied star brightness
        star.style.opacity = (0.3 + Math.random() * 0.7).toString();
        
        // Add star to the background container
        starBackground.appendChild(star);
    }
    
    console.log('Stars created:', document.querySelectorAll('.star').length);
}

// Self-executing function to ensure stars are created immediately 
// without waiting for DOMContentLoaded event
(function() {
    // Execute immediately on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createStars);
    } else {
        createStars();
    }
})();

// Handle scroll-based animations and effects throughout the site
function handleScroll() {
    const scrollPosition = window.scrollY;
    const items = document.querySelectorAll('.structure-item');
    const planetSections = document.querySelectorAll('.planet-detail-section');
    
    // Animate structure items with staggered delay as they scroll into view
    items.forEach((item, index) => {
        const delay = index * 0.1; // Staggered delay (100ms between each item)
        const triggerPosition = item.offsetTop - window.innerHeight * 0.8; // Trigger when item is 80% in view
        
        // When the item scrolls into view, animate it
        if (scrollPosition > triggerPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transitionDelay = `${delay}s`;
        }
    });
    
    // Show planet detail sections as they scroll into view
    planetSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Add visible class when section is 75% in viewport
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

// Enable smooth scrolling for in-page navigation links
function smoothScroll() {
    // Select all links that point to an ID within the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump-to behavior
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // If target element exists, scroll to it smoothly
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth' // CSS smooth scrolling
                });
            }
        });
    });
}

// Create parallax scrolling effect for hero section background
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        
        // Move background image at half the scroll speed for parallax effect
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

// Set up page transition animations between different sections of the site
function setupPageTransitions() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add transition effects to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only execute animation when clicking on a non-active page
            if (!this.classList.contains('active')) {
                e.preventDefault();
                
                const targetHref = this.getAttribute('href');
                const currentPage = document.body;
                
                // Choose different transition effects based on target page type
                // This creates unique transitions between different sections
                let transitionClass = 'fade-out'; // Default transition
                
                if (this.classList.contains('structure-link')) {
                    transitionClass = 'slide-left-out';
                } else if (this.classList.contains('planet-link')) {
                    transitionClass = 'zoom-out';
                } else if (this.classList.contains('sun-link')) {
                    transitionClass = 'fade-out-bright';
                } else if (this.classList.contains('moon-link')) {
                    transitionClass = 'slide-right-out';
                }
                
                // Add transition animation class to current page
                currentPage.classList.add(transitionClass);
                
                // Navigate to new page after animation ends
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500); // Match with CSS animation duration (500ms)
            }
        });
    });
}

// Create interactive star movement effect that follows mouse cursor
function setupStarMouseEffect() {
    const starBackground = document.querySelector('.star-background');
    if (!starBackground) {
        // Don't execute if star background doesn't exist
        console.log('No star background found for mouse effect');
        return;
    }
    
    // Variables to track mouse position and movement state
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let movementTimeout;
    let animationFrameId;
    
    // Capture mouse position as user moves cursor
    document.addEventListener('mousemove', (e) => {
        // Calculate normalized position (0-1) within viewport
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        isMoving = true;
        clearTimeout(movementTimeout);
        
        // Reset isMoving if mouse stops moving for 3 seconds
        // This helps optimize performance when mouse is stationary
        movementTimeout = setTimeout(() => {
            isMoving = false;
        }, 3000);
    });
    
    // Animate stars to follow mouse with parallax effect
    function animateStars() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            // Different movement range for each star creates parallax effect
            // Stars move at different rates based on their index for depth illusion
            const moveFactorX = ((index % 5) - 2) * 0.3; // Range: -0.6 to 0.6
            const moveFactorY = (Math.floor(index / 5) % 5 - 2) * 0.3; // Range: -0.6 to 0.6
            
            // Calculate movement distance based on mouse position
            const moveX = (mouseX - 0.5) * moveFactorX; // Center point is 0.5
            const moveY = (mouseY - 0.5) * moveFactorY; // Center point is 0.5
            
            // Apply smooth movement transformation
            star.style.transform = `translate(${moveX}%, ${moveY}%)`;
        });
        
        // Continue animation loop
        animationFrameId = requestAnimationFrame(animateStars);
    }
    
    // Start animation loop
    animateStars();
    console.log('Star mouse effect initialized');
}

// Self-executing function to start star mouse effect when page loads
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupStarMouseEffect);
    } else {
        setupStarMouseEffect();
    }
})();

// Create meteor animations that randomly streak across the star background
function createMeteors() {
    // Ensure star background container exists
    let starBackground = document.querySelector('.star-background');
    if (!starBackground) {
        // Create a star background if one doesn't exist
        createStars();
        starBackground = document.querySelector('.star-background');
        if (!starBackground) return; // Exit if still fails
    }
    
    // Clear any existing timers to prevent duplicates
    if (window.meteorInterval) {
        clearInterval(window.meteorInterval);
    }
    
    // Create meteors at random intervals
    window.meteorInterval = setInterval(() => {
        // 30% chance to create a meteor, keeping them occasional but noticeable
        if (Math.random() > 0.3) return;
        
        // Create new meteor element
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        
        // Position and angle the meteor
        const startX = Math.random() * 100; // Random horizontal start position (0-100%)
        const startY = -5; // Start slightly above viewport
        const angle = 15 + Math.random() * 30; // Diagonal angle (15-45 degrees)
        const length = 100 + Math.random() * 150; // Meteor trail length (100-250px)
        
        // Set meteor styles
        meteor.style.left = `${startX}%`;
        meteor.style.top = `${startY}%`;
        meteor.style.width = `${length}px`;
        meteor.style.transform = `rotate(${angle}deg)`;
        
        // Add meteor to the star background
        starBackground.appendChild(meteor);
        
        // Remove meteor after animation completes to clean up DOM
        setTimeout(() => {
            if (meteor.parentNode === starBackground) {
                starBackground.removeChild(meteor);
            }
        }, 1500); // Match with CSS animation duration
    }, 8000); // Create meteor approximately every 8 seconds
    
    console.log('Meteor generation started');
}

// Self-executing function to start meteor effects when page loads
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMeteors);
    } else {
        createMeteors();
    }
})();

// Control mobile menu button visibility based on screen size
function checkMenuButtonVisibility() {
    console.log("Checking menu button visibility");
    const menuButton = document.querySelector('.mobile-menu-toggle');
    
    if (!menuButton) {
        console.error("Menu button element not found");
        return;
    }
    
    // Get current window width to determine if mobile view is active
    const windowWidth = window.innerWidth;
    
    // Show menu button on small screens (mobile breakpoint ≤ 768px)
    if (windowWidth <= 768) {
        console.log(`Show menu button: width=${windowWidth}px`);
        menuButton.style.display = 'flex';
        menuButton.style.visibility = 'visible';
        menuButton.style.opacity = '1';
    } else {
        // Hide menu button on larger screens
        console.log(`Hide menu button: width=${windowWidth}px`);
        menuButton.style.display = 'none';
        menuButton.style.visibility = 'hidden';
        menuButton.style.opacity = '0';
    }
}

// Initialize mobile navigation menu functionality
function initNavMenu() {
    console.log('Initializing navigation menu...'); 
    
    // Get references to key navigation elements
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Verify that required navigation elements exist
    if (!menuToggle) {
        console.error('Menu button element not found!'); 
        return;
    }
    
    if (!navLinks) {
        console.error('Navigation links element not found!');
        return;
    }
    
    // Handle mobile menu toggle button clicks
    menuToggle.addEventListener('click', function(e) {
        console.log('Menu button clicked'); 
        e.preventDefault(); // Prevent default button behavior
        e.stopPropagation(); // Prevent event bubbling
        
        // Toggle navigation menu visibility
        navLinks.classList.toggle('active'); 
        
        // Toggle between hamburger and close icons
        const icon = this.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Change to X icon when menu is open
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Change to hamburger icon when menu is closed
            }
        }
        
        return false; // Prevent any additional event handling
    });
    
    // Close mobile menu when clicking outside the menu area
    document.addEventListener('click', function(e) {
        // Check if menu is open and click is outside menu and toggle button
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            e.target !== menuToggle && 
            !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active'); // Close the menu
            
            // Restore hamburger icon
            const icon = menuToggle.querySelector('i');
            if (icon && icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when a navigation link is clicked
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active'); // Close the menu
                
                // Restore hamburger icon
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// Set up interactive behaviors for planet cards on the planet page
function setupPlanetCardInteractions() {
    console.log('Setting up planet card interactions');
    
    // Get all planet detail sections for scroll animations
    const planetDetailSections = document.querySelectorAll('.planet-detail-section');
    
    // Helper function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Handler for scroll events to reveal planet sections
    function handleScroll() {
        planetDetailSections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible'); // Add class to trigger animation
            }
        });
    }
    
    // Initial check in case sections are already in view on page load
    handleScroll();
    
    // Check on scroll for revealing sections as user scrolls down
    window.addEventListener('scroll', handleScroll);
    
    // Add click event to planet cards for smooth scrolling to details
    const planetCards = document.querySelectorAll('.planet-card');
    planetCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Get target from onclick attribute
            const href = this.getAttribute('onclick').replace("location.href='", "").replace("'", "");
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Smooth scroll to target section with offset for fixed header
                    const yOffset = -80; // Adjust for fixed header height
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth' // CSS smooth scrolling
                    });
                }
            }
        });
    });
    
    // Add touch support for planet cards on mobile devices
    planetCards.forEach(card => {
        // Add touch-active class on touch start for mobile hover effect
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        // Remove touch-active class on touch end
        card.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}

// Create star background - Alternative implementation
// This version creates a more structured star field
function createStarBackground() {
    const starContainer = document.createElement('div');
    starContainer.className = 'star-background';
    document.body.appendChild(starContainer);
    
    // Create 150 stars with this method
    for (let i = 0; i < 150; i++) {
        createStar(starContainer);
    }
}

// Create a single star with randomized properties
function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Determine star type based on size for varied star field
    const size = Math.random();
    if (size < 0.3) star.classList.add('star-small'); // 30% small stars
    else if (size < 0.8) star.classList.add('star-medium'); // 50% medium stars
    else star.classList.add('star-large'); // 20% large stars
    
    // Random position for star placement
    star.style.left = `${Math.random() * 100}vw`; // Viewport width units
    star.style.top = `${Math.random() * 100}vh`; // Viewport height units
    
    // Random twinkle animation timing
    star.style.setProperty('--twinkle-duration', `${2 + Math.random() * 3}s`); // 2-5s
    star.style.setProperty('--twinkle-delay', `${Math.random() * 5}s`); // 0-5s delay
    
    container.appendChild(star);
}

// Create random meteors - Alternative implementation
// This creates periodic meteor effects across the sky
function createRandomMeteors() {
    // Create a meteor every 3-8 seconds (randomized interval)
    setInterval(() => {
        createMeteor();
    }, 3000 + Math.random() * 5000);
}

// Create a single meteor with animation
function createMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    
    // Meteor width (visible length of the streak)
    const width = 100 + Math.random() * 200; // 100-300px length
    meteor.style.width = `${width}px`;
    
    // Random position and angle for varied meteor appearance
    meteor.style.left = `${Math.random() * 100}vw`; // Start anywhere horizontally
    meteor.style.top = `${Math.random() * 50}vh`; // Start in top half of screen
    meteor.style.transform = `rotate(${30 + Math.random() * 30}deg)`; // 30-60 degree angle
    
    document.body.appendChild(meteor);
    
    // Remove meteor after animation completes to clean up DOM
    setTimeout(() => {
        meteor.remove();
    }, 1500); // Match with CSS animation duration
}

// Adjust title layout for responsive design on mobile devices
function adjustTitleLayout() {
    console.log("Adjusting title layout");
    
    // Get current window width to determine layout adjustments
    const windowWidth = window.innerWidth;
    
    // Get all title elements across different page types
    const heroTitles = document.querySelectorAll('.hero-title, .sun-title, .moon-title');
    
    // Apply mobile optimizations when on smaller screens
    if (windowWidth <= 768) {
        // Apply mobile-specific styles to titles
        heroTitles.forEach(title => {
            title.style.textAlign = 'center'; // Center align on mobile
            title.style.position = 'relative'; // Remove any absolute positioning
            title.style.left = '0'; // Reset left positioning
            title.style.width = '100%'; // Full width on mobile
        });
        
        // Adjust layout of title containers for better mobile display
        const heroContents = document.querySelectorAll('.hero-content');
        heroContents.forEach(content => {
            content.style.justifyContent = 'center'; // Center horizontally
            content.style.alignItems = 'center'; // Center vertically
            content.style.textAlign = 'center'; // Center text alignment
        });
    } else {
        // Reset to desktop styles when on larger screens
        heroTitles.forEach(title => {
            title.style.textAlign = ''; // Reset to default/CSS value
            title.style.position = ''; // Reset to default/CSS value
            title.style.left = ''; // Reset to default/CSS value
            title.style.width = ''; // Reset to default/CSS value
        });
        
        // Reset title container alignment for desktop view
        const heroContents = document.querySelectorAll('.hero-content');
        heroContents.forEach(content => {
            content.style.justifyContent = ''; // Reset to default/CSS value
            content.style.alignItems = ''; // Reset to default/CSS value
            content.style.textAlign = ''; // Reset to default/CSS value
        });
    }
}

// Main initialization function that runs when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Initial menu button visibility check on page load
    checkMenuButtonVisibility();
    
    // Initial title layout adjustment for current screen size
    adjustTitleLayout();
    
    // Set up event listeners for window resize to handle responsive design
    window.addEventListener('resize', function() {
        checkMenuButtonVisibility(); // Update menu button on resize
        adjustTitleLayout(); // Update title layout on resize
    });
    
    // Initialize mobile navigation menu functionality
    initNavMenu();
    
    // Set up interactive planet card behaviors
    setupPlanetCardInteractions();
    
    // Set up page transition animations
    setupPageTransitions();
    
    // Create star background for cosmic atmosphere
    createStarBackground();
    
    // Add random meteor animations
    createRandomMeteors();
}); 