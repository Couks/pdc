import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExam } from "@/context/ExamContext";

export default function ExamSelection() {
  const { exams, isLoading } = useExam();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Seleção de Exames</Text>

        <View className="gap-4">
          {isLoading ? (
            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-gray-600">Carregando exames...</Text>
            </View>
          ) : exams.length > 0 ? (
            exams.map((exam) => (
              <View key={exam.id} className="bg-white p-4 rounded-lg shadow-sm">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-semibold">{exam.name}</Text>
                  <Text className="text-gray-600">
                    {new Date(exam.date).toLocaleDateString()}
                  </Text>
                </View>

                <View className="gap-2">
                  <Text className="text-gray-600">{exam.notes}</Text>
                </View>
              </View>
            ))
          ) : (
            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-gray-600">
                Nenhum exame disponível para seleção
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
