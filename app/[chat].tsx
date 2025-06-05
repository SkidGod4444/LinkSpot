import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { colors } from "@/constants";

export default function ChatScreen() {
  const { chat: chatId } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-white">{chatId}</Text>
    </SafeAreaView>
  );
}
