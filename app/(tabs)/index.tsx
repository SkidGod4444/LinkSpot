import { Button, Text, View } from "react-native";
import * as Speech from "expo-speech";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants";

export default function Index() {
  const { logout } = useAuth();

  const speak = () => {
    const thingToSay = "Fuck off, Good night.";
    Speech.speak(thingToSay);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-red-500 font-lato-bold text-2xl">
        Fuck ChatGPT!
      </Text>
      <Button title="Press to ASK AI" onPress={speak} />
      <Link href="/auth">
        <Text>Auth</Text>
      </Link>
      <Link href="/onboarding">
        <Text>Onboarding</Text>
      </Link>
      <Link href="/offline">
        <Text>Offline</Text>
      </Link>
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
}
