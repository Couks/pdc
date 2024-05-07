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
  BounceInUp,
  BounceInDown,
  BounceOutUp,
  BounceIn,
} from "react-native-reanimated";
import { useToast } from "@/components/Toast";

export default function Home({ navigation }: { navigation: any }) {
  const { toast } = useToast();

  return (
    <Animated.View
      entering={FadeIn.delay(100).duration(200)}
      className="h-full items-center justify-center bg-white gap-4 dark:bg-green-700"
    >
      <View className="items-center mb-4">
        <Animated.Image
          entering={BounceIn.delay(500).duration(1000).easing(Easing.ease)}
          exiting={BounceInDown.delay(500)}
          source={require("@/assets/images/logo.png")}
          alt="Logo"
          style={{
            resizeMode: "contain",
            height: 200,
            width: 700,
          }}
        />
      </View>
      <Animated.View
        entering={BounceInLeft.delay(600)}
        exiting={BounceOutRight.delay(600)}
      >
        <Button
          label="Entrar"
          variant="default"
          size="lg"
          className="w-60"
          onPress={() => navigation.navigate("SignInScreen")}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInRight.delay(800)}
        exiting={BounceOutLeft.delay(800)}
      >
        <Button
          label="Criar Conta"
          variant="light"
          size="lg"
          onPress={() => navigation.navigate("SignUpScreen")}
        />
      </Animated.View>

      <Animated.View
        entering={BounceInRight.delay(800)}
        exiting={BounceOutLeft.delay(800)}
      >
        <Button
          label="teste toast"
          variant="light"
          size="lg"
          onPress={() => {
            toast("Conta criada com sucesso! 😁", "success");
          }}
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
