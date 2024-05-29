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
  const { createTransaction, isLoading, error, createdTransaction } =
    useCreateTransaction();

  const [transaction, setTransaction] = useState({
    entrada_saida: "",
    valor: null,
    categoria: "",
  });

  const handleInputChange = (name: string, value: number) => {
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/movimentacao/`,
        transaction
      );
      Alert.alert("Transação criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      Alert.alert("Falha ao criar transação.");
    }
  };

  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Criar Transação" style={{ height: 150 }} />

      <RoundedView>
        <View>
          <Animated.Text
            entering={FadeInDown.delay(1000).duration(800).springify()}
            className="dark:text-white text-purple-800 text-center text-md mb-8"
          >
            O WhatsApp é nosso canal principal de entrada!{" "}
            <Link href={"/chatbot"}>
              <Text className="text-green-500">
                Clique aqui para falar com nosso chatbot{" "}
              </Text>
            </Link>
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(800).duration(800).springify()}
            className="dark:text-white text-purple-800 text-center text-xl mb-8"
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
            <Button label="Enviar" onPress={handleSubmit} className="w-full" />
          </Animated.View>
        </View>
      </RoundedView>
    </View>
  );
}
