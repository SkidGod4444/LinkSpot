import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import {
  View,
  Platform,
  Pressable,
  ImageSourcePropType,
  Image,
  Keyboard,
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
      className={`justify-center items-center w-11 h-11 ${focused && "rounded-xl bg-accent/30"}`}
    >
      {imageUrl ? (
        <Image
          source={imageUrl}
          tintColor={focused ? "white" : colors.accent}
          resizeMode="contain"
          className="w-8 h-8"
        />
      ) : (
        <Entypo name={icon} size={size} color={focused ? "white" : colors.accent} />
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: keyboardVisible ? { display: "none" } : {
          height: 60,
          paddingBottom: 0,
          backgroundColor: colors["dark-accent"],
          borderColor: colors.secondary,
          borderWidth: 2,
          paddingTop: 0,
          borderRadius: 20,
          marginBottom: Platform.OS === "ios" ? 35 : 5,
          marginHorizontal: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          position: "absolute",
          borderTopWidth: 1,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              overflow: "hidden",
            },
            android: {
              elevation: 8,
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
        name="nearby"
        options={{
          title: "Nearby",
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
          title: "Chats",
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
