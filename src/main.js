/**
 * ===================================
 * GRIHGO Main JavaScript
 * Modular Entry Point - Enhanced
 * ===================================
 */

// Import modules
import { 
    initNavbar, 
    initMobileMenu, 
    initScrollToTop, 
    initSmoothScroll,
    initActiveLinks,
    closeMobileMenu 
} from './js/navigation.js';

import { 
    initScrollAnimations, 
    initFloatingIcons,
    initParallax,
    initCounterAnimations,
    initTextAnimations,
    initHoverEffects 
} from './js/animations.js';

import { 
    initPreloader, 
    initSearch, 
    initFAQ, 
    initRestaurantFilters, 
    initVoting, 
    initSwipers,
    initTabs,
    initAccordion,
    initModals,
    initForms,
    initToast,
    initBlogFilters,
    initBookmarks,
    initContactPage,
    initCareersPage,
    initCitiesPage 
} from './js/ui-components.js';

import { 
    showNotification, 
    validateEmail, 
    validatePhone, 
    formatNumber,
    debounce,
    throttle,
    copyToClipboard,
    getUrlParams,
    setLocalStorage,
    getLocalStorage,
    generateId 
} from './js/utils.js';

/**
 * App Configuration
 */
const CONFIG = {
    animationDuration: 800,
    toastDuration: 4000,
    debounceDelay: 300,
    mobileBreakpoint: 768,
    navbarHeight: 80
};

/**
 * App State
 */
const STATE = {
    isLoaded: false,
    isMobileMenuOpen: false,
    activeModals: [],
    currentPage: ''
};

/**
 * Initialize Application
 */
function initApp() {
    // Detect current page
    STATE.currentPage = detectCurrentPage();
    
    // Core initialization
    initCoreFeatures();
    
    // Page-specific initialization
    initPageFeatures();
    
    // Initialize Lucide Icons
    initIcons();
    
    // Initialize AOS
    initAOS();
    
    // Mark as loaded
    STATE.isLoaded = true;
    document.body.classList.add('loaded');
    
    console.log('🚀 GrihGO Website Initialized!');
    console.log(`📄 Current Page: ${STATE.currentPage}`);
}

/**
 * Initialize Core Features
 */
function initCoreFeatures() {
    // Preloader
    initPreloader();
    
    // Navigation
    initNavbar();
    initMobileMenu();
    initScrollToTop();
    initSmoothScroll();
    initActiveLinks();
    
    // UI Components
    initToast();
    initModals();
    initForms();
    initTabs();
    initAccordion();
    
    // Animations
    initScrollAnimations();
    initFloatingIcons();
    initHoverEffects();
    initCounterAnimations();
}

/**
 * Initialize Page-Specific Features
 */
function initPageFeatures() {
    switch (STATE.currentPage) {
        case 'home':
        case 'index':
            initSearch();
            initSwipers();
            initVoting();
            initParallax();
            break;
            
        case 'restaurants':
            initRestaurantFilters();
            initSearch();
            break;
            
        case 'cities':
            initCitiesPage();
            initVoting();
            initSearch();
            break;
            
        case 'contact':
            initContactPage();
            initFAQ();
            break;
            
        case 'blog':
            initBlogFilters();
            initBookmarks();
            initSearch();
            break;
            
        case 'careers':
            initCareersPage();
            initFAQ();
            break;
            
        case 'about':
            initTextAnimations();
            initParallax();
            break;
            
        case 'partner':
        case 'delivery':
            initForms();
            initFAQ();
            break;
            
        default:
            // Common features for all pages
            initFAQ();
            break;
    }
}

/**
 * Detect Current Page
 */
function detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '') || 'index';
    return filename.toLowerCase();
}

/**
 * Initialize Lucide Icons
 */
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        
        // Re-initialize after dynamic content
        window.refreshIcons = () => {
            lucide.createIcons();
        };
    } else {
        console.warn('⚠️ Lucide icons library not loaded');
    }
}

/**
 * Initialize AOS (Animate On Scroll)
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: CONFIG.animationDuration,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            disable: () => window.innerWidth < 768
        });
        
        // Refresh on load
        window.addEventListener('load', () => {
            AOS.refresh();
        });
        
        // Refresh on resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                AOS.refresh();
            }, 250);
        });
    }
}

/**
 * Global Event Handlers
 */
function initGlobalEvents() {
    // Escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeAllModals();
        }
    });
    
    // Window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > CONFIG.mobileBreakpoint) {
            closeMobileMenu();
        }
    }, 250));
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            // Resume animations if needed
        }
    });
}

/**
 * Close All Modals
 */
function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.classList.remove('modal-open');
    STATE.activeModals = [];
}

/**
 * Initialize on DOM Ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    initGlobalEvents();
});

/**
 * Re-initialize on page load (for images, etc.)
 */
window.addEventListener('load', () => {
    // Refresh animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Remove any remaining loading states
    document.querySelectorAll('.loading').forEach(el => {
        el.classList.remove('loading');
    });
});

/**
 * Expose to Global Scope
 */
window.GRIHGO = {
    // Configuration
    CONFIG,
    STATE,
    
    // Utilities
    showNotification,
    validateEmail,
    validatePhone,
    formatNumber,
    copyToClipboard,
    debounce,
    throttle,
    
    // Actions
    refreshIcons: () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },
    
    // Voting (for HTML onclick)
    voteCity: (city, btn) => {
        if (typeof window.voteCity === 'function') {
            window.voteCity(city, btn);
        }
    },
    
    // Live chat
    openLiveChat: () => {
        showNotification('Live chat coming soon! Download the app for instant support.', 'info');
    }
};

// Export for ES modules
export { CONFIG, STATE, initApp };