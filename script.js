// ============================================
// COMPLETE ENHANCED PORTFOLIO JAVASCRIPT
// ============================================

// ============================================
// 1. DARK MODE TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

/**
 * Initialize dark mode from localStorage
 */
function initializeDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else if (savedTheme === 'light') {
        disableDarkMode();
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
}

/**
 * Enable dark mode
 */
function enableDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    updateThemeToggle(true);
    console.log('🌙 Dark mode enabled');
}

/**
 * Disable dark mode (light mode)
 */
function disableDarkMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    updateThemeToggle(false);
    console.log('☀️ Light mode enabled');
}

/**
 * Update theme toggle button appearance
 * @param {boolean} isDark - Is dark mode enabled
 */
function updateThemeToggle(isDark) {
    if (isDark) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.title = 'Switch to Light Mode';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Switch to Dark Mode';
    }
}

// Toggle theme on button click
themeToggle.addEventListener('click', function() {
    const isDark = body.classList.contains('dark-mode');
    if (isDark) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// Observe system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        e.matches ? enableDarkMode() : disableDarkMode();
    }
});

// Initialize dark mode on page load
initializeDarkMode();

console.log('✅ Dark Mode System: Initialized');

// ============================================
// 2. SMOOTH SCROLL FOR NAVIGATION
// ============================================

const navLinks = document.querySelectorAll('.nav-link');
const scrollOffset = 80; // Offset for sticky navbar

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - scrollOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            console.log('📍 Navigated to:', targetId);
        }
    });
});

console.log('✅ Smooth Scroll: Initialized');

// ============================================
// 3. FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.querySelector('form[name="contact"]');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Add error styling to input
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function addInputError(input, message) {
    input.style.borderColor = '#dc2626';
    input.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
    
    let errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.remove();
    }
    
    const error = document.createElement('small');
    error.className = 'error-message';
    error.style.color = '#dc2626';
    error.style.display = 'block';
    error.style.marginTop = '5px';
    error.style.fontSize = '0.8rem';
    error.textContent = message;
    
    input.parentNode.insertBefore(error, input.nextSibling);
}

/**
 * Remove error styling from input
 * @param {HTMLElement} input - Input element
 */
function removeInputError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    let errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.remove();
    }
}

/**
 * Validate form
 * @returns {boolean} - Is form valid
 */
function validateForm() {
    let isValid = true;
    
    // Remove previous errors
    [nameInput, emailInput, messageInput].forEach(input => {
        removeInputError(input);
    });
    
    // Validate name
    if (!nameInput.value.trim()) {
        addInputError(nameInput, 'Please enter your name');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        addInputError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!emailInput.value.trim()) {
        addInputError(emailInput, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        addInputError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        addInputError(messageInput, 'Please enter your message');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        addInputError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Show success message
 * @param {string} message - Success message
 */
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        background-color: #dcfce7;
        color: #15803d;
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 20px;
        border-left: 4px solid #22c55e;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideDown 0.3s ease;
    `;
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    contactForm.insertBefore(successDiv, contactForm.firstChild);
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 4000);
}

/**
 * Handle form submission
 */
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            console.log('❌ Form validation failed');
            return;
        }
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString(),
            });
            
            if (response.ok) {
                showSuccessMessage('✅ Message sent successfully! I will get back to you soon.');
                contactForm.reset();
                console.log('✉️ Form submitted successfully');
            } else {
                showSuccessMessage('⚠️ Message sent! Check your email to confirm.');
                contactForm.reset();
            }
        } catch (error) {
            console.error('❌ Form submission error:', error);
            showSuccessMessage('Your message is ready to send. Opening email...');
            
            // Fallback: Open email client
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            
            const subject = encodeURIComponent(`Message from ${name}`);
            const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name}\nEmail: ${email}`);
            window.location.href = `mailto:fadipeayomide17@gmail.com?subject=${subject}&body=${body}`;
            
            contactForm.reset();
        }
    });
    
    // Clear errors on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                removeInputError(this);
            }
        });
    });
}

console.log('✅ Form Validation: Initialized');

