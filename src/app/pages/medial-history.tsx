import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MedicalHistory() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Histórico Médico</Text>

        <View className="space-y-4">
          {[1, 2, 3].map((visit) => (
            <View key={visit} className="bg-white p-4 rounded-lg shadow-sm">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-semibold">
                  Consulta #{visit}
                </Text>
                <Text className="text-gray-600">
                  {new Date().toLocaleDateString()}
                </Text>
              </View>

              <View className="space-y-2">
                <View>
                  <Text className="text-gray-600">Médico</Text>
                  <Text className="text-base">Dr. João Silva</Text>
                </View>

                <View>
                  <Text className="text-gray-600">Diagnóstico</Text>
                  <Text className="text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Text>
                </View>

                <View>
                  <Text className="text-gray-600">Prescrição</Text>
                  <Text className="text-base">
                    - Medicamento A: 2x ao dia
                    {"\n"}- Medicamento B: 1x ao dia
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
