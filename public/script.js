document.addEventListener('DOMContentLoaded', () => {
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
    }, { threshold: 1.0 });

    animatedElements.forEach((element) => {
        observer.observe(element);
    });

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

    // Intersection Observer for animating progress bars
    const progressBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.getAttribute('data-level');
                progressBar.style.width = `${level}%`;
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach((bar) => observer.observe(bar));
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = Array.from(carousel.children);
    const spacing = 70; // Space between items
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
  
    function animateCarousel() {
      // Move the carousel to the left
      offset -= 1.2; // Speed of animation
  
      // Reset offset when an item exits completely
      if (offset <= -itemWidth) {
        offset += itemWidth;
        // Move the first item to the end of the logical queue
        const firstItem = carousel.firstElementChild;
        carousel.appendChild(firstItem);
      }
  
      // Apply the offset as a transform
      carousel.style.transform = `translateX(${offset}px)`;
  
      requestAnimationFrame(animateCarousel);
    }
  
    animateCarousel();
  });
  
  
  
  
  
  