// Display input element
const displayInput = document.getElementById('display');

// Current display value
let currentInput = '0';
let previousInput = '';
let operator = null;

/**
 * Addition function
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
    return a + b;
}

/**
 * Update the display with current input
 */
function updateDisplay() {
    displayInput.value = currentInput;
}

/**
 * Append a number to the current input
 * @param {string} num - Number to append
 */
function appendNumber(num) {
    if (num === '.' && currentInput.includes('.')) {
        return;
    }
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

/**
 * Append an operator to the calculation
 * @param {string} op - Operator to append (+, -, *, /)
 */
function appendOperator(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

/**
 * Calculate the result based on previous input, operator, and current input
 */
function calculate() {
    if (operator === null || currentInput === '' || previousInput === '') {
        return;
    }
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch(operator) {
        case '+':
            result = add(prev, current);
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Erreur : Division par zéro';
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

/**
 * Clear the display and reset all values
 */
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

/**
 * Delete the last character from current input
 */
function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Initialize the display on page load
updateDisplay();

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        add,
        clearDisplay,
        appendNumber,
        appendOperator,
        calculate,
        deleteLast
    };
}
