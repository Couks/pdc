import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInUp,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/Button";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleSignIn(data: any) {
    console.log(data);
  }

  return (
    <View className="flex-1 justify-around bg-white dark:bg-purple-800">
      {/* Formulário*/}
      <View className="items-center mx-6 gap-8">
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          exiting={FadeOutDown.duration(1000).springify()}
          sharedTransitionTag="tag"
          className="bg-green-200 p-4 rounded-2xl w-full"
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
                className="text-lg"
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
          exiting={FadeOutDown.delay(500).duration(1000).springify()}
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
          entering={FadeInDown.delay(600).duration(1000).springify()}
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
        {/* Botão de Login*/}
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
