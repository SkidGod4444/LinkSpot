import { View, Text, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurFade } from "@/components/anim/blur-fade";
import { TypingAnimation } from "@/components/anim/type-writer";
import Modal from "react-native-modal";
import { account } from "@/lib/auth";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function OnboardingPage() {
  const [time, setTime] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompleteSetup = async () => {
    setIsModalOpen(false);
    await account.updatePrefs({isOnboarded: true});
    router.replace('/(tabs)');
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
    if (time === 0) {
      setIsModalOpen(true);
    }
    return () => clearInterval(timer);
  }, [time]);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      className="flex-1"
      blurRadius={4}
    >
      <StatusBar style="light" />
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center items-center px-4 mt-60">
          <TypingAnimation
            duration={40}
            text={`"The closest bonds often begin with a simple hello to a stranger. Connect with the world around you."`}
            className="text-xl font-lato-italic text-white"
          />
          <TypingAnimation
            duration={50}
            delay={5555}
            text="- Saidev Dhal, CEO"
            className="text-xl font-lato-italic text-white mt-2"
          />
        </View>

        <View className="flex-1 justify-end items-center mb-20">
          <BlurFade delay={6}>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row btn-primary mt-5"
              onPress={() => setIsModalOpen(true)}
              // onPress={handlePresentModalPress}
            >
              <Text className="text-white font-lato-bold text-lg text-center">
                Get Started
              </Text>
              <Text className="text-gray-500 font-lato-bold text-lg text-center ml-2">
                {time}s
              </Text>
            </TouchableOpacity>
          </BlurFade>

          <View>
          <Modal
        isVisible={isModalOpen}
        hasBackdrop={true}
        backdropOpacity={0.2}
        backdropColor="black"
        onBackdropPress={() => setIsModalOpen(false)}
        backdropTransitionOutTiming={600}
        className="flex-1 z-[500] items-center justify-center"
      >
        <View className="bg-white/90 p-5 w-5/6 rounded-2xl backdrop-blur-md">
          <Text className="text-black text-lg font-lato-bold mb-4">Complete Onboarding</Text>
          
          <View className="mb-4">
            <Text className="text-black font-lato-regular mb-2">Username</Text>
            <TextInput
              className="bg-white/70 text-black p-3 rounded-lg font-lato-regular"
              placeholder="Choose a username"
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-black font-lato-regular mb-2">Date of Birth</Text>
            <TextInput
              className="bg-white/70 text-black p-3 rounded-lg font-lato-regular"
              placeholder="MM/DD/YYYY"
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>

          <View className="mb-4">
            <Text className="text-black font-lato-regular mb-2">Gender</Text>
            <TextInput
              className="bg-white/70 text-black p-3 rounded-lg font-lato-regular"
              placeholder="Male, Female, Other"
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>

          <View className="mb-4">
            <Text className="text-black font-lato-regular mb-2">Location</Text>
            <TextInput
              className="bg-white/70 text-black p-3 rounded-lg font-lato-regular"
              placeholder="Enter your location"
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-black font-lato-regular mb-2">Interests</Text>
            <TextInput
              className="bg-white/70 text-black p-3 rounded-lg font-lato-regular"
              placeholder="Music, Sports, Technology, etc."
              placeholderTextColor="rgba(0,0,0,0.5)"
            />
          </View>
          
          <TouchableOpacity
            className="bg-black py-3 rounded-lg mt-2"
            activeOpacity={0.8}
            onPress={handleCompleteSetup}
          >
            <Text className="text-white font-lato-bold text-center">Complete Setup</Text>
          </TouchableOpacity>
        </View>
      </Modal>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
