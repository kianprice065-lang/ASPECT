// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');
const header = document.getElementById('header');

let isMenuOpen = false;

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
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
        mobileNav.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to match cards
const matchCards = document.querySelectorAll('.match-card');
matchCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add hover effects to team cards
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize entrance animations
    initializeAnimations();
    
    console.log('ASPECT Esports website loaded successfully!');
});

// Animation initialization function
function initializeAnimations() {
    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const socialLinks = document.querySelector('.social-links');
    
    // Animate hero elements
    setTimeout(() => {
        if (heroTitle) heroTitle.classList.add('animate-in');
    }, 100);
    
    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.classList.add('animate-in');
    }, 300);
    
    setTimeout(() => {
        if (socialLinks) socialLinks.classList.add('animate-in');
    }, 500);
    
    // Animate section elements with staggered delays
    animateElements('.partner-logo', 100);
    animateElements('.match-card', 150);
    animateElements('.team-card', 200);
    animateElements('.content-card', 150);
    animateElements('.news-card', 200);
    animateElements('.product-card', 150);
}

// Function to animate elements with staggered delays
function animateElements(selector, baseDelay = 100) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
        }, baseDelay * (index + 1));
    });
}

// Enhanced hover effects for product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Add a subtle animation feedback
            addToCartBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                addToCartBtn.style.transform = '';
            }, 150);
            
            // You can add actual cart functionality here
            console.log('Added to cart:', card.querySelector('.product-name').textContent);
        });
    }
});

// Enhanced hover effects for content and news cards
const interactiveCards = document.querySelectorAll('.content-card, .news-card');
interactiveCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add click animation
        card.style.transform = 'translateY(-2px) scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // You can add navigation functionality here
        console.log('Card clicked:', card.querySelector('h3').textContent);
    });
});