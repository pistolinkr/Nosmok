// ===== NOSMOK WEB APP JAVASCRIPT =====
// Main functionality for the anti-smoking promotion website

// ===== THEME MANAGEMENT =====
let currentTheme = 'auto'; // 'auto', 'light', 'dark'

// Initialize theme system
function initThemeSystem() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('nosmok-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        applyTheme(savedTheme);
    } else {
        // Auto-detect system theme
        detectSystemTheme();
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
}

// Detect system theme
function detectSystemTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = 'auto';
    applyTheme('auto');
}

// Handle system theme change
function handleSystemThemeChange(e) {
    if (currentTheme === 'auto') {
        applyTheme('auto');
    }
}

// Apply theme
function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
        currentTheme = 'light';
    } else if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        currentTheme = 'dark';
    } else {
        // Auto mode - remove data-theme attribute to use CSS media queries
        root.removeAttribute('data-theme');
        currentTheme = 'auto';
    }
    
    // Save preference
    localStorage.setItem('nosmok-theme', currentTheme);
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme system first
    initThemeSystem();
    
    // Initialize all components
    initTypingAnimation();
    initMobileNavigation();
    initStatisticsCounter();
    initPopupModal();
    initResearchModal();
    initBackToTop();
    initSmoothScrolling();
    initFormHandling();
    
    console.log('NOSMOK Web App initialized successfully!');
});



// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const phrases = [
        '건강한 삶을 시작하세요',
        '미래를 바꿔보세요',
        '자유를 찾아보세요',
        '행복을 되찾으세요'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting effect
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing effect
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Set typing speed
        let typeSpeed = isDeleting ? 100 : 150;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start the typing animation
    typeWriter();
}

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
}

// ===== STATISTICS COUNTER ANIMATION =====
function initStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat__number');
    
    if (statNumbers.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-target'));
                animateCounter(target, targetNumber);
                observer.unobserve(target); // Only animate once
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format large numbers with commas
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// ===== RESEARCH MODAL =====
function initResearchModal() {
    const researchItems = document.querySelectorAll('.research-item');
    const researchModal = document.getElementById('research-modal');
    const researchContent = document.getElementById('research-content');
    const researchClose = document.getElementById('research-close');
    
    if (!researchModal || !researchContent || !researchClose) return;
    
    researchItems.forEach(item => {
        item.addEventListener('click', function() {
            const dataType = this.getAttribute('data-type');
            const dataUrl = this.getAttribute('data-url');
            
            if (dataType === 'real' && dataUrl) {
                // 실제 URL이 있는 경우 새 창에서 열기
                window.open(dataUrl, '_blank');
            } else {
                // 가짜 자료인 경우 모달 표시 (이제는 사용되지 않음)
                showResearchModal(this.textContent);
            }
        });
    });
    
    // 모달 닫기
    researchClose.addEventListener('click', function() {
        researchModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 모달 외부 클릭 시 닫기
    researchModal.addEventListener('click', function(e) {
        if (e.target === researchModal) {
            researchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function showResearchModal(title) {
    const researchModal = document.getElementById('research-modal');
    const researchContent = document.getElementById('research-content');
    
    if (!researchModal || !researchContent) return;
    
    researchContent.innerHTML = `
        <h2>${title}</h2>
        <div class="research-meta">
            <p><strong>참고:</strong> 이 자료는 실제 존재하지 않는 가상의 연구입니다.</p>
            <p><strong>권장사항:</strong> 실제 의학 연구 자료는 위의 "바로가기" 링크를 통해 확인하시기 바랍니다.</p>
        </div>
        <div class="research-content">
            <h3>중요 안내</h3>
            <p>본 웹사이트는 이제 모든 가짜 자료를 제거하고 실제 존재하는 공식 기관의 연구 자료만을 제공합니다.</p>
            <p>각 자료의 상세 내용은 해당 기관의 공식 웹사이트에서 확인하실 수 있습니다.</p>
        </div>
    `;
    
    researchModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ===== POPUP MODAL (사이트 방문시 한 번만 표시) =====
function initPopupModal() {
    const popup = document.getElementById('popup-modal');
    if (!popup) return;
    
    // 이미 팝업을 본 적이 있는지 확인
    const hasSeenPopup = localStorage.getItem('nosmok_popup_shown');
    
    if (!hasSeenPopup) {
        // 30초 후 팝업 표시 (한 번만)
        setTimeout(() => {
            showPopup();
            // 팝업을 봤다고 표시
            localStorage.setItem('nosmok_popup_shown', 'true');
        }, 30000);
    }
}

function showPopup() {
    const popup = document.getElementById('popup-modal');
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closePopup() {
    const popup = document.getElementById('popup-modal');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

function scrollToTop() {
    smoothScrollTo(0, 1200); // 1.2초로 적당한 스크롤 속도
}

// 커스텀 부드러운 스크롤 함수 (속도 조절 가능)
function smoothScrollTo(targetPosition, duration = 1200) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // 이징 함수 (부드러운 감속)
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                smoothScrollTo(targetPosition, 1200); // 1.2초로 적당한 스크롤 속도
            }
        });
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const contactForm = document.querySelector('.contact__form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('모든 필드를 입력해주세요.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('메시지를 전송하고 있습니다...', 'info');
        
        setTimeout(() => {
            showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
            this.reset();
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        smoothScrollTo(targetPosition, 1200); // 1.2초로 적당한 스크롤 속도
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
    // Header color change removed - always transparent
}, 100));

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close popup or research modal
    if (e.key === 'Escape') {
        const popup = document.getElementById('popup-modal');
        const researchModal = document.getElementById('research-modal');
        
        if (popup && popup.style.display === 'flex') {
            closePopup();
        } else if (researchModal && researchModal.style.display === 'flex') {
            // The new showResearchModal function no longer closes the modal,
            // so we need to handle its closing here.
            // For now, we'll just close it if it's open.
            researchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Enter key for form submission
    if (e.key === 'Enter' && e.target.tagName === 'TEXTAREA') {
        if (e.ctrlKey) {
            e.target.closest('form').dispatchEvent(new Event('submit'));
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting logic here
});

// ===== ANALYTICS & TRACKING =====
function trackEvent(eventName, eventData = {}) {
    // Track user interactions for analytics
    console.log('Event tracked:', eventName, eventData);
    
    // You can integrate with Google Analytics or other tracking services here
    // gtag('event', eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_class: e.target.className
        });
    }
    
    if (e.target.matches('.nav__link')) {
        trackEvent('navigation_click', {
            link_text: e.target.textContent.trim(),
            link_href: e.target.getAttribute('href')
        });
    }
});

// ===== LAZY LOADING ENHANCEMENT =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// ===== SERVICE WORKER REGISTRATION (PWA SUPPORT) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.NOSMOK = {
    scrollToSection,
    scrollToTop,
    closePopup,
    showNotification,
    trackEvent
};
