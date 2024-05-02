import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { handleAuthentication } from "@/services/Authentication";
import { useAuth } from "@/services/AuthContext";
import Header from "@/components/Header";
import { ToggleTheme } from "@/components/ToggleTheme";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const { setIsLogedIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleSignIn(data: any) {
    console.log(data);
  }

  return (
    <>
      <View className="flex-1 justify-around bg-white dark:bg-purple-800 rounded-t-[50px]">
        {/* Formulário*/}
        <View className="mx-6 gap-4">
          <View className="items-center gap-4 mb-8">
            <Animated.View
              entering={FadeInUp.duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
              className="w-full"
            >
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoComplete="email"
                    placeholder="Digite seu endereço de e-mail"
                  />
                )}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInUp.delay(200).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
              className="w-full"
            >
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                  />
                )}
              />
            </Animated.View>
          </View>

          <View className="items-center justify-center gap-6">
            {/* Botão de Login*/}
            <Animated.View
              entering={FadeInUp.delay(400).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
              className="items-center"
            >
              <Button
                label="Entrar"
                size="lg"
                className="w-60"
                onPress={handleSubmit(handleSignIn)}
              />
            </Animated.View>
            {/* Esqueceu sua senha?*/}
            <Animated.View
              entering={FadeInUp.delay(600).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
              className="w-full items-center"
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text className="dark:text-white text-md text-purple-800 font-bold">
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInUp.delay(800).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
            >
              <Button
                label="Cadastre-se"
                variant="light"
                size="lg"
                className="w-60"
                onPress={() => navigation.navigate("SignUpScreen")}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInUp.delay(1000).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
              className="items-center flex-row"
            >
              <Text className="text-purple-800 dark:text-white font-semibold text-md">
                Use Sua{" "}
              </Text>
              <TouchableOpacity
                onPress={() => handleAuthentication(setIsLogedIn)}
              >
                <Text className="font-bold text-green-500 text-md">
                  Biometria
                </Text>
              </TouchableOpacity>
              <Text className="text-purple-800 dark:text-white font-semibold text-md">
                {" "}
                Para Acessar
              </Text>
              <TouchableOpacity></TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </>
  );
}
