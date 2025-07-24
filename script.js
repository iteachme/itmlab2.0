// Direct Language Switch Implementation - REMOVED (replaced with new function below)

// ============================================ //
//              CYBER HACKATHON JS              //
// ============================================ //

class CyberHackathon {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isMobile = window.innerWidth < 1024;
        this.animationFrameId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAnimationLoop();
        this.ensureClickability();
    }

    ensureClickability() {
        // Make sure all buttons and interactive elements are clickable
        const interactiveElements = document.querySelectorAll(`
            button, 
            .cyber-button, 
            .video-btn, 
            .card-button, 
            [role="button"],
            a,
            input,
            select,
            textarea,
            [tabindex="0"]
        `);

        interactiveElements.forEach(element => {
            element.style.pointerEvents = 'auto';
            element.style.cursor = 'pointer';
            element.style.zIndex = '1';
            
            // Remove any potential blocking overlays
            const parent = element.parentElement;
            if (parent && window.getComputedStyle(parent).position === 'relative') {
                parent.style.zIndex = '1';
            }
        });

        // Disable custom cursor on mobile
        if (this.isMobile) {
            document.body.style.cursor = 'auto';
            const customCursor = document.querySelector('.custom-cursor');
            if (customCursor) {
                customCursor.style.display = 'none';
            }
        }

        // Модальные окна обрабатываются в modal-flow.js

        // Disable pointer events for decorative elements
        const decorativeElements = document.querySelectorAll('.matrix-bg, .particles, .floating-code, .floating-elements, .cyber-grid');
        decorativeElements.forEach(element => {
            element.style.pointerEvents = 'none';
            element.style.zIndex = '-1';
        });
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        window.addEventListener('load', () => this.onWindowLoad());
        window.addEventListener('resize', this.debounce(() => this.onResize(), 250));
        window.addEventListener('scroll', this.throttle(() => this.onScroll(), 16));
    }

    onDOMReady() {
        console.log('%c🚀 ITM Lab Cyber Hackathon Loaded!', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
        this.hideLoadingScreen();
        this.initParticles();
        this.initMatrixEffect();
        this.initTypingEffects();
        this.initScrollAnimations();
        this.initCounters();
        this.initGlitchEffects();
        this.init3DCards();
        this.initSmoothScrolling();
        this.initSplashTyping();
    }

    onWindowLoad() {
        document.body.style.opacity = '1';
        this.performanceOptimizations();
    }

    onResize() {
        this.isMobile = window.innerWidth < 1024;
        if (this.particleSystem) {
            this.particleSystem.handleResize();
        }
    }

    onScroll() {
        this.updateHeaderOnScroll();
        this.updateScrollAnimations();
        this.updateParallax();
    }

    // ============================================ //
    //              UTILITY FUNCTIONS               //
    // ============================================ //

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    // ============================================ //
    //                LOADING SCREEN                //
    // ============================================ //

    hideLoadingScreen() {
        const loading = document.querySelector('.loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hidden');
                setTimeout(() => loading.remove(), 500);
            }, 1000);
        }
    }

    // ============================================ //
    //              PARTICLE SYSTEM                 //
    // ============================================ //

    initParticles() {
        if (this.isReducedMotion) return;

        this.particleSystem = new ParticleSystem();
    }

    // ============================================ //
    //               MATRIX EFFECT                  //
    // ============================================ //

    initMatrixEffect() {
        if (this.isReducedMotion || this.isMobile) return;

        this.matrixEffect = new MatrixRain();
    }

    // ============================================ //
    //              TYPING EFFECTS                  //
    // ============================================ //

    initTypingEffects() {
        const typingElements = document.querySelectorAll('.typing-effect');
        const splashPhrases = [
            '// Инновации в образовании', // первая фраза всегда
            '// Hello, World!',
            '// Hack the planet!',
            '// Сломай систему — почини мир',
            '// rm -rf / — не пробуй это дома',
            '// 42 — ответ на всё',
            '// sudo make me a sandwich',
            '// AI is the new electricity',
            '// Пиши код — не баги',
            '// Easter egg inside!',
            '// Сначала работает у меня...',
            '// IT’s not a bug, it’s a feature!',
            '// May the source be with you',
            '// Stack Overflow спасёт',
            '// Спроси у ChatGPT',
            '// Ctrl+C, Ctrl+V — путь к успеху',
            '// Coffee > sleep',
            '// 01001000 01101001',
            '// Пиши тесты! (шутка)',
            '// Hackathon mode: ON',
            '// Секретная пасхалка найдена',
            '// Сломал? Перезагрузи!',
            '// ITMLab — твой портал в будущее',
            '// Не забудь сделать commit',
            '// Сохранился? Молодец!',
            '// Сначала гугли, потом спрашивай',
            '// Котики одобряют твой код',
            '// 127.0.0.1 — мой дом',
            '// Спроси у майнкрафтера',
            '// Сборка... сборка... сборка...',
            '// Пиши код, а не отмазки',
            '// Пора на кофе-брейк',
            '// Сломал прод? Бывает!',
            '// ITMLab: Hack the Future!',
            '// print("Привет, мир!")',
            '// #TODO: выиграть грант',
            '// Секретная фраза №' + Math.floor(Math.random()*1000),
        ];
        let splashIndex = 0;
        let firstTime = true;

        typingElements.forEach((element) => {
            const typeSplash = (text) => {
                let i = 0;
                element.textContent = '';
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.textContent = '|';
                element.appendChild(cursor);
                const typeNext = () => {
                    if (i < text.length && cursor && cursor.parentNode === element) {
                        element.insertBefore(document.createTextNode(text[i]), cursor);
                        i++;
                        setTimeout(typeNext, 60 + Math.random()*40);
                    } else if (cursor && cursor.parentNode === element) {
                        cursor.classList.add('blink');
                    }
                };
                typeNext();
            };

            // Первая фраза всегда оригинальная
            typeSplash(splashPhrases[0]);
            splashIndex = 1;

            setTimeout(function nextSplash() {
                let phrase;
                if (firstTime) {
                    firstTime = false;
                    phrase = splashPhrases[0];
                } else {
                    phrase = splashPhrases[Math.floor(Math.random() * (splashPhrases.length - 1)) + 1];
                }
                typeSplash(phrase);
                setTimeout(nextSplash, 5000 + Math.random()*5000);
            }, 7000);
        });

        // Terminal typing effect
        this.initTerminalTyping();
    }

    typeText(element, text) {
        element.textContent = '';
        element.style.width = '0';
        
        let index = 0;
        const speed = 100;
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                element.style.width = 'auto';
            }
        }, speed);
    }

    initTerminalTyping() {
        const terminalCommand = document.querySelector('.typing-terminal');
        if (!terminalCommand) return;

        const text = terminalCommand.textContent;
        terminalCommand.textContent = '';
        
        setTimeout(() => {
            this.typeText(terminalCommand, text);
        }, 3000);
    }

    // ============================================ //
    //            SCROLL ANIMATIONS                 //
    // ============================================ //

    initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            this.observeElements();
        } else {
            // Fallback for older browsers
            document.querySelectorAll('.fade-in-up').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe fade-in elements
        document.querySelectorAll('[class*="fade-in"]').forEach(el => {
            observer.observe(el);
        });

        // Observe section titles for glitch effects
        document.querySelectorAll('.section-title').forEach(el => {
            observer.observe(el);
        });
    }

    updateScrollAnimations() {
        // Update any scroll-based animations here
    }

    // ============================================ //
    //               HEADER EFFECTS                 //
    // ============================================ //

    updateHeaderOnScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        const scrolled = window.pageYOffset > 100;
        header.classList.toggle('scrolled', scrolled);
    }

    // ============================================ //
    //                COUNTERS                      //
    // ============================================ //

    initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // ============================================ //
    //              GLITCH EFFECTS                  //
    // ============================================ //

    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch');
        
        glitchElements.forEach(element => {
            // Random glitch trigger
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance
                    this.triggerGlitch(element);
                }
            }, 3000);
        });
    }

    triggerGlitch(element) {
        element.classList.add('glitching');
        setTimeout(() => {
            element.classList.remove('glitching');
        }, 300);
    }

    // ============================================ //
    //                3D CARDS                      //
    // ============================================ //

    init3DCards() {
        if (this.isMobile || this.isReducedMotion) return;

        const cards = document.querySelectorAll('.cyber-card, .about-card, .partner-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handle3DCardMove(e, card));
            card.addEventListener('mouseleave', () => this.reset3DCard(card));
        });
    }

    handle3DCardMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        requestAnimationFrame(() => {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
    }

    reset3DCard(card) {
        requestAnimationFrame(() => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    }

    // ============================================ //
    //             SMOOTH SCROLLING                 //
    // ============================================ //

    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href === '#') return; // Не скроллить к пустому якорю
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initSplashTyping() {
        // Проверяем, загружен ли уже splash-typing.js
        if (typeof window.initSplashTyping === 'function' && window.initSplashTyping !== this.initSplashTyping) {
            window.initSplashTyping();
        } else {
            console.log('Splash typing function not found, loading from external script...');
            // Если функция не найдена, ждем загрузки скрипта
            setTimeout(() => {
                if (typeof window.initSplashTyping === 'function' && window.initSplashTyping !== this.initSplashTyping) {
                    window.initSplashTyping();
                } else {
                    console.warn('initSplashTyping function still not available');
                }
            }, 500);
        }
    }

    // ============================================ //
    //              PARALLAX EFFECTS                //
    // ============================================ //

    updateParallax() {
        if (this.isReducedMotion) return;

        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements .float-element');
        
        parallaxElements.forEach(element => {
            const speed = 0.05;
            const yPos = -(scrolled * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    }

    // ============================================ //
    //           PERFORMANCE OPTIMIZATIONS          //
    // ============================================ //

    performanceOptimizations() {
        // Lazy load images
        this.initLazyLoading();
        
        // Optimize animations for low-end devices
        this.optimizeForPerformance();
        
        // Monitor FPS and adjust accordingly
        this.monitorPerformance();
    }

    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    optimizeForPerformance() {
        // Check if device is low-end
        const isLowEnd = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;
        
        if (isLowEnd) {
            document.body.classList.add('low-performance');
            this.isReducedMotion = true;
        }
    }

    monitorPerformance() {
        let lastTime = performance.now();
        let frameCount = 0;
        let fps = 60;

        const checkFPS = () => {
            const currentTime = performance.now();
            frameCount++;

            if (currentTime >= lastTime + 1000) {
                fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;

                // Adjust animations based on FPS
                if (fps < 30) {
                    document.body.classList.add('low-performance');
                } else {
                    document.body.classList.remove('low-performance');
                }
            }

            this.animationFrameId = requestAnimationFrame(checkFPS);
        };

        if (!this.isReducedMotion) {
            this.animationFrameId = requestAnimationFrame(checkFPS);
        }
    }

    startAnimationLoop() {
        const animate = () => {
            // Update any frame-based animations here
            if (this.particleSystem) {
                this.particleSystem.update();
            }
            
            if (this.matrixEffect) {
                this.matrixEffect.update();
            }
            
            this.animationFrameId = requestAnimationFrame(animate);
        };
        
        if (!this.isReducedMotion) {
            animate();
        }
    }

    // ============================================ //
    //                 CLEANUP                      //
    // ============================================ //

    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        // Remove event listeners and clean up
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('scroll', this.onScroll);
    }
}

// ============================================ //
//              PARTICLE SYSTEM                 //
// ============================================ //

class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 20 : 40;
        
        if (!this.container) {
            console.warn('Particles container not found');
            return;
        }

        this.init();
    }

    init() {
        if (!this.container) return;
        this.createParticles();
    }

    createParticles() {
        if (!this.container) {
            console.warn('Cannot create particles: container not found');
            return;
        }
        
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.createParticle();
            fragment.appendChild(particle);
            this.particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: Math.random() * 0.5 + 0.2,
                life: Math.random() * 100
            });
        }

        this.container.appendChild(fragment);
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        return particle;
    }

    update() {
        if (!this.particles || !Array.isArray(this.particles)) {
            console.warn('Particles array not initialized');
            return;
        }
        
        this.particles.forEach(particle => {
            particle.life++;
            particle.x += particle.vx;
            particle.y -= particle.vy;

            // Reset particle when it goes off screen
            if (particle.y < -10 || particle.life > 1000) {
                particle.y = window.innerHeight + 10;
                particle.x = Math.random() * window.innerWidth;
                particle.life = 0;
            }

            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
    }

    handleResize() {
        if (!this.particles || !Array.isArray(this.particles)) {
            console.warn('Particles array not initialized for resize');
            return;
        }
        
        this.particleCount = window.innerWidth < 768 ? 20 : 40;
        
        // Remove excess particles or add more as needed
        const currentCount = this.particles.length;
        if (currentCount > this.particleCount) {
            // Remove excess
            for (let i = currentCount - 1; i >= this.particleCount; i--) {
                this.particles[i].element.remove();
                this.particles.splice(i, 1);
            }
        } else if (currentCount < this.particleCount) {
            // Add more
            const toAdd = this.particleCount - currentCount;
            for (let i = 0; i < toAdd; i++) {
                const particle = this.createParticle();
                this.container.appendChild(particle);
                this.particles.push({
                    element: particle,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: Math.random() * 0.5 + 0.2,
                    life: Math.random() * 100
                });
            }
        }
    }
}

// ============================================ //
//               MATRIX EFFECT                  //
// ============================================ //

class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        this.drops = [];
        
        this.setupCanvas();
        this.init();
    }

    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.opacity = '0.1';
        this.canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(this.canvas);
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        
        // Reset drops
        this.drops = [];
        for (let x = 0; x < this.columns; x++) {
            this.drops[x] = 1;
        }
    }

    init() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.textSize = this.fontSize + 'px monospace';
        
        window.addEventListener('resize', () => this.resize());
    }

    update() {
        // Black BG for the canvas with translucency
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Changing the text color to green
        this.ctx.fillStyle = '#ff6b35';
        this.ctx.font = this.fontSize + 'px monospace';
        
        // Looping over drops
        for (let i = 0; i < this.drops.length; i++) {
            // A random character to print
            const text = this.matrix[Math.floor(Math.random() * this.matrix.length)];
            
            // x = i * fontSize, y = value of drops[i] * fontSize
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            // Sending the drop back to the top randomly after it has crossed the screen
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            // Incrementing Y coordinate
            this.drops[i]++;
        }
    }
}

