
// =====================================
// ASG SICHERHEIT & SERVICE
// JAVASCRIPT
// =====================================

// HAMBURGER-MENÜ

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Menü schließen" : "Menü öffnen"
        );

    });

    const menuLinks = mobileMenu.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Menü öffnen");

        });

    });
}

// AUTOMATISCHE JAHRESZAHL

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// KONTAKTFORMULAR

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        const status = document.getElementById("contactStatus");
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const language = translations[document.documentElement.lang] ? document.documentElement.lang : "de";

        status.hidden = false;
        status.classList.remove("success", "error");
        status.textContent = translations[language].form_sending;
        submitButton.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "send_failed");
            }

            status.classList.add("success");
            status.textContent = translations[language].form_success;
            contactForm.reset();
        } catch (error) {
            console.error("Kontaktformular konnte nicht gesendet werden:", error);
            status.classList.add("error");
            status.textContent = translations[language].form_error;
        } finally {
            submitButton.disabled = false;
        }
    });
}

// =====================================
// ASG SPRACHSYSTEM DE / EN
// =====================================

const translations = {
    de: {
        nav_home: "Startseite",
        nav_about: "Über uns",
        nav_services: "Dienstleistungen",
        nav_contact: "Kontakt",
        nav_jobs: "Jobs & Karriere",
        nav_imprint: "Impressum",
        nav_terms: "AGB",
        nav_privacy: "Datenschutz",

        hero_eyebrow: "ASG SICHERHEIT & SERVICE",
        hero_title: "Sicherheit, auf die Sie sich verlassen können.",
        hero_description: "Professionelle Sicherheitslösungen für Unternehmen, Veranstaltungen und Immobilien.",
        hero_contact: "Kontakt aufnehmen",
        hero_services: "Unsere Leistungen",

        intro_label: "WILLKOMMEN BEI ASG",
        intro_title_first: "Sicherheit mit",
        intro_title_second: "Verantwortung und Kompetenz.",
        intro_text: "Die ASG Sicherheit & Service UG (haftungsbeschränkt) ist ein in Dortmund ansässiges Sicherheitsunternehmen. Seit dem 01.07.2026 bieten wir Sicherheitsdienstleistungen für Unternehmen, Veranstaltungen und unterschiedliche Einsatzbereiche an. Unser Anspruch ist es, Menschen, Gebäude und Eigentum zuverlässig zu schützen und unseren Kunden einen professionellen Sicherheitsservice zu bieten.",
        intro_authorization: "Unser Unternehmen verfügt über die behördliche Erlaubnis gemäß § 34a Abs. 1 der Gewerbeordnung zur gewerbsmäßigen Bewachung von Leben und Eigentum fremder Personen.",
        intro_link: "Unsere Dienstleistungen entdecken →",

        company_label: "ASG SICHERHEIT & SERVICE",
        company_title: "Ein Unternehmen mit offizieller Erlaubnis.",
        company_permit: "Gewerbeerlaubnis",
        company_permit_text: "Behördliche Erlaubnis zur gewerbsmäßigen Bewachung von Leben und Eigentum fremder Personen.",
        company_area: "Bundesweites Einsatzgebiet",
        company_area_text: "Die Erlaubnis gilt im gesamten Geltungsbereich der Gewerbeordnung.",
        company_location: "Standort Dortmund",
        company_location_text: "Unser Unternehmensstandort befindet sich in Dortmund, Nordrhein-Westfalen.",
        company_permit_date: "Erlaubnis nach § 34a Abs. 1 GewO",
        company_permit_date_text: "Erteilt durch das Ordnungsamt der Stadt Dortmund am 03.08.2026.",

        services_label: "UNSERE LEISTUNGEN",
        services_title: "Unsere Dienstleistungen",
        services_description: "Individuelle Sicherheitslösungen für unterschiedliche Einsatzbereiche.",

        service1_title: "Objektschutz",
        service1_text: "Schutz von Gebäuden, Anlagen und betrieblichen Einrichtungen vor unbefugtem Zutritt und Gefahren.",

        service2_title: "Veranstaltungsschutz",
        service2_text: "Sicherheitsdienstleistungen für Veranstaltungen, Events und öffentliche Zusammenkünfte.",

        service3_title: "Empfangs- & Pfortendienste",
        service3_text: "Professioneller Empfang, Besucherregistrierung und Überwachung von Zugangsbereichen.",

        service4_title: "Revier- & Streifendienst",
        service4_text: "Regelmäßige Kontrollfahrten und Streifengänge zur Überprüfung von Objekten und Geländen.",

        service5_title: "Brandwachen",
        service5_text: "Überwachung brandgefährdeter Bereiche und Sicherstellung der vereinbarten Brandschutzmaßnahmen.",

        service6_title: "Zutritts- & Zugangskontrollen",
        service6_text: "Kontrolle von Personen, Berechtigungen und Zugängen zu geschützten Bereichen.",

        service7_title: "Schließ- & Öffnungsdienste",
        service7_text: "Zuverlässige Durchführung vereinbarter Schließ- und Öffnungskontrollen.",

        service8_title: "Kaufhaus- & Einzelhandelsdetektive",
        service8_text: "Präventive Überwachung von Verkaufsflächen und Erkennung verdächtiger Vorgänge.",

        service9_title: "Parkplatz- & Geländebewachung",
        service9_text: "Überwachung von Parkplätzen, Außenflächen und betrieblichen Geländen.",

        cta_label: "IHR SICHERHEITSPARTNER",
        cta_title: "Sie benötigen professionelle Unterstützung?",
        cta_text: "Sprechen Sie mit uns über Ihren individuellen Sicherheitsbedarf.",
        cta_button: "Jetzt unverbindlich anfragen",

        contact_label: "KONTAKT",
        contact_title: "Wir sind für Sie da.",
        contact_description: "Sie haben Fragen oder benötigen ein individuelles Angebot? Kontaktieren Sie uns.",
        contact_email: "E-Mail",
        contact_email_text: "Schreiben Sie uns.",
        contact_phone: "Telefon",
        contact_phone_text: "Rufen Sie uns an.",
        contact_whatsapp: "WhatsApp",
        contact_whatsapp_text: "Schreiben Sie uns direkt.",
        form_title: "Schreiben Sie uns eine Nachricht",
        form_name: "Vor- und Nachname",
        form_email: "E-Mail-Adresse",
        form_subject: "Betreff",
        form_message: "Nachricht",
        form_submit: "Nachricht senden",
        form_privacy: "Ich habe die Datenschutzhinweise zur Kenntnis genommen.",
        form_note: "Ihre Nachricht wird direkt über die Website versendet.",
        form_sending: "Ihre Nachricht wird gesendet …",
        form_success: "Vielen Dank! Ihre Nachricht wurde gesendet.",
        form_error: "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",

        career_label: "JOBS & KARRIERE",
        career_title: "Werde Teil des ASG-Teams.",
        career_text: "Du suchst einen flexiblen Nebenjob und möchtest Verantwortung übernehmen? Wir sind an motivierten und zuverlässigen Mitarbeitern interessiert.",
        career_feature1: "Möglichkeit eines Minijobs",
        career_feature2: "Unterschiedliche Einsatzbereiche",
        career_feature3: "Direkte Kontaktaufnahme",
        career_button: "Jetzt bewerben",

        footer_navigation: "Navigation",
        footer_company: "Unternehmen",
        footer_rights: "Alle Rechte vorbehalten.",
        footer_social_heading: "Folgen Sie uns",
        social_instagram: "Instagram",
        social_instagram_aria: "ASG auf Instagram",
        social_tiktok: "TikTok",
        social_tiktok_aria: "ASG auf TikTok",

        imprint_title: "Impressum",
        imprint_legal_basis: "Angaben gemäß § 5 DDG",
        imprint_entity: "ASG Sicherheit & Service UG (haftungsbeschränkt)",
        imprint_address_street: "Hengsener Straße 8",
        imprint_address_city: "44309 Dortmund",
        imprint_address_country: "Deutschland",
        imprint_represented_heading: "Vertreten durch",
        imprint_represented: "[Geschäftsführer / vertretungsberechtigte Person ergänzen]",
        imprint_register_heading: "Registereintrag",
        imprint_register_number: "Handelsregister: HRB 38482",
        imprint_register_court: "Registergericht: Amtsgericht Dortmund",
        imprint_permit_heading: "Erlaubnis für das Bewachungsgewerbe",
        imprint_permit: "Erlaubnis gemäß § 34a Abs. 1 GewO, erteilt durch das Ordnungsamt der Stadt Dortmund am 03.08.2026.",
        imprint_contact_heading: "Kontakt",
        imprint_phone: "Telefon: [Geschäftliche Telefonnummer ergänzen]",
        imprint_email: "E-Mail: info@asgsicherheit.de",
        imprint_text: "Weitere gesetzlich erforderliche Angaben sind vor Veröffentlichung zu ergänzen.",
        terms_title: "Allgemeine Geschäftsbedingungen",
        terms_text: "Hier müssen die für ASG geltenden und rechtlich geprüften Geschäftsbedingungen hinterlegt werden.",
        privacy_title: "Datenschutzerklärung",
        privacy_text: "Angaben aus dem Kontaktformular (Name, E-Mail-Adresse, Betreff und Nachricht) werden zur Bearbeitung der Anfrage an info@asgsicherheit.de übermittelt. Vollständige Datenschutzinformationen, insbesondere zu Rechtsgrundlage, Speicherdauer und Hosting, müssen vor Veröffentlichung ergänzt werden.",

        cookie_title: "Ihre Privatsphäre ist uns wichtig.",
        cookie_text: "Wir verwenden notwendige Cookies, um diese Website bereitzustellen. Optionale Cookies helfen uns, die Website zu verbessern. Sie entscheiden selbst.",
        cookie_necessary: "Notwendige Cookies",
        cookie_necessary_text: "Für die grundlegende Funktion der Website erforderlich.",
        cookie_analytics: "Statistik-Cookies",
        cookie_analytics_text: "Helfen uns, die Nutzung der Website zu verstehen.",
        cookie_marketing: "Marketing-Cookies",
        cookie_marketing_text: "Ermöglichen personalisierte Werbung und Inhalte.",
        cookie_accept: "Alle akzeptieren",
        cookie_reject: "Ablehnen",
        cookie_settings: "Einstellungen",
        cookie_save: "Auswahl speichern",
        cookie_manage: "Cookie-Einstellungen",
        cookie_region: "Cookie-Einstellungen",
        cookie_necessary_aria: "Notwendige Cookies sind immer aktiv",
        cookie_analytics_aria: "Statistik-Cookies erlauben",
        cookie_marketing_aria: "Marketing-Cookies erlauben",
        cookie_storage_error: "Die Einstellungen konnten nicht gespeichert werden. Bitte prüfen Sie Ihre Browser-Einstellungen und versuchen Sie es erneut."
    },

    en: {
        nav_home: "Home",
        nav_about: "About us",
        nav_services: "Services",
        nav_contact: "Contact",
        nav_jobs: "Jobs & Careers",
        nav_imprint: "Legal Notice",
        nav_terms: "Terms & Conditions",
        nav_privacy: "Privacy Policy",

        hero_eyebrow: "ASG SECURITY & SERVICES",
        hero_title: "Security you can rely on.",
        hero_description: "Professional security solutions for businesses, events and properties.",
        hero_contact: "Contact us",
        hero_services: "Our services",

        intro_label: "WELCOME TO ASG",
        intro_title_first: "Security with",
        intro_title_second: "responsibility and expertise.",
        intro_text: "ASG Sicherheit & Service UG (haftungsbeschränkt) is a security company based in Dortmund. Since 1 July 2026, we have provided security services for businesses, events and a range of other settings. We are committed to reliably protecting people, buildings and property while providing our clients with professional security services.",
        intro_authorization: "Our company holds the official authorisation under Section 34a (1) of the German Trade Regulation Act (GewO) to provide commercial guarding services for the lives and property of third parties.",
        intro_link: "Discover our services →",

        company_label: "ASG SECURITY & SERVICE",
        company_title: "A company with official authorisation.",
        company_permit: "Security licence",
        company_permit_text: "Official authorisation to provide commercial security services protecting the lives and property of third parties.",
        company_area: "Nationwide area of operation",
        company_area_text: "The authorisation applies throughout the geographical scope of the German Trade Regulation Act.",
        company_location: "Based in Dortmund",
        company_location_text: "Our company is based in Dortmund, North Rhine-Westphalia.",
        company_permit_date: "Authorisation under Section 34a (1) GewO",
        company_permit_date_text: "Issued by the Public Order Office of the City of Dortmund on 3 August 2026.",

        services_label: "OUR SERVICES",
        services_title: "Our Services",
        services_description: "Tailored security solutions for a wide range of applications.",

        service1_title: "Property Security",
        service1_text: "Protection of buildings, facilities and business premises against unauthorized access and potential threats.",

        service2_title: "Event Security",
        service2_text: "Security services for events, functions and public gatherings.",

        service3_title: "Reception & Gate Services",
        service3_text: "Professional reception, visitor registration and access area monitoring.",

        service4_title: "Mobile Patrol Services",
        service4_text: "Regular security patrols and inspection rounds to monitor properties and premises.",

        service5_title: "Fire Watch Services",
        service5_text: "Monitoring of fire-risk areas and implementation of agreed fire safety measures.",

        service6_title: "Access Control",
        service6_text: "Checking individuals, authorizations and access to restricted areas.",

        service7_title: "Locking & Opening Services",
        service7_text: "Reliable execution of agreed opening and closing procedures.",

        service8_title: "Retail Security & Loss Prevention",
        service8_text: "Preventive monitoring of retail areas and detection of suspicious activities.",

        service9_title: "Parking & Site Security",
        service9_text: "Monitoring of parking areas, outdoor spaces and business premises.",

        cta_label: "YOUR SECURITY PARTNER",
        cta_title: "Need professional security support?",
        cta_text: "Talk to us about your individual security requirements.",
        cta_button: "Request a consultation",

        contact_label: "CONTACT",
        contact_title: "We are here for you.",
        contact_description: "Do you have questions or need an individual quote? Get in touch with us.",
        contact_email: "Email",
        contact_email_text: "Send us an email.",
        contact_phone: "Phone",
        contact_phone_text: "Give us a call.",
        contact_whatsapp: "WhatsApp",
        contact_whatsapp_text: "Message us directly.",
        form_title: "Send us a message",
        form_name: "Full name",
        form_email: "Email address",
        form_subject: "Subject",
        form_message: "Message",
        form_submit: "Send message",
        form_privacy: "I have read the privacy information.",
        form_note: "Your message will be sent directly through the website.",
        form_sending: "Sending your message …",
        form_success: "Thank you! Your message has been sent.",
        form_error: "Your message could not be sent. Please try again later.",

        career_label: "JOBS & CAREERS",
        career_title: "Become part of the ASG team.",
        career_text: "Looking for a flexible part-time job and ready to take on responsibility? We are interested in motivated and reliable employees.",
        career_feature1: "Mini-job opportunities",
        career_feature2: "Various areas of work",
        career_feature3: "Direct contact",
        career_button: "Apply now",

        footer_navigation: "Navigation",
        footer_company: "Company",
        footer_rights: "All rights reserved.",
        footer_social_heading: "Follow us",
        social_instagram: "Instagram",
        social_instagram_aria: "ASG on Instagram",
        social_tiktok: "TikTok",
        social_tiktok_aria: "ASG on TikTok",

        imprint_title: "Legal Notice",
        imprint_legal_basis: "Information pursuant to Section 5 DDG",
        imprint_entity: "ASG Sicherheit & Service UG (haftungsbeschränkt)",
        imprint_address_street: "Hengsener Straße 8",
        imprint_address_city: "44309 Dortmund",
        imprint_address_country: "Germany",
        imprint_represented_heading: "Represented by",
        imprint_represented: "[Add managing director / authorised representative]",
        imprint_register_heading: "Commercial register",
        imprint_register_number: "Commercial register: HRB 38482",
        imprint_register_court: "Register court: Local Court of Dortmund",
        imprint_permit_heading: "Security trade authorisation",
        imprint_permit: "Authorisation under Section 34a (1) GewO, issued by the Public Order Office of the City of Dortmund on 3 August 2026.",
        imprint_contact_heading: "Contact",
        imprint_phone: "Phone: [Add business telephone number]",
        imprint_email: "Email: info@asgsicherheit.de",
        imprint_text: "Further statutory information must be added before publication.",
        terms_title: "Terms and Conditions",
        terms_text: "The applicable, legally reviewed terms and conditions for ASG must be added here.",
        privacy_title: "Privacy Policy",
        privacy_text: "Information submitted through the contact form (name, email address, subject and message) is sent to info@asgsicherheit.de to respond to the enquiry. Complete privacy information, including the legal basis, retention period and hosting arrangements, must be added before publication.",

        cookie_title: "Your privacy matters to us.",
        cookie_text: "We use necessary cookies to provide this website. Optional cookies help us improve the website. You decide what you allow.",
        cookie_necessary: "Necessary cookies",
        cookie_necessary_text: "Required for the basic functionality of the website.",
        cookie_analytics: "Analytics cookies",
        cookie_analytics_text: "Help us understand how the website is used.",
        cookie_marketing: "Marketing cookies",
        cookie_marketing_text: "Allow personalized advertising and content.",
        cookie_accept: "Accept all",
        cookie_reject: "Reject",
        cookie_settings: "Settings",
        cookie_save: "Save selection",
        cookie_manage: "Cookie settings",
        cookie_region: "Cookie settings",
        cookie_necessary_aria: "Necessary cookies are always enabled",
        cookie_analytics_aria: "Allow analytics cookies",
        cookie_marketing_aria: "Allow marketing cookies",
        cookie_storage_error: "Your settings could not be saved. Check your browser settings and try again."
    }
};

