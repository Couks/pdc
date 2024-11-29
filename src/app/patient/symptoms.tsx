import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { patientService } from "@/services/api";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/common/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Symptoms } from "@/types";
import { Alert } from "react-native";

export default function PatientSymptoms() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: clinicalData, isLoading } = useQuery({
    queryKey: ["clinical-data", user?.id],
    queryFn: () =>
      patientService
        .getById(user?.id || "")
        .then((patient) => patient.clinicalData),
    enabled: !!user?.id,
  });

  const updateSymptomsMutation = useMutation({
    mutationFn: (symptoms: Symptoms) =>
      patientService.updateClinicalData(user?.id || "", {
        ...clinicalData,
        symptoms,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinical-data"] });
    },
  });

  const symptoms = [
    { key: "fever", label: "Febre" },
    { key: "malaise", label: "Mal-estar" },
    { key: "swellingAtBiteLocation", label: "Inchaço no Local da Picada" },
    { key: "swollenEyes", label: "Olhos Inchados" },
    { key: "fatigue", label: "Fadiga" },
    { key: "nauseaAndVomiting", label: "Náusea e Vômito" },
    { key: "diarrhea", label: "Diarreia" },
    { key: "lymphNodeInflammation", label: "Inflamação dos Gânglios" },
    { key: "bodyNodes", label: "Nódulos pelo Corpo" },
    { key: "bodyRedness", label: "Vermelhidão no Corpo" },
    { key: "enlargedLiverAndSpleen", label: "Fígado e Baço Aumentados" },
  ];

  const toggleSymptom = (key: keyof Symptoms) => {
    if (!clinicalData) return;

    const updatedSymptoms = {
      ...clinicalData.symptoms,
      [key]: !clinicalData.symptoms[key],
    };

    updateSymptomsMutation.mutate(updatedSymptoms);
  };

  const checkChagasRisk = () => {
    if (!clinicalData) return;

    const criticalSymptoms = [
      "swellingAtBiteLocation",
      "swollenEyes",
      "lymphNodeInflammation",
      "enlargedLiverAndSpleen",
    ];

    const generalSymptoms = [
      "fever",
      "malaise",
      "fatigue",
      "nauseaAndVomiting",
    ];

    const hasCriticalSymptoms = criticalSymptoms.some(
      (symptom) => clinicalData.symptoms[symptom as keyof Symptoms]
    );

    const generalSymptomsCount = generalSymptoms.filter(
      (symptom) => clinicalData.symptoms[symptom as keyof Symptoms]
    ).length;

    if (hasCriticalSymptoms && generalSymptomsCount >= 2) {
      Alert.alert(
        "Atenção!",
        "Seus sintomas indicam possibilidade de Doença de Chagas. Procure um médico imediatamente para avaliação.",
        [
          {
            text: "Entendi",
            style: "default",
          },
        ]
      );
    } else if (generalSymptomsCount >= 3) {
      Alert.alert(
        "Aviso",
        "Você apresenta alguns sintomas que podem estar relacionados à Doença de Chagas. Recomendamos consultar um médico para avaliação.",
        [
          {
            text: "OK",
            style: "default",
          },
        ]
      );
    } else {
      Alert.alert(
        "Resultado",
        "Com base nos sintomas selecionados, não há indicativos de Doença de Chagas no momento. Continue monitorando sua saúde e, caso novos sintomas apareçam, faça uma nova verificação.",
        [
          {
            text: "OK",
            style: "default",
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="flex-row items-center justify-between mb-6"
        >
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Meus Sintomas
            </Text>
            <Text className="text-muted-foreground">
              Selecione os sintomas que você está sentindo
            </Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            <Ionicons name="fitness" size={24} color="hsl(var(--primary))" />
          </View>
        </Animated.View>

        <Card>
          <CardContent className="p-4">
            <View className="flex-row flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom.key}
                  onPress={() => toggleSymptom(symptom.key as keyof Symptoms)}
                  className="flex-row items-center bg-muted/30 p-4 rounded-lg w-[48.5%]"
                >
                  <View
                    className={`w-6 h-6 rounded-full mr-3 items-center justify-center ${
                      clinicalData?.symptoms[symptom.key as keyof Symptoms]
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  >
                    {clinicalData?.symptoms[symptom.key as keyof Symptoms] && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </View>
                  <Text className="text-card-foreground text-sm flex-1">
                    {symptom.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </CardContent>
        </Card>

        <View className="mt-6 mb-8">
          <Button
            variant="default"
            label="Verificar Risco"
            onPress={checkChagasRisk}
            className="w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
