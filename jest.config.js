module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '^.+\\.(css|scss|sass)$': '<rootDir>/mocks/styleMock.js',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'dist/',
    '<rootDir>/src/index.ts',
    '<rootDir>/src/components/index.ts',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts,tsx,jsx}',
    '!<rootDir>/src/**/*.stories.*',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
