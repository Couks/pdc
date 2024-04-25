import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

export default function SignupScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleSignup(data: any) {
    console.log(data);
  }

  return (
    <View className="flex-1 justify-around">
      <StatusBar style="dark" />

      {/* Formulário*/}
      <View className="items-center mx-4 gap-4">
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          className="bg-gray-100 px-6 py-2 rounded-2xl w-full"
        >
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                className="text-white text-lg"
                placeholder="Digite seu apelido"
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
          entering={FadeInDown.delay(400).duration(1000).springify()}
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
          entering={FadeInDown.delay(600).duration(1000).springify()}
          className="w-full bg-green-500 p-4 rounded-2xl mb-3 items-center"
        >
          <TouchableOpacity onPress={handleSubmit(handleSignup)}>
            <Text className="text-2xl font-bold text-white">Criar Conta</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Esqueceu sua senha?*/}
        <Animated.View
          entering={FadeInDown.delay(800).duration(1000).springify()}
          className="w-full items-center"
        >
          <Text className="text-medium text-purple-600 dark:text-white">
            Já tem uma conta?
          </Text>
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
