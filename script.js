// Main script file for the Solar System website

// Function to create a starry background effect
function createStars() {
    // Check if star background already exists to avoid duplicates
    if (document.querySelector('.star-background')) return;
    
    // Create star background container
    const starBackground = document.createElement('div');
    starBackground.classList.add('star-background');
    document.body.appendChild(starBackground);
    
    // Set number of stars to create
    const numberOfStars = 75;
    
    // Create individual stars
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Set random position for each star
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Set star size class
        star.classList.add('star-small');
        
        // Apply styles to star
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.opacity = (0.3 + Math.random() * 0.5).toString();
        
        // Add star to background
        starBackground.appendChild(star);
    }
}

// Create stars when page loads
document.addEventListener('DOMContentLoaded', createStars);

// Function to handle scroll events and animations
function handleScroll() {
    // Get all structure items
    const items = document.querySelectorAll('.structure-item');
    items.forEach(item => {
        // Make items visible
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
    
    // Get all planet detail sections
    const planetSections = document.querySelectorAll('.planet-detail-section');
    planetSections.forEach(section => {
        // Add visible class to sections
        section.classList.add('visible');
    });
}

// Function to set up smooth scrolling
function setupSmoothScroll() {
    // Get all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Get target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Prevent default anchor behavior
                e.preventDefault();
                // Scroll to target with offset
                window.scrollTo({
                    top: targetElement.offsetTop - 50
                });
            }
        });
    });
}

// Function to set up page transitions
function setupPageTransitions() {
    // Basic page transition setup
    // This is a simplified version that uses direct page navigation
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize structure items
    handleScroll();
    
    // Set up smooth scrolling
    setupSmoothScroll();
    
    // Add fade-in class to body
    document.body.classList.add('fade-in');
}); 