import Constants from "expo-constants";

const APP_VARIANT = Constants.expoConfig?.extra?.APP_VARIANT;
const IS_DEV = APP_VARIANT === "development";
const ORIGIN = Constants.expoConfig?.extra?.ORIGIN;

export const generateAPIUrl = (relativePath: string) => {
  const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

  if (IS_DEV) {
    if (!ORIGIN) {
      throw new Error("ORIGIN is not defined in development");
    }
    return ORIGIN.concat(path);
  }

  if (!ORIGIN) {
    throw new Error("ORIGIN is not defined");
  }

  return ORIGIN.concat(path);
};
