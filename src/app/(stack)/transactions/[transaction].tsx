import { Ionicons } from "@expo/vector-icons";
import transactionsData from "@/assets/transactionsData.json";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";

export default function TransactionScreen({ navigation }) {
  const { transaction } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1">
      <Header title="Transações" />
      <View className="items-center justify-center gap-4 bg-green-200 dark:bg-green-700">
        <View className="bg-white w-3/4 h-36 rounded-2xl items-center justify-center gap-2">
          <Text className="font-bold text-xl text-purple-800">
            Gastos Totais
          </Text>
          <Text className="font-bold text-3xl">- R$ 2.530,95</Text>
        </View>
        <ScrollView className="bg-white dark:bg-purple-800 w-full rounded-t-[50px]">
          {transactionsData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("")}
            >
              <View className="flex-row items-center px-6 py-6 gap-3 ">
                <View className="items-center justify-center size-14 bg-green-500 dark:bg-purple-500 rounded-3xl ">
                  <Ionicons name={item.iconName} size={24} color="white" />
                </View>
                <View className="flex-1 gap-2 jusitify-center">
                  <Text className="font-semibold text-xl text-white">
                    {item.title}
                  </Text>
                  <View>
                    <Text className="dark:text-purple-500 text-purple-800 text-xs font-semibold">
                      {item.time} - {item.date}
                    </Text>
                  </View>
                </View>

                <Text
                  className="font-semibold text-md text-purple-500 dark:text-white"
                  style={{
                    fontSize: 18,
                  }}
                >
                  {item.type === "Despesa" ? "-" : "+"} R${Math.abs(item.value)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
