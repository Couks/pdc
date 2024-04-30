import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/Button";

export default function ForgotPassword({ navigation }: { navigation: any }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleForgotPassoword(data: any) {
    console.log();
  }

  return (
    <View className="h-full justify-around bg-white dark:bg-purple-800">
      {/* Formulário*/}
      <View className="items-center mx-4 gap-6">
        <Animated.Text
          entering={FadeInDown.delay(1000).duration(800).springify()}
          className="dark:text-green-500 text-purple-800 text-3xl font-bold"
        >
          Redefinir senha?
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(200).duration(800).springify()}
          className="dark:text-white text-purple-800 text-center text-lg mb-8"
        >
          Por favor, insira seu endereço de e-mail abaixo para redefinir sua
          senha. Enviaremos instruções sobre como criar uma nova senha para sua
          conta.{" "}
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          className="bg-gray-100 px-6 py-2 rounded-2xl w-full"
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                className="text-white text-xl"
                placeholder="exemplo@exemplo.com.br"
                placeholderTextColor={"gray"}
              ></TextInput>
            )}
          />
        </Animated.View>

        {/* Botão de Login*/}
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          className="w-full bg-green-500 p-4 rounded-2xl mb-3"
        >
          <TouchableOpacity onPress={handleSubmit(handleForgotPassoword)}>
            <Text className="text-2xl font-bold text-white text-center">
              Próximo Passo
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Esqueceu sua senha?*/}
        <Animated.View
          entering={FadeInDown.delay(800).duration(1000).springify()}
          exiting={FadeOutDown.delay(500).duration(1000).springify()}
        >
          <Button
            label="Cadastre-se"
            variant="light"
            size="lg"
            className="w-auto"
            onPress={() => navigation.navigate("SignUpScreen")}
          />
        </Animated.View>
      </View>
    </View>
  );
}
