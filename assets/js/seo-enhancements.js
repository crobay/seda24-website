// SEDA24 SEO ENHANCEMENTS

class SEOManager {
    constructor() {
        this.init();
    }

    init() {
        this.addStructuredData();
        this.optimizeHeadings();
        this.addMetaDescriptions();
        this.optimizeImages();
        this.addBreadcrumbs();
        this.trackPageViews();
        console.log('SEDA24 SEO enhancements loaded');
    }

    // Enhanced Structured Data
    addStructuredData() {
        const businessData = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "SEDA24 Reinigungsservice GmbH",
            "description": "Professionelle Reinigungsdienstleistungen für Gewerbe und Privat in Gaggenau, Rastatt und Baden-Baden seit über 15 Jahren",
            "url": "https://www.seda24.de",
            "telephone": "+49-7225-1804970",
            "email": "mail@seda24.de",
            "foundingDate": "2010",
            "employee": "10-20",
            "priceRange": "€€",
            "currenciesAccepted": "EUR",
            "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Zeppelinstr. 42",
                "addressLocality": "Gaggenau",
                "addressRegion": "Baden-Württemberg",
                "postalCode": "76571",
                "addressCountry": "DE"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 48.8049,
                "longitude": 8.3208
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:00",
                    "closes": "19:00"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Saturday",
                    "opens": "08:00",
                    "closes": "13:00"
                }
            ],
            "areaServed": [
                {
                    "@type": "City",
                    "name": "Gaggenau"
                },
                {
                    "@type": "City", 
                    "name": "Rastatt"
                },
                {
                    "@type": "City",
                    "name": "Baden-Baden"
                },
                {
                    "@type": "City",
                    "name": "Kuppenheim"
                },
                {
                    "@type": "City",
                    "name": "Muggensturm"
                }
            ],
            "serviceType": [
                "Büroreinigung",
                "Haushaltsreinigung", 
                "Fensterreinigung",
                "Unterhaltsreinigung",
                "Grundreinigung",
                "Treppenhausreinigung",
                "Glasreinigung"
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Reinigungsdienstleistungen",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Büroreinigung",
                            "description": "Professionelle Büroreinigung für Unternehmen aller Größen",
                            "provider": {
                                "@type": "LocalBusiness",
                                "name": "SEDA24 Reinigungsservice GmbH"
                            }
                        },
                        "priceCurrency": "EUR",
                        "availability": "InStock"
                    },
                    {
                        "@type": "Offer", 
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Haushaltsreinigung",
                            "description": "Zuverlässige Haushaltsreinigung für Privatpersonen",
                            "provider": {
                                "@type": "LocalBusiness", 
                                "name": "SEDA24 Reinigungsservice GmbH"
                            }
                        },
                        "priceCurrency": "EUR",
                        "availability": "InStock"
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Fensterreinigung",
                            "description": "Professionelle Fensterreinigung für Gewerbe und Privat",
                            "provider": {
                                "@type": "LocalBusiness",
                                "name": "SEDA24 Reinigungsservice GmbH"
                            }
                        },
                        "priceCurrency": "EUR",
                        "availability": "InStock"
                    }
                ]
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "232",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": [
                {
                    "@type": "Review",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    },
                    "author": {
                        "@type": "Person",
                        "name": "Satisfied Customer"
                    },
                    "reviewBody": "Excellent cleaning service, very professional and reliable."
                }
            ],
            "sameAs": [
                "https://www.facebook.com/seda24",
                "https://www.instagram.com/seda24"
            ]
        };

        // Website Schema
        const websiteData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SEDA24 Reinigungsservice",
            "url": "https://www.seda24.de",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.seda24.de/?s={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };

        // Organization Schema
        const organizationData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SEDA24 Reinigungsservice GmbH",
            "url": "https://www.seda24.de",
            "logo": "https://www.seda24.de/assets/img/seda24-logo.svg",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+49-7225-1804970",
                "contactType": "customer service",
                "availableLanguage": "German"
            }
        };

        // Add all schemas to page
        [businessData, websiteData, organizationData].forEach((data, index) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(data);
            script.id = `structured-data-${index}`;
            document.head.appendChild(script);
        });
    }

    // Heading optimization
    optimizeHeadings() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let h1Count = 0;
        
        headings.forEach(heading => {
            if (heading.tagName === 'H1') {
                h1Count++;
                if (h1Count > 1) {
                    console.warn('Multiple H1 tags found - SEO concern');
                }
            }
            
            // Ensure headings have proper hierarchy
            if (!heading.textContent.trim()) {
                console.warn('Empty heading found:', heading);
            }
        });
    }

    // Image optimization for SEO
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Ensure all images have alt text
            if (!img.alt || img.alt.trim() === '') {
                const src = img.src;
                const filename = src.split('/').pop().split('.')[0];
                img.alt = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                console.warn('Generated alt text for image:', img.src);
            }
            
            // Add loading attribute for performance
            if (!img.loading) {
                img.loading = 'lazy';
            }
            
            // Add width and height if missing
            if (!img.width || !img.height) {
                img.onload = function() {
                    if (!this.width) this.width = this.naturalWidth;
                    if (!this.height) this.height = this.naturalHeight;
                };
            }
        });
    }

    // Add breadcrumbs for better navigation
    addBreadcrumbs() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment !== '');
        
        if (segments.length > 0) {
            const breadcrumbData = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.seda24.de/"
                    }
                ]
            };
            
            segments.forEach((segment, index) => {
                const name = segment.replace('.html', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
                const url = 'https://www.seda24.de/' + segments.slice(0, index + 1).join('/');
                
                breadcrumbData.itemListElement.push({
                    "@type": "ListItem",
                    "position": index + 2,
                    "name": name,
                    "item": url
                });
            });
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(breadcrumbData);
            script.id = 'breadcrumb-schema';
            document.head.appendChild(script);
        }
    }

    // Meta descriptions optimization
    addMetaDescriptions() {
        const currentDescription = document.querySelector('meta[name="description"]');
        const path = window.location.pathname;
        
        // Page-specific descriptions
        const descriptions = {
            '/gewerbliche-reinigung.html': 'Professionelle gewerbliche Reinigung in Gaggenau, Rastatt & Baden-Baden. Büroreinigung, Unterhaltsreinigung, Glasreinigung für Unternehmen. SEDA24 - Ihr Partner seit über 15 Jahren.',
            '/private-reinigung.html': 'Private Reinigungsdienstleistungen in Gaggenau, Rastatt & Baden-Baden. Haushaltsreinigung, Fensterreinigung, Treppenhausreinigung für Privatkunden. SEDA24 - Zuverlässig seit über 15 Jahren.',
            '/ueber-uns.html': 'Über SEDA24 Reinigungsservice - Ihr erfahrener Partner für professionelle Reinigung in Gaggenau, Rastatt & Baden-Baden. Seit über 15 Jahren zuverlässig und kompetent.',
            '/kontakt.html': 'Kontakt zu SEDA24 Reinigungsservice - Professionelle Reinigung in Gaggenau, Rastatt & Baden-Baden. Kostenlose Beratung unter 07225/180 49 70. Jetzt Angebot anfordern!'
        };
        
        if (descriptions[path] && (!currentDescription || currentDescription.content.length < 120)) {
            if (currentDescription) {
                currentDescription.content = descriptions[path];
            } else {
                const newDescription = document.createElement('meta');
                newDescription.name = 'description';
                newDescription.content = descriptions[path];
                document.head.appendChild(newDescription);
            }
        }
    }

    // Page view tracking for SEO insights
    trackPageViews() {
        // Send page view data (only if analytics is available)
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
        
        // Track page performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = Math.round(perfData.loadEventEnd - perfData.navigationStart);
                    
                    // Log performance data (could be sent to analytics)
                    console.log('Page load time:', loadTime + 'ms');
                    
                    if (loadTime > 3000) {
                        console.warn('Slow page load detected - may impact SEO');
                    }
                }, 0);
            });
        }
    }
}

// Initialize SEO Manager
document.addEventListener('DOMContentLoaded', () => {
    window.seoManager = new SEOManager();
});

// Export for testing
window.SEDA24SEO = SEOManager;