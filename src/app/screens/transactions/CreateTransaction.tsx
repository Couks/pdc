import axios from "axios";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/ui/Header";
import { View, Alert, Text } from "react-native";
import { API_URL } from "@/hooks/auth/AuthContext";
import SelectInput from "@/components/ui/SelectInput";
import { RoundedView } from "@/components/ui/RoundedView";
import { categoryOptions, typeOptions } from "@/utils/categoryIcons";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export function CreateTransaction() {
  const { createTransaction, isLoading, error } = useCreateTransaction();

  const [transaction, setTransaction] = useState({
    entrada_saida: "",
    valor: null,
    conta: "",
    categoria: "",
  });

  const handleInputChange = (name: string, value: any) => {
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await createTransaction(transaction);
      if (transaction) {
        Alert.alert("Transação criada!");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 20 }} />

      <RoundedView>
        <View>
          <Animated.Text
            entering={FadeInDown.delay(1000).duration(800).springify()}
            className="dark:text-white text-secondary-800 text-center text-md mb-8"
          >
            O WhatsApp é nosso canal principal de entrada!{" "}
            <Link href={"/chatbot"}>
              <Text className="text-primary-500">
                Clique aqui para falar com nosso chatbot{" "}
              </Text>
            </Link>
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(800).duration(800).springify()}
            className="dark:text-white text-secondary-800 text-center text-xl mb-8"
          >
            Preencha os campos abaixo para registrar uma nova transação pelo
            app. Depois, clique em Enviar.
          </Animated.Text>
        </View>

        <View className="w-full gap-4">
          <Animated.View entering={FadeInUp.delay(200).springify()}>
            <SelectInput
              label="Selecione o tipo de transação"
              options={typeOptions}
              onValueChange={(itemValue) =>
                handleInputChange("entrada_saida", itemValue)
              }
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).springify()}>
            <SelectInput
              label="Selecione a categoria"
              options={categoryOptions}
              onValueChange={(itemValue) =>
                handleInputChange("categoria", itemValue)
              }
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(600).springify()}>
            <Input
              placeholder="Digite o valor da transação"
              keyboardType="numeric"
              iconName="cash-outline"
              onChangeText={(text) => handleInputChange("valor", Number(text))}
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(800).springify()}>
            <Button
              label="Enviar"
              onPress={handleSubmit}
              className="w-full"
              disabled={isLoading}
            />
          </Animated.View>
        </View>

        {error && (
          <Animated.Text
            entering={FadeInUp.delay(1000).springify()}
            className="text-red-500 text-center mt-4"
          >
            {error.message}
          </Animated.Text>
        )}
      </RoundedView>
    </View>
  );
}
