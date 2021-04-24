module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'tests/coverage',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/src/**/?(*.)+(spec|test).js?(x)']
};
