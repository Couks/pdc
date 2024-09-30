import React from "react";
import { View, Text, FlatList } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { RoundedView } from "@/components/ui/RoundedView";
import { Skeleton } from "@/components/ui/Skeleton";
import { useProfile } from "@/hooks/useProfile";

const mockAppointments = [
  { id: 1, date: "12/09/2024", description: "Consulta de rotina" },
  { id: 2, date: "15/09/2024", description: "Exame de sangue" },
];

export const PatientDashboard = () => {
  const { userData } = useProfile();

  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-900">
      <RoundedView>
        <View className="flex-col items-center justify-around h-full">
          <Animated.Text
            entering={FadeInDown.springify().delay(200)}
            className="text-3xl font-bold text-secondary-900 dark:text-white"
          >
            Olá, {userData?.firstName || <Skeleton className="w-32 h-8" />}
          </Animated.Text>

          <View className="w-full px-4">
            <Animated.Text
              entering={FadeInDown.springify().delay(400)}
              className="text-xl dark:text-white text-secondary-900 mb-4"
            >
              Próximas Consultas
            </Animated.Text>
            <FlatList
              data={mockAppointments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="p-4 bg-white dark:bg-secondary-700 rounded-lg mb-4 shadow-md">
                  <Text className="dark:text-white text-secondary-900 text-lg font-bold">
                    {item.date}
                  </Text>
                  <Text className="dark:text-gray-400 text-gray-700 text-md">
                    {item.description}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </RoundedView>
    </View>
  );
};
