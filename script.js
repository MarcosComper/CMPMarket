/**
 * CMP Market - Main JavaScript
 * Pure Vanilla JavaScript - No dependencies
 */

// ===================================
// Navigation Menu Toggle
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scroll for CTA buttons
const ctaButtons = document.querySelectorAll('.btn[href^="#"]');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

// Create observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.step-card, .benefit-card, .gallery-item, .product-card'
);

animatedElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// Form Validation and Submission
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    let isValid = true;
    let errorMessages = [];
    
    // Validate name
    if (name.length < 3) {
        isValid = false;
        errorMessages.push('Nome deve ter pelo menos 3 caracteres');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        errorMessages.push('Email inválido');
    }
    
    // Validate phone
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phoneRegex.test(phone)) {
        isValid = false;
        errorMessages.push('Telefone inválido');
    }
    
    // Validate message
    if (message.length < 10) {
        isValid = false;
        errorMessages.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    if (isValid) {
        // Form is valid - show success message
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
        
        // In a real application, you would send the form data to a server
        console.log('Form Data:', { name, email, phone, message });
    } else {
        // Show error messages
        showNotification(errorMessages.join(', '), 'error');
    }
});

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00D66C' : '#ff4757'};
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 400px;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Add notification animations to CSS dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
        font-weight: 500;
    }
    
    .notification-content i {
        font-size: 1.5rem;
    }
`;
document.head.appendChild(notificationStyles);

// ===================================
// Form Input Enhancement
// ===================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Real-time validation feedback
    input.addEventListener('input', () => {
        input.classList.remove('error');
        input.classList.remove('success');
        
        if (input.value.length > 0) {
            // Simple validation check
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(input.value)) {
                    input.classList.add('success');
                } else {
                    input.classList.add('error');
                }
            } else if (input.type === 'tel') {
                const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
                if (phoneRegex.test(input.value)) {
                    input.classList.add('success');
                } else {
                    input.classList.add('error');
                }
            } else {
                if (input.value.length >= 3) {
                    input.classList.add('success');
                }
            }
        }
    });
});

// Add input validation styles
const inputValidationStyles = document.createElement('style');
inputValidationStyles.textContent = `
    .form-group input.success,
    .form-group textarea.success {
        border-color: #00D66C;
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ff4757;
    }
    
    .form-group.focused label {
        color: #00FF88;
    }
`;
document.head.appendChild(inputValidationStyles);

// ===================================
// Active Navigation Link Highlight
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add active link styles
const activeLinkStyles = document.createElement('style');
activeLinkStyles.textContent = `
    .nav-link.active {
        color: #00D66C !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyles);

window.addEventListener('scroll', highlightActiveSection);

// ===================================
// Image Lazy Loading Enhancement
// ===================================
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.animation = 'fadeIn 0.5s ease-out';
    });
});

const imageLoadStyles = document.createElement('style');
imageLoadStyles.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(imageLoadStyles);

// ===================================
// Hero Scroll Indicator
// ===================================
const heroScroll = document.querySelector('.hero-scroll');

if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    highlightActiveSection();
}, 50);

window.addEventListener('scroll', optimizedScrollHandler);

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c CMP Market ', 'background: #0A2540; color: #00FF88; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c Desenvolvido com HTML5, CSS3 e JavaScript puro ', 'background: #00FF88; color: #0A2540; font-size: 14px; padding: 5px;');
console.log('%c Praticidade e conveniência 24h no seu condomínio ', 'color: #1E3A5F; font-size: 12px;');

// ===================================
// Parallax Scrolling Effect
// ===================================
const parallaxElements = {
    video: document.querySelector('.hero-video'),
    heroContent: document.querySelector('.hero-content'),
    heroTitle: document.querySelector('.hero-title'),
    aboutImage: document.querySelector('.about-image'),
    productIcons: document.querySelectorAll('.product-icon'),
    galleryItems: document.querySelectorAll('.gallery-item')
};

// Parallax scroll handler
function handleParallax() {
    const scrolled = window.pageYOffset;
    
    // Hero video parallax (slower movement)
    if (parallaxElements.video) {
        parallaxElements.video.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
    }
    
    // Hero content parallax (subtle upward movement)
    if (parallaxElements.heroContent) {
        parallaxElements.heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
    
    // Hero title parallax (faster upward movement)
    if (parallaxElements.heroTitle) {
        parallaxElements.heroTitle.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
    
    // About image parallax
    if (parallaxElements.aboutImage) {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const sectionTop = aboutSection.offsetTop;
            const sectionScroll = scrolled - sectionTop + window.innerHeight;
            
            if (sectionScroll > 0 && sectionScroll < aboutSection.offsetHeight + window.innerHeight) {
                parallaxElements.aboutImage.style.transform = `translateY(${sectionScroll * 0.05}px)`;
            }
        }
    }
    
    // Product icons parallax (floating effect)
    parallaxElements.productIcons.forEach((icon, index) => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const sectionTop = productsSection.offsetTop;
            const sectionScroll = scrolled - sectionTop + window.innerHeight;
            
            if (sectionScroll > 0 && sectionScroll < productsSection.offsetHeight + window.innerHeight) {
                const delay = index * 0.1;
                const movement = Math.sin((sectionScroll * 0.01) + delay) * 10;
                icon.style.transform = `translateY(${movement}px)`;
            }
        }
    });
    
    // Gallery items parallax (subtle zoom and movement)
    parallaxElements.galleryItems.forEach((item, index) => {
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            const sectionTop = gallerySection.offsetTop;
            const sectionScroll = scrolled - sectionTop + window.innerHeight;
            
            if (sectionScroll > 0 && sectionScroll < gallerySection.offsetHeight + window.innerHeight) {
                const delay = index * 0.05;
                const movement = (sectionScroll * 0.02) + delay;
                item.querySelector('img').style.transform = `translateY(${movement}px) scale(${1 + (movement * 0.0001)})`;
            }
        }
    });
}

// Debounced parallax handler for better performance
const debouncedParallax = debounce(handleParallax, 10);

// Add parallax on scroll
window.addEventListener('scroll', debouncedParallax);

// Initial parallax setup
handleParallax();

// ===================================
// Video Background Handler
// ===================================
const heroVideo = document.querySelector('.hero-video');
const heroFallback = document.querySelector('.hero-fallback');

// Check if video loaded successfully
if (heroVideo) {
    heroVideo.addEventListener('error', () => {
        console.warn('Video failed to load, using fallback background');
        heroVideo.style.display = 'none';
        if (heroFallback) {
            heroFallback.style.display = 'block';
        }
    });
    
    // Ensure video plays on load
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.play().catch(err => {
            console.warn('Video autoplay prevented:', err);
        });
    });
}

// ===================================
// WhatsApp Button Enhancement
// ===================================
const whatsappButton = document.querySelector('.whatsapp-button');

if (whatsappButton) {
    // Add click analytics
    whatsappButton.addEventListener('click', () => {
        console.log('WhatsApp button clicked - Opening conversation');
    });
    
    // Make button more visible on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            whatsappButton.style.opacity = '1';
        } else {
            whatsappButton.style.opacity = '0.8';
        }
    });
}

// ===================================
// Smooth Scroll Enhancement for Product Cards
// ===================================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Development Helper
// ===================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚀 Modo de desenvolvimento detectado');
    console.log('📱 Teste a responsividade redimensionando a janela');
    console.log('🎨 Todas as animações estão ativas');
    console.log('✨ Parallax scrolling ativado');
    console.log('🎥 Vídeo hero carregado');
}
