/**
 * ===================================
 * GRIHGO Navigation Module
 * Navbar, Mobile Menu, Smooth Scroll
 * ===================================
 */

// State
let isScrolled = false;
let isMobileMenuOpen = false;
let lastScrollY = 0;

/**
 * Initialize Navbar
 */
export function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Scroll handler
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Add/remove scrolled class
        if (scrollY > 50) {
            if (!isScrolled) {
                navbar.classList.add('scrolled');
                isScrolled = true;
            }
        } else {
            if (isScrolled) {
                navbar.classList.remove('scrolled');
                isScrolled = false;
            }
        }

        lastScrollY = scrollY;
    };

    // Throttled scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    handleScroll();
}

/**
 * Initialize Mobile Menu
 */
export function initMobileMenu() {
    const toggle = document.getElementById('navbar-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');

    if (!toggle || !mobileMenu) return;

    // Toggle button click
    toggle.addEventListener('click', () => {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close button click
    closeBtn?.addEventListener('click', closeMobileMenu);

    // Close on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 150);
        });
    });

    // Close on overlay/outside click
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu || e.target.classList.contains('mobile-menu-overlay')) {
            closeMobileMenu();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });

    // Close on window resize (if going to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
    });
}

/**
 * Open Mobile Menu
 */
export function openMobileMenu() {
    const toggle = document.getElementById('navbar-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenu) return;

    mobileMenu.classList.add('active');
    toggle?.classList.add('active');
    document.body.classList.add('menu-open', 'no-scroll');
    isMobileMenuOpen = true;

    // Focus first link
    const firstLink = mobileMenu.querySelector('.mobile-menu-link');
    firstLink?.focus();
}

/**
 * Close Mobile Menu
 */
export function closeMobileMenu() {
    const toggle = document.getElementById('navbar-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenu) return;

    mobileMenu.classList.remove('active');
    toggle?.classList.remove('active');
    document.body.classList.remove('menu-open', 'no-scroll');
    isMobileMenuOpen = false;

    // Return focus to toggle
    toggle?.focus();
}

/**
 * Initialize Scroll to Top
 */
export function initScrollToTop() {
    const backToTop = document.getElementById('back-to-top') || document.getElementById('backToTop');
    if (!backToTop) return;

    // Show/hide based on scroll
    const toggleVisibility = () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                toggleVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Click handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial check
    toggleVisibility();
}

/**
 * Initialize Smooth Scroll
 */
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if just "#" or empty
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                scrollToElement(target);

                // Close mobile menu if open
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                }

                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Scroll to Element
 */
export function scrollToElement(element, offset = 80) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Initialize Active Links
 */
export function initActiveLinks() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    // Desktop nav links
    document.querySelectorAll('.navbar-link').forEach(link => {
        const linkPath = link.getAttribute('href');
        const linkPage = linkPath?.split('/').pop() || '';

        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPath === '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile nav links
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        const linkPath = link.getAttribute('href');
        const linkPage = linkPath?.split('/').pop() || '';

        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Bottom nav links
    document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(link => {
        const linkPath = link.getAttribute('href');
        const linkPage = linkPath?.split('/').pop() || '';

        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Get Mobile Menu State
 */
export function isMobileMenuActive() {
    return isMobileMenuOpen;
}

/**
 * Get Navbar Height
 */
export function getNavbarHeight() {
    const navbar = document.getElementById('navbar');
    return navbar ? navbar.offsetHeight : 80;
}