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
// Analytics (Google Analytics 4) - só envia dados se o ID estiver configurado no index.html
// ===================================
function trackEvent(name, params) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', name, params || {});
    }
}

function linkLocation(link) {
    if (link.classList.contains('whatsapp-button')) return 'botao_flutuante';
    if (link.closest('.hero')) return 'topo_do_site';
    if (link.closest('#contact')) return 'secao_contato';
    if (link.closest('.footer')) return 'rodape';
    if (link.closest('.cta')) return 'chamada_condominio';
    if (link.closest('.franchise')) return 'franquia';
    if (link.closest('.navbar')) return 'menu';
    return 'outro';
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href.includes('wa.me') || href.includes('whatsapp')) {
        trackEvent('whatsapp_click', { local: linkLocation(link) });
    } else if (href.includes('instagram.com')) {
        trackEvent('instagram_click', { local: linkLocation(link) });
    } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', { local: linkLocation(link) });
    }
});

// ===================================
// Animated Number Counters
// ===================================
const counters = document.querySelectorAll('.counter[data-target]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 3500;
    const start = performance.now();
    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString('pt-BR');
        if (progress < 1) requestAnimationFrame(tick);
        else el.classList.add('counter-done');
    }
    requestAnimationFrame(tick);
}

if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    counters.forEach(el => { el.textContent = '0'; });
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
}

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
    // Número do seu WhatsApp (com código do país + DDD, sem espaços)
    const seuNumero = "5547991663273";
    
    // Monta a mensagem formatada para o WhatsApp
    const texto = `Olá! Meu nome é *${name}*.\n\n` +
                  `📧 *E-mail:* ${email}\n` +
                  `📱 *Telefone:* ${phone}\n\n` +
                  `💬 *Mensagem:*\n${message}`;

    // Cria o link do WhatsApp (encodeURIComponent evita quebra com &, #, ? etc.)
    const urlWhatsApp = `https://wa.me/${seuNumero}?text=${encodeURIComponent(texto)}`;

    trackEvent('whatsapp_click', { local: 'formulario_contato' });
    
    // Abre em uma nova aba
    window.open(urlWhatsApp, '_blank');
    
    showNotification('Redirecionando para o WhatsApp...', 'success');
    contactForm.reset();
} else {
    // Show error messages
    showNotification(errorMessages.join(', '), 'error');
}
});  // <-- Fecha o addEventListener do contactForm

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

// Note: the scroll listener for highlightActiveSection is registered further
// down as a debounced handler (optimizedScrollHandler) to avoid running the
// same expensive DOM work twice per scroll event.

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

// Only download/play the hero video on wider screens. On mobile the video
// stays hidden (see CSS) and the poster image is used instead, so we skip
// the download entirely to save mobile data.
const isWideScreen = window.matchMedia('(min-width: 769px)').matches;

if (heroVideo && isWideScreen) {
    const heroSource = heroVideo.querySelector('source[data-src]');

    heroVideo.addEventListener('error', () => {
        console.warn('Video failed to load, using fallback background');
        heroVideo.style.display = 'none';
        if (heroFallback) {
            heroFallback.style.display = 'block';
        }
    });

    // Ensure video plays once it has data
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.play().catch(err => {
            console.warn('Video autoplay prevented:', err);
        });
    });

    if (heroSource) {
        heroSource.src = heroSource.dataset.src;
        heroVideo.load();
    }
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
// Gallery Lightbox
// ===================================
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentGalleryIndex = 0;

