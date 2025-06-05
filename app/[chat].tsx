import { Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@/contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
  const { chat: chatId } = useLocalSearchParams();
  const isDarkMode = useTheme();

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-center ${isDarkMode ? "bg-dark" : "bg-white"}`}
    >
      <Text>{chatId}</Text>
    </SafeAreaView>
  );
}
