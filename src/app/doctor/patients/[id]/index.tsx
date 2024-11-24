import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/api";
import { Card, CardHeader, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  SlideInRight,
  LinearTransition,
} from "react-native-reanimated";
import { Skeleton } from "@/components/common/Skeleton";

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
        <ScrollView className="flex-1 p-4">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </View>
            <Skeleton className="h-12 w-12 rounded-full" />
          </View>

          <View className="gap-6">
            <Card className="mb-4">
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
              </CardHeader>
              <CardContent className="gap-3">
                {[1, 2, 3].map((index) => (
                  <Skeleton key={index} className="h-12 w-full rounded-lg" />
                ))}
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
              </CardHeader>
              <CardContent className="gap-3">
                {[1, 2, 3].map((index) => (
                  <Skeleton key={index} className="h-12 w-full rounded-lg" />
                ))}
              </CardContent>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!patient) return null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <Animated.View
          entering={SlideInRight.duration(600)}
          className="flex-row items-center justify-between mb-6"
        >
          <View>
            <Text className="text-2xl font-bold text-foreground">
              {patient.name}
            </Text>
            <Text className="text-primary">Detalhes do Paciente</Text>
          </View>
          <View className="bg-primary/20 p-3 rounded-full">
            <Ionicons name="person" size={28} color="hsl(var(--primary))" />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          layout={LinearTransition.springify()}
        >
          <Card className="mb-4">
            <CardHeader>
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name="information-circle"
                  size={24}
                  color="hsl(var(--primary))"
                />
                <Text className="text-lg font-semibold text-primary">
                  Informações Pessoais
                </Text>
              </View>
            </CardHeader>
            <CardContent className="gap-3">
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="hsl(var(--primary))"
                />
                <Text className="text-card-foreground flex-1">
                  {patient.email}
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="call-outline"
                  size={20}
                  color="hsl(var(--primary))"
                />
                <Text className="text-card-foreground flex-1">
                  {patient.phone}
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="hsl(var(--primary))"
                />
                <Text className="text-card-foreground flex-1">
                  {patient.address}
                </Text>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          layout={LinearTransition.springify()}
        >
          <Card className="mb-6">
            <CardHeader>
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name="medical"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-lg font-semibold text-primary">
                  Dados Clínicos
                </Text>
              </View>
            </CardHeader>
            <CardContent className="gap-3">
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="water"
                  size={20}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground">
                  Tipo Sanguíneo:{" "}
                  <Text className="font-bold">
                    {patient.clinicalData.bloodType}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="alert-circle"
                  size={20}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1">
                  Alergias:{" "}
                  <Text className="font-bold">
                    {patient.clinicalData.allergies.join(", ") || "Nenhuma"}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="fitness"
                  size={20}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1">
                  Condições Crônicas:{" "}
                  <Text className="font-bold">
                    {patient.clinicalData.chronicConditions.join(", ") ||
                      "Nenhuma"}
                  </Text>
                </Text>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(600)}
          layout={LinearTransition.springify()}
        >
          <Link href={`/doctor/patients/${id}/exams`} asChild>
            <TouchableOpacity className="active:opacity-80">
              <Card className="">
                <CardContent className="p-4">
                  <View className="flex-row items-center">
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-primary">
                        Ver Exames
                      </Text>
                      <Text className="text-muted-foreground">
                        Visualizar todos os exames do paciente
                      </Text>
                    </View>
                    <View className="bg-accent/10 p-2 rounded-full">
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="hsl(var(--accent))"
                      />
                    </View>
                  </View>
                </CardContent>
              </Card>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
