module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/test/setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/__mocks__/bottom-sheet.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@storybook|@react-navigation|@react-native-community|@unimodules)',
  ],
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/__mocks__/svgMocks.js',
  },
};
