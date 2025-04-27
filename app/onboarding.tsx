import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function OnboardingPage() {
    const [time, setTime] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [time]);
    
  return (
    <ImageBackground 
      source={require('../assets/images/onboarding.bg.png')} 
      className='flex-1'
    >
      <SafeAreaView className='flex-1'>
        <View className='flex-1 justify-center items-center px-4 mt-60'>
          <Text className='text-xl font-lato-italic text-white mt-8'>
            "The closest bonds often begin with a simple hello to a stranger. Connect with the world around you."
          </Text>
          <Text className='text-xl font-lato-italic text-white mt-8'>
            - Saidev Dhal, CEO
          </Text>
        </View>

        <View className='flex-1 justify-end items-center mb-5'>
          <TouchableOpacity activeOpacity={0.8} className='btn-primary mt-5'>
            <View className='flex-row items-center justify-center'>
              <Text className='text-white font-lato-bold text-lg text-center'>
                Get Started
              </Text>
              <Text className='text-gray-500 font-lato-bold text-lg text-center ml-2'>
                {time}s
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}