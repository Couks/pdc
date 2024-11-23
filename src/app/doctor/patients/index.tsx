import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";
import { Link } from "expo-router";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardHeader } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";

export default function PatientList() {
  const { user } = useAuth();

  const { data: patients, isLoading } = useQuery({
    queryKey: ["doctor-patients", user?.id],
    queryFn: () => doctorService.getPatients(user?.id || ""),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-foreground text-xl">
            Carregando pacientes...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">
            Meus Pacientes
          </Text>
          <Text className="text-muted-foreground mt-1">
            {patients?.length || 0} pacientes cadastrados
          </Text>
        </View>

        <ScrollView className="flex-1 px-4">
          <View className="py-4 gap-3">
            {patients?.map((patient: any) => (
              <Link
                key={patient.id}
                href={`/doctor/patients/${patient.id}`}
                asChild
              >
                <Card className="border border-border">
                  <CardContent className="p-4">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-xl font-semibold text-card-foreground mb-1">
                          {patient.name}
                        </Text>
                        <View className="flex-row items-center gap-2">
                          <Ionicons
                            name="mail-outline"
                            size={14}
                            color="hsl(var(--muted-foreground))"
                          />
                          <Text className="text-muted-foreground text-sm">
                            {patient.email}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-2 mt-1">
                          <Ionicons
                            name="water-outline"
                            size={14}
                            color="hsl(var(--muted-foreground))"
                          />
                          <Text className="text-muted-foreground text-sm">
                            Tipo Sanguíneo: {patient.clinicalData.bloodType}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-primary mr-1">Ver detalhes</Text>
                        <Ionicons
                          name="chevron-forward"
                          size={16}
                          color="hsl(var(--primary))"
                        />
                      </View>
                    </View>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
