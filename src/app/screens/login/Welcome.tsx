import Animated, {
  BounceInLeft,
  BounceInRight,
  BounceOutLeft,
  BounceOutRight,
  Easing,
  FadeIn,
  BounceInDown,
  BounceIn,
  FlipInEasyX,
} from "react-native-reanimated";

import { Button } from "@/components/ui/Button";
import { View, TouchableOpacity } from "react-native";
import { ToggleTheme } from "@/components/ui/ToggleTheme";

export function Home({ navigation }: { navigation: any }) {
  return (
    <Animated.View
      entering={FadeIn.delay(100).duration(200)}
      className="h-full items-center justify-center bg-white gap-4 dark:bg-primary-800"
    >
      <View className="items-center gap-4">
        <Animated.Image
          entering={BounceIn.delay(500).easing(Easing.ease)}
          source={require("@/assets/images/logo.png")}
          alt="Logo"
          style={{
            resizeMode: "contain",
            height: 200,
            width: 700,
          }}
        />

        <Animated.Text
          entering={FlipInEasyX.springify().delay(600).duration(20000)}
          className="text-secondary-800 dark:text-white font-medium text-[20px] text-center w-60"
        >
          What's Your Finances
        </Animated.Text>

        <Animated.View entering={BounceInLeft.delay(600)}>
          <Button
            label="Entrar"
            variant="default"
            className="w-60"
            onPress={() => navigation.navigate("SignInScreen")}
          />
        </Animated.View>

        <Animated.View entering={BounceInRight.delay(800)}>
          <Button
            label="Criar Conta"
            variant="light"
            onPress={() => navigation.navigate("SignUpScreen")}
          />
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Animated.Text
            entering={BounceIn.springify().delay(600)}
            className="dark:text-white text-lg text-secondary-800 font-bold"
          >
            Esqueceu sua senha?
          </Animated.Text>
        </TouchableOpacity>

        <ToggleTheme />
      </View>
    </Animated.View>
  );
}
