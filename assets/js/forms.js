// PROFESSIONELLE FORMULAR-SUITE FÜR SEDA24

class FormManager {
    constructor() {
        this.forms = {};
        this.currentModal = null;
        this.init();
    }

    init() {
        this.createModals();
        this.bindEventListeners();
        console.log('SEDA24 Formular-Suite geladen');
    }

    createModals() {
        // 1. KOSTENLOSE BERATUNG FORMULAR
        this.forms.beratung = this.createModal('beratung', {
            title: 'Kostenlose Beratung',
            subtitle: 'Wir beraten Sie gerne unverbindlich',
            fields: [
                { type: 'text', name: 'name', label: 'Ihr Name', required: true },
                { type: 'text', name: 'firma', label: 'Firma/Unternehmen' },
                { type: 'tel', name: 'telefon', label: 'Telefonnummer', required: true },
                { type: 'email', name: 'email', label: 'E-Mail-Adresse', required: true },
                { 
                    type: 'select', 
                    name: 'anrufzeit', 
                    label: 'Wann dürfen wir anrufen?',
                    options: ['Sofort', 'Vormittag 9-12h', 'Nachmittag 13-17h', 'Abend 18-20h']
                },
                {
                    type: 'checkboxes',
                    name: 'services',
                    label: 'Wobei können wir helfen?',
                    options: ['Büroreinigung', 'Haushaltsreinigung', 'Fensterreinigung', 'Grundreinigung', 'Sonderreinigung']
                },
                { type: 'textarea', name: 'nachricht', label: 'Zusätzliche Informationen' }
            ]
        });

        // 2. 22% RABATT FORMULAR
        this.forms.rabatt = this.createModal('rabatt', {
            title: '22% Rabatt sichern',
            subtitle: 'Jetzt Ihren Rabatt abholen!',
            fields: [
                { type: 'text', name: 'name', label: 'Ihr Name', required: true },
                { type: 'tel', name: 'telefon', label: 'Telefonnummer', required: true },
                { type: 'email', name: 'email', label: 'E-Mail-Adresse', required: true },
                { 
                    type: 'select', 
                    name: 'kunde_typ', 
                    label: 'Kunde-Typ',
                    options: ['Privatkunde', 'Gewerbekunde']
                },
                {
                    type: 'select',
                    name: 'service',
                    label: 'Benötigte Reinigung',
                    options: ['Haushaltsreinigung', 'Büroreinigung', 'Fensterreinigung', 'Glasreinigung', 'Treppenhausreinigung']
                },
                {
                    type: 'select',
                    name: 'haufigkeit',
                    label: 'Wie oft?',
                    options: ['Einmalig', 'Wöchentlich', '14-tägig', 'Monatlich', 'Nach Bedarf']
                }
            ]
        });

        // 3. ANGEBOT ANFORDERN FORMULAR
        this.forms.angebot = this.createModal('angebot', {
            title: 'Angebot anfordern',
            subtitle: 'Kostenloses Angebot in 24h',
            fields: [
                { type: 'text', name: 'firmenname', label: 'Firmenname', required: true },
                { type: 'text', name: 'ansprechpartner', label: 'Ansprechpartner', required: true },
                { type: 'tel', name: 'telefon', label: 'Telefonnummer', required: true },
                { type: 'email', name: 'email', label: 'E-Mail-Adresse', required: true },
                {
                    type: 'select',
                    name: 'service',
                    label: 'Service-Art',
                    options: ['Büroreinigung', 'Unterhaltsreinigung', 'Glasreinigung', 'Grundreinigung']
                },
                { type: 'number', name: 'flaeche', label: 'Fläche in qm (ca.)' },
                {
                    type: 'select',
                    name: 'rhythmus',
                    label: 'Reinigungsrhythmus',
                    options: ['Täglich', 'Wöchentlich', '14-tägig', 'Monatlich']
                }
            ]
        });

        // RÜCKRUF wird über das perfekte standalone Formular abgewickelt (rueckruf-formular.html)

        // 5. ALLGEMEINES KONTAKT FORMULAR
        this.forms.kontakt = this.createModal('kontakt', {
            title: 'Kontakt aufnehmen',
            subtitle: 'Wir helfen Ihnen gerne weiter',
            fields: [
                { type: 'text', name: 'name', label: 'Ihr Name', required: true },
                { type: 'email', name: 'email', label: 'E-Mail-Adresse', required: true },
                { type: 'tel', name: 'telefon', label: 'Telefonnummer' },
                { type: 'text', name: 'betreff', label: 'Betreff', required: true },
                { type: 'textarea', name: 'nachricht', label: 'Ihre Nachricht', required: true }
            ]
        });
    }

