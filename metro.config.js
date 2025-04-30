const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.unstable_enablePackageExports = true; 
const nativeWindConfig = withNativeWind(config, { input: './app/global.css' });

module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);