import React from "react";
import { Tabs } from "expo-router";
import {
  View,
  Platform,
  Pressable,
  ImageSourcePropType,
  Image,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { colors, icons } from "@/constants";

const TabBarIcons = ({
  focused,
  icon,
  imageUrl,
  size,
}: {
  focused: boolean;
  icon?: any;
  imageUrl?: ImageSourcePropType;
  size: number;
}) => {
  return (
    <View
      className={`justify-center items-center w-12 h-12 ${focused && "rounded-full bg-white/20"}`}
    >
      {imageUrl ? (
        <Image
          source={imageUrl}
          tintColor={focused ? "#fff" : "#888"}
          resizeMode="contain"
          className="w-7 h-7"
        />
      ) : (
        <Entypo name={icon} size={size} color={focused ? "#fff" : "#888"} />
      )}
    </View>
  );
};

const NoEffectTabButton = ({ children, onPress }: any) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={null}
      className="flex-1 flex flex-col items-center justify-center"
    >
      {children}
    </Pressable>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 0,
          backgroundColor: colors.primary,
          paddingTop: 0,
          borderRadius: 50,
          marginBottom: 25,
          marginHorizontal: 25,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          position: "absolute",
          borderTopWidth: 0,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              overflow: "hidden",
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} imageUrl={icons.home} size={24} />
          ),
          tabBarButton: (props) => <NoEffectTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} imageUrl={icons.map} size={24} />
          ),
          tabBarButton: (props) => <NoEffectTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          tabBarStyle: { display: "none" }, // Hide tab bar for AI screen
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} imageUrl={icons.ai} size={24} />
          ),
          tabBarButton: (props) => <NoEffectTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarStyle: { display: "none" }, // Hide tab bar for Chats screen
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} imageUrl={icons.chat} size={24} />
          ),
          tabBarButton: (props) => <NoEffectTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} imageUrl={icons.profile} size={24} />
          ),
          tabBarButton: (props) => <NoEffectTabButton {...props} />,
        }}
      />
    </Tabs>
  );
}