    createModal(formId, config) {
        const modalHtml = `
            <div class="modal-overlay" id="modal-${formId}" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                padding: 20px;
                box-sizing: border-box;
            ">
                <div class="modal-container" style="
                    max-width: 600px;
                    width: 90%;
                    max-height: 90vh;
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    position: relative;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
                    overflow-y: auto;
                ">
                    <div class="modal-header" style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #1E537C; font-size: 2.2rem; margin-bottom: 10px; font-weight: 700;">
                            <i class="fas fa-${this.getIconForForm(formId)}"></i> ${config.title}
                        </h1>
                        <p style="color: #666; font-size: 1.1rem; line-height: 1.6;">${config.subtitle}</p>
                        <button class="modal-close" type="button" style="
                            position: absolute;
                            top: 15px;
                            right: 20px;
                            background: none;
                            border: none;
                            font-size: 2rem;
                            color: #999;
                            cursor: pointer;
                            padding: 5px;
                            line-height: 1;
                            transition: color 0.3s ease;
                        ">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="form-${formId}" class="seda-form" style="display: grid; gap: 20px;">
                            ${this.generateFormFields(config.fields)}
                            ${this.generateDSGVOCheckbox()}
                            <button type="submit" class="form-submit" style="
                                background: linear-gradient(135deg, #F9B233 0%, #e6a42e 100%);
                                color: white;
                                padding: 18px 30px;
                                border: none;
                                border-radius: 50px;
                                font-size: 1.1rem;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                margin-top: 20px;
                            ">
                                <i class="fas fa-paper-plane"></i> Absenden
                            </button>
                        </form>
                        <div id="message-${formId}" class="form-message" style="display: none;"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.getElementById(`modal-${formId}`);
        
        // SOFORT sichtbar machen - CSS überschreibt alles
        modal.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: rgba(0, 0, 0, 0.6) !important;
            backdrop-filter: blur(10px) !important;
            display: none !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 99999 !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transition: all 0.3s ease !important;
            padding: 20px !important;
            box-sizing: border-box !important;
        `;
        
        return modal;
    }

    getIconForForm(formId) {
        const icons = {
            beratung: 'lightbulb',
            rabatt: 'percentage', 
            angebot: 'file-invoice',
            kontakt: 'envelope'
        };
        return icons[formId] || 'paper-plane';
    }

