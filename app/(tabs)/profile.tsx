import { View, Text, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/theme.context";
import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const { isDarkMode } = useTheme();
  
  const menuItems = [
    { icon: "person-outline", title: "Edit Profile", color: "#FF6B6B" },
    { icon: "calendar-outline", title: "My Meetups", color: "#4ECDC4" },
    { icon: "people-outline", title: "My Clubs", color: "#45B7D1" },
    // { icon: "location-outline", title: "Saved Locations", color: "#96CEB4" },
    { icon: "settings-outline", title: "Settings", color: "#A1A1AA" },
    { icon: "help-circle-outline", title: "Help & Support", color: "#A1A1AA" },
    // { icon: "log-out-outline", title: "Logout", color: "#FF9999" },
  ];

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-dark" : "bg-white"}`}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 50 }}>

        <View className="relative">
        <View className="h-48 w-full relative">
    <Image 
      source={images.banner}
      className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-20"
      resizeMode="cover"
    />
  </View>
          <View className="items-center -mt-16">
            <View className="relative">
              <Image 
                source={images.fallbackPFP}
                className="w-28 h-28 rounded-full mb-4 border-2 border-primary"
              />
              <TouchableOpacity className="absolute bottom-6 right-0 bg-primary p-1 rounded-xl">
                <Ionicons name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              John Doe
            </Text>
            <Text className={`text-lg ${isDarkMode ? "text-accent" : "text-gray-600"}`}>
              @johndoe
            </Text>
            <Text className={`text-lg mt-2 px-8 text-center ${isDarkMode ? "text-accent" : "text-gray-600"}`}>
              Tech enthusiast | Coffee lover ☕ | Always up for a meetup!
            </Text>
          </View>
        </View>

        {/* Stats Section with Cards */}
        <View className="flex-row justify-around mt-6 px-4">
          <View className="items-center">
            <Text className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>12</Text>
            <Text className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Meetups</Text>
          </View>
          <View className="items-center">
            <Text className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>3</Text>
            <Text className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Organized</Text>
          </View>
          <View className="items-center">
            <Text className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>256</Text>
            <Text className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Followers</Text>
          </View>
          <View className="items-center">
            <Text className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>128</Text>
            <Text className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Following</Text>
          </View>
        </View>

        {/* Menu Items with Icons */}
        <View className="py-6 px-4 mt-5">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => console.log(`${item.title} pressed`)}
              activeOpacity={0.9}
              className={`flex-row items-center p-4 mb-3 rounded-xl ${
                isDarkMode ? "bg-secondary" : "bg-gray-50"
              } border`}
            >
              <View 
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={24} 
                  color={item.color}
                />
              </View>
              <Text 
                className={`ml-4 text-lg font-medium ${isDarkMode ? "text-white" : "text-black"}`}
              >
                {item.title}
              </Text>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={isDarkMode ? "#666" : "#999"}
                className="ml-auto"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
