export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
/**
 * ===================================
 * GRIHGO Counter Animations
 * Standalone counter animation script
 * ===================================
 */

(function() {
    'use strict';

    /**
     * Animate counter element
     */
    function animateCounter(element) {
        // Get target value
        const text = element.dataset.counter || element.dataset.target || element.textContent;
        const target = parseInt(text.replace(/[^\d]/g, ''));
        
        if (isNaN(target) || element.classList.contains('counted')) return;

        // Mark as counted
        element.classList.add('counted');

        // Get options
        const duration = parseInt(element.dataset.duration) || 2000;
        const suffix = element.dataset.suffix || (text.includes('+') ? '+' : '');
        const prefix = element.dataset.prefix || (text.includes('₹') ? '₹' : '');

        // Animation variables
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing (ease-out-cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (target - startValue) * easeOut);

            // Update display
            element.textContent = prefix + current.toLocaleString('en-IN') + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = prefix + target.toLocaleString('en-IN') + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    /**
     * Initialize counters with Intersection Observer
     */
    function initCounters() {
        const counters = document.querySelectorAll(
            '[data-counter], .counter, .counter-number, .stat-number, .stat-value'
        );

        if (counters.length === 0) return;

        // Check for Intersection Observer support
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5,
                rootMargin: '0px 0px -50px 0px'
            });

            counters.forEach(counter => observer.observe(counter));
        } else {
            // Fallback: animate all immediately
            counters.forEach(animateCounter);
        }
    }

    /**
     * Initialize on DOM ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCounters);
    } else {
        initCounters();
    }

    // Expose to global scope
    window.initCounters = initCounters;
    window.animateCounter = animateCounter;
})();