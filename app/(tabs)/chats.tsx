import { Text, FlatList, RefreshControl, View, Image } from "react-native";
import React, { useState } from "react";
import { chatRooms } from "@/utils/test.data";
import { Link } from "expo-router";
import { colors, icons, images } from "@/constants";
import { useTheme } from "@/contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chats() {
  const [refreshing, setRefreshing] = useState(false);
  const { isDarkMode } = useTheme();

  const onRefresh = () => {
    setRefreshing(true);
    console.log("Refreshing...");
    setTimeout(() => {
      setRefreshing(false);
      console.log("Refreshed");
    }, 2000);
  };

  return (
    <SafeAreaView
      className={`flex items-center justify-center ${isDarkMode ? "bg-dark" : "bg-white"}`}
    >
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          return (
            <Link
              href={{
                pathname: "/[chat]",
                params: { chat: item.id },
              }}
            >
              <View
                style={{
                  padding: 8,
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <ChatItem
                  title={item.title}
                  description={item.description}
                  isGroup={item.isGroup}
                />
                {/* <Image source={icons.chat} style={{ width: 20, height: 20 }} /> */}
              </View>
            </Link>
          );
        }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
      />
    </SafeAreaView>
  );
}

function ChatItem({
  title,
  description,
  isGroup,
}: {
  title: string;
  description: string;
  isGroup: boolean;
}) {
  return (
    <View className="flex-row items-center">
      {/* Enlarged Avatar */}
      <View className="w-16 h-16 rounded-full overflow-hidden mr-4">
        <Image
          source={images.fallbackPFP}
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
        />
      </View>
      {/* Chat Details */}
      <View className="flex-1 justify-center">
        <View className="flex-row items-center mb-1">
          <Text className="text-lg font-semibold text-white text-secondary">
            {title}
          </Text>
          {isGroup && (
            <Image
              source={icons.group}
              className="w-7 h-7 ml-2"
              style={{ tintColor: colors.secondary }}
            />
          )}
        </View>
        <Text className="text-sm text-white">{description}</Text>
      </View>
    </View>
  );
}
