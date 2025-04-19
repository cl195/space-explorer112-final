// Ensure all elements are visible after page loads
document.addEventListener('DOMContentLoaded', function() {
    // Make all content elements immediately visible
    document.querySelectorAll('.phase-item, .moon-card, .resource-card, .fact-slide, .timeline-item, .feature-item').forEach(el => {
        el.style.opacity = 1; // Set full opacity
        el.style.transform = 'none'; // Remove any transform effects
    });
    
    // Show only the first fact, hide others
    const factSlides = document.querySelectorAll('.fact-slide');
    if (factSlides.length > 0) {
        factSlides[0].classList.add('active'); // Mark first fact as active
        for (let i = 1; i < factSlides.length; i++) {
            factSlides[i].style.display = 'none'; // Hide all other facts
        }
    }
}); 