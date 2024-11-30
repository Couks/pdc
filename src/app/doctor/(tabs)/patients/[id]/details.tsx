import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardHeader, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  SlideInRight,
  LinearTransition,
} from "react-native-reanimated";
import { Skeleton } from "@/components/common/Skeleton";

export const symptomTranslations: Record<string, string> = {
  fever: "Febre",
  malaise: "Mal-estar",
  swellingAtBiteLocation: "Inchaço no local da picada",
  swollenEyes: "Olhos inchados",
  fatigue: "Fadiga",
  nauseaAndVomiting: "Náusea e vômito",
  diarrhea: "Diarreia",
  lymphNodeInflammation: "Inflamação dos gânglios",
  bodyNodes: "Nódulos pelo corpo",
  bodyRedness: "Vermelhidão pelo corpo",
  enlargedLiverAndSpleen: "Fígado e baço aumentados",
};

export default function PatientDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: patient, isLoading } = useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const { data: patients } = await api.get("/patients");
      const patient = patients.find((p: any) => p.id === id);
      if (!patient) throw new Error("Patient not found");
      return patient;
    },
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

  // Função para formatar a data de nascimento e calcular idade
  const formatBirthDateAndAge = (birthDate: string) => {
    const date = new Date(birthDate);
    const formattedDate = date.toLocaleDateString("pt-BR");

    const ageDifMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return `${formattedDate} (${age} anos)`;
  };

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
            <Ionicons name="person" size={28} color="hsl(var(--secondary))" />
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
                  size={28}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-xl font-semibold text-primary">
                  Informações Pessoais
                </Text>
              </View>
            </CardHeader>
            <CardContent className="gap-3">
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons name="mail" size={24} color="hsl(var(--secondary))" />
                <Text className="text-card-foreground flex-1 text-lg">
                  {patient.email}
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="calendar"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1 text-lg">
                  {formatBirthDateAndAge(patient.birthDate)}
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="person"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1 text-lg">
                  {patient.gender}
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons name="call" size={24} color="hsl(var(--secondary))" />
                <Text className="text-card-foreground flex-1 text-lg">
                  {patient.phone}
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="location"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1 text-lg">
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
                  size={28}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-xl font-semibold text-primary">
                  Dados Clínicos
                </Text>
              </View>
            </CardHeader>
            <CardContent className="gap-3">
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="water"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground text-lg">
                  Tipo Sanguíneo:{" "}
                  <Text className="font-bold">
                    {patient.clinicalData.bloodType || "Não informado"}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="alert-circle"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1 text-lg">
                  Alergias:{" "}
                  <Text className="font-bold">
                    {patient.clinicalData.allergies?.join(", ") || "Nenhuma"}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="fitness"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1 text-lg">
                  Condições Crônicas:{" "}
                  <Text className="font-bold">
                    {patient.clinicalData.chronicConditions?.join(", ") ||
                      "Nenhuma"}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg">
                <Ionicons
                  name="medkit"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1 text-lg">
                  Medicamentos:{" "}
                  <Text className="font-bold">
                    {patient.clinicalData.medications?.join(", ") || "Nenhum"}
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
          <Card className="mb-6">
            <CardHeader>
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name="warning"
                  size={28}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-xl font-semibold text-primary">
                  Sintomas
                </Text>
              </View>
            </CardHeader>
            <CardContent className="gap-3">
              {Object.keys(patient.clinicalData.symptoms || {})
                .filter((symptom) => patient.clinicalData.symptoms?.[symptom])
                .map((symptom) => (
                  <View
                    key={symptom}
                    className="flex-row items-center gap-3 bg-muted/30 p-3 rounded-lg"
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="hsl(var(--secondary))"
                    />
                    <Text className="text-card-foreground flex-1 text-lg">
                      {symptomTranslations[symptom] || symptom}
                    </Text>
                  </View>
                ))}
              <View className="bg-muted/30 p-3 rounded-lg mt-2">
                <Text className="text-card-foreground text-lg font-semibold mb-2">
                  Descrição:
                </Text>
                <Text className="text-card-foreground text-lg">
                  {patient.clinicalData.description || "Sem descrição"}
                </Text>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(800)}
          layout={LinearTransition.springify()}
          className="mb-8"
        >
          <Link href={`/doctor/patients/${id}/exams`} asChild>
            <TouchableOpacity className="active:opacity-80">
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-center">
                    <View className="flex-1">
                      <Text className="text-xl font-semibold text-primary">
                        Ver Exames
                      </Text>
                      <Text className="text-muted-foreground">
                        Visualizar todos os exames do paciente
                      </Text>
                    </View>
                    <View className="bg-accent/10 p-2 rounded-full">
                      <Ionicons
                        name="chevron-forward"
                        size={28}
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