    generateFormFields(fields) {
        return fields.map(field => {
            switch (field.type) {
                case 'text':
                case 'email':
                case 'tel':
                case 'number':
                    return `
                        <div class="form-group" style="display: flex; flex-direction: column;">
                            <label class="form-label ${field.required ? 'required' : ''}" style="
                                color: #1E537C;
                                font-weight: 600;
                                margin-bottom: 8px;
                                font-size: 1rem;
                            ">${field.label}${field.required ? ' *' : ''}</label>
                            <input type="${field.type}" name="${field.name}" class="form-input" ${field.required ? 'required' : ''} style="
                                padding: 15px;
                                border: 2px solid #e1e5e9;
                                border-radius: 10px;
                                font-size: 1rem;
                                transition: all 0.3s ease;
                                font-family: inherit;
                            ">
                        </div>
                    `;
                case 'textarea':
                    return `
                        <div class="form-group" style="display: flex; flex-direction: column;">
                            <label class="form-label ${field.required ? 'required' : ''}" style="
                                color: #1E537C;
                                font-weight: 600;
                                margin-bottom: 8px;
                                font-size: 1rem;
                            ">${field.label}${field.required ? ' *' : ''}</label>
                            <textarea name="${field.name}" class="form-textarea" ${field.required ? 'required' : ''} rows="4" style="
                                padding: 15px;
                                border: 2px solid #e1e5e9;
                                border-radius: 10px;
                                font-size: 1rem;
                                transition: all 0.3s ease;
                                font-family: inherit;
                                resize: vertical;
                            "></textarea>
                        </div>
                    `;
                case 'select':
                    const options = field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
                    return `
                        <div class="form-group" style="display: flex; flex-direction: column;">
                            <label class="form-label ${field.required ? 'required' : ''}" style="
                                color: #1E537C;
                                font-weight: 600;
                                margin-bottom: 8px;
                                font-size: 1rem;
                            ">${field.label}${field.required ? ' *' : ''}</label>
                            <select name="${field.name}" class="form-select" ${field.required ? 'required' : ''} style="
                                padding: 15px;
                                border: 2px solid #e1e5e9;
                                border-radius: 10px;
                                font-size: 1rem;
                                transition: all 0.3s ease;
                                font-family: inherit;
                                background: white;
                            ">
                                <option value="">Bitte wählen...</option>
                                ${options}
                            </select>
                        </div>
                    `;
                case 'checkboxes':
                    const checkboxes = field.options.map(opt => `
                        <div class="form-checkbox-item">
                            <input type="checkbox" name="${field.name}[]" value="${opt}" class="form-checkbox" id="${field.name}-${opt.toLowerCase().replace(/\s+/g, '-')}">
                            <label for="${field.name}-${opt.toLowerCase().replace(/\s+/g, '-')}" class="form-checkbox-label">${opt}</label>
                        </div>
                    `).join('');
                    return `
                        <div class="form-group">
                            <label class="form-label">${field.label}</label>
                            <div class="form-checkbox-group">
                                ${checkboxes}
                            </div>
                        </div>
                    `;
                default:
                    return '';
            }
        }).join('');
    }

    generateDSGVOCheckbox() {
        return `
            <div class="dsgvo-group">
                <div class="dsgvo-checkbox">
                    <input type="checkbox" id="dsgvo" name="dsgvo" required class="form-checkbox">
                    <label for="dsgvo" class="dsgvo-text">
                        Ich stimme der Verarbeitung meiner Daten gemäß der 
                        <a href="/datenschutz.html" target="_blank">Datenschutzerklärung</a> zu und bin damit einverstanden, 
                        dass SEDA24 mich für Rückfragen kontaktiert.*
                    </label>
                </div>
            </div>
        `;
    }

    bindEventListeners() {
        // MODAL SYSTEM KOMPLETT DEAKTIVIERT
        console.log('Modal system disabled - using standalone forms');
        
        // Form Submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('.seda-form')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
    }

    openModal(formType) {
        // MODAL SYSTEM DEAKTIVIERT - Weiterleitung zu standalone Seiten
        console.log('Modal deaktiviert - Weiterleitung zu:', formType + '.html');
        window.location.href = formType + '.html';
    }

    closeModal() {
        if (this.currentModal) {
            this.currentModal.style.setProperty('opacity', '0', 'important');
            this.currentModal.style.setProperty('visibility', 'hidden', 'important');
            setTimeout(() => {
                if (this.currentModal) {
                    this.currentModal.style.setProperty('display', 'none', 'important');
                }
            }, 300);
            this.currentModal = null;
        }
    }

    closeModal() {
        if (this.currentModal) {
            this.currentModal.classList.remove('active');
            document.body.style.overflow = '';
            this.currentModal = null;
        }
    }

    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const formType = form.id.replace('form-', '');
        const submitBtn = form.querySelector('.form-submit');
        const messageDiv = document.getElementById(`message-${formType}`);

        // Loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet...';
        submitBtn.classList.add('form-loading');

