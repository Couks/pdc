import { View, Text, ScrollView } from "react-native";
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
import { ExamRequest } from "@/types/exam.types";

export default function PatientExams() {
  const { user } = useAuth();

  const { data: exams, isLoading } = useQuery({
    queryKey: ["patient-exams", user?.id],
    queryFn: () => patientService.getExams(user?.id || ""),
    enabled: !!user?.id,
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "CONCLUIDO":
        return {
          bg: "bg-green-100",
          text: "text-green-600",
          icon: "checkmark-circle",
          label: "Concluído",
        };
      case "PENDENTE":
        return {
          bg: "bg-orange-100",
          text: "text-orange-600",
          icon: "time",
          label: "Pendente",
        };
      default:
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          icon: "sync",
          label: "Em Análise",
        };
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="p-4">
          <Skeleton className="h-8 w-48 mb-6" />
          <View className="gap-4">
            {[1, 2, 3].map((index) => (
              <Skeleton key={index} className="h-40 w-full rounded-lg" />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="flex-row items-center justify-between mb-6"
        >
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Meus Exames
            </Text>
            <Text className="text-muted-foreground">
              {exams?.length || 0} exames solicitados
            </Text>
          </View>
          <View className="bg-primary/10 p-2 rounded-full">
            <Ionicons
              name="document-text"
              size={24}
              color="hsl(var(--primary))"
            />
          </View>
        </Animated.View>

        <View className="gap-4">
          {exams?.map((exam: ExamRequest, index: number) => {
            const status = getStatusConfig(exam.status);
            return (
              <Animated.View
                key={exam.id}
                entering={FadeInDown.duration(600).delay(index * 100)}
                layout={LinearTransition.springify()}
              >
                <Card>
                  <CardContent className="p-4">
                    <View className="flex-row justify-between items-start mb-4">
                      <View>
                        <Text className="text-lg font-semibold text-card-foreground">
                          {exam.examType}
                        </Text>
                        <Text className="text-muted-foreground">
                          Solicitado em: {formatDate(exam.requestDate)}
                        </Text>
                      </View>
                      <View
                        className={`${status.bg} px-3 py-1 rounded-full flex-row items-center gap-1`}
                      >
                        <Ionicons
                          name={status.icon as any}
                          size={16}
                          color={status.text.replace("text-", "")}
                        />
                        <Text className={status.text}>{status.label}</Text>
                      </View>
                    </View>

                    {exam.result && (
                      <View className="bg-muted/30 p-4 rounded-lg">
                        <View className="flex-row items-center gap-2 mb-2">
                          <Ionicons
                            name="clipboard"
                            size={20}
                            color="hsl(var(--primary))"
                          />
                          <Text className="font-medium text-card-foreground">
                            Resultado
                          </Text>
                        </View>
                        <View className="ml-7">
                          <Text className="text-card-foreground">
                            Diagnóstico:{" "}
                            <Text className="font-semibold">
                              {exam.result.diagnosis}
                            </Text>
                          </Text>
                          {exam.result.notes && (
                            <Text className="text-muted-foreground mt-1">
                              {exam.result.notes}
                            </Text>
                          )}
                        </View>
                      </View>
                    )}
                  </CardContent>
                </Card>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}