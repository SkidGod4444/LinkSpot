import { Stack } from "expo-router";
import "./global.css";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as QuickActions from "expo-quick-actions";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { AuthProvider, useAuth } from "@/contexts/auth.context";
import { RouteProvider } from "@/contexts/routes.context";
import { PermsProvider } from "@/contexts/perms.context";
import "@/lib/pollyfills";
import { ThemeProvider, useTheme } from "@/contexts/theme.context";
import { LocalStoreProvider } from "@/contexts/localstore.context";

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
        title: "Wait! Don't delete me!",
        subtitle: "We're here to help",
        icon:
          Platform.OS === "ios"
            ? "symbol:person.crop.circle.badge.questionmark"
            : undefined,
        id: "0",
        params: { href: "/help" },
      },
    ]);
  }, []);

  return (
    <AuthProvider>
      <AppContent fontsLoaded={fontsLoaded} />
    </AuthProvider>
  );
}

function AppContent({ fontsLoaded }: { fontsLoaded: boolean }) {
  const { loading } = useAuth();
  const { theme, isDarkMode } = useTheme();

  useEffect(() => {
    if (fontsLoaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  if (!fontsLoaded || loading) {
    return null;
  }

  console.log("Theme provider initialized with theme:", theme);
  return (
    <LocalStoreProvider>
      <PermsProvider>
        <RouteProvider>
          <ThemeProvider>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </RouteProvider>
      </PermsProvider>
    </LocalStoreProvider>
  );
}
