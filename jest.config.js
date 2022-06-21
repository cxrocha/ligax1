module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jestSetupFile.js'],
  testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],
  setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      'jest-styled-components'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
      'src/**/*.tsx',
      '!src/**/*.spec.tsx',
      '**/*.{js,jsx}',
      '!**/index.js',
      '!**/coverage/**',
      '!**/node_modules/**',
      '!**/babel.config.js',
      '!**/jest.setup.js',
      '!**/jest.config.js',
      '!**/metro.config.js'
  ],
  coverageReporters: ['lcov']
};