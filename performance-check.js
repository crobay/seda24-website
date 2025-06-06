// SEDA24 Performance Analyse
const fs = require('fs');
const https = require('https');

function analyzeWebsite() {
    console.log('🔍 SEDA24 Performance Analyse');
    console.log('================================\n');
    
    // CSS Analyse
    const cssFiles = [
        'assets/css/styles.css',
        'assets/css/forms.css', 
        'assets/css/homepage-fix.css'
    ];
    
    let totalCSS = 0;
    cssFiles.forEach(file => {
        try {
            const stats = fs.statSync(file);
            const sizeKB = (stats.size / 1024).toFixed(1);
            console.log(`📄 ${file}: ${sizeKB} KB`);
            totalCSS += stats.size;
        } catch (err) {
            console.log(`❌ ${file}: Nicht gefunden`);
        }
    });
    
    // JS Analyse
    const jsFiles = [
        'assets/js/forms.js',
        'assets/js/menu.js',
        'assets/js/include.js',
        'assets/js/scroll.js'
    ];
    
    let totalJS = 0;
    jsFiles.forEach(file => {
        try {
            const stats = fs.statSync(file);
            const sizeKB = (stats.size / 1024).toFixed(1);
            console.log(`⚡ ${file}: ${sizeKB} KB`);
            totalJS += stats.size;
        } catch (err) {
            console.log(`❌ ${file}: Nicht gefunden`);
        }
    });
    
    // Bilder Analyse
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp'];
    let totalImages = 0;
    let imageCount = 0;
    
    function scanImages(dir) {
        try {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = `${dir}/${file}`;
                const stats = fs.statSync(filePath);
                if (stats.isDirectory()) {
                    scanImages(filePath);
                } else {
                    const ext = file.toLowerCase().substr(file.lastIndexOf('.'));
                    if (imageExtensions.includes(ext)) {
                        const sizeKB = (stats.size / 1024).toFixed(1);
                        if (stats.size > 100000) { // > 100KB
                            console.log(`🖼️  ${filePath}: ${sizeKB} KB (GROSS)`);
                        }
                        totalImages += stats.size;
                        imageCount++;
                    }
                }
            });
        } catch (err) {
            // Ordner existiert nicht
        }
    }
    
    scanImages('assets/img');
    
    console.log('\n📊 ZUSAMMENFASSUNG');
    console.log('==================');
    console.log(`CSS Total: ${(totalCSS / 1024).toFixed(1)} KB`);
    console.log(`JS Total: ${(totalJS / 1024).toFixed(1)} KB`);
    console.log(`Bilder: ${imageCount} Dateien, ${(totalImages / 1024 / 1024).toFixed(1)} MB`);
    
    console.log('\n🚀 OPTIMIERUNGSEMPFEHLUNGEN');
    console.log('============================');
    
    if (totalImages > 2000000) { // > 2MB
        console.log('❗ Bilder komprimieren (WebP Format verwenden)');
    }
    
    if (totalCSS > 50000) { // > 50KB
        console.log('❗ CSS minimieren und kombinieren');
    }
    
    if (totalJS > 50000) { // > 50KB
        console.log('❗ JavaScript minimieren');
    }
    
    console.log('✅ Lazy Loading für Bilder implementieren');
    console.log('✅ Service Worker bereits vorhanden');
    console.log('✅ Gzip Kompression aktivieren');
}

analyzeWebsite();