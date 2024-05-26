import { View } from "react-native";
import { Header } from "@/components/ui/Header";
import { PizzaGraph } from "@/components/PizzaGraph";
import { RoundedView } from "@/components/ui/RoundedView";

export function AnalysisScreen() {
  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header style={{ height: 200 }} title="Análise de Gastos" />
      <RoundedView>
        <PizzaGraph />
      </RoundedView>
    </View>
  );
}
