import React from "react";
import { View, FlatList, Button, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SimpleCard } from "@/components/ui/Card";
import { RoundedView } from "@/components/ui/RoundedView";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/assets/styles/colors"; // Importando cores

const mockExams = [
  { id: 1, patient: "João Silva", type: "Hemograma", status: "Pendente" },
  {
    id: 2,
    patient: "Maria Souza",
    type: "Exame de Sangue",
    status: "Concluído",
  },
];

export const ManageExams = () => {
  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-900">
      {/* Padding de 8 */}
      <RoundedView>
        <View className="flex-col items-center justify-around h-full px-4">
          <Animated.Text
            entering={FadeInDown.springify().delay(200)}
            className="text-3xl font-bold text-secondary-900 dark:text-white mb-4"
          >
            Gerenciamento de Exames
          </Animated.Text>

          <FlatList
            data={mockExams}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 8 }} // Padding interno da lista
            renderItem={({ item }) => (
              <Animated.View
                entering={FadeInDown.springify().delay(400)}
                className="mb-4 w-full" // Melhor aproveitamento de tela
              >
                <SimpleCard
                  title={
                    <View className="flex-row items-center">
                      <Ionicons
                        name="person-outline"
                        size={24}
                        color={colors.primary[500]}
                      />
                      <Text className="ml-2">{`Paciente: ${item.patient}`}</Text>
                    </View>
                  }
                  description={
                    <View className="flex-row items-center">
                      <Ionicons
                        name="medkit-outline"
                        size={20}
                        color={colors.primary[500]}
                      />
                      <Text className="ml-2">{`Exame: ${item.type}`}</Text>
                    </View>
                  }
                  content={
                    <View className="flex-row items-center">
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        color={colors.primary[500]}
                      />
                      <Text className="ml-2">{`Status: ${item.status}`}</Text>
                    </View>
                  }
                  footer={
                    item.status === "Pendente" ? (
                      <Button
                        title="Analisar Exame"
                        onPress={() => {}}
                        color={colors.primary[500]}
                      />
                    ) : null
                  }
                />
              </Animated.View>
            )}
          />
        </View>
      </RoundedView>
    </View>
  );
};
