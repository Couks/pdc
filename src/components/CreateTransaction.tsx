import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Text, View } from "react-native";
import SelectInput from "@/components/ui/SelectInput";
import { categoryOptions, typeOptions } from "@/utils/categoryIcons";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import Separator from "@/components/ui/Separator";
import { useToast } from "@/components/ui/Toast";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export function CreateTransaction() {
  const { toast } = useToast();

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
    if (
      !transaction.entrada_saida ||
      !transaction.valor ||
      !transaction.conta ||
      !transaction.categoria
    ) {
      toast("Preencha todos os campos do formulário", "destructive");
      return;
    }

    try {
      await createTransaction(transaction);
      toast("Transação criada!", "success");
    } catch (error: any) {
      toast("Ocorreu um erro, tente novamente", "destructive");
    }
  };

  return (
    <View className=" p-6 rounded-3xl gap-4 bg-primary-200 dark:bg-primary-800">
      <View className="items-center justify-center">
        <Animated.Text
          entering={FadeInDown.delay(400).springify()}
          className="dark:text-white text-secondary-800 text-center text-2xl mb-4"
        >
          O WhatsApp é nosso canal principal de entrada!
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(800).springify()}
          className="dark:text-white text-secondary-800 text-center text-lg mb-4"
        ></Animated.Text>

        <Link href="https://wa.me/5521969647422">
          <View className="flex-row gap-2 items-center bg-primary-500 px-6 py-2 rounded-2xl">
            <Text className="text-white font-bold text-xl">
              Falar no WhatsApp
            </Text>
            <Ionicons name="logo-whatsapp" size={20} color={"white"} />
          </View>
        </Link>
      </View>

      <Separator />

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
    </View>
  );
}