// ============================================
// 4. SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to animate on scroll
const elementsToAnimate = document.querySelectorAll(
    '.stat-card, .experience-card, .project-card, .skill-item'
);

elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(element);
});

console.log('✅ Scroll Animations: Initialized');

// ============================================
// 5. BUTTON HOVER EFFECTS & MICROANIMATIONS
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

console.log('✅ Button Animations: Initialized');

// ============================================
// 6. CARD HOVER EFFECTS
// ============================================

const statCards = document.querySelectorAll('.stat-card');
const projectCards = document.querySelectorAll('.project-card');
const skillItems = document.querySelectorAll('.skill-item');
const experienceCards = document.querySelectorAll('.experience-card');

function addCardHoverEffect(cards) {
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

addCardHoverEffect(statCards);
addCardHoverEffect(projectCards);
addCardHoverEffect(skillItems);
addCardHoverEffect(experienceCards);

console.log('✅ Card Hover Effects: Initialized');

// ============================================
// 7. NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

console.log('✅ Navbar Scroll Effect: Initialized');

// ============================================
// 8. MOBILE MENU RESPONSIVENESS
// ============================================

const navMenu = document.querySelector('.nav-menu');

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

console.log('✅ Mobile Responsiveness: Initialized');

// ============================================
// 9. SMOOTH SCROLLING FOR INTERNAL LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty hrefs and javascript hrefs
        if (href === '#' || href.startsWith('javascript:')) {
            return;
        }
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

console.log('✅ Smooth Scrolling: Initialized');

// ============================================
// 10. ADD ACTIVE STATE TO NAVIGATION
// ============================================

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section, header, footer');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = '#fdbb2d';
                }
            });
        } else {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'white';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveNavLink);

console.log('✅ Active Navigation Highlighting: Initialized');

// ============================================
// 11. KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Press '/' to focus on contact form
    if (e.key === '/') {
        e.preventDefault();
        nameInput.focus();
        console.log('⌨️ Contact form focused');
    }
});

console.log('✅ Keyboard Shortcuts: Initialized');

// ============================================
// 12. PERFORMANCE OPTIMIZATION - DEBOUNCE
// ============================================

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Debounced scroll handler
window.addEventListener('scroll', debounce(() => {
    highlightActiveNavLink();
}, 100));

console.log('✅ Performance Optimization: Initialized');

// ============================================
// 13. SOCIAL LINK ANIMATIONS
// ============================================

const socialLinks = document.querySelectorAll('.social-links a');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

console.log('✅ Social Link Animations: Initialized');

// ============================================
// 14. FORM INPUT FOCUS EFFECTS
// ============================================

const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

console.log('✅ Form Input Focus Effects: Initialized');

// ============================================
// 15. DOWNLOAD CV TRACKING
// ============================================

const cvDownloadLink = document.querySelector('a[download]');

if (cvDownloadLink) {
    cvDownloadLink.addEventListener('click', () => {
        console.log('📄 CV downloaded at:', new Date().toLocaleTimeString());
    });
}

console.log('✅ CV Download Tracking: Initialized');

// ============================================
// 16. PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('🎉 Page fully loaded');
});

// ============================================
// 17. STARTUP CONSOLE LOG
// ============================================

console.log('');
console.log('════════════════════════════════════════');
console.log('🚀 PORTFOLIO APP FULLY INITIALIZED');
console.log('════════════════════════════════════════');
console.log('');
console.log('📋 Features Enabled:');
console.log('  ✅ Dark Mode Toggle (Ctrl+T)');
console.log('  ✅ Smooth Navigation Scrolling');
console.log('  ✅ Form Validation & Submission');
console.log('  ✅ Scroll Animations');
console.log('  ✅ Hover Effects & Microanimations');
console.log('  ✅ Active Navigation Highlighting');
console.log('  ✅ Keyboard Shortcuts (/ = Contact)');
console.log('  ✅ Performance Optimization');
console.log('');
console.log('🎨 Theme Information:');
console.log('  Current Theme:', body.classList.contains('dark-mode') ? 'Dark' : 'Light');
console.log('  Saved Preference:', localStorage.getItem('theme') || 'System Default');
console.log('');
console.log('════════════════════════════════════════');
console.log('Ready to impress! 💪');
console.log('════════════════════════════════════════');
console.log('');

