import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { examService } from "@/services/examService";
import { ExamSelector } from "@/components/exam/ExamSelector";
import { Button } from "@/components/common/Button";
import { ChagasExamType } from "@/types/exam.types";
import { router } from "expo-router";

export default function RequestExam() {
  const { user } = useAuth();
  const [selectedExam, setSelectedExam] = useState<ChagasExamType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestExam = async () => {
    if (!selectedExam || !user || user.role !== "doctor") return;

    try {
      setIsLoading(true);
      // Aqui você precisaria passar o patientId do paciente selecionado
      // Você pode pegar isso dos parâmetros da rota ou de um estado global
      const patientId = ""; // TODO: Get from route params
      await examService.requestExam(patientId, user.id, selectedExam);
      router.back();
    } catch (error) {
      console.error("Failed to request exam:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <ExamSelector onSelectExam={setSelectedExam} />

        <View className="p-4">
          <Button
            variant="default"
            label="Solicitar Exame"
            onPress={handleRequestExam}
            disabled={!selectedExam || isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
