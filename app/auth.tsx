import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { account } from "@/lib/auth"; // Ensure this points to the correct auth module
import { ID, Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function AuthPage() {
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (loggedInUser) {
      router.replace('/onboarding');
    }
  }, [loggedInUser]);

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      setError('');
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      setLoading(true);
      setError('');
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      
      // Update user preferences
      try {
        const response = await account.updatePrefs({defaultTheme: 'light', isOnboarded: false});
        console.log('Preferences updated:', response);
      } catch (prefError) {
        console.log('Failed to update preferences:', prefError);
      }
      
      router.replace('/onboarding');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      setLoading(false);
    }
  }

  const handleSubmit = () => {
    if (isLogin) {
      login(email, password);
      console.log("login with email: ", email, "and password: ", password);
    } else {
      if (!name) {
        setError('Name is required');
        return;
      }
      if (password !== confPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      register(email, password, name);
      console.log("register with email: ", email, "and password: ", password, "and name: ", name);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      className="flex-1"
      blurRadius={4}
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 justify-start items-start mx-10 px-2 mt-10">
              <Text className="text-4xl font-lato-bold-italic text-white">
                hi, this is linkspot.
              </Text>
              <Text className="text-xl font-lato-italic text-white mt-8">
                One single app for all your social media needs. Get connected with
                people around you.
              </Text>
              <Text className="text-xl font-lato-italic text-white mt-8">
            Just tap to connect and start chatting. No more awkward
            conversations. No more missed connections.
          </Text>
            </View>

            <View className="mx-10 mb-10 bg-white/10 rounded-2xl p-4">
              {/* <Text className="text-2xl font-lato-bold text-white mb-6">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Text> */}
              
              {!isLogin && (
                <View className="mb-4">
                  <Text className="text-white font-lato-regular mb-2">Name</Text>
                  <TextInput
                    className="bg-white/20 text-white p-3 rounded-lg font-lato-regular"
                    placeholder="Your name"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              )}
              
              <View className="mb-4">
                <Text className="text-white font-lato-regular mb-2">Email</Text>
                <TextInput
                  className="bg-white/20 text-white p-3 rounded-lg font-lato-regular"
                  placeholder="your@email.com"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              
              <View className="mb-6">
                <Text className="text-white font-lato-regular mb-2">Password</Text>
                <TextInput
                  className="bg-white/20 text-white p-3 rounded-lg font-lato-regular"
                  placeholder="••••••••"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {!isLogin && (
                <View className="mb-4">
                  <Text className="text-white font-lato-regular mb-2">Confirm Password</Text>
                <TextInput
                  className="bg-white/20 text-white p-3 rounded-lg font-lato-regular"
                  placeholder="••••••••"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  secureTextEntry
                  value={confPassword}
                  onChangeText={setConfPassword}
                />
                </View>
              )}
              
              {error ? (
                <Text className="text-red-400 font-lato-regular mb-4">{error}</Text>
              ) : null}

              <TouchableOpacity 
                activeOpacity={0.8} 
                className="btn-secondary mb-4"
                onPress={handleSubmit}
                disabled={loading}
              >
                <View className="flex-row items-center justify-center">
                  <Text className="text-black font-lato-bold text-lg text-center">
                    {loading ? 'Signing in...' : isLogin ? 'Sign In' : 'Sign Up'}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={() => setIsLogin(!isLogin)}
              >
                <Text className="text-white font-lato-regular text-center">
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-center mb-10 px-16 mt-auto">
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
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
