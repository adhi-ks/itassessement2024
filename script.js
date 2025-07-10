// Main JavaScript file for MusicExplorer website

// Mobile Navigation Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav.classList.contains('show')) {
        mobileNav.classList.remove('show');
        mobileNav.style.display = 'none';
        menuBtn.classList.remove('active');
    } else {
        mobileNav.classList.add('show');
        mobileNav.style.display = 'flex';
        menuBtn.classList.add('active');
    }
}

// Image Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto-advance slider
function autoAdvanceSlider() {
    if (slides.length > 1) {
        setInterval(() => {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    
    // Initialize slider if slides exist
    if (slides.length > 0) {
        showSlide(0);
        autoAdvanceSlider();
    }
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileNav = document.getElementById('mobileNav');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileNav && mobileNav.classList.contains('show')) {
            if (!mobileNav.contains(event.target) && !menuBtn.contains(event.target)) {
                toggleMobileMenu();
            }
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
});

// Utility function to add fade-in animation to elements
function addFadeInAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll('.music-card, .genre-card, .about-card, .contact-card, .gallery-item, .team-member, .value-card');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Call fade-in animation after DOM load
document.addEventListener('DOMContentLoaded', addFadeInAnimation);

// Export functions for use in other files
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.toggleMobileMenu = toggleMobileMenu;