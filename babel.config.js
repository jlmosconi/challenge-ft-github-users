const typescriptConfig = require('./tsconfig.json');

const tsModulePaths = Object.fromEntries(
  Object.entries(typescriptConfig.compilerOptions.paths).map(([key, value]) => [
    key.replace('/*', ''),
    typescriptConfig.compilerOptions.baseUrl + '/' + value[0].replace('/*', ''),
  ]),
);

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          ...tsModulePaths,
        },
      },
    ],
  ],
};
