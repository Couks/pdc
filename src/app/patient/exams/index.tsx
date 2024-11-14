import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { examService } from "@/services/examService";
import { ExamResult } from "@/components/exam/ExamResult";

export default function MyExams() {
  const { user } = useAuth();

  const { data: exams } = useQuery({
    queryKey: ["my-exams", user?.id],
    queryFn: () => examService.getPatientExams(user?.id || ""),
    enabled: !!user?.id,
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Meus Exames</Text>

        <View className="space-y-4">
          {exams?.map((exam) => (
            <ExamResult key={exam.id} result={exam.result} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
