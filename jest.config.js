module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es)'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
  coverageDirectory: 'tests/coverage',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/src/**/?(*.)+(spec|test).js?(x)']
};