// ============================================ //
//              VIDEO PLAYER                    //
// ============================================ //

// VideoPlayer удален - теперь используется modal-flow.js

// ============================================ //
//              MOBILE MENU                     //
// ============================================ //

class MobileMenu {
    constructor() {
        this.menu = document.querySelector('.mobile-menu');
        this.btn = document.querySelector('.mobile-menu-btn');
        this.init();
    }

    init() {
        if (this.btn) {
            this.btn.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        this.menu.classList.toggle('active');
        this.btn.classList.toggle('active');
    }
}

// ============================================ //
//           INTERACTIVE TERMINAL               //
// ============================================ //

// Navbar Transparency
function initNavbar() {
        const header = document.querySelector('.header');
        const nav = header.querySelector('.nav');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Добавляем/убираем прозрачность в зависимости от положения скролла
            if (currentScroll <= 50) {
                nav.style.background = 'transparent';
                nav.style.backdropFilter = 'none';
                nav.style.borderBottom = 'none';
        } else {
                nav.style.background = 'rgba(255, 255, 255, 0.8)';
                nav.style.backdropFilter = 'blur(10px)';
                nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Initialize navbar when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
        } else {
        initNavbar();
    }

    // === СТАТУСЫ ШАГОВ ===
const STEP_STATUS = {
  inProgress: window.location.pathname.includes('index.kz.html') ? 'Үдерісте' : 'В процессе',
  completed: window.location.pathname.includes('index.kz.html') ? 'Аяқталды' : 'Завершено',
  available: window.location.pathname.includes('index.kz.html') ? 'Қолжетімді' : 'Доступно'
};

function markStepCompleted(stepCard) {
  const status = stepCard.querySelector('.step-status');
  if (status) {
    status.textContent = STEP_STATUS.completed;
    status.style.color = '#4CAF50';
  }
  stepCard.classList.add('step-completed');
}

function markStepInProgress(stepCard) {
  const status = stepCard.querySelector('.step-status');
  if (status) {
    if (window.location.pathname.includes('index.kz.html')) {
      status.textContent = STEP_STATUS.inProgress;
    } else {
      status.textContent = STEP_STATUS.inProgress;
    }
    status.style.color = '#666';
  }
  stepCard.classList.remove('step-completed');
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.step-card').forEach(stepCard => {
    markStepInProgress(stepCard);
    // Особая логика для второго шага
    if (stepCard.dataset.step === '2') {
      const btns = stepCard.querySelectorAll('button');
      let pressed = [false, false];
      btns.forEach((btn, idx) => {
        btn.addEventListener('click', function() {
          pressed[idx] = true;
          if (pressed[0] && pressed[1]) {
            markStepCompleted(stepCard);
          }
        });
      });
    } else {
      // Обычная логика для остальных шагов
      stepCard.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function() {
          markStepCompleted(stepCard);
        });
      });
    }
  });
});

