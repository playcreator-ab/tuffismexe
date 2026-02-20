// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and command groups
document.querySelectorAll('.feature-card, .command-group, .step, .tech-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Mobile menu toggle (if you add a hamburger menu later)
document.addEventListener('DOMContentLoaded', function() {
    // Add active state to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.style.opacity = '0.6';
            } else {
                link.style.opacity = '1';
            }
        });
    });
});

// Copy code to clipboard functionality (optional enhancement)
document.querySelectorAll('pre code').forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.innerText = 'Copy';
    button.style.cssText = `
        position: absolute;
        right: 10px;
        top: 10px;
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    pre.style.position = 'relative';
    pre.appendChild(button);
    
    pre.addEventListener('mouseenter', () => button.style.opacity = '1');
    pre.addEventListener('mouseleave', () => button.style.opacity = '0');
    
    button.addEventListener('click', () => {
        navigator.clipboard.writeText(codeBlock.innerText);
        button.innerText = 'Copied!';
        setTimeout(() => button.innerText = 'Copy', 2000);
    });
});