        try {
            // Checkbox arrays verarbeiten
            const data = {};
            for (const [key, value] of formData.entries()) {
                if (key.endsWith('[]')) {
                    const arrayKey = key.slice(0, -2);
                    if (!data[arrayKey]) data[arrayKey] = [];
                    data[arrayKey].push(value);
                } else {
                    data[key] = value;
                }
            }

            // E-Mail über EmailJS senden
            await this.sendEmailViaEmailJS(formType, data);
            
            // Professionelle Erfolgsmeldung anzeigen
            this.showSuccessMessage(formType);
            form.reset();
            setTimeout(() => this.closeModal(), 500);

        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage(messageDiv, 'error', 'Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: 07225 / 180 49 70');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Absenden';
            submitBtn.classList.remove('form-loading');
        }
    }

    async sendEmailViaEmailJS(formType, data) {
        // EmailJS Konfiguration
        const serviceID = 'service_bech8of';
        const publicKey = 'K1qlkK03HzkDwdKEq';
        
        // Template IDs für verschiedene Formulare
        const templateIDs = {
            beratung: 'template_61vbnmk',
            rabatt: 'template_meubofk', 
            angebot: 'template_f9gnzjq',
            rueckruf: 'template_ht9lccw',
            kontakt: 'template_c5g5gq6' // bereits vorhanden
        };

        const templateID = templateIDs[formType] || 'template_c5g5gq6';

        // Template-Parameter basierend auf Formulartyp
        const templateParams = this.buildTemplateParams(formType, data);

        // EmailJS senden
        if (typeof emailjs !== 'undefined') {
            return emailjs.send(serviceID, templateID, templateParams, publicKey);
        } else {
            throw new Error('EmailJS nicht verfügbar');
        }
    }

    buildTemplateParams(formType, data) {
        const baseParams = {
            to_email: 'mail@seda24.de',
            timestamp: new Date().toLocaleString('de-DE')
        };

        switch (formType) {
            case 'beratung':
                return {
                    ...baseParams,
                    subject: `[BERATUNG] Kostenlose Beratung - ${data.name} - ${data.telefon}`,
                    from_name: data.name,
                    from_email: data.email,
                    company: data.firma || 'Nicht angegeben',
                    phone: data.telefon,
                    anrufzeit: data.anrufzeit || 'Nicht angegeben',
                    services: Array.isArray(data.services) ? data.services.join(', ') : 'Nicht angegeben',
                    message: data.nachricht || 'Keine zusätzlichen Informationen'
                };
                
            case 'rabatt':
                return {
                    ...baseParams,
                    subject: `[22% RABATT] ${data.kunde_typ} - ${data.service} - ${data.name}`,
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.telefon,
                    kunde_typ: data.kunde_typ,
                    service: data.service,
                    haufigkeit: data.haufigkeit
                };
                
            case 'angebot':
                return {
                    ...baseParams,
                    subject: `[ANGEBOT] ${data.firmenname} - ${data.service} - ${data.ansprechpartner}`,
                    from_name: data.ansprechpartner,
                    from_email: data.email,
                    company: data.firmenname,
                    phone: data.telefon,
                    service: data.service,
                    flaeche: data.flaeche || 'Nicht angegeben',
                    rhythmus: data.rhythmus
                };
                
            case 'rueckruf':
                return {
                    ...baseParams,
                    subject: `[RÜCKRUF] ${data.name} - ${data.wann} - ${data.grund}`,
                    from_name: data.name,
                    phone: data.telefon,
                    wann: data.wann,
                    grund: data.grund
                };
                
            case 'kontakt':
                return {
                    ...baseParams,
                    subject: `[KONTAKT] ${data.betreff} - ${data.name}`,
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.telefon || 'Nicht angegeben',
                    message: data.nachricht,
                    betreff: data.betreff
                };
                
            default:
                return baseParams;
        }
    }

    showMessage(messageDiv, type, text) {
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
    }

    showSuccessMessage(formType) {
        // Success messages für verschiedene Formular-Typen
        const successMessages = {
            beratung: {
                title: 'Beratungs-Anfrage bestätigt',
                message: 'Vielen Dank für Ihr Vertrauen. Ihre Anfrage für eine kostenlose Beratung wurde erfolgreich übermittelt. Ein Mitarbeiter unseres Teams wird sich innerhalb der Bürozeiten (Mo-Fr 8-19h) bei Ihnen melden.'
            },
            rabatt: {
                title: '22% Rabatt gesichert!',
                message: 'Herzlichen Glückwunsch! Ihre 22% Rabatt-Anfrage wurde erfolgreich übermittelt. Wir kontaktieren Sie innerhalb von 24h, damit Sie Ihren Sofortrabatt einlösen können. Freuen Sie sich auf top Service zum Bestpreis!'
            },
            angebot: {
                title: 'Angebots-Anfrage bestätigt',
                message: 'Vielen Dank für Ihr Interesse. Ihre Angebotsanfrage wurde erfolgreich übermittelt. Unser Team erstellt Ihr individuelles Angebot und meldet sich innerhalb der Bürozeiten bei Ihnen.'
            },
            rueckruf: {
                title: 'Rückruf-Termin erfolgreich vereinbart!',
                message: 'Vielen Dank! Wir rufen Sie zum gewünschten Zeitpunkt zurück.'
            },
            kontakt: {
                title: 'Kontakt-Anfrage bestätigt',
                message: 'Vielen Dank für Ihre Nachricht. Ihre Kontaktanfrage wurde erfolgreich übermittelt. Wir antworten Ihnen innerhalb der Bürozeiten (Mo-Fr 8-19h).'
            }
        };

        const message = successMessages[formType];
        if (!message) return;

        // Professionelles Success Modal mit Glassmorphism Design erstellen
        const modal = document.createElement('div');
        modal.className = 'success-modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
            box-sizing: border-box;
        `;

        modal.innerHTML = `
            <div class="success-modal" style="
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                padding: 40px;
                max-width: 600px;
                width: 100%;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                animation: modalSlideIn 0.5s ease;
            ">
                <div class="success-icon" style="margin-bottom: 25px;">
                    <i class="fas fa-check-circle" style="color: #1E537C; font-size: 4rem;"></i>
                </div>
                <h3 style="color: #1E537C; font-size: 1.8rem; margin: 20px 0 15px 0; font-weight: 700;">${message.title}</h3>
                <p style="color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; text-align: center;">${message.message}</p>
                
                <div class="success-benefits" style="background: rgba(30, 83, 124, 0.05); padding: 20px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #1E537C;">
                    <h4 style="color: #1E537C; font-size: 1.2rem; margin-bottom: 15px; font-weight: 600;">Ihre Vorteile mit SEDA24:</h4>
                    <ul style="color: #666; font-size: 1rem; line-height: 1.6; margin: 0; padding-left: 20px; text-align: left;">
                        <li>✓ Persönliche Beratung ohne Verkaufsdruck</li>
                        <li>✓ 15+ Jahre Erfahrung in der Region</li>
                        <li>✓ Transparente Preise ohne versteckte Kosten</li>
                        <li>✓ Zuverlässige Termine und pünktliche Ausführung</li>
                    </ul>
                </div>
                
                <div class="success-actions" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 25px;">
                    <a href="tel:072251804970" style="background: #1E537C; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: all 0.3s ease;">
                        <i class="fas fa-phone"></i> Sofort anrufen
                    </a>
                    <a href="mailto:mail@seda24.de" style="background: #F9B233; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: all 0.3s ease;">
                        <i class="fas fa-envelope"></i> E-Mail schreiben
                    </a>
                    <button onclick="this.closest('.success-modal-overlay').remove(); window.location.href='/';" style="background: transparent; color: #1E537C; padding: 12px 24px; border: 2px solid #1E537C; border-radius: 25px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-home"></i> Zurück zur Startseite
                    </button>
                </div>
            </div>
        `;

        // Animation CSS hinzufügen
        if (!document.querySelector('#success-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'success-modal-styles';
            styles.textContent = `
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .success-actions a:hover,
                .success-actions button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }
                
                @media (max-width: 768px) {
                    .success-actions {
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                    .success-actions a,
                    .success-actions button {
                        width: 100% !important;
                        justify-content: center !important;
                        max-width: 300px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(modal);

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Auto-remove nach 20 Sekunden und Weiterleitung zur Startseite
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
                window.location.href = '/';
            }
        }, 20000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.sedaForms = new FormManager();
    console.log('Forms initialized');
});

// Auto-add data attributes to existing buttons
document.addEventListener('DOMContentLoaded', () => {
    // Alle Buttons führen jetzt zu den schönen standalone Formularen
    // Keine data-form Attribute mehr nötig
});