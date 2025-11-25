const resultEl = document.getElementById('passwordResult');
const lengthEl = document.getElementById('length');
const lengthValueEl = document.getElementById('lengthValue');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const clipboardBtn = document.getElementById('clipboardBtn');
const strengthIndicator = document.getElementById('strengthIndicator');
const strengthText = document.getElementById('strengthText');

const randomFunc = {
    lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
    upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
    number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
    symbol: () => {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }
};

lengthEl.addEventListener('input', (e) => lengthValueEl.innerText = e.target.value);

generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    checkStrength(length, hasLower, hasUpper, hasNumber, hasSymbol);
});

clipboardBtn.addEventListener('click', () => {
    const password = resultEl.innerText;
    if (!password || password === 'Tu contraseña aquí') return;

    navigator.clipboard.writeText(password);

    const originalText = clipboardBtn.innerText;

    clipboardBtn.innerText = '✅';
    clipboardBtn.style.backgroundColor = '#27ae60';

    setTimeout(() => {
        clipboardBtn.innerText = originalText;
        clipboardBtn.style.backgroundColor = '#3498db';
    }, 1500);
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) return '';

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    return generatedPassword.slice(0, length);
}

function checkStrength(length, lower, upper, number, symbol) {
    let strength = 0;
    if (length > 10) strength += 1;
    if (length > 14) strength += 1;
    if (lower && upper) strength += 1;
    if (number) strength += 1;
    if (symbol) strength += 1;

    if (strength < 2) {
        strengthIndicator.style.width = '30%';
        strengthIndicator.style.backgroundColor = 'red';
        strengthText.innerText = 'Débil';
    } else if (strength < 4) {
        strengthIndicator.style.width = '60%';
        strengthIndicator.style.backgroundColor = 'orange';
        strengthText.innerText = 'Media';
    } else {
        strengthIndicator.style.width = '100%';
        strengthIndicator.style.backgroundColor = 'green';
        strengthText.innerText = 'Fuerte';
    }
}