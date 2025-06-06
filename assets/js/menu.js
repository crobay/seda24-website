// Mobile Navigation Menu Handler with improved detection
function initMobileNavigation() {
    console.log('Initializing mobile navigation...');
    
    // Clear any existing event listeners
    const existingToggle = document.getElementById('navbar-toggle');
    if (existingToggle) {
        existingToggle.replaceWith(existingToggle.cloneNode(true));
    }
    
    // Try new navigation first
    const newNavToggle = document.getElementById('navbar-toggle');
    const newMobileMenu = document.getElementById('navbar-mobile');
    
    if (newNavToggle && newMobileMenu) {
        console.log('New navigation found, setting up...');
        
        newNavToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('New hamburger clicked - classList:', newMobileMenu.classList);
            
            if (newMobileMenu.classList.contains('active')) {
                newMobileMenu.classList.remove('active');
                newNavToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                newMobileMenu.classList.add('active');
                newNavToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close on link clicks
        newMobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                newMobileMenu.classList.remove('active');
                newNavToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close on overlay click
        newMobileMenu.addEventListener('click', function(e) {
            if (e.target === newMobileMenu) {
                newMobileMenu.classList.remove('active');
                newNavToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        return;
    }
}