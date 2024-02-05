/** @type {import('jest').Config} */
const config = {
    verbose: true,
    preset: 'react-native',
    testEnvironment: 'node',
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@gorhom|@react-navigation|@react-native-community|@react-navigation/.*|@react-native-paper|@react-native-async-storage|@react-native-async-storage/.*|@react-native-picker|@react-native-picker/.*|@react-native-picker/picker)'
    ],
    collectCoverage: true,
    collectCoverageFrom: [
      '**/*.{js,jsx}',
      '!**/coverage/**',
      '!**/node_modules/**',
      '!**/babel.config.js',
      '!**/jest.setup.js'
    ]
  };