const lottoNumbersDiv = document.querySelector('.lotto-numbers');
const generatorBtn = document.querySelector('#generator-btn');
const themeToggle = document.querySelector('#theme-toggle');
const htmlElement = document.documentElement;

// Lotto Generation Logic
function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    lottoNumbersDiv.innerHTML = '';
    numbers.forEach((number, index) => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('lotto-number');
        numberDiv.style.animationDelay = `${index * 0.1}s`;
        numberDiv.textContent = number;
        lottoNumbersDiv.appendChild(numberDiv);
    });
}

generatorBtn.addEventListener('click', () => {
    // Add a small bounce effect to the button
    generatorBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        generatorBtn.style.transform = '';
        const numbers = generateLottoNumbers();
        displayNumbers(numbers);
    }, 100);
});

// Theme Toggle Logic
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Modal Logic
const modalContainer = document.querySelector('#modal-container');
const modalBody = document.querySelector('#modal-body');
const modalClose = document.querySelector('.modal-close');
const privacyLink = document.querySelector('#privacy-link');
const termsLink = document.querySelector('#terms-link');

const legalContent = {
    privacy: `
        <h2>Privacy Policy</h2>
        <p>Last updated: April 9, 2026</p>
        <p>At LottoGen Pro, we take your privacy seriously. This policy describes how we handle information when you use our site.</p>
        <h3>1. Information Collection</h3>
        <p>We do not collect personal identification information from our users. The numbers generated are random and not stored on our servers.</p>
        <h3>2. Cookies & Advertising</h3>
        <p>We use Google AdSense to serve ads. Google may use cookies to serve ads based on your prior visits to this or other websites. You may opt out of personalized advertising by visiting Google Ad Settings.</p>
        <h3>3. Third-Party Services</h3>
        <p>We use Formspree for contact inquiries and Disqus for community comments. These services have their own privacy policies which you should review.</p>
    `,
    terms: `
        <h2>Terms of Service</h2>
        <p>Last updated: April 9, 2026</p>
        <p>By using LottoGen Pro, you agree to the following terms:</p>
        <h3>1. Use of Service</h3>
        <p>This tool is provided for entertainment purposes only. We do not guarantee any winnings or accuracy in lottery results.</p>
        <h3>2. Responsible Gaming</h3>
        <p>Users must play responsibly. We are not liable for any financial losses incurred from playing the lottery.</p>
        <h3>3. Intellectual Property</h3>
        <p>All content on this site is the property of LottoGen Pro. Unauthorized reproduction is prohibited.</p>
    `
};

function openModal(type) {
    modalBody.innerHTML = legalContent[type];
    modalContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeModal() {
    modalContainer.classList.add('hidden');
    document.body.style.overflow = '';
}

privacyLink.addEventListener('click', (e) => { e.preventDefault(); openModal('privacy'); });
termsLink.addEventListener('click', (e) => { e.preventDefault(); openModal('terms'); });
modalClose.addEventListener('click', closeModal);
modalContainer.addEventListener('click', (e) => { if (e.target === modalContainer) closeModal(); });

// Initialize
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
setTheme(savedTheme || systemTheme);

// Initial generation
displayNumbers(generateLottoNumbers());
