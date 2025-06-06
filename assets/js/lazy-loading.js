// SEDA24 LAZY LOADING UND PERFORMANCE OPTIMIERUNGEN

class SEDA24Performance {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        this.imageObserver = null;
        this.init();
    }

    init() {
        console.log('SEDA24 Performance Optimierungen geladen');
        this.setupLazyLoading();
        this.optimizeImages();
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.imageObserver.unobserve(entry.target);
                    }
                });
            }, this.observerOptions);

            // Alle Bilder mit data-src für Lazy Loading markieren
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                img.classList.add('lazy-image', 'loading');
                this.imageObserver.observe(img);
            });
        } else {
            // Fallback für ältere Browser
            this.loadAllImages();
        }
    }

    loadImage(img) {
        img.classList.add('loading');
        
        const image = new Image();
        image.onload = () => {
            img.src = img.dataset.src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            
            // Entferne data-src nach dem Laden
            delete img.dataset.src;
        };
        
        image.onerror = () => {
            img.classList.remove('loading');
            img.alt = 'Bild konnte nicht geladen werden';
        };
        
        image.src = img.dataset.src;
    }

    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            delete img.dataset.src;
        });
    }

    optimizeImages() {
        // WebP Support prüfen
        this.supportsWebP().then(supported => {
            if (supported) {
                console.log('WebP wird unterstützt - optimierte Bilder werden geladen');
                this.convertToWebP();
            }
        });
    }

    supportsWebP() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    convertToWebP() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src && img.src.includes('.jpg')) {
                const webpSrc = img.src.replace('.jpg', '.webp');
                // Teste ob WebP Version existiert
                this.testImageExists(webpSrc).then(exists => {
                    if (exists) {
                        img.src = webpSrc;
                    }
                });
            }
        });
    }

    testImageExists(url) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    preloadCriticalResources() {
        // Kritische CSS und JS Dateien vorladen
        const criticalResources = [
            '/assets/css/styles.css',
            '/assets/js/menu.js',
            '/assets/fonts/lato.woff2',
            '/assets/fonts/nunito.woff2'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            
            if (resource.endsWith('.css')) {
                link.as = 'style';
            } else if (resource.endsWith('.js')) {
                link.as = 'script';
            } else if (resource.includes('fonts')) {
                link.as = 'font';
                link.type = 'font/woff2';
                link.crossOrigin = 'anonymous';
            }
            
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    // Performance Monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('SEDA24 Performance Metriken:');
                    console.log(`DOM geladen: ${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`);
                    console.log(`Seite komplett geladen: ${perfData.loadEventEnd - perfData.navigationStart}ms`);
                    
                    // First Contentful Paint messen
                    const paintEntries = performance.getEntriesByType('paint');
                    paintEntries.forEach(entry => {
                        console.log(`${entry.name}: ${entry.startTime}ms`);
                    });
                }, 0);
            });
        }
    }

    // Service Worker Cache Status
    checkCacheStatus() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                console.log('Service Worker aktiv - Caching verfügbar');
            }).catch(error => {
                console.log('Service Worker fehler:', error);
            });
        }
    }
}

// Initialisierung
if (typeof window !== 'undefined') {
    window.seda24Performance = new SEDA24Performance();
    window.seda24Performance.measurePerformance();
    window.seda24Performance.checkCacheStatus();
}