import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Results() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Resultados</Text>

        <View className="gap-4">
          {[1, 2, 3].map((exam) => (
            <TouchableOpacity
              key={exam}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-semibold">Exame #{exam}</Text>
                  <Text className="text-gray-600">
                    Data: {new Date().toLocaleDateString()}
                  </Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-800">Concluído</Text>
                </View>
              </View>

              <Text className="mt-2 text-gray-600">
                Clique para ver os detalhes do exame
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
