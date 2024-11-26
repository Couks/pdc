import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { patientService } from "@/services/api";
import { Card, CardContent } from "@/components/common/Card";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Animated, {
  FadeInDown,
  LinearTransition,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { ExamRequest } from "@/types/exam.types";

export default function PatientDashboard() {
  const { user } = useAuth();

  const { data: examRequests } = useQuery({
    queryKey: ["patient-exams", user?.id],
    queryFn: () => patientService.getExams(user?.id || ""),
    enabled: !!user?.id,
  });

  const { data: medicalHistory } = useQuery({
    queryKey: ["medical-history", user?.id],
    queryFn: () => patientService.getMedicalHistory(user?.id || ""),
    enabled: !!user?.id,
  });

  const { data: clinicalData } = useQuery({
    queryKey: ["clinical-data", user?.id],
    queryFn: () => patientService.getClinicalData(user?.id || ""),
    enabled: !!user?.id,
  });

  const stats = [
    {
      title: "Exames Pendentes",
      value:
        examRequests?.filter((exam: ExamRequest) => exam.status === "PENDENTE")
          .length || 0,
      icon: "time",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      title: "Exames Realizados",
      value:
        examRequests?.filter((exam: ExamRequest) => exam.status === "CONCLUIDO")
          .length || 0,
      icon: "checkmark-circle",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Consultas",
      value: medicalHistory?.length || 0,
      icon: "medical",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
  ];

  const quickActions = [
    {
      icon: "document-text",
      title: "Meus Exames",
      description: "Visualize todos os seus exames",
      href: "/patient/exams",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: "medical",
      title: "Histórico Médico",
      description: "Veja seu histórico de consultas",
      href: "/patient/history",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      icon: "person",
      title: "Dados Clínicos",
      description: "Suas informações de saúde",
      href: "/patient/clinical",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background">
      <ScrollView className="flex-1 px-4">
        {/* Header Section */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="flex-row items-center justify-between mb-6"
        >
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Bem-vindo,
            </Text>
            <Text className="text-xl text-primary">{user?.name}</Text>
          </View>
          <View className="flex-row gap-2">
            <View className="bg-primary/10 p-2 rounded-full">
              <Ionicons
                name="notifications-outline"
                size={24}
                color="hsl(var(--primary))"
              />
            </View>
          </View>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          className="flex-row gap-4 mb-6"
          layout={LinearTransition.springify()}
        >
          {stats.map((stat) => (
            <Card key={stat.title} className="flex-1">
              <CardContent className="items-center p-4">
                <View className={`${stat.bgColor} p-2 rounded-full mb-2`}>
                  <Ionicons
                    name={stat.icon as any}
                    size={24}
                    color={stat.color.replace("text-", "")}
                  />
                </View>
                <Text className="text-2xl font-bold text-foreground">
                  {stat.value}
                </Text>
                <Text className="text-md text-muted-foreground text-center">
                  {stat.title}
                </Text>
              </CardContent>
            </Card>
          ))}
        </Animated.View>

        {/* Clinical Data Summary */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          layout={LinearTransition.springify()}
        >
          <Text className="text-lg font-semibold text-foreground mb-4">
            Dados Clínicos
          </Text>
          <Card className="mb-6">
            <CardContent className="p-4">
              <View className="gap-4">
                <View className="flex-row items-center">
                  <View className="bg-red-100 p-2 rounded-full mr-3">
                    <Ionicons name="water" size={20} color="#ef4444" />
                  </View>
                  <View>
                    <Text className="text-md text-muted-foreground">
                      Tipo Sanguíneo
                    </Text>
                    <Text className="text-lg font-semibold text-card-foreground">
                      {clinicalData?.bloodType}
                    </Text>
                  </View>
                </View>

                {clinicalData?.allergies.length ? (
                  <View className="flex-row items-center">
                    <View className="bg-yellow-100 p-2 rounded-full mr-3">
                      <Ionicons name="alert-circle" size={20} color="#f59e0b" />
                    </View>
                    <View>
                      <Text className="text-md text-muted-foreground">
                        Alergias
                      </Text>
                      <Text className="text-lg font-semibold text-card-foreground">
                        {clinicalData.allergies.join(", ")}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(600)}
          layout={LinearTransition.springify()}
        >
          <Text className="text-lg font-semibold text-foreground mb-4">
            Atividade Recente
          </Text>
          <Card>
            <CardContent className="p-4">
              <View className="gap-4">
                {examRequests?.slice(0, 3).map((exam: any) => (
                  <Link key={exam.id} href="/patient/exams" asChild>
                    <TouchableOpacity className="flex-row items-center">
                      <View className="bg-muted w-12 h-12 rounded-full mr-3 items-center justify-center">
                        <Ionicons
                          name="document-text-outline"
                          size={20}
                          color="hsl(var(--primary))"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-card-foreground font-medium">
                          {exam.examType}
                        </Text>
                        <Text className="text-muted-foreground">
                          {formatDate(exam.requestDate)}
                        </Text>
                      </View>
                      <View
                        className={`px-3 py-1 rounded-full ${
                          exam.status === "PENDENTE"
                            ? "bg-orange-100"
                            : exam.status === "CONCLUIDO"
                            ? "bg-green-100"
                            : "bg-blue-100"
                        }`}
                      >
                        <Text
                          className={
                            exam.status === "PENDENTE"
                              ? "text-orange-600"
                              : exam.status === "CONCLUIDO"
                              ? "text-green-600"
                              : "text-blue-600"
                          }
                        >
                          {exam.status}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Link>
                ))}
              </View>
            </CardContent>
          </Card>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
