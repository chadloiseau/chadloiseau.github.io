// Hero Image Carousel
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel-images .hero-image');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentIndex = 0;
    let autoSlideInterval;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all images and dots
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current image and dot
        images[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
    }

    // Function to go to next slide
    function nextSlide() {
        let newIndex = (currentIndex + 1) % images.length;
        showSlide(newIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        let newIndex = (currentIndex - 1 + images.length) % images.length;
        showSlide(newIndex);
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Add swipe/click functionality to images
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carouselContainer = document.querySelector('.carousel-images');
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next image
            nextSlide();
            resetAutoSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous image
            prevSlide();
            resetAutoSlide();
        }
    }

    // Auto-advance slides every 4 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Start auto-slide on page load
    startAutoSlide();

    // Pause auto-slide when user hovers over carousel
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});
// Mobile Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const header = document.querySelector('header');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        header.classList.toggle('nav-open');
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
        });
    });
}
