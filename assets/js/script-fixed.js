console.log('SEDA24 Premium Website Loaded');

// Mobile Navigation Toggle
function initMobileNavigation() {
    // Try new navigation first
    const newNavToggle = document.getElementById('navbar-toggle');
    const newMobileMenu = document.getElementById('navbar-mobile');
    
    if (newNavToggle && newMobileMenu) {
        console.log('New navigation found, setting up...');
        
        newNavToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('New hamburger clicked');
            
            if (newMobileMenu.style.display === 'flex') {
                newMobileMenu.style.display = 'none';
                document.body.style.overflow = '';
            } else {
                newMobileMenu.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close on link clicks
        newMobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                newMobileMenu.style.display = 'none';
                document.body.style.overflow = '';
            });
        });
        
        return;
    }
    
    // Fallback to old navigation
    const navToggle = document.getElementById('nav-toggle');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');

    console.log('Navigation elements found, initializing...');

    if (navToggle && mobileOverlay) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Toggle clicked');
            
            // Toggle new mobile menu mit direkter Style-Kontrolle
            if (mobileOverlay.style.display === 'flex') {
                mobileOverlay.style.display = 'none';
            } else {
                mobileOverlay.style.display = 'flex';
            }
            
            // Toggle hamburger icon
            const icon = navToggle.querySelector('i');
            if (mobileOverlay.style.display === 'flex') {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-phone');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mobileOverlay.classList.contains('show')) {
                    mobileOverlay.classList.remove('show');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        mobileOverlay.addEventListener('click', function(event) {
            if (event.target === mobileOverlay) {
                mobileOverlay.classList.remove('show');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Service Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCategories = document.querySelectorAll('.service-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter service categories
            serviceCategories.forEach(category => {
                if (filter === 'all') {
                    category.classList.remove('hidden');
                } else if (category.getAttribute('data-category') === filter) {
                    category.classList.remove('hidden');
                } else {
                    category.classList.add('hidden');
                }
            });
        });
    });

    // Initialize counters on page load
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        setTimeout(() => {
            animateCounter(counter, target);
        }, 500);
    });

    // FAQ Accordion functionality with answers
    const faqItems = document.querySelectorAll('.faq__item');
    
    // Beispielantworten
    const answers = [
        "Wir bieten ein umfassendes Portfolio an Reinigungsdienstleistungen. Für Privatkunden: Haushaltsreinigung, Fensterreinigung und Grundreinigung. Für Gewerbekunden: Büroreinigung, Unterhaltsreinigung und Glasreinigung.",
        "In der Regel können wir innerhalb von 24-48 Stunden einen Termin anbieten. Bei dringenden Anfragen bemühen wir uns um schnellstmögliche Lösungen.",
        "Ja, wir verwenden ausschließlich umweltfreundliche Reinigungsmittel, die für Mensch, Tier und Umwelt unbedenklich sind.",
        "Selbstverständlich. Wir sind vollumfänglich versichert mit einer Deckungssumme von 10 Millionen Euro.",
        "Absolut. Wir bieten regelmäßige Reinigungsdienste an - wöchentlich, zweiwöchentlich oder monatlich, ganz nach Ihren Bedürfnissen.",
        "Qualität steht bei uns an erster Stelle. Wir führen kontinuierliche Qualitätskontrollen durch und reagieren sofort auf Feedback."
    ];
    
    faqItems.forEach((item, index) => {
        // Erstelle das Antwortelement, falls es noch nicht existiert
        let answer = item.querySelector('.faq__answer');
        if (!answer) {
            answer = document.createElement('div');
            answer.className = 'faq__answer';
            if (index < answers.length) {
                answer.innerHTML = '<p>' + answers[index] + '</p>';
            } else {
                answer.innerHTML = '<p>Weitere Informationen erhalten Sie gerne in einem persönlichen Gespräch.</p>';
            }
            item.appendChild(answer);
        }
        
        // Füge Event-Listener für die Fragen hinzu
        const question = item.querySelector('.faq__question');
        question.addEventListener('click', function() {
            // Schließe alle anderen offenen FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Öffne/schließe das aktuelle FAQ
            item.classList.toggle('active');
        });
    });
});

// Fixed Counter Animation Function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const hasPlus = element.innerHTML.includes('<sup>+</sup>');
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            const currentValue = Math.floor(start);
            element.innerHTML = hasPlus ? currentValue + '<sup>+</sup>' : currentValue;
            requestAnimationFrame(updateCounter);
        } else {
            element.innerHTML = hasPlus ? target + '<sup>+</sup>' : target;
        }
    }
    updateCounter();
}

// Header scroll behavior
let logoColorChanged = false;
const headerElement = document.querySelector('.header');
const logoElement = document.querySelector('.nav__logo');

if (headerElement && logoElement) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerElement.classList.add('scrolled');
            if (!logoColorChanged) {
                logoElement.classList.add('logo-blue');
                logoColorChanged = true;
            }
        } else {
            headerElement.classList.remove('scrolled');
        }
    });
}

// Contact form functionality
function openContactForm() {
    const contactModal = document.querySelector('.contact-modal');
    if (contactModal) {
        contactModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeContactForm() {
    const contactModal = document.querySelector('.contact-modal');
    if (contactModal) {
        contactModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const contactModal = document.querySelector('.contact-modal');
    if (e.target === contactModal) {
        closeContactForm();
    }
});

// Enhanced testimonial carousel functionality
let currentTestimonialIndex = 1;
const totalTestimonials = 3;

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    const currentTestimonial = document.querySelector(`[data-testimonial="${index}"]`);
    if (currentTestimonial) {
        currentTestimonial.classList.add('active');
    }
    
    if (dots[index - 1]) {
        dots[index - 1].classList.add('active');
    }
}

function changeTestimonial(direction) {
    currentTestimonialIndex += direction;
    
    if (currentTestimonialIndex > totalTestimonials) {
        currentTestimonialIndex = 1;
    } else if (currentTestimonialIndex < 1) {
        currentTestimonialIndex = totalTestimonials;
    }
    
    showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(index) {
    currentTestimonialIndex = index;
    showTestimonial(index);
}

// Auto-rotate testimonials
let testimonialInterval;

function startTestimonialRotation() {
    testimonialInterval = setInterval(() => {
        changeTestimonial(1);
    }, 6000);
}

function stopTestimonialRotation() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
    }
}

// Enhanced scroll animations with stagger effect
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });

    // Animate USP features
    document.querySelectorAll('.usps__feature').forEach(feature => {
        observer.observe(feature);
    });
}

// Initialize testimonials
document.addEventListener('DOMContentLoaded', function() {
    showTestimonial(1);
    startTestimonialRotation();
    addScrollAnimations();
    
    const testimonialControls = document.querySelector('.testimonials__controls');
    if (testimonialControls) {
        testimonialControls.addEventListener('mouseenter', stopTestimonialRotation);
        testimonialControls.addEventListener('mouseleave', startTestimonialRotation);
    }
});

// Back to top functionality
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 150) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Floating icons animation on scroll
const floatingActions = document.querySelector('.floating-actions');
if (floatingActions) {
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : 600;
        
        if (window.pageYOffset > heroHeight * 0.8) {
            floatingActions.classList.add('show');
        } else {
            floatingActions.classList.remove('show');
        }
    });
}

// Phone call tracking
document.querySelectorAll('a[href^="tel:"]').forEach(tel => {
    tel.addEventListener('click', function() {
        console.log('Phone call initiated:', tel.href);
    });
});