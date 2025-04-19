// Sun page script - Version 3 basic version

// Execute basic initialization when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all elements are immediately visible, no animations needed
    document.querySelectorAll('.sun-card, .temp-item, .velocity-item, .element-row').forEach(el => {
        el.style.opacity = '1'; // Set full opacity
        el.style.transform = 'none'; // Remove any transform effects
        el.classList.add('visible'); // Add visible class
    });
    
    // Set progress bars directly to final width
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        // Display final width immediately, no animations
        bar.style.transition = 'none';
    });
    
    // Remove all animation classes and interactive effects
    document.querySelectorAll('.animated, .fadeIn, .fadeInUp').forEach(el => {
        el.classList.remove('animated', 'fadeIn', 'fadeInUp');
    });
}); 