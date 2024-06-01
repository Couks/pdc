import { View } from "react-native";
import { Header } from "@/components/ui/Header";
import { PizzaGraph } from "@/components/PizzaGraph";
import { RoundedView } from "@/components/ui/RoundedView";
export function AnalysisScreen() {
  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header />
      <RoundedView>
        <PizzaGraph />
      </RoundedView>
    </View>
  );
}