function changeLanguage(language) {
    const selectedLanguage = translations[language];

    if (!selectedLanguage) return;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (selectedLanguage[key] !== undefined) {
            element.textContent = selectedLanguage[key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.dataset.i18nPlaceholder;

        if (selectedLanguage[key] !== undefined) {
            element.placeholder = selectedLanguage[key];
        }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
        const key = element.dataset.i18nAriaLabel;

        if (selectedLanguage[key] !== undefined) {
            element.setAttribute("aria-label", selectedLanguage[key]);
        }
    });

    document.querySelectorAll(".lang-btn").forEach(button => {
        button.classList.toggle("active", button.dataset.lang === language);
    });

    try {
        localStorage.setItem("asg-language", language);
    } catch (error) {
        console.warn("Sprachspeicher nicht verfügbar:", error);
    }
}

document.querySelectorAll(".lang-btn").forEach(button => {
    button.addEventListener("click", () => {
        changeLanguage(button.dataset.lang);
    });
});

const savedLanguage = (() => {
    try {
        return localStorage.getItem("asg-language") || "de";
    } catch (error) {
        return "de";
    }
})();

changeLanguage(savedLanguage);

// =====================================
// ASG COOKIE CONSENT
// =====================================

const cookieConsentKey = "asg-cookie-consent";
const cookieBanner = document.getElementById("cookieBanner");
const cookieSettings = document.getElementById("cookieSettings");
const cookieError = document.getElementById("cookieError");
const analyticsCookies = document.getElementById("analyticsCookies");
const marketingCookies = document.getElementById("marketingCookies");
const openCookieSettings = document.getElementById("openCookieSettings");

