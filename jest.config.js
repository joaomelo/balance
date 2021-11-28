module.exports = {
  testEnvironment: "./tests/config/environment.js",
  collectCoverageFrom: ["src/**/*.js", "src/**/*.jsx"],
  coverageDirectory: "tests/coverage",
  testTimeout: 30000, // e2e tests more time than the default 5s
  testMatch: ["**/__tests__/**/*.js?(x)", "**/src/**/?(*.)+(spec|test).js?(x)"],
};
