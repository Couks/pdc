import { View } from "react-native";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import Animated, { FadeInDown } from "react-native-reanimated";

interface FormData {
  email: string;
}

export function ForgotPassword({ navigation }: { navigation: any }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleForgotPassoword = (data: FormData) => console.log(data);

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Esqueceu sua senha?" style={{ height: 180 }}></Header>
      <View className="flex-1 justify-around bg-white dark:bg-purple-800 rounded-t-[30px]">
        {/* Formulário*/}
        <View className="items-center mx-4 gap-6">
          <Animated.Text
            entering={FadeInDown.delay(400).duration(800).springify()}
            className="dark:text-green-500 text-purple-800 text-3xl font-bold"
          >
            Redefinir senha?
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(600).duration(800).springify()}
            className="dark:text-white text-purple-800 text-center text-lg mb-8"
          >
            Por favor, insira seu endereço de e-mail abaixo para redefinir sua
            senha. Enviaremos instruções sobre como criar uma nova senha para
            sua conta.{" "}
          </Animated.Text>

          <Animated.View
            entering={FadeInDown.delay(800).duration(800).springify()}
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
                  iconName="mail-outline"
                  placeholder="exemplo@exemplo.com.br"
                  placeholderTextColor={"gray"}
                />
              )}
            />
          </Animated.View>

          {/* Botão de Login*/}
          <Animated.View
            entering={FadeInDown.delay(1000).duration(800).springify()}
          >
            <Button
              label="Próximo Passo"
              onPress={handleSubmit(handleForgotPassoword)}
            ></Button>
          </Animated.View>

          {/* Esqueceu sua senha?*/}
          <Animated.View
            entering={FadeInDown.delay(1200).duration(800).springify()}
          >
            <Button
              label="Cadastre-se"
              variant="light"
              onPress={() => navigation.navigate("SignUpScreen")}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
