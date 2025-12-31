/**
 * ===================================
 * GRIHGO UI Components Module
 * Preloader, FAQ, Forms, Filters, etc.
 * ===================================
 */

import { showNotification, debounce, validateEmail, validatePhone } from './utils.js';
import { createConfetti, animateCounter } from './animations.js';

/**
 * Initialize Preloader
 */
export function initPreloader() {
    const preloader = document.getElementById('preloader') || document.getElementById('page-loader');

    if (!preloader) {
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        document.body.classList.remove('loading');
        return;
    }

    const hidePreloader = () => {
        preloader.classList.add('loaded', 'hidden');
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';

        setTimeout(() => {
            preloader.style.display = 'none';
            if (window.AOS) window.AOS.refresh();
        }, 500);
    };

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
        setTimeout(hidePreloader, 3000);
    }
}

/**
 * Initialize Search
 */
export function initSearch() {
    const searchInputs = document.querySelectorAll(
        '#search-input, .search-input, [data-search], #main-search'
    );

    searchInputs.forEach(input => {
        const targetSelector = input.dataset.searchTarget || '.searchable-item';
        const container = input.closest('section') || document;

        input.addEventListener('input', debounce((e) => {
            const query = e.target.value.toLowerCase().trim();
            const items = container.querySelectorAll(targetSelector);

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                const shouldShow = !query || text.includes(query);
                item.style.display = shouldShow ? '' : 'none';
            });
        }, 300));
    });

    // Location detection
    const detectBtn = document.querySelector('.detect-location-btn');
    const locationInput = document.getElementById('location-input');

    if (detectBtn && locationInput) {
        detectBtn.addEventListener('click', () => {
            const originalContent = detectBtn.innerHTML;
            detectBtn.innerHTML = '<i data-lucide="loader" class="animate-spin icon-xs"></i><span>Locating...</span>';
            if (window.lucide) window.lucide.createIcons();

            setTimeout(() => {
                locationInput.value = 'Boring Road, Patna';
                detectBtn.innerHTML = originalContent;
                if (window.lucide) window.lucide.createIcons();
                showNotification('Location detected successfully!', 'success');
            }, 1500);
        });
    }
}

/**
 * Initialize FAQ Accordion
 */
export function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item, .accordion-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question, .accordion-trigger');
        const answer = item.querySelector('.faq-answer, .accordion-content');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            const parent = item.closest('.faq-list, .faq-content, .accordion-list');

            // Close other items
            if (parent) {
                parent.querySelectorAll('.faq-item, .accordion-item').forEach(sibling => {
                    if (sibling !== item && sibling.classList.contains('active')) {
                        sibling.classList.remove('active');
                        sibling.querySelector('.faq-question, .accordion-trigger')?.setAttribute('aria-expanded', 'false');
                    }
                });
            }

            // Toggle current
            item.classList.toggle('active', !isOpen);
            question.setAttribute('aria-expanded', !isOpen);
        });
    });
}

/**
 * Initialize Tabs
 */
export function initTabs() {
    const tabContainers = document.querySelectorAll('.faq-tabs, .tabs-container, [data-tabs]');

    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.faq-tab, .tab-btn, [data-tab]');
        const parent = container.closest('section') || document;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;

                // Update tabs
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                // Update content
                const contents = parent.querySelectorAll('.faq-content, .tab-content, [data-tab-content]');
                contents.forEach(content => {
                    const isTarget = content.id === `faq-${targetId}` ||
                        content.id === targetId ||
                        content.dataset.tabContent === targetId;

                    content.classList.toggle('active', isTarget);
                    content.setAttribute('aria-hidden', !isTarget);
                });
            });
        });
    });
}

/**
 * Initialize Restaurant Filters
 */
export function initRestaurantFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn, .filter-pill, .cuisine-filter');
    const restaurantCards = document.querySelectorAll('.restaurant-card, .card-premium');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter || btn.dataset.cuisine || 'all';

            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            restaurantCards.forEach(card => {
                const cuisine = (card.dataset.cuisine || card.dataset.cuisines || '').toLowerCase();
                const status = (card.dataset.status || '').toLowerCase();

                const shouldShow = filter === 'all' ||
                    cuisine.includes(filter) ||
                    (filter === 'pure-veg' && status.includes('pure-veg'));

                card.style.display = shouldShow ? '' : 'none';
                if (shouldShow) {
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                }
            });

            showNotification(`Filtering by: ${filter}`, 'info');
        });
    });
}

