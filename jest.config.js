module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    './__tests__/config/',
    './__tests__/helpers/',
  ],
  globalSetup: './__tests__/config/jest-setup.ts',
  globalTeardown: './__tests__/config/jest-teardown.ts',
};
