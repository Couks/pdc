import "@/styles/global.css";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { AuthProvider } from "@/hooks/auth/AuthContext";
import Animated, { FadeOut, SlideInLeft } from "react-native-reanimated";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <AuthProvider>
      <StatusBar
        style="auto"
        backgroundColor={colorScheme == "light" ? "#00D09E" : "#052224"}
      />
      <Animated.View
        className="flex-1"
        entering={SlideInLeft}
        exiting={FadeOut}
      >
        <Slot />
      </Animated.View>
    </AuthProvider>
  );
}