function updateLightboxImage() {
    if (!galleryItems.length) return;
    const item = galleryItems[currentGalleryIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay h4');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
}

function openLightbox(index) {
    if (!lightbox) return;
    currentGalleryIndex = index;
    updateLightboxImage();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
}

function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateLightboxImage();
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// ===================================
// Demo Video Modal
// ===================================
const videoThumbBtns = document.querySelectorAll('.video-thumb[data-video]');
const videoModal = document.getElementById('videoModal');
const videoModalBackdrop = document.getElementById('videoModalBackdrop');
const videoModalClose = document.getElementById('videoModalClose');
const videoModalPlayer = document.getElementById('videoModalPlayer');

function openVideoModal(videoSrc, posterSrc) {
    if (!videoModal || !videoModalPlayer || !videoSrc) return;

    // Only download a video when it is opened, and only swap it if it changed
    if (videoModalPlayer.dataset.current !== videoSrc) {
        videoModalPlayer.dataset.current = videoSrc;
        if (posterSrc) videoModalPlayer.poster = posterSrc;
        videoModalPlayer.src = videoSrc;
        videoModalPlayer.load();
    }

    videoModal.hidden = false;
    document.body.style.overflow = 'hidden';
    videoModalPlayer.play().catch(() => {
        // Autoplay with sound may be blocked; the user can press play manually.
    });
}

function closeVideoModal() {
    if (!videoModal || !videoModalPlayer) return;
    videoModalPlayer.pause();
    videoModal.hidden = true;
    document.body.style.overflow = '';
}

videoThumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        openVideoModal(btn.dataset.video, btn.dataset.poster);
        trackEvent('video_play', { video: btn.dataset.video.split('/').pop() });
    });
});

if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
}

if (videoModalBackdrop) {
    videoModalBackdrop.addEventListener('click', closeVideoModal);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && !videoModal.hidden) {
        closeVideoModal();
    }
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

// ===================================
// Efeitos visuais
// ===================================
(function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Libera o hover dos cards depois que a animação de entrada termina
    document.querySelectorAll('.step-card, .benefit-card, .product-card, .gallery-item').forEach((el) => {
        el.addEventListener('animationend', () => el.classList.add('entered'), { once: true });
    });

    // Barra de progresso de leitura no topo
    if (!prefersReduced) {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        bar.setAttribute('aria-hidden', 'true');
        document.body.appendChild(bar);
        let ticking = false;
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
    }

    // Elementos aparecem suavemente ao rolar a página
    if (!prefersReduced && 'IntersectionObserver' in window) {
        const groups = [
            ['.section-header', ''],
            ['.about-text', 'reveal-left'],
            ['.about-image', 'reveal-right'],
            ['.number-card', 'reveal-zoom', 0.12],
            ['.video-thumb', '', 0.12],
            ['.testimonials-rating', ''],
            ['.testimonials-carousel', 'reveal-zoom'],
            ['.franchise-hero', ''],
            ['.franchise-compare', 'reveal-zoom'],
            ['.pillar', '', 0.1],
            ['.model-card', '', 0.12],
            ['.steps-line li', '', 0.08],
            ['.franchise-form-wrap', ''],
            ['.cta-content', 'reveal-zoom'],
            ['.contact-info', 'reveal-left'],
            ['.contact-form', 'reveal-right'],
            ['.footer-content > *', '', 0.1]
        ];
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        groups.forEach(([selector, extra, stagger]) => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add('reveal');
                if (extra) el.classList.add(extra);
                if (stagger) el.style.setProperty('--reveal-delay', `${(i % 4) * stagger}s`);
                revealObserver.observe(el);
            });
        });
    }

    // Luz que segue o mouse nos cards + inclinação 3D nos cards de números
    if (finePointer && !prefersReduced) {
        document.querySelectorAll('.number-card').forEach((card) => {
            const spot = document.createElement('span');
            spot.className = 'card-spotlight';
            spot.setAttribute('aria-hidden', 'true');
            card.appendChild(spot);
        });

        document.querySelectorAll('.step-card, .benefit-card, .product-card, .number-card').forEach((card) => {
            const isNumber = card.classList.contains('number-card');
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                card.style.setProperty('--mx', `${x}px`);
                card.style.setProperty('--my', `${y}px`);
                if (isNumber) {
                    const rx = ((y / r.height) - 0.5) * -10;
                    const ry = ((x / r.width) - 0.5) * 10;
                    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
                }
            });
            if (isNumber) {
                card.addEventListener('mouseleave', () => { card.style.transform = ''; });
            }
        });
    }
})();

