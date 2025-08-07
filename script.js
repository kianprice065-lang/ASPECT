// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');
const header = document.getElementById('header');

let isMenuOpen = false;

// Toggle mobile menu
mobileMenuBtn?.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileNav.classList.add('active');
        menuIcon.className = 'fas fa-times';
    } else {
        mobileNav.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
    }
});

// Close mobile menu when clicking on nav links
const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileNav?.classList.remove('active');
        if (menuIcon) menuIcon.className = 'fas fa-bars';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
const allNavLinks = document.querySelectorAll('a[href^="#"]');
allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header?.offsetHeight || 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Framer-style Animation System
class FramerAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        
        this.init();
    }
    
    init() {
        // Initialize page load animations
        this.initPageLoadAnimations();
        
        // Setup intersection observer for scroll-triggered animations
        this.setupScrollAnimations();
        
        // Setup interactive animations
        this.setupInteractiveAnimations();
        
        // Setup category filtering
        this.setupCategoryFiltering();
        
        // Setup shopping cart
        this.setupShoppingCart();
    }
    
    initPageLoadAnimations() {
        // Animate hero elements on page load
        setTimeout(() => this.animateElement('.hero-badge', 'animate-fade-in-up'), 100);
        setTimeout(() => this.animateElement('.hero-title', 'animate-fade-in-up'), 200);
        setTimeout(() => this.animateElement('.hero-subtitle', 'animate-fade-in-up'), 300);
        setTimeout(() => this.animateElement('.hero-actions', 'animate-fade-in-up'), 400);
        setTimeout(() => this.animateElement('.social-links', 'animate-fade-in-up'), 500);
        
        // Animate floating elements
        setTimeout(() => {
            const floatingElements = document.querySelectorAll('.floating-icon');
            floatingElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 1000);
    }
    
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(`
            .about-text, .about-visual, .section-header,
            .match-card, .partner-card, .team-card,
            .content-card, .news-card, .product-card,
            .stat-card, .feature-item, .benefit-card
        `);
        
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add staggered animation delay for grid items
                if (element.matches('.match-card, .partner-card, .team-card, .content-card, .news-card, .product-card, .stat-card, .benefit-card')) {
                    const siblings = Array.from(element.parentElement.children);
                    const index = siblings.indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                }
                
                element.classList.add('animate-fade-in-up');
                this.observer.unobserve(element);
            }
        });
    }
    
    setupInteractiveAnimations() {
        // Enhanced hover effects for cards
        this.setupCardHoverEffects();
        
        // Button hover effects
        this.setupButtonHoverEffects();
        
        // Image hover effects
        this.setupImageHoverEffects();
    }
    
    setupCardHoverEffects() {
        const cards = document.querySelectorAll(`
            .match-card, .partner-card, .team-card,
            .content-card, .news-card, .product-card,
            .stat-card, .benefit-card
        `);
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll(`
            .cta-primary, .cta-secondary, .social-btn,
            .add-to-cart-btn, .read-more-btn, .watch-btn,
            .newsletter-btn, .checkout-btn
        `);
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
                button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
            
            // Click animation
            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(-1px) scale(0.98)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });
        });
    }
    
    setupImageHoverEffects() {
        const imageContainers = document.querySelectorAll(`
            .team-image, .content-image, .news-image,
            .product-image, .partner-logo, .about-image
        `);
        
        imageContainers.forEach(container => {
            const img = container.querySelector('img');
            if (img) {
                container.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.1)';
                    img.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                });
                
                container.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                });
            }
        });
    }
    
    setupCategoryFiltering() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const filterableItems = document.querySelectorAll('[data-category]');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                // Update active tab
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items with animation
                filterableItems.forEach((item, index) => {
                    const itemCategory = item.getAttribute('data-category');
                    const shouldShow = category === 'all' || itemCategory === category;
                    
                    if (shouldShow) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px) scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    setupShoppingCart() {
        const cartBtn = document.querySelector('.cart-btn');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        const closeCartBtn = document.getElementById('closeCart');
        const cartCount = document.querySelector('.cart-count');
        
        let cartItems = 0;
        
        // Open cart
        cartBtn?.addEventListener('click', () => {
            cartSidebar?.classList.add('open');
            cartOverlay?.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // Close cart
        const closeCart = () => {
            cartSidebar?.classList.remove('open');
            cartOverlay?.classList.remove('show');
            document.body.style.overflow = '';
        };
        
        closeCartBtn?.addEventListener('click', closeCart);
        cartOverlay?.addEventListener('click', closeCart);
        
        // Add to cart functionality
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Animate button
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
                
                // Update cart count
                cartItems++;
                if (cartCount) {
                    cartCount.textContent = cartItems;
                    cartCount.classList.add('show');
                }
                
                // Show success animation
                this.showCartAddedAnimation(button);
            });
        });
        
        // Size selector
        const sizeButtons = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
        
        // Quantity controls
        const qtyMinusBtn = document.querySelector('.qty-btn.minus');
        const qtyPlusBtn = document.querySelector('.qty-btn.plus');
        const qtyValue = document.querySelector('.qty-value');
        
        qtyMinusBtn?.addEventListener('click', () => {
            let qty = parseInt(qtyValue.textContent);
            if (qty > 1) {
                qtyValue.textContent = qty - 1;
            }
        });
        
        qtyPlusBtn?.addEventListener('click', () => {
            let qty = parseInt(qtyValue.textContent);
            qtyValue.textContent = qty + 1;
        });
    }
    
    showCartAddedAnimation(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> ADDED!';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }
    
    animateElement(selector, animationClass) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add(animationClass);
        }
    }
}

