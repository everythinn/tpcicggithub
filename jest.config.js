module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/project/**/*.test.js',
    '**/project/tests/**/*.spec.js'
  ],
  collectCoverageFrom: [
    'project/**/*.js',
    '!project/**/*.test.js',
    '!project/**/*.spec.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
