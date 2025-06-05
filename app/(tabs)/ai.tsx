import React, { useRef } from "react";
import { useTheme } from "@/contexts/theme.context";
import { generateAPIUrl } from "@/utils";
import { useChat } from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";
import { View, TextInput, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ai() {
  const { isDarkMode } = useTheme();
  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl("/v1/ai/chat"),
    onError: (error) => {
      console.error("Chat API error:", error);
      if (error instanceof Error) {
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
      }
    },
  });

  const scrollViewRef = useRef<ScrollView>(null);

  if (error)
    return (
      <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-dark" : "bg-white"}`}>
        <ScrollView>
          <Text>Error: {error.message}</Text>
          <Text selectable>{JSON.stringify(error, null, 2)}</Text>
        </ScrollView>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-dark" : "bg-white"}`}>
      <View className="flex-1 px-2">
        <ScrollView
          className="flex-1"
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((m) => (
            <View
              key={m.id}
              className={`my-2 ${m.role === "user" ? "items-end" : "items-start"}`}
            >
              <View
                className={`max-w-[80%] px-4 py-2 rounded-xl ${m.role === "user" ? (isDarkMode ? "bg-primary" : "bg-blue-200") : isDarkMode ? "bg-zinc-700" : "bg-zinc-300"}`}
              >
                <Text
                  className={`text-sm ${isDarkMode ? "text-white" : "text-black"} font-medium text-lg`}
                >
                  {m.content}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="my-4 flex-row items-center space-x-4 gap-2">
          <TextInput
            className={`flex-1 px-4 h-12 rounded-full ${isDarkMode ? "bg-secondary text-white" : "bg-zinc-100 text-black"}`}
            placeholder="Ask anything"
            placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
            value={input}
            onChange={(e) =>
              handleInputChange({
                ...e,
                target: {
                  ...e.target,
                  value: e.nativeEvent.text,
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            onSubmitEditing={(e) => {
              handleSubmit(e);
              e.preventDefault();
            }}
          />
          <Text
            onPress={() => handleSubmit({ preventDefault: () => {} } as any)}
            className={`px-4 py-2 rounded-full ${isDarkMode ? "bg-primary text-white" : "bg-primary text-white"} font-medium`}
          >
            Send
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
