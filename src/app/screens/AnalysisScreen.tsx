import { View } from "react-native";
import { Header } from "@/components/ui/Header";
import { PizzaGraph } from "@/components/PizzaGraph";

export function AnalysisScreen() {
  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header style={{ height: 200 }} title="Análise de Gastos" />
      <View className="flex-1 items-center justify-center dark:bg-purple-800 bg-white px-8">
        <PizzaGraph />
      </View>
    </View>
  );
}
