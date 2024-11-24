import React, { useState } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { examService } from "@/services/examService";
import { ExamSelector } from "@/components/exam/ExamSelector";
import { Button } from "@/components/common/Button";
import { ChagasExamType } from "@/types/exam.types";
import { router, useLocalSearchParams } from "expo-router";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";

export default function RequestExam() {
  const { user } = useAuth();
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const [selectedExam, setSelectedExam] = useState<ChagasExamType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestExam = async () => {
    if (!selectedExam || !user || user.role !== "doctor" || !patientId) return;

    try {
      setIsLoading(true);
      await examService.requestExam(patientId, user.id, selectedExam);

      // Mostra feedback de sucesso
      Alert.alert(
        "Exame Solicitado",
        "O paciente receberá as instruções para coleta no laboratório.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error) {
      console.error("Erro ao solicitar exame:", error);
      Alert.alert(
        "Erro",
        "Não foi possível solicitar o exame. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Card className="mb-6">
            <CardContent className="p-4">
              <View className="flex-row items-center">
                <View className="bg-primary/10 p-2 rounded-full mr-3">
                  <Ionicons
                    name="information-circle"
                    size={24}
                    color="hsl(var(--primary))"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-card-foreground">
                    Nova Solicitação de Exame
                  </Text>
                  <Text className="text-muted-foreground">
                    Selecione o tipo de exame para o paciente
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>

          <ExamSelector onSelectExam={setSelectedExam} />

          <View className="p-4 mt-4">
            <Button
              variant="default"
              label={isLoading ? "Solicitando..." : "Solicitar Exame"}
              onPress={handleRequestExam}
              disabled={!selectedExam || isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
