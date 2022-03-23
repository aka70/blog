const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  roots: ["<rootDir>/src/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
