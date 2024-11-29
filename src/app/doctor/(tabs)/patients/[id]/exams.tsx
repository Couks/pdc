import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { examService } from "@/services/api";
import { ExamResult } from "@/components/exam/ExamResult";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/Button";
import { ExamRequest, ChagasExamType } from "@/types";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native";

const CHAGAS_EXAM_TYPES = ["ELISA", "IFI", "WESTERN_BLOT", "HEMAGLUTINACAO"];

function isChagasExam(examType: ChagasExamType): boolean {
  return CHAGAS_EXAM_TYPES.includes(examType);
}

export default function PatientExams() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const handleRequestNewExam = () => {
    router.push({
      pathname: "/doctor/request-exam",
      params: { patientId: id },
    });
  };

  // Busca os exames do paciente
  const { data: examRequests, isLoading: isLoadingExams } = useQuery({
    queryKey: ["patient-exams", id],
    queryFn: () => examService.getPatientExams(id),
    enabled: !!id,
  });

  // Busca os exames complementares
  const { data: complementaryExams, isLoading: isLoadingComplementary } =
    useQuery({
      queryKey: ["complementary-exams", id],
      queryFn: () => examService.getComplementaryExams(id),
      enabled: !!id,
    });

  // Mutação para deletar exame
  const deleteExamMutation = useMutation({
    mutationFn: async (examId: string) => {
      await examService.deleteExam(id, examId);
    },
    onSuccess: () => {
      // Invalida as queries para recarregar os dados
      queryClient.invalidateQueries({ queryKey: ["patient-exams", id] });
      queryClient.invalidateQueries({ queryKey: ["complementary-exams", id] });
      queryClient.invalidateQueries({ queryKey: ["doctor-exams"] });
    },
  });

  const handleDeleteExam = (examId: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este exame? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteExamMutation.mutate(examId),
        },
      ]
    );
  };

  if (isLoadingExams || isLoadingComplementary) {
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

  const chagasExams =
    examRequests?.filter((exam: ExamRequest) => isChagasExam(exam.examType)) ||
    [];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">
            Exames do Paciente
          </Text>
          <Text className="text-muted-foreground mt-1">
            {(examRequests?.length || 0) + (complementaryExams?.length || 0)}{" "}
            exames realizados
          </Text>
        </View>

        <ScrollView className="flex-1">
          <View className="py-4">
            {/* Request New Exam Card */}
            <View className="px-4 mb-6">
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
            </View>

            {/* Chagas Disease Exams Section */}
            <View className="mb-6 bg-primary/5 py-6">
              <Text className="text-xl font-semibold text-foreground mb-4 px-4">
                Exames de Doença de Chagas
              </Text>
              <View className="px-4">
                {chagasExams.map((exam: ExamRequest) => (
                  <Animated.View
                    key={exam.id}
                    entering={FadeInDown.duration(600)}
                    layout={LinearTransition.springify()}
                    className="mb-3"
                  >
                    <Card className="border-2 border-primary/20">
                      <CardContent className="p-4">
                        <View className="flex-row items-center mb-3">
                          <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center mr-4">
                            <Ionicons
                              name="flask"
                              size={24}
                              color="hsl(var(--primary))"
                            />
                          </View>
                          <View className="flex-1">
                            <Text className="text-lg font-semibold text-card-foreground">
                              {exam.examType}
                            </Text>
                            <Text className="text-muted-foreground">
                              Data:{" "}
                              {new Date(exam.requestDate).toLocaleDateString()}
                            </Text>
                          </View>
                          <View className="flex-row items-center gap-2">
                            <View
                              className={`px-3 py-1 rounded-full ${
                                exam.status === "CONCLUIDO"
                                  ? "bg-green-100"
                                  : exam.status === "EM_ANALISE"
                                  ? "bg-yellow-100"
                                  : "bg-blue-100"
                              }`}
                            >
                              <Text
                                className={
                                  exam.status === "CONCLUIDO"
                                    ? "text-green-600"
                                    : exam.status === "EM_ANALISE"
                                    ? "text-yellow-600"
                                    : "text-blue-600"
                                }
                              >
                                {exam.status === "CONCLUIDO"
                                  ? "Concluído"
                                  : exam.status === "EM_ANALISE"
                                  ? "Em Análise"
                                  : "Pendente"}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => handleDeleteExam(exam.id)}
                              className="p-2"
                            >
                              <Ionicons
                                name="trash-outline"
                                size={20}
                                color="hsl(var(--destructive))"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>

                        {exam.result && (
                          <>
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
                            <ExamResult
                              result={{
                                ...exam.result,
                                examType: exam.examType,
                                description: exam.result.notes || "",
                                date:
                                  exam.result.resultDate || exam.requestDate,
                              }}
                            />
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </Animated.View>
                ))}
              </View>
            </View>

            {/* Complementary Exams Section */}
            <View className="px-4">
              <Text className="text-xl font-semibold text-foreground mb-4">
                Exames Complementares
              </Text>
              {complementaryExams?.map((exam: ExamRequest) => (
                <Animated.View
                  key={exam.id}
                  entering={FadeInDown.duration(600)}
                  layout={LinearTransition.springify()}
                  className="mb-3"
                >
                  <Card className="border border-border">
                    <CardContent className="p-4">
                      <View className="flex-row items-center mb-3">
                        <View className="w-12 h-12 bg-muted rounded-full items-center justify-center mr-4">
                          <Ionicons
                            name="document-text"
                            size={24}
                            color="hsl(var(--muted-foreground))"
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-lg font-semibold text-card-foreground">
                            {exam.examType}
                          </Text>
                          <Text className="text-muted-foreground">
                            Data:{" "}
                            {new Date(exam.requestDate).toLocaleDateString()}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                          <View
                            className={`px-3 py-1 rounded-full ${
                              exam.status === "CONCLUIDO"
                                ? "bg-green-100"
                                : exam.status === "EM_ANALISE"
                                ? "bg-yellow-100"
                                : "bg-blue-100"
                            }`}
                          >
                            <Text
                              className={
                                exam.status === "CONCLUIDO"
                                  ? "text-green-600"
                                  : exam.status === "EM_ANALISE"
                                  ? "text-yellow-600"
                                  : "text-blue-600"
                              }
                            >
                              {exam.status === "CONCLUIDO"
                                ? "Concluído"
                                : exam.status === "EM_ANALISE"
                                ? "Em Análise"
                                : "Pendente"}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => handleDeleteExam(exam.id)}
                            className="p-2"
                          >
                            <Ionicons
                              name="trash-outline"
                              size={20}
                              color="hsl(var(--destructive))"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {exam.result && (
                        <>
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
                          <ExamResult
                            result={{
                              ...exam.result,
                              examType: exam.examType,
                              description: exam.result.notes || "",
                              date: exam.result.resultDate || exam.requestDate,
                            }}
                          />
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Animated.View>
              ))}
            </View>

            {!examRequests?.length && !complementaryExams?.length && (
              <Animated.View
                entering={FadeInDown.duration(600)}
                layout={LinearTransition.springify()}
                className="px-4"
              >
                <Card>
                  <CardContent className="py-8">
                    <View className="items-center">
                      <Ionicons
                        name="document-text"
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
