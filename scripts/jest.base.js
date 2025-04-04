const path = require('path');
module.exports = {
  collectCoverage: true,
  verbose: true,
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  setupFilesAfterEnv: [
    require.resolve('jest-dom/extend-expect'),
    path.resolve(__dirname, './global.ts'),
  ],
  // moduleNameMapper: process.env.TEST_ENV === 'production' ? undefined : alias,
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig.jest.json',
      diagnostics: false,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/esm/',
    '/lib/',
    'package.json',
    '/demo/',
    '/packages/builder/src/__tests__/',
    '/packages/builder/src/components/',
    '/packages/builder/src/configs/',
    'package-lock.json',
  ],
};