// Content filtering and interaction
function setupContentInteractions() {
    // Video play buttons
    const playButtons = document.querySelectorAll('.play-btn, .play-btn-small');
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Simulate video play
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1.1)';
            }, 150);
            
            console.log('Playing video...');
        });
    });
    
    // Newsletter signup
    const newsletterForm = document.querySelector('.input-group');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    newsletterBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const email = newsletterInput?.value;
        
        if (email && email.includes('@')) {
            newsletterBtn.innerHTML = '<i class="fas fa-check"></i> SUBSCRIBED!';
            newsletterBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            newsletterInput.value = '';
            
            setTimeout(() => {
                newsletterBtn.innerHTML = 'SUBSCRIBE <i class="fas fa-arrow-right"></i>';
                newsletterBtn.style.background = '';
            }, 3000);
        } else {
            newsletterInput?.focus();
            newsletterInput?.classList.add('error');
            setTimeout(() => {
                newsletterInput?.classList.remove('error');
            }, 2000);
        }
    });
    
    // Breaking news banner
    const breakingBtn = document.querySelector('.breaking-btn');
    breakingBtn?.addEventListener('click', () => {
        console.log('Opening breaking news article...');
    });
}

// Enhanced scroll effects
function setupScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background elements
        const bgElements = document.querySelectorAll('.bg-element');
        bgElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.floating-icon');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Page-specific functionality
function setupPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'shop.html':
            setupProductInteractions();
            break;
        case 'content.html':
            setupContentPageFeatures();
            break;
        case 'news.html':
            setupNewsPageFeatures();
            break;
        default:
            break;
    }
}

function setupProductInteractions() {
    // Product image thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            
            if (mainImage) {
                mainImage.src = thumbnail.src;
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 150);
            }
        });
    });
    
    // Wishlist functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                btn.style.color = '#ef4444';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                btn.style.color = '';
            }
        });
    });
}

function setupContentPageFeatures() {
    // Content type filtering
    const contentCards = document.querySelectorAll('.content-card');
    
    contentCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.content-title')?.textContent;
            console.log(`Opening content: ${title}`);
        });
    });
}

function setupNewsPageFeatures() {
    // News article interactions
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.news-title')?.textContent;
            console.log(`Opening article: ${title}`);
        });
    });
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalImages = [
        'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=400'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Framer-style animations
    new FramerAnimations();
    
    // Setup additional interactions
    setupContentInteractions();
    
    // Setup scroll effects
    setupScrollEffects();
    
    // Setup page-specific features
    setupPageSpecificFeatures();
    
    // Optimize performance
    optimizePerformance();
    
    console.log('🎮 ASPECT Esports website loaded with Framer-style animations!');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});