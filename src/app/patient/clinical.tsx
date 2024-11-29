import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/services/api";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { Skeleton } from "@/components/common/Skeleton";
import { Link } from "expo-router";

export default function PatientClinical() {
  const { user } = useAuth();

  const { data: clinicalData, isLoading } = useQuery({
    queryKey: ["clinical-data", user?.id],
    queryFn: () =>
      patientService
        .getById(user?.id || "")
        .then((patient) => patient.clinicalData),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="p-4">
          <Skeleton className="h-8 w-48 mb-4" />
          <View className="gap-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const mainInfo = [
    {
      title: "Tipo Sanguíneo",
      icon: "water",
      color: "primary",
      value: clinicalData?.bloodType,
    },
    {
      title: "Alergias",
      icon: "alert-circle",
      color: "destructive",
      value: clinicalData?.allergies.join(", ") || "Nenhuma alergia registrada",
    },
    {
      title: "Condições Crônicas",
      icon: "fitness",
      color: "secondary",
      value:
        clinicalData?.chronicConditions.join(", ") ||
        "Nenhuma condição registrada",
    },
    {
      title: "Medicações em Uso",
      icon: "medical",
      color: "accent",
      value:
        clinicalData?.medications.join(", ") || "Nenhuma medicação registrada",
    },
  ];

  const symptoms = [
    { key: "fever", label: "Febre" },
    { key: "malaise", label: "Mal-estar" },
    { key: "swellingAtBiteLocation", label: "Inchaço no Local da Picada" },
    { key: "swollenEyes", label: "Olhos Inchados" },
    { key: "fatigue", label: "Fadiga" },
    { key: "nauseaAndVomiting", label: "Náusea e Vômito" },
    { key: "diarrhea", label: "Diarreia" },
    { key: "lymphNodeInflammation", label: "Inflamação dos Gânglios" },
    { key: "bodyNodes", label: "Nódulos no Corpo" },
    { key: "bodyRedness", label: "Vermelhidão no Corpo" },
    { key: "enlargedLiverAndSpleen", label: "Fígado e Baço Aumentados" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <Animated.View
          entering={FadeInDown.duration(600)}
          layout={LinearTransition.springify()}
          className="flex-row items-center justify-between mb-4"
        >
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Dados Clínicos
            </Text>
            <Text className="text-muted-foreground">
              Informações detalhadas de saúde
            </Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            <Ionicons name="heart" size={24} color="hsl(var(--primary))" />
          </View>
        </Animated.View>

        <View className="gap-4 mb-4">
          {mainInfo.map((info, index) => (
            <Animated.View
              key={info.title}
              entering={FadeInDown.duration(600).delay(index * 100)}
              layout={LinearTransition.springify()}
            >
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-start gap-4">
                    <View className={`bg-${info.color}/10 p-2 rounded-full`}>
                      <Ionicons
                        name={info.icon as any}
                        size={24}
                        color={`hsl(var(--${info.color}))`}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-card-foreground mb-1">
                        {info.title}
                      </Text>
                      <Text className="text-muted-foreground">
                        {info.value}
                      </Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </Animated.View>
          ))}
        </View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          layout={LinearTransition.springify()}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-4">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons
                  name="warning"
                  size={24}
                  color="hsl(var(--warning))"
                />
                <Text className="text-lg font-semibold text-card-foreground">
                  Sintomas Atuais
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {symptoms.map(
                  (symptom, index) =>
                    clinicalData?.symptoms[symptom.key] && (
                      <Animated.View
                        key={symptom.key}
                        entering={FadeInDown.duration(300).delay(index * 50)}
                        className="bg-warning/10 px-3 py-1 rounded-full"
                      >
                        <Text className="text-sm text-warning-foreground">
                          {symptom.label}
                        </Text>
                      </Animated.View>
                    )
                )}
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(500)}
          layout={LinearTransition.springify()}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-4">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons
                  name="document-text"
                  size={24}
                  color="hsl(var(--secondary))"
                />
                <Text className="text-lg font-semibold text-card-foreground">
                  Descrição Clínica
                </Text>
              </View>
              <Text className="text-muted-foreground">
                {clinicalData?.description || "Nenhuma descrição disponível"}
              </Text>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(600)}
          layout={LinearTransition.springify()}
          className="mb-8"
        >
          <Link href="/patient/symptoms" asChild>
            <TouchableOpacity>
              <Card>
                <CardContent className="p-4">
                  <View className="flex-row items-center">
                    <View className="bg-primary/10 p-3 rounded-full mr-4">
                      <Ionicons
                        name="fitness"
                        size={24}
                        color="hsl(var(--primary))"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-card-foreground">
                        Atualizar Sintomas
                      </Text>
                      <Text className="text-muted-foreground">
                        Registre os sintomas que você está sentindo
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="hsl(var(--muted-foreground))"
                    />
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
