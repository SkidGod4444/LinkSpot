
const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
    if (IS_DEV) {
      return 'com.saidevdhal.mvp.dev';
    }
  
    if (IS_PREVIEW) {
      return 'com.saidevdhal.mvp.preview';
    }
  
    return 'com.saidevdhal.mvp';
  };

const getAppName = () => {
    if (IS_DEV) {
      return 'MVP (Dev)';
    }
  
    if (IS_PREVIEW) {
      return 'MVP (Preview)';
    }
  
    return 'MVP';
  };
  
export default ({ config }) => ({
    ...config,
    // name: getAppName(),
    // ios: {
    //   bundleIdentifier: getUniqueIdentifier(),
    //   appName: getAppName(),
    // },
    // android: {
    //   package: getUniqueIdentifier(),
    //   appName: getAppName(),
    // },
  });