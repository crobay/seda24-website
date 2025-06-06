// Service Worker for caching
const CACHE_NAME = 'seda24-performance-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/styles-optimized.css',
    '/assets/css/forms.css',
    '/assets/js/performance-optimized.js',
    '/assets/js/cache-optimization.js',
    '/assets/js/forms.js',
    '/assets/js/menu.js',
    '/assets/js/include.js',
    '/header.html',
    '/footer.html',
    '/promo-banner.html',
    '/quick-contact.html',
    '/favicon.svg',
    '/favicon.ico'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // Nur GET Requests cachen
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    // Cache hit - direkt zurückgeben
                    return response;
                }
                
                // Network first für HTML, cache first für Assets
                if (event.request.destination === 'document') {
                    return fetch(event.request).then(response => {
                        // Clone für Cache
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                        return response;
                    }).catch(() => {
                        // Fallback auf Cache wenn offline
                        return caches.match('/');
                    });
                }
                
                // Für Assets: Cache first
                return fetch(event.request).then(response => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                });
            })
    );
});