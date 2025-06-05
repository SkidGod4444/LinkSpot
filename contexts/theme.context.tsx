import { useLocalStore } from "@/contexts/localstore.context";
import React, { createContext, useEffect, useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => Promise<void>;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: async () => {},
  isDarkMode: true,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { getItem, setItem } = useLocalStore();
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await getItem("theme");
        console.log("Stored theme:", stored);

        // If stored theme is valid, use it
        if (stored === "dark" || stored === "light") {
          setTheme(stored);
        } else {
          // Default to dark theme if no valid theme is stored
          setTheme("dark");
          await setItem("theme", "dark");
        }
      } catch (error) {
        console.error("Error loading theme:", error);
        // Default to dark theme on error
        setTheme("dark");
        await setItem("theme", "dark");
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const next = theme === "dark" ? "light" : "dark";
      console.log("Switching to", next, "mode");
      setTheme(next);
      await setItem("theme", next);
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };

  const isDarkMode = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