// ===================================
// Depoimentos (carrossel)
// ===================================
(function () {
    const track = document.querySelector('.testimonials-track');
    if (!track) return;
    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    const prev = document.querySelector('.testimonials-prev');
    const next = document.querySelector('.testimonials-next');
    const dotsWrap = document.querySelector('.testimonials-dots');
    let dots = [];

    const step = () => {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return cards[0].getBoundingClientRect().width + gap;
    };
    const perView = () => Math.max(1, Math.round(track.clientWidth / step()));
    const pageCount = () => Math.max(1, cards.length - perView() + 1);
    const currentIndex = () => Math.round(track.scrollLeft / step());

    function buildDots() {
        dotsWrap.innerHTML = '';
        dots = [];
        const pages = pageCount();
        if (pages <= 1) return;
        for (let i = 0; i < pages; i++) {
            const b = document.createElement('button');
            b.type = 'button';
            b.setAttribute('role', 'tab');
            b.setAttribute('aria-label', `Ir para o depoimento ${i + 1}`);
            b.addEventListener('click', () => track.scrollTo({ left: i * step() }));
            dotsWrap.appendChild(b);
            dots.push(b);
        }
        update();
    }

    function update() {
        const idx = Math.min(currentIndex(), pageCount() - 1);
        dots.forEach((d, i) => d.setAttribute('aria-selected', i === idx ? 'true' : 'false'));
        const maxScroll = track.scrollWidth - track.clientWidth - 8;
        if (prev) prev.disabled = track.scrollLeft <= 8;
        if (next) next.disabled = track.scrollLeft >= maxScroll;
    }

    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: step() }));
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: step() }); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -step() }); }
    });

    let raf = null;
    track.addEventListener('scroll', () => {
        if (raf) return;
        raf = requestAnimationFrame(() => { update(); raf = null; });
    }, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildDots, 150);
    });

    buildDots();
    update();
})();

// ===================================
// Hero: mosaico de fotos e vídeos que se reorganiza
// ===================================
(function () {
    const mosaic = document.querySelector('.hero-mosaic');
    if (!mosaic) return;
    const tiles = Array.from(mosaic.querySelectorAll('.mosaic-tile'));
    const caption = mosaic.querySelector('.mosaic-caption');
    const capLight = mosaic.querySelector('.mosaic-caption-light');
    const capBold = mosaic.querySelector('.mosaic-caption-bold');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 769px)').matches;

    // Cada layout: posição de cada foto/vídeo [x, y, largura, altura] em %
    const layouts = [
        {
            tiles: {
                0: [0, 0, 31.5, 46], 1: [0, 49, 31.5, 51],
                2: [34.25, 0, 31.5, 30], 5: [34.25, 33, 31.5, 67],
                4: [68.5, 0, 31.5, 62], 6: [68.5, 65, 31.5, 35]
            }
        },
        {
            tiles: { 3: [0, 0, 100, 56], 0: [0, 59, 31.5, 27], 5: [34.25, 59, 31.5, 27], 4: [68.5, 59, 31.5, 27] },
            featured: 3,
            caption: ['praticidade', '24h']
        },
        {
            tiles: { 1: [0, 0, 48.5, 100], 2: [51.5, 0, 48.5, 48.5], 6: [51.5, 51.5, 48.5, 48.5] },
            featured: 1
        },
        {
            tiles: { 5: [0, 0, 41, 85], 0: [44, 0, 56, 41], 4: [44, 44, 56, 41] },
            featured: 5,
            caption: ['pague e', 'leve']
        }
    ];

    const lastPos = {};

    function apply(index) {
        const layout = layouts[index];
        tiles.forEach((tile) => {
            const id = tile.dataset.tile;
            const pos = layout.tiles[id];
            const video = tile.querySelector('video');
            if (pos) {
                lastPos[id] = pos;
                tile.style.setProperty('--x', pos[0] + '%');
                tile.style.setProperty('--y', pos[1] + '%');
                tile.style.setProperty('--w', pos[2] + '%');
                tile.style.setProperty('--h', pos[3] + '%');
                tile.classList.remove('is-hidden');
                if (video && video.src) video.play().catch(() => {});
            } else {
                if (!lastPos[id]) {
                    // Primeira vez escondido: nasce no centro, pequeno
                    tile.style.setProperty('--x', '35%');
                    tile.style.setProperty('--y', '35%');
                    tile.style.setProperty('--w', '30%');
                    tile.style.setProperty('--h', '30%');
                }
                tile.classList.add('is-hidden');
                if (video) setTimeout(() => { if (tile.classList.contains('is-hidden')) video.pause(); }, 700);
            }
            tile.classList.toggle('is-featured', String(layout.featured) === id);
        });
        if (layout.caption) {
            capLight.textContent = layout.caption[0];
            capBold.textContent = layout.caption[1];
            caption.classList.add('is-visible');
        } else {
            caption.classList.remove('is-visible');
        }
        mosaic.dataset.layout = index;
    }

    // Vídeos só carregam em telas maiores (economiza dados no celular)
    if (wide && !reduce) {
        tiles.forEach((tile) => {
            const v = tile.querySelector('video[data-src]');
            if (v) { v.src = v.dataset.src; v.removeAttribute('data-src'); }
        });
    }

    apply(0);
    if (reduce) return;

    let current = 0;
    let timer = null;
    const start = () => {
        if (timer) return;
        timer = setInterval(() => {
            current = (current + 1) % layouts.length;
            apply(current);
        }, 3800);
    };
    const stop = () => { clearInterval(timer); timer = null; };

    // Pausa quando o topo não está na tela ou a aba está escondida
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting && !document.hidden ? start() : stop()));
        }, { threshold: 0.2 }).observe(mosaic);
    } else {
        start();
    }
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
})();

