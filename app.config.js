
const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';
const LOCAL_IP = 'http://localhost:3001'; // Replace with your actual machine IP if different
const ORIGIN = IS_DEV
  ? LOCAL_IP
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
        backgroundColor: "#000000",
      },
    ],
    [
      'expo-location',
      {
        isAndroidBackgroundLocationEnabled: true,
        isIosBackgroundLocationEnabled: true,
        locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location.",
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
    deploymentTarget: '12.0',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      UIBackgroundModes: ["location"],
      NSLocationWhenInUseUsageDescription: 'Allow this app to use your location.',
      NSLocationAlwaysUsageDescription: 'Allow this app to always access your location.',
      NSLocationAlwaysAndWhenInUseUsageDescription: 'Allow this app to access your location.',
    },
    entitlements: {
      'com.apple.developer.networking.wifi-info': true,
    },
    config: {
      googleMapsApiKey: process.env.GOOGLE_API_KEY,
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
    permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "FOREGROUND_SERVICE",
        "FOREGROUND_SERVICE_LOCATION",
        "FOREGROUND_SERVICE_NOTIFICATION",
        "FOREGROUND_SERVICE_BACKGROUND_AUDIO",
        "CAMERA",
        "RECORD_AUDIO"
      ],
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_API_KEY,
        },
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
    output: 'server',
    favicon: './assets/images/favicon.png',
  },
  extra: {
    APP_VARIANT: IS_DEV ? "development" : "preview",
    ORIGIN: ORIGIN,
    router: {
      origin: false,
    },
    eas: {
      projectId: 'c7c6654a-3505-40df-a265-9dde4fee3739',
    },
  },
});