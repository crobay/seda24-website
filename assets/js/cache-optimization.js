// SEDA24 CACHE UND PERFORMANCE OPTIMIERUNG

class CacheManager {
    constructor() {
        this.cacheName = 'seda24-dynamic-v1';
        this.maxAge = 24 * 60 * 60 * 1000; // 24 Stunden
        this.init();
    }

    init() {
        // Service Worker Registrierung
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker aktiv - Caching enabled');
                    this.serviceWorkerReady = true;
                })
                .catch(error => {
                    console.log('❌ Service Worker Fehler:', error);
                });
        }

        // Browser Cache Kontrolle
        this.setupCacheHeaders();
        this.preloadCriticalResources();
    }

    setupCacheHeaders() {
        // Cache-Control für verschiedene Ressourcentypen
        const cacheRules = {
            '.css': 'max-age=31536000', // 1 Jahr für CSS
            '.js': 'max-age=31536000',  // 1 Jahr für JS
            '.jpg': 'max-age=2592000', // 30 Tage für Bilder
            '.png': 'max-age=2592000',
            '.webp': 'max-age=2592000',
            '.woff2': 'max-age=31536000' // 1 Jahr für Fonts
        };

        console.log('📋 Cache Regeln aktiviert für optimale Performance');
    }

    preloadCriticalResources() {
        const criticalResources = [
            '/assets/css/styles-optimized.css',
            '/assets/js/performance-optimized.js',
            '/header.html',
            '/footer.html'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            
            if (resource.endsWith('.css')) {
                link.as = 'style';
            } else if (resource.endsWith('.js')) {
                link.as = 'script';
            } else {
                link.as = 'fetch';
                link.crossOrigin = 'anonymous';
            }
            
            link.href = resource;
            document.head.appendChild(link);
        });

        console.log('🚀 Kritische Ressourcen vorgeladen');
    }

    // Cache für AJAX Requests
    async cacheResponse(url, response) {
        if ('caches' in window) {
            try {
                const cache = await caches.open(this.cacheName);
                await cache.put(url, response.clone());
                console.log(`📦 Cached: ${url}`);
            } catch (error) {
                console.log('Cache Fehler:', error);
            }
        }
        return response;
    }

    // Optimierte Bildladung mit Cache
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Lazy Loading
            if ('loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }

            // WebP Support prüfen und Cache nutzen
            if (this.supportsWebP() && img.src.includes('.jpg')) {
                const webpSrc = img.src.replace('.jpg', '.webp');
                this.checkCachedImage(webpSrc).then(cached => {
                    if (cached) {
                        img.src = webpSrc;
                    }
                });
            }
        });
    }

    async checkCachedImage(url) {
        if ('caches' in window) {
            try {
                const cache = await caches.open(this.cacheName);
                const response = await cache.match(url);
                return !!response;
            } catch (error) {
                return false;
            }
        }
        return false;
    }

    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    // Performance Monitoring mit Cache Metriken
    monitorCachePerformance() {
        if ('performance' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.transferSize === 0) {
                        console.log(`🚀 Cache Hit: ${entry.name}`);
                    } else {
                        console.log(`📥 Network: ${entry.name} (${entry.transferSize} bytes)`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }

    // Cache Statistiken
    async getCacheStats() {
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                const stats = {};
                
                for (const cacheName of cacheNames) {
                    const cache = await caches.open(cacheName);
                    const keys = await cache.keys();
                    stats[cacheName] = keys.length;
                }
                
                console.log('📊 Cache Statistiken:', stats);
                return stats;
            } catch (error) {
                console.log('Cache Stats Fehler:', error);
                return {};
            }
        }
        return {};
    }
}

// Mobile Performance Optimierungen
class MobileOptimizer {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }

    init() {
        if (this.isMobile) {
            console.log('📱 Mobile optimiert geladen');
            this.optimizeForMobile();
        }
    }

    optimizeForMobile() {
        // Reduzierte Animationen für schwächere Geräte
        if (this.isLowEndDevice()) {
            document.documentElement.classList.add('reduce-motion');
        }

        // Touch-optimierte Interaktionen
        this.optimizeTouchTargets();
        
        // Viewport optimieren
        this.optimizeViewport();
    }

    isLowEndDevice() {
        return navigator.hardwareConcurrency <= 2 || 
               navigator.deviceMemory <= 2 ||
               navigator.connection?.effectiveType === 'slow-2g' ||
               navigator.connection?.effectiveType === '2g';
    }

    optimizeTouchTargets() {
        const buttons = document.querySelectorAll('button, a, .btn');
        buttons.forEach(btn => {
            const rect = btn.getBoundingClientRect();
            if (rect.height < 44) { // Apple's minimum touch target
                btn.style.minHeight = '44px';
                btn.style.display = 'flex';
                btn.style.alignItems = 'center';
                btn.style.justifyContent = 'center';
            }
        });
    }

    optimizeViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
        }
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    window.cacheManager = new CacheManager();
    window.mobileOptimizer = new MobileOptimizer();
    
    // Cache Performance Monitor starten
    if (window.cacheManager) {
        window.cacheManager.monitorCachePerformance();
        window.cacheManager.optimizeImages();
    }
});

// Export für globale Nutzung
window.SEDA24Cache = {
    CacheManager,
    MobileOptimizer
};