function readCookieConsent() {
    try {
        const savedConsent = localStorage.getItem(cookieConsentKey);

        if (!savedConsent) {
            return null;
        }

        const consent = JSON.parse(savedConsent);

        if (typeof consent.analytics !== "boolean" ||
            typeof consent.marketing !== "boolean") {
            localStorage.removeItem(cookieConsentKey);
            return null;
        }

        return consent;
    } catch (error) {
        console.warn("Cookie-Einstellungen konnten nicht gelesen werden:", error);
        return null;
    }
}

function saveCookieConsent(analytics, marketing) {
    const consent = {
        necessary: true,
        analytics: analytics,
        marketing: marketing,
        date: new Date().toISOString()
    };

    try {
        localStorage.setItem(cookieConsentKey, JSON.stringify(consent));
        cookieBanner.hidden = true;
        cookieError.hidden = true;
    } catch (error) {
        console.error("Cookie-Einstellungen konnten nicht gespeichert werden:", error);
        cookieError.textContent = translations[document.documentElement.lang].cookie_storage_error;
        cookieError.hidden = false;
    }
}

if (cookieBanner && cookieSettings && analyticsCookies && marketingCookies) {
    const previousConsent = readCookieConsent();

    if (previousConsent) {
        analyticsCookies.checked = previousConsent.analytics;
        marketingCookies.checked = previousConsent.marketing;
    }

    cookieBanner.hidden = false;

    if (openCookieSettings) {
        openCookieSettings.addEventListener("click", () => {
            cookieSettings.hidden = !cookieSettings.hidden;
            openCookieSettings.setAttribute("aria-expanded", String(!cookieSettings.hidden));
        });
    }

    document.getElementById("acceptCookies").addEventListener("click", () => {
        analyticsCookies.checked = true;
        marketingCookies.checked = true;
        saveCookieConsent(true, true);
    });

    document.getElementById("rejectCookies").addEventListener("click", () => {
        analyticsCookies.checked = false;
        marketingCookies.checked = false;
        saveCookieConsent(false, false);
    });

    document.getElementById("saveCookieSettings").addEventListener("click", () => {
        saveCookieConsent(analyticsCookies.checked, marketingCookies.checked);
    });

    document.getElementById("changeCookieSettings").addEventListener("click", () => {
        const currentConsent = readCookieConsent();

        analyticsCookies.checked = currentConsent ? currentConsent.analytics : false;
        marketingCookies.checked = currentConsent ? currentConsent.marketing : false;
        cookieSettings.hidden = false;
        cookieBanner.hidden = false;
        cookieError.hidden = true;
        openCookieSettings.setAttribute("aria-expanded", "true");
        cookieBanner.scrollIntoView({ behavior: "smooth", block: "end" });
    });
}
