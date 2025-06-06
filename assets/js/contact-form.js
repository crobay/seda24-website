// SEDA24 Contact Form with CAPTCHA
let captchaAnswer = 0;

// Generate simple math CAPTCHA
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question = `${num1} ${operation} ${num2}`;
    
    switch(operation) {
        case '+':
            captchaAnswer = num1 + num2;
            break;
        case '-':
            captchaAnswer = num1 - num2;
            break;
        case '*':
            captchaAnswer = num1 * num2;
            break;
    }
    
    document.getElementById('captcha-question').textContent = question + ' = ?';
    document.getElementById('captcha').value = '';
}

// Submit contact form
function submitContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const captchaInput = parseInt(formData.get('captcha'));
    
    // Validate CAPTCHA
    if (captchaInput !== captchaAnswer) {
        showError('Sicherheitsfrage falsch beantwortet. Bitte versuchen Sie es erneut.');
        generateCaptcha();
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
    submitBtn.disabled = true;
    
    // Prepare contact data
    const contactData = {
        name: formData.get('name'),
        company: formData.get('company') || 'Nicht angegeben',
        email: formData.get('email'),
        phone: formData.get('phone') || 'Nicht angegeben',
        service: formData.get('service') || 'Nicht spezifiziert',
        message: formData.get('message'),
        timestamp: new Date().toLocaleString('de-DE')
    };
    
    // Store contact locally (backup)
    storeContactLocally(contactData);
    
    // Send email directly to mail@seda24.de using EmailJS
    sendEmailToSeda24(contactData)
        .then(() => {
            showSuccessMessage();
        })
        .catch(error => {
            console.error('E-Mail-Versand fehlgeschlagen:', error);
            // Fallback: Create mailto link
            createEmailFallback(contactData);
            showSuccessMessage();
        })
        .finally(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// Send email using EmailJS to mail@seda24.de
function sendEmailToSeda24(contactData) {
    // EmailJS Konfiguration
    const serviceID = 'service_bech8of';
    const templateID = 'template_c5g5gq6';
    const publicKey = 'K1qlkK03HzkDwdKEq';
    
    const templateParams = {
        to_email: 'mail@seda24.de',
        from_name: contactData.name,
        from_email: contactData.email,
        company: contactData.company,
        phone: contactData.phone,
        service: contactData.service,
        message: contactData.message,
        timestamp: contactData.timestamp,
        subject: 'Neue Kontaktanfrage über Website - SEDA24'
    };
    
    // Send email via EmailJS
    if (typeof emailjs !== 'undefined') {
        return emailjs.send(serviceID, templateID, templateParams, publicKey);
    } else {
        throw new Error('EmailJS nicht verfügbar');
    }
}

// Store contact locally as backup
function storeContactLocally(contactData) {
    try {
        let contacts = JSON.parse(localStorage.getItem('seda24_contacts') || '[]');
        contacts.unshift({
            ...contactData,
            id: Date.now(),
            status: 'neu'
        });
        
        // Keep only last 50 contacts
        if (contacts.length > 50) {
            contacts = contacts.slice(0, 50);
        }
        
        localStorage.setItem('seda24_contacts', JSON.stringify(contacts));
        console.log('Kontakt lokal gespeichert');
    } catch (error) {
        console.error('Lokale Speicherung fehlgeschlagen:', error);
    }
}

// Fallback email creation
function createEmailFallback(contactData) {
    const subject = encodeURIComponent('Neue Kontaktanfrage über Website - SEDA24');
    const body = encodeURIComponent(`
Neue Kontaktanfrage über die SEDA24 Website:

Name: ${contactData.name}
Firma: ${contactData.company || 'Nicht angegeben'}
E-Mail: ${contactData.email}
Telefon: ${contactData.phone || 'Nicht angegeben'}
Gewünschte Leistung: ${contactData.service || 'Nicht spezifiziert'}

Nachricht:
${contactData.message}

---
Diese Nachricht wurde über das Kontaktformular auf seda24.de gesendet.
Zeitpunkt: ${new Date().toLocaleString('de-DE')}
    `);
    
    // Store email link for manual sending
    const emailLink = `mailto:mail@seda24.de?subject=${subject}&body=${body}`;
    sessionStorage.setItem('seda24_email_fallback', emailLink);
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('form-success');
    
    if (form) form.style.display = 'none';
    if (success) {
        success.style.display = 'block';
        // Safe scroll with error checking
        setTimeout(() => {
            if (success && typeof success.scrollIntoView === 'function') {
                success.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('form-error');
    errorDiv.querySelector('span').textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Initialize CAPTCHA when page loads
document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
});