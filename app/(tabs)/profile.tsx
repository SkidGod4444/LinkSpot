import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants";

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View>
        <Text>Profile</Text>
      </View>
    </SafeAreaView>
  );
}
