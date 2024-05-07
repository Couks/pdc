import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Header from "@/components/Header";

export default function ForgotPassword({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleForgotPassoword(data: any) {
    // console.log(data);
  }

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Esqueceu sua senha?" style={{ height: 180 }}>
        <Text></Text>
      </Header>
      <View className="flex-1 justify-around bg-white dark:bg-purple-800 rounded-t-[50px]">
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
            senha. Enviaremos instruções sobre como criar uma nova senha para
            sua conta.{" "}
          </Animated.Text>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
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
                  className="text-white text-xl"
                  placeholder="exemplo@exemplo.com.br"
                  placeholderTextColor={"gray"}
                />
              )}
            />
          </Animated.View>

          {/* Botão de Login*/}
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <Button
              label="Próximo Passo"
              onPress={handleSubmit(handleForgotPassoword)}
            ></Button>
          </Animated.View>

          {/* Esqueceu sua senha?*/}
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            exiting={FadeOutDown.delay(400).duration(1000).springify()}
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
