module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.js', '**/tests/**/*.spec.js'],
  collectCoverageFrom: [
    'calc.js',
    '!node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
