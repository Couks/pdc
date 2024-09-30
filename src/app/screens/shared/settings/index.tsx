import { Header } from "@/components/ui/Header";
import { RoundedView } from "@/components/ui/RoundedView";
import React from "react";

import { View, Text } from "react-native";

export function Settings() {
  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-800">
      <Header style={{ height: 100 }}>
        <View className="flex-row items-center justify-between"></View>
      </Header>

      <RoundedView>
        <Text>Dashboard</Text>
      </RoundedView>
    </View>
  );
}
