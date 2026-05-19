// Jest unit tests for calculator functions
const { add } = require('./calc.js');

describe('Addition Function', () => {
    describe('add(a, b)', () => {
        test('should return 5 when adding 2 + 3', () => {
            expect(add(2, 3)).toBe(5);
        });

        test('should return 0 when adding 0 + 0', () => {
            expect(add(0, 0)).toBe(0);
        });

        test('should return -1 when adding -5 + 4', () => {
            expect(add(-5, 4)).toBe(-1);
        });

        test('should handle negative numbers', () => {
            expect(add(-10, -5)).toBe(-15);
        });

        test('should handle decimal numbers', () => {
            expect(add(2.5, 3.7)).toBeCloseTo(6.2);
        });

        test('should return positive result when adding positive numbers', () => {
            expect(add(100, 50)).toBe(150);
        });

        test('should return 0 when adding a number and its negative', () => {
            expect(add(42, -42)).toBe(0);
        });

        test('should handle large numbers', () => {
            expect(add(999999, 1)).toBe(1000000);
        });

        test('should work with very small decimals', () => {
            expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
        });

        test('should return correct result for a + b = a + b', () => {
            const a = 15;
            const b = 27;
            expect(add(a, b)).toBe(a + b);
        });
    });
});
