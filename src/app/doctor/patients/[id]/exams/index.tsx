import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { examService } from "@/services/examService";
import { ExamResult } from "@/components/exam/ExamResult";

export default function PatientExams() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: exams, isLoading } = useQuery({
    queryKey: ["patient-exams", id],
    queryFn: () => examService.getPatientExams(id),
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 p-4">
          <Text>Carregando exames...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Exames do Paciente</Text>

        <View className="space-y-4">
          {exams?.map(
            (exam) =>
              exam.result && <ExamResult key={exam.id} result={exam.result} />
          )}
        </View>

        {(!exams || exams.length === 0) && (
          <Text className="text-gray-500 text-center">
            Nenhum exame encontrado para este paciente.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
