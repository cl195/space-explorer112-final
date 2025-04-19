// Basic version - Version 3 minimalist version
// Removed star background and all animation effects

// Page load initialization
document.addEventListener('DOMContentLoaded', function() {
    // Add basic anchor jump functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore empty anchors
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo(0, targetElement.offsetTop - 50); // Scroll to target with 50px offset from top
            }
        });
    });
    
    // Ensure all content is immediately visible when loaded
    document.querySelectorAll('.fade-in-element, .slide-in-element, .structure-item, .planet-detail-section').forEach(el => {
        el.style.opacity = '1'; // Set full opacity
        el.style.transform = 'none'; // Reset any transform properties
    });
}); 