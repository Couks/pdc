import { Header } from "@/components/ui/Header";
import { View } from "react-native";

import { Transactions } from "./transactions/Transactions";
import { RoundedView } from "@/components/ui/RoundedView";

export function NotificationScreen() {
  return (
    <View className="flex-1 bg-green-500 dark:bg-green-700">
      <Header title="Notificações" style={{ height: 150 }} />
      <RoundedView>
        <Transactions />
      </RoundedView>
    </View>
  );
}
