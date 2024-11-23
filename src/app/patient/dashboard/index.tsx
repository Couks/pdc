import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/services/api";

export default function PatientDashboard() {
  const { user } = useAuth();
  const { data: exams } = useQuery({
    queryKey: ["patient-exams", user?.id],
    queryFn: () => patientService.getExams(user?.id || ""),
    enabled: !!user?.id,
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-6">
          Bem-vindo(a), {user?.name}
        </Text>

        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold mb-2">Seus Exames</Text>
          <Text className="text-gray-600">
            Total de Exames: {exams?.length || 0}
          </Text>
        </View>

        <View className="bg-white rounded-lg p-4 shadow-sm">
          <Text className="text-lg font-semibold mb-2">Ações Disponíveis</Text>
          <Text className="text-gray-600">
            • Visualize seus resultados de exames
          </Text>
          <Text className="text-gray-600">
            • Atualize suas informações pessoais
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
