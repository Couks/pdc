import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { handleAuthentication } from "@/services/Authentication";
import { useAuth } from "@/services/AuthContext";
import Header from "@/components/Header";

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
      <Header title="Bem vindo!" />
      <View className="flex-1 justify-around bg-white dark:bg-purple-800 rounded-t-[50px]">
        {/* Formulário*/}
        <View className="items-center mx-6 gap-3">
          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            exiting={FadeInDown.duration(1000).springify()}
            className="bg-green-200 p-4 rounded-2xl w-full"
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
                  className="text-lg"
                  placeholder="Digite seu endereço de e-mail"
                />
              )}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            exiting={FadeInDown.duration(1000).springify()}
            className="bg-green-200 p-4 rounded-2xl w-full mb-12"
          >
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={true}
                  className="text-lg"
                  placeholder="Digite sua senha"
                  placeholderTextColor={"gray"}
                ></TextInput>
              )}
            />
          </Animated.View>
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
            className="items-center gap-2"
          >
            <Text className="text-purple-800 dark:text-white font-medium text-lg">
              Use sua Biometria para acessar.
            </Text>
            <TouchableOpacity
              onPress={() => handleAuthentication(setIsLogedIn)}
            >
              <Image
                className="size-24"
                source={require("@/assets/fingerprint.png")}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </>
  );
}
