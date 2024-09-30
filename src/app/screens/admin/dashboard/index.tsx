import React from "react";
import { View, Text, Button } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { RoundedView } from "@/components/ui/RoundedView";

export const AdminDashboard = () => {
  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-900">
      <RoundedView>
        <View className="flex-col items-center justify-around h-full px-4">
          <Animated.Text
            entering={FadeInDown.springify().delay(200)}
            className="text-3xl font-bold text-secondary-900 dark:text-white"
          >
            Dashboard Administrativo
          </Animated.Text>

          <View className="w-full items-center">
            <Button title="Gerenciar Usuários" onPress={() => {}} />
            <Button title="Configurações do Sistema" onPress={() => {}} />
          </View>
        </View>
      </RoundedView>
    </View>
  );
};
