import React from "react";
import { View, Text, FlatList } from "react-native";
import { RoundedView } from "@/components/ui/RoundedView";
import Animated, { FadeInDown } from "react-native-reanimated";

const mockExamHistory = [
  { id: 1, date: "12/08/2024", type: "Hemograma", result: "Normal" },
  { id: 2, date: "20/07/2024", type: "Exame de Sangue", result: "Alterado" },
];

export const ExamHistory = () => {
  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-900">
      <RoundedView>
        <View className="flex-col items-center justify-around h-full px-4">
          <Animated.Text
            entering={FadeInDown.springify().delay(200)}
            className="text-3xl font-bold text-secondary-900 dark:text-white"
          >
            Histórico de Exames
          </Animated.Text>

          <FlatList
            data={mockExamHistory}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Animated.View
                entering={FadeInDown.springify().delay(400)}
                className="p-4 bg-white dark:bg-secondary-700 rounded-lg mb-4 shadow-md"
              >
                <Text className="text-lg font-bold dark:text-white">
                  {item.date} - {item.type}
                </Text>
                <Text className="dark:text-gray-400 text-gray-700 text-md">
                  Resultado: {item.result}
                </Text>
              </Animated.View>
            )}
          />
        </View>
      </RoundedView>
    </View>
  );
};
