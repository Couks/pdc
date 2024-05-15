import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DialogContent, DialogTrigger, Dialog } from "@/components/Dialog";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/Toast";
import { Button } from "@/components/Button";
import { AxiosError } from "axios";

export interface TransactionProps {
  id: string;
  createdAt: string;
  updatedAt?: string;
  entrada_saida?: string;
  conta?: string;
  valor: number;
  categoria: string;
  userid?: number;
}

const categoryIcons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
  GERAL: "add",
  MORADIA: "home",
  ALIMENTACAO: "fast-food",
  TRANSPORTE: "bus",
  SAUDE: "medical",
  EDUCACAO: "school",
  LAZER: "beer",
  DESPESAS_PESSOAIS: "shirt",
  ECONOMIAS: "cash",
};

const categoryNames: { [key: string]: string } = {
  GERAL: "Gastos Gerais",
  MORADIA: "Moradia",
  ALIMENTACAO: "Alimentação",
  TRANSPORTE: "Transporte",
  SAUDE: "Saúde",
  EDUCACAO: "Educação",
  LAZER: "Lazer",
  DESPESAS_PESSOAIS: "Despesas pessoais",
  ECONOMIAS: "Economias",
};

export default function Transaction({
  id,
  createdAt,
  entrada_saida,
  valor,
  categoria,
}: TransactionProps) {
  const { toast } = useToast();

  const dateObject = parseISO(createdAt);
  const formattedDate = format(dateObject, "PP", { locale: ptBR });
  const formattedTime = format(dateObject, "HH:mm:ss");

  const [formattedPrice, setFormattedPrice] = useState(
    `${entrada_saida === "saida" ? "-" : "+"} R$${Math.abs(valor).toFixed(2)}`
  );

  useEffect(() => {
    const newFormattedPrice = `${
      entrada_saida === "saida" ? "-" : "+"
    } R$${Math.abs(valor).toFixed(2)}`;
    setFormattedPrice(newFormattedPrice);
  }, [entrada_saida, valor]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: typeof Transaction) => {
    try {
      const response = await axios.put(
        `https://actively-settling-rodent.ngrok-free.app/api/movimentacao/${id}`,
        data
      );

      console.log(response.data);
      toast("Transação atualizada!", "success", 2000);
    } catch (error) {
      console.error("Error updating transaction:", error);
      if (error instanceof AxiosError && error.response?.data) {
        toast(error.response.data.message, "destructive", 3000);
      } else if (error instanceof Error) {
        toast("Erro ao atualizar a transação", "destructive", 3000);
      } else {
        throw error;
      }
    }
  };

  const iconName = categoryIcons[categoria] || "alert-circle-outline";
  const categoryName = categoryNames[categoria] || "Não definido";

  return (
    <Dialog>
      <DialogTrigger>
        <TouchableOpacity key={id}>
          <View className="flex-row items-center px-1 py-6 gap-4">
            <View className="items-center justify-center size-14 bg-green-500 dark:bg-purple-500 rounded-3xl">
              <Ionicons name={iconName} size={24} color="white" />
            </View>
            <View className="flex-1 jusitify-center">
              <Text className="font-semibold text-lg dark:text-white text-green-500">
                {categoryName}
              </Text>
              <View>
                <Text className="dark:text-purple-500 text-purple-800 text-xs font-semibold">
                  {formattedDate} - {formattedTime}
                </Text>
              </View>
            </View>

            <Text
              className="font-semibold text-purple-500 dark:text-white"
              style={{
                fontSize: 18,
              }}
            >
              {formattedPrice}
            </Text>
          </View>
          <View className="bg-gray-200/20 rounded-full h-[2px] w-auto mx-1" />
        </TouchableOpacity>
      </DialogTrigger>

      <DialogContent>
        <View className="w-96 h-auto bg-green-500 dark:bg-purple-700 rounded-3xl p-8">
          <Text className="font-semibold text-2xl text-white mb-4">
            Editar Transação
          </Text>

          <View className="flex-col mt-4">
            <View className="flex-row items-center gap-2">
              <Ionicons
                name={categoryIcons[categoria] || "alert-circle-outline"}
                size={24}
                color="white"
              />
              <Text className="text-white text-xl font-semibold">
                Categoria
              </Text>
            </View>
            <Picker
              selectedValue={categoria}
              onValueChange={(newCategoria) =>
                setValue("categoria", newCategoria)
              }
              mode="dropdown"
              className="bg-white"
              dropdownIconColor="white"
              style={{
                width: "auto",
              }}
            >
              {Object.values(categoryName).map((categoryKey) => (
                <Picker.Item
                  key={categoryKey}
                  label={categoryKey}
                  value={categoryKey}
                />
              ))}
            </Picker>
          </View>
          <View className="bg-gray-200/20 rounded-full h-[2px] w-auto my-4" />

          <View className="flex-col mt-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="cash" size={24} color="white" />
              <Text className="text-white text-xl">Valor</Text>
            </View>
            <TextInput keyboardType="numeric" />
            <View className="bg-gray-200/20 rounded-full h-[2px] w-auto my-4" />

            {errors.valor && (
              <Text className="text-red-500 mt-1">Campo obrigatório</Text>
            )}
          </View>

          <View className="flex-row justify-center mt-8">
            <Button
              label="Alterar Transação"
              iconName="checkmark-circle"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
}
