import { Button, Text, View } from "react-native";
import * as Speech from 'expo-speech';


export default function Index() {
  const speak = () => {
    const thingToSay = 'Fuck off, Good night.';
    Speech.speak(thingToSay);
  };


  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500 font-lato-bold text-2xl">Fuck ChatGPT!</Text>
      <Button title="Press to ASK AI" onPress={speak} />
    </View>
  );
}
