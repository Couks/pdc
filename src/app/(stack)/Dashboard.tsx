import { Button } from "@/components/Button";
import Header from "@/components/Header";
import { Progress } from "@/components/Progress";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { useColorScheme } from "nativewind";

export default function Dashboard({ navigation }) {
  const { colorScheme } = useColorScheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  return (
    <>
      <Header title="">
        <View className="flex-col w-full">
          <View className="flex-row justify-between items-center w-full">
            <View className="items-start">
              <Text className="text-xl font-bold dark:text-green-500">
                Olá, Bem Vindo De Volta!{" "}
              </Text>
              <Text className="text-xs font-regular dark:text-green-200">
                {getGreeting()}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
              >
                <Ionicons
                  name="notifications"
                  color={colorScheme == "light" ? "#00D09E" : "white"}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full mt-20">
            <Text className="text-xl font-bold mb-2 dark:text-green-500 ">
              Total de Gastos
            </Text>
            <Progress percentage={30} />
          </View>
        </View>
      </Header>
      <View className="flex-1 bg-white dark:bg-purple-800 items-center px-8 py-8">
        <View className="bg-green-500 px-8 w-full rounded-3xl h-60 mx-8 items-center justify-center">
          <View className="rounded-full bg-purple-400 border-2 size-12 border-purple-800">
            <Ionicons name="car" color="white" size={24} />
          </View>
          <View>
            <View></View>
            <View></View>
          </View>
        </View>
      </View>
    </>
  );
}
