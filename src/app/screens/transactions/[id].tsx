import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DialogContent, DialogTrigger, Dialog } from "@/components/Dialog";

import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { useToast } from "@/components/Toast";

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

export default function Transaction(
  { id, createdAt, entrada_saida, valor, categoria }: TransactionProps,
  { navigation }
) {
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

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `https://actively-settling-rodent.ngrok-free.app/api/movimentacao/${id}`,
        data
      );
      console.log("Transaction updated successfully:", response.data);
      toast("Transação atualizada!", "success", 2000);
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast("Erro ao atualizar a transação", "destructive", 3000);
    }
  };

  const iconName = categoryIcons[categoria] || "alert-circle-outline";
  return (
    <Dialog>
      <DialogTrigger>
        <TouchableOpacity key={id}>
          <View className="flex-row items-center px-1 py-6 gap-4">
            <View className="items-center justify-center size-14 bg-green-500 dark:bg-purple-500 rounded-3xl">
              <Ionicons name={iconName} size={24} color="white" />
            </View>
            <View className="flex-1 jusitify-center">
              <Text className="font-semibold text-xl dark:text-white text-green-500">
                {categoria}
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
          <View className="bg-gray-200 rounded-full h-[1px] w-auto mx-6" />
        </TouchableOpacity>
      </DialogTrigger>

      <DialogContent>
        <View className="w-96 h-auto bg-green-500 dark:bg-green-700 rounded-3xl p-8">
          <View className="flex-row justify-between items-center">
            <Text className="font-semibold text-xl text-white">
              Editar Transação
            </Text>
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex-col mt-4">
            <View className="flex-row items-center mb-2">
              <Ionicons
                name={categoryIcons[categoria] || "alert-circle-outline"}
                size={24}
                color="white"
                className="mr-2"
              />
              <Text className="text-white">Categoria</Text>
            </View>
            <Picker
              selectedValue={categoria}
              onValueChange={(newCategoria) => {
                setValue("categoria", newCategoria); // Use setValue diretamente
              }}
              mode="dropdown"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "rgba(255, 255, 255)",
                color: "white",
              }}
            >
              {Object.keys(categoryIcons).map((categoryKey) => (
                <Picker.Item
                  key={categoryKey}
                  label={categoryKey}
                  value={categoryKey}
                />
              ))}
            </Picker>
          </View>

          <View className="flex-col mt-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="cash" size={24} color="white" className="mr-2" />
              <Text className="text-white">Valor:</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              className="dark:bg-white rounded-2xl dark:text-purple-800 w-full h-12 px-8"
            />
            {errors.valor && (
              <Text className="text-red-500 mt-1">Campo obrigatório</Text>
            )}
          </View>

          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-500 dark:text-gray-200 font-semibold">
              Clique fora do modal para cancelar
            </Text>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
}