/**
 * Initialize Blog Filters
 */
export function initBlogFilters() {
    const filterPills = document.querySelectorAll('.filter-pill[data-filter]');
    const blogCards = document.querySelectorAll('.blog-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.dataset.filter;

            blogCards.forEach(card => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;

                card.style.display = shouldShow ? '' : 'none';
                if (shouldShow) {
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                }
            });
        });
    });
}

/**
 * Initialize Bookmarks
 */
export function initBookmarks() {
    const bookmarkBtns = document.querySelectorAll('.card-bookmark, [data-bookmark]');
    const bookmarks = JSON.parse(localStorage.getItem('grihgo_bookmarks') || '[]');

    bookmarkBtns.forEach(btn => {
        const articleId = btn.closest('[data-id]')?.dataset.id || btn.dataset.bookmark;

        if (bookmarks.includes(articleId)) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isBookmarked = btn.classList.toggle('active');
            const currentBookmarks = JSON.parse(localStorage.getItem('grihgo_bookmarks') || '[]');

            if (isBookmarked) {
                if (!currentBookmarks.includes(articleId)) {
                    currentBookmarks.push(articleId);
                }
                showNotification('Article bookmarked!', 'success');
            } else {
                const index = currentBookmarks.indexOf(articleId);
                if (index > -1) currentBookmarks.splice(index, 1);
                showNotification('Bookmark removed', 'info');
            }

            localStorage.setItem('grihgo_bookmarks', JSON.stringify(currentBookmarks));
        });
    });
}

/**
 * Initialize Voting
 */
export function initVoting() {
    const voted = JSON.parse(localStorage.getItem('grihgo_votes') || '[]');

    document.querySelectorAll('.city-card').forEach(card => {
        const city = card.dataset.city;
        const button = card.querySelector('button');

        if (voted.includes(city) && button) {
            button.innerHTML = 'Voted <i data-lucide="check-circle" class="icon-xs"></i>';
            button.disabled = true;
            button.className = 'btn btn-outline btn-sm';
        }
    });

    window.voteCity = (city, button) => {
        if (voted.includes(city)) {
            showNotification('Already voted!', 'warning');
            return;
        }

        const voteCountEl = button.closest('.city-card')?.querySelector('.vote-count');
        if (voteCountEl) {
            const currentVotes = parseInt(voteCountEl.textContent.replace(/,/g, '')) || 0;
            animateCounter({
                dataset: { count: (currentVotes + 1).toString() },
                textContent: voteCountEl.textContent,
                get textContent() { return voteCountEl.textContent; },
                set textContent(val) { voteCountEl.textContent = val; }
            });
        }

        button.innerHTML = 'Voted <i data-lucide="check-circle" class="icon-xs"></i>';
        button.disabled = true;
        button.className = 'btn btn-outline btn-sm';

        voted.push(city);
        localStorage.setItem('grihgo_votes', JSON.stringify(voted));

        createConfetti(button);
        showNotification(`Voted for ${city}!`, 'success');

        if (window.lucide) window.lucide.createIcons();
    };
}

/**
 * Initialize Swipers/Carousels
 */
export function initSwipers() {
    if (typeof Swiper === 'undefined') return;

    const sliders = [
        { id: '#promo-slider', options: { slidesPerView: 1, spaceBetween: 24, loop: true, autoplay: { delay: 5000 }, pagination: { el: '.swiper-pagination', clickable: true }, breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } } } },
        { id: '#testimonials-slider', options: { slidesPerView: 1, spaceBetween: 24, loop: true, autoplay: { delay: 6000 }, pagination: { el: '.swiper-pagination', clickable: true }, breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } } } }
    ];

    sliders.forEach(slider => {
        if (document.querySelector(slider.id)) {
            new Swiper(slider.id, slider.options);
        }
    });
}

