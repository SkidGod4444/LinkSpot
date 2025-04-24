import React from 'react'
import { Tabs } from 'expo-router'
import { View, Platform, Pressable } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

const TabBarIcons = ({ focused, icon, title, size }: { focused: boolean, icon: any, title: string, size: number }) => {
  return (
    <View className='flex-1 flex flex-col justify-center items-center'>
      <Entypo name={icon} size={size} color={focused ? '#000' : '#888'} />
    </View>
  )
}

const NoEffectTabButton = ({ children, onPress }: any) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={null}
      className='flex-1 flex flex-col items-center justify-center'
    >
      {children}
    </Pressable>
  )
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          height: 64,
          paddingBottom: 5,
          paddingTop: 0,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              overflow: 'hidden',
            },
            android: {
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              backgroundColor: '#fff',
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} icon="home" title="Home" size={24} />
          ),
          tabBarButton: (props) => <NoEffectTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} icon="globe" title="Explore" size={24} />
          ),
          tabBarButton: (props) => <NoEffectTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} icon="chat" title="Chats" size={24} />
          ),
          tabBarButton: (props) => <NoEffectTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcons focused={focused} icon="user" title="Profile" size={24} />
          ),
          tabBarButton: (props) => <NoEffectTabButton {...props} />,
        }}
      />
    </Tabs>
  )
}