// ===================================
// Franquia: quiz + envio para o WhatsApp
// ===================================
(function () {
    const form = document.getElementById('franchiseForm');
    if (!form) return;
    const result = form.querySelector('.quiz-result');

    function suggestion() {
        const tempo = form.querySelector('input[name="tempo"]:checked');
        const local = form.querySelector('input[name="local"]:checked');
        if (!tempo) return null;
        let modelo = tempo.value === 'Quero operar no dia a dia' ? 'CMP Operador' : 'CMP Investidor';
        let motivo = modelo === 'CMP Operador'
            ? 'você acompanha a loja de perto e fica com uma margem maior por unidade.'
            : 'a equipe CMP cuida da reposição e você acompanha tudo pelo painel.';
        let extra = '';
        if (local && local.value === 'Empresa ou escritório') extra = ' Unidades em empresas costumam ter movimento concentrado no horário comercial, e analisamos isso no estudo do ponto.';
        if (local && local.value === 'Já tenho um ponto em mente') extra = ' Ótimo: o próximo passo é o estudo desse ponto.';
        return { modelo, texto: `Seu perfil combina com o <strong>${modelo}</strong>: ${motivo}${extra}` };
    }

    form.addEventListener('change', (e) => {
        if (e.target.name === 'tempo' || e.target.name === 'local') {
            const s = suggestion();
            if (s) {
                result.innerHTML = s.texto;
                result.classList.add('has-result');
            }
        }
        const fs = e.target.closest('fieldset');
        if (fs) fs.classList.remove('field-error');
        if (e.target.classList) e.target.classList.remove('field-error');
    });

    form.addEventListener('input', (e) => e.target.classList && e.target.classList.remove('field-error'));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let firstError = null;
        ['tempo', 'local', 'prazo'].forEach((name) => {
            const checked = form.querySelector(`input[name="${name}"]:checked`);
            const fs = form.querySelector(`input[name="${name}"]`).closest('fieldset');
            if (!checked) { fs.classList.add('field-error'); firstError = firstError || fs; }
        });
        const nome = form.querySelector('#fr-name');
        const cidade = form.querySelector('#fr-city');
        [nome, cidade].forEach((el) => {
            if (el.value.trim().length < 2) { el.classList.add('field-error'); firstError = firstError || el; }
        });
        if (firstError) {
            if (typeof showNotification === 'function') showNotification('Responda as 3 perguntas e preencha nome e cidade.', 'error');
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const v = (n) => form.querySelector(`input[name="${n}"]:checked`).value;
        const s = suggestion();
        const texto = `Olá! Tenho interesse na *franquia CMP Market*.\n\n` +
            `👤 *Nome:* ${nome.value.trim()}\n` +
            `📍 *Cidade:* ${cidade.value.trim()}\n` +
            `⏱️ *Dedicação:* ${v('tempo')}\n` +
            `🏢 *Local:* ${v('local')}\n` +
            `📅 *Quando:* ${v('prazo')}\n` +
            `💡 *Modelo sugerido:* ${s ? s.modelo : '-'}`;

        if (typeof trackEvent === 'function') {
            trackEvent('franquia_lead', { modelo: s ? s.modelo : '', local: v('local'), prazo: v('prazo') });
        }
        window.open(`https://wa.me/5547991663273?text=${encodeURIComponent(texto)}`, '_blank');
        if (typeof showNotification === 'function') showNotification('Abrindo o WhatsApp com suas respostas...', 'success');
    });
})();
