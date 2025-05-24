/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '\.css$': 'identity-obj-proxy',
    // Handle image imports
    '\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      // Use React 17+ automatic JSX transform
      jsx: 'react-jsx',
      useESM: true
    }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(.*(react|@testing-library))/).*/'
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx']
};

module.exports = config;
