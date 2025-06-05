import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, icons } from "@/constants";
import { router } from "expo-router";

export default function OfflinePage() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center px-6">
        <View className="bg-white/10 p-8 rounded-3xl items-center">
          <Image
            source={icons.redCross}
            resizeMode="contain"
            className="w-24 h-24 mb-6"
          />
          <Text className="text-white text-2xl font-lato-bold text-center mb-2">
            No Internet Connection
          </Text>
          <Text className="text-gray-400 text-base font-lato-regular text-center mb-8">
            Please check your connection and try again
          </Text>
          <Pressable
            onPress={() => router.replace("/")}
            className="bg-white/20 px-8 py-3 rounded-full"
          >
            <Text className="text-white font-lato-bold">Try Again</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
