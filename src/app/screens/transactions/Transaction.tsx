import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale/pt-BR";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";
import { TouchableOpacity } from "react-native";
import { useToast } from "@/components/ui/Toast";
import { Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DialogContent, DialogTrigger, Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { TransactionProps } from "@/lib/transactionProps";

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

export function Transaction({
  id,
  createdAt,
  entrada_saida,
  valor,
  categoria,
}: TransactionProps) {
  const { toast } = useToast();

  const dateObject = createdAt ? parseISO(createdAt) : null;
  const formattedDate = dateObject
    ? format(dateObject, "PP", { locale: ptBR })
    : "";
  const formattedTime = dateObject ? format(dateObject, "HH:mm:ss") : "";

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

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    return "teste";
    // postTransaction({ id, entrada_saida, valor, categoria });
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
        <View className="w-96 mx-auto bg-green-500 dark:bg-green-700 rounded-3xl p-8 shadow-lg">
          <Text className="font-bold text-3xl text-white mb-6 text-center">
            Editar Transação
          </Text>

          <View className="flex flex-col mt-4">
            <View className="flex flex-row gap-2">
              <Ionicons
                name={categoryIcons[categoria] || "alert-circle-outline"}
                size={28}
                color="white"
              />
              <Text className="dark:text-white text-xl font-semibold">
                {categoryName}
              </Text>
            </View>
            <Picker
              selectedValue={categoria}
              onValueChange={(newCategoria) =>
                setValue("categoria", newCategoria)
              }
              mode="dialog"
              className="bg-white rounded-lg text-gray-800"
              dropdownIconColor="gray"
              style={{
                width: "100%",
              }}
            >
              {Object.values(categoryName).map((name) => (
                <Picker.Item key={name} label={name} value={name} />
              ))}
            </Picker>
          </View>

          <View className="bg-gray-200/20 rounded-full h-[2px] w-full my-4" />

          <View className="flex flex-col mt-4">
            <Input
              placeholder={formattedPrice}
              keyboardType="numeric"
              iconName="cash"
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
