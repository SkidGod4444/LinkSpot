import { View, Text, Pressable } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/theme.context";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  const getNextTheme = () => {
    if (theme === "light") return "Dark";
    if (theme === "dark") return "System";
    return "Light";
  };

  return (
    <View className="items-center justify-center">
      <Pressable
        onPress={toggleTheme}
        className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700"
      >
        <Text className="text-black dark:text-white">
          Switch to {getNextTheme()} Mode
        </Text>
      </Pressable>
    </View>
  );
}