/**
 * Initialize Modals
 */
export function initModals() {
    document.querySelectorAll('[data-modal-open], [data-modal]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modalOpen || trigger.dataset.modal;
            openModal(modalId);
        });
    });

    document.querySelectorAll('[data-modal-close], .modal-close').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modal = trigger.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                closeModal(modal.id);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    document.body.classList.add('modal-open', 'no-scroll');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('active');

    const anyOpen = document.querySelector('.modal.active');
    if (!anyOpen) {
        document.body.classList.remove('modal-open', 'no-scroll');
    }
}

export { openModal, closeModal };

/**
 * Initialize Forms
 */
export function initForms() {
    const forms = document.querySelectorAll('form[data-ajax], #contactForm, .contact-form, .newsletter-form');

    forms.forEach(form => {
        let isSubmitting = false;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (isSubmitting) return;

            // Validate
            let isValid = true;
            form.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                showNotification('Please fill all required fields', 'error');
                return;
            }

            isSubmitting = true;
            const submitBtn = form.querySelector('[type="submit"], .submit-btn');
            const originalText = submitBtn?.innerHTML;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Sending...';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));

                const successEl = form.parentElement?.querySelector('.form-success, #form-success');
                if (successEl) {
                    form.style.display = 'none';
                    successEl.style.display = 'block';
                }

                showNotification('Message sent successfully! 🎉', 'success');
                form.reset();

            } catch (error) {
                showNotification('Something went wrong. Please try again.', 'error');
            } finally {
                isSubmitting = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
            }
        });
    });
}

/**
 * Initialize Toast System
 */
export function initToast() {
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

/**
 * Initialize Contact Page Features
 */
export function initContactPage() {
    const faqSearch = document.getElementById('faq-search');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    suggestionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const searchTerm = tag.dataset.search || tag.textContent;
            if (faqSearch) {
                faqSearch.value = searchTerm;
            }
        });
    });

    const searchBtn = document.querySelector('.search-btn');
    searchBtn?.addEventListener('click', () => {
        if (faqSearch?.value) {
            const faqSection = document.getElementById('faqs');
            if (faqSection) {
                faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            showNotification(`Searching for: ${faqSearch.value}`, 'info');
        }
    });
}

/**
 * Initialize Cities Page Features
 */
export function initCitiesPage() {
    const cityCards = document.querySelectorAll('.city-card');
    const filterBtns = document.querySelectorAll('.city-filter-btn, [data-city-filter]');
    const searchInput = document.querySelector('.city-search-input, #city-search');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.cityFilter || btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cityCards.forEach(card => {
                const status = card.dataset.status || 'active';
                const shouldShow = filter === 'all' || status === filter;
                card.style.display = shouldShow ? '' : 'none';
            });
        });
    });

    searchInput?.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();

        cityCards.forEach(card => {
            const cityName = card.querySelector('.city-name, h3')?.textContent.toLowerCase() || '';
            const shouldShow = !query || cityName.includes(query);
            card.style.display = shouldShow ? '' : 'none';
        });
    }, 300));
}

/**
 * Initialize Careers Page Features
 */
export function initCareersPage() {
    const jobCards = document.querySelectorAll('.job-card, .career-card');
    const deptFilters = document.querySelectorAll('.dept-filter, [data-department]');

    deptFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const dept = filter.dataset.department || filter.dataset.dept;

            deptFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            jobCards.forEach(card => {
                const cardDept = card.dataset.department || '';
                const shouldShow = dept === 'all' || cardDept === dept;
                card.style.display = shouldShow ? '' : 'none';
            });
        });
    });
}

/**
 * Initialize Accordion
 */
export function initAccordion() {
    const accordions = document.querySelectorAll('.accordion:not(.faq-item)');

    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.accordion-header, .accordion-trigger');
            const content = item.querySelector('.accordion-content, .accordion-body');

            if (!header || !content) return;

            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                if (accordion.dataset.multiple !== 'true') {
                    items.forEach(i => {
                        i.classList.remove('active');
                    });
                }

                item.classList.toggle('active', !isOpen);
            });
        });
    });
}