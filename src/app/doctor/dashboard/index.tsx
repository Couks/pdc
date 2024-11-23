import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { data: patients, isLoading } = useQuery({
    queryKey: ["doctor-patients", user?.id],
    queryFn: () => doctorService.getPatients(user?.id || ""),
    enabled: !!user?.id,
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-6">
          Bem-vindo, Dr. {user?.name}
        </Text>

        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold mb-2">Resumo</Text>
          <Text className="text-gray-600">
            Total de Pacientes: {patients?.length || 0}
          </Text>
        </View>

        <View className="bg-white rounded-lg p-4 shadow-sm">
          <Text className="text-lg font-semibold mb-2">Ações Rápidas</Text>
          <Text className="text-gray-600">
            • Visualize a lista completa de pacientes
          </Text>
          <Text className="text-gray-600">• Solicite novos exames</Text>
          <Text className="text-gray-600">• Analise resultados pendentes</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