// Initialize the app
const cyberHackathon = new CyberHackathon();

// ===== FOOTER QUOTES =====
const footerQuotes = [
  "Что разум человека может постигнуть и во что он может поверить, того он способен достичь.",
  "Стремитесь не к успеху, а к ценностям, которые он дает.",
  "Своим успехом я обязана тому, что никогда не оправдывалась и не принимала оправданий от других.",
  "80% успеха — это появиться в нужном месте в нужное время.",
  "Ваше время ограничено, не тратьте его, живя чужой жизнью.",
  "Побеждает тот, кто не боится проиграть."
];
const footerQuotesKZ = [
  "Қателікпен не істеу керек: тану, қабылдау, сабақ алу, ұмыту.",
  "Сіз сенетін нәрсе сіздің әлеміңізге айналады.",
  "Тек әрекет арқылы ғана сенім өз күшін алады.",
  "Білім – болашақтың валютасы.",
  "Тек өзіңе сенсең ғана, биікке жетесің.",
  "Табыстың 80% – бұл өзіңді көрсету."
];

document.addEventListener('DOMContentLoaded', function() {
  // Автоматическое перенаправление на правильную версию сайта
  autoRedirectToCorrectLanguage();
  
  var quoteEl = document.getElementById('footerQuote');
  if (quoteEl) {
    var isKZ = window.location.pathname.includes('index.kz.html');
    var quotes = isKZ ? footerQuotesKZ : footerQuotes;
    if (quotes.length > 0) {
      var idx = Math.floor(Math.random() * quotes.length);
      quoteEl.innerHTML = quotes[idx];
    }
  }
  
  // Проверяем согласие на обработку данных
  checkPrivacyConsent();
  

});

