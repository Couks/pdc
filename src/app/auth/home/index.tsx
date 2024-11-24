import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";
import { Button } from "@/components/common/Button";
import { BlurView } from "expo-blur";

export default function AuthIndex() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-8 justify-center">
        <View className="flex-1 rounded-3xl overflow-hidden">
          <BlurView intensity={60} tint="light" style={{ flex: 1 }}>
            <View className="flex-1 p-8 justify-center">
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                layout={LinearTransition.springify()}
                className="items-center mb-4"
              >
                <Image
                  source={require("@/assets/logo.png")}
                  style={{ width: 300, height: 200 }}
                  resizeMode="contain"
                />

                <Text className="text-lg text-muted-foreground dark:text-muted-foreground text-center mt-3">
                  Gerencie seus exames e consultas de forma simples
                </Text>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.delay(200).duration(1000).springify()}
                layout={LinearTransition.springify()}
                className="gap-4 items-center"
              >
                <Link href="/auth/login" asChild>
                  <Button
                    variant="default"
                    className="w-full h-14"
                    label="Entrar"
                    textClass="text-lg"
                  />
                </Link>

                <Link href="/auth/register" asChild>
                  <Button
                    variant="secondary"
                    className="w-full h-14 bg-white/70 dark:bg-background/70"
                    label="Criar Conta"
                    textClass="text-lg"
                  />
                </Link>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.delay(400).duration(1000).springify()}
                layout={LinearTransition.springify()}
                className="mt-12"
              >
                <Text className="text-base text-muted-foreground dark:text-muted-foreground text-center">
                  Ao continuar, você concorda com nossos{" "}
                  <Text className="text-primary dark:text-primary">
                    Termos de Serviço
                  </Text>{" "}
                  e{" "}
                  <Text className="text-primary dark:text-primary">
                    Política de Privacidade
                  </Text>
                </Text>
              </Animated.View>
            </View>
          </BlurView>
        </View>
      </View>
    </SafeAreaView>
  );
}
