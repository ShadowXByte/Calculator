let currentNumber = '';
let previousNumber = '';
let operation = null;

function appendNumber(number) {
    if (number === '.' && currentNumber.includes('.')) return;
    currentNumber = currentNumber.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    currentNumber = result;
    operation = null;
    previousNumber = '';
    updateDisplay();
}

function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    currentNumber = currentNumber.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('current-operand').innerText = currentNumber;
    document.getElementById('previous-operand').innerText = previousNumber + ' ' + (operation || '');
}

function scientificOperation(op) {
    let result;
    const current = parseFloat(currentNumber);
    if (isNaN(current)) return;

    switch (op) {
        case 'sqrt':
            result = Math.sqrt(current);
            break;
        case 'pow':
            const exponent = parseFloat(prompt("Enter the exponent:"));
            result = Math.pow(current, exponent);
            break;
        case 'sin':
            result = Math.sin(current * (Math.PI / 180));
            break;
        case 'cos':
            result = Math.cos(current * (Math.PI / 180));
            break;
        case 'tan':
            result = Math.tan(current * (Math.PI / 180));
            break;
        default:
            return;
    }
    currentNumber = result;
    updateDisplay();
}