// ============================================
// 18. ERROR HANDLING
// ============================================

window.addEventListener('error', (event) => {
    console.error('❌ Error occurred:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled Promise rejection:', event.reason);
});

// ============================================
// 19. RESPONSIVE DESIGN CHECK
// ============================================

function checkResponsive() {
    const width = window.innerWidth;
    
    if (width <= 480) {
        console.log('📱 Mobile view detected (≤480px)');
    } else if (width <= 768) {
        console.log('📱 Tablet view detected (≤768px)');
    } else {
        console.log('💻 Desktop view detected (>768px)');
    }
}

window.addEventListener('resize', debounce(checkResponsive, 250));
checkResponsive();

// ============================================
// 20. VIEWPORT TRANSITIONS
// ============================================

const transitionStyle = document.createElement('style');
transitionStyle.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .error-message {
        animation: slideDown 0.3s ease;
    }
`;
document.head.appendChild(transitionStyle);

console.log('✅ All Systems Ready! 🎉');


// ============================================
// FORM VALIDATION & SUBMISSION WITH NOTIFICATIONS
// ============================================
// ============================================
// CONTACT FORM - EMAIL & WHATSAPP (WORKING VERSION)
// ============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// ✅ UPDATE THESE THREE VALUES ONLY!
const CONTACT_INFO = {
    email: 'fadipeayomide17@gmail.com',        // ← YOUR EMAIL
    whatsappNumber: '2348123456789',           // ← YOUR WHATSAPP (no + or spaces)
    website: 'https://ayomidefadipe.netlify.app'
};

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Add error styling to input
 */
function addInputError(input, message) {
    input.style.borderColor = '#dc2626';
    input.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
    
    let errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.remove();
    }
    
    const error = document.createElement('small');
    error.className = 'error-message';
    error.style.color = '#dc2626';
    error.style.display = 'block';
    error.style.marginTop = '5px';
    error.style.fontSize = '0.8rem';
    error.textContent = message;
    
    input.parentNode.insertBefore(error, input.nextSibling);
}

/**
 * Remove error styling from input
 */
function removeInputError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    let errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.remove();
    }
}

/**
 * Validate form
 */
function validateForm() {
    let isValid = true;
    
    [nameInput, emailInput, messageInput].forEach(input => {
        removeInputError(input);
    });
    
    if (!nameInput.value.trim()) {
        addInputError(nameInput, 'Please enter your name');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        addInputError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!emailInput.value.trim()) {
        addInputError(emailInput, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        addInputError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!messageInput.value.trim()) {
        addInputError(messageInput, 'Please enter your message');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        addInputError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    const notifDiv = document.createElement('div');
    const bgColor = type === 'success' ? '#dcfce7' : type === 'error' ? '#fee2e2' : '#dbeafe';
    const textColor = type === 'success' ? '#15803d' : type === 'error' ? '#991b1b' : '#0c4a6e';
    const borderColor = type === 'success' ? '#22c55e' : type === 'error' ? '#dc2626' : '#0284c7';
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    notifDiv.style.cssText = `
        background-color: ${bgColor};
        color: ${textColor};
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 20px;
        border-left: 4px solid ${borderColor};
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideDown 0.3s ease;
    `;
    notifDiv.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    contactForm.insertBefore(notifDiv, contactForm.firstChild);
    
    setTimeout(() => {
        notifDiv.style.opacity = '0';
        notifDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notifDiv.remove(), 300);
    }, 5000);
}

/**
 * Send via WhatsApp
 */
function sendViaWhatsApp(name, email, message) {
    const whatsappMessage = encodeURIComponent(
        `Hello! My name is ${name}.\n\nEmail: ${email}\n\nMessage: ${message}\n\nI sent this via your portfolio website.`
    );
    
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    return true;
}

/**
 * Send via Email (Open Mail Client)
 */
function sendViaEmail(name, email, message) {
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
        `Hi Fadipe,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}\n\nSent via: ${CONTACT_INFO.website}`
    );
    
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
    
    return true;
}

/**
 * Handle form submission
 */
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            console.log('❌ Form validation failed');
            return;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Small delay to show loading state
        setTimeout(() => {
            try {
                if (deliveryMethod === 'email') {
                    sendViaEmail(name, email, message);
                    showNotification('📧 Opening your email client...', 'success');
                } 
                else if (deliveryMethod === 'whatsapp') {
                    sendViaWhatsApp(name, email, message);
                    showNotification('📱 Opening WhatsApp... Please complete the message.', 'success');
                } 
                else if (deliveryMethod === 'both') {
                    sendViaEmail(name, email, message);
                    setTimeout(() => {
                        sendViaWhatsApp(name, email, message);
                    }, 2000);
                    showNotification('✅ Opening Email and WhatsApp...', 'success');
                }
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                console.log('✉️ Message sent via:', deliveryMethod);
                
            } catch (error) {
                console.error('Error:', error);
                showNotification('❌ An error occurred. Please try again.', 'error');
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 500);
    });
    
    // Clear errors on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                removeInputError(this);
            }
        });
    });
    
    console.log('✅ Contact Form: Email & WhatsApp Initialized');
        }
       




// ============================================
// AWARDS SECTION - COMPLETE JAVASCRIPT
// ============================================

/**
 * Initialize awards section on page load
 */
function initializeAwards() {
    setupFilterButtons();
    setupModalEvents();
    setupAwardCardAnimations();
    console.log('✅ Awards Section: Fully Initialized');
}

// ============================================
// 1. FILTER FUNCTIONALITY
// ============================================

/**
 * Setup filter button event listeners
 */
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const awardItems = document.querySelectorAll('.award-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter awards with animation
            filterAwards(filter);
            
            console.log('📋 Awards filtered by:', filter);
        });

        // Hover effect
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    console.log('✅ Filter Buttons: Initialized');
}

/**
 * Filter awards by category with smooth animation
 * @param {string} category - Category to filter ('all', 'award', 'certification', 'scholarship')
 */
function filterAwards(category) {
    const awardItems = document.querySelectorAll('.award-item');
    let visibleCount = 0;
    
    awardItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            // Show item
            setTimeout(() => {
                item.classList.remove('hidden');
                item.style.animation = `slideInUp 0.6s ease forwards`;
                item.style.animationDelay = `${index * 0.1}s`;
            }, 50);
            visibleCount++;
        } else {
            // Hide item
            item.classList.add('hidden');
            item.style.animation = 'none';
        }
    });

    console.log(`📊 Showing ${visibleCount} awards`);
}


// ================================================
// AWARDS MODALS - SIMPLIFIED CONTROL
// ================================================

/**
 * Open Award Modal
 * @param {string} modalId - Modal ID (modal1, modal2, etc.)
 */
function openAwardModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (!modal) {
        console.error('❌ Modal not found:', modalId);
        return;
    }
    
    try {
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('🖼️ Certificate opened:', modalId);
        
        // Log the image source for debugging
        const img = modal.querySelector('.award-modal-image');
        if (img) {
            console.log('📸 Image source:', img.src);
        }
        
    } catch (error) {
        console.error('❌ Error opening modal:', error);
    }
}

/**
 * Close Award Modal
 * @param {string} modalId - Modal ID
 */
function closeAwardModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('✕ Certificate closed:', modalId);
    }
}

/**
 * Close All Modals (helper function)
 */
function closeAllModals() {
    const allModals = document.querySelectorAll('.award-modal.active');
    allModals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// ================================================
// MODAL EVENT LISTENERS
// ================================================

/**
 * Setup Modal Event Listeners
 */
function setupModalListeners() {
    // Close modal when clicking outside (on overlay)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.parentElement.classList.remove('active');
            document.body.style.overflow = 'auto';
            console.log('✕ Modal closed by overlay click');
        }
    });
    
    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
            console.log('✕ Modal closed by ESC key');
        }
    });
    
    console.log('✅ Modal Event Listeners: Initialized');
}

// Initialize listeners when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupModalListeners);
} else {
    setupModalListeners();
}

// ================================================
// AWARDS FILTER - SIMPLIFIED
// ================================================

/**
 * Initialize Awards Filtering
 */
function initializeAwardsFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const awardItems = document.querySelectorAll('.award-item');

    if (filterBtns.length === 0) {
        console.log('⚠️ No filter buttons found');
        return;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter awards
            filterAwards(filter);
            
            console.log('📋 Filtered by:', filter);
        });
    });

    console.log('✅ Awards Filtering: Initialized');
}

/**
 * Filter Awards by Category
 * @param {string} category - Category to filter ('all', 'award', 'certification', 'scholarship')
 */
function filterAwards(category) {
    const awardItems = document.querySelectorAll('.award-item');
    let visibleCount = 0;
    
    awardItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        const isMatch = category === 'all' || itemCategory === category;
        
        if (isMatch) {
            // Show item
            item.classList.remove('hidden');
            item.style.animation = `slideInUp 0.6s ease forwards`;
            item.style.animationDelay = `${index * 0.1}s`;
            visibleCount++;
        } else {
            // Hide item
            item.classList.add('hidden');
            item.style.animation = 'none';
        }
    });

    console.log(`📊 Showing ${visibleCount} award(s)`);
}

// Initialize filtering on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAwardsFiltering);
} else {
    initializeAwardsFiltering();
}

// ================================================
// SHARE AWARD FUNCTIONALITY
// ================================================

/**
 * Share Award on Social Media or Copy Link
 * @param {string} awardName - Name of the award
 */
function shareAward(awardName) {
    const shareUrl = 'https://ayomidefadipe.netlify.app/awards.html';
    const shareText = `🏆 I just earned: ${awardName} - Check out my portfolio!`;
    
    console.log('📤 Sharing award:', awardName);
    
    // Check if native share API is available
    if (navigator.share) {
        navigator.share({
            title: `${awardName} - Fadipe Ayomide`,
            text: shareText,
            url: shareUrl
        })
        .then(() => {
            console.log('✅ Award shared successfully');
            showNotification('✅ Award shared successfully!', 'success');
        })
        .catch(err => {
            if (err.name !== 'AbortError') {
                console.error('Share error:', err);
                copyShareLink(shareText, shareUrl);
            }
        });
    } else {
        // Fallback: Copy to clipboard
        copyShareLink(shareText, shareUrl);
    }
}

/**
 * Copy Share Link to Clipboard
 * @param {string} text - Share text
 * @param {string} url - URL to share
 */
function copyShareLink(text, url) {
    const fullText = `${text}\n${url}`;
    
    navigator.clipboard.writeText(fullText)
        .then(() => {
            console.log('📋 Link copied to clipboard');
            showNotification('📋 Link copied to clipboard!', 'success');
        })
        .catch(err => {
            console.error('Copy error:', err);
            showNotification('❌ Failed to copy link', 'error');
        });
}

/**
 * Show Notification Toast
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success' or 'error'
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#10b981' : '#ef4444';
    const icon = type === 'success' ? '✅' : '❌';
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 3000;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.4s ease;
        font-family: 'Poppins', sans-serif;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

console.log('✅ Awards Modal Control: Fully Initialized');

// ================================================
// STARTUP MESSAGE
// ================================================

console.log('');
console.log('════════════════════════════════════════');
console.log('🏆 AWARDS SECTION READY');
console.log('════════════════════════════════════════');
console.log('');
console.log('✅ Features Enabled:');
console.log('  • Modal Open/Close');
console.log('  • Filter by Category');
console.log('  • Share Award');
console.log('  • ESC to Close Modal');
console.log('  • Click Outside to Close');
console.log('');
console.log('════════════════════════════════════════');



// ============================================
// 3. CARD ANIMATIONS
// ============================================

/**
 * Setup award card hover animations
 */
function setupAwardCardAnimations() {
    const awardCards = document.querySelectorAll('.award-card');
    
    awardCards.forEach(card => {
        // Hover in
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(26, 42, 108, 0.2)';
        });
        
        // Hover out
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
        });

        // Touch support for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });

        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    console.log('✅ Card Animations: Initialized');
}

// ============================================
// 4. HIGHLIGHT TAGS ANIMATION
// ============================================

/**
 * Setup highlight tag animations
 */
function setupHighlightAnimations() {
    const highlights = document.querySelectorAll('.highlight');
    
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        highlight.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    console.log('✅ Highlight Animations: Initialized');
}

// ============================================
// 5. SHARE FUNCTIONALITY
// ============================================

/**
 * Share award on social media or copy to clipboard
 * @param {string} awardName - Name of the award
 */
function shareAward(awardName) {
    const shareUrl = 'https://ayomidefadipe.netlify.app/#awards';
    const shareText = `🏆 I just earned: ${awardName} - Check out my portfolio!`;
    
    console.log('📤 Sharing:', awardName);
    
    // Check if native share API is available
    if (navigator.share) {
        navigator.share({
            title: `${awardName} - Fadipe Ayomide`,
            text: shareText,
            url: shareUrl
        })
        .then(() => {
            console.log('✅ Award shared successfully');
            showNotification('✅ Award shared successfully!', 'success');
        })
        .catch(err => {
            if (err.name !== 'AbortError') {
                console.error('Share error:', err);
                copyToClipboard(shareText, shareUrl);
            }
        });
    } else {
        // Fallback: Show share options
        showShareMenu(awardName, shareText, shareUrl);
    }
}

/**
 * Copy share link to clipboard
 * @param {string} text - Text to copy
 * @param {string} url - URL to copy
 */
function copyToClipboard(text, url) {
    const fullText = `${text}\n${url}`;
    
    navigator.clipboard.writeText(fullText)
        .then(() => {
            console.log('📋 Link copied to clipboard');
            showNotification('📋 Link copied to clipboard!', 'success');
        })
        .catch(err => {
            console.error('Copy error:', err);
            showNotification('❌ Failed to copy link', 'error');
        });
}

/**
 * Show share menu for social platforms
 * @param {string} awardName - Award name
 * @param {string} text - Share text
 * @param {string} url - Share URL
 */
function showShareMenu(awardName, text, url) {
    const shareOptions = `
        <div style="text-align: center; padding: 20px;">
            <p style="margin-bottom: 15px; font-weight: bold;">Share on:</p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" 
                   target="_blank" 
                   style="padding: 10px 15px; background: #0077b5; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">
                    LinkedIn
                </a>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}" 
                   target="_blank" 
                   style="padding: 10px 15px; background: #1DA1F2; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">
                    Twitter
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" 
                   target="_blank" 
                   style="padding: 10px 15px; background: #1877F2; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">
                    Facebook
                </a>
            </div>
            <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">Or copy this text:</p>
            <textarea readonly style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ddd; font-size: 0.85rem; min-height: 60px;">${text}\n${url}</textarea>
        </div>
    `;
    
    alert(shareOptions);
}

// ============================================
// 6. NOTIFICATION SYSTEM
// ============================================

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success', 'error', 'info'
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 3000;
        animation: slideInRight 0.4s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ============================================
// 7. KEYBOARD SHORTCUTS
// ============================================

/**
 * Setup keyboard shortcuts
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt+A: Jump to awards section
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            const awardsSection = document.getElementById('awards');
            if (awardsSection) {
                awardsSection.scrollIntoView({ behavior: 'smooth' });
                console.log('⌨️ Jumped to awards section (Alt+A)');
            }
        }
        
        // Alt+F: Focus first filter button
        if (e.altKey && e.key === 'f') {
            e.preventDefault();
            const firstFilter = document.querySelector('.filter-btn');
            if (firstFilter) {
                firstFilter.focus();
                console.log('⌨️ Focused filter buttons (Alt+F)');
            }
        }
    });
    
    console.log('⌨️ Keyboard Shortcuts: Initialized');
}

// ============================================
// 8. SCROLL ANIMATIONS
// ============================================

/**
 * Setup scroll animations using Intersection Observer
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const awardItems = document.querySelectorAll('.award-item');
    awardItems.forEach(item => {
        observer.observe(item);
    });

    console.log('✨ Scroll Animations: Initialized');
}

// ============================================
// 9. STATISTICS COUNTER
// ============================================

/**
 * Animate statistics numbers
 */
function animateStats() {
    const stats = document.querySelectorAll('.stat h4');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 30);
        
        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(interval);
            }
            stat.textContent = currentValue;
        }, 50);
    });

    console.log('📊 Stats Animation: Initialized');
}

// ============================================
// 10. BUTTON RIPPLE EFFECT
// ============================================

/**
 * Add ripple effect to buttons
 */
function setupRippleEffect() {
    const buttons = document.querySelectorAll('.btn-small, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    console.log('✨ Ripple Effect: Initialized');
}

// ============================================
// 11. IMAGE LAZY LOADING
// ============================================

/**
 * Setup lazy loading for images
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('.award-modal-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.addEventListener('load', function() {
                        this.style.transition = 'opacity 0.3s ease';
                        this.style.opacity = '1';
                    });
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    console.log('🖼️ Lazy Loading: Initialized');
}

// ============================================
// 12. PRINT FUNCTIONALITY
// ============================================

/**
 * Print award certificate
 * @param {string} awardId - Award ID
 */
function printAward(awardId) {
    const data = awardDatabase[awardId];
    
    if (!data) return;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
        <html>
            <head>
                <title>${data.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #1a2a6c; margin-bottom: 10px; }
                    p { margin: 10px 0; color: #666; }
                    .details { background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <h1>${data.title}</h1>
                <p><strong>Issuer:</strong> ${data.issuer}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <div class="details">
                    <p>${data.details}</p>
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
    
    console.log('🖨️ Printing award:', awardId);
}

// ============================================
// 13. STARTUP & INITIALIZATION
// ============================================

/**
 * Main initialization function
 */
function initializeAwardsComplete() {
    console.log('');
    console.log('════════════════════════════════════════');
    console.log('🏆 AWARDS SECTION INITIALIZATION');
    console.log('════════════════════════════════════════');
    console.log('');
    
    // Initialize all features
    setupFilterButtons();
    setupModalEvents();
    setupAwardCardAnimations();
    setupHighlightAnimations();
    setupKeyboardShortcuts();
    setupScrollAnimations();
    setupRippleEffect();
    setupLazyLoading();
    
    // Animate stats on page load
    setTimeout(() => {
        animateStats();
    }, 500);
    
    console.log('');
    console.log('✅ Features Enabled:');
    console.log('  ✓ Filter Functionality');
    console.log('  ✓ Modal Window');
    console.log('  ✓ Card Animations');
    console.log('  ✓ Share Functionality');
    console.log('  ✓ Keyboard Shortcuts (Alt+A, Alt+F)');
    console.log('  ✓ Scroll Animations');
    console.log('  ✓ Ripple Effects');
    console.log('  ✓ Lazy Loading');
    console.log('  ✓ Statistics Counter');
    console.log('');
    console.log('🎯 Keyboard Shortcuts:');
    console.log('  Alt+A - Jump to awards section');
    console.log('  Alt+F - Focus filter buttons');
    console.log('  ESC - Close modal');
    console.log('');
    console.log('════════════════════════════════════════');
    console.log('🎉 Awards Section Ready!');
    console.log('════════════════════════════════════════');
    console.log('');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAwardsComplete);
} else {
    initializeAwardsComplete();
}

// ============================================
// 14. CSS ANIMATIONS (Inject if needed)
// ============================================

const animationStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

@keyframes ripple {
    from {
        width: 0;
        height: 0;
        opacity: 1;
    }
    to {
        width: 300px;
        height: 300px;
        opacity: 0;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

console.log('✨ Animation styles injected');

// ============================================
// 15. ERROR HANDLING
// ============================================

window.addEventListener('error', (event) => {
    console.error('❌ Error in awards section:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled rejection in awards section:', event.reason);
});

console.log('✅ Error handling: Active');











