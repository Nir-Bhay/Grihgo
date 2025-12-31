/**
 * ===================================
 * GRIHGO Utilities Module
 * Helper functions and utilities
 * ===================================
 */

/**
 * Show Toast Notification
 */
export function showNotification(message, type = 'info', duration = 4000) {
    let container = document.getElementById('toast-container');

    // Create container if not exists
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: 'check-circle',
        error: 'alert-circle',
        warning: 'alert-triangle',
        info: 'info'
    };

    toast.innerHTML = `
        <i data-lucide="${icons[type] || 'info'}" class="toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close toast">
            <i data-lucide="x"></i>
        </button>
    `;

    container.appendChild(toast);

    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn?.addEventListener('click', () => hideToast(toast));

    // Auto dismiss
    const timeoutId = setTimeout(() => hideToast(toast), duration);

    // Pause on hover
    toast.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    toast.addEventListener('mouseleave', () => {
        setTimeout(() => hideToast(toast), 1000);
    });

    return toast;
}

/**
 * Hide Toast
 */
function hideToast(toast) {
    if (!toast || toast.classList.contains('toast-exit')) return;

    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
}

/**
 * Validate Email
 */
export function validateEmail(email) {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

/**
 * Validate Phone (Indian)
 */
export function validatePhone(phone) {
    if (!phone) return false;
    const cleaned = phone.replace(/\D/g, '');
    return /^(?:\+?91)?[6-9]\d{9}$/.test(cleaned) || cleaned.length === 10;
}

/**
 * Format Number (Indian format)
 */
export function formatNumber(num, options = {}) {
    const {
        locale = 'en-IN',
        suffix = '',
        prefix = '',
        compact = false
    } = options;

    if (typeof num !== 'number') {
        num = parseFloat(num);
    }

    if (isNaN(num)) return '0';

    // Compact notation (1K, 1L, 1Cr)
    if (compact) {
        if (num >= 10000000) return prefix + (num / 10000000).toFixed(1) + 'Cr' + suffix;
        if (num >= 100000) return prefix + (num / 100000).toFixed(1) + 'L' + suffix;
        if (num >= 1000) return prefix + (num / 1000).toFixed(1) + 'K' + suffix;
    }

    return prefix + num.toLocaleString(locale) + suffix;
}

/**
 * Format Currency (INR)
 */
export function formatCurrency(amount, showSymbol = true) {
    const num = parseFloat(amount);
    if (isNaN(num)) return showSymbol ? '₹0' : '0';

    const formatted = num.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
    });

    return showSymbol ? `₹${formatted}` : formatted;
}

/**
 * Debounce Function
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle Function
 */
export function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Copy to Clipboard
 */
export async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

/**
 * Get URL Parameters
 */
export function getUrlParams(url = window.location.href) {
    const params = {};
    const searchParams = new URL(url).searchParams;

    for (const [key, value] of searchParams) {
        params[key] = value;
    }

    return params;
}

/**
 * Local Storage Helpers
 */
export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(`grihgo_${key}`, JSON.stringify(value));
        return true;
    } catch (err) {
        console.error('LocalStorage error:', err);
        return false;
    }
}

export function getLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(`grihgo_${key}`);
        return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
        console.error('LocalStorage error:', err);
        return defaultValue;
    }
}

/**
 * Generate Unique ID
 */
export function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Capitalize String
 */
export function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncate String
 */
export function truncate(str, length = 100, suffix = '...') {
    if (!str || str.length <= length) return str;
    return str.substring(0, length).trim() + suffix;
}

/**
 * Check if Element is in Viewport
 */
export function isInViewport(element, offset = 0) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= -offset &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
    );
}

/**
 * Get Device Type
 */
export function getDeviceType() {
    const ua = navigator.userAgent;

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

/**
 * Wait / Delay
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Default export
export default {
    showNotification,
    validateEmail,
    validatePhone,
    formatNumber,
    formatCurrency,
    debounce,
    throttle,
    copyToClipboard,
    getUrlParams,
    setLocalStorage,
    getLocalStorage,
    generateId,
    capitalize,
    truncate,
    isInViewport,
    getDeviceType,
    wait
};