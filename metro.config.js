// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} **/
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('mjs');

// Désactivation de cette option qui cause souvent l'erreur _objectWithoutPropertiesLoose sur le Web avec Expo 51+
config.resolver.unstable_enablePackageExports = false;

config.resolver.unstable_conditionsByPlatform = {
  ios: ['react-native', 'require', 'import', 'default'],
  android: ['react-native', 'require', 'import', 'default'],
  web: ['react-native', 'require', 'import', 'default'],
};

module.exports = config;
