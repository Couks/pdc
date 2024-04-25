import { Slot } from "expo-router";
import { View, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function Layout() {
  return (
    <Header>
      <Slot />
    </Header>
  );
}

const Header = () => {
  return (
    <Animated.View
      entering={FadeIn.delay(200).duration(1000).springify()}
      exiting={FadeOut.delay(200).duration(1000).springify()}
      className="w-full h-full items-center bg-green-500 dark:bg-green-700"
    >
      <Text className="font-bold text-3xl dark:text-white py-12">
        Bem Vindo{" "}
      </Text>

      <Animated.View
        entering={FadeIn.delay(200).duration(1000).springify()}
        exiting={FadeOut.delay(200).duration(1000).springify()}
        className="flex-1 w-full rounded-t-[35px] bg-white dark:bg-purple-800"
      >
        <Slot />
      </Animated.View>
    </Animated.View>
  );
};
