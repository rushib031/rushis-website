document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero animations and scroll-triggered animations
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated', 'active');
            } else {
                entry.target.classList.remove('active'); // Reset when out of view
            }
        });
    }, { threshold: 0.3 });

    animatedElements.forEach((element) => {
        observer.observe(element);
    });

    // Enhanced hero animations
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

    // Animate navigation and social icons
    anime({
        targets: '.nav-links li',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(100),
    });

    anime({
        targets: '.social-icons a',
        opacity: [0, 1],
        scale: [0, 1],
        duration: 600,
        easing: 'easeOutBack',
        delay: anime.stagger(100, { startDelay: 1200 }),
    });

    // Add floating animation to timeline dots
    anime({
        targets: '.timeline-event::before',
        scale: [1, 1.2, 1],
        easing: 'easeInOutSine',
        duration: 2000,
        loop: true,
        delay: anime.stagger(500),
    });

    // Add sliding animation to timeline content
    anime({
        targets: '.timeline-content',
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(200),
    });

    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.carousel-item');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const skills = [
        [{ name: 'Python', level: 60 }, { name: 'C', level: 50 }, { name: 'Java', level: 70 }],
        [{ name: 'JavaScript', level: 50 }, { name: 'HTML/CSS', level: 90 }, { name: 'SQL', level: 60 }],
        [{ name: 'Node.js', level: 40 }, { name: 'Assembly', level: 50 }, { name: 'Linux', level: 70 }]
    ];

    const skillsSection = document.querySelector('#skills');

    skills.forEach((row, rowIndex) => {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('skills-row');
        rowContainer.style.marginBottom = '2rem';

        row.forEach(skill => {
            const skillContainer = document.createElement('div');
            skillContainer.classList.add('skill');

            const skillName = document.createElement('span');
            skillName.textContent = skill.name;

            const progressBarContainer = document.createElement('div');
            progressBarContainer.classList.add('progress-bar-container');

            const progressBar = document.createElement('div');
            progressBar.classList.add('progress-bar');
            progressBar.dataset.level = skill.level;

            const skillLevel = document.createElement('small');
            skillLevel.textContent =
                skill.level >= 90 ? 'Expert' :
                skill.level >= 60 ? 'Advanced' :
                skill.level >= 30 ? 'Intermediate' : 'Beginner';

            progressBarContainer.appendChild(progressBar);
            skillContainer.append(skillName, progressBarContainer, skillLevel);
            rowContainer.appendChild(skillContainer);
        });

        skillsSection.appendChild(rowContainer);
    });

    // Enhanced Intersection Observer for animating progress bars
    const progressBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.getAttribute('data-level');
                
                // Animate the progress bar with a bounce effect
                anime({
                    targets: progressBar,
                    width: `${level}%`,
                    duration: 1500,
                    easing: 'easeOutElastic(1, 0.8)',
                    delay: 200
                });
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach((bar) => observer.observe(bar));
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = Array.from(carousel.children);
    const spacing = 40; // Space between items
    const itemWidth = items[0].offsetWidth + spacing;
    const totalItems = items.length;
    const visibleCount = Math.ceil(window.innerWidth / itemWidth) + 1; // Ensure seamless looping
  
    // Clone items dynamically for looping
    const totalClones = visibleCount; // Number of clones to make for smooth looping
    for (let i = 0; i < totalClones; i++) {
      const clone = items[i % totalItems].cloneNode(true);
      carousel.appendChild(clone);
    }
  
    // Initial position of items
    let offset = 0;

    let isPaused = false;
    carousel.addEventListener('mouseenter', () => { isPaused = true; });
    carousel.addEventListener('mouseleave', () => { isPaused = false; });
  
    function animateCarousel() {
      // Move the carousel to the left
        if(!isPaused){
            offset -= 1.5; // Speed of animation
    
            // Reset offset when an item exits completely
            if (offset <= -itemWidth) {
                offset += itemWidth;
                // Move the first item to the end of the logical queue
                const firstItem = carousel.firstElementChild;
                carousel.appendChild(firstItem);
            }
        
            // Apply the offset as a transform
            carousel.style.transform = `translateX(${offset}px)`;
        }
        requestAnimationFrame(animateCarousel);
    }
    animateCarousel();
});
  
// Enhanced basketball animation
anime({
    targets: '#basketball',
    translateX: [
        { value: '80vw', duration: 2000, easing: 'easeInOutQuad' },
    ],
    translateY: [
        { value: '-60vh', duration: 1000, easing: 'easeOutQuad' },
        { value: '0', duration: 1000, easing: 'easeInQuad' },
    ],
    rotate: [
        { value: '360deg', duration: 2000, easing: 'linear' }
    ],
    loop: true,
    delay: 1000, // Pause between loops
});

// Add subtle floating animation to the hoop
anime({
    targets: '#hoop',
    translateY: [
        { value: '-10px', duration: 2000, easing: 'easeInOutSine' },
        { value: '0px', duration: 2000, easing: 'easeInOutSine' }
    ],
    loop: true,
});

// Add form interaction enhancements
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Add character count for textarea
        if (input.tagName === 'TEXTAREA') {
            input.addEventListener('input', () => {
                const maxLength = 500;
                const currentLength = input.value.length;
                const remaining = maxLength - currentLength;
                
                // Update character count if it doesn't exist
                let charCount = input.parentElement.querySelector('.char-count');
                if (!charCount) {
                    charCount = document.createElement('small');
                    charCount.className = 'char-count';
                    charCount.style.cssText = 'color: #718096; font-size: 0.8rem; text-align: right; display: block; margin-top: 0.5rem;';
                    input.parentElement.appendChild(charCount);
                }
                
                charCount.textContent = `${currentLength}/${maxLength} characters`;
                
                if (currentLength > maxLength * 0.9) {
                    charCount.style.color = '#ef4444';
                } else {
                    charCount.style.color = '#718096';
                }
            });
        }
    });
    
    // Add form submission animation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        
        // Animate button
        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                button.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
});

// Add scroll-triggered animations for sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate section numbers
                const sectionNumber = entry.target.querySelector('.section-number');
                if (sectionNumber) {
                    anime({
                        targets: sectionNumber,
                        scale: [0, 1],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutBack'
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Parallax effect for floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add cursor trail effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
});
  
  
  
  
  