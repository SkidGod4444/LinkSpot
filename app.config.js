const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) return 'com.saidevdhal.mvp.dev';
  if (IS_PREVIEW) return 'com.saidevdhal.mvp.preview';
  return 'com.saidevdhal.mvp';
};

const getAppName = () => {
  if (IS_DEV) return 'MVP (Dev)';
  if (IS_PREVIEW) return 'MVP (Preview)';
  return 'MVP';
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  slug: 'mvp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  plugins: [
    'expo-localization',
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
        faceIDPermission: "Allow $(PRODUCT_NAME) to access your Face ID biometric data."
      }
    ],
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    [
      'expo-location',
      {
        isAndroidBackgroundLocationEnabled: true,
        isIosBackgroundLocationEnabled: true,
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Lato-Regular.ttf',
          './assets/fonts/Lato-Bold.ttf',
          './assets/fonts/Lato-Italic.ttf',
          './assets/fonts/Lato-BoldItalic.ttf',
        ],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
    supportsTablet: true,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    entitlements: {
      'com.apple.developer.networking.wifi-info': true,
    },
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    ...config.web,
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: 'c7c6654a-3505-40df-a265-9dde4fee3739',
    },
  },
});