// Check if current page is a legal page
function isLegalPage() {
  const path = window.location.pathname;
  return path.includes('impressum') || path.includes('datenschutz') || path.includes('agb');
}

// Get base path for includes based on current location
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/leistungen/')) {
    return '../../';
  }
  return '';
}

// Load includes function
function loadIncludes() {
  const basePath = getBasePath();
  const timestamp = Date.now();
  
  // Load header component with menu initialization
  fetch(basePath + "header.html?v=" + timestamp)
    .then(res => res.text())
    .then(data => {
      const headerElement = document.getElementById("header");
      if (headerElement) {
        headerElement.innerHTML = data;
        // Force menu initialization after header loads
        setTimeout(() => {
          if (typeof initMobileNavigation === 'function') {
            initMobileNavigation();
          }
        }, 100);
      }
    })
    .catch(err => console.log('Header load failed:', err));
  
  // Load angebot banner component (not on legal pages)
  const angebotElement = document.getElementById("angebot");
  if (angebotElement && !isLegalPage()) {
    fetch(basePath + "angebot-banner.html").then(res => res.text()).then(data => {
      angebotElement.innerHTML = data;
    }).catch(err => console.log('Angebot banner load failed:', err));
  }
  
  // Load quick contact component (on all pages)
  const quickContactElement = document.getElementById("quick-contact");
  if (quickContactElement) {
    fetch(basePath + "quick-contact.html").then(res => res.text()).then(data => {
      quickContactElement.innerHTML = data;
    }).catch(err => console.log('Quick contact load failed:', err));
  }
  
  // Load promo banner component (only on service pages, not legal pages)
  const promoElement = document.getElementById("promo");
  if (promoElement) {
    fetch(basePath + "promo-banner.html").then(res => res.text()).then(data => {
      promoElement.innerHTML = data;
    }).catch(err => console.log('Promo banner load failed:', err));
  }
  
  // Load promo banner for service pages with different ID
  const promoBannerElement = document.getElementById("promo-banner");
  if (promoBannerElement) {
    fetch(basePath + "promo-banner.html").then(res => res.text()).then(data => {
      promoBannerElement.innerHTML = data;
    }).catch(err => console.log('Promo banner load failed:', err));
  }
  
  // Load footer component - different footer for different page types
  const footerElement = document.getElementById("footer");
  if (footerElement) {
    const currentPath = window.location.pathname;
    let footerFile = "footer.html";
    
    // Use different footer for subpages (leistungen)
    if (currentPath.includes('/leistungen/')) {
      footerFile = "footer-subpages.html";
    }
    // Use different footer for legal pages
    else if (isLegalPage()) {
      footerFile = "footer-legal.html";
    }
    
    fetch(basePath + footerFile + '?v=' + Date.now()).then(res => res.text()).then(data => {
      footerElement.innerHTML = data;
    }).catch(err => console.log('Footer load failed:', err));
  }
}



document.addEventListener("DOMContentLoaded", () => {
  loadIncludes();
  
  // Load rabatt banner on homepage and service pages (not on legal/contact pages)
  const rabattBannerElement = document.getElementById('rabatt-banner');
  if (rabattBannerElement) {
    const currentPath = window.location.pathname;
    const isServicePage = currentPath.includes('/leistungen/') || currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '';
    const isLegalPage = currentPath.includes('kontakt') || currentPath.includes('ueber-uns') || 
                       currentPath.includes('impressum') || currentPath.includes('datenschutz') || 
                       currentPath.includes('agb');
    
    if (isServicePage && !isLegalPage) {
      const basePath = getBasePath();
      console.log('Loading rabatt banner from:', basePath + 'rabatt-banner.html');
      fetch(basePath + 'rabatt-banner.html?v=' + Date.now())
        .then(response => response.text())
        .then(data => {
          rabattBannerElement.innerHTML = data;
          console.log('Rabatt banner loaded successfully');
        })
        .catch(err => console.log('Rabatt banner load failed:', err));
    }
  }
  

});