import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurFade } from "@/components/anim/blur-fade";
import { TypingAnimation } from "@/components/anim/type-writer";
import Modal from "@/components/ui/modal";

export default function OnboardingPage() {
  const [time, setTime] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermsModalOpen, setIsPermsModalOpen] = useState(false);

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
      source={require("../assets/images/onboarding.bg.png")}
      className="flex-1"
    >
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
            >
              <Text className="text-white font-lato-bold text-lg text-center">
                Get Started
              </Text>
              <Text className="text-gray-500 font-lato-bold text-lg text-center ml-2">
                {time}s
              </Text>
            </TouchableOpacity>
          </BlurFade>
        </View>
      </SafeAreaView>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <View className="justify-center items-center w-full rounded-xl p-4 bg-white">
          <Text>Modal</Text>
        </View>
      </Modal>
    </ImageBackground>
  );
}