function autoRedirectToCorrectLanguage() {
  // Проверяем, было ли уже перенаправление в этой сессии
  if (sessionStorage.getItem('languageRedirected')) {
    return;
  }
  
  const isKZ = detectUserLanguage();
  const currentIsKZ = window.location.pathname.includes('index.kz.html');
  
  // Если язык не соответствует, перенаправляем
  if (isKZ !== currentIsKZ) {
    sessionStorage.setItem('languageRedirected', 'true');
    
    if (isKZ && !currentIsKZ) {
      window.location.href = 'index.kz.html';
    } else if (!isKZ && currentIsKZ) {
      window.location.href = 'index.html';
    }
  }
}

// ===== LANGUAGE DETECTION =====
function detectUserLanguage() {
  // Проверяем сохраненный выбор пользователя
  const savedLanguage = localStorage.getItem('userLanguage');
  if (savedLanguage) {
    return savedLanguage === 'kz';
  }
  
  // Определяем язык по URL
  const isKZByURL = window.location.pathname.includes('index.kz.html');
  
  // Определяем язык по настройкам браузера
  const browserLanguage = navigator.language || navigator.userLanguage || '';
  const isKZByBrowser = browserLanguage.toLowerCase().startsWith('kk') || 
                        browserLanguage.toLowerCase().startsWith('kz');
  
  // Определяем язык по геолокации (если доступно)
  const isKZByLocation = detectLocationLanguage();
  
  // Приоритет: URL > Браузер > Геолокация
  if (isKZByURL) return true;
  if (isKZByBrowser) return true;
  if (isKZByLocation) return true;
  
  // По умолчанию для Казахстана - казахский
  return false;
}

