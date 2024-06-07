import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { View } from "react-native";
import SelectInput from "@/components/ui/SelectInput";
import { RoundedView } from "@/components/ui/RoundedView";
import { categoryOptions, typeOptions } from "@/utils/categoryIcons";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import Separator from "@/components/ui/Separator";
import { useToast } from "@/components/ui/Toast";

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
    try {
      await createTransaction(transaction);
      if (transaction === null) {
        toast("Preencha os campos do formulário", "destructive");
      } else {
        toast("Transação criada!", "success");
      }
    } catch (error: any) {
      toast("Ocorreu um erro, tente novamente", "destructive");
    }
  };

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <RoundedView>
        <View className="items-center justify-center">
          <Animated.Text
            entering={FadeInDown.delay(1000).springify()}
            className="dark:text-white text-secondary-800 text-center text-3xl"
          >
            O WhatsApp é nosso canal principal de entrada
          </Animated.Text>
          <Button
            label="Falar no WhatsApp"
            className="w-auto mt-8"
            onPress={() => alert("Falar no WhatsApp")}
          />
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
      </RoundedView>
    </View>
  );
}
