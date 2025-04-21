// Animated progress bars - simplified version
function animateProgressBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Create simplified sun ray effect
function createSimpleSunRays() {
    const rays = document.querySelector('.sun-rays');
    const numberOfRays = 8; // Reduced number of rays
    
    for (let i = 0; i < numberOfRays; i++) {
        const ray = document.createElement('div');
        ray.className = 'sun-ray';
        ray.style.transform = `rotate(${i * (360 / numberOfRays)}deg)`;
        rays.appendChild(ray);
    }
}

// Simplified scroll animations
function handleScroll() {
    const cards = document.querySelectorAll('.sun-card');
    const windowHeight = window.innerHeight;
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight * 0.8) {
            card.classList.add('visible');
        }
    });
}

// Simplified scroll animations
function addBasicScrollAnimations() {
    const elements = document.querySelectorAll('.temp-item, .velocity-item, .element-row');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
    });
    
    // Use simple scroll detection instead of IntersectionObserver
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// Simplified element icon interactions
function addSimpleElementInteraction() {
    const elementBoxes = document.querySelectorAll('.element-box');
    
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

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    createSimpleSunRays();
    animateProgressBars();
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Simplified animation effects
    addBasicScrollAnimations();
    addSimpleElementInteraction();
}); 