import { Stack } from "expo-router";
import "./global.css";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { router } from "expo-router";
import { account } from "@/lib/auth";
import * as QuickActions from "expo-quick-actions";
import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
    "Lato-Italic": require("../assets/fonts/Lato-Italic.ttf"),
    "Lato-BoldItalic": require("../assets/fonts/Lato-BoldItalic.ttf"),
  });

  useEffect(() => {
    QuickActions.setItems([
      {
         "title": "Wait! Don't delete me!",
         "subtitle": "We're here to help",
         icon: Platform.OS === "ios" ? "symbol:person.crop.circle.badge.questionmark" : undefined,
         id: "0",
         params: { href: "/help" },
      },
    ]);
  }, []);
  
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession('current');
        console.log(session.provider);
        console.log(session.providerUid);
        console.log(session.providerAccessToken);
        router.replace("/onboarding");
        if (parseInt(session.providerAccessTokenExpiry) < Date.now() || session.providerAccessTokenExpiry === null) {
          const promise = account.updateSession(session.$id);
          promise.then(function (response) {
            console.log(response); // Success
          }, function (error) {
            console.log(error); // Failure
        });
        }
      } catch (error) {
        console.log("No active session:", error);
        router.replace("/auth");
      }
    };
    
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      checkSession();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
