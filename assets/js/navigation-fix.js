// Universal Navigation Fix for SEDA24
// This script ensures menu always works regardless of cache issues

(function() {
    'use strict';
    
    let navigationInitialized = false;
    let retryAttempts = 0;
    const maxRetries = 10;
    
    function forceNavigationInit() {
        if (navigationInitialized && document.querySelector('#navbar-toggle.working')) {
            return true;
        }
        
        const toggle = document.getElementById('navbar-toggle');
        const menu = document.getElementById('navbar-mobile');
        
        if (!toggle || !menu) {
            if (retryAttempts < maxRetries) {
                retryAttempts++;
                setTimeout(forceNavigationInit, 500);
            }
            return false;
        }
        
        // Remove existing listeners
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        // Add working class to prevent re-initialization
        newToggle.classList.add('working');
        
        // Setup click handler
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = menu.classList.contains('active');
            
            if (isActive) {
                menu.classList.remove('active');
                newToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                menu.classList.add('active');
                newToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close on menu link clicks
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                newToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!newToggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
                newToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        navigationInitialized = true;
        console.log('Navigation forcefully initialized');
        return true;
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceNavigationInit);
    } else {
        forceNavigationInit();
    }
    
    // Re-initialize on page visibility change (for cache issues)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(forceNavigationInit, 200);
        }
    });
    
    // Re-initialize when returning from other pages
    window.addEventListener('pageshow', function() {
        setTimeout(forceNavigationInit, 200);
    });
    
    // Expose function globally for manual calls
    window.forceNavigationInit = forceNavigationInit;
    
})();