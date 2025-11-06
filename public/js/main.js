// PraRoz - Professional Web Development Course Platform
// Main JavaScript Module

class PraRozApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.createParticleEffect();
        this.addStyles();
    }

    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', this.handleNavbarScroll);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll);
        });

        // Form handling
        this.setupFormHandlers();
        
        // Button interactions
        this.setupButtonHandlers();
        
        // Input effects
        this.setupInputEffects();
    }

    handleNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.background = window.scrollY > 50 
                ? 'rgba(26,26,46,0.98)' 
                : 'rgba(26,26,46,0.95)';
        }
    }

    handleSmoothScroll = (e) => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    setupFormHandlers() {
        // Login form
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin);
        }

        // Signup form
        const signupForm = document.querySelector('.signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', this.handleSignup);
        }

        // Form switching
        const signupLink = document.querySelector('.signup-link');
        const loginLink = document.querySelector('.login-link');
        
        if (signupLink) {
            signupLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchForms('.login-form-container', '.signup-form-container');
            });
        }
        
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchForms('.signup-form-container', '.login-form-container');
            });
        }
    }

    handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        
        if (this.validateEmail(email) && password.length >= 6) {
            this.showAlert('Login successful!', 'success');
            setTimeout(() => {
                this.hideElement('.login-form-container');
                this.showElement('.success-message-container');
            }, 1000);
        } else {
            this.showAlert('Please enter valid email and password (min 6 characters)', 'error');
        }
    }

    handleSignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const password = form.querySelector('input[type="password"]').value;
        
        if (name && this.validateEmail(email) && phone && password.length >= 6) {
            this.showAlert('Account created successfully! Please login.', 'success');
            setTimeout(() => {
                this.switchForms('.signup-form-container', '.login-form-container');
                form.reset();
            }, 1500);
        } else {
            this.showAlert('Please fill all fields correctly (password min 6 characters)', 'error');
        }
    }

    setupButtonHandlers() {
        // Explore courses button
        const exploreBtn = document.querySelector('.explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                window.location.href = 'service.html';
            });
        }

        // Join Us button
        const joinBtn = document.querySelector('.join-btn');
        if (joinBtn && !joinBtn.classList.contains('explore-btn')) {
            joinBtn.addEventListener('click', () => {
                this.hideElement('.login-form-container');
                this.showElement('.signup-form-container');
                this.showAlert('Please create an account to join us!', 'info');
            });
        }

        // Search functionality
        const searchBtn = document.querySelector('.search-btn');
        const searchInput = document.querySelector('.search-input');
        
        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', () => {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    this.showAlert(`Searching for: ${searchTerm}`, 'info');
                }
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') searchBtn.click();
            });
        }

        // Ripple effect for buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', this.createRippleEffect);
        });
    }

    setupInputEffects() {
        document.querySelectorAll('.login-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }

    initializeAnimations() {
        const observer = new IntersectionObserver((entries) => {
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

    createParticleEffect() {
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
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        }));
        
        const animateParticles = () => {
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
        };
        
        animateParticles();
    }

    createRippleEffect = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
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

    // Utility Methods
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showAlert(message, type = 'info') {
        const alertTypes = {
            error: 'danger',
            success: 'success',
            info: 'info'
        };

        const alert = document.createElement('div');
        alert.className = `alert alert-${alertTypes[type]} alert-dismissible fade show position-fixed`;
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
            <button type="button" class="btn-close btn-close-white" onclick="this.parentElement.remove()" style="filter: brightness(0) invert(1);"></button>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.animation = 'slideOutRight 0.5s cubic-bezier(0.4,0,0.2,1)';
                setTimeout(() => alert.remove(), 500);
            }
        }, 3000);
    }

    switchForms(hideSelector, showSelector) {
        const hideForm = document.querySelector(hideSelector);
        const showForm = document.querySelector(showSelector);
        
        if (hideForm && showForm) {
            hideForm.style.display = 'none';
            showForm.style.display = 'block';
        }
    }

    hideElement(selector) {
        const element = document.querySelector(selector);
        if (element) element.style.display = 'none';
    }

    showElement(selector) {
        const element = document.querySelector(selector);
        if (element) element.style.display = 'block';
    }

    addStyles() {
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
        `;
        document.head.appendChild(style);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PraRozApp();
});