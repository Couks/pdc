import React from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { examService } from "@/services/examService";
import { ExamResult } from "@/components/exam/ExamResult";

export default function ExamResults() {
  const { user } = useAuth();

  const { data: exams, isLoading } = useQuery({
    queryKey: ["exams", user?.id],
    queryFn: () =>
      user?.role === "doctor"
        ? examService.getDoctorExams(user.id)
        : examService.getPatientExams(user.id),
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text>Carregando exames...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Resultados dos Exames</Text>

        <View className="gap-4">
          {exams?.map((exam) =>
            exam.result ? (
              <ExamResult key={exam.id} result={exam.result} />
            ) : (
              <View key={exam.id} className="bg-white p-4 rounded-lg shadow-sm">
                <Text className="text-lg font-semibold">Exame Pendente</Text>
                <Text className="text-gray-600">
                  Data da Solicitação:{" "}
                  {new Date(exam.requestDate).toLocaleDateString()}
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
