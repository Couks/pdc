import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleSignIn(data) {
    console.log(data);
  }

  return (
    <View className="flex-1 justify-around">
      {/* Formulário*/}
      <View className="items-center mx-4 gap-6">
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          className="bg-gray-100 p-5 rounded-2xl w-full"
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoComplete="email"
                autoFocus={true}
                className="text-white text-xl"
                placeholder="Digite seu endereço de e-mail"
                placeholderTextColor={"gray"}
              ></TextInput>
            )}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="bg-gray-100 p-5 rounded-2xl w-full"
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
                className="text-xl"
                placeholder="Digite sua senha"
                placeholderTextColor={"gray"}
              ></TextInput>
            )}
          />
        </Animated.View>

        {/* Botão de Login*/}
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          className="w-full bg-green-500 p-4 rounded-2xl mb-3"
        >
          <TouchableOpacity onPress={handleSubmit(handleSignIn)}>
            <Text className="text-2xl font-bold text-white text-center">
              Login
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Esqueceu sua senha?*/}
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          className="w-full items-center"
        >
          <Text className="dark:text-white text-purple-800">
            Não tem uma conta?
          </Text>
          <Link href="/screens/login/SignupScreen">
            <Text className="text-green-500">Criar uma conta agora</Text>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
}
