import { Text, FlatList, RefreshControl, View, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { chatRooms } from "@/utils/test.data";
import { Link } from "expo-router";
import { colors, icons, images } from "@/constants";
import { useTheme } from "@/contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Chats() {
  const [refreshing, setRefreshing] = useState(false);
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

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
      <View className="w-full px-4 py-3 border-b border-secondary bg-transparent flex-row items-center justify-between">
  {/* Search bar */}
  <View className={`flex-row items-center ${isDarkMode ? 'bg-secondary' : 'bg-gray-100'} rounded-xl px-4 py-3 mb-3`}>
          <Ionicons name="search-outline" size={20} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
          <TextInput
            placeholder="Search Chats..."
            placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            keyboardType="default"
            onSubmitEditing={() => {
              console.log("Search submitted:", searchQuery);
            }}
            className={`flex-1 ml-3 ${isDarkMode ? "text-white" : "text-black"}`}
          />
        </View>
</View>
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
                  image={item.image}
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
  image,
}: {
  title: string;
  description: string;
  isGroup: boolean;
  image?: string;
}) {
  return (
    <View className="flex-row items-center">
      {/* Enlarged Avatar */}
      <View className="w-16 h-16 rounded-full overflow-hidden mr-4">
        <Image
          source={image ? { uri: image } : images.fallbackPFP}
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
        />
      </View>
      {/* Chat Details */}
      <View className="flex-1 justify-center">
        <View className="flex-row items-center mb-1">
          <Text className="text-lg font-lato-regular text-white">
            {title}
          </Text>
          {isGroup && (
            <Image
              source={icons.group}
              className="w-7 h-7 ml-2 text-primary"
              tintColor={colors.accent}
            />
          )}
        </View>
        <Text className="text-sm text-accent">{description}</Text>
      </View>
    </View>
  );
}
