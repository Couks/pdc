import { View } from "react-native";
import { PizzaGraph } from "@/components/PizzaGraph";
import { RoundedView } from "@/components/ui/RoundedView";

export function ExpenseAnalysis() {
  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <RoundedView>
        <PizzaGraph />
      </RoundedView>
    </View>
  );
}
