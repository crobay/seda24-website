// ECHTE GOOGLE PAGESPEED INSIGHTS ANALYSE
const https = require('https');

function testPageSpeed() {
    const url = `https://${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.replit.app`;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`;
    
    console.log('🔍 TESTE SEDA24 PERFORMANCE MIT GOOGLE PAGESPEED...');
    console.log(`URL: ${url}`);
    console.log('====================================================\n');
    
    https.get(apiUrl, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const result = JSON.parse(data);
                const categories = result.lighthouseResult.categories;
                const metrics = result.lighthouseResult.audits;
                
                console.log('📊 GOOGLE PAGESPEED SCORES:');
                console.log('===========================');
                console.log(`🚀 Performance: ${Math.round(categories.performance.score * 100)}/100`);
                console.log(`♿ Accessibility: ${Math.round(categories.accessibility.score * 100)}/100`);
                console.log(`✅ Best Practices: ${Math.round(categories['best-practices'].score * 100)}/100`);
                console.log(`🔍 SEO: ${Math.round(categories.seo.score * 100)}/100`);
                
                console.log('\n⏱️ LADEZEITEN (MOBILE):');
                console.log('======================');
                console.log(`First Contentful Paint: ${metrics['first-contentful-paint'].displayValue}`);
                console.log(`Largest Contentful Paint: ${metrics['largest-contentful-paint'].displayValue}`);
                console.log(`Speed Index: ${metrics['speed-index'].displayValue}`);
                console.log(`Cumulative Layout Shift: ${metrics['cumulative-layout-shift'].displayValue}`);
                
                console.log('\n🔧 HAUPTVERBESSERUNGEN:');
                console.log('======================');
                const opportunities = result.lighthouseResult.audits;
                if (opportunities['unused-css-rules'] && opportunities['unused-css-rules'].details) {
                    console.log(`❗ Ungenutztes CSS: ${opportunities['unused-css-rules'].displayValue}`);
                }
                if (opportunities['render-blocking-resources']) {
                    console.log(`❗ Render-blocking Ressourcen: ${opportunities['render-blocking-resources'].displayValue || 'Gefunden'}`);
                }
                if (opportunities['efficient-animated-content']) {
                    console.log(`❗ Bildoptimierung möglich: ${opportunities['efficient-animated-content'].displayValue || 'Ja'}`);
                }
                
            } catch (error) {
                console.error('Fehler beim Parsen der PageSpeed Daten:', error.message);
            }
        });
    }).on('error', (error) => {
        console.error('Fehler beim Abrufen der PageSpeed Daten:', error.message);
        console.log('\n📋 ALTERNATIVE: Manuelle Tests');
        console.log('==============================');
        console.log('1. Öffnen Sie: https://pagespeed.web.dev/');
        console.log(`2. Testen Sie: ${url}`);
        console.log('3. Wählen Sie "Mobile" für Mobilgeräte');
    });
}

testPageSpeed();