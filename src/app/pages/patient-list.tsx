import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";
import { router } from "expo-router";

export default function PatientList() {
  const { user } = useAuth();
  const { data: patients, isLoading } = useQuery({
    queryKey: ["doctor-patients", user?.id],
    queryFn: () => doctorService.getPatients(user?.id || ""),
    enabled: !!user?.id,
  });

  const handlePatientPress = (patientId: string) => {
    router.push({
      pathname: "/pages/patient-details",
      params: { id: patientId },
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Meus Pacientes</Text>

        <View className="space-y-4">
          {patients?.map((patient) => (
            <TouchableOpacity
              key={patient.id}
              className="bg-white p-4 rounded-lg shadow-sm"
              onPress={() => handlePatientPress(patient.id)}
            >
              <Text className="text-lg font-semibold">{patient.name}</Text>
              <Text className="text-gray-600">{patient.email}</Text>
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-600">
                  Exames: {patient.exams?.length || 0}
                </Text>
                <Text className="text-blue-600">Ver detalhes →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
