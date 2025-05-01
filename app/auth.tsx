import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthPage() {
  return (
    <ImageBackground
      source={require("../assets/images/onboarding.bg.png")}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center items-start mx-10 px-2 mt-40">
          <Text className="text-4xl font-lato-bold-italic text-white">
            hi, this is dime.
          </Text>
          <Text className="text-xl font-lato-italic text-white mt-8">
            One single app for all your social media needs. Get connected with
            people around you.
          </Text>

          <Text className="text-xl font-lato-italic text-white mt-8">
            Just tap to connect and start chatting. No more awkward
            conversations. No more missed connections.
          </Text>

          <Text className="text-xl font-lato-italic text-white mt-8">
            End to end encrypted.
          </Text>
          <Text className="text-xl font-lato-italic text-white">
            Fully open source.
          </Text>
        </View>

        <View className="flex-1 justify-end items-center mb-5">
          <TouchableOpacity activeOpacity={0.8} className="btn-primary">
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../assets/images/brands/google-logo.png")}
                className="w-6 h-6 mr-5"
              />
              <Text className="text-white font-lato-bold text-lg text-center">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} className="btn-secondary mt-5">
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../assets/images/brands/twitter-logo.png")}
                className="w-6 h-6 mr-5"
              />
              <Text className="text-black font-lato-bold text-lg text-center">
                Continue with Twitter
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center mb-10 px-16">
          <Text className="text-white font-lato-regular text-base text-center">
            By continuing, you agree to our{" "}
            <Text className="text-white font-lato-bold text-base text-center underline">
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text className="text-white underline font-lato-bold text-base text-center">
              Privacy Policy
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
