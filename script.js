let expression = '';
let history = [];

function appendInput(input) {
  expression += input;
  updateDisplay();
}

function clearDisplay() {
  expression = '';
  updateDisplay();
}

function deleteInput() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    // Evaluate the expression, replacing custom operators with JavaScript operators
    const sanitizedExpression = expression.replace('÷', '/').replace('×', '*').replace('^', '**');
    const result = eval(sanitizedExpression);
    history.push(expression + ' = ' + result);
    expression = result.toString();
    updateDisplay();
    updateHistory();
  } catch {
    expression = 'Error';
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById('current-operand').innerText = expression;
}

function updateHistory() {
  document.getElementById('history').innerText = history.join('\n');
}

function scientificOperation(op) {
  let result;
  try {
    const current = parseFloat(expression);
    if (isNaN(current)) return;

    switch (op) {
      case 'sqrt':
        result = Math.sqrt(current);
        break;
      case 'square':
        result = Math.pow(current, 2);
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
    expression = result.toString();
    updateDisplay();
  } catch {
    expression = 'Error';
    updateDisplay();
  }
}
