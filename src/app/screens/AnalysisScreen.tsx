import { View } from "react-native";
import Header from "@/components/Header";
import AnalysisComponent from "@/components/dinamic-components/AnalysisComponent";
import PizzaGraph from "@/components/dinamic-components/PizzaGraph";

export default function AnalysisScreen() {
  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header style={{ height: 200 }} title="Análise de Gastos" />
      <View className="flex-1 items-center justify-center dark:bg-purple-800 bg-white px-8">
        <AnalysisComponent />
        <PizzaGraph />
      </View>
    </View>
  );
}
