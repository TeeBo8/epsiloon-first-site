// Gestion du thème sombre/clair avec persistance
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Charger le thème préféré de l'utilisateur
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav-menu-active');
    navToggle.classList.toggle('nav-toggle-active');
});

// Animation au défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.article-card, .timeline-item').forEach(el => {
    el.classList.add('pre-animation');
    observer.observe(el);
});

// Validation améliorée du formulaire de contact
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('input', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
    }

    if (!input.value) {
        showError(input, 'Ce champ est requis');
        return false;
    }

    if (input.type === 'email' && !isValidEmail(input.value)) {
        showError(input, 'Veuillez entrer une adresse email valide');
        return false;
    }

    return true;
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    if (isValid) {
        const formData = new FormData(contactForm);
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = 'Merci pour votre message ! Nous vous contacterons bientôt.';
        contactForm.parentNode.insertBefore(notification, contactForm);
        contactForm.reset();

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
});