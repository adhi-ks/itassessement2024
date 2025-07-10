
// Gallery JavaScript functionality

const galleryImages = [
    {
        src: "img/jimi.jpg",
        alt: "Electric guitars on a concert stage with dramatic red lighting",
        title: "Rock Concert Stage",
        description: "The powerful energy of rock music captured in electric guitars and stage lighting."
    },
    {
        src: "img/louis.jpg",
        alt: "Jazz instruments including saxophone and piano in a dimly lit club",
        title: "Jazz Club Atmosphere",
        description: "The intimate and sophisticated setting of a traditional jazz club."
    },
    {
        src: "img/daft.jpg",
        alt: "Electronic music studio with synthesizers and LED displays",
        title: "Electronic Music Studio",
        description: "Modern electronic music production with cutting-edge synthesizers and technology."
    },
    {
        src: "img/orc.jpg",
        alt: "Orchestra instruments in an elegant concert hall",
        title: "Classical Concert Hall",
        description: "The grandeur and elegance of a classical music performance venue."
    },
    {
        src: "img/bts.avif",
        alt: "Bright pop concert stage with colorful lights and microphone",
        title: "Pop Music Concert",
        description: "The vibrant and energetic atmosphere of a contemporary pop music show."
    },
    {
        src: "img/hip pio.jpg",
        alt: "Hip-hop studio with turntables and urban graffiti background",
        title: "Hip-Hop Studio",
        description: "The urban culture and artistic expression of hip-hop music creation."
    },
    {
        src: "img/country1.jpg",
        alt: "Country music instruments in a rustic barn setting",
        title: "Country Music Scene",
        description: "The authentic and rustic atmosphere of traditional country music."
    },
    {
        src: "img/bob.jpg.webp",
        alt: "Reggae music scene with tropical colors and relaxed beach atmosphere",
        title: "Reggae Island Vibes",
        description: "The laid-back Caribbean atmosphere that defines reggae music culture."
    }
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    if (galleryImages[index]) {
        lightboxImage.src = galleryImages[index].src;
        lightboxImage.alt = galleryImages[index].alt;
        lightboxTitle.textContent = galleryImages[index].title;
        lightboxDescription.textContent = galleryImages[index].description;
        lightboxCounter.textContent = `Image ${index + 1} of ${galleryImages.length}`;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    openLightbox(currentImageIndex);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        switch(event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - previous image
            navigateLightbox(-1);
        } else {
            // Swipe left - next image
            navigateLightbox(1);
        }
    }
}

// Make functions available globally
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
