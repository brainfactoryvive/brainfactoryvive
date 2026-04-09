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
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
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

// Initialize Theme from Local Storage or System Preference
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
setTheme(savedTheme || systemTheme);

// Initial generation
displayNumbers(generateLottoNumbers());