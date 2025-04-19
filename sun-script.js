// Sun page specific JavaScript - Version 4 simplified

// Function to animate progress bars
function animateProgressBars() {
    // Get all progress bars
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        // Store original width
        const width = bar.style.width;
        // Reset width to 0
        bar.style.width = '0';
        // Animate to original width after delay
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Function to create simplified sun rays effect
function createSimpleSunRays() {
    const rays = document.querySelector('.sun-rays');
    const numberOfRays = 8; // Reduced number of rays for simplicity
    
    // Create individual rays
    for (let i = 0; i < numberOfRays; i++) {
        const ray = document.createElement('div');
        ray.className = 'sun-ray';
        // Position each ray at equal angles
        ray.style.transform = `rotate(${i * (360 / numberOfRays)}deg)`;
        rays.appendChild(ray);
    }
}

// Function to handle scroll animations
function handleScroll() {
    const cards = document.querySelectorAll('.sun-card');
    const windowHeight = window.innerHeight;
    
    // Check if cards are in viewport
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight * 0.8) {
            card.classList.add('visible');
        }
    });
}

// Function to add basic scroll animations
function addBasicScrollAnimations() {
    // Get all elements that need animation
    const elements = document.querySelectorAll('.temp-item, .velocity-item, .element-row');
    
    // Set initial state
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        
        // Animate elements when they come into view
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// Function to add simple element interaction
function addSimpleElementInteraction() {
    const elementBoxes = document.querySelectorAll('.element-box');
    
    // Add hover effects to element boxes
    elementBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const symbol = box.querySelector('.element-symbol');
            symbol.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
        });
        
        box.addEventListener('mouseleave', () => {
            const symbol = box.querySelector('.element-symbol');
            symbol.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create sun rays
    createSimpleSunRays();
    
    // Animate progress bars
    animateProgressBars();
    
    // Initialize scroll handling
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initialize animations
    addBasicScrollAnimations();
    addSimpleElementInteraction();
}); 