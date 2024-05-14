import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface TransactionProps {
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

export default function Transaction({
  id,
  createdAt,
  entrada_saida,
  valor,
  categoria,
}: TransactionProps) {
  const formattedPrice = `${entrada_saida === "saida" ? "-" : "+"} R$${Math.abs(
    valor
  ).toFixed(2)}`;

  const iconName = categoryIcons[categoria] || "alert-circle-outline";

  const dateObject = parseISO(createdAt);
  const formattedDate = format(dateObject, "PP", { locale: ptBR });
  const formattedTime = format(dateObject, "HH:mm:ss");

  return (
    <TouchableOpacity key={id}>
      <View className="flex-row items-center px-1 py-6 gap-2">
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
  );
}
