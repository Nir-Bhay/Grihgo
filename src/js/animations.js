/**
 * ===================================
 * GRIHGO Animations Module
 * Scroll animations, counters, effects
 * ===================================
 */

import { formatNumber } from './utils.js';

/**
 * Initialize Scroll Animations
 */
export function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.scroll-animate, [data-animate]'
    );

    if (animatedElements.length === 0) return;

    // Use Intersection Observer for performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                const animation = el.dataset.animate || 'fadeInUp';

                setTimeout(() => {
                    el.classList.add('animated', 'visible', animation);
                }, parseInt(delay));

                // If it's a stat number, start counting
                if (el.classList.contains('stat-number') && el.dataset.count) {
                    animateCounter(el);
                }

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        // Skip if AOS is handling it
        if (el.hasAttribute('data-aos')) return;
        observer.observe(el);
    });
}

/**
 * Animate Counter
 */
export function animateCounter(element) {
    const target = parseInt((element.dataset.count || element.textContent).replace(/[^\d]/g, ''));
    if (isNaN(target)) return;

    const duration = parseInt(element.dataset.duration) || 2000;
    const startTime = performance.now();
    const suffix = element.dataset.suffix || (element.dataset.count?.includes('+') ? '+' : '');
    const prefix = element.dataset.prefix || '';

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const value = Math.floor(easeProgress * target);
        element.textContent = prefix + value.toLocaleString('en-IN') + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = prefix + target.toLocaleString('en-IN') + suffix;
        }
    };

    requestAnimationFrame(update);
}

/**
 * Initialize Floating Icons Animation
 */
export function initFloatingIcons() {
    const container = document.getElementById('floating-icons');
    const floatingElements = document.querySelectorAll('.floating-element, .floating-icon');

    // For container-based floating icons
    if (container) {
        const icons = ['pizza', 'utensils', 'cake-slice', 'coffee', 'ice-cream', 'apple', 'carrot'];
        const count = 12;

        for (let i = 0; i < count; i++) {
            const icon = document.createElement('div');
            icon.className = 'floating-food-icon';
            icon.innerHTML = `<i data-lucide="${icons[Math.floor(Math.random() * icons.length)]}"></i>`;

            icon.style.left = `${Math.random() * 100}%`;
            icon.style.top = `${Math.random() * 100}%`;

            const duration = 10 + Math.random() * 10;
            const delay = Math.random() * 5;
            icon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            icon.style.opacity = (0.05 + Math.random() * 0.1).toString();
            icon.style.fontSize = `${20 + Math.random() * 30}px`;
            icon.style.position = 'absolute';
            icon.style.pointerEvents = 'none';

            container.appendChild(icon);
        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // For pre-defined floating elements
    floatingElements.forEach((el, index) => {
        const duration = 6 + Math.random() * 4;
        const delay = index * 0.5;

        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;

        if (!el.style.animation) {
            el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        }
    });
}

/**
 * Initialize Parallax Effect
 */
export function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax], .parallax');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.3;
            const rect = el.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrollY * speed);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    updateParallax();
}

/**
 * Initialize Counter Animations
 */
export function initCounterAnimations() {
    const counters = document.querySelectorAll(
        '[data-counter], .counter-number, .stat-number, .stat-value'
    );

    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Initialize Text Animations
 */
export function initTextAnimations() {
    // Typing effect
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(el => {
        const text = el.dataset.typing || el.textContent;
        const speed = parseInt(el.dataset.speed) || 80;
        const startDelay = parseInt(el.dataset.startDelay) || 0;

        el.textContent = '';
        el.style.visibility = 'visible';

        let i = 0;

        const type = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                el.classList.add('typing-complete');
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(type, startDelay);
                observer.disconnect();
            }
        });

        observer.observe(el);
    });
}

/**
 * Initialize Hover Effects
 */
export function initHoverEffects() {
    // Card tilt effect
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        const maxTilt = parseFloat(card.dataset.tilt) || 10;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * maxTilt;
            const rotateY = ((centerX - x) / centerX) * maxTilt;

            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.02, 1.02, 1.02)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Ripple effect on buttons
    const rippleBtns = document.querySelectorAll('.btn, [data-ripple]');

    rippleBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;

            btn.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * Create Confetti Animation
 */
export function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#2ECC71', '#27AE60', '#1E8449', '#ECFDF5', '#F1C40F'];

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${8 + Math.random() * 4}px;
            height: ${8 + Math.random() * 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top}px;
        `;
        document.body.appendChild(confetti);

        const angle = (Math.random() * 360) * (Math.PI / 180);
        const velocity = 3 + Math.random() * 6;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity - 8;

        let x = 0, y = 0, opacity = 1, rotation = 0;
        const animate = () => {
            vx *= 0.99;
            x += vx;
            y += vy + 0.4;
            opacity -= 0.01;
            rotation += 10;

            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            confetti.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };

        requestAnimationFrame(animate);
    }
}

/**
 * Add CSS keyframes dynamically
 */
function addKeyframes() {
    if (document.getElementById('grihgo-animations')) return;

    const style = document.createElement('style');
    style.id = 'grihgo-animations';
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-15px) rotate(3deg); }
            50% { transform: translateY(-8px) rotate(-2deg); }
            75% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        .scroll-animate, [data-animate] {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scroll-animate.visible, [data-animate].visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    document.head.appendChild(style);
}

// Add keyframes on load
addKeyframes();