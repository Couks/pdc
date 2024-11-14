import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";

export default function PatientDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: patient } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => doctorService.getPatientDetails(id),
  });

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

        <View className="bg-white p-4 rounded-lg shadow-sm">
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
      </ScrollView>
    </SafeAreaView>
  );
}
