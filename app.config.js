const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';
const ORIGIN = IS_DEV
  ? 'http://localhost:3001'
  : process.env.ORIGIN;

const getUniqueIdentifier = () => {
  if (IS_DEV) return 'com.saidevdhal.mvp.dev';
  if (IS_PREVIEW) return 'com.saidevdhal.mvp.preview';
  return 'com.saidevdhal.mvp';
};

const getAppName = () => {
  if (IS_DEV) return 'LinkSpot (Dev)';
  if (IS_PREVIEW) return 'LinkSpot (Preview)';
  return 'LinkSpot';
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
  deepLinking: true,
  plugins: [
    'expo-localization',
    'expo-quick-actions',
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
        faceIDPermission: "Allow $(PRODUCT_NAME) to access your Face ID biometric data."
      }
    ],
    [
      'expo-router', 
      {
        origin: ORIGIN
      }
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/images/icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#000000',
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
      foregroundImage: './assets/images/icon.png',
      backgroundColor: '#000000',
    },
    intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "https",
              host: "*.webapp.io",
              pathPrefix: "/records"
            }
          ],
          category: ["BROWSABLE", "DEFAULT"]
        }
      ]
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