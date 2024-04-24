import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

import { useForm, Controller } from "react-hook-form";

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleForgotPassoword(data) {
    console.log();
  }

  return (
    <View className="bg-white flex-1 justify-around dark:bg-green-700">
      {/* Formulário*/}
      <View className="items-center mx-4 gap-6">
        <Animated.Text
          entering={FadeInDown.duration(800).springify()}
          className="dark:text-white text-purple-800 text-3xl font-bold"
        >
          Redefinir senha?
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.duration(800).springify()}
          className="dark:text-white text-purple-800 text-center text-sm mb-8"
        >
          Por favor, insira seu endereço de e-mail abaixo para redefinir sua
          senha. Enviaremos instruções sobre como criar uma nova senha para sua
          conta.{" "}
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          className="bg-purple-500/60 p-5 rounded-2xl w-full"
        >
          <Controller
            control={control}
            name="email"
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onChangeText={onChange}
                type="email"
                onBlur={onBlur}
                value={value}
                className="text-white text-xl"
                placeholder="Digite seu endereço de e-mail"
                placeholderTextColor={"white"}
              ></TextInput>
            )}
          />
        </Animated.View>
        {/* Botão de Login*/}
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
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
