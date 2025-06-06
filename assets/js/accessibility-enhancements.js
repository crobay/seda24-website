// SEDA24 ACCESSIBILITY ENHANCEMENTS

class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceKeyboardNavigation();
        this.addSkipLinks();
        this.improveFormLabels();
        this.enhanceButtonAccessibility();
        this.addAltTexts();
        this.setupFocusManagement();
        this.addARIALabels();
        console.log('SEDA24 Accessibility enhancements loaded');
    }

    // Keyboard Navigation
    enhanceKeyboardNavigation() {
        // Escape key functionality
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals or menus
                const openModals = document.querySelectorAll('.modal:not([style*="display: none"])');
                openModals.forEach(modal => {
                    if (modal.style.display !== 'none') {
                        modal.style.display = 'none';
                    }
                });

                // Close mobile menu if open
                const mobileNav = document.querySelector('.nav.active');
                if (mobileNav) {
                    mobileNav.classList.remove('active');
                }
            }
        });

        // Tab navigation enhancement
        const focusableElements = 'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = Array.from(document.querySelectorAll(focusableElements));
                const index = focusable.indexOf(document.activeElement);
                
                if (e.shiftKey) {
                    // Shift + Tab (backwards)
                    if (index <= 0) {
                        focusable[focusable.length - 1].focus();
                        e.preventDefault();
                    }
                } else {
                    // Tab (forwards)
                    if (index >= focusable.length - 1) {
                        focusable[0].focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Skip Links für bessere Navigation
    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Zum Hauptinhalt springen';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #1E537C;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.2s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Main content landmark
        const mainContent = document.querySelector('main') || document.querySelector('.hero').parentElement;
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }

    // Form Labels verbessern
    improveFormLabels() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Stelle sicher, dass jedes Input ein Label hat
            if (!input.getAttribute('aria-label') && !input.id) {
                const label = input.closest('.form-group')?.querySelector('label');
                if (label && !input.id) {
                    const id = 'input-' + Math.random().toString(36).substr(2, 9);
                    input.id = id;
                    label.setAttribute('for', id);
                }
            }

            // Required fields kennzeichnen
            if (input.required && !input.getAttribute('aria-required')) {
                input.setAttribute('aria-required', 'true');
                
                // Visueller Indikator für required fields
                const label = document.querySelector(`label[for="${input.id}"]`) || 
                             input.closest('.form-group')?.querySelector('label');
                if (label && !label.querySelector('.required-indicator')) {
                    const indicator = document.createElement('span');
                    indicator.textContent = ' *';
                    indicator.className = 'required-indicator';
                    indicator.style.color = '#dc3545';
                    indicator.setAttribute('aria-label', 'erforderlich');
                    label.appendChild(indicator);
                }
            }

            // Error states
            input.addEventListener('invalid', () => {
                input.setAttribute('aria-invalid', 'true');
                input.setAttribute('aria-describedby', input.id + '-error');
            });

            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    input.removeAttribute('aria-invalid');
                    input.removeAttribute('aria-describedby');
                }
            });
        });
    }

    // Button Accessibility
    enhanceButtonAccessibility() {
        const buttons = document.querySelectorAll('button, .btn, [role="button"]');
        buttons.forEach(button => {
            // Mindestgröße für Touch-Targets
            const rect = button.getBoundingClientRect();
            if (rect.height < 44 || rect.width < 44) {
                button.style.minHeight = '44px';
                button.style.minWidth = '44px';
                button.style.display = 'inline-flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
            }

            // ARIA Labels für Icon-only Buttons
            if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
                const icon = button.querySelector('i[class*="fa-"]');
                if (icon) {
                    const iconClass = Array.from(icon.classList).find(cls => cls.startsWith('fa-'));
                    if (iconClass) {
                        const action = iconClass.replace('fa-', '').replace('-', ' ');
                        button.setAttribute('aria-label', action);
                    }
                }
            }

            // Enter und Space für custom buttons
            if (button.getAttribute('role') === 'button' && button.tagName !== 'BUTTON') {
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        button.click();
                    }
                });
            }
        });
    }

    // Alt-Texte für Bilder verbessern
    addAltTexts() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.alt) {
                // Versuche Alt-Text aus Dateiname zu generieren
                const src = img.src;
                const filename = src.split('/').pop().split('.')[0];
                const altText = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                img.alt = altText;
            }

            // Lazy loading für bessere Performance
            if (!img.loading) {
                img.loading = 'lazy';
            }
        });
    }

    // Focus Management
    setupFocusManagement() {
        // Focus-visible Polyfill für ältere Browser
        document.addEventListener('keydown', () => {
            document.body.classList.add('using-keyboard');
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });

        // Focus Styles nur bei Keyboard-Navigation
        const style = document.createElement('style');
        style.textContent = `
            body:not(.using-keyboard) *:focus {
                outline: none !important;
            }
            
            body.using-keyboard *:focus {
                outline: 2px solid #F9B233 !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ARIA Labels hinzufügen
    addARIALabels() {
        // Navigation
        const nav = document.querySelector('nav');
        if (nav && !nav.getAttribute('aria-label')) {
            nav.setAttribute('aria-label', 'Hauptnavigation');
        }

        // Footer
        const footer = document.querySelector('footer');
        if (footer && !footer.getAttribute('aria-label')) {
            footer.setAttribute('aria-label', 'Fußbereich');
        }

        // Sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (!section.getAttribute('aria-label') && !section.getAttribute('aria-labelledby')) {
                const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
                if (heading && heading.textContent) {
                    section.setAttribute('aria-labelledby', heading.id || `section-heading-${index}`);
                    if (!heading.id) {
                        heading.id = `section-heading-${index}`;
                    }
                }
            }
        });

        // Links die in neuem Tab öffnen
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            if (!link.getAttribute('aria-label')) {
                const text = link.textContent + ' (öffnet in neuem Tab)';
                link.setAttribute('aria-label', text);
            }
        });
    }

    // Color Contrast Check (Development Tool)
    checkColorContrast() {
        if (process.env.NODE_ENV === 'development') {
            console.log('🎨 Color Contrast Check aktiviert');
            // Hier könnten automatische Contrast-Checks implementiert werden
        }
    }

    // Screen Reader Announcements
    announce(message, priority = 'polite') {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Reduced Motion Support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.classList.add('reduce-motion');
}

// High Contrast Support
if (window.matchMedia('(prefers-contrast: high)').matches) {
    document.documentElement.classList.add('high-contrast');
}

// Dark Mode Support
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark-mode');
}

// Initialize Accessibility Manager
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager = new AccessibilityManager();
});

// Export for testing
window.SEDA24Accessibility = AccessibilityManager;