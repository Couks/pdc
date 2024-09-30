import Animated, {
  BounceInLeft,
  BounceInRight,
  Easing,
  FadeIn,
  BounceIn,
  FlipInEasyX,
} from "react-native-reanimated";

import { Button } from "@/components/ui/Button";
import { View, TouchableOpacity } from "react-native";
import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { useColorScheme } from "nativewind";

export function Home({ navigation }: { navigation: any }) {
  const { colorScheme } = useColorScheme();

  return (
    <Animated.View
      entering={FadeIn.delay(100)}
      className="h-screen items-center justify-center bg-white gap-4 dark:bg-secondary-900"
    >
      <View className="items-center gap-4">
        <View className="items-center">
          <Animated.Image
            entering={BounceIn.delay(500).easing(Easing.ease)}
            source={
              colorScheme === "dark"
                ? require("@/assets/images/logo.png")
                : require("@/assets/images/logo-black.png")
            }
            alt="Logo"
            style={{
              resizeMode: "contain",
              width: 300,
            }}
          />
          <Animated.Text
            entering={FlipInEasyX.springify().delay(600)}
            className="text-secondary-900 dark:text-white font-medium text-lg text-center -mt-6"
          >
            Plataforma de Diagnóstico da Doença de Chagas
          </Animated.Text>
        </View>

        <Animated.View entering={BounceInRight.delay(800)} className="mt-12">
          <Button
            label="Crie sua conta"
            onPress={() => navigation.navigate("SignUp")}
          />
        </Animated.View>

        <Animated.View entering={BounceInLeft.delay(600)}>
          <Button
            label="Conecte-se"
            variant="light"
            className="w-60"
            onPress={() => navigation.navigate("SignIn")}
          />
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Animated.Text
            entering={BounceIn.springify().delay(600)}
            className="dark:text-white text-xl text-secondary-900 font-light"
          >
            Esqueceu sua senha?
          </Animated.Text>
        </TouchableOpacity>

        <ToggleTheme />
      </View>
    </Animated.View>
  );
}
