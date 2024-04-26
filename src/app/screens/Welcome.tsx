import { Button } from "@/components/Button";
import { ToggleTheme } from "@/components/ToggleTheme";
import { View, Text, TouchableOpacity } from "react-native";
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

export default function Home({ navigation }: { navigation: any }) {
  return (
    <Animated.View
      entering={FadeIn.delay(1000).duration(1000).springify()}
      className="flex-1 items-center justify-center bg-white gap-4 dark:bg-green-700"
    >
      <View className="items-center mb-4">
        <Animated.Image
          entering={PinwheelIn.delay(1200).duration(1000).springify()}
          exiting={PinwheelOut.delay(1600).duration(1000)}
          source={require("@/assets/logo.png")}
          alt="Logo"
          style={{
            resizeMode: "contain",
            height: 200,
            width: 700,
          }}
        />
      </View>
      <Animated.View
        entering={BounceInLeft.delay(1200).duration(1000).easing(Easing.ease)}
        exiting={BounceOutRight.duration(1000)}
        className="z-[9999]"
      >
        <Button
          label="Entrar"
          variant="default"
          size="lg"
          className="w-60"
          onPress={() => navigation.navigate("LoginScreen")}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInRight.delay(1200).duration(1000).easing(Easing.ease)}
        exiting={BounceOutLeft.duration(1000)}
      >
        <Button
          label="Criar Conta"
          variant="light"
          size="lg"
          className="w-60"
          onPress={() => navigation.navigate("SignUpScreen")}
        />
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text className="dark:text-white text-md text-purple-800 font-bold">
          Esqueceu sua senha?
        </Text>
      </TouchableOpacity>
      <ToggleTheme />
    </Animated.View>
  );
}
