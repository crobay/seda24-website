// SEDA24 PERFORMANCE OPTIMIERTE VERSION

// Critical CSS laden
function loadCriticalCSS() {
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'stylesheet';
    criticalCSS.href = '/assets/css/styles-optimized.css';
    criticalCSS.media = 'all';
    document.head.appendChild(criticalCSS);
}

// Lazy Loading für Bilder
class LazyImageLoader {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                this.observer.observe(img);
            });
        }
    }

    loadImage(img) {
        img.src = img.dataset.src;
        img.onload = () => img.classList.add('loaded');
        delete img.dataset.src;
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => this.collectMetrics(), 100);
            });
        }
    }

    collectMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        this.metrics = {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            loadComplete: navigation.loadEventEnd - navigation.navigationStart,
            firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
        };

        console.log('SEDA24 Performance Metriken:', this.metrics);
        this.sendMetrics();
    }

    sendMetrics() {
        // Performance Daten können an Analytics gesendet werden
        if (window.gtag) {
            window.gtag('event', 'timing_complete', {
                name: 'load',
                value: Math.round(this.metrics.loadComplete)
            });
        }
    }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registriert');
            })
            .catch(error => {
                console.log('Service Worker Fehler:', error);
            });
    });
}

// Optimierte Font Loading
function optimizeFonts() {
    if ('fonts' in document) {
        document.fonts.load('1em Lato').then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    }
}

// Critical Resource Preloading
function preloadCriticalResources() {
    const resources = [
        { href: '/assets/css/styles-optimized.css', as: 'style' },
        { href: '/assets/js/menu.js', as: 'script' },
        { href: '/assets/fonts/lato.woff2', as: 'font', type: 'font/woff2' }
    ];

    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        Object.assign(link, resource);
        if (resource.type) link.type = resource.type;
        if (resource.as === 'font') link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    new LazyImageLoader();
    new PerformanceMonitor();
    optimizeFonts();
    preloadCriticalResources();
});

// Export für Debugging
window.SEDA24Performance = {
    LazyImageLoader,
    PerformanceMonitor
};