import { Slot } from "expo-router";
import { useColorScheme } from "nativewind";
import { AuthProvider } from "@/hooks/auth/AuthContext";
import Animated, { FadeOut, SlideInLeft } from "react-native-reanimated";
import { ToastProvider } from "@/components/ui/Toast";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <AuthProvider>
      <ToastProvider>
        <Animated.View
          className="flex-1"
          entering={SlideInLeft}
          exiting={FadeOut}
        >
          <Slot />
        </Animated.View>
      </ToastProvider>
    </AuthProvider>
  );
}
