// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Combined header scroll effect with logo behavior
let lastScrollTop = 0;

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq__question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqId = question.getAttribute('data-faq');
        const answer = document.querySelector(`.faq__answer[data-faq="${faqId}"]`);
        const icon = question.querySelector('i');
        
        // Close all other FAQ items
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                const otherId = otherQuestion.getAttribute('data-faq');
                const otherAnswer = document.querySelector(`.faq__answer[data-faq="${otherId}"]`);
                const otherIcon = otherQuestion.querySelector('i');
                
                otherAnswer.classList.remove('open');
                otherQuestion.setAttribute('aria-expanded', 'false');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current FAQ item
        if (answer.classList.contains('open')) {
            answer.classList.remove('open');
            question.setAttribute('aria-expanded', 'false');
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.classList.add('open');
            question.setAttribute('aria-expanded', 'true');
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Modal functionality
const modal = document.getElementById('contact-modal');

function openContactForm() {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactForm() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeContactForm();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeContactForm();
    }
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        // For now, we'll just show a success message
        alert('Vielen Dank für Ihre Anfrage! Wir melden uns binnen 24 Stunden bei Ihnen.');
        
        // Reset form and close modal
        contactForm.reset();
        closeContactForm();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// Observe trust items, quality features, and process steps
document.querySelectorAll('.trust__item, .quality__feature, .process__step').forEach(item => {
    item.classList.add('animate-on-scroll');
    observer.observe(item);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero::before');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Back to Top Button functionality
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animated Counter for Hero Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const suffix = element.innerHTML.includes('<sup>+</sup>') ? '<sup>+</sup>' : '';
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.innerHTML = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.innerHTML = target + suffix;
        }
    }
    updateCounter();
}

// Intersection Observer for animations and counters
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when hero section is visible
            if (entry.target.classList.contains('hero')) {
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Loading animation with premium effects
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial hero animations with stagger effect
    const heroElements = document.querySelectorAll('.hero__badge, .hero__title, .hero__description, .hero__stats, .hero__buttons, .hero__trust');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Observe hero section for counter animation
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        animationObserver.observe(heroSection);
    }
});

// Initialize tooltips for better UX
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add click-to-call tracking
document.querySelectorAll('a[href^="tel:"]').forEach(tel => {
    tel.addEventListener('click', () => {
        // Track phone call clicks (integrate with analytics if needed)
        console.log('Phone call initiated:', tel.href);
    });
});

// Header scroll behavior with logo color change
let logoColorChanged = false;
const headerElement = document.querySelector('.header');
const logoElement = document.querySelector('.nav__logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        headerElement.classList.add('scrolled');
        if (!logoColorChanged) {
            logoElement.classList.add('logo-blue');
            logoColorChanged = true;
        }
    } else {
        headerElement.classList.remove('scrolled');
        // Logo stays blue even when scrolled back up
    }
});

// Premium Testimonial Carousel functionality
let currentTestimonialIndex = 1;
const totalTestimonials = 3;

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    const currentTestimonial = document.querySelector(`[data-testimonial="${index}"]`);
    if (currentTestimonial) {
        currentTestimonial.classList.add('active');
    }
    
    // Activate current dot
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

// Auto-rotate testimonials every 6 seconds
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
    const elementsToAnimate = document.querySelectorAll('.usp__card, .trust__item, .quality__feature, .process__step');
    
    elementsToAnimate.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    addScrollAnimations();
    startTestimonialRotation();
    
    // Pause testimonial rotation on hover
    const testimonialCarousel = document.querySelector('.testimonials__carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', stopTestimonialRotation);
        testimonialCarousel.addEventListener('mouseleave', startTestimonialRotation);
    }
    
    // Add loading states for better perceived performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
    
    // Initialize any additional interactive elements
    console.log('SEDA24 Premium Website Loaded');

// Service Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
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
});

// Error handling for better user experience
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could implement user-friendly error reporting here
});

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize counters immediately for testing
document.addEventListener('DOMContentLoaded', function() {
    // Force counter animation on page load
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
    });
});

// Fixed missing closing brace
