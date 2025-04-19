// Moon page specific JavaScript - Version 4 simplified

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make all phase items immediately visible
    document.querySelectorAll('.phase-item').forEach(item => {
        item.style.opacity = '1';
    });
    
    // Make all moon cards immediately visible
    document.querySelectorAll('.moon-card').forEach(card => {
        card.style.opacity = '1';
    });
    
    // Make all resource cards immediately visible
    document.querySelectorAll('.resource-card').forEach(card => {
        card.style.opacity = '1';
    });
    
    // Remove all animation classes
    document.querySelectorAll('.animated, .fadeIn, .slideIn').forEach(element => {
        element.classList.remove('animated', 'fadeIn', 'slideIn');
    });
    
    // Initialize simple scroll handling
    handleSimpleScroll();
});

// Function to handle simple scroll effects
function handleSimpleScroll() {
    // Make all fade-in and slide-in elements immediately visible
    document.querySelectorAll('.fade-in-element, .slide-in-element').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}

// Note: All animations and interactive effects have been removed for simplicity 