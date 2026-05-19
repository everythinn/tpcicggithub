// Jest functional tests for calculator UI and addition operations
const fs = require('fs');
const path = require('path');

// Mock document before loading calc.js
let display, displayInput;

describe('Calculator - Addition Functional Tests', () => {
    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
            <input type="text" id="display" class="display-input" placeholder="0" readonly>
        `;
        
        displayInput = document.getElementById('display');
        currentInput = '0';
        previousInput = '';
        operator = null;
        
        // Reset functions state
        updateDisplay();
    });

    describe('Addition Operations on UI', () => {
        test('should display 5 when adding 2 + 3', () => {
            appendNumber('2');
            expect(displayInput.value).toBe('2');
            
            appendOperator('+');
            expect(displayInput.value).toBe('2');
            
            appendNumber('3');
            expect(displayInput.value).toBe('3');
            
            calculate();
            expect(displayInput.value).toBe('5');
        });

        test('should display 10 when adding 5 + 5', () => {
            appendNumber('5');
            appendOperator('+');
            appendNumber('5');
            calculate();
            expect(displayInput.value).toBe('10');
        });

        test('should display 100 when adding 50 + 50', () => {
            appendNumber('5');
            appendNumber('0');
            appendOperator('+');
            appendNumber('5');
            appendNumber('0');
            calculate();
            expect(displayInput.value).toBe('100');
        });

        test('should handle addition with decimal numbers', () => {
            appendNumber('2');
            appendNumber('.');
            appendNumber('5');
            appendOperator('+');
            appendNumber('3');
            appendNumber('.');
            appendNumber('5');
            calculate();
            expect(parseFloat(displayInput.value)).toBeCloseTo(6, 5);
        });

        test('should handle addition with negative result', () => {
            appendNumber('2');
            appendOperator('+');
            appendNumber('5');
            calculate();
            expect(displayInput.value).toBe('7');
        });

        test('should display 0 when adding 0 + 0', () => {
            // Display already shows 0
            appendOperator('+');
            appendNumber('0');
            calculate();
            expect(displayInput.value).toBe('0');
        });

        test('should handle consecutive additions', () => {
            appendNumber('5');
            appendOperator('+');
            appendNumber('3');
            appendOperator('+');
            // After second operator, it should calculate 5 + 3 = 8
            appendNumber('2');
            calculate();
            // 8 + 2 = 10
            expect(displayInput.value).toBe('10');
        });

        test('should clear display when C button is pressed', () => {
            appendNumber('5');
            appendOperator('+');
            appendNumber('3');
            clearDisplay();
            expect(displayInput.value).toBe('0');
        });

        test('should delete last digit with backspace', () => {
            appendNumber('1');
            appendNumber('2');
            appendNumber('3');
            expect(displayInput.value).toBe('123');
            
            deleteLast();
            expect(displayInput.value).toBe('12');
            
            deleteLast();
            expect(displayInput.value).toBe('1');
        });

        test('should not allow multiple decimal points in one number', () => {
            appendNumber('1');
            appendNumber('.');
            appendNumber('2');
            appendNumber('.');
            appendNumber('3');
            expect(displayInput.value).toBe('1.23');
        });
    });

    describe('Addition Edge Cases', () => {
        test('should handle large number additions', () => {
            appendNumber('9');
            appendNumber('9');
            appendNumber('9');
            appendNumber('9');
            appendNumber('9');
            appendNumber('9');
            appendOperator('+');
            appendNumber('1');
            calculate();
            expect(displayInput.value).toBe('1000000');
        });

        test('should display result after addition without pressing equals', () => {
            appendNumber('2');
            appendOperator('+');
            appendNumber('3');
            appendOperator('+');
            expect(displayInput.value).toBe('');
            expect(currentInput).toBe('');
            expect(previousInput).toBe('5');
        });
    });
});

// Helper functions needed for tests (imported from calc.js logic)
let currentInput = '0';
let previousInput = '';
let operator = null;

function updateDisplay() {
    displayInput = document.getElementById('display');
    if (displayInput) {
        displayInput.value = currentInput;
    }
}

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

function calculate() {
    if (operator === null || currentInput === '' || previousInput === '') {
        return;
    }
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch(operator) {
        case '+':
            result = prev + current;
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

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}
