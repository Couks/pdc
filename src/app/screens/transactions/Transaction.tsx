import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import SelectInput from "@/components/ui/SelectInput";
import { TransactionProps } from "@/lib/transactionProps";
import { DialogContent, DialogTrigger, Dialog } from "@/components/ui/Dialog";
import {
  categoryIcons,
  categoryNames,
  categoryOptions,
  typeOptions,
} from "@/utils/categoryIcons";
import Separator from "@/components/ui/Separator";
import { formatPrice, formatTime, formatDate } from "@/utils/formatUtils";

export function Transaction({
  id,
  createdAt,
  entrada_saida,
  valor,
  categoria,
}: TransactionProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [transaction, setTransaction] = useState({
    entrada_saida: entrada_saida,
    valor: valor,
    conta: "",
    categoria: categoria,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setTransaction({ ...transaction, ...data });
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
                {formatDate(createdAt)} - {formatTime(createdAt)}
              </Text>
            </View>
            <Text
              className="font-semibold text-secondary-500 dark:text-white"
              style={{ fontSize: 18 }}
            >
              {formatPrice(entrada_saida, valor)}
            </Text>
          </View>
          <Separator />
        </TouchableOpacity>
      </DialogTrigger>

      <DialogContent>
        <View className="w-auto gap-4 bg-secondary-500 dark:bg-primary-800 rounded-3xl p-6 shadow-lg">
          <Text className="font-bold text-3xl text-white mb-6 text-center">
            Editar Transação
          </Text>

          <SelectInput
            label="Selecione a categoria"
            options={categoryOptions}
            selectedValue={transaction.categoria}
            onValueChange={(itemValue) => setValue("categoria", itemValue)}
          />

          <SelectInput
            label="Selecione o tipo"
            options={typeOptions}
            selectedValue={transaction.entrada_saida}
            onValueChange={(itemValue) => setValue("entrada_saida", itemValue)}
          />

          <Input
            placeholder={formatPrice(transaction.entrada_saida, valor)}
            keyboardType="numeric"
            iconName="cash"
            onChangeText={(text) => setValue("valor", Number(text))}
          />
          {errors.valor && (
            <Text className="text-red-500 mt-2 text-sm">Campo obrigatório</Text>
          )}

          <Button
            label="Alterar Transação"
            className="w-full "
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </DialogContent>
    </Dialog>
  );
}
