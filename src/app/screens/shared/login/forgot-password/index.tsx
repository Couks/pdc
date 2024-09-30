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

  const handleForgotPassoword = (data: FormData) => {};

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <View className="flex-1 justify-around bg-white dark:bg-secondary-800 rounded-t-md">
        {/* Formulário*/}
        <View className="items-center mx-4 gap-6">
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            className="dark:text-primary-500 text-secondary-900 text-3xl font-bold text-center"
          >
            Siga o passo a passo para redefinir sua senha
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(600).springify()}
            className="dark:text-white text-secondary-900 text-center text-xl mb-8"
          >
            Insira seu endereço de e-mail abaixo para redefinir sua senha.
            Enviaremos instruções sobre como criar uma nova senha para sua
            conta.
          </Animated.Text>

          <Animated.View
            entering={FadeInDown.delay(800).springify()}
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
                />
              )}
            />
          </Animated.View>

          {/* Botão de Login*/}
          <Animated.View entering={FadeInDown.delay(1000).springify()}>
            <Button
              label="Próximo Passo"
              onPress={handleSubmit(handleForgotPassoword)}
            ></Button>
          </Animated.View>

          {/* Esqueceu sua senha?*/}
          <Animated.View entering={FadeInDown.delay(1200).springify()}>
            <Button
              label="Cadastre-se"
              variant="light"
              onPress={() => navigation.navigate("SignUp")}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
