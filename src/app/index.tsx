import { Button } from "@/components/Button";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Link } from "expo-router";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Animated, {
  BounceInLeft,
  BounceInRight,
  BounceOutLeft,
  BounceOutRight,
  Easing,
  FadeIn,
  PinwheelIn,
  PinwheelOut,
} from "react-native-reanimated";

export default function Home() {
  return (
    <Animated.View
      entering={FadeIn.delay(100).duration(1000).springify()}
      className="flex-1 items-center justify-center bg-white gap-6 dark:bg-green-700"
    >
      <View className="items-center mb-4">
        <Animated.Image
          entering={PinwheelIn.delay(200).duration(1000).springify()}
          exiting={PinwheelOut.duration(600)}
          source={require("../assets/logo.png")}
          alt="Logo"
          style={{
            resizeMode: "contain",
            height: 200,
            width: 700,
          }}
        />
      </View>

      <Link href="/screens/login/LoginScreen">
        <Animated.View
          entering={BounceInLeft.delay(400).duration(400).easing(Easing.ease)}
          exiting={BounceOutRight.duration(400)}
        >
          <Button label="Entrar" variant="default" size="lg" className="w-60" />
        </Animated.View>
      </Link>

      <Link href="/screens/login/SignupScreen">
        <Animated.View
          entering={BounceInLeft.delay(400).duration(400).easing(Easing.ease)}
          exiting={BounceOutRight.duration(400)}
        >
          <Button
            label="Criar Conta"
            variant="light"
            size="lg"
            className="w-60"
          />
        </Animated.View>
      </Link>

      <Link href="/screens/login/(forgotPassword)/ForgotPassword" asChild>
        <TouchableOpacity>
          <Text className="dark:text-white text-md text-purple-800 font-bold">
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
      </Link>
      <ToggleTheme />
    </Animated.View>
  );
}
