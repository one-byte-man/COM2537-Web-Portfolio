// ============================================
// PORTFOLIO WEBSITE - SCRIPT.JS
// Ahmet Akpınar - Game Developer Portfolio
// JavaScript for Navigation and Form Validation
// ============================================

// ============================================
// 1. MOBILE NAVIGATION TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.navbar__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// ============================================
// 2. NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ============================================
// 3. FORM VALIDATION (Contact Page)
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    // Validation Functions
    function validateName(value) {
        if (!value || value.trim().length === 0) {
            return 'Name field is required.';
        }
        if (value.trim().length < 2) {
            return 'Name must be at least 2 characters long.';
        }
        return '';
    }

    function validateEmail(value) {
        if (!value || value.trim().length === 0) {
            return 'Email field is required.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address.';
        }
        return '';
    }

    function validateSubject(value) {
        if (!value || value.trim().length === 0) {
            return 'Subject field is required.';
        }
        if (value.trim().length < 3) {
            return 'Subject must be at least 3 characters long.';
        }
        return '';
    }

    function validateMessage(value) {
        if (!value || value.trim().length === 0) {
            return 'Message field is required.';
        }
        if (value.trim().length < 20) {
            return 'Message must be at least 20 characters long.';
        }
        return '';
    }

    // Show Error Function
    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Show Success Function
    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Real-time Validation on Blur
    nameInput.addEventListener('blur', function () {
        const error = validateName(this.value);
        if (error) {
            showError(nameInput, nameError, error);
        } else {
            showSuccess(nameInput, nameError);
        }
    });

    emailInput.addEventListener('blur', function () {
        const error = validateEmail(this.value);
        if (error) {
            showError(emailInput, emailError, error);
        } else {
            showSuccess(emailInput, emailError);
        }
    });

    subjectInput.addEventListener('blur', function () {
        const error = validateSubject(this.value);
        if (error) {
            showError(subjectInput, subjectError, error);
        } else {
            showSuccess(subjectInput, subjectError);
        }
    });

    messageInput.addEventListener('blur', function () {
        const error = validateMessage(this.value);
        if (error) {
            showError(messageInput, messageError, error);
        } else {
            showSuccess(messageInput, messageError);
        }
    });

    // Real-time Validation on Input (clear error when user starts typing)
    nameInput.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            const error = validateName(this.value);
            if (!error) {
                showSuccess(nameInput, nameError);
            }
        }
    });

    emailInput.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            const error = validateEmail(this.value);
            if (!error) {
                showSuccess(emailInput, emailError);
            }
        }
    });

    subjectInput.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            const error = validateSubject(this.value);
            if (!error) {
                showSuccess(subjectInput, subjectError);
            }
        }
    });

    messageInput.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            const error = validateMessage(this.value);
            if (!error) {
                showSuccess(messageInput, messageError);
            }
        }
    });

    // Form Submit Handler
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Hide previous success message
        formSuccess.classList.remove('show');

        // Validate all fields
        const nameErr = validateName(nameInput.value);
        const emailErr = validateEmail(emailInput.value);
        const subjectErr = validateSubject(subjectInput.value);
        const messageErr = validateMessage(messageInput.value);

        let isValid = true;

        // Name validation
        if (nameErr) {
            showError(nameInput, nameError, nameErr);
            isValid = false;
        } else {
            showSuccess(nameInput, nameError);
        }

        // Email validation
        if (emailErr) {
            showError(emailInput, emailError, emailErr);
            isValid = false;
        } else {
            showSuccess(emailInput, emailError);
        }

        // Subject validation
        if (subjectErr) {
            showError(subjectInput, subjectError, subjectErr);
            isValid = false;
        } else {
            showSuccess(subjectInput, subjectError);
        }

        // Message validation
        if (messageErr) {
            showError(messageInput, messageError, messageErr);
            isValid = false;
        } else {
            showSuccess(messageInput, messageError);
        }

        // If all valid, show success and reset form
        if (isValid) {
            // Show success message
            formSuccess.classList.add('show');

            // Log form data (in production, this would be sent to a server)
            console.log('Form submitted successfully!');
            console.log('Name:', nameInput.value);
            console.log('Email:', emailInput.value);
            console.log('Subject:', subjectInput.value);
            console.log('Message:', messageInput.value);

            // Reset form after short delay
            setTimeout(function () {
                contactForm.reset();
                nameInput.classList.remove('success');
                emailInput.classList.remove('success');
                subjectInput.classList.remove('success');
                messageInput.classList.remove('success');
            }, 2000);

            // Hide success message after 5 seconds
            setTimeout(function () {
                formSuccess.classList.remove('show');
            }, 5000);
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// ============================================
// 4. SMOOTH SCROLL (Optional Enhancement)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// 5. ADD ANIMATION ON SCROLL (Optional)
// ============================================
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // Element is visible if any part of it is in the viewport
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}

function handleScrollAnimations() {
    const cards = document.querySelectorAll('.glass-card, .project-card');
    cards.forEach(card => {
        if (isElementInViewport(card)) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialize cards with animation-ready state
window.addEventListener('load', function () {
    const cards = document.querySelectorAll('.glass-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Trigger initial check
    setTimeout(handleScrollAnimations, 100);
});

// Check on scroll
window.addEventListener('scroll', handleScrollAnimations);

// ============================================
// 6. CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c👋 Merhaba!', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cAhmet Akpınar - Game Developer Portfolio', 'color: #4facfe; font-size: 16px;');
console.log('%c"Sometimes it is the best not to think, just do it"', 'color: #f093fb; font-style: italic;');
console.log('%cPortfolio: https://github.com/one-byte-man | https://one-byte-dev.itch.io/', 'color: #43e97b;');
