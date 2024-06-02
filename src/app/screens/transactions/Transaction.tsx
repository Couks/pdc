import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import SelectInput from "@/components/ui/SelectInput";
import { TransactionProps } from "@/lib/transactionProps";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { DialogContent, DialogTrigger, Dialog } from "@/components/ui/Dialog";
import {
  categoryIcons,
  categoryNames,
  categoryOptions,
} from "@/utils/categoryIcons";
import Separator from "@/components/ui/Separator";

export function Transaction({
  id,
  createdAt,
  entrada_saida,
  valor,
  categoria,
}: TransactionProps) {
  const dateObject = useMemo(
    () => createdAt && parseISO(createdAt),
    [createdAt]
  );
  const formattedDate = useMemo(
    () => dateObject && format(dateObject, "PPP", { locale: ptBR }),
    [dateObject]
  );
  const formattedTime = useMemo(
    () => dateObject && format(dateObject, "HH:mm"),
    [dateObject]
  );

  const formattedPrice = useMemo(
    () =>
      `${entrada_saida === "saida" ? "-" : "+"} R$${Math.abs(valor).toFixed(
        2
      )}`,
    [entrada_saida, valor]
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  const iconName = categoryIcons[categoria] || "alert-circle-outline";
  const categoryName = categoryNames[categoria] || "Não definido";

  return (
    <Dialog>
      <DialogTrigger>
        <TouchableOpacity key={id}>
          <View className="flex-row items-center px-1 py-4 gap-4">
            <View className="items-center justify-center size-14 bg-primary-500 dark:bg-secondary-500 rounded-3xl">
              <Ionicons name={iconName} size={24} color="white" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="font-semibold text-lg dark:text-white text-primary-500">
                {categoryName}
              </Text>
              <Text className="dark:text-secondary-300 text-secondary-800 text-xs font-semibold">
                {formattedTime} - {formattedDate}
              </Text>
            </View>
            <Text
              className="font-semibold text-secondary-500 dark:text-white"
              style={{ fontSize: 18 }}
            >
              {formattedPrice}
            </Text>
          </View>
          <Separator />
        </TouchableOpacity>
      </DialogTrigger>

      <DialogContent>
        <View className="w-96 mx-auto bg-primary-500 dark:bg-primary-800 rounded-3xl p-8 shadow-lg">
          <Text className="font-bold text-3xl text-white mb-6 text-center">
            Editar Transação
          </Text>
          <View className="flex flex-col mt-4">
            <View className="flex flex-row gap-2">
              <Ionicons name={iconName} size={24} color="white" />
              <Text className="dark:text-white text-xl font-semibold">
                {categoryName}
              </Text>
            </View>
            <SelectInput
              label="Selecione a categoria"
              options={categoryOptions}
              selectedValue={categoria}
              onValueChange={(newCategory) =>
                setValue("categoria", newCategory)
              }
            />
          </View>
          <View className="flex flex-col mt-4">
            <Input
              placeholder={formattedPrice}
              keyboardType="numeric"
              iconName="cash"
              onChangeText={(text) => setValue("valor", Number(text))}
            />
            {errors.valor && (
              <Text className="text-red-500 mt-2 text-sm">
                Campo obrigatório
              </Text>
            )}
          </View>
          <View className="flex flex-row justify-center mt-8">
            <Button
              label="Alterar Transação"
              className="w-full"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
}
