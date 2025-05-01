import { Stack } from "expo-router";
import "./global.css";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { authClient } from "@/lib/auth/client";
import { router } from "expo-router";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
    "Lato-Italic": require("../assets/fonts/Lato-Italic.ttf"),
    "Lato-BoldItalic": require("../assets/fonts/Lato-BoldItalic.ttf"),
  });
  const { data: session } = authClient.useSession();
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    if (session) {
      router.navigate("/onboarding");
    } else {
      router.navigate("/auth");
    }
  }, [fontsLoaded, session]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
