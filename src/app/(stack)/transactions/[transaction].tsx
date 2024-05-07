import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface TransactionProps {
  id: string;
  iconName: string;
  category: string;
  date: string;
  type: string;
  price: string;
}

export default function Transaction({
  id,
  iconName,
  category,
  date,
  type,
  price,
}: TransactionProps) {
  const { transaction } = useLocalSearchParams();

  const priceNumber = parseFloat(price);
  const formattedPrice = `${type === "saida" ? "-" : "+"} R$${Math.abs(
    priceNumber
  ).toFixed(2)}`;

  const dateObject = parseISO(date);

  const formattedDate = format(dateObject, "PP", { locale: ptBR });

  const formattedTime = format(dateObject, "HH:mm:ss");

  return (
    <TouchableOpacity key={id}>
      <View className="flex-row items-center px-4 py-6 gap-4">
        <View className="items-center justify-center size-14 bg-green-500 dark:bg-purple-500 rounded-3xl ">
          <Ionicons name={iconName} size={24} color="white" />
        </View>
        <View className="flex-1 gap-2 jusitify-center">
          <Text className="font-semibold text-xl  dark:text-white text-green-500">
            {category}
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
