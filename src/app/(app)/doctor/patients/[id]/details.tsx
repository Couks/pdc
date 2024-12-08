import Animated, {
  FadeInDown,
  SlideInRight,
  LinearTransition,
} from "react-native-reanimated";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/common/Skeleton";
import { useLocalSearchParams, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card, CardHeader, CardContent } from "@/components/common/Card";

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
        <ScrollView className="flex-1 px-4 py-6">
          <View className="flex-row items-center justify-between mb-8">
            <View>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </View>
            <View className="bg-primary/20 p-3 rounded-full">
              <Skeleton className="h-7 w-7 rounded-full" />
            </View>
          </View>

          <View className="gap-8">
            {/* Informações Pessoais */}
            <Card className="shadow-sm">
              <CardHeader className="pb-6">
                <View className="flex-row items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </View>
              </CardHeader>
              <CardContent className="gap-4">
                {[1, 2, 3, 4, 5].map((index) => (
                  <View
                    key={index}
                    className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl"
                  >
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-5 flex-1" />
                  </View>
                ))}
              </CardContent>
            </Card>

            {/* Dados Clínicos */}
            <Card className="shadow-sm">
              <CardHeader className="pb-6">
                <View className="flex-row items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-40" />
                </View>
              </CardHeader>
              <CardContent className="gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <View
                    key={index}
                    className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl"
                  >
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-5 flex-1" />
                  </View>
                ))}
              </CardContent>
            </Card>

            {/* Sintomas */}
            <Card className="shadow-sm">
              <CardHeader className="pb-6">
                <View className="flex-row items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                </View>
              </CardHeader>
              <CardContent className="gap-4">
                {[1, 2, 3].map((index) => (
                  <View
                    key={index}
                    className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl"
                  >
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-5 flex-1" />
                  </View>
                ))}
                <View className="bg-muted/30 p-4 rounded-xl mt-2">
                  <Skeleton className="h-5 w-32 mb-3" />
                  <Skeleton className="h-20 w-full" />
                </View>
              </CardContent>
            </Card>

            {/* Ver Exames */}
            <Card className="shadow-sm mb-4">
              <CardContent className="p-5">
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-64" />
                  </View>
                  <View className="bg-accent/10 p-3 rounded-full">
                    <Skeleton className="h-7 w-7 rounded-full" />
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
      <ScrollView className="flex-1 px-4 py-6">
        <Animated.View
          entering={SlideInRight.duration(600)}
          className="flex-row items-center justify-between mb-8"
        >
          <View>
            <Text className="text-3xl font-bold text-foreground mb-1">
              {patient.name}
            </Text>
            <Text className="text-primary text-lg">Detalhes do Paciente</Text>
          </View>
          <View className="bg-primary/20 p-4 rounded-full">
            <Ionicons name="person" size={32} color="hsl(var(--secondary))" />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          layout={LinearTransition.springify()}
        >
          <Card className="mb-8 shadow-sm">
            <CardHeader className="pb-6">
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="information-circle"
                  size={32}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-2xl font-semibold text-primary">
                  Informações Pessoais
                </Text>
              </View>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl">
                <Ionicons name="mail" size={26} color="hsl(var(--secondary))" />
                <Text className="text-card-foreground flex-1 text-lg">
                  {patient.email}
                </Text>
              </View>
              <View className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl">
                <Ionicons
                  name="calendar"
                  size={26}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1 text-lg">
                  {formatBirthDateAndAge(patient.birthDate)}
                </Text>
              </View>
              <View className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl">
                <Ionicons
                  name="person"
                  size={26}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1 text-lg">
                  {patient.gender}
                </Text>
              </View>
              <View className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl">
                <Ionicons name="call" size={26} color="hsl(var(--secondary))" />
                <Text className="text-card-foreground flex-1 text-lg">
                  {patient.phone}
                </Text>
              </View>
              <View className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl">
                <Ionicons
                  name="location"
                  size={26}
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
          <Card className="mb-8 shadow-sm">
            <CardHeader className="pb-6">
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="medical"
                  size={32}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-2xl font-semibold text-primary">
                  Dados Clínicos
                </Text>
              </View>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl">
                <Ionicons
                  name="water"
                  size={26}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground text-lg">
                  Tipo Sanguíneo:{" "}
                  <Text className="font-bold">
                    {patient.clinicalData.bloodType || "Não informado"}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl">
                <Ionicons
                  name="alert-circle"
                  size={26}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-card-foreground flex-1 text-lg">
                  Alergias:{" "}
                  <Text className="font-bold">
                    {patient.clinicalData.allergies?.join(", ") || "Nenhuma"}
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl">
                <Ionicons
                  name="fitness"
                  size={26}
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
              <View className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl">
                <Ionicons
                  name="medkit"
                  size={26}
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
          <Card className="mb-8 shadow-sm">
            <CardHeader className="pb-6">
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="warning"
                  size={32}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-2xl font-semibold text-primary">
                  Sintomas
                </Text>
              </View>
            </CardHeader>
            <CardContent className="gap-4">
              {Object.keys(patient.clinicalData.symptoms || {})
                .filter((symptom) => patient.clinicalData.symptoms?.[symptom])
                .map((symptom) => (
                  <View
                    key={symptom}
                    className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-xl"
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={26}
                      color="hsl(var(--secondary))"
                    />
                    <Text className="text-card-foreground flex-1 text-lg">
                      {symptomTranslations[symptom] || symptom}
                    </Text>
                  </View>
                ))}
              <View className="bg-muted/30 p-4 rounded-xl mt-2">
                <Text className="text-card-foreground text-lg font-semibold mb-3">
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
              <Card className="shadow-sm">
                <CardContent className="p-5">
                  <View className="flex-row items-center">
                    <View className="flex-1">
                      <Text className="text-2xl font-semibold text-primary mb-1">
                        Ver Exames
                      </Text>
                      <Text className="text-muted-foreground text-lg">
                        Visualizar todos os exames do paciente
                      </Text>
                    </View>
                    <View className="bg-accent/10 p-3 rounded-full">
                      <Ionicons
                        name="chevron-forward"
                        size={32}
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
