const calculationDisplay = document.querySelector(".calculation");
const resultDisplay = document.querySelector(".result");
const numberButtons = document.querySelectorAll(".btn-num");

let currentValue = "0";
let storedValue = "0";
let selectedOperator = null;
let justEvaluated = false;

function updateDisplay() {
  resultDisplay.textContent = currentValue;

  if (selectedOperator && storedValue !== "0") {
    calculationDisplay.textContent = `${storedValue} ${selectedOperator}`;
  } else {
    calculationDisplay.textContent = "";
  }
}

function formatNumber(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "Error";
  }

  if (Number.isInteger(numericValue)) {
    return String(numericValue);
  }

  return String(Number(numericValue.toFixed(10))).replace(/\.0+$/, "");
}

function appendDigit(digit) {
  if (justEvaluated && !selectedOperator) {
    currentValue = "0";
    justEvaluated = false;
  }

  if (currentValue === "0" && digit !== ".") {
    currentValue = digit;
  } else if (digit === "." && currentValue.includes(".")) {
    return;
  } else {
    currentValue += digit;
  }

  updateDisplay();
}

function setOperator(operator) {
  if (currentValue === "Error") {
    clearCalculator();
    return;
  }

  if (selectedOperator && currentValue !== "0") {
    evaluate();
  }

  storedValue = currentValue;
  selectedOperator = operator;
  currentValue = "0";
  justEvaluated = false;
  updateDisplay();
}

function evaluate() {
  if (!selectedOperator || currentValue === "") {
    return;
  }

  const left = Number(storedValue);
  const right = Number(currentValue);
  let result;

  switch (selectedOperator) {
    case "+":
      result = left + right;
      break;
    case "−":
      result = left - right;
      break;
    case "×":
      result = left * right;
      break;
    case "÷":
      result = right === 0 ? "Error" : left / right;
      break;
    default:
      result = right;
  }

  currentValue = formatNumber(result);
  storedValue = "0";
  selectedOperator = null;
  justEvaluated = true;
  updateDisplay();
}

function clearCalculator() {
  currentValue = "0";
  storedValue = "0";
  selectedOperator = null;
  justEvaluated = false;
  updateDisplay();
}

function invertValue() {
  if (currentValue === "Error") {
    clearCalculator();
    return;
  }

  currentValue = formatNumber(Number(currentValue) * -1);
  updateDisplay();
}

function applyPercent() {
  if (currentValue === "Error") {
    clearCalculator();
    return;
  }

  currentValue = formatNumber(Number(currentValue) / 100);
  updateDisplay();
}

function handleKeyInput(event) {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    appendDigit(key);
    return;
  }

  if (key === ".") {
    appendDigit(".");
    return;
  }

  if (key === "+") {
    setOperator("+");
    return;
  }

  if (key === "-") {
    setOperator("−");
    return;
  }

  if (key === "*") {
    setOperator("×");
    return;
  }

  if (key === "/") {
    setOperator("÷");
    return;
  }

  if (key === "=" || key === "Enter") {
    evaluate();
    return;
  }

  if (key === "Backspace") {
    currentValue = currentValue.length <= 1 ? "0" : currentValue.slice(0, -1);
    updateDisplay();
    return;
  }

  if (key === "Escape") {
    clearCalculator();
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendDigit(button.textContent.trim());
  });
});

document.getElementById("btn-plus").addEventListener("click", () => setOperator("+"));
document.getElementById("btn-minus").addEventListener("click", () => setOperator("−"));
document.getElementById("btn-mul").addEventListener("click", () => setOperator("×"));
document.getElementById("btn-div").addEventListener("click", () => setOperator("÷"));
document.getElementById("btn-eq").addEventListener("click", evaluate);
document.getElementById("btn-clear").addEventListener("click", clearCalculator);
document.getElementById("btn-invert").addEventListener("click", invertValue);
document.getElementById("btn-percent").addEventListener("click", applyPercent);
document.addEventListener("keydown", handleKeyInput);

updateDisplay();