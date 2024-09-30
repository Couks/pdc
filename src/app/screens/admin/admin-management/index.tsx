import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { RoundedView } from "@/components/ui/RoundedView";

const mockUsers = [
  { id: 1, name: "João Silva", role: "Paciente", status: "Ativo" },
  { id: 2, name: "Maria Souza", role: "Médico", status: "Inativo" },
];

export const AdminManagement = () => {
  return (
    <View className="flex-1 bg-primary-500 dark:bg-primary-900">
      <RoundedView>
        <View className="flex-col items-center justify-around h-full px-4">
          <Animated.Text
            entering={FadeInDown.springify().delay(200)}
            className="text-3xl font-bold text-secondary-900 dark:text-white"
          >
            Gerenciamento de Usuários
          </Animated.Text>

          <FlatList
            data={mockUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Animated.View
                entering={FadeInDown.springify().delay(400)}
                className="p-4 bg-white dark:bg-secondary-700 rounded-lg mb-4 shadow-md"
              >
                <Text className="text-lg font-bold dark:text-white">
                  {item.name}
                </Text>
                <Text className="dark:text-gray-400 text-gray-700 text-md">
                  Função: {item.role}
                </Text>
                <Text className="dark:text-gray-400 text-gray-700 text-md">
                  Status: {item.status}
                </Text>
                <Button title="Editar Usuário" onPress={() => {}} />
              </Animated.View>
            )}
          />
        </View>
      </RoundedView>
    </View>
  );
};
