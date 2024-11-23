import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";

export default function PatientDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: patient, isLoading } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => doctorService.getPatientDetails(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 p-4">
          <Text>Carregando dados do paciente...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!patient) return null;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">{patient.name}</Text>

        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-2">
            Informações Pessoais
          </Text>
          <Text>Email: {patient.email}</Text>
          <Text>Telefone: {patient.phone}</Text>
          <Text>Endereço: {patient.address}</Text>
        </View>

        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-2">Dados Clínicos</Text>
          <Text>Tipo Sanguíneo: {patient.clinicalData.bloodType}</Text>
          <Text>
            Alergias: {patient.clinicalData.allergies.join(", ") || "Nenhuma"}
          </Text>
          <Text>
            Condições Crônicas:{" "}
            {patient.clinicalData.chronicConditions.join(", ") || "Nenhuma"}
          </Text>
        </View>

        <Link href={`/doctor/patients/${id}/exams`} asChild>
          <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
            <Text className="text-white text-center font-semibold">
              Ver Exames do Paciente
            </Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
