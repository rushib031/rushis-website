document.addEventListener('DOMContentLoaded', () => {
    // General scroll-triggered animations
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated', 'active');
            } else {
                entry.target.classList.remove('active'); // Reset when out of view
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    animatedElements.forEach((element) => {
        observer.observe(element);
    });

    // Hero animations
    anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1500,
        easing: 'easeOutElastic(1, 0.8)',
        delay: 500,
    });

    anime({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateX: [-100, 0],
        duration: 2000,
        easing: 'easeOutElastic(1, 0.8)',
        delay: 800,
    });

    // Carousel logic
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    setInterval(() => {
        carouselItems.forEach((item, index) => {
            item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });
        currentIndex = (currentIndex + 1) % carouselItems.length;
    }, 3000);

    // Contact form
    const contactForm = document.querySelector('#contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
    });

    anime({
        targets: '.timeline-dot',
        scale: [1, 1.2, 1],
        easing: 'easeInOutSine',
        duration: 1000,
        loop: true,
    });

    // Add sliding animation to timeline content
    anime({
        targets: '.timeline-content',
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(1000), // Delays each content animation sequentially
        loop: false,
        direction: 'alternate',
    });
});
