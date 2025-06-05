// app/providers/ThemeContext.tsx

import { useLocalStore } from "@/contexts/localstore.context";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { View } from "react-native";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useSystemColorScheme();
  const { getItem, setItem } = useLocalStore();
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    // Load saved theme or fallback to system
    getItem("theme").then((stored) => {
      if (stored === "dark" || stored === "light" || stored === "system") {
        setTheme(stored);
      } else {
        setTheme("system");
      }
    });
  }, []);

  useEffect(() => {
    // Apply class for NativeWind
    const root = document?.documentElement; // only valid in web
    if (root) {
      root.classList.remove("light", "dark");
      const effectiveTheme =
        theme === "system" ? systemTheme || "light" : theme;
      root.classList.add(effectiveTheme);
    }
  }, [theme, systemTheme]);

  const toggleTheme = async () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(nextTheme);
    await setItem("theme", nextTheme);
  };

  const effectiveTheme = theme === "system" ? systemTheme || "light" : theme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <View
        className={effectiveTheme === "dark" ? "dark" : ""}
        style={{ flex: 1 }}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
