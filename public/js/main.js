document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    createParticleEffect();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.style.background = window.scrollY > 50 ? 'rgba(26,26,46,0.98)' : 'rgba(26,26,46,0.95)';
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Login form validation
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (validateEmail(email) && password.length >= 6) {
                showAlert('Login successful!', 'success');
                setTimeout(() => {
                    document.querySelector('.login-form-container').style.display = 'none';
                    document.querySelector('.success-message-container').style.display = 'block';
                }, 1000);
            } else {
                showAlert('Please enter valid email and password (min 6 characters)', 'error');
            }
        });
    }
    
    // Signup form validation
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (name && validateEmail(email) && phone && password.length >= 6) {
                showAlert('Account created successfully! Please login.', 'success');
                setTimeout(() => {
                    document.querySelector('.signup-form-container').style.display = 'none';
                    document.querySelector('.login-form-container').style.display = 'block';
                    signupForm.reset();
                }, 1500);
            } else {
                showAlert('Please fill all fields correctly (password min 6 characters)', 'error');
            }
        });
    }
    
    // Form switching with smooth animations
    const signupLink = document.querySelector('.signup-link');
    const loginLink = document.querySelector('.login-link');
    
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchForms('.login-form-container', '.signup-form-container');
        });
    }
    
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchForms('.signup-form-container', '.login-form-container');
        });
    }
    
    // Explore courses button
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => window.location.href = 'service.html');
    }

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) showAlert(`Searching for: ${searchTerm}`, 'info');
        });

        searchInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') searchBtn.click();
        });
    }

    // Join Us button
    const joinBtn = document.querySelector('.join-btn');
    if (joinBtn && !joinBtn.classList.contains('explore-btn')) {
        joinBtn.addEventListener('click', () => {
            document.querySelector('.login-form-container').style.display = 'none';
            document.querySelector('.signup-form-container').style.display = 'block';
            showAlert('Please create an account to join us!', 'info');
        });
    }

    // Social media links
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split('-')[1];
            showAlert(`Opening ${platform} page...`, 'info');
        });
    });

    // Input hover effects
    document.querySelectorAll('.login-input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Ripple effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        if (parallax) parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    });


});

// Animation functions
function initializeAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.hero-content, .login-form-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
        observer.observe(el);
    });
}

function createParticleEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '1',
        opacity: '0.6'
    });
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,107,53,${particle.opacity})`;
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Utility functions
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    alert.style.cssText = `
        top: 100px; 
        right: 20px; 
        z-index: 9999; 
        min-width: 320px;
        backdrop-filter: blur(10px);
        background: rgba(0,0,0,0.8) !important;
        border: 1px solid rgba(255,107,53,0.3);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        animation: slideInRight 0.5s cubic-bezier(0.4,0,0.2,1);
    `;
    alert.innerHTML = `
        <div style="color: white; font-weight: 500;">${message}</div>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" style="filter: brightness(0) invert(1);"></button>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOutRight 0.5s cubic-bezier(0.4,0,0.2,1)';
            setTimeout(() => alert.remove(), 500);
        }
    }, 3000);
}

// Navbar active link management
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentHash = window.location.hash || '#home';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();
window.addEventListener('hashchange', setActiveNavLink);

// Form switching animation function
function switchForms(hideSelector, showSelector) {
    const hideForm = document.querySelector(hideSelector);
    const showForm = document.querySelector(showSelector);
    
    if (hideForm && showForm) {
        // Add slide out animation
        hideForm.style.transform = 'translateX(-20px)';
        hideForm.style.opacity = '0';
        hideForm.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
        
        setTimeout(() => {
            hideForm.style.display = 'none';
            showForm.style.display = 'block';
            showForm.style.transform = 'translateX(20px)';
            showForm.style.opacity = '0';
            
            // Trigger reflow
            showForm.offsetHeight;
            
            // Add slide in animation
            showForm.style.transform = 'translateX(0)';
            showForm.style.opacity = '1';
            showForm.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
        }, 300);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes formSlideIn {
        from { transform: translateX(20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes formSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-20px); opacity: 0; }
    }
    .login-form-container, .signup-form-container {
        animation: formSlideIn 0.5s cubic-bezier(0.4,0,0.2,1);
    }
`;
document.head.appendChild(style);