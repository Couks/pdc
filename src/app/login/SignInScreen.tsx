import { Link } from "expo-router";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useAuth } from "@/services/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { handleAuthentication } from "@/services/Authentication";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function SignInScreen({ navigation }) {
  const { onLogin } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleSignIn = async (data: {
    DDDtelefone: string;
    password: string;
  }) => {
    const result = await onLogin!(data.DDDtelefone, data.password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Bem vindo" style={{ height: 180 }} />

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
                rules={{ required: true }}
                name="DDDtelefone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoComplete="tel"
                    keyboardType="phone-pad"
                    placeholder="Digite seu contato WhatsApp"
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
                rules={{ required: true }}
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
              <Button label="Entrar" onPress={handleSubmit(handleSignIn)} />
            </Animated.View>
            {/* Esqueceu sua senha?*/}
            <Animated.View
              entering={FadeInUp.delay(600).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
              className="w-full items-center"
            >
              <Link href="/login/ForgotPassword">
                <Text className="dark:text-white text-md text-purple-800 font-bold">
                  Esqueceu sua senha?
                </Text>
              </Link>
            </Animated.View>

            <Animated.View
              entering={FadeInUp.delay(800).duration(1000).springify()}
              exiting={FadeInDown.duration(1000).springify()}
            >
              <Button
                label="Cadastre-se"
                variant="light"
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
              <TouchableOpacity onPress={() => handleAuthentication()}>
                <Text className="font-bold text-green-500 text-md">
                  Biometria
                </Text>
              </TouchableOpacity>
              <Text className="text-purple-800 dark:text-white font-semibold text-md">
                {" "}
                Para Acessar
              </Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
}
