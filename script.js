let expression = '';
let history = [];
let historyIndex = -1;
let isInverseTrig = false;

document.addEventListener('DOMContentLoaded', () => {
  const displayElement = document.getElementById('current-operand');
  displayElement.addEventListener('input', handleInput);
  document.addEventListener('keydown', handleKeyPress);
});

function handleInput(event) {
  expression = event.target.innerText;
}

function handleKeyPress(event) {
  const key = event.key;
  if ((key >= '0' && key <= '9') || ['.', '+', '-', '*', '/', '(', ')'].includes(key)) {
    appendInput(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteInput();
  }
}

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
    let sanitizedExpression = expression
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/\^/g, '**')
      .replace(/sin\((\d+(\.\d+)?)\)/g, (_, num) => `Math.sin(${(parseFloat(num) * Math.PI) / 180})`)
      .replace(/cos\((\d+(\.\d+)?)\)/g, (_, num) => `Math.cos(${(parseFloat(num) * Math.PI) / 180})`)
      .replace(/tan\((\d+(\.\d+)?)\)/g, (_, num) => `Math.tan(${(parseFloat(num) * Math.PI) / 180})`)
      .replace(/sin⁻¹\((\d+(\.\d+)?)\)/g, (_, num) => `(Math.asin(${num}) * 180 / Math.PI)`)
      .replace(/cos⁻¹\((\d+(\.\d+)?)\)/g, (_, num) => `(Math.acos(${num}) * 180 / Math.PI)`)
      .replace(/tan⁻¹\((\d+(\.\d+)?)\)/g, (_, num) => `(Math.atan(${num}) * 180 / Math.PI)`)
      .replace(/cosec\((\d+(\.\d+)?)\)/g, (_, num) => `1/Math.sin(${(parseFloat(num) * Math.PI) / 180})`)
      .replace(/sec\((\d+(\.\d+)?)\)/g, (_, num) => `1/Math.cos(${(parseFloat(num) * Math.PI) / 180})`)
      .replace(/cot\((\d+(\.\d+)?)\)/g, (_, num) => `1/Math.tan(${(parseFloat(num) * Math.PI) / 180})`)
      .replace(/log\(/g, 'Math.log10(')
      .replace(/√/g, 'Math.sqrt');

    if (/x|y|z/.test(sanitizedExpression)) {
      const x = prompt("Enter the value for x:");
      const y = prompt("Enter the value for y:");
      const z = prompt("Enter the value for z:");
      sanitizedExpression = sanitizedExpression
        .replace(/x/g, x)
        .replace(/y/g, y)
        .replace(/z/g, z);
    }

    const result = eval(sanitizedExpression);
    const roundedResult = Math.abs(result) < 1e-10 ? 0 : result;
    history.push(`${expression} = ${roundedResult}`);
    historyIndex = history.length - 1;
    expression = roundedResult.toString();
    updateDisplay();
  } catch (error) {
    expression = 'Error';
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById('current-operand').innerText = expression;
}

function showPrevious() {
  if (historyIndex > 0) {
    historyIndex -= 1;
    expression = history[historyIndex];
    updateDisplay();
  }
}

function showNext() {
  if (historyIndex < history.length - 1) {
    historyIndex += 1;
    expression = history[historyIndex];
    updateDisplay();
  }
}

function toggleTrigFunctions() {
  isInverseTrig = !isInverseTrig;
  const trigButtons = document.querySelectorAll('.trig');
  trigButtons.forEach(button => {
    const funcName = button.innerText;
    button.innerText = isInverseTrig ? `${funcName}⁻¹` : funcName.replace('⁻¹', '');
  });
}

function scientificOperation(op) {
  switch (op) {
    case 'sqrt':
      appendInput('Math.sqrt(');
      break;
    case 'square':
      expression += '**2';
      updateDisplay();
      break;
    case 'inverse':
      expression += '**-1';
      updateDisplay();
      break;
    default:
      break;
  }
}

function setCaretPosition(elem, caretPos) {
  if (elem != null) {
    if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else if (elem.setSelectionRange) {
      elem.focus();
      elem.setSelectionRange(caretPos, caretPos);
    }
  }
}