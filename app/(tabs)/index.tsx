import { Button, Text, View } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/auth.context";
import ThemeToggler from "@/components/custom/theme.toggler";
import { useTheme } from "@/contexts/theme.context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { logout } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-center ${isDarkMode ? "bg-dark" : "bg-white"}`}
    >
      <Text className="text-red-500 font-lato-bold text-2xl">
        Fuck ChatGPT!
      </Text>
      <Link href="/auth">
        <Text>Auth</Text>
      </Link>
      <Link href="/onboarding">
        <Text>Onboarding</Text>
      </Link>
      <Link href="/offline">
        <Text>Offline</Text>
      </Link>
      <ThemeToggler />
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
}
