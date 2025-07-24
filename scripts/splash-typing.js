// Splash phrases for hero tagline
const SPLASHES_RU = [
    '// Инновации в образовании',
  '// Hello, world!',
  '// Commit early, commit often',
  '// rm -rf / — не пробуй дома',
  '// AI is my copilot',
  '// Пиши код — не баги',
  '// Stack Overflow спасёт',
  '// Coffee > Sleep',
  '// 127.0.0.1 — мой дом',
  '// Сначала работает у меня',
  '// It works on my machine!',
    '// Я не баг, я фича'
];

const SPLASHES_KZ = [
    '// Білім берудегі инновациялар',
    '// Сәлем, әлем!',
    '// Ерте коммит жаса, жиі коммит жаса',
    '// rm -rf / — үйде жасама',
    '// AI менің көмекшім',
    '// Код жаз — баг жазба',
    '// Stack Overflow құтқарады',
    '// Кофе > Ұйқы',
    '// 127.0.0.1 — менің үйім',
    '// Менде жұмыс істейді',
    '// It works on my machine!',
    '// Мен баг емес, мен функционалмын'
];

// Initialize typing animation
function initSplashTyping() {
    console.log('initSplashTyping called');
    const splashElement = document.getElementById('splashTyping');
    console.log('splashElement found:', !!splashElement);
    if (!splashElement) {
        console.error('splashTyping element not found!');
        return;
    }

    // Determine language based on current page
    const isKazakh = window.location.pathname.includes('index.kz.html');
    const SPLASHES = isKazakh ? SPLASHES_KZ : SPLASHES_RU;

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const phrase = SPLASHES[currentPhrase];
        
        if (isDeleting) {
            currentChar--;
        } else {
            currentChar++;
        }
        
        const newText = phrase.substring(0, currentChar);
        splashElement.textContent = newText;
        splashElement.dataset.text = phrase;
        
        console.log('Typing:', newText, '| currentChar:', currentChar, '| isDeleting:', isDeleting);
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentChar === phrase.length) {
            console.log('Phrase completed, starting deletion');
            isDeleting = true;
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                type();
            }, 2000);
            return;
        } else if (isDeleting && currentChar === 0) {
            console.log('Deletion completed, moving to next phrase');
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % SPLASHES.length;
        }
        
        if (!isPaused) {
            setTimeout(type, typeSpeed);
        }
    }
    
    // Start with the first phrase immediately
    splashElement.textContent = SPLASHES[0];
    splashElement.dataset.text = SPLASHES[0];
    
    console.log('Starting typing animation with phrase:', SPLASHES[0]);
    
    // Start the typing animation after a delay
    setTimeout(() => {
        console.log('Starting type() function');
        type();
    }, 2000);
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('splash-typing.js: DOMContentLoaded event fired');
    initSplashTyping();
});

// Export function globally
window.initSplashTyping = initSplashTyping;
console.log('splash-typing.js: initSplashTyping exported to window');
