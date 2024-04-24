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
    <View className="fixed flex-1 justify-around">
      {/* Formulário*/}
      <View className="items-center mx-6 gap-8">
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
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
                autoComplete="email"
                autoFocus={true}
                className="text-white text-lg"
                placeholder="Digite seu endereço de e-mail"
                placeholderTextColor={"gray"}
              ></TextInput>
            )}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="bg-gray-100 px-6 py-2 rounded-2xl w-full"
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
          entering={FadeInDown.delay(400).duration(1000).springify()}
          className="w-full bg-green-500 p-4 rounded-2xl mb-2 items-center"
        >
          <TouchableOpacity onPress={handleSubmit(handleSignIn)}>
            <Text className="text-xl font-bold text-white ">Login</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Esqueceu sua senha?*/}
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          className="w-full items-center"
        >
          <Link href="/screens/login/(forgotPassword)/ForgotPassword" asChild>
            <Text className="dark:text-white text-md text-purple-800 font-bold">
              Esqueceu sua senha?
            </Text>
          </Link>
        </Animated.View>

        {/* Esqueceu sua senha?*/}
        {/* Botão de Login*/}
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          className="w-auto bg-green-200 p-4 rounded-2xl mb-3 items-center"
        >
          <Link href="/screens/login/SignupScreen">
            <Text className="text-xl font-bold text-purple-800 ">
              Crie uma conta agora
            </Text>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
}
