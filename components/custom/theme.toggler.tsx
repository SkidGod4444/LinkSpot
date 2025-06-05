import { View, Text, Pressable } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/theme.context";

export default function ThemeToggler() {
  const { isDarkMode, toggleTheme } = useTheme();
  const nextTheme = isDarkMode ? "light" : "dark";
  console.log("Next theme:", nextTheme);

  return (
    <View className="items-center justify-center">
      <Pressable
        onPress={toggleTheme}
        className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700"
      >
        <Text className="text-black dark:text-white">
          Switch to {nextTheme} mode
        </Text>
      </Pressable>
    </View>
  );
}
