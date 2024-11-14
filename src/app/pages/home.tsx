import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExam } from "@/context/ExamContext";

export default function Home() {
  const { exams, isLoading } = useExam();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Bem-vindo ao Diagnóstico IA
        </Text>

        <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
          <Text className="text-lg font-medium text-gray-900 mb-2">
            Exames Recentes
          </Text>
          <Text className="text-base text-gray-600">
            {isLoading
              ? "Carregando exames..."
              : exams.length > 0
              ? `Você tem ${exams.length} exames registrados`
              : "Nenhum exame registrado ainda"}
          </Text>
        </View>

        <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
          <Text className="text-lg font-medium text-gray-900 mb-2">
            Análises Pendentes
          </Text>
          <Text className="text-base text-gray-600">
            Utilize nossa IA para analisar seus resultados de exames e obter
            diagnósticos precisos.
          </Text>
        </View>

        <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
          <Text className="text-lg font-medium text-gray-900 mb-2">Dicas</Text>
          <Text className="text-base text-gray-600">
            Para melhores resultados, certifique-se de incluir todos os exames
            necessários antes de solicitar uma análise.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
