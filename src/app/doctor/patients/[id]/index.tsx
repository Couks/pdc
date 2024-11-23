import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";
import { Button } from "@/components/common/Button";
import { Card, CardHeader, CardContent } from "@/components/common/Card";

export default function PatientDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: patient, isLoading } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => doctorService.getPatientDetails(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 p-4">
          <Text className="text-foreground">
            Carregando dados do paciente...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!patient) return null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4 text-foreground">
          {patient.name}
        </Text>

        <Card className="mb-4">
          <CardHeader>
            <Text className="text-lg font-semibold text-card-foreground">
              Informações Pessoais
            </Text>
          </CardHeader>
          <CardContent>
            <Text className="text-card-foreground">Email: {patient.email}</Text>
            <Text className="text-card-foreground">
              Telefone: {patient.phone}
            </Text>
            <Text className="text-card-foreground">
              Endereço: {patient.address}
            </Text>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <Text className="text-lg font-semibold text-card-foreground">
              Dados Clínicos
            </Text>
          </CardHeader>
          <CardContent>
            <Text className="text-card-foreground">
              Tipo Sanguíneo: {patient.clinicalData.bloodType}
            </Text>
            <Text className="text-card-foreground">
              Alergias: {patient.clinicalData.allergies.join(", ") || "Nenhuma"}
            </Text>
            <Text className="text-card-foreground">
              Condições Crônicas:{" "}
              {patient.clinicalData.chronicConditions.join(", ") || "Nenhuma"}
            </Text>
          </CardContent>
        </Card>

        <Link href={`/doctor/patients/${id}/exams`} asChild>
          <Button
            variant="default"
            className="w-full"
            label="Ver Exames do Paciente"
          />
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
