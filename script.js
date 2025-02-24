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
  if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')') {
    appendInput(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteInput();
  } else if (key === 'x' || key === 'X') {
    appendInput('x');
  } else if (key === 'y' || key === 'Y') {
    appendInput('y');
  } else if (key === 'z' || key === 'Z') {
    appendInput('z');
  } else if (key === '%') {
    appendInput('%');
  } else if (key === '^') {
    appendInput('^');
  } else if (key === 'i' || key === 'I') {
    appendInput('^-1');
  } else if (key === 'r' || key === 'R') {
    scientificOperation('sqrt');
  } else if (key === 's' || key === 'S') {
    scientificOperation('square');
  } else if (key === 'l' || key === 'L') {
    appendInput('log(');
  } else if (key === 't' || key === 'T') {
    appendInput('tan(');
  } else if (key === 'c' || key === 'C') {
    appendInput('cos(');
  } else if (key === 'o' || key === 'O') {
    appendInput('cot(');
  } else if (key === 'e' || key === 'E') {
    appendInput('sec(');
  } else if (key === 'g' || key === 'G') {
    appendInput('cosec(');
  }
}

function appendInput(input) {
  const displayElement = document.getElementById('current-operand');
  const selectionStart = displayElement.selectionStart || displayElement.innerText.length;
  const selectionEnd = displayElement.selectionEnd || displayElement.innerText.length;

  if (selectionStart !== selectionEnd) {
    expression = expression.slice(0, selectionStart) + input + expression.slice(selectionEnd);
  } else {
    expression = expression.slice(0, selectionStart) + input + expression.slice(selectionStart);
  }

  updateDisplay();
  setCaretPosition(displayElement, selectionStart + input.length);
}

function clearDisplay() {
  expression = '';
  updateDisplay();
}

function deleteInput() {
  const displayElement = document.getElementById('current-operand');
  const selectionStart = displayElement.selectionStart || displayElement.innerText.length;
  const selectionEnd = displayElement.selectionEnd || displayElement.innerText.length;

  if (selectionStart !== selectionEnd) {
    expression = expression.slice(0, selectionStart) + expression.slice(selectionEnd);
  } else {
    expression = expression.slice(0, selectionStart - 1) + expression.slice(selectionStart);
  }

  updateDisplay();
  setCaretPosition(displayElement, selectionStart - 1);
}

function calculate() {
  try {
    let sanitizedExpression = expression.replace('÷', '/').replace('×', '*').replace('^', '**');
    if (/x|y|z/.test(sanitizedExpression)) {
      const x = prompt("Enter the value for x:");
      const y = prompt("Enter the value for y:");
      const z = prompt("Enter the value for z:");
      sanitizedExpression = sanitizedExpression.replace(/x/g, x).replace(/y/g, y).replace(/z/g, z);
    }
    const result = eval(sanitizedExpression);
    history.push(`${expression} = ${result}`);
    historyIndex = history.length - 1;
    expression = result.toString();
    updateDisplay();
  } catch {
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

function scientificOperation(op) {
  appendInput(`${op}(`);
}

function toggleTrigFunctions() {
  isInverseTrig = !isInverseTrig;
  const trigButtons = document.querySelectorAll('.trig');
  trigButtons.forEach(button => {
    const funcName = button.innerText;
    button.innerText = isInverseTrig ? `${funcName}⁻¹` : funcName.replace('⁻¹', '');
  });
}

function setCaretPosition(elem, caretPos) {
  if (elem != null) {
    if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else {
      elem.setSelectionRange(caretPos, caretPos);
      elem.focus();
    }
  }
}