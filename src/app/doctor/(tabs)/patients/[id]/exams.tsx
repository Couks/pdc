import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { examService } from "@/services/examService";
import { ExamResult } from "@/components/exam/ExamResult";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "@/components/common/Skeleton";
import { ExamRequest } from "@/types/exam.types";
import { Button } from "@/components/common/Button";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";

export default function PatientExams() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleRequestNewExam = () => {
    router.push({
      pathname: "/doctor/request-exam",
      params: { patientId: id },
    });
  };

  const { data: exams, isLoading } = useQuery({
    queryKey: ["patient-exams", id],
    queryFn: () => examService.getPatientExams(id),
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1">
          <View className="px-6 py-4 border-b border-border">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </View>

          <ScrollView className="flex-1 px-4">
            <View className="py-4 gap-3">
              {[1, 2, 3].map((index) => (
                <Skeleton key={index} className="h-48 w-full rounded-lg" />
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">
            Exames do Paciente
          </Text>
          <Text className="text-muted-foreground mt-1">
            {exams?.length || 0} exames realizados
          </Text>
        </View>

        <ScrollView className="flex-1 px-4">
          <View className="py-4 gap-3">
            <Animated.View
              entering={FadeInDown.duration(600)}
              layout={LinearTransition.springify()}
            >
              <Card className="border border-primary/20">
                <CardContent className="p-4">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-primary mb-1">
                        Solicitar Novo Exame
                      </Text>
                      <Text className="text-muted-foreground">
                        Clique para solicitar um novo exame para o paciente
                      </Text>
                    </View>
                    <Button
                      variant="default"
                      label="Solicitar"
                      onPress={handleRequestNewExam}
                      className="ml-4"
                    />
                  </View>
                </CardContent>
              </Card>
            </Animated.View>

            {exams?.map(
              (exam: ExamRequest) =>
                exam.result && (
                  <Animated.View
                    key={exam.id}
                    entering={FadeInDown.duration(600)}
                    layout={LinearTransition.springify()}
                  >
                    <Card className="border border-border">
                      <CardContent className="p-4">
                        <View className="flex-row justify-between items-start mb-2">
                          <View>
                            <Text className="text-lg font-semibold text-card-foreground">
                              {exam.examType}
                            </Text>
                            <Text className="text-muted-foreground">
                              Data:{" "}
                              {new Date(exam.requestDate).toLocaleDateString()}
                            </Text>
                          </View>
                          <View className="bg-green-100 px-3 py-1 rounded-full">
                            <Text className="text-green-600">Concluído</Text>
                          </View>
                        </View>

                        {exam.result.diagnosis === "INCONCLUSIVO" && (
                          <View className="mt-4 bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                            <View className="flex-row items-center justify-between">
                              <View className="flex-1">
                                <Text className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                                  Resultado Inconclusivo
                                </Text>
                                <Text className="text-yellow-700 dark:text-yellow-300">
                                  É recomendado realizar um novo exame para
                                  confirmação
                                </Text>
                              </View>
                              <Button
                                variant="default"
                                label="Solicitar Novo Exame"
                                className="ml-4"
                                onPress={handleRequestNewExam}
                              />
                            </View>
                          </View>
                        )}

                        <ExamResult result={exam.result} />
                      </CardContent>
                    </Card>
                  </Animated.View>
                )
            )}

            {(!exams || exams.length === 0) && (
              <Animated.View
                entering={FadeInDown.duration(600)}
                layout={LinearTransition.springify()}
              >
                <Card>
                  <CardContent className="py-8">
                    <View className="items-center">
                      <Ionicons
                        name="document-text-outline"
                        size={48}
                        color="hsl(var(--muted-foreground))"
                      />
                      <Text className="text-muted-foreground text-center mt-2 mb-4">
                        Nenhum exame encontrado para este paciente.
                      </Text>
                      <Button
                        variant="default"
                        label="Solicitar Primeiro Exame"
                        onPress={handleRequestNewExam}
                      />
                    </View>
                  </CardContent>
                </Card>
              </Animated.View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
