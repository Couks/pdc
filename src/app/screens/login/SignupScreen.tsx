import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  FadeInUp,
  FadeInDown,
} from "react-native-reanimated";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    const data = {
      username,
      email,
      password,
    };
    console.log(data);
  }

  return (
    <View className="bg-white justify-around flex-1">
      <StatusBar style="dark" />

      {/* Formulário*/}
      <View className="items-center mx-4 gap-4">
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          className="bg-black/5 p-5 rounded-2xl w-full"
        >
          <TextInput
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={"gray"}
          ></TextInput>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="bg-black/5 p-5 rounded-2xl w-full"
        >
          <TextInput
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={"gray"}
          ></TextInput>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          className="bg-black/5 p-5 rounded-2xl w-full"
        >
          <TextInput
            placeholder="Digite uma senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor={"gray"}
          ></TextInput>
        </Animated.View>

        {/* Botão de Login*/}
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          className="w-full"
        >
          <TouchableOpacity
            onPress={handleSignIn}
            className="w-full bg-green-500 p-4 rounded-2xl mb-3"
          >
            <Text className="text-xl font-bold text-green text-center">
              Criar conta
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Esqueceu sua senha?*/}
        <Animated.View
          entering={FadeInDown.delay(800).duration(1000).springify()}
          className="w-full items-center"
        >
          <Text className="text-medium">Já tem uma conta?</Text>
          <Link href="/screens/login/LoginScreen">
            <Text className="text-green-500">
              Clique para realizar seu login
            </Text>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
}
