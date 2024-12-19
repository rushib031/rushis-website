document.addEventListener('DOMContentLoaded', () => {
    // General scroll-triggered animations
    const animatedElements = document.querySelectorAll('[data-animate]');

    const handleAnimation = (element) => {
        element.classList.add('animated'); // Add animation class
    };

    const observerGeneral = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                handleAnimation(element);
                observer.unobserve(element); // Stop observing
            }
        });
    }, { threshold: 0.5 }); // Trigger animation when 50% of the element is visible

    // Attach observer to all animated elements
    animatedElements.forEach((element) => {
        observerGeneral.observe(element);
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

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-bar');

    const animateProgressBar = (bar) => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--progress', `${level}%`); // Update progress dynamically
        bar.classList.add('animate');
    };

    const progressBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                animateProgressBar(bar);
                observer.unobserve(bar); // Stop observing once animation is complete
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is in view

    // Attach observer to all progress bars
    progressBars.forEach((bar) => {
        progressBarObserver.observe(bar);
    });

    // Carousel logic
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    setInterval(() => {
        carouselItems.forEach((item, index) => {
            const offset = (index - currentIndex) * 100; // Use percentage for responsive behavior
            item.style.transform = `translateX(${offset}%)`;
        });
        currentIndex = (currentIndex + 1) % carouselItems.length;
    }, 3000);

    // Contact form submission
    const contactForm = document.querySelector('#contact-form');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const handleAnimation = (element) => {
        element.classList.add('animated');
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                handleAnimation(entry.target);
                observer.unobserve(entry.target); // Comment this for repeated animations
            }
        });
    }, { threshold: 0.5 });

    animatedElements.forEach((element) => {
        observer.observe(element);
    });

    // Progress bars
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach((bar) => {
        bar.style.setProperty('--progress', `${bar.getAttribute('data-level')}%`);
        observer.observe(bar);
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
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
    });
});