function detectLocationLanguage() {
  // Простая проверка по часовому поясу (Казахстан: UTC+5, UTC+6)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const kazakhTimezones = [
    'Asia/Almaty', 'Asia/Aqtau', 'Asia/Aqtobe', 'Asia/Atyrau',
    'Asia/Oral', 'Asia/Qostanay', 'Asia/Qyzylorda', 'Asia/Vostok'
  ];
  
  return kazakhTimezones.includes(timezone);
}

// ===== PRIVACY CONSENT MODAL =====
function checkPrivacyConsent() {
  const hasConsented = localStorage.getItem('privacyConsent');
  
  if (!hasConsented) {
    setTimeout(() => {
      showPrivacyConsentModal();
    }, 2000); // Показываем через 2 секунды после загрузки
  }
}

function showPrivacyConsentModal() {
  const isKZ = detectUserLanguage();
  
  const modalHTML = `
    <div id="privacyConsentModal" class="privacy-consent-modal">
      <div class="privacy-consent-content">
        <div class="privacy-consent-header">
          <h2>${isKZ ? 'Деректерді өңдеуге келісім' : 'Согласие на обработку данных'}</h2>
          <button class="privacy-consent-close" onclick="closePrivacyConsentModal()">&times;</button>
        </div>
        
        <div class="privacy-consent-body">
          <div class="privacy-consent-icon">🔒</div>
          <p class="privacy-consent-text">
            ${isKZ ? 
              'Біз сіздің жеке деректеріңізді қорғауға келісеміз. Сайтты пайдалану арқылы сіз деректерді өңдеу саясатына келісесіз.' :
              'Мы заботимся о защите ваших персональных данных. Используя сайт, вы соглашаетесь с политикой обработки данных.'
            }
          </p>
          
          <div class="privacy-consent-checkbox">
            <label class="checkbox-container">
              <input type="checkbox" id="privacyCheckbox">
              <span class="checkmark"></span>
              <span class="checkbox-text">
                ${isKZ ? 
                  'Мен деректерді өңдеу саясатына келісемін' :
                  'Я согласен с политикой обработки данных'
                }
              </span>
            </label>
          </div>
          
          <div class="privacy-consent-links">
            <a href="#" onclick="openPrivacyPolicy('${isKZ ? 'kz' : 'ru'}'); return false;" class="privacy-link">
              ${isKZ ? 'Деректерді өңдеу саясатын көру' : 'Политика конфиденциальности'}
            </a>
          </div>
        </div>
        
        <div class="privacy-consent-footer">
          <button id="privacyAcceptBtn" class="privacy-accept-btn" disabled onclick="acceptPrivacyConsent()">
            ${isKZ ? 'Келісу және жалғастыру' : 'Принять и продолжить'}
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Обработчик для чекбокса
  const checkbox = document.getElementById('privacyCheckbox');
  const acceptBtn = document.getElementById('privacyAcceptBtn');
  
  checkbox.addEventListener('change', function() {
    acceptBtn.disabled = !this.checked;
    if (this.checked) {
      acceptBtn.classList.add('active');
    } else {
      acceptBtn.classList.remove('active');
    }
  });
  
  // Показываем модальное окно
  setTimeout(() => {
    const modal = document.getElementById('privacyConsentModal');
    if (modal) {
      modal.classList.add('show');
    }
  }, 100);
  

}

function closePrivacyConsentModal() {
  const modal = document.getElementById('privacyConsentModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function acceptPrivacyConsent() {
  localStorage.setItem('privacyConsent', 'true');
  
  // Сохраняем выбранный язык
  const isKZ = detectUserLanguage();
  localStorage.setItem('userLanguage', isKZ ? 'kz' : 'ru');
  
  closePrivacyConsentModal();
}

// Функция для переключения языка
function switchLanguage(language) {
  localStorage.setItem('userLanguage', language);
  
  // Перезагружаем страницу с правильным языком
  if (language === 'kz' && !window.location.pathname.includes('index.kz.html')) {
    window.location.href = 'index.kz.html';
  } else if (language === 'ru' && window.location.pathname.includes('index.kz.html')) {
    window.location.href = 'index.html';
  }
}

// Функция для умного открытия политики конфиденциальности
function openPrivacyPolicy(language) {
  const isKZ = language === 'kz';
  const pdfPath = isKZ ? 'assets/pdf/Политика каз.pdf' : 'assets/pdf/Политика конфиденциальности участников хакатона ITMLab.pdf';
  
  // Пробуем открыть в новой вкладке
  const newWindow = window.open(pdfPath, '_blank');
  
  // Проверяем, открылось ли окно (блокировщики могут заблокировать)
  if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
    // Если не открылось, показываем альтернативные варианты
    showPrivacyPolicyAlternatives(language, pdfPath);
  }
}

function showPrivacyPolicyAlternatives(language, pdfPath) {
  const isKZ = language === 'kz';
  
  const alternativesHTML = `
    <div id="privacyAlternativesModal" class="privacy-alternatives-modal">
      <div class="privacy-alternatives-content">
        <div class="privacy-alternatives-header">
          <h3>${isKZ ? 'PDF файлын ашу мәселесі' : 'Проблема с открытием PDF файла'}</h3>
          <button onclick="closePrivacyAlternativesModal()">&times;</button>
        </div>
        
        <div class="privacy-alternatives-body">
          <p>${isKZ ? 
            'PDF файлын ашу мәселесі болды. Төмендегі нұсқаларды қолданып көріңіз:' :
            'Возникла проблема с открытием PDF файла. Попробуйте следующие варианты:'
          }</p>
          
          <div class="privacy-alternatives-options">
            <button onclick="downloadPrivacyPolicy('${pdfPath}')" class="alternative-btn">
              📥 ${isKZ ? 'PDF файлын жүктеу' : 'Скачать PDF файл'}
            </button>
            
            <button onclick="openPrivacyPolicyInNewTab('${pdfPath}')" class="alternative-btn">
              🔗 ${isKZ ? 'Жаңа табта ашу' : 'Открыть в новой вкладке'}
            </button>
            
            <button onclick="copyPrivacyPolicyLink('${pdfPath}')" class="alternative-btn">
              📋 ${isKZ ? 'Сілтемені көшіру' : 'Скопировать ссылку'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', alternativesHTML);
  
  setTimeout(() => {
    document.getElementById('privacyAlternativesModal').classList.add('show');
  }, 100);
}

function closePrivacyAlternativesModal() {
  const modal = document.getElementById('privacyAlternativesModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function downloadPrivacyPolicy(pdfPath) {
  const link = document.createElement('a');
  link.href = pdfPath;
  link.download = pdfPath.split('/').pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  closePrivacyAlternativesModal();
}

function openPrivacyPolicyInNewTab(pdfPath) {
  window.open(pdfPath, '_blank', 'noopener,noreferrer');
  closePrivacyAlternativesModal();
}

function copyPrivacyPolicyLink(pdfPath) {
  const fullUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/') + pdfPath;
  navigator.clipboard.writeText(fullUrl).then(() => {
    alert('Ссылка скопирована в буфер обмена!');
  }).catch(() => {
    // Fallback для старых браузеров
    const textArea = document.createElement('textarea');
    textArea.value = fullUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Ссылка скопирована в буфер обмена!');
  });
  closePrivacyAlternativesModal();
}

