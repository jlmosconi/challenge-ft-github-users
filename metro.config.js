const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    // blacklistRE: exclusionList([
    //   /ios\/build\/SourcePackages\/checkouts\/grpc-ios\/native_src\/examples\/.*/,
    // ]),
    // resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
  },
};

// module.exports = mergeConfig(defaultConfig, config);

module.exports = withStorybook(mergeConfig(defaultConfig, config), {
  // Set to false to remove storybook specific options
  // you can also use a env variable to set this
  enabled: true,
  // Path to your storybook config
  configPath: path.resolve(__dirname, './.rnstorybook'),
  // note that this is the default so you can the config path blank if you use .rnstorybook

  // Optional websockets configuration
  // Starts a websocket server on the specified port and host on metro start
  // websockets: {
  //   port: 7007,
  //   host: 'localhost',
  // },
});
