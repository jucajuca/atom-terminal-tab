/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: false }]
  },
  testMatch: ['**/spec/**/*.spec.ts?(x)', '**/*.test.ts?(x)'],
  moduleNameMapper: {
    '^atom$': '<rootDir>/lib/atom.ts'
  },
  collectCoverageFrom: [
    'lib/**/*.ts?(x)',
    '!lib/**/*.d.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts']
};

module.exports = config;
